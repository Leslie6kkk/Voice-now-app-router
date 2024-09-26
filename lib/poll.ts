import { cache } from 'react';
import prisma from './prisma';

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
  return { ...poll, choices: poll?.choices as Record<string, number> };
});
