export interface Seat {
  id: string;
  status: 'available' | 'taken' | 'selected';
}

export interface SeatingSection {
  name: string;
  seats: Seat[];
}

export interface SeatingMapData {
  sections: SeatingSection[];
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  seatingMap?: SeatingMapData;
}
