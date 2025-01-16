import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [
    {
      name: "info",
      title: "Info",
    },
    {
      name: "content",
      title: "Content",
    },
    {
      name: "details",
      title: "Details",
    },
    {
      name: "visibility",
      title: "Visibility",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    // Recipe Name
    defineField({
      name: "name",
      type: "string",
      title: "Recipe Name",
      description: "The name of the recipe",
      validation: (Rule) =>
        Rule.required().regex(
          /^[A-Za-z][A-Za-z0-9\s,'&-:;]*$/,
          "Only letters, numbers, spaces, commas, hyphens, and apostrophes are allowed."
        ),
      group: "info",
    }),
    // Recipe Title
    defineField({
      name: "title",
      type: "string",
      title: "Recipe Title",
      description: "The title of the recipe (e.g., Moroccan Chicken Tagine).",
      validation: (Rule) =>
        Rule.required().regex(
          /^[A-Za-z][A-Za-z0-9\s,'&-:;]*$/,
          "Only letters, numbers, spaces, commas, hyphens, and apostrophes are allowed."
        ),
      group: "info",
    }),
    // Recipe Slug
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 100,
      },
      description: "Auto-generated from the name, but can be customized.",
      validation: (Rule) => Rule.required(),
      group: "info",
    }),
    // Recipe Description
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .regex(
            /^[A-Za-z0-9\s,.'-:()?!’]*$/,
            "Only letters, numbers, spaces, commas, periods, hyphens, apostrophes, and colons are allowed."
          ),
      group: "info",
    }),
    // Recipe Image
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description: "The image that will be displayed on the post page.",
      options: {
        hotspot: true, // Enables image cropping and focal point selection
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
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
      group: "info",
    }),
    // Recipe Category
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "category" },
      description: "Add a category to this post.",
      validation: (rule) => rule.required(),

      group: "info",
    }),
    // Recipe Tags
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "tag" } })],
      description: "Add tags to this post.",
      group: "info",
    }),

    // Recipe Content
    defineField({
      name: "content",
      type: "object",
      title: "Recipe Content",
      fields: [
        // Recipe Content Introduction
        defineField({
          name: "introduction",
          type: "array",
          title: "Introduction",
          of: [{ type: "block" }],
          validation: (Rule) => Rule.required(),
        }),
        // Recipe Content Image
        defineField({
          name: "image",
          type: "image",
          title: "Image Block",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              validation: (Rule) =>
                Rule.required()
                  .min(10)
                  .max(100)
                  .regex(
                    /^[A-Za-z0-9\s,.'-:]*$/,
                    "Only letters, numbers, spaces, commas, periods, hyphens, apostrophes, and colons are allowed."
                  ),
            }),
          ],
        }),
        // Recipe Ingredients
        defineField({
          name: "ingredients",
          type: "array",
          title: "Ingredients",
          description: "A list of ingredients used in the recipe.",
          of: [
            defineArrayMember({
              type: "object",
              title: "Ingredient",
              fields: [
                defineField({
                  name: "name",
                  type: "string",
                  title: "Ingredient Name",
                  validation: (rule) => rule.required().min(1).max(100),
                  description: "The name of the ingredient (e.g., 'Flour').",
                }),
                defineField({
                  name: "description",
                  type: "string",
                  title: "Ingredient Description",
                  description:
                    "An optional description or note for the ingredient.",
                  validation: (rule) => rule.max(200),
                }),
              ],
            }),
          ],
          validation: (rule) => rule.required().min(1), // Ensure at least one ingredient is added
        }),
        // Recipe Steps
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          description:
            "Detailed steps for preparing the recipe, with optional notes.",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  type: "string",
                  title: "Step Title",
                  description: "Title of the step",
                  validation: (Rule) =>
                    Rule.required().regex(
                      /^[A-Za-z][A-Za-z0-9\s,'-]*$/,
                      "Only letters, numbers, spaces, commas, hyphens, and apostrophes are allowed."
                    ),
                }),

                defineField({
                  name: "description",
                  title: "Step Description",
                  type: "array",
                  of: [{ type: "block" }],
                  validation: (rule) => rule.required(),
                  description: "The main instruction for this step.",
                }),
                // Recipe Step Note
                defineField({
                  name: "note",
                  title: "Step Note",
                  type: "string",
                  description:
                    "Optional additional information or tips for this step.",
                }),
              ],
            }),
          ],
          validation: (rule) => rule.required().min(1), // At least one step is required
        }),
        // Recipe Imortant Highlights
        defineField({
          name: "highlights",
          title: "Important Highlights",
          type: "array",
          description:
            "List of important information objects related to the recipe.",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required().min(3),
                }),
                defineField({
                  name: "details",
                  title: "Details",
                  type: "array",
                  description: "List of details for this highlight.",
                  of: [{ type: "string" }],
                  validation: (rule) => rule.required().min(1),
                }),
              ],
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
        // Recipe Nutrients 
        defineField({
          name: "nutrients",
          title: "Nutrients",
          type: "object",
          description: "List of nutrients details for the recipe.",
          fields: [
            defineField({
              name: "calories",
              title: "Calories (kcal)",
              type: "number",
              validation: (rule) => rule.required().min(0),
              description: "Total calories per serving in kilocalories (kcal).",
            }),
            defineField({
              name: "fat",
              title: "Fat (g)",
              type: "number",
              validation: (rule) => rule.required().min(0),
              description: "Amount of fat per serving in grams (g).",
            }),
            defineField({
              name: "carbohydrates",
              title: "Carbohydrates (g)",
              type: "number",
              validation: (rule) => rule.required().min(0),
              description: "Amount of carbohydrates per serving in grams (g).",
            }),
            defineField({
              name: "protein",
              title: "Protein (g)",
              type: "number",
              validation: (rule) => rule.required().min(0),
              description: "Amount of protein per serving in grams (g).",
            }),
            defineField({
              name: "sodium",
              title: "Sodium (mg)",
              type: "number",
              validation: (rule) => rule.required().min(0),
              description: "Amount of sodium per serving in milligrams (mg).",
            }),
          ],
          validation: (rule) => rule.required(),
        }),
        // Recipe FAQ Information
        defineField({
          name: "faq",
          title: "FAQ Information",
          type: "array",
          description:
            "Add frequently asked questions and their answers for the recipe.",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "string",
                  validation: (rule) => rule.required().min(5), // Minimum of 5 characters for the question
                }),
                defineField({
                  name: "answer",
                  title: "Answer",
                  type: "string",

                  validation: (rule) => rule.required().min(10), // Minimum of 10 characters for the answer
                }),
              ],
            }),
          ],
          validation: (rule) => rule.required().min(1), // At least one FAQ is required
        }),
      ],
      group: "content",
    }),

    // Recipe Details
    defineField({
      name: "details",
      title: "Recipe Details",
      type: "object",
      fields: [
        // Recipe Time
        defineField({
          name: "time",
          title: "Time",
          type: "object",
          description: "Total time needed, including preparation and cooking.",
          fields: [
            // Preparation Time
            defineField({
              name: "preparation",
              title: "Preparation Time",
              type: "object",
              description:
                "Time for prepping ingredients or steps (e.g., 15–20 minutes).",
              fields: [
                defineField({
                  name: "from",
                  title: "From",
                  type: "number",
                  validation: (rule) => rule.required().min(1),
                }),
                defineField({
                  name: "to",
                  title: "To",
                  type: "number",
                  validation: (rule) =>
                    rule.required().min(rule.valueOfField("from")),
                }),
              ],
            }),
            // Cooking Time
            defineField({
              name: "cooking",
              title: "Cooking Time",
              type: "object",
              description: "Time for cooking (e.g., 30–60 minutes).",
              fields: [
                defineField({
                  name: "from",
                  title: "From",
                  type: "number",
                  validation: (rule) => rule.required().min(1),
                }),
                defineField({
                  name: "to",
                  title: "To",
                  type: "number",
                  validation: (rule) =>
                    rule.required().min(rule.valueOfField("from")),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) =>
            Rule.required().error("Time details are required."),
        }),
        // Recipe Difficulty Level
        defineField({
          name: "difficulty",
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
          validation: (rule) => rule.required(),
        }),
        // Recipe Eat In
        defineField({
          name: "eatIn",
          title: "Eat In",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: [
              { title: "Breakfast", value: "breakfast" },
              { title: "Lunch", value: "lunch" },
              { title: "Dinner", value: "dinner" },
              { title: "Snack", value: "snack" },
            ],
            // layout: "tags", // Displays the options as tags for better UX
          },
          validation: (rule) => rule.required().min(1),
          description: "The meal times the recipe can be eaten at.",
        }),
        // Recipe Cuisine
        defineField({
          name: "cuisine",
          title: "Cuisine",
          type: "reference",
          to: { type: "cuisine" },
          description:
            "The type of cuisine the recipe belongs to, such as Italian, Indian, etc.",

          validation: (Rule) => Rule.required(),
        }),
        // Recipe Dietary Restrictions
        defineField({
          name: "diet",
          title: "Dietary Restrictions",
          type: "array",
          description:
            "Indicates any dietary restrictions the recipe may have.",
          of: [
            defineArrayMember({
              type: "reference",
              to: { type: "dietaryRestriction" },
            }),
          ],
        }),
        // Recipe MealType
        defineField({
          name: "type",
          title: "Meal Type",
          type: "array",
          description: "Select the meal type(s) this recipe is suitable for.",
          of: [
            defineArrayMember({
              type: "reference",
              to: { type: "mealType" },
            }),
          ],
          validation: (rule) => rule.min(1),
        }),
        // Recipe Tools
        defineField({
          name: "tools",
          title: "Tools",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: { type: "tool" },
            }),
          ],
          description: "Indicates any tools required to make the recipe.",
        }),
        // Recipe Servings Yield
        defineField({
          name: "yield",
          title: "Serving Yield",
          type: "object",
          description: "Indicates the number of servings this recipe yields.",
          fields: [
            defineField({
              name: "minimum",
              title: "Minimum",
              type: "number",
              initialValue: 1,
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "maximum",
              title: "Maximum",
              type: "number",
              validation: (rule) =>
                rule.required().min(rule.valueOfField("minimum")),
            }),
          ],
          validation: (rule) => rule.required(),
        }),
      ],
      group: "details",
    }),
    // Recipe isTrending
    defineField({
      name: "isTrending",
      title: "Is Trending",
      type: "boolean",
      initialValue: false,
      description:
        "Indicate if this post is currently trending. Set to true if the post is popular or receiving significant attention.",
      group: "visibility",
    }),
    // Recipe isSuggested
    defineField({
      name: "isSuggested",
      title: "Is Suggested",
      type: "boolean",
      initialValue: false,
      description:
        "Mark this post as suggested content. Use this to highlight posts that you want to recommend or promote.",
      group: "visibility",
    }),

    // Recipe Views
    defineField({
      name: "visits",
      type: "number",
      title: "Visits",
      description: "The number of views this post has received.",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
      group: "visibility",
    }),

    // Recipe Likes
    defineField({
      name: "likesCount",
      type: "number",
      title: "Likes",
      description: "The number of likes this post has received.",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
      group: "visibility",
    }),

    // Recipe Dislikes
    defineField({
      name: "dislikesCount",
      type: "number",
      title: "Dislikes",
      description: "The number of dislikes this post has received.",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
      group: "visibility",
    }),

    // Recipe Author
    defineField({
      name: "author",
      type: "string",
      title: "Author",
      initialValue: async (_, context) =>
        context?.currentUser?.name || "No Author",
      // to: [{ type: "author" }],
      validation: (rule) => rule.required(),
      description: "Select the author of this post.",
      group: "info",
    }),

    // SEO Section
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMetaFields",
      description:
        "SEO-related metadata for better visibility on search engines.",
      group: "seo",
    }),
  ],

  preview: {
    select: {
      title: "name",
      discription: "description", // Fetch author's name for display
      media: "image",
    },
    prepare(selection) {
      // const { author } = selection;
      const { title } = selection;
      return {
        ...selection,
        title: title || "Untitled Post",
        // subtitle: author ? `by ${author}` : "No author",
      };
    },
  },
});
