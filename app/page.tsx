import SignInDialog from '@/components/my-component/SignInDialog';
import SignUpDialog from '@/components/my-component/SignUpDialog';

export default function Home() {
  return (
    <div className="flex px-16 py-8 justify-between">
      <div>Home page</div>
      <div className="flex gap-4">
        <SignInDialog />
        <SignUpDialog />
      </div>
    </div>
  );
}
