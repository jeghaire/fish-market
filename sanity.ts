import { SanityClient, createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-23',
  useCdn: process.env.NODE_ENV === 'production'
};

export const sanityClient: SanityClient = createClient(config);

export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(sanityClient).image(source);
