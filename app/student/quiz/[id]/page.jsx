'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Clock, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Trophy, 
  HelpCircle, Sparkles, Send, RefreshCw, XCircle
} from 'lucide-react';

export default function QuizAttemptPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params?.id;

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Active quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [question_id]: option_id }
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Fetch quiz details
  useEffect(() => {
    if (!quizId) return;

    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/quizzes/${quizId}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Failed to load quiz');
        }

        setQuiz(data.quiz);
        setTimeLeft((data.quiz.duration || 5) * 60);
      } catch (err) {
        setError(err.message || 'Could not load quiz details');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Timer countdown
  useEffect(() => {
    if (!quiz || result || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, result, timeLeft]);

  const handleSubmitQuiz = async () => {
    if (submitting || result) return;
    setSubmitting(true);

    try {
      const payloadAnswers = Object.keys(answers).map(qId => ({
        question_id: Number(qId),
        selected_option_id: Number(answers[qId])
      }));

      const totalDuration = (quiz.duration || 5) * 60;
      const timeSpent = Math.max(1, totalDuration - timeLeft);

      const res = await fetch(`/api/quizzes/${quizId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: payloadAnswers,
          time_spent_seconds: timeSpent
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit quiz');
      }

      setResult(data.result);
    } catch (err) {
      alert('Error submitting quiz: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle auto-submit on time expiry
  useEffect(() => {
    if (timeLeft === 0 && !result && !submitting && quiz) {
      handleSubmitQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, result, submitting, quiz]);

  const handleSelectOption = (questionId, optionId) => {
    if (result) return;
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  // Format time (MM:SS)
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 text-center">
          <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Preparing Quiz Arena...</h3>
          <p className="text-xs text-slate-500 mt-1">Calibrating timer and problem sets</p>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md p-8 rounded-3xl shadow-xl border border-slate-200 text-center">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">Quiz Not Found</h3>
          <p className="text-xs text-slate-600 mt-1 mb-6">{error || 'This quiz is currently unavailable.'}</p>
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#040430] text-white text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions ? quiz.questions[currentQIndex] : null;
  const isLastQ = quiz.questions && currentQIndex === quiz.questions.length - 1;
  const isTimeCritical = timeLeft < 60;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Floating Quiz Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/student/dashboard"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Exit to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm sm:text-base font-black text-[#040430] leading-none">
                {quiz.title}
              </h1>
              <span className="text-[11px] font-semibold text-slate-500">
                {quiz.category} • Question {currentQIndex + 1} of {quiz.questions?.length || 0}
              </span>
            </div>
          </div>

          {/* Countdown Clock */}
          {!result && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-mono font-bold text-sm sm:text-base shadow-xs transition-colors ${
              isTimeCritical
                ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse'
                : 'bg-indigo-50 border-indigo-100 text-indigo-900'
            }`}>
              <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-rose-600' : 'text-indigo-600'}`} />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Quiz Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col justify-center">
        
        {/* RESULT VIEW AFTER SUBMISSION */}
        {result ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Result Header Banner */}
            <div className="text-center space-y-3 pb-8 border-b border-slate-100">
              <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-lg ${
                result.passed
                  ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-emerald-500/20'
                  : 'bg-gradient-to-tr from-rose-500 to-red-600 text-white shadow-rose-500/20'
              }`}>
                {result.passed ? <Trophy className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#040430] tracking-tight">
                {result.passed ? 'Outstanding Performance!' : 'Good Effort! Keep Practicing!'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                You scored <strong className="text-slate-900">{result.score} out of {result.total_marks}</strong> ({result.percentage}%) in {formatTime(result.time_spent_seconds)}
              </p>
            </div>

            {/* Detailed Graded Question Review */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-[#040430] uppercase tracking-wider">
                Question Breakdown &amp; Explanations
              </h3>

              {(result.graded_questions || []).map((q, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                    q.is_correct
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <span className="font-bold text-slate-800">
                      Q{idx + 1}. {q.question}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      q.is_correct ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {q.is_correct ? `+${q.marks_earned} Marks ✓` : '0 Marks ✗'}
                    </span>
                  </div>

                  {q.explanation && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs text-slate-600 bg-white/70 p-2.5 rounded-xl">
                      <strong className="text-slate-800">Technique / Solution:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/student/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#040430] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ed4883] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Student Portal</span>
              </Link>
            </div>
          </div>
        ) : (
          /* ACTIVE QUIZ QUESTION CARD */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl flex flex-col justify-between min-h-[460px]">
            
            {/* Top Question Progress */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ed4883] bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                  Question {currentQIndex + 1} of {quiz.questions?.length}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Worth {currentQ?.marks || 4} Marks
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-xl sm:text-2xl font-black text-[#040430] tracking-tight mb-8">
                {currentQ?.question}
              </h2>

              {/* Options Radio List */}
              <div className="space-y-3 mb-8">
                {currentQ?.options?.map((opt) => {
                  const isSelected = answers[currentQ.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, opt.id)}
                      className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-950 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt.option_text}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex(prev => prev - 1)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-3">
                {isLastQ ? (
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleSubmitQuiz}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ed4883] to-[#d6336c] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-105 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Scoring Answers...' : 'Submit Test'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#040430] hover:bg-[#ed4883] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
