import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BarChart3, Check, ChevronDown, FileText, Menu, Play, ShieldCheck, Sparkles, X } from 'lucide-react';

const plans = {
  tier1: { label: 'Tier 1', docs: ['Bank Cheques', 'Bank Documents', 'ID Cards', 'KYC'], rates: [0.07, 0.06, 0.05, 0.04, 0.03], fixed: 25000 },
  tier2: { label: 'Tier 2', docs: ['Invoice', 'Bill of Lading', 'Packing List', 'Purchase Order'], rates: [0.15, 0.14, 0.13, 0.12, 0.11], fixed: 54000 },
  tier3: { label: 'Tier 3', docs: ['Contract', 'P&L Statements', 'Cashflow Statement'], rates: [0.09, 0.08, 0.07, 0.05, 0.04], fixed: 36000 },
};

const volumeBands = [36000, 120000, 300000, 500000, 1000000];
const bandLabels = ['36,001–120,000', '120,001–300,000', '300,001–500,000', '500,001–1,000,000', 'above 1,000,000'];
const formatINR = (value) => `₹${Math.round(value).toLocaleString('en-IN')}`;
const tiers = {
  single: { rate: 0.06, fixed: 0 },
  multi: { rate: 0.04, fixed: 25000 },
};

function calculateROI(volume, salary, tier) {
  const plan = plans[tier];
  const resources = volume / 30000;
  const monthlyManualCost = resources * salary;
  const fixedAnnual = plan.fixed;
  const rates = plan.rates;
  let automationAnnual = fixedAnnual;
  let previous = 36000;
  for (let index = 0; index < rates.length; index += 1) {
    const upper = volumeBands[index] ?? Infinity;
    const slabVolume = Math.max(0, Math.min(volume, upper) - previous);
    automationAnnual += slabVolume * rates[index];
    previous = upper;
    if (volume <= upper) break;
  }
  const monthlyAutomation = automationAnnual / 12;
  const savings = monthlyManualCost - monthlyAutomation;
  return { resources, monthlyManualCost, annualCost: automationAnnual, monthlyCost: monthlyAutomation, savings, annualSavings: savings * 12, equivalent: Math.ceil(resources), payback: savings > 0 ? Number((monthlyAutomation / savings).toFixed(1)) : 0 };
}

function calculateSavings(volume, salary, model) {
  const resources = volume / 30000;
  const manualMonthlyCost = resources * salary;
  const annualAutomationCost = tiers[model].fixed + Math.max(0, volume - 36000) * tiers[model].rate;
  const monthlySavings = manualMonthlyCost - annualAutomationCost / 12;
  return {
    monthly: monthlySavings,
    annual: monthlySavings * 12,
    resources: Math.ceil(resources),
  };
}

function Logo({ compact = false }) {
  return <div className={`brand ${compact ? 'brand--compact' : ''}`}><span className="brand-mark"><span /></span><span>klear<span>stack</span></span></div>;
}

function Header() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const headerRef = useRef(null);
  const menus = { Product: ['Capabilities', 'Features', 'Integration', 'Document Types'], Solutions: ['Data Processing', 'Data Extraction', 'Data Interpretation', 'Straight Through Processing (STP)'], Industries: ['Banking', 'Insurance', 'Healthcare'], Resources: ['Blog', 'Customer stories', 'ROI calculator'] };
    useEffect(() => {
      const close = (event) => {
        if (event.type === 'pointerdown' && headerRef.current?.contains(event.target)) return;
        if (event.type === 'keydown' && event.key !== 'Escape') return;
        setOpen(null);
        if (event.key === 'Escape') setMobile(false);
      };
      document.addEventListener('pointerdown', close);
      document.addEventListener('keydown', close);
      window.addEventListener('scroll', close, { passive: true });
      return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', close); window.removeEventListener('scroll', close); };
    }, []);
    return <header className="topbar" ref={headerRef}><div className="topbar-inner"><a href="#top" aria-label="KlearStack"><Logo /></a><nav className={mobile ? 'main-nav main-nav--open' : 'main-nav'}>{Object.entries(menus).map(([name, items]) => <div className="nav-group" key={name}><button className="nav-link" onClick={() => setOpen(open === name ? null : name)} aria-expanded={open === name}>{name}<ChevronDown size={13} /></button>{open === name && <div className="mega-menu"><div className="mega-tabs">{items.map((item, index) => <a className={index === 0 ? 'mega-tab mega-tab--active' : 'mega-tab'} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}><span className="tab-icon">✣</span>{item}{index === 0 && <ArrowRight size={14} />}</a>)}</div><div className="mega-detail"><strong>{items[0]} <ArrowRight size={14} /></strong>{items.slice(1).map((item) => <span key={item}>{item}</span>)}</div></div>}</div>)}<a className="nav-link" href="#calculator">Pricing</a><a className="nav-link" href="#footer">Company <ChevronDown size={13} /></a><a className="outline-cta" href="#demo">Try it for Free <ArrowRight size={15} /></a><a className="solid-cta" href="#demo">Get Free Demo <ArrowRight size={15} /></a></nav><button className="mobile-toggle" onClick={() => setMobile(!mobile)} aria-label="Toggle navigation">{mobile ? <X /> : <Menu />}</button></div></header>;
}

