import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
              <Ticket className="h-8 w-8" />
              <span className="text-2xl font-bold">OpenGate</span>
            </Link>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/">Events</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/recommendations">Recommendations</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
