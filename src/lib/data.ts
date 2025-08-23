
import type { Event, SeatingMapData, PostEventContentData } from './types';

function createSeatingMap(takenSeats: number = 20): SeatingMapData {
  const sections = [
    { name: 'Front Orchestra', rows: 5 },
    { name: 'Mezzanine', rows: 8 },
    { name: 'Balcony', rows: 6 },
  ];

  let seatCounter = 0;
  let takenCounter = 0;
  return {
    sections: sections.map((section, sectionIndex) => ({
      name: section.name,
      seats: Array.from({ length: section.rows * 10 }, (_, i) => {
        const seatId = `${section.name.charAt(0)}${Math.floor(i / 10) + 1}-${(i % 10) + 1}`;
        // Replace Math.random() with a deterministic approach
        const isTaken = (seatCounter + sectionIndex) % (Math.floor( (section.rows * 10) / (takenSeats / sections.length) ) + 2 ) === 0 && takenCounter < takenSeats;
        if (isTaken) {
            takenCounter++;
        }
        seatCounter++;
        return {
          id: seatId,
          status: isTaken ? 'taken' : 'available',
        };
      }),
    })),
  };
}

const samplePostEventContent: PostEventContentData = {
    photos: [
        { id: 'p1', url: 'https://placehold.co/600x400.png', caption: 'The crowd was electric!' },
        { id: 'p2', url: 'https://placehold.co/600x400.png', caption: 'An amazing performance.' },
        { id: 'p3', url: 'https://placehold.co/600x400.png', caption: 'Lights and sounds.' },
        { id: 'p4', url: 'https://placehold.co/600x400.png', caption: 'Unforgettable moments.' },
    ],
    videos: [
        { id: 'v1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Highlight Reel' },
        { id: 'v2', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Full Set Replay' },
    ]
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
    artist: {
      name: 'Cosmic Gate',
      bio: 'Cosmic Gate is a German DJ and record production duo, consisting of Claus Terhoeven and Stefan Bossems. They are renowned for their influential contributions to the trance music genre.',
      socials: {
        spotify: 'https://open.spotify.com/artist/6ySxYu68zTsO5ghsThpGtY',
        instagram: 'https://www.instagram.com/realcosmicgate',
        twitter: 'https://twitter.com/cosmicgate',
        website: 'https://cosmic-gate.de/',
      },
    },
    merchandise: [
      { id: 'm1-1', name: 'Interstellar Tour T-Shirt', price: '$35.00', image: 'https://placehold.co/300x300.png' },
      { id: 'm1-2', name: 'Signed Vinyl Record', price: '$75.00', image: 'https://placehold.co/300x300.png' },
      { id: 'm1-3', name: 'Cosmic Gate Beanie', price: '$25.00', image: 'https://placehold.co/300x300.png' },
    ],
    travelPackages: {
      flights: [
        { id: 'f1', type: 'flight', provider: 'Delta', price: '$250', details: 'Round trip from Chicago' },
        { id: 'f2', type: 'flight', provider: 'United', price: '$280', details: 'Round trip from Miami' },
      ],
      buses: [
        { id: 'b1', type: 'bus', provider: 'Greyhound', price: '$80', details: 'From Philadelphia' },
      ],
      hotels: [
        { id: 'h1', name: 'The Brooklyn Hotel', price: '$200/night', details: '0.5 miles from venue', image: 'https://placehold.co/300x200.png' },
        { id: 'h2', name: 'Wythe Hotel', price: '$350/night', details: '1.2 miles from venue', image: 'https://placehold.co/300x200.png' },
      ]
    },
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
    merchandise: [
      { id: 'm2-1', name: 'Official Fair Poster', price: '$25.00', image: 'https://placehold.co/300x300.png' },
      { id: 'm2-2', name: 'Artisan-Crafted Tote Bag', price: '$40.00', image: 'https://placehold.co/300x300.png' },
      { id: 'm2-3', name: 'Exhibition Catalogue', price: '$60.00', image: 'https://placehold.co/300x300.png' },
    ],
    travelPackages: {
        flights: [
          { id: 'f2-1', type: 'flight', provider: 'American', price: '$180', details: 'Round trip from New York' },
        ],
        buses: [
          { id: 'b2-1', type: 'bus', provider: 'Megabus', price: '$50', details: 'From Indianapolis' },
        ],
        hotels: [
          { id: 'h2-1', name: 'The Peninsula', price: '$500/night', details: 'Luxury stay near the fair', image: 'https://placehold.co/300x200.png' },
          { id: 'h2-2', name: 'ACME Hotel Company', price: '$250/night', details: 'Stylish and affordable', image: 'https://placehold.co/300x200.png' },
        ]
    }
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
    artist: {
      name: 'A-List Comedians',
      bio: 'The Laughing Factory features a rotating lineup of nationally acclaimed comedians. Check our website for this week\'s performers.',
      socials: {
        website: 'https://www.laughfactory.com/',
      },
    },
    merchandise: [
      { id: 'm3-1', name: '"I\'m a Joke" T-Shirt', price: '$25.00', image: 'https://placehold.co/300x300.png' },
      { id: 'm3-2', name: 'Comedy Gala Mug', price: '$15.00', image: 'https://placehold.co/300x300.png' },
    ],
    travelPackages: {
        flights: [
          { id: 'f3-1', type: 'flight', provider: 'Southwest', price: '$120', details: 'Round trip from Las Vegas' },
        ],
        buses: [
          { id: 'b3-1', type: 'bus', provider: 'FlixBus', price: '$30', details: 'From San Diego' },
        ],
        hotels: [
          { id: 'h3-1', name: 'Hollywood Roosevelt', price: '$400/night', details: 'Historic hotel on the strip', image: 'https://placehold.co/300x200.png' },
          { id: 'h3-2', name: 'The LINE Hotel', price: '$300/night', details: 'Trendy spot in Koreatown', image: 'https://placehold.co/300x200.png' },
        ]
    }
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
    merchandise: [
      { id: 'm4-1', name: 'Festival Wine Glass', price: '$15.00', image: 'https://placehold.co/300x300.png' },
      { id: 'm4-2', name: 'Artisanal Cheese Board', price: '$45.00', image: 'https://placehold.co/300x300.png' },
      { id: 'm4-3', name: 'Festival Apron', price: '$30.00', image: 'https://placehold.co/300x300.png' },
    ],
    travelPackages: {
        flights: [
          { id: 'f4-1', type: 'flight', provider: 'Spirit', price: '$90', details: 'Round trip from Dallas' },
        ],
        buses: [
          { id: 'b4-1', type: 'bus', provider: 'RedCoach', price: '$40', details: 'From Houston' },
        ],
        hotels: [
          { id: 'h4-1', name: 'South Congress Hotel', price: '$350/night', details: 'In the heart of the action', image: 'https://placehold.co/300x200.png' },
          { id: 'h4-2', name: 'Hotel San José', price: '$300/night', details: 'Iconic bungalow-style hotel', image: 'https://placehold.co/300x200.png' },
        ]
    }
  },
  {
    id: '5',
    name: 'Shakespeare in the Park: A Midsummer Night\'s Dream',
    date: 'July 12, 2024',
    location: 'New York, NY',
    category: 'theatre',
    description: 'A classic play reimagined under the stars.',
    longDescription: 'Experience the magic of Shakespeare like never before. This production of "A Midsummer Night\'s Dream" is set in an enchanted forest within the park, creating an immersive and unforgettable theatrical experience for all ages.',
    image: 'https://placehold.co/800x450.png',
    seatingMap: createSeatingMap(80),
    artist: {
      name: 'The Public Theater',
      bio: 'The Public Theater is a New York City arts organization founded as the Shakespeare Workshop in 1954 by Joseph Papp.',
      socials: {
        website: 'https://publictheater.org/',
      },
    },
    merchandise: [
      { id: 'm5-1', name: 'Playbill', price: '$10.00', image: 'https://placehold.co/300x300.png' },
      { id: 'm5-2', name: 'Commemorative Poster', price: '$20.00', image: 'https://placehold.co/300x300.png' },
    ],
    travelPackages: {
        flights: [
           { id: 'f5-1', type: 'flight', provider: 'JetBlue', price: '$220', details: 'Round trip from Boston' },
        ],
        buses: [
          { id: 'b5-1', type: 'bus', provider: 'Peter Pan', price: '$60', details: 'From Philadelphia' },
        ],
        hotels: [
          { id: 'h5-1', name: 'The Plaza', price: '$800/night', details: 'Iconic luxury near Central Park', image: 'https://placehold.co/300x200.png' },
          { id: 'h5-2', name: 'Park Lane Hotel', price: '$450/night', details: 'Stunning park views', image: 'https://placehold.co/300x200.png' },
        ]
    },
    postEventContent: samplePostEventContent
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
    merchandise: [
      { id: 'm6-1', name: 'Giants Team Jersey', price: '$120.00', image: 'https://placehold.co/300x300.png' },
      { id: 'm6-2', name: 'Eagles Team Jersey', price: '$120.00', image: 'https://placehold.co/300x300.png' },
      { id: 'm6-3', name: 'Game Day Foam Finger', price: '$15.00', image: 'https://placehold.co/300x300.png' },
    ],
    travelPackages: {
        flights: [],
        buses: [
          { id: 'b6-1', type: 'bus', provider: 'NJ Transit', price: '$30', details: 'From NYC' },
        ],
        hotels: [
          { id: 'h6-1', name: 'Live! Casino & Hotel', price: '$300/night', details: 'Next to the stadium complex', image: 'https://placehold.co/300x200.png' },
          { id: 'h6-2', name: 'Four Seasons Hotel', price: '$600/night', details: 'Luxury in Center City', image: 'https://placehold.co/300x200.png' },
        ]
    }
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
    merchandise: [
      { id: 'm7-1', name: 'GTS 2024 Hoodie', price: '$50.00', image: 'https://placehold.co/300x300.png' },
      { id: 'm7-2', name: 'Smart Notebook', price: '$30.00', image: 'https://placehold.co/300x300.png' },
    ],
    travelPackages: {
      flights: [
        { id: 'f3', type: 'flight', provider: 'Alaska Airlines', price: '$450', details: 'Round trip from New York (JFK)' },
        { id: 'f4', type: 'flight', provider: 'Southwest', price: '$380', details: 'Round trip from Dallas (DAL)' },
      ],
      buses: [
        { id: 'b7-1', type: 'bus', provider: 'California Shuttle', price: '$70', details: 'From Los Angeles' },
      ],
      hotels: [
        { id: 'h3', name: 'Hyatt Regency', price: '$400/night', details: 'Connected to conference center', image: 'https://placehold.co/300x200.png' },
        { id: 'h4', name: 'The Clift Royal Sonesta', price: '$320/night', details: '1.0 mile from venue', image: 'https://placehold.co/300x200.png' },
      ]
    },
    postEventContent: samplePostEventContent
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
    merchandise: [
      { id: 'm8-1', name: 'Finisher Medal', price: '$20.00', image: 'https://placehold.co/300x300.png' },
      { id: 'm8-2', name: 'Official Race T-Shirt', price: '$35.00', image: 'https://placehold.co/300x300.png' },
    ],
    travelPackages: {
        flights: [
          { id: 'f8-1', type: 'flight', provider: 'Delta', price: '$150', details: 'Round trip from New York' },
        ],
        buses: [
          { id: 'b8-1', type: 'bus', provider: 'Go Buses', price: '$50', details: 'From Providence' },
        ],
        hotels: [
          { id: 'h8-1', name: 'The Liberty Hotel', price: '$550/night', details: 'A former jail turned luxury hotel', image: 'https://placehold.co/300x200.png' },
          { id: 'h8-2', name: 'YOTEL Boston', price: '$300/night', details: 'Modern micro-hotel in Seaport', image: 'https://placehold.co/300x200.png' },
        ]
    }
  },
];

    