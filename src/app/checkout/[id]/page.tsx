
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { events } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckCircle, ShieldCheck, CreditCard, Clock, Users, Plus, Send } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

interface CheckoutPageProps {
  params: {
    id: string;
  };
}

const TICKET_PRICE = 120.00;
const FEES = 15.50;
const INSURANCE_PRICE = 9.99;

export default function CheckoutPage({ params: { id } }: CheckoutPageProps) {
  const event = events.find(e => e.id === id);
  const [addInsurance, setAddInsurance] = useState(false);
  const [splitEmails, setSplitEmails] = useState(['']);

  if (!event) {
    notFound();
  }

  const total = TICKET_PRICE + FEES + (addInsurance ? INSURANCE_PRICE : 0);

  const handleAddEmail = () => {
    setSplitEmails([...splitEmails, '']);
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...splitEmails];
    newEmails[index] = value;
    setSplitEmails(newEmails);
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-xl mx-auto shadow-lg">
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

                 <Tabs defaultValue="card" className="w-full mt-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card"><CreditCard className="mr-2"/>Card</TabsTrigger>
                        <TabsTrigger value="later"><Clock className="mr-2"/>Pay Later</TabsTrigger>
                        <TabsTrigger value="split"><Users className="mr-2"/>Split Pay</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="mt-4 space-y-4">
                        <Input placeholder="Card Number" />
                        <div className="flex gap-4">
                            <Input placeholder="MM / YY" />
                            <Input placeholder="CVC" />
                        </div>
                    </TabsContent>
                    <TabsContent value="later" className="mt-4 text-center">
                         <div className="p-4 rounded-lg bg-secondary/50">
                            <p className="font-semibold">Pay in 4 interest-free installments of ${(total / 4).toFixed(2)}.</p>
                            <p className="text-sm text-muted-foreground mt-1">Powered by <span className="font-bold">Affirm</span>. No effect on your credit score.</p>
                         </div>
                    </TabsContent>
                    <TabsContent value="split" className="mt-4">
                        <p className="text-sm text-muted-foreground mb-4">Invite friends to split the cost. We'll send them a payment link.</p>
                        <div className="space-y-3">
                            {splitEmails.map((email, index) => (
                                <Input key={index} type="email" placeholder={`Friend's Email ${index + 1}`} value={email} onChange={(e) => handleEmailChange(index, e.target.value)} />
                            ))}
                        </div>
                        <Button variant="outline" size="sm" className="mt-3" onClick={handleAddEmail}><Plus className="mr-2"/> Add Another Friend</Button>
                        <p className="text-center font-semibold mt-4">You'll pay your share of ${(total / (splitEmails.length + 1)).toFixed(2)} now.</p>
                    </TabsContent>
                </Tabs>


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
