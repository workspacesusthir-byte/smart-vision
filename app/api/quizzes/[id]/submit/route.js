// app/api/quizzes/[id]/submit/route.js - Submit Quiz and Grade
import { NextResponse } from 'next/server';
import { getQuizById, saveQuizSubmission } from '@/lib/db';
import { getSessionFromRequest } from '@/lib/auth';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { answers, time_spent_seconds, student_info } = body;

    const quiz = await getQuizById(id);
    if (!quiz) {
      return NextResponse.json({ success: false, message: 'Quiz not found' }, { status: 404 });
    }

    const session = getSessionFromRequest(request);
    const studentId = session ? session.id : (student_info?.id || 2);
    const studentName = session ? session.name : (student_info?.name || 'Aarav Patel');
    const studentEmail = session ? session.email : (student_info?.email || 'aarav@thesmartvision.in');

    let totalScore = 0;
    let maxMarks = 0;
    const gradedQuestions = [];

    // Grade each question
    (quiz.questions || []).forEach(q => {
      maxMarks += (q.marks || 4);
      const studentAns = (answers || []).find(a => a.question_id === q.id);
      const selectedOptionId = studentAns ? studentAns.selected_option_id : null;
      
      const correctOption = (q.options || []).find(opt => opt.is_correct);
      const isCorrect = correctOption && selectedOptionId === correctOption.id;
      
      const earnedMarks = isCorrect ? (q.marks || 4) : 0;
      totalScore += earnedMarks;

      gradedQuestions.push({
        question_id: q.id,
        question: q.question,
        selected_option_id: selectedOptionId,
        correct_option_id: correctOption ? correctOption.id : null,
        is_correct: isCorrect,
        marks_earned: earnedMarks,
        marks_total: q.marks || 4,
        explanation: q.explanation || ''
      });
    });

    const percentage = maxMarks > 0 ? Math.round((totalScore / maxMarks) * 100) : 0;
    const passed = percentage >= 60;

    const attempt = await saveQuizSubmission({
      quiz_id: quiz.id,
      quiz_title: quiz.title,
      student_id: studentId,
      student_name: studentName,
      student_email: studentEmail,
      score: totalScore,
      total_marks: maxMarks,
      percentage,
      passed,
      time_spent_seconds: time_spent_seconds || 60
    });

    return NextResponse.json({
      success: true,
      attempt,
      result: {
        score: totalScore,
        total_marks: maxMarks,
        percentage,
        passed,
        time_spent_seconds: time_spent_seconds || 60,
        graded_questions: gradedQuestions
      }
    });
  } catch (err) {
    console.error('[Quiz Submission Error]:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
