import { verifySession } from './dal';
import { Poll, SessionVerifyResponse } from './definitions';
import { getPollById, getPollsCreated, getPollsJoined } from './poll';
import { hasUserVoted } from './vote';

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

export const getHomePageInfo = async () => {
  const session: SessionVerifyResponse = await verifySession();
  let pollsCreated: Poll[] = [];
  let pollsJoined: Poll[] = [];
  if (session.isAuth && session.userId) {
    pollsCreated = await getPollsCreated(Number(session.userId));
    pollsJoined = await getPollsJoined(Number(session.userId));
  }
  return {
    isSessionValid: session.isAuth && !!session.userId,
    pollsCreated: pollsCreated,
    pollsJoined: pollsJoined,
  };
};
