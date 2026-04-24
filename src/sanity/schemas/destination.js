export default {
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } },
    { name: 'regionName', title: 'Region Name', type: 'string' },
    { name: 'orderNumber', title: 'Order Number', type: 'number', description: 'Controls display order on page' },
    { name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'highlights', title: 'Highlights', type: 'array', of: [{ type: 'string' }] },
    { name: 'bestTimeToVisit', title: 'Best Time To Visit', type: 'string' },
    { name: 'difficultyLevel', title: 'Difficulty Level (1-3)', type: 'number', validation: Rule => Rule.min(1).max(3) },
    { name: 'relatedPackages', title: 'Related Packages', type: 'array', of: [{ type: 'reference', to: { type: 'package' } }] },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }
  ]
};
