import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/session';

export async function POST() {
  deleteSession(); // Delete the session cookie
  return NextResponse.json(
    { message: 'Successfully logged out' },
    { status: 200 }
  );
}
