'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Wallet, DollarSign, CreditCard } from 'lucide-react';

const formSchema = z.object({
  amount: z.coerce.number().positive({ message: "Please enter a positive amount." }).min(5, { message: "Minimum deposit is $5.00." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function WalletPage() {
  const { toast } = useToast();
  const [balance, setBalance] = useState(25.50); // Start with some initial balance for demo

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
    },
  });

  function onSubmit(values: FormValues) {
    setBalance(prevBalance => prevBalance + values.amount);
    toast({
      title: "Deposit Successful!",
      description: `$${values.amount.toFixed(2)} has been added to your wallet.`,
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <Wallet className="mx-auto h-8 w-8 text-primary"/>
          <CardTitle className="text-2xl font-bold mt-4">My Wallet</CardTitle>
          <CardDescription>Manage your balance and deposits.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="p-6 rounded-lg bg-secondary/50 text-center">
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-4xl font-bold tracking-tight">${balance.toFixed(2)}</p>
            </div>
             <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deposit Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="number" placeholder="50.00" {...field} className="pl-8"/>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="submit" className="w-full font-semibold">
                    <CreditCard className="mr-2" /> Add Funds
                  </Button>
              </form>
            </Form>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-center text-muted-foreground w-full">
                This is a demo. No real payment will be processed.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
