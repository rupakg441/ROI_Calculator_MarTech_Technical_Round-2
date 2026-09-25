'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroMarquee from '@/components/HeroMarquee';
import LeadFormSection from '@/components/LeadFormSection';
import CalendarModal from '@/components/CalendarModal';
import RoiCalculator from '@/components/RoiCalculator';
import FeatureShowcase from '@/components/FeatureShowcase';
import Footer from '@/components/Footer';

export default function Home() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeLead, setActiveLead] = useState<any>(null);

  const handleLeadSuccess = (leadData: any) => {
    setActiveLead(leadData);
    setCalendarOpen(true);
  };

  const handleOpenDemo = () => {
    const leadFormEl = document.getElementById('lead-form');
    if (leadFormEl) {
      leadFormEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCalendarOpen(true);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Header onOpenDemo={handleOpenDemo} />

      {/* Hero Section & Continuous Logo Marquee */}
      <HeroMarquee onOpenDemo={handleOpenDemo} />

      {/* Lead Generation Form (Left Trust Signals + Right Form) */}
      <LeadFormSection onLeadSuccess={handleLeadSuccess} />

      {/* Interactive Sheet-Verified ROI Calculator */}
      <RoiCalculator />

      {/* Enterprise Features Showcase */}
      <FeatureShowcase />

      {/* Footer & Registered Address */}
      <Footer />

      {/* Post-Submission Interactive Calendar Scheduler Modal */}
      <CalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        leadData={activeLead}
      />
    </main>
  );
}
