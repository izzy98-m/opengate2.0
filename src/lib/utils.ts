import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { parse, isPast, isToday, isFuture } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function parseDate(dateString: string): Date | null {
   if (dateString.toLowerCase() === 'every friday night') {
    return new Date(); // Treat as current date for logic purposes
  }
  try {
    // Handle date ranges like "November 8-10, 2024" by parsing the start date
    const dateToParse = dateString.split('-')[0].trim();
    return parse(dateToParse, 'MMMM d, yyyy', new Date());
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return null;
  }
}

export function isEventLive(dateString: string): boolean {
  if (dateString.toLowerCase() === 'every friday night') {
    return new Date().getDay() === 5;
  }
  const eventDate = parseDate(dateString);
  return eventDate ? isToday(eventDate) : false;
}

export function isEventOver(dateString: string): boolean {
  if (dateString.toLowerCase() === 'every friday night') {
    return false; // This event is recurring, never truly "over"
  }
   const eventDate = parseDate(dateString);
   // To handle date ranges, we might need a more robust solution,
   // but for now, we'll consider it over if the start date is in the past.
   return eventDate ? isPast(eventDate) && !isToday(eventDate) : false;
}
