'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Crown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    toast({
      title: "Login Successful",
      description: "Welcome back! (simulation).",
    });
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-8 w-8 text-primary"/>
          <CardTitle className="text-2xl font-bold mt-4">Welcome Back!</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button type="submit" className="w-full font-semibold">
                Login
              </Button>
               <p className="text-sm text-center text-muted-foreground pt-4">
                  Don't have an account?{' '}
                  <Link href="/signup" className="font-semibold text-primary hover:underline">
                    Sign Up
                  </Link>
                </p>
                <div className="flex items-center gap-4">
                    <Separator className="flex-1"/>
                    <span className="text-xs text-muted-foreground">OR</span>
                    <Separator className="flex-1"/>
                </div>
                 <Button asChild variant="outline" className="w-full font-semibold">
                    <Link href="/subscribe">
                        <Crown className="mr-2 h-4 w-4 text-yellow-500" /> Subscribe Now
                    </Link>
                </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
