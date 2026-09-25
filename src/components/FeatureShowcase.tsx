'use client';

import React from 'react';
import { Shield, Cpu, Zap, Database, Lock, RefreshCw, BarChart2, Layers } from 'lucide-react';

export default function FeatureShowcase() {
  return (
    <section id="features" className="py-20 bg-slate-950 text-white border-t border-indigo-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            Engineered for Enterprise MarTech & Operations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
            Why Enterprise Leaders Choose KlearStack AI
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Replace legacy rule-based OCR with self-learning computer vision and LLM models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-slate-900/80 border border-indigo-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all group">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit mb-5 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Zero-Template Intelligence</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No static coordinate mapping or fragile templates. KlearStack dynamically understands layout structure across unstructured PDFs, scans, and mobile photos.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/80 border border-indigo-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all group">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit mb-5 group-hover:scale-110 transition-transform">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Real-Time ERP & CRM Sync</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pre-built connectors for SAP S/4HANA, Oracle NetSuite, Salesforce, HubSpot, and custom REST API webhooks for seamless straight-through processing.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/80 border border-indigo-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all group">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit mb-5 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Bank-Grade Compliance</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              SOC 2 Type II, ISO 27001 certified, and GDPR compliant with 256-bit encryption in transit and at rest. Choose between AWS India Cloud or VPC.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
