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
