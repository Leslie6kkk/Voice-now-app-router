'use client';

import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';

const JoinPoll = (props: { isSessionValid: Boolean }) => {
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
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default JoinPoll;
