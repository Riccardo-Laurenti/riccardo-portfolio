"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TagReelProps {
  items?: string[];
}

export default function TagReel({
  items = ["Strategy", "Design", "Development", "SEO", "Branding"],
}: TagReelProps) {
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLDivElement>(".cb-tagreel-row");

      rows.forEach((row, i) => {
        const duration = 15 * (i + 1); 

        gsap.to(row, {
          xPercent: -50, 
          ease: "none",
          duration,
          repeat: -1,
        });
      });
    }, reelRef);

    return () => ctx.revert();
  }, []);


  const doubledItems = [...items, ...items];

  return (
    <section className="cb-tagreel" ref={reelRef}>
      <div className="cb-tagreel-content">
        <div className="cb-tagreel-items" role="marquee">
          <div className="cb-tagreel-row">
            {doubledItems.map((text, i) => (
              <div className="cb-tagreel-item" key={i}>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
