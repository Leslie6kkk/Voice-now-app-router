'use client';

import { Poll } from '@/lib/definitions';
import { useState } from 'react';
import { Switch } from '../ui/switch';
import { changePollStatus } from '@/lib/poll';
import { toast } from '@/hooks/use-toast';

interface PollCardProps {
  poll: Poll;
  isAuthor: boolean;
}

const PollCard = ({ poll, isAuthor }: PollCardProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const choicesArray = Object.entries(poll.choices).map(([choice, count]) => ({
    choice,
    count,
  }));
  const sortedChoices = choicesArray.sort((a, b) => b.count - a.count);
  const handleChecked = async (checked: boolean) => {
    if (isAuthor) {
      setIsChecked(checked);
      const response = await fetch(`/api/poll/${poll.id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.status >= 300) {
        toast({
          title: 'Error',
          description: 'Failed to switch status for poll, try again later.',
          variant: 'destructive',
        });
        return;
      }
      window.location.reload();
    }
  };
  return (
    <div className="border rounded-2xl p-6 flex flex-col gap-4 min-w-80">
      <div className="flex justify-between gap-8 font-semibold">
        <div>{poll.name}</div>
        <div
          className={`flex gap-2 ${poll.isClosed ? 'text-red-500' : 'text-green-500'}`}
        >
          {poll.isClosed ? 'Archieved' : 'Live'}
          {isAuthor && (
            <Switch checked={isChecked} onCheckedChange={handleChecked} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {sortedChoices.map((choice, index: number) => (
          <div
            key={index}
            className={`flex min-w-fit px-4 py-2 rounded-2xl justify-between ${index === 0 ? 'bg-red-400 font-semibold text-base text-black' : 'bg-gray-500'}`}
          >
            <div>{choice.choice}</div>
            <div>
              {poll.voteCount == 0
                ? '0.00'
                : ((100 * choice.count) / poll.voteCount).toFixed(2)}
              %
            </div>
          </div>
        ))}
      </div>
      <div className="flex self-end text-sm text-gray-400">
        Last Updated At {poll.updatedAt.toLocaleDateString()}
      </div>
    </div>
  );
};

export default PollCard;
