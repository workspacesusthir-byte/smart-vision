import React from 'react';
import { Header } from '@/components/common/Header';
import { Testimonials } from '@/components/home/Testimonials';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CtaSection } from '@/components/home/CtaSection';
import { Footer } from '@/components/common/Footer';
import { Chatbot } from '@/components/common/Chatbot';

export default function ReviewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-indigo-50/70 to-white py-16 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ed4883] bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
              Verified Feedback
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[#040430] mt-4 mb-4 tracking-tight">
              Parent Reviews &amp; Testimonials
            </h1>
            <p className="max-w-2xl mx-auto text-base text-slate-600 leading-relaxed">
              Read how The Smart Vision Academy has made math an exciting, enjoyable strength for students across India.
            </p>
          </div>
        </section>
        <Testimonials />
        <WhyChooseUs />
        <CtaSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
