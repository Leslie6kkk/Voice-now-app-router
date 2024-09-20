import prisma from '@/lib/prisma'; // Assuming you have your Prisma client setup

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

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};
