import React from 'react';
import { Header } from '@/components/common/Header';
import { Programs } from '@/components/home/Programs';
import { HowItWorks } from '@/components/home/HowItWorks';
import { CtaSection } from '@/components/home/CtaSection';
import { Footer } from '@/components/common/Footer';
import { Chatbot } from '@/components/common/Chatbot';

export default function ProgramsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-indigo-50/70 to-white py-16 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ed4883] bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
              Age-Specific Curriculum
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[#040430] mt-4 mb-4 tracking-tight">
              Our Academic Programs
            </h1>
            <p className="max-w-2xl mx-auto text-base text-slate-600 leading-relaxed">
              Explore our structured levels in Soroban Abacus, Vedic Mental Math, and Olympiad problem-solving.
            </p>
          </div>
        </section>
        <Programs />
        <HowItWorks />
        <CtaSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
