import { verifySession } from '@/lib/dal';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await verifySession();

    if (!session.isAuth || !session.userId) {
      return NextResponse.json(
        { message: 'Unauthorized Request' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, choices } = body;

    if (!name || !choices || choices.length < 2) {
      return NextResponse.json(
        { message: 'Poll must have a title and at least two choices.' },
        { status: 400 }
      );
    }

    const poll = await prisma.poll.create({
      data: {
        name: name,
        description: description,
        userId: Number(session.userId),
        choices: choices.map((choice: string) => ({
          content: choice,
          count: 0,
        })),
      },
    });

    // Respond with the created poll
    return NextResponse.json(poll, { status: 201 });
  } catch (error) {
    console.error('Error creating poll:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
