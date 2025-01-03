import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(5).max(100),
      description: "Enter a descriptive and unique title for the post.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      description: "Auto-generated from the title, but can be customized.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.max(200),
      description: "Short description of the post (max 200 characters).",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      // fields: [
      //   defineField({
      //     name: "alt",
      //     title: "Alternative Text",
      //     type: "string",
      //     validation: (rule) => rule.required().min(5).max(100),
      //     description: "Describe the image for accessibility purposes.",
      //   }),
      // ],
    }),
    defineField({
      name: "author",
      type: "string",
      title: "Author",
      initialValue: async (_, context) => context?.currentUser?.name || "null user",
      // to: [{ type: "author" }],
      validation: (rule) => rule.required(),
      description: "Select the author of this post.",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
      validation: (rule) => rule.min(1),
      description: "Choose at least one category for this post.",
    }),
    defineField({
      name: "collections",
      title: "Collections",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: { type: "collection" } }),
      ],
      description: "Optional: Add this post to one or more collections.",
    }),
    defineField({
      name: "tranding",
      title: "Is Trending",
      type: "boolean",
      initialValue: false,
      description: "Mark this post as trending.",
    }),
    defineField({
      name: "suggesting",
      title: "Is Suggesting",
      type: "boolean",
      initialValue: false,
      description: "Mark this post as suggested content.",
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "blockContent",
      validation: (rule) => rule.required(),
      description: "Main content of the post.",
      options: {
        spellCheck: true,
      },
    }),
    defineField({
      name: "recipeDetails",
      title: "Recipe Details",
      type: "object",
      fields: [
        defineField({
          name: "preparationTime",
          title: "Preparation Time",
          type: "string",
          description: "The time needed to prepare the recipe ingredients.",
          validation: (rule) =>
            rule.required().error("Preparation time is required."),
        }),
        defineField({
          name: "cookingTime",
          title: "Cooking Time",
          type: "string",
          description: "The time needed to cook the recipe.",
          validation: (rule) =>
            rule.required().error("Cooking time is required."),
        }),
        defineField({
          name: "difficultyLevel",
          title: "Difficulty Level",
          type: "string",
          description: "Indicates how difficult the recipe is to make.",
          options: {
            list: [
              { title: "Easy", value: "easy" },
              { title: "Medium", value: "medium" },
              { title: "Hard", value: "hard" },
            ],
          },
          validation: (rule) =>
            rule.required().error("Difficulty level must be selected."),
        }),
        defineField({
          name: "servingYield",
          title: "Serving Yield",
          type: "string",
          description: "The number of servings this recipe provides.",
          validation: (rule) =>
            rule.required().error("Serving yield is required."),
        }),
        defineField({
          name: "dietaryRestrictions",
          title: "Dietary Restrictions",
          type: "string",
          description: "Specifies any dietary restrictions or preferences.",
          options: {
            list: [
              { title: "Vegetarian", value: "vegetarian" },
              { title: "Vegan", value: "vegan" },
              { title: "Gluten Free", value: "glutenFree" },
              { title: "Dairy Free", value: "dairyFree" },
              { title: "Nut Free", value: "nutFree" },
              { title: "Paleo", value: "paleo" },
            ],
          },
        }),
        defineField({
          name: "ingredients",
          title: "Ingredients",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "notes",
          title: "Notes",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "tools",
          title: "Tools",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "allergyInformation",
          title: "Allergy Information",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "info",
              title: "Information List",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        }),
        defineField({
          name: "nutritionInformation",
          title: "Nutrition Information",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "info",
              title: "Information List",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name", // Fetch author's name for display
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return {
        ...selection,
        subtitle: author ? `by ${author}` : "No author",
      };
    },
  },
});
