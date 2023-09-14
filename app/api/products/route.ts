import { NextResponse } from 'next/server';
import { groq } from 'next-sanity';
import { sanityClient } from '@/sanity';

const query = groq`*[_type == "product"] {
  _id,
    ...
  } | order(_createdAt asc)`;

export async function GET(request: Request) {
  const products: IProduct[] = await sanityClient.fetch(query);
  return NextResponse.json(products);
}
