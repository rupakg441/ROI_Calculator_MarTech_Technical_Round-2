'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Loader2,
  Building,
  Mail,
  User,
  Phone,
  Layers,
  ChevronDown,
  AlertCircle,
  Clock,
  Calendar,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LeadFormSectionProps {
  onLeadSuccess: (leadData: any) => void;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+65', country: 'SG', flag: '🇸🇬' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
];

const VOLUME_OPTIONS = [
  '3,000 pages / month',
  '6,000 pages / month',
  '36,000 pages / month (Recommended)',
  '120,000 pages / month',
  '300,000+ pages / month',
];

const DOCUMENT_OPTIONS = [
  'Invoices & Accounts Payable',
  'Bank Statements & Financial Ledgers',
  'KYC, PAN & Identity Documents',
  'Bills of Lading & Shipping Manifests',
  'Contracts & Legal Agreements',
];

const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'yahoo.co.in',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'proton.me',
  'protonmail.com',
  'rediffmail.com',
  'aol.com',
];

export default function LeadFormSection({ onLeadSuccess }: LeadFormSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    countryCode: '+91',
    phone: '',
    companyName: '',
    monthlyVolume: VOLUME_OPTIONS[2],
    documentTypeInterest: DOCUMENT_OPTIONS[0],
    website_url_hp: '', // Honeypot field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [volumeDropdownOpen, setVolumeDropdownOpen] = useState(false);
  const [docDropdownOpen, setDocDropdownOpen] = useState(false);

  // Field validation rules
  const validateField = (name: string, value: string) => {
    let err = '';
    if (name === 'fullName') {
      if (!value.trim()) err = 'Full name is required.';
      else if (value.trim().length < 2) err = 'Please enter your full name.';
    }

    if (name === 'workEmail') {
      if (!value.trim()) {
        err = 'Work email is required.';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          err = 'Please enter a valid email address.';
        } else {
          const domain = value.trim().split('@')[1]?.toLowerCase();
          if (domain && FREE_EMAIL_DOMAINS.includes(domain)) {
            err = `Please use your work email. Public domains (${domain}) are not accepted.`;
          }
        }
      }
    }

    if (name === 'phone') {
      if (!value.trim()) {
        err = 'Phone number is required.';
      } else if (!/^\d{7,14}$/.test(value.trim().replace(/\D/g, ''))) {
        err = 'Please enter a valid phone number (7-14 digits).';
      }
    }

    if (name === 'companyName') {
      if (!value.trim()) err = 'Company name is required.';
    }

    return err;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, (formData as any)[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate all mandatory fields
    const newErrors: Record<string, string> = {
      fullName: validateField('fullName', formData.fullName),
      workEmail: validateField('workEmail', formData.workEmail),
      phone: validateField('phone', formData.phone),
      companyName: validateField('companyName', formData.companyName),
    };

    setErrors(newErrors);
    setTouched({ fullName: true, workEmail: true, phone: true, companyName: true });

    const hasErrors = Object.values(newErrors).some((err) => err !== '');
    if (hasErrors) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: `${formData.countryCode} ${formData.phone}`,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.error || 'Failed to submit form. Please check details and try again.');
        setIsSubmitting(false);
        return;
      }

      // Fire festive confetti animation
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // fallback
      }

      setIsSubmitting(false);
      onLeadSuccess(data.leadData);
    } catch (err: any) {
      console.error('Lead submit error:', err);
      setServerError('Network error. Please check your connection.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="relative py-20 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Panel: Trust Signals & Value Propositions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold w-fit">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Guaranteed 10x ROI
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Get Started with KlearStack Enterprise AI
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Experience straight-through document processing with customized AI extraction models built for your workflow.
            </p>

            {/* Bullet Value Props */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-start gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">99.4% Field Extraction Precision</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Advanced OCR + LLM vision models trained on millions of Indian and global invoices & financial statements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Instant Turnaround & API Sync</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Process documents in under 800ms and post structured JSON directly to SAP, Oracle, or HubSpot.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Bank-Grade Data Privacy</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    SOC 2 Type II, ISO 27001, and GDPR compliant with optional on-premise deployment.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Quote */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 text-xs text-slate-300 italic">
              "KlearStack reduced our Accounts Payable invoice turnaround from 4 days to 30 seconds across our 12 regional offices."
              <div className="not-italic font-bold text-white text-xs mt-2">— Head of MarTech & Engineering, Enterprise Retail</div>
            </div>
          </div>

          {/* Right Panel: High-Converting Lead Form */}
          <div className="lg:col-span-7">
            <div className="relative bg-slate-900/90 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/50">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-white">Schedule Custom Demo</h3>
                  <p className="text-xs text-slate-400">Fill in details to access interactive ROI sandbox & calendar</p>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/80">
                  <Lock className="w-3 h-3" /> Secure SSL 256-Bit
                </div>
              </div>

              {serverError && (
                <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                {/* Honeypot Field for Spam Protection */}
                <input
                  type="text"
                  name="website_url_hp"
                  value={formData.website_url_hp}
                  onChange={(e) => setFormData({ ...formData, website_url_hp: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                      <span>Full Name *</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Alex Morgan"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        className={`w-full bg-slate-950 border text-slate-100 text-sm rounded-xl pl-9 pr-3 py-2.5 outline-none transition-all ${
                          touched.fullName && errors.fullName
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                        }`}
                      />
                    </div>
                    {touched.fullName && errors.fullName && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Business Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                      <span>Work Email *</span>
                      <span className="text-[10px] text-cyan-400">Business domain required</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="alex@company.com"
                        value={formData.workEmail}
                        onChange={(e) => handleChange('workEmail', e.target.value)}
                        onBlur={() => handleBlur('workEmail')}
                        className={`w-full bg-slate-950 border text-slate-100 text-sm rounded-xl pl-9 pr-3 py-2.5 outline-none transition-all ${
                          touched.workEmail && errors.workEmail
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                        }`}
                      />
                    </div>
                    {touched.workEmail && errors.workEmail && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.workEmail}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone with Country Code */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2 py-2.5 outline-none focus:border-cyan-500"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <div className="relative flex-1">
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          className={`w-full bg-slate-950 border text-slate-100 text-sm rounded-xl pl-9 pr-3 py-2.5 outline-none transition-all ${
                            touched.phone && errors.phone
                              ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                              : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                          }`}
                        />
                      </div>
                    </div>
                    {touched.phone && errors.phone && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Acme Corp"
                        value={formData.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        onBlur={() => handleBlur('companyName')}
                        className={`w-full bg-slate-950 border text-slate-100 text-sm rounded-xl pl-9 pr-3 py-2.5 outline-none transition-all ${
                          touched.companyName && errors.companyName
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                        }`}
                      />
                    </div>
                    {touched.companyName && errors.companyName && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.companyName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Custom Select: Monthly Document Volume */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Monthly Document Volume
                  </label>
                  <button
                    type="button"
                    onClick={() => setVolumeDropdownOpen(!volumeDropdownOpen)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 flex items-center justify-between focus:border-cyan-500"
                  >
                    <span>{formData.monthlyVolume}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${volumeDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {volumeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-1 z-30">
                      {VOLUME_OPTIONS.map((vol) => (
                        <div
                          key={vol}
                          onClick={() => {
                            setFormData({ ...formData, monthlyVolume: vol });
                            setVolumeDropdownOpen(false);
                          }}
                          className="px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-cyan-300 rounded-lg cursor-pointer flex items-center justify-between"
                        >
                          <span>{vol}</span>
                          {formData.monthlyVolume === vol && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Custom Select: Document Interest */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Primary Document Interest
                  </label>
                  <button
                    type="button"
                    onClick={() => setDocDropdownOpen(!docDropdownOpen)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 flex items-center justify-between focus:border-cyan-500"
                  >
                    <span>{formData.documentTypeInterest}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${docDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {docDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-1 z-30">
                      {DOCUMENT_OPTIONS.map((doc) => (
                        <div
                          key={doc}
                          onClick={() => {
                            setFormData({ ...formData, documentTypeInterest: doc });
                            setDocDropdownOpen(false);
                          }}
                          className="px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-cyan-300 rounded-lg cursor-pointer flex items-center justify-between"
                        >
                          <span>{doc}</span>
                          {formData.documentTypeInterest === doc && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 font-bold text-white text-base shadow-xl shadow-indigo-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-cyan-200" />
                      <span>Creating CRM Record & Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit & Select Calendar Slot</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center mt-1">
                  By submitting, you consent to Hexanovate's privacy policy. Data synced to CRM & Sheets in real time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
