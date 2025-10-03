import { groq } from "next-sanity";
import { client } from "../../lib/client";   

const query = groq`*[_type == "project"] | order(_createdAt asc) {
  _id,
  title,
  description,
  mainImage
}`;

export async function fetchProjects() {
  return await client.fetch(query);
}
