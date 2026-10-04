// app/api/submissions/route.js - Get All Submissions for Teacher
import { NextResponse } from 'next/server';
import { getAllSubmissions } from '@/lib/db';

export async function GET() {
  try {
    const submissions = await getAllSubmissions();
    return NextResponse.json({ success: true, submissions });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
