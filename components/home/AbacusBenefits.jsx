'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, Brain, Eye, Compass, ShieldCheck, CheckCircle2, ArrowRight
} from 'lucide-react';

export function AbacusBenefits() {
  const benefits = [
    {
      title: 'Dual Brain Stimulation',
      desc: 'Moving physical beads with both hands simultaneously activates the left hemisphere (logic, math, sequencing) and the right hemisphere (creativity, visualization, spatial intuition).',
      icon: Brain,
      stat: '100% Whole Brain'
    },
    {
      title: 'Laser Focus & Concentration',
      desc: 'Children learn to block external noise while computing multi-digit flash cards, directly strengthening classroom attention spans.',
      icon: Zap,
      stat: '3× Longer Focus'
    },
    {
      title: 'Photographic Memory',
      desc: 'Instead of memorizing dull formulas, students visualize an internal mental abacus where beads shift at lightning speed.',
      icon: Eye,
      stat: 'Visual Recall'
    },
    {
      title: 'STEM Foundation',
      desc: 'Sharpens fundamental numerical agility and logical sequencing needed for physics, coding, engineering, and competitive exams.',
      icon: Compass,
      stat: 'Lifelong Edge'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Descriptive Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-[#ed4883] text-xs font-bold uppercase tracking-wider border border-pink-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>The Neuroscience of Abacus</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#040430] tracking-tight leading-tight">
              Why Abacus Calculation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed4883] to-indigo-600">
                Rewires the Growing Brain
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Standard schooling predominantly engages the brain’s left hemisphere through repetitive memorization. The Soroban Abacus bridges both hemispheres through tactile bead manipulation, auditory numbers dictation, and visual bead imagination.
            </p>

            <div className="space-y-4 pt-2">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-indigo-50/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-[#ed4883] shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {b.stat}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Diagram Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-gradient-to-tr from-[#040430] to-[#1e1b4b] p-8 text-white shadow-2xl overflow-hidden border border-indigo-900">
              
              {/* Glow accents */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ed4883]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#ed4883] uppercase tracking-wider block">
                      Cognitive Synergy
                    </span>
                    <h3 className="text-xl font-bold text-white">Left vs. Right Hemisphere</h3>
                  </div>
                  <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-slate-300 font-mono">
                    Soroban Model
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Left Brain */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <h5 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                      Left Brain (Logic)
                    </h5>
                    <ul className="text-xs space-y-2 text-slate-300">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>Linear Arithmetic</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>Step Sequencing</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>Formulas &amp; Rules</span>
                      </li>
                    </ul>
                  </div>

                  {/* Right Brain */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <h5 className="text-xs font-bold text-[#ed4883] uppercase tracking-wider mb-2">
                      Right Brain (Intuition)
                    </h5>
                    <ul className="text-xs space-y-2 text-slate-300">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ed4883]" />
                        <span>Mental Bead Imaging</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ed4883]" />
                        <span>Spatial Awareness</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ed4883]" />
                        <span>Intuitive Instant Recall</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Abacus Soroban Bead Formula Representation */}
                <div className="bg-black/30 rounded-2xl p-4 border border-white/10 text-center">
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest mb-1">
                    Authentic Soroban Architecture (1 Upper • 4 Lower)
                  </p>
                  <p className="font-mono text-sm font-bold text-amber-300">
                    5 (Heaven Bead) + [ 1 + 1 + 1 + 1 ] (Earth Beads) = Pure Number Clarity
                  </p>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#ed4883] hover:text-white transition-colors"
                  >
                    <span>Explore Full Level-by-Level Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
