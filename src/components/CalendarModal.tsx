'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  X,
  ExternalLink,
  UserCheck,
  Video,
  Sparkles,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadData: any;
}

const AVAILABLE_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
];

export default function CalendarModal({ isOpen, onClose, leadData }: CalendarModalProps) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState(AVAILABLE_SLOTS[1]);
  const [isBooking, setIsBooking] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  if (!isOpen) return null;

  const handleConfirmBooking = async () => {
    setIsBooking(true);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: leadData?.leadId || 'LEAD-101',
          fullName: leadData?.fullName || 'Valued Guest',
          workEmail: leadData?.workEmail || 'lead@company.com',
          companyName: leadData?.companyName || 'Enterprise',
          selectedDate,
          selectedTime,
          timeZone: 'IST (UTC+5:30)',
        }),
      });

      const data = await res.json();
      setIsBooking(false);

      if (data.success) {
        setConfirmedBooking(data.booking);
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
          });
        } catch (e) {
          // fallback
        }
      }
    } catch (err) {
      console.error(err);
      setIsBooking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/80 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedBooking ? (
          <div>
            {/* Step 1: Slot Selection */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-cyan-400 border border-cyan-500/30">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Step 2 of 2</span>
                <h3 className="text-xl font-bold text-white">Select Demo & Solution Slot</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Thank you, <strong className="text-white">{leadData?.fullName || 'there'}</strong>! Your lead profile was captured and synced. Please select your preferred 30-minute technical session.
            </p>

            {/* Date Selection */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" /> Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500"
              />
            </div>

            {/* Time Slots */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> Available Time Slots (IST)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {AVAILABLE_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${
                      selectedTime === slot
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm CTA */}
            <button
              onClick={handleConfirmBooking}
              disabled={isBooking}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 font-bold text-white text-sm shadow-xl shadow-indigo-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isBooking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-200" />
                  <span>Generating Calendar Invite...</span>
                </>
              ) : (
                <>
                  <span>Confirm Booking ({selectedTime})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        ) : (
          /* Step 2: Confirmed Screen */
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Meeting Confirmed!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto mb-6">
              A calendar invitation has been reserved for <strong className="text-white">{confirmedBooking.dateTimeFormatted}</strong> with Hexanovate's MarTech AI team.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs mb-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Video className="w-4 h-4 text-cyan-400" />
                <span>Google Meet Link: <a href={confirmedBooking.meetUrl} target="_blank" rel="noreferrer" className="text-cyan-300 underline font-mono">{confirmedBooking.meetUrl}</a></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <UserCheck className="w-4 h-4 text-purple-400" />
                <span>Host: Hexanovate AI Architecture Team</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={confirmedBooking.googleCalendarUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-white text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                Add to Google Calendar <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
