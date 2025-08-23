
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { events } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, Calendar, MapPin, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import { Skeleton } from '@/components/ui/skeleton';

interface TicketPageProps {
  params: {
    id: string;
  };
}

export default function TicketPage({ params: { id } }: TicketPageProps) {
  const event = events.find(e => e.id === id);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    if (event) {
      const ticketData = {
        eventId: event.id,
        eventName: event.name,
        ticketId: `TICKET-${Date.now()}`,
        userId: 'USER-123-ABC', // In a real app, this would be the logged-in user's ID
      };
      QRCode.toDataURL(JSON.stringify(ticketData), { width: 300, margin: 2 })
        .then(url => {
          setQrCodeUrl(url);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [event]);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-sm mx-auto shadow-lg bg-card text-card-foreground">
            <CardHeader className="text-center p-8 bg-primary text-primary-foreground rounded-t-lg">
                <Ticket className="mx-auto h-12 w-12"/>
                <CardTitle className="text-2xl font-bold mt-4">Your Ticket</CardTitle>
                <CardDescription className="text-primary-foreground/80">Present this at the venue</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-6">
                <div className="text-center pb-6 border-b-2 border-dashed">
                    <h2 className="text-2xl font-bold text-primary">{event.name}</h2>
                     <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                    </div>
                </div>

                <div className="flex justify-center items-center py-8">
                  {qrCodeUrl ? (
                    <Image 
                        src={qrCodeUrl}
                        alt="QR Code"
                        width={250}
                        height={250}
                        className="rounded-lg"
                        data-ai-hint="qr code ticket"
                    />
                  ) : (
                    <Skeleton className="h-[250px] w-[250px] rounded-lg" />
                  )}
                </div>

                <div className="text-center text-muted-foreground text-xs space-y-1">
                    <p>Seat: General Admission</p>
                    <p>Ticket ID: TICKET-{event.id}-12345</p>
                    <p>This ticket is non-transferable.</p>
                </div>
                 <Button size="lg" variant="outline" className="w-full mt-6 font-bold">
                    <QrCode className="mr-2"/> Download Ticket
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
