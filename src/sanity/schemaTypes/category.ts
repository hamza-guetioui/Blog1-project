import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  // icon: TiersIcon, // Uncomment if you want to add an icon
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the category (e.g., 'Desserts', 'Main Course')."
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Enter a title for the category, used for display purposes (e.g., 'Sweet Treats')."
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Automatically generates the slug from the 'name' field
      },
      description: "The URL-friendly version of the category name, automatically generated."
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief description of the category (e.g., 'A collection of sweet treats for all ages')."
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Allows the user to crop and focus on specific parts of the image
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
      description: "Upload an image representing the category (e.g., a picture of desserts for a 'Dessert' category)."
    }),
  ],
});
