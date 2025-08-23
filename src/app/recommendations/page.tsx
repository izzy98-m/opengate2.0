'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getRecommendations } from '@/app/actions';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Loader2 } from 'lucide-react';

const formSchema = z.object({
    userPreferences: z.string().min(10, 'Please describe your preferences in a bit more detail.'),
    pastActivity: z.string().min(10, 'Please describe your past activities in a bit more detail.'),
    interests: z.string().min(2, 'Please list at least one interest.'),
    location: z.string().min(2, 'Please enter a location.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function RecommendationsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<string | null>(null);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userPreferences: '',
            pastActivity: '',
            interests: '',
            location: '',
        },
    });

    async function onSubmit(values: FormValues) {
        setIsLoading(true);
        setRecommendations(null);
        
        const result = await getRecommendations(values);

        if (result.success && result.data) {
            setRecommendations(result.data.recommendations);
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.error,
            });
        }
        setIsLoading(false);
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="md:pr-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-4 font-headline">Discover Events Just For You</h1>
                    <p className="text-lg text-muted-foreground mb-6">Our AI-powered recommendation engine analyzes your tastes to find events you'll love. Just fill out the form, and let us work our magic.</p>
                    <p className="text-muted-foreground">The more detail you provide, the better your recommendations will be!</p>
                </div>
                <div>
                <Card className="w-full mx-auto shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                            <Sparkles className="text-primary" />
                            Tell Us About Yourself
                        </CardTitle>
                        <CardDescription>
                            Fill in your details to get personalized recommendations.
                        </CardDescription>
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="userPreferences"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="cursor-pointer">Your Preferences</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="e.g., I love indie music, outdoor festivals, and intimate venues." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="pastActivity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="cursor-pointer">Past Events You've Enjoyed</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="e.g., Attended the City Folk Festival last year, saw a play at the Grand Theatre." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="interests"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="cursor-pointer">Interests (comma-separated)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., music, theatre, comedy, sports" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="cursor-pointer">Your Location</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., New York, NY" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        'Get Recommendations'
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
                </div>
            </div>

            {recommendations && (
                 <Card className="max-w-4xl mx-auto mt-12 shadow-lg animate-in fade-in-50">
                     <CardHeader>
                         <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                            <Sparkles className="text-primary h-8 w-8"/>
                            Here are your recommendations!
                         </CardTitle>
                     </CardHeader>
                     <CardContent>
                         <p className="text-lg text-foreground/80 whitespace-pre-line">{recommendations}</p>
                     </CardContent>
                 </Card>
            )}
        </div>
    );
}
