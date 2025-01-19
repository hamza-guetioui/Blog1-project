import { defineField, defineType } from "sanity";

export const cuisine = defineType({
  name: "cuisine",
  title: "Cuisine",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(50)
          .regex(/^[A-Za-z0-9\s,.'-]*$/, "Only letters, numbers, spaces, commas, periods, hyphens, apostrophes, and colons are allowed."),
      description: "Enter the name of the cuisine (e.g., 'Italian', 'Indian').",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
      description: "A short title for the cuisine, used for display purposes (e.g., 'Traditional Italian Cuisine').",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Automatically generates the slug from the 'name' field
      },
      validation: (Rule) => Rule.required(),
      description: "The URL-friendly version of the cuisine name, automatically generated.",
    }),
    defineField({
      name: "region",
      title: "Region of Origin",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(3).max(100).regex(/^[A-Za-z0-9\s,.'-]*$/, "Only letters, numbers, spaces, commas, periods, hyphens, apostrophes, and colons are allowed."),
      description: "Specify the region or country where the cuisine originated (e.g., 'Southern Italy', 'North India').",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.max(300),
      description: "Provide a brief description of the cuisine (e.g., 'Italian cuisine is known for its pasta, pizza, and rich flavors').",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Allows cropping and focusing on specific parts of the image
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) =>
            Rule.required()
              .min(10)
              .max(100)
              .regex(
                /^[A-Za-z0-9\s,.'-:]*$/,
                "Only letters, numbers, spaces, commas, periods, hyphens, apostrophes, and colons are allowed."
              ),
          description: "Describe the image for accessibility purposes.",
        }),
      ],
      validation: (Rule) => Rule.required(),
      description: "Upload an image that represents the cuisine (e.g., a plate of traditional Italian pasta).",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "image",
    },
  },
});
