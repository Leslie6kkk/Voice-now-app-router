'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import VoteForPoll from './VoteForPoll';
import { Poll, UserOut } from '@/lib/definitions';
import { useState } from 'react';
import PollStatus from './PollStatus';

interface PollPageProps {
  poll: Poll;
  user: UserOut | null;
}

const PollPage = ({ poll, user }: PollPageProps) => {
  const [newpoll, setNewPoll] = useState<Poll | undefined>();
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full rounded-lg">
      <ResizablePanel defaultSize={50}>
        <VoteForPoll poll={poll} user={user} setNewPoll={setNewPoll} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        {newpoll && <PollStatus poll={newpoll} />}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default PollPage;
