'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Heart, CheckCircle2 } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Pooja Singhania',
      role: 'Parent of Vivaan (Age 7)',
      location: 'Faridabad, Haryana',
      rating: 5,
      content: 'Vivaan used to cry whenever homework time started. Just 4 months into The Smart Vision Abacus program, math has become his favorite game. He computes faster than me now without any hesitation!',
      tag: 'Smart Abacus Foundation'
    },
    {
      id: 2,
      name: 'Dr. Sameer Verma',
      role: 'Parent of Riya (Age 12)',
      location: 'Gurugram, NCR',
      rating: 5,
      content: 'The Vedic Math course completely transformed Riya’s speed in school exams. She used to run out of time in Class 7 unit tests. Last term, she finished 20 minutes before time and scored 98%!',
      tag: 'Vedic Math Mastery'
    },
    {
      id: 3,
      name: 'Meenakshi Iyer',
      role: 'Parent of Ananya (Age 10)',
      location: 'Bengaluru (Online Batch)',
      rating: 5,
      content: 'Even though we live in Bangalore and take the online batch, the teacher gives individual attention as if sitting right next to her. The interactive speed drills and weekly feedback are unparalleled.',
      tag: 'Online Global Batch'
    },
    {
      id: 4,
      name: 'Amitabh Mukherjee',
      role: 'Parent of Rohan (Age 8)',
      location: 'Noida, UP',
      rating: 5,
      content: 'Rohan won 2nd prize in the State Mental Arithmetic competition last month. The academy’s focus on posture, concentration, and photographic bead imaging is genuine and results-driven.',
      tag: 'Competition Preparation'
    },
    {
      id: 5,
      name: 'Sunita Chauhan',
      role: 'Parent of Aarush (Age 6)',
      location: 'Delhi',
      rating: 5,
      content: 'I enrolled Aarush at age 5 to keep him engaged during summer. Today he does double-digit additions mentally in 2 seconds. His memory and attention span in general schooling have noticeably expanded.',
      tag: 'Early Math Acceleration'
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const next = () => setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <section id="reviews" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-[#ed4883] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#ed4883]" />
            <span>Trusted by 3,500+ Families</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#040430] tracking-tight">
            Loved by Parents, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed4883] to-indigo-600">
              Celebrated by Children
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Real stories from parents who witnessed their children transform from math-anxious to confident academic achievers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              className="bg-slate-50/70 rounded-3xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#ed4883] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                    {item.tag}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-slate-300 mb-2" />

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <h4 className="text-sm font-bold text-[#040430]">{item.name}</h4>
                <p className="text-xs text-slate-500">{item.role}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Testimonials Carousel / Banner */}
        <div className="mt-8 bg-gradient-to-r from-indigo-900 to-[#040430] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-[#ed4883] uppercase tracking-wider">
              Parent Review Spotlight • {testimonials[activeIdx].name}
            </span>
            <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
              &ldquo;{testimonials[activeIdx].content}&rdquo;
            </p>
            <p className="text-xs text-slate-400">
              {testimonials[activeIdx].role} — {testimonials[activeIdx].location}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prev}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-slate-300 font-mono">
              {activeIdx + 1} / {testimonials.length}
            </span>
            <button
              onClick={next}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
