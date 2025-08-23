import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Event } from '@/lib/types';
import { Button } from './ui/button';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} className="group block h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0 relative">
          <Image
            src={event.image}
            alt={event.name}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            data-ai-hint="event concert festival"
          />
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.name}</CardTitle>
          <div className="space-y-2 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center bg-card">
          <Badge variant="secondary" className="capitalize">
            <Tag className="h-3 w-3 mr-1" />
            {event.category}
          </Badge>
          <Button size="sm" variant="link" className="text-primary group-hover:underline p-0 h-auto">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
