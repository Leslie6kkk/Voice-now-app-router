import CreatePoll from '@/components/my-component/CreatePoll';
import JoinPoll from '@/components/my-component/JoinPoll';
import { Separator } from '@/components/ui/separator';
import { Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PollsCreated from '@/components/my-component/PollsCreated';
import { getHomePageInfo } from '@/lib/fetch-all';
import PollsJoined from '@/components/my-component/PollsJoined';

export default async function Home() {
  const { isSessionValid, pollsCreated, pollsJoined } = await getHomePageInfo();
  return (
    <div className="flex flex-col gap-6">
      {!isSessionValid && (
        <Alert className="w-fit px-8 text-base font-mono bg-yellow-200 text-black">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="">Heads up!</AlertTitle>
          <AlertDescription>
            Log In first to Create/Vote for a poll!
          </AlertDescription>
        </Alert>
      )}
      <div className="w-full flex flex-wrap gap-8">
        <CreatePoll isSessionValid={isSessionValid} />
        <JoinPoll isSessionValid={isSessionValid} />
      </div>
      {isSessionValid && (
        <div className="flex flex-col gap-6 pt-2">
          <Separator className="text-white" />
          <PollsCreated polls={pollsCreated} />
          <PollsJoined polls={pollsJoined} />
        </div>
      )}
    </div>
  );
}
