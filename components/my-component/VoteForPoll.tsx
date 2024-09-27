'use client';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Poll } from '@/lib/definitions';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoteForPollProps {
  poll: Poll;
  sessionExist: boolean;
  alreadyVoted: boolean;
}

const VoteForPoll = ({
  poll,
  sessionExist,
  alreadyVoted,
}: VoteForPollProps) => {
  const [chosenValue, setChosenValue] = useState('');

  const { toast } = useToast();
  const choiceList = Object.keys(poll.choices);

  const onSubmit = async () => {
    if (chosenValue == '') {
      toast({
        title: 'Failed',
        description: 'Please make a choice before submit!',
        variant: 'destructive',
      });
      return;
    } else if (!sessionExist) {
      toast({
        title: 'Unauthorized',
        description: 'Please log in before submit!',
        variant: 'destructive',
      });
      return;
    } else {
      try {
        const response = await fetch(`/api/poll/${poll.id}/vote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value: chosenValue }),
        });
        const { message } = await response.json();
        if (response.status >= 300) {
          toast({
            title: 'Vote Failed',
            description: message || '',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Success',
            description: message || '',
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        console.error('Submit error:', error);
        toast({
          title: 'Network Error',
          description: 'Unable to reach the server. Please try again later.',
          variant: 'destructive',
        });
      }
    }
  };
  return (
    <div className="flex flex-col h-full items-start justify-center p-8 gap-4">
      <div className="flex gap-2 font-semibold">
        <span className="text-2xl">{poll.name}</span>
        <p className={poll.isClosed ? 'text-red-500' : 'text-green-500'}>
          {poll.isClosed ? 'Ended' : 'Live'}
        </p>
      </div>
      <span className="text-lg">{poll.description}</span>
      <div className="text-base text-gray-400 flex flex-col">
        <span>Created by - {poll.user.email}</span>
        <span>{poll.voteCount} People Already Joined</span>
        <span>Last Updated At {poll.updatedAt.toLocaleDateString()}</span>
      </div>

      <RadioGroup
        disabled={poll.isClosed || !sessionExist || alreadyVoted}
        onValueChange={(value) => setChosenValue(value)}
      >
        {choiceList.length > 0 &&
          choiceList.map((choice: string, index: number) => (
            <div
              className="flex items-center space-x-2 bg-green-300 text-black px-4 py-3 rounded-xl"
              key={index}
            >
              {sessionExist && !alreadyVoted && !poll.isClosed ? (
                <RadioGroupItem value={choice} id={choice} />
              ) : (
                <div>{index + 1}-</div>
              )}
              <Label key={index} htmlFor={choice} className="font-semibold">
                {choice}
              </Label>
            </div>
          ))}
      </RadioGroup>
      {sessionExist && !alreadyVoted && !poll.isClosed && (
        <Button
          variant="outline"
          disabled={poll.isClosed || !sessionExist || alreadyVoted}
          className="self-end flex items-center gap-2"
          onClick={onSubmit}
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default VoteForPoll;
