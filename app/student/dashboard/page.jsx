'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { 
  Trophy, Clock, CheckCircle2, ArrowRight, Play, BookOpen, 
  Brain, Zap, User, LogOut, Award, AlertCircle
} from 'lucide-react';

export function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState({
    id: 2,
    name: 'Aarav Patel',
    email: 'aarav@thesmartvision.in',
    role: 'student'
  });
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user session & quizzes
    const init = async () => {
      try {
        const userRes = await fetch('/api/auth/me');
        if (userRes.ok) {
          const userData = await userRes.json();
          if (userData.authenticated && userData.user) {
            setUser(userData.user);
          }
        }

        const quizRes = await fetch('/api/quizzes');
        if (quizRes.ok) {
          const quizData = await quizRes.json();
          if (quizData.success && quizData.quizzes) {
            setQuizzes(quizData.quizzes);
          }
        }
      } catch (err) {
        console.error('Failed to load student data:', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (e) {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#040430] to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#ed4883]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-black text-[#ed4883]">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                    Welcome back, {user.name}! 👋
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#ed4883] text-white px-2.5 py-0.5 rounded-full">
                    Student Level 4
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Ready to practice flash calculations and beat your personal speed record today?
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar inside Banner */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="text-slate-400">Total Quizzes Done</div>
              <div className="text-xl font-black text-white mt-1">12 Tests</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="text-slate-400">Average Score</div>
              <div className="text-xl font-black text-emerald-400 mt-1">94.5%</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="text-slate-400">Fastest Calculation</div>
              <div className="text-xl font-black text-amber-300 mt-1">0.8 Sec</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="text-slate-400">Academy Rank</div>
              <div className="text-xl font-black text-[#ed4883] mt-1">#1 State Gold</div>
            </div>
          </div>
        </div>

        {/* Available Practice Quizzes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-[#040430] tracking-tight">
                Available Speed &amp; Skill Tests
              </h2>
              <p className="text-xs text-slate-500">
                Attempt interactive quizzes with live countdown timers and instant grading
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              {quizzes.length} Quizzes Published
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm font-semibold text-slate-500 bg-white rounded-3xl border border-slate-200">
              Loading available quizzes...
            </div>
          ) : quizzes.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
              <p className="text-sm text-slate-600">No quizzes available right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-pink-50 text-[#ed4883] border border-pink-100">
                        {quiz.category || 'Mental Math'}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        {quiz.duration} Minutes
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#040430] mb-2 leading-snug">
                      {quiz.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {quiz.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 py-2 border-y border-slate-100">
                      <span>Total Marks: <strong className="text-slate-800">{quiz.total_marks}</strong></span>
                      <span>Level: <strong className="text-slate-800">{quiz.level || 'All Levels'}</strong></span>
                      <span>Questions: <strong className="text-slate-800">{quiz.question_count || 5}</strong></span>
                    </div>
                  </div>

                  <Link
                    href={`/student/quiz/${quiz.id}`}
                    className="w-full py-3 px-4 rounded-xl bg-[#040430] hover:bg-[#ed4883] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start Timed Quiz</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Previous Results Showcase */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black text-[#040430]">
                Recent Quiz Submissions &amp; Reports
              </h3>
              <p className="text-xs text-slate-500">
                Your historical test scores verified by academy master trainer
              </p>
            </div>
            <Award className="w-6 h-6 text-amber-500" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="pb-3">Quiz Title</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Time Taken</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="py-3.5 font-bold text-slate-900">
                    Mental Math Speed Test — Level 1
                  </td>
                  <td className="py-3.5 text-slate-500">Feb 15, 2026</td>
                  <td className="py-3.5 text-slate-600 font-mono">2m 22s</td>
                  <td className="py-3.5 font-bold text-slate-900">20 / 20 (100%)</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Passed • Excellent
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default function Page() {
  return <StudentDashboard />;
}
