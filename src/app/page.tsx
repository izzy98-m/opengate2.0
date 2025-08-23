'use client';

import { useState, useMemo } from 'react';
import { events as allEvents } from '@/lib/data';
import EventCard from '@/components/event-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

export default function Home() {
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = useMemo(() => {
    const allCategories = allEvents.map(event => event.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, []);

  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const matchesLocation = event.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
      return matchesLocation && matchesCategory;
    });
  }, [locationFilter, categoryFilter]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-center mb-2 font-headline">Find Your Next Experience</h1>
        <p className="text-lg text-muted-foreground text-center">Browse through our curated list of events.</p>
      </div>

      <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-lg font-semibold w-full md:w-auto">
            <Filter className="h-5 w-5 text-primary" />
            <span>Filter Events</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Input
              placeholder="Search by location..."
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="w-full"
            />
            <Select onValueChange={setCategoryFilter} defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="capitalize">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">No Events Found</h2>
          <p className="text-muted-foreground">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
