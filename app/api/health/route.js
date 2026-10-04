// app/api/health/route.js
import { NextResponse } from 'next/server';
import { checkDbHealth } from '@/lib/db';

export async function GET() {
  const dbStatus = await checkDbHealth();
  return NextResponse.json({
    status: 'healthy',
    app: 'The Smart Vision - Abacus & Mental Math Academy',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: dbStatus
  });
}
