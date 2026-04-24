import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'wfpfm41u',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

const destinations = [
  {
    _type: 'destination',
    orderNumber: 1,
    name: "Sinharaja Rainforest",
    slug: { _type: 'slug', current: 'sinharaja-rainforest' },
    regionName: "Sabaragamuwa & Southern Province",
    description: "Sri Lanka's last true rainforest and a UNESCO World Heritage Site. Sinharaja receives over 2,500mm of rain per year and shelters species found nowhere else on earth — including six endemic bird species that can be spotted on a single morning walk. The forest floor is ancient. The canopy is alive. And almost no one goes deep enough to see the best of it.",
    highlights: ["Off-Grid Trekking", "Endemic Wildlife", "Birdwatching", "Overnight Camping"],
    bestTimeToVisit: "November to April",
    difficultyLevel: 2,
    featured: true
  },
  {
    _type: 'destination',
    orderNumber: 2,
    name: "Knuckles Range",
    slug: { _type: 'slug', current: 'knuckles-range' },
    regionName: "Central Province",
    description: "Named for the shape of its peaks when viewed from the lowlands, the Knuckles Range is Sri Lanka's most dramatically underrated landscape. Cloud forests, grassland plateaus, hidden waterfalls, and abandoned villages left by communities who moved to the lowlands generations ago. Trails here are unmarked, mornings are cold enough for a jacket, and the silence is complete.",
    highlights: ["Wilderness Camping", "Highland Trekking", "Photography", "Off-Grid Stays"],
    bestTimeToVisit: "January to April, August to September",
    difficultyLevel: 3,
    featured: true
  },
  {
    _type: 'destination',
    orderNumber: 3,
    name: "Horton Plains & World's End",
    slug: { _type: 'slug', current: 'horton-plains-worlds-end' },
    regionName: "Central Province",
    description: "At 2,100 metres above sea level, Horton Plains is unlike anywhere else in Sri Lanka. A rolling montane grassland plateau that ends abruptly at World's End — an 880-metre sheer cliff drop with views to the southern coast on clear mornings. Arrive before 8AM. The mist rolls in by 10 and the cliff disappears entirely.",
    highlights: ["Plateau Trekking", "Wildlife", "Sunrise Experiences", "Photography"],
    bestTimeToVisit: "December to March",
    difficultyLevel: 1,
    featured: false
  },
  {
    _type: 'destination',
    orderNumber: 4,
    name: "Yala National Park",
    slug: { _type: 'slug', current: 'yala-national-park' },
    regionName: "Southern Province",
    description: "Yala has the highest density of leopards of any national park in the world — and yet most visitors never leave the main circuit. We go further in, camp overnight inside the buffer zone, and spend the golden hours of dawn and dusk in areas that day-trippers never reach. The difference is extraordinary.",
    highlights: ["Leopard Safaris", "Overnight Camps", "Birdwatching", "Wildlife Photography"],
    bestTimeToVisit: "February to July",
    difficultyLevel: 1,
    featured: false
  },
  {
    _type: 'destination',
    orderNumber: 5,
    name: "Ella & Little Adam's Peak",
    slug: { _type: 'slug', current: 'ella-little-adams-peak' },
    regionName: "Uva Province",
    description: "Ella has become known. Which means the trick is knowing where to go beyond it. The ridge walks above the town, the lesser-known trails into the tea estate hinterland, and the river camps below the Nine Arch Bridge are all still quiet. We use Ella as a base, not a destination — and the difference shows.",
    highlights: ["Ridge Walking", "Tea Estate Trails", "River Camping", "Cultural Experiences"],
    bestTimeToVisit: "Year-round, best December to April",
    difficultyLevel: 2,
    featured: false
  },
  {
    _type: 'destination',
    orderNumber: 6,
    name: "Galle & Southern Coast",
    slug: { _type: 'slug', current: 'galle-southern-coast' },
    regionName: "Southern Province",
    description: "The southern coast is where the island exhales. We focus on the quieter stretches — snorkelling reefs that see less than a dozen visitors a week, coastal forest trails between fishing villages, and small-boat whale watching departures at dawn from Mirissa. The Dutch Fort in Galle is the cultural anchor. The ocean is the reason.",
    highlights: ["Snorkelling", "Whale Watching", "Coastal Trails", "Cultural Heritage"],
    bestTimeToVisit: "November to April",
    difficultyLevel: 1,
    featured: false
  },
  {
    _type: 'destination',
    orderNumber: 7,
    name: "Kandy & the Hill Country",
    slug: { _type: 'slug', current: 'kandy-hill-country' },
    regionName: "Central Province",
    description: "Kandy is Sri Lanka's cultural heartbeat — home to the Temple of the Tooth, the last royal capital of the ancient kings, and a city that operates at a fundamentally different rhythm from Colombo. We pair cultural immersion in the city with wellness and Ayurvedic retreats in the forested hills immediately surrounding it, where century-old herbal gardens still operate as they always have.",
    highlights: ["Cultural Immersion", "Ayurveda", "Temple Visits", "Botanical Gardens"],
    bestTimeToVisit: "Year-round",
    difficultyLevel: 1,
    featured: false
  },
  {
    _type: 'destination',
    orderNumber: 8,
    name: "Anuradhapura & the Ancient Cities",
    slug: { _type: 'slug', current: 'anuradhapura-ancient-cities' },
    regionName: "North Central Province",
    description: "Anuradhapura was one of the ancient world's great cities — a civilisation that built reservoirs, dagobas, and palaces two thousand years ago that still stand today. Most visitors do it in four hours on a tuk-tuk. We spend two days, move slowly, and combine it with Mihintale — the mountain where Buddhism first arrived in Sri Lanka — and wild camping on the banks of ancient irrigation tanks where elephants drink at dusk.",
    highlights: ["Archaeological Sites", "Cultural Immersion", "Wild Camping", "History"],
    bestTimeToVisit: "May to September",
    difficultyLevel: 1,
    featured: false
  }
];

async function seed() {
  console.log('Initiating Destinations Migration to Sanity...');
  try {
    for (const dest of destinations) {
      console.log(`Pumping destination: ${dest.name}`);
      await client.create(dest);
    }
    console.log('Destinations Database Migration Complete!');
  } catch (err) {
    console.error('Migration failed:', err.message);
  }
}

seed();
