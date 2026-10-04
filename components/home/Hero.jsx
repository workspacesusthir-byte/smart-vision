'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, ArrowRight, Zap, Brain, GraduationCap, CheckCircle2, Star, ShieldCheck
} from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 py-16 lg:py-24 border-b border-slate-200">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 math-grid opacity-60 pointer-events-none" />

      {/* Radiant Glow Orb */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-pink-200/80 shadow-xs shadow-pink-500/10">
              <span className="flex h-2 w-2 rounded-full bg-[#ed4883] animate-ping" />
              <Sparkles className="w-4 h-4 text-[#ed4883]" />
              <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                Premier Abacus &amp; Vedic Math Academy (Ages 4–15)
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#040430] tracking-tight leading-[1.12]">
              Build Lightning-Fast <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed4883] to-indigo-600">
                Mental Math
              </span>{' '}
              &amp; Confidence
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Turn math fear into your child’s greatest superpower. Our structured Soroban Abacus and Vedic Mathematics curriculum develops 10× faster calculation speed, razor-sharp focus, and lifelong academic brilliance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/#assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#ed4883] to-[#d6336c] hover:brightness-105 rounded-xl shadow-lg shadow-pink-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Book Free Diagnostic Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/login?role=student"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#040430] bg-white hover:bg-slate-100 rounded-xl border border-slate-300 shadow-xs transition-all"
              >
                <Brain className="w-4 h-4 text-indigo-600" />
                <span>Try Interactive Quiz Portal</span>
              </Link>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Small Batches (1:8 Ratio)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Certified Master Trainers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Online &amp; Offline Sessions</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card */}
              <div className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-2xl shadow-indigo-950/10 border border-indigo-100 overflow-hidden">
                {/* Header inside card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <Zap className="w-5 h-5 text-[#ed4883]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Mental Speed Drill</h4>
                      <p className="text-[11px] text-slate-500">Live Student Simulation</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Speed: 0.8s
                  </span>
                </div>

                {/* Simulated Math Problem */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 mb-6">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Problem 01 • Abacus Mental Calculation
                  </p>
                  <div className="text-2xl sm:text-3xl font-black text-[#040430] font-mono tracking-tight">
                    478 + 389 - 145 = ?
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-200/60">
                    <span className="text-slate-600">Mental Solution:</span>
                    <span className="font-mono font-bold text-lg text-emerald-600">722 ✓</span>
                  </div>
                </div>

                {/* Key Metric Gauges inside card */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-pink-50/60 border border-pink-100">
                    <div className="text-xs text-slate-600 font-medium">Calculation Speed</div>
                    <div className="text-xl font-black text-[#ed4883] mt-0.5">10× Faster</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">vs. Standard methods</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
                    <div className="text-xs text-slate-600 font-medium">Concept Retention</div>
                    <div className="text-xl font-black text-indigo-900 mt-0.5">98.4%</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Photographic memory</div>
                  </div>
                </div>

                {/* Floating Badge on Card */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800 ml-1">4.9/5</span>
                  </div>
                  <span className="text-slate-500">Over 3,500+ happy parents</span>
                </div>
              </div>

              {/* Decorative floating pills */}
              <div className="absolute -bottom-4 -left-4 bg-white py-2 px-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 animate-float">
                <Brain className="w-5 h-5 text-indigo-600" />
                <span className="text-xs font-bold text-slate-800">Whole Brain Synergy</span>
              </div>

              <div className="absolute -top-4 -right-4 bg-white py-2 px-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 animate-float-delayed">
                <ShieldCheck className="w-5 h-5 text-[#ed4883]" />
                <span className="text-xs font-bold text-slate-800">ISO 9001 Quality</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
