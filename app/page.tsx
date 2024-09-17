import SignInForm from "@/components/my-component/SignInForm";
import SignUpForm from "@/components/my-component/SignUpForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Home() {
  return (
    <div className="flex px-16 py-8 justify-between">
      <div>Home page</div>
      <div className="flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Sign In
            </Button>
          </DialogTrigger>
          <DialogContent>
            <SignInForm />
          </DialogContent>
        </Dialog>
        <Dialog>
        <DialogTrigger asChild>
          <Button>
            Sign Up
          </Button>
        </DialogTrigger>
        <DialogContent>
          <SignUpForm />
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}
