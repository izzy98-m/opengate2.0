
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { events } from '@/lib/data';
import SeatingMap from '@/components/seating-map';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Tag, Ticket, Info, Mic2, Shirt, Link as LinkIcon, ShoppingCart, ArrowDown, Wifi } from 'lucide-react';
import { useState, useEffect } from 'react';
import EventChat from '@/components/event-chat';
import { isEventLive, isEventOver } from '@/lib/utils';
import TravelPackages from '@/components/travel-packages';
import SafetyFeatures from '@/components/safety-features';
import PostEventContent from '@/components/post-event-content';

interface EventPageProps {
  params: {
    id: string;
  };
}

const socialIcons = {
    spotify: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><title>Spotify</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.923 17.46c-.225.358-.69.46-1.047.234-2.94-1.8-6.666-2.21-11.125-1.215-.424.09-.848-.163-.938-.585-.09-.423.163-.848.585-.938 4.814-1.087 8.89-0.62 12.075 1.335.358.225.46.69.234 1.047zm1.2-3.136c-.282.447-.855.57-1.302.287-3.3-2.025-8.325-2.6-12.825-1.425-.51.135-.99-.18-1.125-.69-.135-.51.18-.99.69-1.125 4.95-1.29 10.425-.57 14.175 1.665.447.283.57.855.288 1.302zm.135-3.3c-.33.524-1.013.682-1.537.352-3.825-2.355-10.005-3.03-13.95-1.665-.585.21-.93-.315-.72-.9.21-.585.795-.93.93-.72 4.35-1.485 10.95-.75 15.15 1.815.525.33.683 1.013.353 1.537z"/></svg>,
    instagram: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.784.297-1.459.717-2.126 1.384S.926 3.356.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.784.718 1.459 1.384 2.126.667.666 1.342 1.078 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.784-.306 1.459-.718 2.126-1.384.666-.667 1.078-1.342 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.306-.784-.718-1.459-1.384-2.126C21.314.926 20.644.514 19.86.218 19.094-.083 18.225-.285 16.947-.344 15.667-.401 15.26-.415 12-.415zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.423.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.06-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.423-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.074-4.85c.06-1.17.249 1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819.679 1.381-.896.423-.164 1.057.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>,
    twitter: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>,
};


export default function EventPage({ params }: EventPageProps) {
  const event = events.find(e => e.id === params.id);
  const [live, setLive] = useState(false);
  const [over, setOver] = useState(false);

  useEffect(() => {
    if (event) {
      setLive(isEventLive(event.date));
      setOver(isEventOver(event.date));
    }
  }, [event]);

  if (!event) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
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
                   {live && !over && (
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Wifi className="h-5 w-5" />
                      <span>Event is Live</span>
                    </div>
                  )}
                   {over && (
                    <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                      <span>Event has ended</span>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">About this event</h2>
                  <p className="text-foreground/80 leading-relaxed">{event.longDescription}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  {event.artist && (
                     <Button asChild variant="outline">
                       <a href="#artist-info">
                         <Mic2 className="mr-2"/> View Artist <ArrowDown className="ml-2 h-4 w-4"/>
                       </a>
                     </Button>
                  )}
                  {event.merchandise && event.merchandise.length > 0 && (
                     <Button asChild variant="outline">
                       <a href="#merchandise">
                         <Shirt className="mr-2"/> View Merch <ArrowDown className="ml-2 h-4 w-4"/>
                       </a>
                     </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {live && !over && <EventChat />}
            {over && event.postEventContent && <PostEventContent content={event.postEventContent} />}

            {event.artist && (
              <Card className="shadow-lg" id="artist-info">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Mic2 className="text-primary"/> Artist Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">{event.artist.name}</h3>
                  <p className="text-muted-foreground mb-4">{event.artist.bio}</p>
                  <div className="flex items-center gap-4">
                    {event.artist.socials.spotify && <Button variant="outline" size="icon" asChild><a href={event.artist.socials.spotify} target="_blank" rel="noopener noreferrer">{socialIcons.spotify}</a></Button>}
                    {event.artist.socials.instagram && <Button variant="outline" size="icon" asChild><a href={event.artist.socials.instagram} target="_blank" rel="noopener noreferrer">{socialIcons.instagram}</a></Button>}
                    {event.artist.socials.twitter && <Button variant="outline" size="icon" asChild><a href={event.artist.socials.twitter} target="_blank" rel="noopener noreferrer">{socialIcons.twitter}</a></Button>}
                    {event.artist.socials.website && <Button variant="outline" size="icon" asChild><a href={event.artist.socials.website} target="_blank" rel="noopener noreferrer"><LinkIcon /></a></Button>}
                  </div>
                </CardContent>
              </Card>
            )}

            {event.merchandise && event.merchandise.length > 0 && (
                <Card className="shadow-lg" id="merchandise">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Shirt className="text-primary"/> Merchandise</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {event.merchandise.map(item => (
                            <Card key={item.id} className="overflow-hidden">
                                <Image src={item.image} alt={item.name} width={300} height={300} className="w-full object-cover aspect-square" data-ai-hint="merchandise clothing"/>
                                <div className="p-4">
                                    <h4 className="font-semibold truncate">{item.name}</h4>
                                    <p className="text-muted-foreground">{item.price}</p>
                                    <Button className="w-full mt-3" size="sm"><ShoppingCart className="mr-2"/> Add to Cart</Button>
                                </div>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            )}

            {event.travelPackages && (
              <TravelPackages 
                flights={event.travelPackages.flights}
                hotels={event.travelPackages.hotels}
                buses={event.travelPackages.buses}
              />
            )}

          </div>

          <div className="space-y-8">
            {!over && (
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
                  <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg" asChild>
                    <Link href={`/checkout/${event.id}`}>Buy Tickets</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

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

            <SafetyFeatures />
          </div>
        </div>
      </div>
    </div>
  );
}

    