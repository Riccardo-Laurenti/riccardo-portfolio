import { groq } from "next-sanity";
import { client } from "../../lib/client";   

const query = groq`*[_type == "card"] | order(_createdAt asc) {
  _id,
  title,
  description,
  mainImage
}`;

export async function fetchCards() {
  return await client.fetch(query);
}
