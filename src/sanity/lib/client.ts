// import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

import SanityClient from 'next-sanity-client';

export const client = new SanityClient({
    projectId,
     dataset,
    apiVersion,
     useCdn: true, // Set to true to use the CDN for faster queries (can be false for fresh data)
});

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: true, // Set to true to use the CDN for faster queries (can be false for fresh data)
// })


