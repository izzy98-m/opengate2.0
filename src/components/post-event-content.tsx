
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Camera, Video } from 'lucide-react';
import type { PostEventContentData } from '@/lib/types';

interface PostEventContentProps {
  content: PostEventContentData;
}

export default function PostEventContent({ content }: PostEventContentProps) {
  return (
    <Card className="shadow-lg" id="post-event-content">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Camera className="text-primary"/> Event Highlights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
            <h3 className="text-xl font-semibold mb-4">Photo Gallery</h3>
             <Carousel className="w-full max-w-xl mx-auto" opts={{ loop: true }}>
                <CarouselContent>
                    {content.photos.map((photo) => (
                    <CarouselItem key={photo.id}>
                        <div className="p-1">
                        <Card>
                            <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
                                 <Image src={photo.url} alt={photo.caption} width={600} height={400} className="w-full h-full object-cover" data-ai-hint="event photo"/>
                            </CardContent>
                        </Card>
                        <p className="text-center text-sm text-muted-foreground mt-2">{photo.caption}</p>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Video className="text-primary"/> Video Replays</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.videos.map(video => (
                    <div key={video.id}>
                        <div className="aspect-video overflow-hidden rounded-lg">
                             <iframe 
                                width="100%" 
                                height="100%" 
                                src={video.url} 
                                title={video.title} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen>
                            </iframe>
                        </div>
                        <h4 className="font-semibold mt-2">{video.title}</h4>
                    </div>
                ))}
            </div>
        </div>

      </CardContent>
    </Card>
  );
}
