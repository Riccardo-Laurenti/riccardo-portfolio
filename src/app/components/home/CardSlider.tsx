"use client";

import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { urlFor } from "../../lib/client";
import { Card } from "../../types/card";


export default function CardSlider({ cards }: { cards: Card[] }) {
  if (!cards || cards.length === 0) {
    return <p>Nessuna card trovata.</p>;
  }

  return (
    <section className="card-slid">
      <Splide
        options={{
          start:0,
          type: "loop",
          perPage: 3,
          gap: "2rem",
          pagination: false,
          arrows: true,
          autoplay: false,
          interval: 3000,
          breakpoints: {
            1024: { perPage: 2 },
            768: { perPage: 1 },
          },
        }}
        aria-label=""
      >
       {cards.map((card) => (
        <SplideSlide key={card._id}>
          <div className="card">
            {card.image && (
              <div className="card-image-wrapper">
                <Image
                  src={urlFor(card.image).width(600).format("webp").url()}
                  alt={card.title}
                  width={600}
                  height={400}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <h3>{card.title}</h3>
            {card.description && <p>{card.description}</p>}
          </div>
        </SplideSlide>
        ))}

      </Splide>
    </section>
  );
}
