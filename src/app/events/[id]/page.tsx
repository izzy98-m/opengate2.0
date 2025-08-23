import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { events } from '@/lib/data';
import SeatingMap from '@/components/seating-map';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Tag, Ticket, Info } from 'lucide-react';

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  const event = events.find(e => e.id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="p-0">
                <Image
                  src={event.image}
                  alt={event.name}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover"
                  data-ai-hint="event concert venue"
                />
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 font-headline">{event.name}</h1>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-3 mb-6 text-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">About this event</h2>
                  <p className="text-foreground/80 leading-relaxed">{event.longDescription}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Ticket className="text-primary"/> Get Your Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Tickets are available now. Don't miss out!</p>
                <Badge variant="secondary" className="capitalize text-sm py-1 px-3">
                  <Tag className="h-4 w-4 mr-2" />
                  {event.category}
                </Badge>
                <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg">
                  <Link href={`/checkout/${event.id}`}>Buy Tickets</Link>
                </Button>
              </CardContent>
            </Card>

            {event.seatingMap && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Info className="text-primary"/> Seating Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <SeatingMap data={event.seatingMap} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
