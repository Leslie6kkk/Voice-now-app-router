'use client';

import { Poll } from '@/lib/definitions';
import PollCard from './PollCard';

interface PollsJoinedProps {
  polls: Poll[];
}

const PollsJoined = ({ polls }: PollsJoinedProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-xl font-semibold">Polls Joined</div>
      <div className="w-full flex flex-wrap gap-8">
        {polls.map((poll, index) => (
          <PollCard poll={poll} key={index} isAuthor={false} />
        ))}
      </div>
    </div>
  );
};

export default PollsJoined;
