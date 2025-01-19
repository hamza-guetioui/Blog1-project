import { defineField, defineType } from "sanity";

export const tool = defineType({
  name: "tool",
  title: "Tool",
  type: "document",
  fields: [
    // Tool Name
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the tool (e.g., 'Vegan Recipe Finder', 'Recipe Generator').",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(100)
          .regex(
            /^[A-Za-z0-9\s,.'-:]*$/,
            "Only letters, numbers, spaces, commas, periods, hyphens, apostrophes, and colons are allowed."
          ),
    }),
    // Tool URL
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      description: "Enter the URL of the tool (e.g., 'https://www.veganrecipe.com').",
      validation: (Rule) =>
        Rule.required()
          .regex(
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]+)*\/?$/,
            "Enter a valid URL (e.g., 'https://www.example.com')."
          ),
    }),
    // Tool Image
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
      description: "Upload an image to represent the tool (e.g., logo or relevant icon).",
    }),
    // Tool Description
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Provide a brief description of the tool (e.g., 'This tool helps you find vegan recipes based on your preferences').",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(300)
          .regex(
            /^[A-Za-z0-9\s,.'-:!?]*$/,
            "Only letters, numbers, spaces, commas, periods, hyphens, apostrophes, colons, exclamation marks, and question marks are allowed."
          ),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});