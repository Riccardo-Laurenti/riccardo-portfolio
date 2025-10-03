// src/sanity/schemas/card.ts
import { defineType } from "sanity";

export default defineType({
  name: "card",
  type: "document",
  title: "Card",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    },
  ],
});
