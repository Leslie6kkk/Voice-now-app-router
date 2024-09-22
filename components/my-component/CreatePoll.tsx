'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from '../ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { DialogTitle } from '@radix-ui/react-dialog';

const CreatePoll = (props: { isSessionValid: boolean }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [choices, setChoices] = useState<string[]>([]);
  const [pollId, setPollId] = useState(null);
  const [copySuccess, setCopySuccess] = useState<boolean | undefined>();

  const createPollFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string(),
    choices: z.array(z.string()).min(2, 'At least 2 choices are required'),
  });

  const form = useForm<z.infer<typeof createPollFormSchema>>({
    resolver: zodResolver(createPollFormSchema),
    defaultValues: {
      name: 'Untitled',
      description: '',
      choices: [],
    },
  });

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/poll/${pollId}`
      );
      setCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopySuccess(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof createPollFormSchema>) => {
    const { name, description, choices } = values;
    for (let index = 0; index < choices.length; index++) {
      if (choices[index] === '') {
        toast({
          description: 'Choices can not be empty',
          variant: 'destructive',
        });
        return;
      }
    }
    try {
      const response = await fetch('/api/poll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      const success: boolean = response.status >= 200 && response.status < 300;
      toast({
        title: success ? 'Success!' : 'Error',
        description: result.message || '',
        variant: success ? 'default' : 'destructive',
      });
      if (success) {
        setPollId(result.id);
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: 'Network Error',
        description: 'Unable to reach the server. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const handleChoiceChange = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  useEffect(() => {
    form.setValue('choices', choices);
  }, [choices]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-72 h-72 rounded-3xl flex flex-col gap-4"
          disabled={!props.isSessionValid}
        >
          <div className="text-xl font-mono">+ Create A Poll</div>
          <div className="text-sm font-mono text-wrap">
            Create right now and invite people to vote for it!
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Create a Poll
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-4 items-center">
                  <FormLabel className="text-md font-semibold w-28">
                    Title *
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-4">
                  <FormLabel className="text-md font-semibold w-28">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="choices"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-4 pt-2">
                  <FormLabel className="text-md font-semibold w-28">
                    Choices
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-4 w-full">
                      {choices.map((choice, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <p>{index + 1}.</p>
                          <Input
                            placeholder="Configure your choice here..."
                            onChange={(e) =>
                              handleChoiceChange(index, e.target.value)
                            }
                          />
                          <Button
                            variant="destructive"
                            className="px-2 font-semibold"
                            onClick={() =>
                              setChoices(choices.filter((_, i) => i !== index))
                            }
                          >
                            delete
                          </Button>
                        </div>
                      ))}
                      <Button
                        className="rounded-3xl w-fit px-8"
                        onClick={() => {
                          choices.length < 5 && setChoices([...choices, '']);
                        }}
                      >
                        Add a Choice +
                      </Button>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4">
            {pollId ? (
              <div className="flex gap-2 items-center">
                <Button variant="outline" onClick={onCopyLink}>
                  Copy Link
                </Button>
                {copySuccess === true ? (
                  <div className="text-sm text-green-500">Link Copied!</div>
                ) : copySuccess === false ? (
                  <div className="text-sm text-red-800">Copy Failed!</div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <Button variant="outline" onClick={form.handleSubmit(onSubmit)}>
                Create
              </Button>
            )}
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePoll;
