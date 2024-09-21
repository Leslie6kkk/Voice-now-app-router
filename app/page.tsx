import CreatePoll from '@/components/my-component/CreatePoll';
import JoinPoll from '@/components/my-component/JoinPoll';
import { Separator } from '@/components/ui/separator';

export default async function Home() {
  return (
    <div className="flex flex-col gap-12">
      <div className="w-full flex felx-wrap gap-8">
        <CreatePoll />
        <JoinPoll />
      </div>
      <Separator className="text-white" />
      <div className="text-lg">Polls involved</div>
    </div>
  );
}
