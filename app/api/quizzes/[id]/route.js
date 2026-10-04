// app/api/quizzes/[id]/route.js - Single Quiz Fetch
import { NextResponse } from 'next/server';
import { getQuizById } from '@/lib/db';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const quiz = await getQuizById(id);

    if (!quiz) {
      return NextResponse.json({ success: false, message: 'Quiz not found' }, { status: 404 });
    }

    const session = getSessionFromRequest(request);
    const isTeacher = session && session.role === 'teacher';

    // If student is taking the quiz, do not reveal is_correct flags
    const sanitizedQuiz = JSON.parse(JSON.stringify(quiz));
    if (!isTeacher && sanitizedQuiz.questions) {
      sanitizedQuiz.questions.forEach(q => {
        delete q.explanation;
        if (q.options) {
          q.options.forEach(opt => {
            delete opt.is_correct;
          });
        }
      });
    }

    return NextResponse.json({ success: true, quiz: sanitizedQuiz });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
