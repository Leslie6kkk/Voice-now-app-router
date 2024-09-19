import { NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '@/prisma/user';
import bcrypt from 'bcrypt'; // For password hashing

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    await createUser(email, passwordHash);

    return NextResponse.json(
      { message: 'Successfully created an account!' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
