'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, X, Send, Sparkles, ChevronRight, Phone, Mail, GraduationCap } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'What is the right age to start Abacus?',
    a: 'The optimal age to begin Soroban Abacus is between 4 and 8 years. At this developmental stage, the visual cortex and tactile neural pathways are most receptive to bead visualization and mental imaging.'
  },
  {
    q: 'How does Abacus differ from Vedic Mathematics?',
    a: 'Abacus is bead-visualization arithmetic suited for younger children (4–8 yrs) to build foundational number sense and concentration. Vedic Mathematics focuses on 16 mental calculation sutras for older children (9–14 yrs) to solve high-school level algebra, squares, roots, and competitive exams.'
  },
  {
    q: 'What are the class timings and batch sizes?',
    a: 'Classes run 2 days a week (1 hour per session) with flexible weekday and weekend options. Batch sizes are strictly kept at a maximum of 8 students to ensure 1-on-1 mentor guidance.'
  },
  {
    q: 'Do you offer both Online and Offline batches?',
    a: 'Yes! We conduct interactive online live classes across India and internationally, as well as offline classroom sessions at our NCR centers.'
  },
  {
    q: 'How can I try an assessment or quiz?',
    a: 'You can take an online test immediately in our Student Portal or book a free 1-on-1 diagnostic evaluation with a master trainer on this page.'
  }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#040430] hover:bg-[#ed4883] text-white rounded-full shadow-2xl transition-all duration-200 border-2 border-white/20 group cursor-pointer"
          aria-label="Open Admissions Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-[#ed4883] group-hover:bg-white text-white group-hover:text-[#ed4883] flex items-center justify-center transition-colors">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block pr-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-pink-300">Smart Vision Assistant</div>
            <div className="text-xs font-semibold">Have Questions? Ask Us</div>
          </div>
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[540px] animate-in fade-in slide-in-from-bottom-4 duration-150">
          
          {/* Header */}
          <div className="bg-[#040430] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#ed4883] flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">The Smart Vision Help Desk</h4>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Admissions Team Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick FAQ Body */}
          <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-50">
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs text-xs text-slate-700">
              👋 <strong>Hello! Welcome to The Smart Vision Academy.</strong>
              <p className="mt-1 text-slate-500">
                Click any common parent question below, or book a free diagnostic assessment:
              </p>
            </div>

            <div className="space-y-2">
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-2.5 text-left text-xs font-bold text-slate-800 hover:text-[#ed4883] flex items-center justify-between gap-2"
                  >
                    <span>{item.q}</span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-3 pb-3 pt-1 text-[11px] text-slate-600 bg-slate-50/50 border-t border-slate-100 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-indigo-50 p-3 rounded-2xl border border-indigo-100 text-xs">
              <span className="font-bold text-indigo-900 block mb-1">Direct Counselor Support</span>
              <a href="tel:+919876543210" className="flex items-center gap-1.5 text-indigo-700 font-semibold text-[11px] hover:underline">
                <Phone className="w-3.5 h-3.5 text-[#ed4883]" />
                <span>+91 98765 43210</span>
              </a>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-3 border-t border-slate-200 bg-white">
            <Link
              href="/#assessment"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#ed4883] to-[#d6336c] text-white text-xs font-bold rounded-xl shadow-xs hover:brightness-105 flex items-center justify-center gap-1.5 text-center"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Free Diagnostic Class</span>
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}
