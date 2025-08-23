'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { events } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface CheckoutPageProps {
  params: {
    id: string;
  };
}

const TICKET_PRICE = 120.00;
const FEES = 15.50;
const INSURANCE_PRICE = 9.99;

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const event = events.find(e => e.id === params.id);
  const [addInsurance, setAddInsurance] = useState(false);

  if (!event) {
    notFound();
  }

  const total = TICKET_PRICE + FEES + (addInsurance ? INSURANCE_PRICE : 0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-md mx-auto shadow-lg">
            <CardHeader className="text-center p-8">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500"/>
                <CardTitle className="text-2xl font-bold mt-4">Confirm Your Order</CardTitle>
                <CardDescription>You're one step away from your next experience.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
                <div className="flex items-center gap-4 p-4 border rounded-lg bg-secondary/30">
                    <Image 
                        src={event.image} 
                        alt={event.name} 
                        width={80} 
                        height={80} 
                        className="rounded-md object-cover aspect-square"
                        data-ai-hint="event poster"
                    />
                    <div>
                        <h3 className="font-semibold">{event.name}</h3>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                </div>

                <div className="mt-6 p-4 border rounded-lg bg-secondary/30">
                    <div className="flex items-center space-x-3">
                         <Checkbox 
                            id="insurance" 
                            checked={addInsurance}
                            onCheckedChange={(checked) => setAddInsurance(checked as boolean)}
                        />
                        <Label htmlFor="insurance" className="flex items-center gap-2 font-semibold cursor-pointer">
                            <ShieldCheck className="h-5 w-5 text-green-600"/>
                            Add Refund Protection
                        </Label>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 pl-8">
                        Get a full refund if the event is canceled or you can't attend due to unforeseen circumstances. Only ${INSURANCE_PRICE}.
                    </p>
                </div>

                <div className="mt-6 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Tickets (x1)</span>
                        <span>${TICKET_PRICE.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Fees</span>
                        <span>${FEES.toFixed(2)}</span>
                    </div>
                    {addInsurance && (
                        <div className="flex justify-between text-green-600">
                            <span className="font-medium">Refund Protection</span>
                            <span>${INSURANCE_PRICE.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                 <Button size="lg" className="w-full mt-6 bg-primary hover:bg-primary/90 font-bold" asChild>
                    <Link href={`/ticket/${event.id}`}>
                        Confirm Purchase
                    </Link>
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                    This is a demo. No real payment will be processed.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
