import { cache } from 'react';
import { verifySession } from './dal';
import prisma from './prisma';

export const getPollById = cache(async (id: number) => {
  return await prisma.poll.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
});
