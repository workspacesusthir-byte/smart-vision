'use client';

import React from 'react';
import { Zap, Eye, Compass, Trophy, CheckCircle, Sparkles } from 'lucide-react';

export function WhyChooseUs() {
  const pillars = [
    {
      title: 'Mental Speed',
      subtitle: 'Lightning-Fast Reflexes',
      desc: 'Students solve multi-digit arithmetic in seconds without pen, paper, or electronic gadgets through bead visualization.',
      icon: Zap,
      color: 'from-pink-500 to-rose-600',
      tag: '10× Acceleration'
    },
    {
      title: 'Memory & Recall',
      subtitle: 'Photographic Number Sense',
      desc: 'Trains the visual cortex and spatial memory, turning abstract digits into vivid tactile mental pictures.',
      icon: Eye,
      color: 'from-indigo-600 to-blue-700',
      tag: 'Dual Brain Stimulation'
    },
    {
      title: 'Logical Thinking',
      subtitle: 'Structured Problem Solving',
      desc: 'Builds step-by-step analytical reasoning and pattern recognition crucial for STEM disciplines and competitive exams.',
      icon: Compass,
      color: 'from-amber-500 to-orange-600',
      tag: 'Critical Reasoning'
    },
    {
      title: 'Academic Confidence',
      subtitle: 'Eliminate Math Anxiety',
      desc: 'Transforms hesitant learners into enthusiastic problem solvers who eagerly raise their hands in school classes.',
      icon: Trophy,
      color: 'from-emerald-500 to-teal-600',
      tag: 'Zero Math Fear'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#ed4883] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Parents Trust The Smart Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#040430] tracking-tight">
            More Than Math. We Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed4883] to-indigo-600">
              Confident Thinkers
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Our scientifically engineered pedagogy combines ancient mental arithmetic traditions with modern cognitive development techniques to build whole-brain capability.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${p.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#040430] tracking-tight">
                    {p.title}
                  </h3>
                  <h4 className="text-xs font-bold text-[#ed4883] mb-3">
                    {p.subtitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Proven Cognitive Benefit</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
