import { defineField, defineType } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the collection (e.g., 'Summer Collection', 'Winter Specials')."
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "A short title for the collection, used for display purposes (e.g., 'Exclusive Summer Edition')."
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Automatically generates the slug from the 'name' field
      },
      description: "The URL-friendly version of the collection name, generated automatically."
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief description of the collection (e.g., 'A limited-time collection of stylish summer wear')."
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
          title: "Alt",
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
      description: "Upload an image representing the collection (e.g., a banner image for the collection)."
    }),
  ],
});
