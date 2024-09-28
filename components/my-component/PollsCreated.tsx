'use client';

import { Poll } from '@/lib/definitions';
import PollCard from './PollCard';

interface PollsCreatedProps {
  polls: Poll[];
}

const PollsCreated = ({ polls }: PollsCreatedProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-xl font-semibold">Polls Created</div>
      <div className="w-full flex flex-wrap gap-8">
        {polls.map((poll, index) => (
          <PollCard poll={poll} key={index} isAuthor={true} />
        ))}
      </div>
    </div>
  );
};

export default PollsCreated;
