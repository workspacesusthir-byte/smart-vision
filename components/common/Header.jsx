'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, X, LogIn, Phone, Sparkles
} from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      {/* Admission Announcement Bar */}
      <div className="bg-[#040430] border-b border-white/10 text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ed4883] text-white font-bold text-[10px] uppercase tracking-wider animate-pulse">
              Admissions Open
            </span>
            <span className="hidden sm:inline text-slate-200">
              Admissions Open for 2026–27 Academic Session — Online & Offline Batches
            </span>
            <span className="sm:hidden text-slate-200">
              Session 2026–27 Open
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a 
              href="tel:+919876543210" 
              className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#ed4883]" />
              <span>+91 98765 43210</span>
            </a>
            <Link
              href="/#assessment"
              className="text-[#ed4883] hover:text-white font-bold underline underline-offset-2 transition-colors"
            >
              Free Diagnostic Assessment
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md shadow-indigo-950/10 group-hover:scale-105 transition-transform border border-slate-200 overflow-hidden relative p-1 shrink-0">
              <Image 
                src="https://thesmartvision.in/wp-content/uploads/2025/05/tsv.png"
                alt="The Smart Vision Logo"
                width={48}
                height={48}
                className="object-contain w-full h-full"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block font-black text-lg sm:text-xl tracking-tight text-[#040430] uppercase leading-none font-serif">
                THE SMART VISION
              </span>
              <span className="block text-[11px] sm:text-xs font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
                Abacus &amp; Mental Math Academy
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-[#ed4883] transition-colors">Home</Link>
            <Link href="/about" className="hover:text-[#ed4883] transition-colors">About</Link>
            <Link href="/programs" className="hover:text-[#ed4883] transition-colors">Programs</Link>
            <Link href="/how-it-works" className="hover:text-[#ed4883] transition-colors">How It Works</Link>
            <Link href="/achievements" className="hover:text-[#ed4883] transition-colors">Achievements</Link>
            <Link href="/reviews" className="hover:text-[#ed4883] transition-colors">Reviews</Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#040430] hover:text-[#ed4883] bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
            >
              <LogIn className="w-4 h-4 text-indigo-600" />
              <span>Portal Login</span>
            </Link>

            <Link
              href="/#assessment"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#ed4883] hover:bg-[#d6336c] rounded-lg shadow-sm shadow-pink-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Free Assessment</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/login"
              className="p-2 text-slate-700 hover:text-[#040430]"
              aria-label="Login"
            >
              <LogIn className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#040430] focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              About
            </Link>
            <Link 
              href="/programs" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Programs
            </Link>
            <Link 
              href="/how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              How It Works
            </Link>
            <Link 
              href="/achievements" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Achievements
            </Link>
            <Link 
              href="/reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Reviews
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <LogIn className="w-4 h-4 text-indigo-600" />
              <span>Portal Login</span>
            </Link>
            <Link
              href="/#assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-[#ed4883] hover:bg-[#d6336c] rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Free Assessment</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
