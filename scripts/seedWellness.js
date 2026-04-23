import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'wfpfm41u',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

const wellnessPackages = [
  {
    _type: 'package',
    title: 'Ayurvedic Renewal Retreat',
    slug: { _type: 'slug', current: 'ayurvedic-renewal-retreat' },
    category: 'wellness',
    duration: '4 Days / 3 Nights',
    groupSize: 8,
    priceFrom: 195 * 300, // $195 * 300
    shortDescription: 'A deeply personalised Ayurvedic programme combining daily treatments, herbal therapies, and forest walks in Sri Lanka\'s hill country.',
    highlights: [
      'Daily Ayurvedic consultation', 
      '3 therapeutic treatments per day', 
      'Organic Sattvic meals', 
      'Guided forest meditation'
    ],
    featured: false
  },
  {
    _type: 'package',
    title: 'Jungle Yoga & Silence Retreat',
    slug: { _type: 'slug', current: 'jungle-yoga-silence-retreat' },
    category: 'wellness',
    duration: '3 Days / 2 Nights',
    groupSize: 6,
    priceFrom: 165 * 300,
    shortDescription: 'Three days of guided yoga, breathwork, and complete digital silence in a private jungle lodge above the Knuckles Range.',
    highlights: [
      'Twice daily yoga sessions', 
      'Full digital detox', 
      'Guided nature walks', 
      'Plant-based cuisine'
    ],
    featured: false
  },
  {
    _type: 'package',
    title: 'Forest Bathing & Mindfulness Weekend',
    slug: { _type: 'slug', current: 'forest-bathing-mindfulness-weekend' },
    category: 'wellness',
    duration: '2 Days / 1 Night',
    groupSize: 10,
    priceFrom: 120 * 300,
    shortDescription: 'A restorative weekend of guided Shinrin-yoku forest bathing, sound healing, and Ayurvedic massage in Sinharaja buffer zone.',
    highlights: [
      '3 guided forest bathing sessions', 
      'Sound healing ceremony', 
      '1 Ayurvedic treatment', 
      'Mindful eating workshop'
    ],
    featured: false
  },
  {
    _type: 'package',
    title: 'Bespoke Wellness Journey',
    slug: { _type: 'slug', current: 'bespoke-wellness-journey' },
    category: 'wellness',
    duration: '5–7 Days',
    groupSize: 4,
    priceFrom: 290 * 300,
    shortDescription: 'A fully customised wellness programme built around your specific health goals — designed in consultation with our Ayurvedic doctor before arrival.',
    highlights: [
      'Pre-arrival health consultation', 
      'Fully personalised daily programme', 
      'Private practitioner', 
      'Airport transfers included'
    ],
    featured: false
  }
];

async function seed() {
  console.log('Initiating Wellness Migration to Sanity...');
  try {
    for (const pkg of wellnessPackages) {
      console.log(`Pumping package: ${pkg.title}`);
      await client.create(pkg);
    }
    console.log('Wellness Database Migration Complete! Successfully bumped LKR variables.');
  } catch (err) {
    console.error('Migration failed:', err.message);
  }
}

seed();
