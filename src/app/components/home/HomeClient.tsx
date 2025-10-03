"use client";

import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import CardSlider from "./CardSlider";
import HorizontalSlider from "./HorizontalSlider";
import MediaText from "./MediaText";
import TagReel from "./TagReel";
import { Card } from "../../types/card";
import { Project } from "../../types/project";


export default function HomeClient({
  projects,
  cards,
}: {
  projects: Project[];
  cards: Card[];
}) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      style={{ padding: "2rem" }}
    >
      <HeroSection />
      <CardSlider cards={cards} />
      <HorizontalSlider projects={projects} />
      <MediaText />
      <TagReel />
    </motion.main>
  );
}
