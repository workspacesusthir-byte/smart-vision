'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calculator, Sparkles, Trophy, Zap, CheckCircle2, ArrowRight, Clock, Users, BookOpen
} from 'lucide-react';

export function Programs() {
  const programs = [
    {
      id: 'abacus',
      title: 'Smart Abacus Foundation',
      age: 'Ages 4 to 8 Years',
      tagline: 'Sensory Bead Mastery & Foundational Arithmetic',
      desc: 'Build strong number visualization using physical Japanese Soroban abacus. Progresses to mental abacus, boosting concentration and spatial memory.',
      badge: 'Most Popular for Young Learners',
      badgeColor: 'bg-[#ed4883] text-white',
      duration: '8 Levels • 3 Months/Level',
      batchSize: 'Max 8 Students',
      icon: Calculator,
      color: 'border-pink-200 hover:border-[#ed4883]',
      features: [
        'Single & Double Digit Addition/Subtraction',
        'Physical Soroban to Mental Bead Imaging',
        'Improves Hand-Eye-Brain Coordination',
        'Weekly Speed Drills & Flash Cards'
      ]
    },
    {
      id: 'vedic',
      title: 'Vedic Mathematics Mastery',
      age: 'Ages 9 to 14 Years',
      tagline: 'Ancient Sutras for Ultra-Fast Mental Math',
      desc: 'Master ancient Indian mathematical sutras that turn complex multiplication, divisions, square roots, and algebraic equations into instant 5-second mental steps.',
      badge: 'Ideal for Middle & High School',
      badgeColor: 'bg-indigo-900 text-white',
      duration: '6 Modules • 16 Weeks',
      batchSize: 'Max 10 Students',
      icon: Zap,
      color: 'border-indigo-200 hover:border-indigo-600',
      features: [
        'Fast Squares, Cubes & Higher Roots',
        'Nikhilam & Ekadhikena Fast Multiplication',
        'High-Speed Checking by Digit Sums (Navasesh)',
        'Exam Time Management & Short Cut Secrets'
      ]
    },
    {
      id: 'olympiad',
      title: 'Olympiad Math Champion',
      age: 'Classes 3 to 8',
      tagline: 'Competitive Problem Solving & Critical Thinking',
      desc: 'Tailored specifically for students aiming for top percentiles in IMO, NSTSE, SASMO, and regional arithmetic competitions with non-routine problem solving.',
      badge: 'Advanced Honors Track',
      badgeColor: 'bg-amber-600 text-white',
      duration: 'Comprehensive Annual Track',
      batchSize: 'Max 6 Students',
      icon: Trophy,
      color: 'border-amber-200 hover:border-amber-500',
      features: [
        'Non-Routine Logical Reasoning Patterns',
        'Past 10 Years Olympiad Question Vault',
        'Mock Tests with Live National Benchmarking',
        '1-on-1 Strategy & Weak-Area Remediation'
      ]
    }
  ];

  return (
    <section id="programs" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-100">
            <BookOpen className="w-3.5 h-3.5 text-[#ed4883]" />
            <span>Age-Appropriate Pedagogy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#040430] tracking-tight">
            Curated Programs Designed for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed4883] to-indigo-600">
              Maximum Cognitive Growth
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Every child is placed in the optimal track after a diagnostic assessment, ensuring they learn at a comfortable pace with small-batch mentor guidance.
          </p>
        </div>

        {/* 3 Program Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div 
                key={prog.id}
                className={`rounded-3xl p-8 bg-slate-50/70 border-2 ${prog.color} transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${prog.badgeColor}`}>
                      {prog.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {prog.duration}
                    </span>
                  </div>

                  {/* Program Title */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-[#ed4883]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#040430] leading-tight">
                        {prog.title}
                      </h3>
                      <span className="text-xs font-bold text-indigo-700">
                        {prog.age}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-medium italic mt-2 mb-4">
                    &ldquo;{prog.tagline}&rdquo;
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {prog.desc}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-200/80 mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Key Program Inclusions:
                    </p>
                    {prog.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{prog.batchSize}</span>
                  </div>
                  <Link
                    href={`/#assessment?program=${prog.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#040430] hover:bg-[#ed4883] transition-colors"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
