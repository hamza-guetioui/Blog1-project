import { defineField, defineType } from 'sanity';

export const user = defineType({
  name: 'user',
  title: 'User',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The full name of the user.',
      validation: (Rule) => Rule.required().min(3).max(100)
      .regex(
        /^[A-Za-z][A-Za-z0-9\s,'-]*$/,
        "Please enter a valid name. (e.g. John Doe)"
      ),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'The user’s email address (used for authentication).',
      validation: (Rule) => 
        Rule.required()
          .email() 
          .max(255), // Max length for email
    }),
    defineField({
      name: 'profile',
      title: 'Profile',
      type: 'image',
      options: {
        hotspot: true, // Allows cropping and focusing on parts of the image
      },
      description: 'The user’s profile image (optional).',
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      description: 'The user’s password (hashed in the backend).',
      validation: (Rule) => 
        Rule.required()
          .min(8)
          .max(128)
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
});
