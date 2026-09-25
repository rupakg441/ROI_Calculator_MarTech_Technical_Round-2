'use client';

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  Sparkles,
  HelpCircle,
  Check,
  ChevronDown,
  Info,
  ArrowRight,
} from 'lucide-react';
import {
  calculateRoi,
  DOCUMENT_CONFIGS,
  DocumentType,
  ModelType,
  formatINR,
  formatShortINR,
} from '@/lib/roiLogic';

const DOCUMENT_TYPES: DocumentType[] = [
  'Bank Cheques',
  'Bank Documents',
  'ID Cards',
  'KYC Documents',
  'Invoice',
  'Bill of Lading',
  'Packing List',
  'Purchase Order',
  'Contract',
  'P&L Statements',
  'Cashflow Statements',
];

const VOLUME_STEPS = [
  3000, 6000, 10000, 20000, 36000, 60000, 90000, 120000, 200000, 300000, 500000, 750000, 1000000,
];

export default function RoiCalculator() {
  const [docType, setDocType] = useState<DocumentType>('Bank Cheques');
  const [model, setModel] = useState<ModelType>('Single');
  const [annualVolume, setAnnualVolume] = useState<number>(36000);
  const [avgMonthlySalary, setAvgMonthlySalary] = useState<number>(30000);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check if current doc type is Tier 3 (which only allows Single model)
  const isTier3 = DOCUMENT_CONFIGS[docType].tier === 'tier3';

  // Effective model (force Single if tier3)
  const effectiveModel: ModelType = isTier3 ? 'Single' : model;

  // Live ROI Calculation Result
  const roi = useMemo(() => {
    return calculateRoi({
      documentType: docType,
      model: effectiveModel,
      annualVolume,
      avgMonthlySalary,
    });
  }, [docType, effectiveModel, annualVolume, avgMonthlySalary]);

  // Percentage Savings calculation
  const savingsPercent = useMemo(() => {
    if (roi.monthlyManualCost <= 0) return 0;
    const pct = (roi.netMonthlySavings / roi.monthlyManualCost) * 100;
    return Math.max(0, Math.min(100, Math.round(pct)));
  }, [roi]);

  return (
    <section id="roi-calculator" className="relative py-20 bg-slate-950 text-white overflow-hidden border-t border-indigo-950/40">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-4">
            <Calculator className="w-4 h-4 text-cyan-400" /> Official Logic-Sheet Verified Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Calculate Your Business ROI & Net Savings
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Adjust document types, volume, and team size below. All figures are calculated live using Hexanovate's official pricing slabs.
          </p>
        </div>

        {/* Calculator Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Inputs Panel (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-400" /> Calculator Inputs
              </h3>
              <span className="text-xs text-slate-400 font-mono">Logic & Pricing v2.0</span>
            </div>

            {/* Input 1: Document Type Select */}
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                <span>1. Document Type</span>
                <span className="text-[10px] text-cyan-400 font-mono uppercase">Tier: {roi.tier}</span>
              </label>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-100 text-sm rounded-xl px-4 py-3 flex items-center justify-between transition-colors"
              >
                <span className="font-medium">{docType}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-40 p-1">
                  {DOCUMENT_TYPES.map((dt) => {
                    const cfg = DOCUMENT_CONFIGS[dt];
                    return (
                      <div
                        key={dt}
                        onClick={() => {
                          setDocType(dt);
                          setDropdownOpen(false);
                        }}
                        className={`px-3 py-2.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                          docType === dt
                            ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <span>{dt}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                          {cfg.tier}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Input 2: Model Toggle */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                <span>2. Processing Model</span>
                {isTier3 && <span className="text-[10px] text-purple-400 font-medium">Tier 3 allows Single model only</span>}
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setModel('Single')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    effectiveModel === 'Single'
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Single Model
                </button>
                <button
                  type="button"
                  disabled={isTier3}
                  onClick={() => setModel('Multi')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    effectiveModel === 'Multi'
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                      : isTier3
                      ? 'text-slate-600 cursor-not-allowed opacity-40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Multi Model
                </button>
              </div>
            </div>

            {/* Input 3: Annual Volume Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">3. Annual Volume (pages)</label>
                <span className="text-sm font-bold text-cyan-400 font-mono">
                  {annualVolume.toLocaleString('en-IN')} pages
                </span>
              </div>
              <input
                type="range"
                min={3000}
                max={1000000}
                step={1000}
                value={annualVolume}
                onChange={(e) => setAnnualVolume(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>3k</span>
                <span>36k (Std)</span>
                <span>300k</span>
                <span>1M+</span>
              </div>
            </div>

            {/* Input 4: Avg Monthly Salary Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">4. Avg Monthly Salary / Resource</label>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {formatINR(avgMonthlySalary, false)}
                </span>
              </div>
              <input
                type="range"
                min={15000}
                max={150000}
                step={5000}
                value={avgMonthlySalary}
                onChange={(e) => setAvgMonthlySalary(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>₹15,000</span>
                <span>₹30,000 (Default)</span>
                <span>₹150,000</span>
              </div>
            </div>
          </div>

          {/* Right Output Results Panel (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    Live Calculation Outputs
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">Cost & Savings Breakdown</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {formatShortINR(roi.annualSavings)}
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Total Annual Savings
                  </span>
                </div>
              </div>

              {/* Top 3 Highlight Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 font-medium block">Resources Needed</span>
                  <div className="text-2xl font-extrabold text-white mt-1 font-mono">
                    {roi.resourcesNeeded.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-indigo-400 mt-1 block">
                    ≈ {roi.equivalentResources} full-time FTEs
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 font-medium block">Net Monthly Savings</span>
                  <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">
                    {formatINR(roi.netMonthlySavings, true)}
                  </div>
                  <span className="text-[10px] text-emerald-500 mt-1 block font-semibold">
                    {savingsPercent}% Efficiency Gain
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 font-medium block">Payback Period</span>
                  <div className="text-2xl font-extrabold text-cyan-400 mt-1 font-mono">
                    {roi.paybackMonths.toFixed(1)} <span className="text-xs font-normal">Months</span>
                  </div>
                  <span className="text-[10px] text-cyan-500 mt-1 block font-semibold">
                    Immediate ROI
                  </span>
                </div>
              </div>

              {/* Detailed Breakdown Grid */}
              <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 flex flex-col gap-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-300">Monthly Manual Operation Cost</span>
                  <span className="font-mono text-slate-100 font-semibold">{formatINR(roi.monthlyManualCost)}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-300">KlearStack Annual Cost (Fixed + Slabs)</span>
                  <span className="font-mono text-cyan-300 font-semibold">{formatINR(roi.klearStackAnnualCost)}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-300">KlearStack Monthly Effective Cost</span>
                  <span className="font-mono text-cyan-400 font-semibold">{formatINR(roi.klearStackMonthlyCost)}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-300">Equivalent Manual Resources Replaced</span>
                  <span className="font-mono text-purple-300 font-semibold">{roi.equivalentResources} Resources</span>
                </div>

                <div className="flex justify-between items-center pt-1.5 font-bold text-sm">
                  <span className="text-white">Net Annual Savings</span>
                  <span className="font-mono text-emerald-400">{formatINR(roi.annualSavings)}</span>
                </div>
              </div>
            </div>

            {/* Test Vector Comparison Box */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>Pricing Key: <strong className="text-slate-200 font-mono">{roi.pricingKey}</strong></span>
              </div>
              <a href="#lead-form" className="text-cyan-300 font-semibold hover:underline flex items-center gap-1">
                Get Custom Quote →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
