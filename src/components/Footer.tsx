'use client';

import React, { useState } from 'react';
import { Zap, Send, Mail, MapPin, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsStatus, setNewsStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newsMessage, setNewsMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsStatus('error');
      setNewsMessage('Please enter a valid email address.');
      return;
    }

    setNewsStatus('success');
    setNewsMessage('Subscribed successfully! Thank you for joining KlearStack AI updates.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Address */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">KlearStack AI</span>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              KlearStack by Hexanovate is an enterprise Intelligent Document Processing (IDP) platform enabling automated extraction across financial, shipping, and identity documents.
            </p>

            {/* Registered Address */}
            <div className="mt-2 text-xs text-slate-300 flex items-start gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Hexanovate Private Limited</strong>
                <span>Maithili F1, Orion Complex, Aundh Road, Bopodi, Pune, Maharashtra - 411020</span>
              </div>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Products</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li><a href="#lead-form" className="hover:text-cyan-300 transition-colors">Invoice AI Extractor</a></li>
              <li><a href="#lead-form" className="hover:text-cyan-300 transition-colors">Bank Statement Parser</a></li>
              <li><a href="#lead-form" className="hover:text-cyan-300 transition-colors">KYC & Identity Verification</a></li>
              <li><a href="#lead-form" className="hover:text-cyan-300 transition-colors">Freight & Customs IDP</a></li>
              <li><a href="#roi-calculator" className="hover:text-cyan-300 transition-colors">ROI Calculator</a></li>
            </ul>
          </div>

          {/* Col 3: Company & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li><a href="#lead-form" className="hover:text-cyan-300 transition-colors">About Hexanovate</a></li>
              <li><a href="#lead-form" className="hover:text-cyan-300 transition-colors">Security & Compliance</a></li>
              <li><a href="#lead-form" className="hover:text-cyan-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#lead-form" className="hover:text-cyan-300 transition-colors">Terms of Service</a></li>
              <li><a href="#lead-form" className="hover:text-cyan-300 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">MarTech Insights</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Subscribe to receiving document AI engineering case studies and benchmarks.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2" noValidate>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-lg text-white font-semibold text-xs flex items-center justify-center hover:opacity-90"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {newsStatus === 'error' && (
                <span className="text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {newsMessage}
                </span>
              )}
              {newsStatus === 'success' && (
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {newsMessage}
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Hexanovate Private Limited. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#lead-form" className="hover:text-slate-300 transition-colors">Security Report</a>
            <a href="#lead-form" className="hover:text-slate-300 transition-colors">Performance Audit</a>
            <a href="#lead-form" className="hover:text-slate-300 transition-colors">Vercel Deployment</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
