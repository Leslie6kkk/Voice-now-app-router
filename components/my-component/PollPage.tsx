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
  sessionExist: boolean;
  alreadyVoted: boolean;
}

const PollPage = ({ poll, sessionExist, alreadyVoted }: PollPageProps) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full rounded-lg">
      <ResizablePanel defaultSize={50}>
        <VoteForPoll
          poll={poll}
          sessionExist={sessionExist}
          alreadyVoted={alreadyVoted}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        {alreadyVoted && sessionExist && <PollStatus poll={poll} />}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default PollPage;
