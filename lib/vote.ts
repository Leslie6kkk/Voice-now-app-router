import { verifySession } from './dal';
import { Poll, SessionVerifyResponse, UserOut } from './definitions';
import { getPollById } from './poll';
import prisma from './prisma';

export const hasUserVoted = async (pollId: number, userId: number) => {
  try {
    const vote = await prisma.vote.findUnique({
      where: {
        userId_pollId: {
          userId: userId,
          pollId: pollId,
        },
      },
    });
    return !!vote;
  } catch (error) {
    console.error('Error checking if user has voted:', error);
    return false;
  }
};

export const getPollPageInfo = async (pollId: number) => {
  const poll: Poll | null = await getPollById(pollId);
  const session: SessionVerifyResponse = await verifySession();
  let alreadyVoted = false;
  if (poll && session.userId) {
    alreadyVoted = await hasUserVoted(pollId, Number(session.userId));
  }
  return {
    poll: poll,
    sessionExist: session.isAuth && !!session.userId,
    alreadyVoted: alreadyVoted,
  };
};
