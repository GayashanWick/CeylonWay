import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'wfpfm41u',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

// A dummy portable text body incorporating headers (h2) for Table of Contents, blockquotes, and normal text.
const dummyBody = [
  { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'This is an amazing journey into the heart of Ceylon. When exploring these unseen trails, preparation is absolutely essential.' }] },
  { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Why You Must Visit' }] },
  { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The ecosystem here is unlike anything else found on the Asian continent. The sheer density of endemic species makes it a globally recognized hotspot.' }] },
  { _type: 'block', style: 'blockquote', children: [{ _type: 'span', text: '“I have never seen a forest so profoundly silent, yet so teeming with invisible life.”' }] },
  { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Essential Preparation Steps' }] },
  { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Before you pack your bags, ensure you have secured the appropriate permits and secured local guidance. Navigating offline can be dangerous.' }] }
];

async function seed() {
  console.log('Initiating Journal Migration to Sanity...');
  try {
    // 1. Create Author
    console.log('Creating Author: Gayashan...');
    const authorRes = await client.create({
      _type: 'author',
      name: 'Gayashan — Founder, Ceylon Way',
      bio: 'Born and raised in Sri Lanka, with 10 years exploring its most remote corners.',
      isLocalGuide: true
    });
    console.log(`Author Created with ID: ${authorRes._id}`);

    const baseRef = { _type: 'reference', _ref: authorRes._id };

    // 2. Create Posts
    const posts = [
      {
        _type: 'post',
        title: "The Complete Trekker's Guide to Sinharaja Rainforest",
        slug: { _type: 'slug', current: 'the-complete-trekkers-guide-to-sinharaja-rainforest' },
        category: 'Off-Grid Travel',
        featured: true,
        popular: false,
        tags: ['sinharaja', 'trekking', 'rainforest', 'off-grid'],
        excerpt: "Sri Lanka's last viable rainforest is one of Asia's great untouched wildernesses. Here's everything you need to know before you go.",
        author: baseRef,
        publishedDate: '2026-04-20',
        readTime: 12,
        body: dummyBody
      },
      {
        _type: 'post',
        title: "What to Expect on Your First Ayurvedic Retreat",
        slug: { _type: 'slug', current: 'what-to-expect-on-your-first-ayurvedic-retreat' },
        category: 'Wellness & Ayurveda',
        featured: false,
        popular: true,
        tags: ['ayurveda', 'wellness', 'retreat', 'healing'],
        excerpt: "First-timers are often surprised by how different a genuine Ayurvedic experience feels from a typical spa day. We break it down honestly.",
        author: baseRef,
        publishedDate: '2026-04-18',
        readTime: 8,
        body: dummyBody
      },
      {
        _type: 'post',
        title: "Knuckles Range — The Hike That Changes Everything",
        slug: { _type: 'slug', current: 'knuckles-range-the-hike-that-changes-everything' },
        category: 'Off-Grid Travel',
        featured: false,
        popular: false,
        tags: ['knuckles', 'hiking', 'mountains', 'camping'],
        excerpt: "The Knuckles Range is Sri Lanka's best kept secret. Misty peaks, abandoned villages, and trails that see fewer than 50 visitors a week.",
        author: baseRef,
        publishedDate: '2026-04-10',
        readTime: 15,
        body: dummyBody
      },
      {
        _type: 'post',
        title: "Forest Bathing in Sri Lanka — A Beginner's Guide",
        slug: { _type: 'slug', current: 'forest-bathing-in-sri-lanka-a-beginners-guide' },
        category: 'Wellness & Ayurveda',
        featured: false,
        popular: false,
        tags: ['forest bathing', 'shinrin-yoku', 'wellness', 'nature'],
        excerpt: "Shinrin-yoku — the Japanese practice of forest bathing — finds its perfect home in Sri Lanka's ancient rainforests. Here's how to start.",
        author: baseRef,
        publishedDate: '2026-03-25',
        readTime: 5,
        body: dummyBody
      },
      {
        _type: 'post',
        title: "The Essential Camping Gear Checklist for Sri Lanka",
        slug: { _type: 'slug', current: 'the-essential-camping-gear-checklist-for-sri-lanka' },
        category: 'Gear & Equipment',
        featured: false,
        popular: true,
        tags: ['camping', 'gear', 'checklist', 'hiking'],
        excerpt: "Packing for a Sri Lanka camping trip is different from Europe or Australia. Humidity, heat, and wildlife change everything. Our definitive list.",
        author: baseRef,
        publishedDate: '2026-03-12',
        readTime: 7,
        body: dummyBody
      },
      {
        _type: 'post',
        title: "5 Wildlife Encounters Only Possible Off The Beaten Track",
        slug: { _type: 'slug', current: '5-wildlife-encounters-only-possible-off-the-beaten-track' },
        category: 'Wildlife & Nature',
        featured: false,
        popular: false,
        tags: ['wildlife', 'leopard', 'elephant', 'birding', 'off-grid'],
        excerpt: "The animals most visitors never see aren't hiding — they're just off the road that every tour bus takes. Here's where to find them.",
        author: baseRef,
        publishedDate: '2026-02-28',
        readTime: 9,
        body: dummyBody
      }
    ];

    for (const post of posts) {
      console.log(`Pumping post: ${post.title}`);
      await client.create(post);
    }
    
    console.log('Journal Database Migration Complete!');
  } catch (err) {
    console.error('Migration failed:', err.message);
  }
}

seed();
