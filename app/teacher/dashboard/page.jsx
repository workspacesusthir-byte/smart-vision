'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { 
  Users, BookOpen, PlusCircle, CheckCircle2, Clock, Trash2, 
  Sparkles, Award, LogOut, FileText, Send, Eye, RefreshCw, BarChart2
} from 'lucide-react';

export function TeacherDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('quizzes'); // 'quizzes' | 'create' | 'submissions'
  const [quizzes, setQuizzes] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Quiz Form State
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    description: '',
    duration: 5,
    category: 'Mental Math',
    level: 'Intermediate',
    questions: [
      {
        question: 'Calculate mentally: 84 - 29 = ?',
        marks: 4,
        explanation: '84 - 30 + 1 = 54 + 1 = 55',
        options: [
          { option_text: '53', is_correct: false },
          { option_text: '55', is_correct: true },
          { option_text: '57', is_correct: false },
          { option_text: '65', is_correct: false }
        ]
      }
    ]
  });
  const [creating, setCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [qRes, sRes] = await Promise.all([
        fetch('/api/quizzes'),
        fetch('/api/submissions')
      ]);

      if (qRes.ok) {
        const qData = await qRes.json();
        if (qData.success) setQuizzes(qData.quizzes || []);
      }

      if (sRes.ok) {
        const sData = await sRes.json();
        if (sData.success) setSubmissions(sData.submissions || []);
      }
    } catch (err) {
      console.error('Error fetching teacher data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login?role=teacher');
    } catch (e) {
      router.push('/login');
    }
  };

  // Add a question in Quiz Maker
  const addQuestion = () => {
    setNewQuiz(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          marks: 4,
          explanation: '',
          options: [
            { option_text: '', is_correct: true },
            { option_text: '', is_correct: false },
            { option_text: '', is_correct: false },
            { option_text: '', is_correct: false }
          ]
        }
      ]
    }));
  };

  // Remove a question
  const removeQuestion = (qIndex) => {
    setNewQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter((_, idx) => idx !== qIndex)
    }));
  };

  // Handle Quiz Creation Submit
  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateSuccess('');

    try {
      const totalMarks = newQuiz.questions.reduce((acc, q) => acc + Number(q.marks || 4), 0);
      const payload = {
        ...newQuiz,
        total_marks: totalMarks
      };

      const res = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save quiz');
      }

      setCreateSuccess('Quiz published successfully!');
      loadData();
      setActiveTab('quizzes');
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Teacher Welcome Header */}
        <div className="bg-gradient-to-r from-[#040430] to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#ed4883] text-white px-2.5 py-0.5 rounded-full">
                Faculty Administration
              </span>
              <span className="text-xs text-slate-300">The Smart Vision Academy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Master Trainer Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Manage curricula, craft timed mental arithmetic assessments, and inspect live student attempts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Enrolled Students</div>
            <div className="text-2xl sm:text-3xl font-black text-[#040430] mt-1">3,500+</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Across All Batches</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Published Quizzes</div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-900 mt-1">{quizzes.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Active Test Banks</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Total Test Attempts</div>
            <div className="text-2xl sm:text-3xl font-black text-[#ed4883] mt-1">{submissions.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Auto-Graded</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Class Average</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">94%</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">High Speed Mastery</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'quizzes'
                ? 'bg-[#040430] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Quizzes List ({quizzes.length})
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'create'
                ? 'bg-[#ed4883] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create New Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'submissions'
                ? 'bg-[#040430] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Student Submissions ({submissions.length})
          </button>
        </div>

        {createSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{createSuccess}</span>
          </div>
        )}

        {/* TAB 1: QUIZZES LIST */}
        {activeTab === 'quizzes' && (
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <div 
                key={quiz.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-50 text-[#ed4883] border border-pink-100">
                      {quiz.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      Level: <strong className="text-slate-700">{quiz.level || 'All'}</strong>
                    </span>
                  </div>
                  <h3 className="text-base font-black text-[#040430]">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-xl">
                    {quiz.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 shrink-0">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>{quiz.duration} Mins</span>
                  </div>
                  <div>
                    <span>{quiz.total_marks} Marks</span>
                  </div>
                  <Link
                    href={`/student/quiz/${quiz.id}`}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Test</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: QUIZ MAKER */}
        {activeTab === 'create' && (
          <form onSubmit={handleCreateQuiz} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-[#040430]">
                Create &amp; Publish New Assessment
              </h2>
              <p className="text-xs text-slate-500">
                Design custom questions with auto-grading rules and explanations for students
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  required
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                  placeholder="e.g. Flash Addition Speed Drill — Level 3"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#ed4883]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={newQuiz.category}
                  onChange={(e) => setNewQuiz({ ...newQuiz, category: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#ed4883] bg-white"
                >
                  <option value="Mental Math">Mental Math</option>
                  <option value="Abacus Speed">Abacus Speed</option>
                  <option value="Vedic Math">Vedic Math</option>
                  <option value="Olympiad Prep">Olympiad Prep</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Duration (Minutes) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  required
                  value={newQuiz.duration}
                  onChange={(e) => setNewQuiz({ ...newQuiz, duration: parseInt(e.target.value, 10) || 5 })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#ed4883]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Level
                </label>
                <input
                  type="text"
                  value={newQuiz.level}
                  onChange={(e) => setNewQuiz({ ...newQuiz, level: e.target.value })}
                  placeholder="e.g. Intermediate to Advanced"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#ed4883]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description &amp; Instructions
              </label>
              <textarea
                rows={2}
                value={newQuiz.description}
                onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                placeholder="Give students brief instructions before they start the countdown..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#ed4883]"
              />
            </div>

            {/* Questions Section */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#040430] uppercase tracking-wider">
                  Test Questions ({newQuiz.questions.length})
                </h3>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Question</span>
                </button>
              </div>

              {newQuiz.questions.map((q, qIdx) => (
                <div key={qIdx} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ed4883] bg-pink-50 px-2.5 py-0.5 rounded-full">
                      Question #{qIdx + 1}
                    </span>
                    {newQuiz.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIdx)}
                        className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Problem Statement *
                    </label>
                    <input
                      type="text"
                      required
                      value={q.question}
                      onChange={(e) => {
                        const updated = [...newQuiz.questions];
                        updated[qIdx].question = e.target.value;
                        setNewQuiz({ ...newQuiz, questions: updated });
                      }}
                      placeholder="e.g. Calculate: 35 × 35 = ?"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-[#ed4883]"
                    />
                  </div>

                  {/* 4 Multiple Choice Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                        <input
                          type="radio"
                          name={`correct_q_${qIdx}`}
                          checked={opt.is_correct}
                          onChange={() => {
                            const updated = [...newQuiz.questions];
                            updated[qIdx].options = updated[qIdx].options.map((o, idx) => ({
                              ...o,
                              is_correct: idx === oIdx
                            }));
                            setNewQuiz({ ...newQuiz, questions: updated });
                          }}
                          className="text-[#ed4883] focus:ring-[#ed4883]"
                        />
                        <input
                          type="text"
                          required
                          value={opt.option_text}
                          onChange={(e) => {
                            const updated = [...newQuiz.questions];
                            updated[qIdx].options[oIdx].option_text = e.target.value;
                            setNewQuiz({ ...newQuiz, questions: updated });
                          }}
                          placeholder={`Option ${oIdx + 1}${opt.is_correct ? ' (Correct Answer)' : ''}`}
                          className="flex-1 px-2 py-1 text-xs border-0 focus:outline-hidden font-medium"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Explanation / Solution Method (Shown after completion)
                    </label>
                    <input
                      type="text"
                      value={q.explanation}
                      onChange={(e) => {
                        const updated = [...newQuiz.questions];
                        updated[qIdx].explanation = e.target.value;
                        setNewQuiz({ ...newQuiz, questions: updated });
                      }}
                      placeholder="e.g. Vedic rule: 3 × (3 + 1) = 12, then 25 => 1225"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-[#ed4883]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={creating}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ed4883] to-[#d6336c] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-105 transition-all cursor-pointer disabled:opacity-50"
              >
                {creating ? 'Publishing...' : 'Publish Assessment'}
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: SUBMISSIONS TABLE */}
        {activeTab === 'submissions' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h2 className="text-lg font-black text-[#040430] mb-4">
              All Student Attempts &amp; Live Scores
            </h2>

            {submissions.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No student submissions recorded yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="pb-3">Student Name</th>
                      <th className="pb-3">Assessment Title</th>
                      <th className="pb-3">Score</th>
                      <th className="pb-3">Percentage</th>
                      <th className="pb-3">Time Spent</th>
                      <th className="pb-3">Result</th>
                      <th className="pb-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {submissions.map((sub) => (
                      <tr key={sub.id}>
                        <td className="py-3.5 font-bold text-slate-900">{sub.student_name}</td>
                        <td className="py-3.5 text-slate-700">{sub.quiz_title}</td>
                        <td className="py-3.5 font-mono font-bold text-slate-900">{sub.score} / {sub.total_marks}</td>
                        <td className="py-3.5 font-mono font-bold">{sub.percentage}%</td>
                        <td className="py-3.5 font-mono text-slate-500">{sub.time_spent_seconds}s</td>
                        <td className="py-3.5">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            sub.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {sub.passed ? 'Passed ✓' : 'Needs Practice'}
                          </span>
                        </td>
                        <td className="py-3.5 text-slate-400">
                          {new Date(sub.submitted_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default function Page() {
  return <TeacherDashboard />;
}
