import { defineField, defineType } from "sanity";

export const mealType = defineType({
  name: "mealType",
  title: "Meal Type",
  type: "document",
  fields: [
    // Meal Type Name
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
      description: "Enter the name of the meal type (e.g., 'Vegetarian', 'Vegan').",
    }),
    // Meal Type Slug
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Automatically generates the slug from the 'name' field
        maxLength: 100, // Limit the length of the slug
      },
      validation: (Rule) => Rule.required(),
      description: "The URL-friendly version of the meal type name, generated automatically.",
    }),
    // Meal Type Description
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
      description: "Provide a brief description of the meal type (e.g., 'A plant-based diet that excludes all animal products').",
    }),
    // Meal Type Image
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
      description: "Upload an image to represent the meal type (e.g., a picture of a vegan meal).",
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