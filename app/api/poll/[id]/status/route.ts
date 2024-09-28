import { verifySession } from '@/lib/dal';
import { changePollStatus, getPollById } from '@/lib/poll';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const pollId = parseInt(params.id);
  const session = await verifySession();
  if (!session.isAuth || !session.userId) {
    return NextResponse.json(
      { message: 'Unauthorized Request' },
      { status: 401 }
    );
  }
  if (!pollId) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 404 });
  }
  try {
    const poll = await getPollById(pollId);
    if (!poll || poll.userId != Number(session.userId)) {
      return NextResponse.json({ message: 'Bad Request' }, { status: 404 });
    }
    await changePollStatus(pollId, !poll.isClosed);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error switching poll status:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
