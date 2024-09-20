import LogOut from '@/components/my-component/LogOut';
import SignInDialog from '@/components/my-component/SignInDialog';
import SignUpDialog from '@/components/my-component/SignUpDialog';
import { getSession } from '@/lib/session';
import { getUserById } from '@/lib/user';

export default async function Home() {
  const session = await getSession();
  let user;
  if (session) {
    user = await getUserById(Number(session.userId));
  }
  return (
    <div className="flex px-16 py-8 justify-between">
      <div>Home page</div>
      {session ? (
        <div className="flex gap-4 items-center">
          <p>{user?.email}</p>
          <LogOut />
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <SignInDialog />
          <SignUpDialog />
        </div>
      )}
    </div>
  );
}
