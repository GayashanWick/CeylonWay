export default {
  name: 'package',
  title: 'Tour Package',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string', 
      options: { 
        list: [
          'Wildlife Expedition', 
          'Wellness Retreat', 
          'Cultural Immersion', 
          'Off-Grid Adventure'
        ] 
      } 
    },
    { name: 'duration', title: 'Duration (e.g. 7 Days / 6 Nights)', type: 'string' },
    { name: 'groupSize', title: 'Group Size (e.g. 2 - 8 People)', type: 'string' },
    { name: 'priceFrom', title: 'Starting Price (LKR)', type: 'number' },
    { name: 'shortDescription', title: 'Short Description', type: 'text' },
    { name: 'fullDescription', title: 'Full Description', type: 'array', of: [{ type: 'block' }] },
    { name: 'highlights', title: 'Highlights', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'itinerary',
      title: 'Itinerary Days',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'day', title: 'Day Label (e.g. Day 1: Arrival)', type: 'string' },
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
          { name: 'price', title: 'Add-On Price', type: 'number' }
        ]
      }]
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    }
  ]
};
