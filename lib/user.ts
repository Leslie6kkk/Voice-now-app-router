import prisma from '@/lib/prisma'; // Assuming you have your Prisma client setup
import { cache } from 'react';
import { verifySession } from './dal';

// Find user by email
export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// Create a new user
export const createUser = async (email: string, passwordHash: string) => {
  return await prisma.user.create({
    data: {
      email,
      password: passwordHash, // Store hashed password
    },
  });
};

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session.isAuth || !session.userId) {
    return null;
  }

  return await prisma.user.findUnique({
    select: {
      email: true,
    },
    where: {
      id: Number(session.userId),
    },
  });
});
