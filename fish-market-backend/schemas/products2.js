export default {
  name: 'product2',
  title: 'Product2',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'size',
      title: 'Size',
      type: 'object',
      fields: [
        {
          name: 'width',
          title: 'Width',
          type: 'number',
        },
        {
          name: 'height',
          title: 'Height',
          type: 'number',
        },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'original_price',
      title: 'Original Price',
      type: 'number',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },
  ],
};
