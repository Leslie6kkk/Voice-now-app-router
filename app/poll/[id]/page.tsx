import { getPollById } from '@/lib/poll';
import { getUser } from '@/lib/user';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Poll } from '@/lib/definitions';
import PollPage from '@/components/my-component/PollPage';

const PollWithId = async ({ params }: { params: { id: string } }) => {
  const pollId = params.id;
  const poll: Poll | null = await getPollById(Number(pollId));
  const user = await getUser();

  if (poll === null) {
    return <div>This Poll is not Valid!</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {user === null && (
        <Alert className="w-fit px-8 text-base font-mono bg-yellow-200 text-black">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="">Heads up!</AlertTitle>
          <AlertDescription>
            Log In first to Create/Vote for a poll!
          </AlertDescription>
        </Alert>
      )}
      <PollPage poll={poll} user={user} />
    </div>
  );
};

export default PollWithId;
