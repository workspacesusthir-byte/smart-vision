'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, BookOpen, Users, Award, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Free Diagnostic Assessment',
      desc: 'Our certified master trainer evaluates your child’s current calculation speed, number visualization, and concentration levels.',
      icon: Calendar,
      tag: 'Step 1 • 20 Mins'
    },
    {
      num: '02',
      title: 'Personalized Learning Plan',
      desc: 'Based on the diagnostic score, we curate an age-customized roadmap with specific level targets and learning milestones.',
      icon: BookOpen,
      tag: 'Step 2 • Custom Curriculum'
    },
    {
      num: '03',
      title: 'Small-Batch Training (1:8)',
      desc: 'Interactive live sessions with continuous tactile bead drills, speed cards, and personalized mentor attention.',
      icon: Users,
      tag: 'Step 3 • Weekly 2 Classes'
    },
    {
      num: '04',
      title: 'Track Progress & Achieve',
      desc: 'Regular portal speed tests, automatic grading, parental report cards, and State/National Championship participation.',
      icon: Award,
      tag: 'Step 4 • Recognized Certification'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#ed4883] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured 4-Step Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#040430] tracking-tight">
            How We Transform Your Child Into a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed4883] to-indigo-600">
              Math Prodigy
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Our step-by-step framework ensures guaranteed visible results in mental speed, focus, and school grades within just 60 days.
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-slate-200 font-mono">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#ed4883]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block mb-3">
                    {st.tag}
                  </span>

                  <h3 className="text-lg font-black text-[#040430] mb-2 leading-snug">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-bold text-[#ed4883]">
                  Phase {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <Link
            href="/#assessment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#040430] text-white hover:bg-[#ed4883] font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-indigo-950/20"
          >
            <span>Start with Step 01: Book Free Diagnostic Class</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
