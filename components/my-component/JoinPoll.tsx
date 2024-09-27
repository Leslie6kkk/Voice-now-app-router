'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

const JoinPoll = (props: { isSessionValid: Boolean }) => {
  const [pollId, setPollId] = useState('');
  const [link, setLink] = useState('');
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-72 h-72 rounded-3xl flex flex-col gap-4"
          disabled={!props.isSessionValid}
        >
          <div className="text-xl font-mono">+ Vote for A Poll</div>
          <div className="text-sm font-mono text-wrap">
            Join a poll by a link or unique id!
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="pb-8">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Vote for a Poll
          </DialogTitle>
          <DialogDescription>
            You can join a poll with an Invitation Link OR a valid Poll ID.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 items-center">
          <div className="text-md font-semibold w-52">Invite Link</div>
          <Input
            type="url"
            placeholder="Paste your Link Here..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button
            className="w-42"
            type="submit"
            onClick={() => (window.location.href = link)}
          >
            Join By Link
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-md font-semibold w-32">Poll ID</div>
          <Input
            type="number"
            placeholder="Input a valid Poll ID Here..."
            value={pollId}
            onChange={(e) => setPollId(e.target.value)}
          />
          <Button
            className="w-42"
            type="submit"
            onClick={() => pollId && router.push(`/poll/${pollId}`)}
          >
            Join By ID
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinPoll;
