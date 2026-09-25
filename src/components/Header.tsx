'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  FileText,
  CreditCard,
  Building2,
  ShieldCheck,
  Zap,
  Cpu,
  Sparkles,
  BarChart3,
  Layers,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  BookOpen,
} from 'lucide-react';

interface HeaderProps {
  onOpenDemo: () => void;
}

export default function Header({ onOpenDemo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Scroll handler to toggle sticky style & close menus on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      // Close dropdowns on scroll per requirement
      setActiveMenu(null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key handler & click outside handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion((prev) => (prev === name ? null : name));
  };

  return (
    <header ref={headerRef} className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-xl border-b border-indigo-500/20' : 'bg-transparent'}`}>
      {/* Top Banner / Trust Badge */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-cyan-950 text-xs py-1.5 text-center text-slate-300 font-medium px-4 border-b border-indigo-500/20 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-cyan-500/30">
          <Sparkles className="w-3 h-3 text-cyan-400" /> New Release
        </span>
        <span>KlearStack v3.4 is live: 99.4% Extraction Accuracy for Complex Financial & Freight Docs</span>
        <a href="#roi-calculator" className="underline font-semibold text-cyan-300 hover:text-white transition-colors ml-1">
          Calculate Savings →
        </a>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-indigo-500/25 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5 font-sans">
              KlearStack <span className="text-xs bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider font-mono">by Hexanovate</span>
          </div>
        </a>

        {/* Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Item 1: Products (Mega Menu) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('products')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              onClick={() => toggleMenu('products')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleMenu('products')}
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-all duration-200 ${
                activeMenu === 'products'
                  ? 'text-cyan-400 bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
              aria-expanded={activeMenu === 'products'}
            >
              Products
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  activeMenu === 'products' ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Products Mega Menu Popup */}
            {activeMenu === 'products' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[780px] mt-2 bg-slate-900/95 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl shadow-2xl p-6 grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-top-3 duration-200 z-50">
                <div className="col-span-8 grid grid-cols-2 gap-4">
                  <div className="group/card p-3 rounded-xl hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-700/60 cursor-pointer">
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="font-semibold text-white text-sm">Invoice AI Processor</div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Straight-through extraction for multi-line invoice line items & GL code mapping.
                    </p>
                  </div>

                  <div className="group/card p-3 rounded-xl hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-700/60 cursor-pointer">
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="font-semibold text-white text-sm">Bank Statement Parser</div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Automated bank ledger reconciliations across 500+ bank formats with zero templates.
                    </p>
                  </div>

                  <div className="group/card p-3 rounded-xl hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-700/60 cursor-pointer">
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="font-semibold text-white text-sm">KYC & Identity Docs</div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Aadhaar, Passport, PAN & Tax document validation with fraud anomaly detection.
                    </p>
                  </div>

                  <div className="group/card p-3 rounded-xl hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-700/60 cursor-pointer">
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="font-semibold text-white text-sm">Trade & Logistics AI</div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Bills of Lading, Packing Lists & Customs manifests processed instantly.
                    </p>
                  </div>
                </div>

                {/* Right Callout Card */}
                <div className="col-span-4 bg-gradient-to-br from-indigo-950/80 via-purple-950/40 to-slate-900 p-4 rounded-xl border border-indigo-500/20 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      Enterprise Advantage
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2 mb-1">Custom LLM Document Models</h4>
                    <p className="text-xs text-slate-300 leading-normal">
                      Train tailored document parsing AI models on your company documents in less than 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={onOpenDemo}
                    className="mt-3 text-xs text-cyan-300 font-semibold flex items-center gap-1 hover:gap-2 transition-all hover:text-cyan-200"
                  >
                    Request Custom Model →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Item 2: Solutions (Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('solutions')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              onClick={() => toggleMenu('solutions')}
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-all duration-200 ${
                activeMenu === 'solutions'
                  ? 'text-cyan-400 bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Solutions
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  activeMenu === 'solutions' ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                }`}
              />
            </button>

            {activeMenu === 'solutions' && (
              <div className="absolute top-full left-0 w-64 mt-2 bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-xl p-2 animate-in fade-in duration-150 z-50">
                <a href="#lead-form" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 text-xs font-medium">
                  <Building2 className="w-4 h-4 text-indigo-400" /> Accounts Payable Automation
                </a>
                <a href="#lead-form" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 text-xs font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Banking & Lender Underwriting
                </a>
                <a href="#lead-form" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 text-xs font-medium">
                  <Cpu className="w-4 h-4 text-purple-400" /> Supply Chain & Freight IDP
                </a>
              </div>
            )}
          </div>

          {/* Item 3: Platform */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('platform')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              onClick={() => toggleMenu('platform')}
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-all duration-200 ${
                activeMenu === 'platform'
                  ? 'text-cyan-400 bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Platform
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  activeMenu === 'platform' ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                }`}
              />
            </button>

            {activeMenu === 'platform' && (
              <div className="absolute top-full left-0 w-64 mt-2 bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-xl p-2 animate-in fade-in duration-150 z-50">
                <a href="#features" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 text-xs font-medium">
                  <Zap className="w-4 h-4 text-cyan-400" /> Adaptive Computer Vision
                </a>
                <a href="#features" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 text-xs font-medium">
                  <Layers className="w-4 h-4 text-indigo-400" /> Enterprise REST APIs & SDKs
                </a>
                <a href="#features" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 text-xs font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> SOC2 & ISO 27001 Security
                </a>
              </div>
            )}
          </div>

          {/* Item 4: ROI Calculator */}
          <a
            href="#roi-calculator"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" /> ROI Calculator
          </a>

          {/* Item 5: Pricing */}
          <a
            href="#roi-calculator"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            Pricing
          </a>

          {/* Item 6: Resources */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('resources')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              onClick={() => toggleMenu('resources')}
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-all duration-200 ${
                activeMenu === 'resources'
                  ? 'text-cyan-400 bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Resources
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  activeMenu === 'resources' ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                }`}
              />
            </button>

            {activeMenu === 'resources' && (
              <div className="absolute top-full right-0 w-56 mt-2 bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-xl p-2 animate-in fade-in duration-150 z-50">
                <a href="#lead-form" className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-800 text-slate-200 text-xs font-medium">
                  <BookOpen className="w-4 h-4 text-indigo-400" /> API Documentation
                </a>
                <a href="#lead-form" className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-800 text-slate-200 text-xs font-medium">
                  <HelpCircle className="w-4 h-4 text-cyan-400" /> Case Studies
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenDemo}
            className="relative group overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/40 active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 group-hover:opacity-90 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Book Live Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-28 bg-slate-950/98 backdrop-blur-2xl border-b border-indigo-500/30 p-6 shadow-2xl max-h-[calc(100vh-7rem)] overflow-y-auto z-50 animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-3">
            {/* Products Accordion */}
            <div className="border-b border-slate-800 pb-3">
              <button
                onClick={() => toggleAccordion('products')}
                className="w-full flex items-center justify-between text-left font-semibold text-white text-base py-2"
              >
                Products
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 transition-transform ${
                    openAccordion === 'products' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'products' && (
                <div className="pl-3 mt-2 flex flex-col gap-2 text-sm text-slate-300">
                  <a href="#lead-form" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-cyan-300">Invoice AI Processor</a>
                  <a href="#lead-form" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-cyan-300">Bank Statement Parser</a>
                  <a href="#lead-form" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-cyan-300">KYC & Identity Documents</a>
                  <a href="#lead-form" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-cyan-300">Trade & Freight Manifests</a>
                </div>
              )}
            </div>

            {/* Solutions Accordion */}
            <div className="border-b border-slate-800 pb-3">
              <button
                onClick={() => toggleAccordion('solutions')}
                className="w-full flex items-center justify-between text-left font-semibold text-white text-base py-2"
              >
                Solutions
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 transition-transform ${
                    openAccordion === 'solutions' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'solutions' && (
                <div className="pl-3 mt-2 flex flex-col gap-2 text-sm text-slate-300">
                  <a href="#lead-form" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-cyan-300">Accounts Payable Automation</a>
                  <a href="#lead-form" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-cyan-300">Banking & Lender Underwriting</a>
                </div>
              )}
            </div>

            {/* ROI Calculator */}
            <a
              href="#roi-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="font-semibold text-white text-base py-2 border-b border-slate-800 flex items-center justify-between"
            >
              ROI Calculator <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">Live Tool</span>
            </a>

            {/* Mobile CTA */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="mt-4 w-full py-3 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 rounded-xl font-bold text-white shadow-lg text-center"
            >
              Book Live Demo Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
