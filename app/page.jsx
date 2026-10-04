import React from 'react';
import { Header } from '@/components/common/Header';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Programs } from '@/components/home/Programs';
import { HowItWorks } from '@/components/home/HowItWorks';
import { AbacusBenefits } from '@/components/home/AbacusBenefits';
import { Achievements } from '@/components/home/Achievements';
import { Testimonials } from '@/components/home/Testimonials';
import { CtaSection } from '@/components/home/CtaSection';
import { Footer } from '@/components/common/Footer';
import { Chatbot } from '@/components/common/Chatbot';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <WhyChooseUs />
        <Programs />
        <HowItWorks />
        <AbacusBenefits />
        <Achievements />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
