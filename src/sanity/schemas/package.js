export default {
  name: 'package',
  title: 'Tour Package',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string', 
      options: { 
        list: [
          { title: 'Off-Grid', value: 'off-grid' },
          { title: 'Wellness', value: 'wellness' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Wildlife', value: 'wildlife' },
          { title: 'Adventure', value: 'adventure' },
          { title: 'Beach / Coastal', value: 'beach-coastal' },
          { title: 'Day Trip', value: 'day-trip' }
        ] 
      } 
    },
    { name: 'duration', title: 'Duration (e.g. 3 Days / 2 Nights)', type: 'string' },
    { name: 'durationOptions', title: 'Alternative Durations', type: 'array', of: [{ type: 'string' }] },
    { name: 'groupSize', title: 'Group Size (Max guests)', type: 'number' },
    { name: 'difficulty', title: 'Difficulty', type: 'string', options: { list: ['Easy', 'Moderate', 'Challenging', 'Expert'] } },
    { name: 'languages', title: 'Languages', type: 'string' },
    { name: 'departsFrom', title: 'Departs From', type: 'string' },
    { name: 'priceFrom', title: 'Starting Price (LKR)', type: 'number' },
    { name: 'shortDescription', title: 'Short Description', type: 'text' },
    { name: 'fullDescription', title: 'Full Description', type: 'array', of: [{ type: 'block' }] },
    { name: 'highlights', title: 'Highlights', type: 'array', of: [{ type: 'string' }] },
    { name: 'inclusions', title: 'Inclusions', type: 'array', of: [{ type: 'string' }] },
    { name: 'exclusions', title: 'Exclusions', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'itinerary',
      title: 'Itinerary Days',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'dayNumber', title: 'Day Number', type: 'number' },
          { name: 'title', title: 'Day Title', type: 'string' },
          { name: 'description', title: 'Day Description', type: 'text' }
        ]
      }]
    },
    {
      name: 'addOns',
      title: 'Available Add-Ons',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Add-On Name', type: 'string' },
          { name: 'priceLKR', title: 'Price (LKR)', type: 'number' }
        ]
      }]
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    { name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }
  ]
};
