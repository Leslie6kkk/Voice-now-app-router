import { cache } from 'react';
import prisma from './prisma';
import { Poll } from './definitions';

export const getPollById = cache(async (id: number) => {
  const poll = await prisma.poll.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  if (!poll) {
    return null;
  }
  return poll as Poll;
});

export const getPollsCreated = cache(async (userId: number) => {
  return (await prisma.poll.findMany({
    where: {
      userId: userId,
    },
  })) as Poll[];
});

export const changePollStatus = async (pollId: number, newStatus: boolean) => {
  await prisma.poll.update({
    where: {
      id: pollId,
    },
    data: {
      isClosed: newStatus,
    },
  });
  return;
};

export const getPollsJoined = cache(async (userId: number) => {
  const votes = await prisma.vote.findMany({
    where: {
      userId: userId,
    },
    include: {
      poll: true,
    },
  });
  return votes.map((vote) => vote.poll) as Poll[];
});
