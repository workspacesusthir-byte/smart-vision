// app/api/quizzes/route.js - Quizzes listing and creation
import { NextResponse } from 'next/server';
import { getAllQuizzes, saveNewQuiz } from '@/lib/db';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const quizzes = await getAllQuizzes();
    return NextResponse.json({ success: true, quizzes });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = getSessionFromRequest(request);
    // Allow demo creation or teacher creation
    const body = await request.json();

    if (!body.title || !body.questions || body.questions.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Quiz title and at least one question are required' },
        { status: 400 }
      );
    }

    const newQuiz = await saveNewQuiz({
      ...body,
      created_by: session ? session.id : 1,
      created_by_name: session ? session.name : 'Rajesh Sharma'
    });

    return NextResponse.json({
      success: true,
      message: 'Quiz created and published successfully',
      quiz: newQuiz
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
