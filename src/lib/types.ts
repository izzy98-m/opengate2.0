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

export interface TravelDeal {
  id: string;
  type: 'flight' | 'bus';
  provider: string;
  price: string;
  details: string;
}

export interface HotelDeal {
  id: string;
  name: string;
  price: string;
  details: string;
  image: string;
}

export interface PostEventPhoto {
    id: string;
    url: string;
    caption: string;
}

export interface PostEventVideo {
    id: string;
    url: string;
    title: string;
}

export interface PostEventContentData {
    photos: PostEventPhoto[];
    videos: PostEventVideo[];
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
  travelPackages?: {
    flights: TravelDeal[];
    buses: TravelDeal[];
    hotels: HotelDeal[];
  };
  postEventContent?: PostEventContentData;
}
