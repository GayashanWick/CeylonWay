export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string',
      options: { list: ['Off-Grid Travel', 'Wellness & Ayurveda', 'Wildlife & Nature', 'Cultural Sri Lanka', 'Gear & Equipment', 'Travel Tips'] }
    },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] },
    { name: 'excerpt', title: 'Excerpt', type: 'text', validation: Rule => Rule.max(160) },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'author', title: 'Author', type: 'reference', to: { type: 'author' } },
    { name: 'publishedDate', title: 'Published Date', type: 'date' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'featured', title: 'Featured Post', type: 'boolean', initialValue: false },
    { name: 'popular', title: 'Popular Post', type: 'boolean', initialValue: false },
    { name: 'readTime', title: 'Read Time (Minutes)', type: 'number' },
    { name: 'seoTitle', title: 'SEO Title Override', type: 'string' },
    { name: 'seoDescription', title: 'SEO Meta Description Override', type: 'string' }
  ]
};
