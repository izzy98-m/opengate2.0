
'use client';

import Image from 'next/image';
import type { TravelDeal, HotelDeal } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plane, Hotel, Bus, Luggage } from 'lucide-react';

interface TravelPackagesProps {
  flights: TravelDeal[];
  hotels: HotelDeal[];
  buses: TravelDeal[];
}

export default function TravelPackages({ flights, hotels, buses }: TravelPackagesProps) {
  return (
    <Card className="shadow-lg" id="travel-packages">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Luggage className="text-primary"/> Travel & Accommodation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="flights">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="flights" disabled={flights.length === 0}>
                <Plane className="mr-2"/> Flights
            </TabsTrigger>
            <TabsTrigger value="hotels" disabled={hotels.length === 0}>
                <Hotel className="mr-2"/> Hotels
            </TabsTrigger>
            <TabsTrigger value="buses" disabled={buses.length === 0}>
                <Bus className="mr-2"/> Buses
            </TabsTrigger>
          </TabsList>
          <TabsContent value="flights" className="mt-4 space-y-4">
            {flights.length > 0 ? flights.map(deal => (
              <div key={deal.id} className="flex items-center justify-between p-3 rounded-lg border bg-secondary/30">
                <div>
                    <p className="font-semibold">{deal.provider} - {deal.price}</p>
                    <p className="text-sm text-muted-foreground">{deal.details}</p>
                </div>
                <Button size="sm">Book Now</Button>
              </div>
            )) : <p className="text-center text-muted-foreground py-4">No flight packages available.</p>}
          </TabsContent>
          <TabsContent value="hotels" className="mt-4 space-y-4">
            {hotels.length > 0 ? hotels.map(deal => (
              <Card key={deal.id} className="flex items-start gap-4 p-3 bg-secondary/30 border">
                 <Image src={deal.image} alt={deal.name} width={120} height={80} className="rounded-md object-cover" data-ai-hint="hotel exterior" />
                 <div className="flex-grow">
                    <p className="font-semibold">{deal.name} - {deal.price}</p>
                    <p className="text-sm text-muted-foreground mb-2">{deal.details}</p>
                    <Button size="sm">Book Now</Button>
                 </div>
              </Card>
            )) : <p className="text-center text-muted-foreground py-4">No hotel packages available.</p>}
          </TabsContent>
          <TabsContent value="buses" className="mt-4 space-y-4">
            {buses.length > 0 ? buses.map(deal => (
               <div key={deal.id} className="flex items-center justify-between p-3 rounded-lg border bg-secondary/30">
                <div>
                    <p className="font-semibold">{deal.provider} - {deal.price}</p>
                    <p className="text-sm text-muted-foreground">{deal.details}</p>
                </div>
                <Button size="sm">Book Now</Button>
              </div>
            )) : <p className="text-center text-muted-foreground py-4">No bus packages available.</p>}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
