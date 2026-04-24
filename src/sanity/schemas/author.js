export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Short Bio', type: 'text' },
    { name: 'isLocalGuide', title: 'Is Local Guide?', type: 'boolean', initialValue: false }
  ]
};