function Hero() {
  const logos = ['MOTILAL OSWAL', 'eClerx', 'TATA', '✓ airtel', 'IIFL', 'Pidilite'];
  return <main id="top">
    <section className="hero section-pad">
      <div className="hero-copy reveal"><div className="eyebrow"><span className="eyebrow-dot" /> Intelligent document processing</div><h1>Turn every document<br /><em>into an advantage.</em></h1><p className="hero-text">KlearStack brings clarity to complex documents, so your teams can move faster, make better decisions and unlock more value.</p><div className="hero-actions"><a className="button button--primary" href="#demo">See KlearStack in action <ArrowRight size={17} /></a><a className="text-link" href="#calculator"><span className="play-icon"><Play size={13} fill="currentColor" /></span> Calculate your ROI</a></div><div className="hero-proof"><div className="avatar-stack"><span>AS</span><span>RK</span><span>PM</span><span>+</span></div><div><strong>Trusted by teams who process at scale</strong><small>Secure. Accurate. Built for business.</small></div></div></div>
      <div className="hero-visual reveal reveal-delay"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="doc-card doc-card--back"><div className="doc-lines" /></div><div className="doc-card doc-card--main"><div className="doc-top"><FileText size={20} /><span>Invoice_0428.pdf</span><Check size={16} /></div><div className="doc-title">TATA CONSUMER<br /><strong>PRODUCTS</strong></div><div className="doc-table"><span>ITEM DESCRIPTION</span><b>AMOUNT</b><span>Processing & automation</span><b>₹ 42,850</b><span>Taxable value</span><b>₹ 1,26,000</b><span>Total amount</span><b>₹ 1,68,850</b></div><div className="doc-status"><span className="status-dot" /> Data extracted successfully <small>98.6%</small></div></div><div className="float-chip float-chip--top"><Sparkles size={15} /> AI-powered accuracy</div><div className="float-chip float-chip--bottom"><BarChart3 size={16} /><span><strong>32%</strong> faster processing</span></div></div>
      <div className="logo-marquee"><span className="marquee-label">Trusted by leading teams</span><div className="marquee-track">{[...logos, ...logos].map((logo, index) => <span key={`${logo}-${index}`}>{logo}</span>)}</div></div>
    </section>
    <section className="statement section-pad" id="why-klearstack"><div className="eyebrow"><span className="eyebrow-dot" /> Why KlearStack</div><h2>Documents are the language<br />of business. <em>We make them clear.</em></h2><div className="feature-row"><div><span className="feature-number">01</span><h3>Understand complexity</h3><p>Extract meaning from every format, layout and data point without the manual work.</p></div><div><span className="feature-number">02</span><h3>Move with confidence</h3><p>Make decisions on clean, structured data that your business can actually trust.</p></div><div><span className="feature-number">03</span><h3>Scale what matters</h3><p>Give your people back the time to focus on work that drives your business forward.</p></div></div></section>
  </main>;
}

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', interest: '' });
  const [errors, setErrors] = useState({});
  const validate = () => { const next = {}; if (!form.name.trim()) next.name = 'Please enter your full name.'; if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = 'Please use a valid work email.'; if (/gmail|yahoo|outlook|hotmail|icloud|proton|rediffmail/i.test(form.email)) next.email = 'Please use your work email, not a personal mailbox.'; if (!form.company.trim()) next.company = 'Please enter your company name.'; if (!/^\+?[\d\s-]{8,15}$/.test(form.phone)) next.phone = 'Please enter a valid phone number with country code.'; if (!form.interest) next.interest = 'Please choose what you are interested in.'; setErrors(next); return !Object.keys(next).length; };
  const submit = (event) => { event.preventDefault(); if (!validate()) return; setLoading(true); window.setTimeout(() => { setLoading(false); setSubmitted(true); }, 800); };
  return <section className="lead-section section-pad" id="demo"><div className="lead-intro"><div className="eyebrow"><span className="eyebrow-dot" /> Let’s talk</div><h2>Ready to make<br /><em>documents work harder?</em></h2><p>Tell us a little about yourself. We’ll show you what’s possible, with no pressure and no jargon.</p><div className="lead-note"><ShieldCheck size={20} /><span>Your information is secure and will never be shared.</span></div></div><div className="form-panel">{submitted ? <div className="success-state"><div className="success-icon"><Check /></div><h3>Thank you, {form.name.split(' ')[0]}.</h3><p>Your request is on its way. A KlearStack specialist will reach out shortly.</p><a href="#calculator" className="button button--primary">Explore the ROI calculator <ArrowRight size={16} /></a></div> : <form onSubmit={submit} noValidate><div className="form-heading"><span>01 / 02</span><h3>Start a conversation</h3><p>Fields marked with * are required.</p></div><div className="form-grid"><Field label="Full name" name="name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} error={errors.name} placeholder="Your name" /><Field label="Work email" name="email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} error={errors.email} placeholder="you@company.com" /><Field label="Company" name="company" value={form.company} onChange={(value) => setForm({ ...form, company: value })} error={errors.company} placeholder="Your company" /><Field label="Phone number" name="phone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} error={errors.phone} placeholder="+91 00000 00000" /><div className="field field--full"><label htmlFor="interest">I’m interested in *</label><select id="interest" value={form.interest} onChange={(event) => setForm({ ...form, interest: event.target.value })} className={errors.interest ? 'has-error' : ''}><option value="">Select an option</option><option>Document AI automation</option><option>Accounts payable automation</option><option>Learning more</option></select>{errors.interest && <small className="field-error">{errors.interest}</small>}</div></div><button className="button button--submit" disabled={loading}>{loading ? 'Sending...' : 'Book a conversation'} <ArrowRight size={17} /></button><p className="form-legal">By submitting, you agree to our privacy policy.</p></form>}</div></section>;
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) { return <div className="field"><label htmlFor={name}>{label} *</label><input id={name} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={error ? 'has-error' : ''} />{error && <small className="field-error">{error}</small>}</div>; }

