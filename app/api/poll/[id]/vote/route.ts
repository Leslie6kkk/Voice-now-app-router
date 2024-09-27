import { verifySession } from '@/lib/dal';
import { Poll, SessionVerifyResponse } from '@/lib/definitions';
import { getPollById } from '@/lib/poll';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const pollId = parseInt(params.id);
  const body = await request.json();
  const { value } = body;
  // check if request is authorized
  const session: SessionVerifyResponse = await verifySession();
  if (!session.isAuth || !session.userId) {
    return NextResponse.json(
      { message: 'Unauthorized Request' },
      { status: 401 }
    );
  }
  try {
    // check if poll_id has a corresponding valid poll
    const poll: Poll | null = await getPollById(pollId);
    if (!poll || poll.isClosed) {
      return NextResponse.json({ error: 'Poll not valid' }, { status: 404 });
    }
    // Check if user choice is a valid poll choice
    if (!(value in poll.choices)) {
      return NextResponse.json(
        { message: 'Bad Request: User choice must have a valid value' },
        { status: 400 }
      );
    }
    // Check if the user has already voted in this poll
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_pollId: { userId: Number(session.userId), pollId: pollId },
      },
    });
    if (existingVote) {
      return NextResponse.json(
        { error: 'User has already voted in this poll' },
        { status: 400 }
      );
    }
    await prisma.$transaction(async (tx) => {
      // update choices with new count and update voteCount
      await tx.poll.update({
        where: { id: pollId },
        data: {
          choices: {
            ...poll.choices,
            [value]: poll.choices[value] + 1,
          },
          voteCount: poll.voteCount + 1,
        },
      });
      // Add a new row to the Vote table
      await tx.vote.create({
        data: {
          userId: Number(session.userId),
          pollId: pollId,
          value: value,
        },
      });
    });
    const newPoll = await getPollById(pollId);
    return NextResponse.json(
      { message: 'Vote successfully recorded', newpoll: newPoll },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing the vote:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
