"use client";

import { motion } from "framer-motion";
import { urlFor } from "../lib/client";
import Image from "next/image";

interface Project {
  _id: string;
  title: string;
  description?: string;
  mainImage?: any;
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="gridContainer"
    >
      {projects.map((project) => (
        <div key={project._id} className="projectCard">
          {project.mainImage && (
            <div className="imageWrapper">
              <Image
                src={urlFor(project.mainImage).url()}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}

          <h2>{project.title}</h2>
          {project.description && <p>{project.description}</p>}
        </div>
      ))}
    </motion.div>
  );
}
