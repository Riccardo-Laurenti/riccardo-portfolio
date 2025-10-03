"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MediaText() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ Parallax immagini
      imgRefs.current.forEach((img, i) => {
        if (!img) return;

        gsap.fromTo(
          img,
          { y: i === 0 ? -80 : 80 },
          {
            y: i === 0 ? 80 : -80,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // ✅ Parallax + entrata testi (puoi lasciarli con le classi)
      gsap.fromTo(
        ".media-text h2",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".media-text p",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="media-text-section">
      <div className="media-wrapper">
        {/* BLOCCO IMMAGINI */}
        <div className="media-images">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="media-image-wrapper"
              ref={(el) => {
                imgRefs.current[i - 1] = el;
              }}
            >
              <Image
                src={`/img/work-${i}.webp`}
                alt={`Progetto creativo ${i}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="media-image"
              />
            </div>
          ))}
        </div>

        {/* BLOCCO TESTO */}
        <div className="media-text">
          <h2>Esperienze digitali uniche</h2>
          <p>
            Creiamo siti web performanti con design su misura, animazioni curate
            e interazioni fluide per dare vita alla tua identità digitale.
          </p>
          <p>
            Ogni dettaglio è studiato per generare emozione, autorevolezza e
            conversioni concrete.
          </p>
        </div>
      </div>
    </section>
  );
}
