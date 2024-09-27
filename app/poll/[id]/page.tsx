import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import PollPage from '@/components/my-component/PollPage';
import { getPollPageInfo } from '@/lib/fetch-all';

// this page may have three states:
// 1. don't have a valid session: component disabled and current status hidden
// 2. session valid but user already voted: component disabled and current status shown
// 3. session valid and user haven't voted: component abled and current status hidden

const PollWithId = async ({ params }: { params: { id: string } }) => {
  const { poll, sessionExist, alreadyVoted } = await getPollPageInfo(
    Number(params.id)
  );

  if (poll === null) {
    return <div>This Poll is not Valid!</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {!sessionExist && (
        <Alert className="w-fit px-8 text-base font-mono bg-yellow-200 text-black">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="">Heads up!</AlertTitle>
          <AlertDescription>
            Log In first to Create/Vote for a poll!
          </AlertDescription>
        </Alert>
      )}
      <PollPage
        poll={poll}
        sessionExist={sessionExist}
        alreadyVoted={alreadyVoted}
      />
    </div>
  );
};

export default PollWithId;
