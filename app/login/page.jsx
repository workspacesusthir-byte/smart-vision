'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  LogIn, ArrowLeft, Lock, Mail, GraduationCap, School, AlertCircle, Sparkles, CheckCircle2
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'teacher' ? 'teacher' : 'student';

  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'teacher' || roleParam === 'student') {
      setRole(roleParam);
      // Set default demo email based on role
      if (roleParam === 'teacher') {
        setEmail('teacher@thesmartvision.in');
        setPassword('Teacher@2026');
      } else {
        setEmail('aarav@thesmartvision.in');
        setPassword('Student@2026');
      }
    } else {
      setEmail('aarav@thesmartvision.in');
      setPassword('Student@2026');
    }
  }, [searchParams]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setError('');
    if (newRole === 'teacher') {
      setEmail('teacher@thesmartvision.in');
      setPassword('Teacher@2026');
    } else {
      setEmail('aarav@thesmartvision.in');
      setPassword('Student@2026');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Successful login
      if (data.redirect) {
        router.push(data.redirect);
      } else if (role === 'teacher') {
        router.push('/teacher/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Unable to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 sm:p-10 relative">
      
      {/* Academy Crest */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md p-1.5 border border-slate-200 overflow-hidden">
            <Image 
              src="https://thesmartvision.in/wp-content/uploads/2025/05/tsv.png"
              alt="The Smart Vision Logo"
              width={56}
              height={56}
              className="object-contain w-full h-full"
              priority
              referrerPolicy="no-referrer"
            />
          </div>
        </Link>
        <h1 className="text-2xl font-black text-[#040430] tracking-tight">
          Academy Portal Login
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Access your interactive quizzes and performance dashboard
        </p>
      </div>

      {/* Role Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
        <button
          type="button"
          onClick={() => handleRoleChange('student')}
          className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
            role === 'student'
              ? 'bg-white text-[#040430] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-[#ed4883]" />
          <span>Student Portal</span>
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange('teacher')}
          className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
            role === 'teacher'
              ? 'bg-white text-[#040430] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <School className="w-4 h-4 text-indigo-600" />
          <span>Teacher Portal</span>
        </button>
      </div>

      {/* Quick Demo Credentials Assistant */}
      <div className="mb-6 p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-bold text-indigo-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#ed4883]" />
            <span>One-Click Demo Accounts</span>
          </span>
          <span className="text-[10px] text-indigo-600 font-semibold">Ready to Test</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              handleRoleChange('student');
              setEmail('aarav@thesmartvision.in');
              setPassword('Student@2026');
            }}
            className="flex-1 py-1.5 px-2 bg-white text-slate-700 hover:text-indigo-900 rounded-lg border border-indigo-200 text-[11px] font-semibold text-center transition-colors"
          >
            Aarav (Student)
          </button>
          <button
            type="button"
            onClick={() => {
              handleRoleChange('teacher');
              setEmail('teacher@thesmartvision.in');
              setPassword('Teacher@2026');
            }}
            className="flex-1 py-1.5 px-2 bg-white text-slate-700 hover:text-indigo-900 rounded-lg border border-indigo-200 text-[11px] font-semibold text-center transition-colors"
          >
            Rajesh (Teacher)
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Registered Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. aarav@thesmartvision.in"
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#ed4883] focus:ring-1 focus:ring-[#ed4883]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Portal Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#ed4883] focus:ring-1 focus:ring-[#ed4883]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#040430] to-indigo-950 hover:bg-[#ed4883] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Enter {role === 'teacher' ? 'Teacher Dashboard' : 'Student Portal'}</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-[#040430] font-medium transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </Link>
        <Link href="/#assessment" className="text-[#ed4883] font-bold hover:underline">
          Book Free Class
        </Link>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/70 via-white to-pink-50/40 flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="p-8 bg-white rounded-3xl shadow-xl border border-slate-200 text-center text-sm font-bold text-slate-600">
          Loading Academy Login...
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
