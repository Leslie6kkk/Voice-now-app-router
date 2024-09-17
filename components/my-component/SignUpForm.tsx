import { Button } from "../ui/button"
import { DialogHeader, DialogTitle, DialogClose } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const SignUpForm = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create a new Account!</DialogTitle>
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
      <div className="flex justify-between">
        <div className="flex items-center text-sm">
            Already have an account? 
            Sign In on Homepage instead.
        </div>
        <DialogClose asChild>
          <Button type="submit">Sign Up</Button>
        </DialogClose>
      </div>
    </>
  )
}

export default SignUpForm