import { defineField, defineType } from "sanity";

export const tag = defineType({
  name: "tag",
  title: "Tag",
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
      description: "Enter the name of the tag (e.g., 'Vegan', 'Gluten-Free').",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Automatically generates the slug from the 'name' field
      },
      validation: (Rule) => Rule.required(),
      description: "The URL-friendly version of the tag name, generated automatically.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().min(10).max(300),
      description: "Provide a brief description of the tag (e.g., 'This tag identifies vegan-friendly recipes').",
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
      description: "Upload an image to represent the tag (e.g., an icon or relevant image).",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "image",
    },
  },
});