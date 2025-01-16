import { defineField, defineType } from "sanity";

export const tool = defineType({
  name: "tool",
  title: "Tool",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the tag (e.g., 'Vegan', 'Gluten-Free').",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URl",
      type: "string",
      description: "Enter the URL of the tool (e.g., 'https://www.veganrecipe.com')."

    }),
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
      description: "Upload an image to represent the tag (e.g., an icon or relevant image)."
    }),
  ],
});
