export default {
  name: 'gear',
  title: 'Rental Gear',
  type: 'document',
  fields: [
    { name: 'name', title: 'Product Name', type: 'string' },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string',
      options: { list: ['Camping', 'Water & Snorkelling', 'Photography', 'Hiking', 'Safety'] }
    },
    { name: 'description', title: 'Short Description', type: 'text' },
    { 
      name: 'condition', 
      title: 'Condition', 
      type: 'string',
      options: { list: ['New', 'Excellent', 'Good'] }
    },
    { name: 'rentalPricePerDay', title: 'Rental Price / Day (USD)', type: 'number' },
    { name: 'purchasePrice', title: 'Purchase Price (USD) [Optional]', type: 'number' },
    { 
      name: 'images', 
      title: 'Product Images', 
      type: 'array', 
      of: [{ type: 'image', options: { hotspot: true } }] 
    },
    { name: 'availableForRent', title: 'Available For Rent', type: 'boolean', initialValue: true },
    { name: 'availableForSale', title: 'Available For Sale', type: 'boolean', initialValue: false },
    { name: 'inStock', title: 'In Stock', type: 'boolean', initialValue: true }
  ]
};
