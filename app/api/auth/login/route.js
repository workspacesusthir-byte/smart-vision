// app/api/auth/login/route.js - Next.js Route Handler for Authentication
import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/db';
import { verifyPassword, signToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials. User not found.' },
        { status: 401 }
      );
    }

    // Role check if specified
    if (role && user.role !== role) {
      return NextResponse.json(
        { success: false, message: `Access denied. This account is registered as a ${user.role}.` },
        { status: 403 }
      );
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid password. Please check your credentials.' },
        { status: 401 }
      );
    }

    // Create session token
    const token = signToken(user);
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
      avatar: user.avatar || ''
    };

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: safeUser,
      token,
      redirect: user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'
    });

    // Set HTTP-only session cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error('[API Auth Login Error]:', error);
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred during login.' },
      { status: 500 }
    );
  }
}
