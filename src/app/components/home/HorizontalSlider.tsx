"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { urlFor } from "../../lib/client"; 
import { Project } from "../../types/project";


gsap.registerPlugin(ScrollTrigger);



export default function HorizontalSlider({ projects }: { projects: Project[] }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    if (!sliderRef.current) return;

    const totalWidth = sliderRef.current.scrollWidth - window.innerWidth;

    gsap.to(sliderRef.current, {
      x: -totalWidth,
      ease: "none", // 👈 nessun easing, sync perfetto con lo scroll
      scrollTrigger: {
        trigger: sliderRef.current,
        pin: mainRef.current,
        scrub: 0.3, 
        anticipatePin: 1,
        end: () => "+=" + totalWidth,
        invalidateOnRefresh: true,
      },
    });
  }, mainRef);

  return () => ctx.revert();
}, []);


  return (
    <div ref={mainRef}>
      <div className="horizontal-sliders" ref={sliderRef}>
        {projects.map((project) => (
          <div className="slide" key={project._id}>
            {project.mainImage && (
              <Image
                src={urlFor(project.mainImage).url()}
                alt={project.title}
                fill
                sizes="100vw"
                className="portfolio-image"
                quality={80}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
