'use client';

import React, { useState } from 'react';
import { Sparkles, Phone, Mail, CheckCircle2, ArrowRight, ShieldCheck, Calendar, Clock } from 'lucide-react';

export function CtaSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '6',
    phone: '',
    email: '',
    mode: 'online'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) return;
    setFormSubmitted(true);
  };

  return (
    <section id="assessment" className="py-20 bg-gradient-to-b from-slate-50 to-indigo-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-tr from-[#040430] to-[#1e1b4b] p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden relative border border-indigo-900">
          
          {/* Radiant decorative orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ed4883]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ed4883] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Risk • 100% Free Diagnostic Class</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Give Your Child the Advantage of Thinking{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed4883] to-pink-300">
                  10× Faster
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Book a complimentary 1-on-1 diagnostic assessment session with our master trainers. We assess your child’s calculation speed, concentration quotient, and numerical visualization.
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ed4883] shrink-0" />
                  <span>Personalized 1-on-1 Cognitive Evaluation (20 mins)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ed4883] shrink-0" />
                  <span>Detailed Math Aptitude &amp; Speed Diagnostic Report</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ed4883] shrink-0" />
                  <span>Customized Level Placement &amp; Batch Recommendation</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#ed4883]" />
                  <span>Helpline: +91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>Instant Confirmation within 2 Hours</span>
                </div>
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-100">
                {formSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Assessment Request Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Thank you, <strong className="text-slate-900">{formData.parentName}</strong>. Our admissions counselor will call you on <strong className="text-slate-900">{formData.phone}</strong> shortly to confirm your child’s diagnostic slot.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
                    >
                      Book Another Slot
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border-b border-slate-100 pb-3 mb-4">
                      <h3 className="text-lg font-bold text-[#040430]">
                        Book Free Assessment Class
                      </h3>
                      <p className="text-xs text-slate-500">
                        No credit card required. Free for ages 4–15.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Parent’s Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="e.g. Pooja Singhania"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#ed4883] focus:ring-1 focus:ring-[#ed4883]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Child’s Name
                        </label>
                        <input
                          type="text"
                          value={formData.childName}
                          onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                          placeholder="e.g. Vivaan"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#ed4883] focus:ring-1 focus:ring-[#ed4883]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Child’s Age *
                        </label>
                        <select
                          value={formData.childAge}
                          onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#ed4883] focus:ring-1 focus:ring-[#ed4883] bg-white"
                        >
                          <option value="4">4 Years (Early Abacus)</option>
                          <option value="5">5 Years (Junior Abacus)</option>
                          <option value="6">6 Years (Foundation)</option>
                          <option value="7">7 Years (Foundation)</option>
                          <option value="8">8 Years (Intermediate)</option>
                          <option value="9">9 Years (Vedic Math)</option>
                          <option value="10">10 Years (Vedic Math)</option>
                          <option value="11">11+ Years (Olympiad Track)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#ed4883] focus:ring-1 focus:ring-[#ed4883]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Learning Mode
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`flex items-center justify-center p-2.5 text-xs font-bold rounded-xl border cursor-pointer transition-colors ${formData.mode === 'online' ? 'bg-indigo-50 border-indigo-600 text-indigo-900' : 'border-slate-200 text-slate-600'}`}>
                          <input
                            type="radio"
                            name="mode"
                            value="online"
                            checked={formData.mode === 'online'}
                            onChange={() => setFormData({ ...formData, mode: 'online' })}
                            className="sr-only"
                          />
                          <span>🌐 Live Online Class</span>
                        </label>
                        <label className={`flex items-center justify-center p-2.5 text-xs font-bold rounded-xl border cursor-pointer transition-colors ${formData.mode === 'offline' ? 'bg-pink-50 border-[#ed4883] text-[#ed4883]' : 'border-slate-200 text-slate-600'}`}>
                          <input
                            type="radio"
                            name="mode"
                            value="offline"
                            checked={formData.mode === 'offline'}
                            onChange={() => setFormData({ ...formData, mode: 'offline' })}
                            className="sr-only"
                          />
                          <span>🏫 Offline Center</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ed4883] to-[#d6336c] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Confirm Free Diagnostic Slot</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-[10px] text-center text-slate-400">
                      🔒 Your phone number is strictly used for assessment coordination.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