function Calculator() {
  const [volume, setVolume] = useState(36000); const [salary, setSalary] = useState(30000); const [tier, setTier] = useState('tier1');
  const result = useMemo(() => calculateROI(volume, salary, tier), [volume, salary, tier]); const plan = plans[tier];
  return <section className="calculator section-pad" id="calculator"><div className="calculator-heading"><div className="eyebrow"><span className="eyebrow-dot" /> ROI calculator</div><h2>What could you unlock<br /><em>with KlearStack?</em></h2><p>Put in your numbers. See the opportunity.</p></div><div className="calculator-card"><div className="calculator-inputs"><div className="calc-label">Your inputs</div><label>Document type<select value={tier} onChange={(event) => setTier(event.target.value)}><option value="tier1">Bank cheques</option><option value="tier2">Invoices & bills</option><option value="tier3">Contracts & statements</option></select></label><label>Annual volume <output>{volume.toLocaleString('en-IN')} pages</output><input type="range" min="3000" max="1000000" step="1000" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /></label><div className="range-labels"><span>3,000</span><span>1,000,000</span></div><label>Average monthly salary <output>{formatINR(salary)}</output><input type="range" min="15000" max="120000" step="5000" value={salary} onChange={(event) => setSalary(Number(event.target.value))} /></label><div className="range-labels"><span>₹15k</span><span>₹1.2L</span></div><div className="calc-plan"><span>Selected plan</span><strong>{plan.label}</strong><small>{plan.docs.join(' · ')}</small></div></div><div className="calculator-output"><div className="calc-label">Your potential impact</div><div className="impact-main"><span>Estimated monthly savings</span><strong>{formatINR(result.savings)}</strong><small>with {result.equivalent} equivalent resource{result.equivalent === 1 ? '' : 's'}</small></div><div className="impact-grid"><div><span>Annual savings</span><strong>{formatINR(result.annualSavings)}</strong></div><div><span>Automation cost / mo</span><strong>{formatINR(result.monthlyCost)}</strong></div><div><span>Manual cost / mo</span><strong>{formatINR(result.monthlyManualCost)}</strong></div><div><span>Payback period</span><strong>{result.payback} months</strong></div></div><div className="calc-cta"><p>See how this could work for your business.</p><a href="#demo" className="button button--primary">Talk to an expert <ArrowRight size={16} /></a></div></div></div></section>;
}

