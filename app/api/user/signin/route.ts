import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/prisma/user';
import bcrypt from 'bcrypt'; // For password comparison
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  try {
    // Check if user exists
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare the hashed password
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    await createSession(existingUser.id.toString());

    // Assuming you want to return a success message
    return NextResponse.json(
      { message: 'Successfully signed in!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
