'use client';

import { z } from 'zod';
import { Button } from '../ui/button';
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  Dialog,
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

const SignUpDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const signUpFormSchema = z.object({
    email: z.string().email('Invalid email address').min(5).max(100), // Minimum 5 characters for short emails, maximum 100 to handle longer ones
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long') // Minimum 8 characters for security
      .max(100, 'Password must be less than 100 characters') // Upper limit for practical reasons
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter') // Uppercase requirement
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter') // Lowercase requirement
      .regex(/\d/, 'Password must contain at least one number') // Digit requirement
      .regex(/[\W_]/, 'Password must contain at least one special character'), // Special character requirement
  });

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    const { email, password } = values;
    try {
      const response = await fetch('/api/user/signup', {
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
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Sign Up</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create a new Account!</DialogTitle>
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
              Already have an account? Sign In on Homepage instead.
            </div>
            <Button type="button" onClick={form.handleSubmit(onSubmit)}>
              Sign Up
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
