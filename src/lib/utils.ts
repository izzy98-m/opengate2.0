
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { parse, isPast, isToday, isFuture, endOfDay } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function parseDate(dateString: string, isEndDate: boolean = false): Date | null {
   if (dateString.toLowerCase() === 'every friday night') {
    return new Date(); // Treat as current date for logic purposes
  }
  try {
    // Handle date ranges like "November 8-10, 2024"
    const parts = dateString.split(/[\s,-]+/); // Split by space, comma, or hyphen
    const month = parts[0];
    const year = parts[parts.length - 1];
    
    let day;
    if (isEndDate && parts.length > 3) { // "November", "8-10", "2024" -> "November", "8", "10", "2024"
        // If there's a range, use the end day
        day = parts.find(part => /^\d{1,2}$/.test(part) && parseInt(part, 10) > parseInt(parts[1], 10)) || parts[1];
    } else {
        // Otherwise, use the start day
        day = parts[1];
    }

    const dateToParse = `${month} ${day}, ${year}`;
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
   const eventEndDate = parseDate(dateString, true);
   // Check if the end of the event's last day is in the past.
   return eventEndDate ? isPast(endOfDay(eventEndDate)) : false;
}

    