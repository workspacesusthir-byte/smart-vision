import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Sparkles, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#040430] text-slate-300 pt-16 pb-12 border-t border-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md p-1 shrink-0 overflow-hidden">
                <Image 
                  src="https://thesmartvision.in/wp-content/uploads/2025/05/tsv.png"
                  alt="The Smart Vision Logo"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="block font-black text-white text-base tracking-tight uppercase leading-none font-serif">
                  THE SMART VISION
                </span>
                <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
                  Abacus &amp; Mental Math Academy
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Empowering children aged 4 to 15 with rapid calculation speed, laser-sharp focus, photographic memory, and competitive academic confidence through authentic Soroban Abacus and Vedic Mathematics.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISO 9001:2015 Certified Curriculum</span>
            </div>
          </div>

          {/* Column 2: Programs */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-indigo-900 pb-2">
              Our Core Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/programs#abacus" className="hover:text-[#ed4883] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ed4883]" />
                  <span>Smart Abacus Foundation (4–8 yrs)</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#vedic" className="hover:text-[#ed4883] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ed4883]" />
                  <span>Vedic Mathematics Mastery (9–14 yrs)</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#olympiad" className="hover:text-[#ed4883] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ed4883]" />
                  <span>Olympiad Math Champion (Classes 3–8)</span>
                </Link>
              </li>
              <li>
                <Link href="/programs#speed" className="hover:text-[#ed4883] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ed4883]" />
                  <span>Speed Mental Arithmetic Drill</span>
                </Link>
              </li>
              <li>
                <Link href="/#assessment" className="text-[#ed4883] hover:underline font-medium text-xs mt-3 inline-block">
                  → Book Free Assessment Test
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-indigo-900 pb-2">
              Academy Portals
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/login?role=student" className="hover:text-white transition-colors">
                  Student Assessment &amp; Quiz Portal
                </Link>
              </li>
              <li>
                <Link href="/login?role=teacher" className="hover:text-white transition-colors">
                  Teacher Administration Dashboard
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  4-Step Learning Methodology
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-white transition-colors">
                  State &amp; National Champions
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Parent Reviews &amp; Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-3.5">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-indigo-900 pb-2">
              Admissions Office
            </h3>

            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-[#ed4883] shrink-0 mt-1" />
              <span>The Smart Vision Academy, Sector 14, Mathura Road, Faridabad, NCR / Online PAN-India</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-[#ed4883] shrink-0" />
              <a href="tel:+919876543210" className="hover:text-white transition-colors">
                +91 98765 43210
              </a>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-[#ed4883] shrink-0" />
              <a href="mailto:admissions@thesmartvision.in" className="hover:text-white transition-colors">
                admissions@thesmartvision.in
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Mon – Sat: 9:00 AM – 7:30 PM IST</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} The Smart Vision - Abacus &amp; Mental Math Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/programs" className="hover:text-white transition-colors">Curriculum</Link>
            <Link href="/login" className="hover:text-white transition-colors">Portal Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
