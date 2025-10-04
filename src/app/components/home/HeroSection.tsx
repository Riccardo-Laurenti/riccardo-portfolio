"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      gsap.set(".reveal-line span", { y: "100%" });

      tl.to(".reveal-line span", {
        y: 0,
        delay: 0.8,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.15,
      });

      tl.from(".img-1", { x: -200, rotate: -15, opacity: 0, scale: 0.8 }, "-=1.2");
      tl.from(".img-2", { x: 200, rotate: 15, opacity: 0, scale: 0.8 }, "-=1.2");
      tl.from(".img-3", { y: 200, rotate: -10, opacity: 0, scale: 0.9 }, "-=1.2");
      tl.from(".img-4", { y: 200, rotate: 10, opacity: 0, scale: 0.9 }, "-=1.2");


      // const parallaxImgs = document.querySelectorAll(".img");

      // parallaxImgs.forEach((img, index) => {
      //   img.classList.add("gsap-visible");
      //   const direction = index % 2 === 0 ? 1 : -1;
      //   const distance = 60;
      //   gsap.fromTo(
      //     img,
      //     { y: -distance * direction },
      //     {
      //       y: distance * direction,
      //       ease: "none",
      //       scrollTrigger: {
      //         trigger: heroRef.current,
      //         start: "top bottom",
      //         end: "bottom top",
      //         scrub: true,
      //       },
      //     }
      //   );
      // });
      const parallaxImgs = gsap.utils.toArray<HTMLElement>(".img");

      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
      .fromTo(
        parallaxImgs,
        {
          y: (i) => (i % 2 === 0 ? -60 : 60), 
        },
        {
          y: (i) => (i % 2 === 0 ? 60 : -60),
          ease: "none",
        },
        0 
      );


      ScrollTrigger.refresh();
    }, heroRef);



    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / document.documentElement.clientHeight, // 👈 più stabile su mobile
      1,
      1000
    );
    camera.position.set(0, 100, 260);
    camera.lookAt(0, 0, 0); // 👈 chiamato una sola volta

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      antialias: true,
      alpha: true,
    });

    const width = window.innerWidth;
    const height = document.documentElement.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // 👈 meno aggressivo

    const clock = new THREE.Clock();
    const noise = new ImprovedNoise();

    const gridSize = 350;
    const separation = 5;
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (let x = -gridSize / 2; x < gridSize / 2; x += separation) {
      for (let z = -gridSize / 2; z < gridSize / 2; z += separation) {
        positions.push(x, 0, z);
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

    const circleTexture = new THREE.TextureLoader().load(
      "https://threejs.org/examples/textures/sprites/disc.png"
    );

    const material = new THREE.PointsMaterial({
      size: 1,
      map: circleTexture,
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
      alphaTest: 0.5,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

  const onWindowResize = () => {
  if (window.innerWidth > 768) { 
    const newWidth = window.innerWidth;
    const newHeight = document.documentElement.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }
};

    window.addEventListener("resize", onWindowResize);

    const animate = () => {
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime() * 0.35;
      const pos = particles.geometry.attributes.position.array as Float32Array;

      let i = 0;
      for (let x = -gridSize / 2; x < gridSize / 2; x += separation) {
        for (let z = -gridSize / 2; z < gridSize / 2; z += separation) {
          const n = noise.noise(x * 0.02, z * 0.02, time * 0.4) * 18;

          pos[i + 1] =
            Math.sin(x * 0.17 + time * 0.73) * 12 +
            Math.cos(z * 0.21 + time * 1.19) * 10 +
            Math.sin((x + z) * 0.05 + time * 0.47) * 5 +
            n;

          i += 3;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera); // 👈 tolto camera.lookAt ad ogni frame
    };

    animate();

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onWindowResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };

  }, []);

  return (
    <section
      ref={heroRef}
      className="hero"
      style={{ height: "100vh" }}
    >

      <canvas id="hero-canvas" ref={canvasRef} />

      <div className="container">
          <div className="img img-1">
            <div className="img-inner">
              <Image
                src="/img/1.webp"
                alt="img1"
                fill
                priority
                sizes="(max-width: 768px) 120px, 150px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>


          <div className="img img-2">
            <div className="img-inner">
              <Image
                src="/img/2.webp"
                alt="img2"
                fill
                priority
                sizes="(max-width: 768px) 120px, 150px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>


          <div className="img img-3">
            <div className="img-inner">
              <Image
                src="/img/3.webp"
                alt="img3"
                fill
                priority={false}
                sizes="(max-width: 768px) 90px, 150px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>


          <div className="img img-4">
            <div className="img-inner">
              <Image
                src="/img/4.webp"
                alt="img4"
                fill
                priority={false}
                sizes="(max-width: 768px) 90px, 150px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <h1 className="hero-title">
              <div className="reveal-line"><span>CREATIVE DEVELOPER</span></div>
              <div className="reveal-line"><span>AND DESIGNER</span></div>
          </h1>
      </div>
    </section>
  );
}
