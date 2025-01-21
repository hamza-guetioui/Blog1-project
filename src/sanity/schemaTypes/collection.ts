import { defineField, defineType } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
         // Collection Name
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .min(3)
          .max(20)
          .regex(
            /^[A-Za-z\s'-]+$/,
            "Only letters, spaces, apostrophes, and hyphens are allowed."
          )
       
          ,
      description:
        "The name of the collection. This is the name that will be displayed on the website.",
    }),
    // Collection Title
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .min(5)
          .max(100)
          .regex(
            /^[A-Za-z0-9\s,'-]+$/,
            "Only letters, numbers, spaces, commas, apostrophes, and hyphens are allowed."
          ),
      description:
        "The title of the collection. It should be unique and descriptive.",
    }),
    // Colection Slug
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Automatically generates the slug from the 'name' field
        maxLength: 200, // Limit the length of the slug
      },
      validation: (rule) => rule.required(),
      description:
        "The slug is the URL-friendly version of the collection name. It should be unique and descriptive.",
    }),
    // Category Description
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) =>
        rule
          .required()
          .min(10)
          .max(500)
          .regex(
            /^[A-Za-z0-9\s,.'-:!?]+$/,
            "Only letters, numbers, spaces, commas, periods, hyphens, apostrophes, colons, exclamation marks, and question marks are allowed."
          ),
      description:
        "A brief description of the collection. It should be concise and informative.",
    }),
    // Category Image
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Allows the user to crop and focus on specific parts of the image
      },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
          validation: (rule) =>
            rule
              .required()
              .min(10)
              .max(100)
              .regex(
                /^[A-Za-z0-9\s,.'-:!?]+$/,
                "Only letters, numbers, spaces, commas, periods, hyphens, apostrophes, colons, exclamation marks, and question marks are allowed."
              ),
          description: "Describe the image for accessibility purposes.",
        }),
      ],
      description:
        "Upload an image representing the category (e.g., a picture of desserts for a 'Dessert' category).",
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