function Footer() { return <footer id="footer" className="footer section-pad"><div className="footer-top"><div><Logo compact /><p>Intelligence for every document.<br />Clarity for every decision.</p></div><div className="footer-links"><div><strong>Explore</strong><a href="#why-klearstack">Platform</a><a href="#calculator">ROI calculator</a><a href="#demo">Book a demo</a></div><div><strong>Company</strong><a href="#footer">About us</a><a href="#footer">Careers</a><a href="#footer">Contact</a></div><div><strong>Connect</strong><a href="#footer">LinkedIn ↗</a><a href="#footer">Instagram ↗</a><a href="#footer">hello@klearstack.com</a></div></div></div><div className="footer-bottom"><span>© 2024 KlearStack. All rights reserved.</span><span>Privacy policy &nbsp; Terms of use</span></div></footer>; }

function ScreenshotIntegration() { return <section className="shot-integration page-width"><h1>Already Using SAP, Tally Or QuickBooks?</h1><h2>We Integrates With All!</h2><a className="solid-cta" href="#demo">Get A Free Demo <ArrowRight size={16} /></a></section>; }

function ScreenshotCalculator() { const [model, setModel] = useState('single'); const [volume, setVolume] = useState(36000); const [salary, setSalary] = useState(73000); const savings = useMemo(() => calculateSavings(volume, salary, model), [volume, salary, model]); return <section className="shot-calculator page-width" id="calculator"><div className="shot-calc-head"><div><h2>Calculate Your Savings</h2><p>See how much time and money you can save with KlearStack AI.</p></div><div className="shot-toggle"><button className={model === 'single' ? 'is-selected' : ''} onClick={() => setModel('single')}>Single-Shot Model</button><button className={model === 'multi' ? 'is-selected' : ''} onClick={() => setModel('multi')}>Multi-Shot Model</button></div></div><div className="shot-inputs"><label>DOCUMENT TYPE<select><option>Select Document Type</option><option>Invoice</option><option>Bank Cheque</option></select></label><label>DOCUMENT VOLUME (PAGES)<output>{volume.toLocaleString('en-IN')} pages</output><input type="range" min="3000" max="1000000" step="1000" value={volume} onChange={(e) => setVolume(Number(e.target.value))} /></label><label>AVERAGE MONTHLY SALARY PER RESOURCE<output>{formatINR(salary)}</output><input type="range" min="15000" max="120000" step="1000" value={salary} onChange={(e) => setSalary(Number(e.target.value))} /></label></div><div className="shot-results"><Result title="NET MONTHLY SAVINGS" value={formatINR(savings.monthly)} note="COMPARED TO MANUAL LABOR" accent /><Result title="ANNUAL SAVINGS" value={formatINR(savings.annual)} note="TOTAL SAVED PER YEAR" /><Result title="EQUIVALENT RESOURCES" value={savings.resources} note="PEOPLE REPLACED BY KLEARSTACK" /></div><p className="shot-note">* 15% lesser price in the Annual Plan</p><a className="solid-cta shot-calc-cta" href="#demo">Automate your workflows with us <ArrowRight size={17} /></a></section>; }

function Result({ title, value, note, accent }) { return <div className="shot-result"><span className={accent ? 'shot-result-title accent' : 'shot-result-title'}>{title}</span><strong>{value}</strong><small>{note}</small></div>; }

