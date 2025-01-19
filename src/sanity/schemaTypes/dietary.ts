import { defineField, defineType } from "sanity";

export const dietary = defineType({
  name: "dietary",
  title: "Dietary Restriction",
  type: "document",
  fields: [
    // Dietary Restriction Name
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(50)
          .regex(
            /^[A-Za-z0-9\s,.'-]*$/,
            "Only letters, numbers, spaces, commas, periods, hyphens, apostrophes, and colons are allowed."
          ),
      description: "Enter the name of the dietary restriction (e.g., 'No Sugar', 'Nut-Free').",
    }),
    // Dietary Restriction Slug
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Automatically generates the slug from the 'name' field
        maxLength: 100, // Limit the length of the slug
      },
      validation: (Rule) => Rule.required(),
      description: "The URL-friendly version of the dietary restriction name, automatically generated.",
    }),
    // Dietary Restriction Description
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(300)
          .regex(
            /^[A-Za-z0-9\s,.'-:!?]*$/,
            "Only letters, numbers, spaces, commas, periods, hyphens, apostrophes, colons, exclamation marks, and question marks are allowed."
          ),
      description: "Provide a brief description explaining the dietary restriction (e.g., 'Avoids all forms of sugar').",
    }),
    // Dietary Restriction Image
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
      description: "Upload an image to represent the dietary restriction (e.g., a no-sugar icon).",
    }),

    // Dietary Restriction Severity
    defineField({
      name: "severity",
      title: "Severity",
      type: "string",
      options: {
        list: [
          { title: "Low", value: "low" },
          { title: "Medium", value: "medium" },
          { title: "High", value: "high" },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: "Indicate the severity of the dietary restriction (e.g., 'High' for life-threatening allergies).",
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