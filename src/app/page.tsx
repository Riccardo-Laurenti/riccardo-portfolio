import { groq } from "next-sanity";
import { client } from "./lib/client";
import HomeClient from "./components/home/HomeClient";
import { fetchCards } from "./sanity/queries/fetchCards";

export const revalidate = 60;

const query = groq`*[_type == "project"]{
  _id,
  title,
  description,
  mainImage
}`;

export default async function HomePage() {
  const projects = await client.fetch(query);
  const cards = await fetchCards();

  return <HomeClient projects={projects} cards={cards} />;
}
