import { getPollById } from '@/lib/poll';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/user';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const PollWithId = async ({ params }: { params: { id: string } }) => {
  const pollId = params.id;
  const poll = await getPollById(Number(pollId));
  const user = await getUser();

  if (poll === null) {
    return <div>This Poll is not Valid!</div>;
  }
  const parsedChoices =
    typeof poll.choices === 'string' ? JSON.parse(poll.choices) : poll.choices;

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
      <ResizablePanelGroup direction="horizontal" className="w-full rounded-lg">
        <ResizablePanel defaultSize={60}>
          <div className="flex flex-col h-full items-start justify-center p-8 gap-4">
            <div className="flex gap-2 font-semibold">
              <span className="text-2xl">{poll.name}</span>
              <p className={poll.isClosed ? 'text-red-800' : 'text-green-800'}>
                {poll.isClosed ? 'Ended' : 'Live'}
              </p>
            </div>
            <span className="text-lg">{poll.description}</span>
            <div className="text-lg text-gray-700 flex flex-col">
              <span>Created by - {poll.user.email}</span>
              <span>{poll.voteCount} People Already Joined</span>
              <span>Last Updated At {poll.updatedAt.toLocaleDateString()}</span>
            </div>

            <RadioGroup disabled={poll.isClosed || !user}>
              {parsedChoices.map(
                (choice: { content: string; count: number }, index: number) => (
                  <div
                    className="flex items-center space-x-2 bg-green-300 text-black px-4 py-3 rounded-xl"
                    key={index}
                  >
                    {user ? (
                      <RadioGroupItem
                        value={choice.content}
                        id={choice.content}
                        key={index}
                      />
                    ) : (
                      <div>{index + 1}</div>
                    )}
                    <Label key={index} htmlFor={choice.content}>
                      {choice.content}
                    </Label>
                  </div>
                )
              )}
            </RadioGroup>
            {user && (
              <Button variant="outline" className="self-end">
                Submit
              </Button>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default PollWithId;
