'use client';

import React from 'react';
import { Zap, Brain, Users, Award } from 'lucide-react';

export function Stats() {
  const stats = [
    {
      value: '10×',
      label: 'Faster Calculation Speed',
      desc: 'Beats digital calculators in rapid mental addition, subtraction & division.',
      icon: Zap,
      color: 'text-[#ed4883]',
      bg: 'bg-pink-50'
    },
    {
      value: '98%',
      label: 'Concept Clarity',
      desc: 'Deep fundamental understanding of place values and mathematical formulas.',
      icon: Brain,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      value: '3,500+',
      label: 'Students Mentored',
      desc: 'Children aged 4–15 across 14+ countries excelling in school and competitions.',
      icon: Users,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      value: '12+ Yrs',
      label: 'Pedagogical Excellence',
      desc: 'Award-winning master trainers certified in authentic Japanese Soroban.',
      icon: Award,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-black text-[#040430] tracking-tight">
                    {s.value}
                  </span>
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  {s.label}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
