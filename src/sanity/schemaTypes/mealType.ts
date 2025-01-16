import { defineField, defineType } from "sanity";

export const mealType = defineType({
  name: "mealType",
  title: "Meal Type",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the meal type (e.g., 'Vegetarian', 'Vegan')."
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Automatically generates the slug from the 'name' field
      },
      description: "The URL-friendly version of the meal type name, generated automatically."
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Provide a brief description of the meal type (e.g., 'A plant-based diet that excludes all animal products')."
    }),
  ],
});
