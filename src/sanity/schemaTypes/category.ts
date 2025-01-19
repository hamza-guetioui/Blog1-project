import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  // icon: TiersIcon, // Uncomment if you want to add an icon
  fields: [
    // Parent Category
    defineField({
      name: "parentCategory",
      title: "Parent Category",
      type: "reference",
      to: { type: "category" },
      options: {
        filter: ({ document }) => {
          // Exclude the current category by its name (if available)
          if (document?.name) {
            return {
              filter: `name != $name`, // Filter out the current category by name
              params: { name: document.name }, // Pass the current document's name as a parameter
            };
          }
          return {}; // If no name is available, return no filter
        },
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          // If no parent is selected (i.e., top-level category), it's valid
          if (!value) return true;

          // Check if context.document is available and ensure the selected parent is not the same as the current category
          if (context.document && value._ref === context.document._id) {
            return "A category cannot be its own parent.";
          }

          return true; // If no issues, it's valid
        }),
      description: "Select a parent category to this category.",
    }),
    // Category Name
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .min(3)
          .max(50)
          .regex(
            /^[A-Za-z\s'-]+$/,
            "Only letters, spaces, apostrophes, and hyphens are allowed."
          )
          .custom(async (value, context) => {
            if (!value) return true; // Skip validation if the field is empty (handled by .required())

            const { document, getClient } = context;
            const client = getClient({ apiVersion: "2023-05-01" }); // Use the appropriate API version

            // Query to check if a category with the same name already exists
            const query = `*[_type == "category" && name == $name && !(_id in [$currentId])]`;
            const params = {
              name: value,
              currentId: document?._id || "", // Exclude the current document during updates
            };

            const result = await client.fetch(query, params);

            if (result.length > 0) {
              return `A category with the name "${value}" already exists. Please choose a unique name.`;
            }

            return true; // Name is unique
          }),
      description:
        "Enter the name of the category (e.g., 'Desserts', 'Main Course'). Must be unique and 3-50 characters long.",
    }),
    // Category Title
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
        "Enter a title for the category, used for display purposes (e.g., 'Sweet Treats'). Must be 5-100 characters long.",
    }),
    // Category Slug
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
        "The URL-friendly version of the category name, automatically generated.",
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
        "A brief description of the category (e.g., 'A collection of sweet treats for all ages'). Must be 10-500 characters long.",
    }),
    // Category Image
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

    // Category Popularity
    defineField({
      name: "popularity",
      title: "Popularity",
      type: "number",
      initialValue: 0,
      description: "Rate the popularity of the category on a scale of 0 to 10.",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .max(10)
          .error("Popularity must be between 1 and 10."),
    }),
    // Category Featured
    defineField({
      name: "isFeatured",
      title: "Is Featured",
      type: "boolean",
      initialValue: false,
      description: "Mark this category as featured (e.g., displayed prominently on the website).",
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