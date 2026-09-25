const publicDomains = /^(gmail|yahoo|outlook|hotmail|icloud|protonmail|proton|rediffmail|aol)\./i;
const attempts = new Map();

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json').end(JSON.stringify(body));
}

function validateLead(body) {
  const { name, phone, email, solution, documents, website } = body || {};
  if (website) return { spam: true };
  if (!name || name.trim().length < 2) return { error: 'Please enter your full name.' };
  if (!/^\+?[\d\s()\-]{8,20}$/.test(phone || '')) return { error: 'Please enter a valid phone number.' };
  if (!/^\S+@\S+\.\S+$/.test(email || '')) return { error: 'Please enter a valid email address.' };
  if (publicDomains.test((email || '').split('@')[1] || '')) return { error: 'Please use a work email address.' };
  if (!solution || !documents) return { error: 'Please complete the required solution and volume fields.' };
  return null;
}

async function sendHubSpot(lead) {
  if (!process.env.HUBSPOT_ACCESS_TOKEN) return { skipped: true };
  const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ properties: { firstname: lead.name, email: lead.email, phone: lead.phone, company: lead.company || '', hs_lead_status: 'NEW' } }),
  });
  if (!response.ok) throw new Error(`CRM request failed: ${response.status}`);
  return { ok: true };
}

async function appendSheet(lead) {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) return { skipped: true };
  const response = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...lead, timestamp: new Date().toISOString() }) });
  if (!response.ok) throw new Error(`Sheet request failed: ${response.status}`);
  return { ok: true };
}

async function sendEmail(lead) {
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFICATION_TO_EMAIL) return { skipped: true };
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.EMAIL_FROM || 'KlearStack leads <onboarding@resend.dev>', to: [process.env.NOTIFICATION_TO_EMAIL], subject: `New KlearStack enquiry from ${lead.name}`, text: Object.entries(lead).map(([key, value]) => `${key}: ${value}`).join('\n') }),
  });
  if (!response.ok) throw new Error(`Email request failed: ${response.status}`);
  return { ok: true };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' });
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const recent = attempts.get(ip) || [];
  const validRecent = recent.filter((timestamp) => now - timestamp < 10 * 60 * 1000);
  if (validRecent.length >= 5) return json(res, 429, { error: 'Too many requests. Please try again later.' });
  attempts.set(ip, [...validRecent, now]);
  const validation = validateLead(req.body);
  if (validation?.spam) return json(res, 204, {});
  if (validation?.error) return json(res, 400, { error: validation.error });
  const lead = { name: req.body.name.trim(), phone: req.body.phone.trim(), email: req.body.email.trim().toLowerCase(), solution: req.body.solution, documents: req.body.documents, message: (req.body.message || '').slice(0, 2000) };
  const results = await Promise.allSettled([sendHubSpot(lead), appendSheet(lead), sendEmail(lead)]);
  const failed = results.map((result, index) => result.status === 'rejected' ? ['crm', 'sheet', 'email'][index] : null).filter(Boolean);
  if (failed.length) return json(res, 502, { error: 'Your enquiry was received, but one or more notifications could not be completed. Please retry.', failed });
  return json(res, 200, { ok: true, calendarUrl: process.env.CALENDAR_BOOKING_URL || null });
}
