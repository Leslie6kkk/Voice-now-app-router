'use client';

import { Poll } from '@/lib/definitions';
import Link from 'next/link';

const PollStatus = ({ poll }: { poll: Poll }) => {
  const choicesArray = Object.entries(poll.choices).map(([choice, count]) => ({
    choice,
    count,
  }));
  const sortedChoices = choicesArray.sort((a, b) => b.count - a.count);
  return (
    <div className="flex flex-col h-full px-12 py-8 gap-4">
      <div className="font-semibold text-2xl flex gap-4">
        Current trends for{' '}
        <p className="font-mono text-yellow-400">{poll.name}</p>:
      </div>
      {sortedChoices.map((choice, index: number) => (
        <div
          key={index}
          className={`flex min-w-fit px-8 py-4 rounded-2xl justify-between ${index === 0 ? 'bg-red-400 font-semibold text-xl text-black' : 'bg-gray-500'}`}
        >
          <div>{choice.choice}</div>
          <div>{((100 * choice.count) / poll.voteCount).toFixed(2)}%</div>
        </div>
      ))}
      <Link
        className="self-end bg-green-800 font-semibold p-6 mt-8 rounded-xl"
        href="/"
      >
        Back to HomePage
      </Link>
    </div>
  );
};

export default PollStatus;
