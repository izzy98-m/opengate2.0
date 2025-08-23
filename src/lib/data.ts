import type { Event, SeatingMapData } from './types';

function createSeatingMap(takenSeats: number = 20): SeatingMapData {
  const sections = [
    { name: 'Front Orchestra', rows: 5 },
    { name: 'Mezzanine', rows: 8 },
    { name: 'Balcony', rows: 6 },
  ];

  let totalSeats = 0;
  sections.forEach(s => totalSeats += s.rows * 10);
  
  const takenSeatSet = new Set<number>();
  while (takenSeatSet.size < takenSeats) {
    takenSeatSet.add(Math.floor(Math.random() * totalSeats));
  }
  
  const takenSeatArray = Array.from(takenSeatSet);

  let seatCounter = 0;
  return {
    sections: sections.map(section => ({
      name: section.name,
      seats: Array.from({ length: section.rows * 10 }, (_, i) => {
        const seatId = `${section.name.charAt(0)}${Math.floor(i / 10) + 1}-${(i % 10) + 1}`;
        const isTaken = takenSeatArray.includes(seatCounter);
        seatCounter++;
        return {
          id: seatId,
          status: isTaken ? 'taken' : 'available',
        };
      }),
    })),
  };
}


export const events: Event[] = [
  {
    id: '1',
    name: 'Cosmic Gate: Interstellar Tour',
    date: 'December 15, 2024',
    location: 'Brooklyn, NY',
    category: 'music',
    description: 'Experience a journey through sound with the legendary electronic duo.',
    longDescription: 'Join Cosmic Gate for their Interstellar Tour for a night of mind-bending electronic music. With a career spanning over two decades, they continue to push the boundaries of the genre. This show will feature their classic hits along with new material, accompanied by a stunning visual production.',
    image: 'https://placehold.co/800x450.png',
    seatingMap: createSeatingMap(35),
  },
  {
    id: '2',
    name: 'Metropolis Modern Art Fair',
    date: 'November 8-10, 2024',
    location: 'Chicago, IL',
    category: 'art',
    description: 'A showcase of the most innovative contemporary artists.',
    longDescription: 'The Metropolis Modern Art Fair brings together galleries and artists from around the world. Discover new talent, attend artist talks, and acquire unique pieces for your collection. The fair features a wide range of media, from painting and sculpture to digital art and performance.',
    image: 'https://placehold.co/800x450.png',
  },
  {
    id: '3',
    name: 'The Laughing Factory: Comedy Gala',
    date: 'Every Friday Night',
    location: 'Los Angeles, CA',
    category: 'comedy',
    description: 'A lineup of the best stand-up comedians in the city.',
    longDescription: 'Get ready to laugh until you cry at The Laughing Factory\'s weekly Comedy Gala. Every Friday, we bring you a new lineup of established stars and rising talents from the world of stand-up comedy. It\'s the perfect way to kick off your weekend.',
    image: 'https://placehold.co/800x450.png',
    seatingMap: createSeatingMap(50),
  },
  {
    id: '4',
    name: 'Indie Food & Wine Festival',
    date: 'October 26, 2024',
    location: 'Austin, TX',
    category: 'food',
    description: 'Savor artisanal foods and fine wines from local producers.',
    longDescription: 'A celebration of local and independent culinary talent. The Indie Food & Wine Festival offers a chance to taste a diverse array of gourmet foods, craft beverages, and fine wines. Meet the artisans, enjoy live music, and participate in tasting workshops.',
    image: 'https://placehold.co/800x450.png',
  },
    {
    id: '5',
    name: 'Shakespeare in the Park: A Midsummer Night\'s Dream',
    date: 'July 12, 2025',
    location: 'New York, NY',
    category: 'theatre',
    description: 'A classic play reimagined under the stars.',
    longDescription: 'Experience the magic of Shakespeare like never before. This production of "A Midsummer Night\'s Dream" is set in an enchanted forest within the park, creating an immersive and unforgettable theatrical experience for all ages.',
    image: 'https://placehold.co/800x450.png',
    seatingMap: createSeatingMap(80),
  },
  {
    id: '6',
    name: 'Giants vs. Eagles Divisional Showdown',
    date: 'October 20, 2024',
    location: 'Philadelphia, PA',
    category: 'sports',
    description: 'A fierce rivalry continues in this can\'t-miss NFL game.',
    longDescription: 'The historic rivalry between the New York Giants and the Philadelphia Eagles heats up once again. Be there to witness every tackle, touchdown, and thrilling moment as these two NFC East powerhouses battle for supremacy.',
    image: 'https://placehold.co/800x450.png',
    seatingMap: createSeatingMap(150),
  },
  {
    id: '7',
    name: 'Global Tech Summit 2024',
    date: 'September 5-7, 2024',
    location: 'San Francisco, CA',
    category: 'conference',
    description: 'The future of technology, unveiled by industry leaders.',
    longDescription: 'Join the brightest minds in tech at the Global Tech Summit. This three-day event features keynotes from visionary leaders, deep-dive workshops on AI, blockchain, and quantum computing, and unparalleled networking opportunities. Discover the trends and innovations shaping our world.',
    image: 'https://placehold.co/800x450.png',
  },
  {
    id: '8',
    name: 'City Marathon 2025',
    date: 'May 18, 2025',
    location: 'Boston, MA',
    category: 'sports',
    description: 'Join thousands of runners in this prestigious annual marathon.',
    longDescription: 'Whether you\'re a seasoned marathoner or a first-timer, the City Marathon offers an incredible experience. The course takes you through historic neighborhoods and scenic landmarks, with cheering crowds supporting you every step of the way. Register to run or come out to support the participants.',
    image: 'https://placehold.co/800x450.png',
  },
];
