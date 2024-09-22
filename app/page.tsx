import CreatePoll from '@/components/my-component/CreatePoll';
import JoinPoll from '@/components/my-component/JoinPoll';
import { Separator } from '@/components/ui/separator';
import { getUser } from '@/lib/user';
import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default async function Home() {
  const user = await getUser();
  return (
    <div className="flex flex-col gap-12">
      {user === null && (
        <Alert className="w-fit px-8 text-base font-mono bg-yellow-200 text-black">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="">Heads up!</AlertTitle>
          <AlertDescription>
            Log In first to Create/Vote for a poll!
          </AlertDescription>
        </Alert>
      )}
      <div className="w-full flex flex-wrap gap-8">
        <CreatePoll isSessionValid={user !== null} />
        <JoinPoll isSessionValid={user !== null} />
      </div>
      <Separator className="text-white" />
      <div className="text-lg">Polls involved</div>
    </div>
  );
}
