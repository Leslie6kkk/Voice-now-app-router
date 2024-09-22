'use client';

import { z } from 'zod';
import { Button } from '../ui/button';
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  Dialog,
  DialogDescription,
} from '../ui/dialog';
import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const SignInDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const signInFormSchema = z.object({
    email: z.string().email('Invalid email address').min(5).max(100),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  });

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    const { email, password } = values;
    try {
      const response = await fetch('/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      const success: boolean = response.status >= 200 && response.status < 300;
      toast({
        title: success ? 'Success!' : 'Error',
        description: result.message || '',
        variant: success ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: 'Network Error',
        description: 'Unable to reach the server. Please try again later.',
        variant: 'destructive',
      });
    }
    setOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Sign In</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Sign In to Voice for a Poll!</DialogTitle>
          <DialogDescription>
            You have to log in to create / vote for a poll.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type your Email Here..."
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type your Password Here..."
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <div className="flex items-center text-sm">
              Don&apos;t have an account? Sign Up on Homepage first.
            </div>
            <Button type="button" onClick={form.handleSubmit(onSubmit)}>
              Sign In
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
