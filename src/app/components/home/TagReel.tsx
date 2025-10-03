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
      const distance = row.offsetWidth / 2; // metà della row, perché è duplicata
      const speed = 100; // pixel per secondo → regola qui

      gsap.to(row, {
        x: -distance,
        ease: "none",
        duration: distance / speed, // durata calcolata dinamicamente
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % -distance}px`, // loop perfetto
        },
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
