import { defineField, defineType } from "sanity";

export const dietaryRestriction = defineType({
  name: "dietary",
  title: "Dietary Restriction",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the dietary restriction (e.g., 'No Sugar', 'Nut-Free')."
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Automatically generates the slug from the 'name' field
      },
      description: "The URL-friendly version of the dietary restriction name, automatically generated."
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Provide a brief description explaining the dietary restriction (e.g., 'Avoids all forms of sugar')."
    }),
  ],
});
