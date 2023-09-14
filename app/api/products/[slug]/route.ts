import { NextResponse } from 'next/server';
import { groq } from 'next-sanity';
import { sanityClient } from '@/sanity';

export async function GET(request: Request, context: any) {
  const slug = context.params.slug;
  const query = groq`*[_type == "product" && slug.current == "${slug}"] {
    _id,
      ...
    }`;

  const product: IProduct = await sanityClient.fetch(query);

  return NextResponse.json(product);
}
