'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Share2, Car, PhoneCall } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SafetyFeatures() {
  const { toast } = useToast();

  const handleSosClick = () => {
    toast({
      title: "SOS Activated (Simulation)",
      description: "In a real app, emergency services would be contacted.",
      variant: 'destructive'
    });
  };

  const handleShareLocationClick = () => {
    toast({
      title: "Location Sharing (Simulation)",
      description: "Your location would be shared with your trusted contacts.",
    });
  };

  const handleTransportClick = () => {
     toast({
      title: "Verified Transport (Simulation)",
      description: "You would be shown a list of verified ride-share options.",
    });
  };


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Shield className="text-primary"/> Safety & Support
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
         <p className="text-sm text-muted-foreground">
            Your safety is our priority. Use these tools if you need assistance.
        </p>
        <Button onClick={handleSosClick} className="w-full" variant="destructive">
            <PhoneCall className="mr-2"/> SOS / Emergency
        </Button>
         <Button onClick={handleShareLocationClick} className="w-full" variant="outline">
            <Share2 className="mr-2"/> Share My Location
        </Button>
         <Button onClick={handleTransportClick} className="w-full" variant="outline">
            <Car className="mr-2"/> Find Verified Transport
        </Button>
      </CardContent>
    </Card>
  );
}
