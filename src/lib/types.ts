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

export interface Artist {
  name: string;
  bio: string;
  socials: {
    spotify?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

export interface MerchandiseItem {
  id: string;
  name: string;
  price: string;
  image: string;
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
  artist?: Artist;
  merchandise?: MerchandiseItem[];
}
