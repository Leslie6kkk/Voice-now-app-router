import { Button } from "../ui/button"
import { DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const SignInForm = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Sign In to Voice for a Poll!</DialogTitle>
        <DialogDescription>
            You have to log in to create / vote for a poll.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            className="col-span-3"
            type="email"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            className="col-span-3"
            type="password"
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center text-sm">
            Don&apos;t have an account?  Sign Up on Homepage first.
        </div>
        <DialogClose asChild>
          <Button type="submit">Sign In</Button>
        </DialogClose>
      </div>
    </>

  )
}

export default SignInForm