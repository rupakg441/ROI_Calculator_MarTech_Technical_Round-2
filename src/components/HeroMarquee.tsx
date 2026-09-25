'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Zap, ArrowRight, CheckCircle2, FileCheck2, Cpu } from 'lucide-react';

interface HeroMarqueeProps {
  onOpenDemo: () => void;
}

const CLIENT_LOGOS = [
  { name: 'ICICI Bank', badge: 'BFSI' },
  { name: 'Deloitte', badge: 'Audit' },
  { name: 'Siemens Healthineers', badge: 'Healthcare' },
  { name: 'Tata Motors', badge: 'Automotive' },
  { name: 'Reliance Industries', badge: 'Enterprise' },
  { name: 'Standard Chartered', badge: 'Banking' },
  { name: 'Maersk Logistics', badge: 'Freight' },
  { name: 'FedEx Express', badge: 'Logistics' },
];

export default function HeroMarquee({ onOpenDemo }: HeroMarqueeProps) {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 pb-16 bg-slate-950 text-white border-b border-indigo-950/40">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 shadow-lg text-xs font-medium text-slate-300 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-cyan-300 font-semibold">Enterprise IDP Platform</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Powered by Hexanovate AI</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Transform Unstructured Documents into{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              Intelligent Data in Seconds
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
            Eliminate manual data entry. Extract invoices, bank statements, receipts, and trade documents with{' '}
            <strong className="text-white font-semibold">99.4% accuracy</strong> and seamless ERP/CRM integrations.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 font-bold text-white shadow-xl shadow-indigo-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 group text-base"
            >
              Start Free Trial / Book Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-cyan-200" />
            </button>

            <a
              href="#roi-calculator"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 font-semibold transition-all hover:bg-slate-800 text-center text-base"
            >
              Calculate Your ROI →
            </a>
          </div>

          {/* Key Value Prop Badges */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-slate-300 border-t border-slate-800/80 pt-6">
            <div className="flex items-center justify-center gap-2 bg-slate-900/40 py-2 rounded-lg border border-slate-800/60">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Zero Template Setup</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-slate-900/40 py-2 rounded-lg border border-slate-800/60">
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>SOC2 & ISO 27001 Certified</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-slate-900/40 py-2 rounded-lg border border-slate-800/60">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Sub-Second Response</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-slate-900/40 py-2 rounded-lg border border-slate-800/60">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>SAP & Salesforce Ready</span>
            </div>
          </div>
        </div>

        {/* Continuous Seamless Logo Marquee */}
        <div className="mt-14 pt-8 border-t border-slate-800/50">
          <p className="text-center text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
            Trusted by Enterprise Leaders Across India & Global Markets
          </p>

          <div className="relative overflow-hidden w-full py-2 group/marquee">
            {/* Fade Gradients at sides */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            {/* Marquee Track with CSS Animation */}
            <div className="flex w-max gap-8 animate-marquee group-hover/marquee:[animation-play-state:paused]">
              {/* Duplicate set 1 */}
              {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors shadow-sm shrink-0"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center font-bold text-xs text-cyan-300">
                    {logo.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-200 text-sm tracking-wide">{logo.name}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                    {logo.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
