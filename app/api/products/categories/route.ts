import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`*[_type == "category"] {
_id,
  ...
}`;

export async function GET(request: Request) {
  const categories: ICategory[] = await sanityClient.fetch(query);
  return NextResponse.json(categories);
}