function ScreenshotLead() { const [sent, setSent] = useState(false); const [form, setForm] = useState({ name: '', phone: '', email: '', solution: '', documents: '', message: '' }); const [error, setError] = useState(''); const update = (key, value) => setForm((current) => ({ ...current, [key]: value })); const submit = (event) => { event.preventDefault(); if (!form.name || !form.phone || !form.email || !form.solution || !form.documents) return setError('Please complete all required fields.'); if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Please enter a valid email address.'); setError(''); setSent(true); }; return <section className="shot-lead page-width" id="demo"><div className="shot-lead-copy"><Logo /><h2>The Only Document AI<br />With Fraud, Compliance,<br />&amp; Audit Checks Built In</h2><p>No templates. No setup calls. See your documents,<br />processed live, right now.</p><ul><li><Check size={14} /> <b>99%*</b> World Class Accuracy</li><li><Check size={14} /> Proprietary AI for Ultimate Security</li><li><Check size={14} /> <b>Pilot Ready</b> in Less than 7 Hours*</li></ul><div className="shot-clients"><span>Used by Many,<br />Loved by All!</span><b>LANDMARK<br /><small>GROUP</small></b><strong>network<span>›</span></strong><span>ELE<br />TEK</span></div></div><div className="shot-form">{sent ? <div className="shot-success"><Check /><h3>Thank you.</h3><p>We will be in touch shortly.</p></div> : <><div className="shot-form-title">Bring your messiest documents.<br />We’ll process them live.</div><form onSubmit={submit}><input placeholder="Name*" value={form.name} onChange={(e) => update('name', e.target.value)} /><input placeholder="Contact no.*" value={form.phone} onChange={(e) => update('phone', e.target.value)} /><input placeholder="Email ID*" value={form.email} onChange={(e) => update('email', e.target.value)} /><div className="shot-form-two"><select value={form.solution} onChange={(e) => update('solution', e.target.value)}><option value="">Solution Required*</option><option>Document Processing</option><option>Document Extraction</option></select><select value={form.documents} onChange={(e) => update('documents', e.target.value)}><option value="">No. of Documents*</option><option>Under 10,000</option><option>10,000+</option></select></div><textarea placeholder="Pain Point and Expectations (optional)" value={form.message} onChange={(e) => update('message', e.target.value)} /><button className="solid-cta">Free Live Demo <ArrowRight size={16} /></button>{error && <small className="shot-error">{error}</small>}</form><div className="shot-reviews"><span>★★★★★<small>4.9/5 G2</small></span><i>G2</i><span>★★★★★<small>4.7/5 Trustpilot</small></span><i className="trust">★</i></div><p className="shot-secure">All your data is safe and secure with us!</p></>}</div></section>; }

function ScreenshotFooter() { const groups = [['Industries', 'BFSI', 'Healthcare', 'Telecom', 'Manufacturing'], ['Resources', 'Blog', 'Guides', 'Newsroom', 'API Documentation', 'Product Documentation'], ['Tools', 'Compress PDF', 'Merge PDF', 'PDF to Image'], ['Capabilities', 'Document Processing', 'Document Interpretation', 'Document Extraction', 'Straight Through Protocol (STP)'], ['Company', 'About', 'Contact', 'Careers']]; return <footer className="shot-footer" id="footer"><div className="shot-footer-inner"><div className="shot-footer-intro"><div className="footer-logo-space" /><p>Shift supply chain and loan compliance from bottleneck to AI-enabled confidence and operational excellence.</p><div className="shot-socials"><span>◎</span><span>✉</span><span>◉</span></div></div><div className="shot-footer-nav"><span>How it works? <i>|</i></span><span>Solutions</span><span>Check All Document Types <i>|</i></span><span>Pricing <i>|</i></span><span>Integrations <i>|</i></span></div><div className="shot-groups">{groups.map(([title, ...links]) => <div key={title}><strong>{title}</strong>{links.map((link, index) => <a className={index === 0 && title === 'Industries' ? 'shot-pill' : ''} href="#footer" key={link}>{link}</a>)}</div>)}</div><div className="shot-newsletter"><h3>Our Newsletter on Latest Trends</h3><input placeholder="Enter your E-mail address" type="email" /><button className="solid-cta">Subscribe <ArrowRight size={16} /></button></div><div className="shot-locations"><div><h3>India <i>|</i> Lorem ipsum</h3><p>City Tower, Sixth Floor, 17, Boat Club Road, Pune,<br />India</p><span>◉ &nbsp;+91 94220 84589 &nbsp;&nbsp;&nbsp; ✉ &nbsp;sales@loremipsum.com</span></div><div><h3>USA <i>|</i> Lorem ipsum</h3><p>Lorem ipsum, Inc. 371 Hoes Lane, Suite 200, Piscataway, NJ<br />08854, USA</p><span>◉ &nbsp;+1 (973) 791-8875 &nbsp;&nbsp;&nbsp; ✉ &nbsp;sales@loremipsum.com</span></div></div><div className="shot-legal"><span>Privacy Policy &nbsp;|&nbsp; Terms &amp; Conditions &nbsp;|&nbsp; Cookie Policy &nbsp;|&nbsp; DPA</span><span>© KlearStack 2026</span></div><div className="shot-watermark">Lorem Ipsum</div></div></footer>; }

export default function App() { return <><Header /><main id="top"><ScreenshotIntegration /><ScreenshotCalculator /><ScreenshotLead /></main><ScreenshotFooter /></>; }
