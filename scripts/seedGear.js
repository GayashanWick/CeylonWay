import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'wfpfm41u',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

const gearItems = [
  { _type: 'gear', name: '2-Person Camping Tent', category: 'Camping', description: 'Lightweight waterproof tent, easy setup, includes pegs and rainfly', condition: 'Excellent', rentalPricePerDay: 8, purchasePrice: 95, availableForRent: true, availableForSale: true, inStock: true },
  { _type: 'gear', name: '4-Person Family Camping Tent', category: 'Camping', description: 'Spacious dome tent with ventilation mesh and carry bag', condition: 'Good', rentalPricePerDay: 12, purchasePrice: 140, availableForRent: true, availableForSale: true, inStock: true },
  { _type: 'gear', name: 'Sleeping Bag (0°C Rated)', category: 'Camping', description: 'Suitable for hill country cold nights, compression sack included', condition: 'Excellent', rentalPricePerDay: 5, purchasePrice: 65, availableForRent: true, availableForSale: true, inStock: true },
  { _type: 'gear', name: 'Camping Cooking Set', category: 'Camping', description: 'Lightweight stainless steel pot, pan, and utensil set for 2', condition: 'Good', rentalPricePerDay: 4, purchasePrice: 35, availableForRent: true, availableForSale: true, inStock: true },
  { _type: 'gear', name: 'Headlamp (300 Lumen)', category: 'Camping', description: 'Waterproof, 3 modes, batteries included', condition: 'New', rentalPricePerDay: 3, purchasePrice: 22, availableForRent: true, availableForSale: true, inStock: true },
  { _type: 'gear', name: 'GoPro Hero (Latest Model)', category: 'Photography', description: 'Waterproof action camera with chest mount, head mount, and carry case', condition: 'Excellent', rentalPricePerDay: 15, purchasePrice: 380, availableForRent: true, availableForSale: true, inStock: true },
  { _type: 'gear', name: 'GoPro Accessories Kit', category: 'Photography', description: 'Extra batteries, waterproof housing, selfie stick, floating grip', condition: 'Good', rentalPricePerDay: 5, purchasePrice: null, availableForRent: true, availableForSale: false, inStock: true },
  { _type: 'gear', name: 'Snorkelling Set (Mask + Fins + Snorkel)', category: 'Water & Snorkelling', description: 'Adult sizes S/M/L available, anti-fog mask', condition: 'Excellent', rentalPricePerDay: 7, purchasePrice: null, availableForRent: true, availableForSale: false, inStock: true },
  { _type: 'gear', name: 'Underwater Camera (Waterproof to 10m)', category: 'Water & Snorkelling', description: 'Point and shoot, 20MP, wrist strap included', condition: 'Good', rentalPricePerDay: 10, purchasePrice: 120, availableForRent: true, availableForSale: true, inStock: true },
  { _type: 'gear', name: 'Dry Bag Set (10L + 20L)', category: 'Water & Snorkelling', description: 'Waterproof roll-top bags for kayaking, snorkelling, river crossings', condition: 'New', rentalPricePerDay: 3, purchasePrice: 28, availableForRent: true, availableForSale: true, inStock: true },
  { _type: 'gear', name: 'Trekking Poles (Pair)', category: 'Hiking', description: 'Adjustable aluminium, cork grip, rubber and spike tips', condition: 'Excellent', rentalPricePerDay: 4, purchasePrice: 45, availableForRent: true, availableForSale: true, inStock: true },
  { _type: 'gear', name: 'Hiking Backpack (45L)', category: 'Hiking', description: 'Padded back support, rain cover included, multiple compartments', condition: 'Good', rentalPricePerDay: 6, purchasePrice: 85, availableForRent: true, availableForSale: true, inStock: true },
  { _type: 'gear', name: 'Water Filter Bottle', category: 'Hiking', description: 'Filters 99.9% of bacteria and protozoa, 650ml', condition: 'New', rentalPricePerDay: 3, purchasePrice: 40, availableForRent: true, availableForSale: true, inStock: true },
  { _type: 'gear', name: 'First Aid Kit (Complete)', category: 'Safety', description: '50 piece kit, waterproof case, wilderness-rated', condition: 'New', rentalPricePerDay: 3, purchasePrice: 30, availableForRent: true, availableForSale: true, inStock: true },
  { _type: 'gear', name: 'Portable Power Bank (20,000mAh)', category: 'Safety', description: 'Charges phones, cameras, GPS devices', condition: 'Excellent', rentalPricePerDay: 4, purchasePrice: null, availableForRent: true, availableForSale: false, inStock: true },
];

async function seed() {
  console.log('Initiating Gear Migration to Sanity...');
  try {
    for (const item of gearItems) {
      if (item.purchasePrice === null) delete item.purchasePrice;
      console.log(`Pumping gear: ${item.name}`);
      await client.create(item);
    }
    console.log('Gear Database Migration Complete!');
  } catch (err) {
    console.error('Migration failed:', err.message);
  }
}

seed();
