export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'publishedDate', title: 'Published Date', type: 'datetime' },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'author', title: 'Author', type: 'string' },
    { 
      name: 'body', 
      title: 'Body Text', 
      type: 'array', 
      of: [{ type: 'block' }, { type: 'image' }] 
    }
  ]
};
