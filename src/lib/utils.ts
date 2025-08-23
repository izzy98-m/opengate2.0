import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { parse, isPast, isToday } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isEventLive(dateString: string): boolean {
  if (dateString.toLowerCase() === 'every friday night') {
    return new Date().getDay() === 5;
  }
  try {
    const eventDate = parse(dateString, 'MMMM d, yyyy', new Date());
    return isPast(eventDate) || isToday(eventDate);
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return false;
  }
}
