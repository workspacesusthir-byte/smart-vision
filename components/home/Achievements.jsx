'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, Medal, Star, CheckCircle, TrendingUp, Users, Award } from 'lucide-react';

export function Achievements() {
  const highlights = [
    {
      metric: '3,500+',
      label: 'Students Mentored',
      desc: 'Trained across Delhi-NCR and international virtual batches.'
    },
    {
      metric: '185+',
      label: 'Championship Trophies',
      desc: 'Won at State, National & International Mental Arithmetic Olympiads.'
    },
    {
      metric: '98.4%',
      label: 'Academic Math Improvement',
      desc: 'Parents report grade jumps from average to A/A+ within 2 terms.'
    },
    {
      metric: '0.6 Sec',
      label: 'Fastest Recorded Calculation',
      desc: 'Record set by 9-year-old student solving 3-digit flash arithmetic.'
    }
  ];

  const champions = [
    {
      name: 'Aarav Patel',
      age: '9 Years',
      award: '1st Rank • State Abacus Championship 2025',
      achievement: 'Calculated 50 single-digit additions in 32 seconds flat without physical tools.',
      badge: 'Gold Medalist'
    },
    {
      name: 'Ananya Iyer',
      age: '11 Years',
      award: 'National Vedic Math Olympiad Top 1%',
      achievement: 'Solved complex 3-digit multiplication in under 4 seconds using Nikhilam Sutras.',
      badge: 'National Star'
    },
    {
      name: 'Kabir Malhotra',
      age: '7 Years',
      award: 'Soroban Speed Master Level 4',
      achievement: 'Progressed from basic finger counting to mental multi-digit arithmetic in 5 months.',
      badge: 'Rising Prodigy'
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Proven Track Record of Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#040430] tracking-tight">
            Our Hall of Champions &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-[#ed4883]">
              Proven Student Results
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            From kindergarteners conquering number fear to school toppers winning national medals, here is the tangible impact of our training.
          </p>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((h, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs text-center">
              <span className="block text-3xl sm:text-4xl font-black text-[#040430] tracking-tight font-mono">
                {h.metric}
              </span>
              <span className="block text-xs sm:text-sm font-bold text-[#ed4883] mt-1 mb-2">
                {h.label}
              </span>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                {h.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Champion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {champions.map((champ, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    <Medal className="w-3.5 h-3.5 text-amber-600" />
                    {champ.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {champ.age}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#040430] mb-1">
                  {champ.name}
                </h3>
                <p className="text-xs font-bold text-indigo-700 mb-3">
                  {champ.award}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {champ.achievement}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>The Smart Vision Academy</span>
                <span className="text-emerald-600 font-bold">Verified Result</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
