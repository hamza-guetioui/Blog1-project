import { defineArrayMember, defineField, defineType } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  groups: [
    {
      name: "social",
      title: "Social",
    },

  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
      description: 'Full name of the author.',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .email()
          .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please enter a valid email address.'
          ),
      description: 'Email address of the author.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
      description: 'The URL-friendly version of the author name.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: 'Author image for profile display.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        }),
      ],
      validation: (Rule) => Rule.required(),
      description: 'A short biography or description of the author.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      group: 'social', // Group the social links for better organization
      fields: [
        defineField({
          name: 'twitter',
          title: 'Twitter',
          type: 'string',
          validation: (Rule) =>
            Rule.regex(
              /^(https:\/\/twitter\.com\/)(\w{1,15})$/,
              'Please enter a valid Twitter URL.'
            ),
          description: 'Twitter profile link.',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'string',
          validation: (Rule) =>
            Rule.regex(
              /^(https:\/\/www\.facebook\.com\/)(\w{5,})$/,
              'Please enter a valid Facebook URL.'
            ),
          description: 'Facebook profile link.',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'string',
          validation: (Rule) =>
            Rule.regex(
              /^(https:\/\/www\.linkedin\.com\/in\/)([A-Za-z0-9_-]+)$/,
              'Please enter a valid LinkedIn URL.'
            ),
          description: 'LinkedIn profile link.',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'string',
          validation: (Rule) =>
            Rule.regex(
              /^(https:\/\/www\.instagram\.com\/)([A-Za-z0-9_-]{1,30})$/,
              'Please enter a valid Instagram URL.'
            ),
          description: 'Instagram profile link.',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'email', // Display email as subtitle
    },
  },
});
