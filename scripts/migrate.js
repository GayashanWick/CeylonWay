import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'wfpfm41u',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

const packages = [
  {
    _type: 'package',
    title: 'The Leopard Trail',
    slug: { _type: 'slug', current: 'the-leopard-trail' },
    category: 'wildlife',
    duration: '7 Days / 6 Nights',
    groupSize: 6,
    priceFrom: 345000,
    shortDescription: 'Trace the elusive Sri Lankan Leopard across majestic national parks and sleep under the stars in premium canvas safaris.',
    highlights: ['Yala National Park Safari', 'Premium Glamping', 'Expert Trackers'],
    itinerary: [
      { _key: 'day1', dayNumber: 1, title: 'Arrival & Colombo', description: 'Arrive in Sri Lanka and rest.' },
      { _key: 'day2', dayNumber: 2, title: 'Journey to Yala', description: 'Travel to Yala and check into the lodge.' }
    ],
    addOns: [
      { _key: 'add1', name: 'Private Jeep Upgrade', priceLKR: 25000 }
    ],
    featured: true
  },
  {
    _type: 'package',
    title: 'Cloud Forest Retreat',
    slug: { _type: 'slug', current: 'cloud-forest-retreat' },
    category: 'wellness',
    duration: '5 Days / 4 Nights',
    groupSize: 8,
    priceFrom: 280000,
    shortDescription: 'Disconnect from the world and reconnect with yourself high in the misty mountains of Sri Lanka. Authentic Ayurveda and yoga.',
    highlights: ['Daily Yoga', 'Ayurvedic Consultations', 'Mountain Treks'],
    itinerary: [
      { _key: 'day1', dayNumber: 1, title: 'Mountain Ascent', description: 'Travel into the central highlands.' }
    ],
    featured: true
  },
  {
    _type: 'package',
    title: 'Ancient Kingdoms Explorer',
    slug: { _type: 'slug', current: 'ancient-kingdoms-explorer' },
    category: 'cultural',
    duration: '10 Days / 9 Nights',
    groupSize: 12,
    priceFrom: 420000,
    shortDescription: 'Journey through the cultural triangle. Explore ancient ruins, climb Sigiriya, and cycle through ancient Polonnaruwa.',
    highlights: ['Sigiriya Rock Fortress', 'Temple of the Tooth', 'Polonnaruwa Cycling'],
    featured: true
  },
  {
    _type: 'package',
    title: 'The East Coast Off-Grid Experience',
    slug: { _type: 'slug', current: 'east-coast-off-grid-experience' },
    category: 'off-grid',
    duration: '8 Days / 7 Nights',
    groupSize: 4,
    priceFrom: 310000,
    shortDescription: 'Isolated coastal adventure on the untouched eastern shores. Snorkeling, untouched beaches, and village life.',
    highlights: ['Arugam Bay', 'Pigeon Island Snorkeling', 'Village Cooking'],
    featured: true
  },
  {
    _type: 'package',
    title: 'Ultimate Adrenaline Ridge',
    slug: { _type: 'slug', current: 'ultimate-adrenaline-ridge' },
    category: 'adventure',
    duration: '6 Days / 5 Nights',
    groupSize: 10,
    priceFrom: 295000,
    shortDescription: 'White water rafting, canyoning, and hardcore mountain biking down Knuckles Mountain Range.',
    highlights: ['Kitulgala Rafting', 'Knuckles Trek', 'Night Safari'],
    featured: false
  },
  {
    _type: 'package',
    title: 'Galle Fort Heritage Walk',
    slug: { _type: 'slug', current: 'galle-fort-heritage-walk' },
    category: 'day-trip',
    duration: '1 Day',
    groupSize: 15,
    priceFrom: 15000,
    shortDescription: 'A comprehensive 1-day exploration of the historic Galle Fort with expert historians and food tasting.',
    highlights: ['Guided History Walk', 'Local Cuisine Tasting', 'Lighthouse View'],
    featured: false
  }
];

async function migrate() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN environment variable is missing.');
    console.error('Please generate one with Editor rights at https://sanity.io and prefix the execution command with it.');
    console.error('Example: SANITY_API_TOKEN="your_token" node scripts/migrate.js');
    process.exit(1);
  }

  console.log('Initiating Migration to Sanity...');
  try {
    for (const pkg of packages) {
      console.log(`Creating package: ${pkg.title}`);
      await client.create(pkg);
    }
    console.log('Migration Complete! Data successfully dumped to Sanity dataset.');
  } catch (err) {
    console.error('Migration failed:', err.message);
  }
}

migrate();
