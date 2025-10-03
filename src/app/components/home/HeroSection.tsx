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
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // 🔹 Setup Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 100, 260);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const clock = new THREE.Clock();
    const noise = new ImprovedNoise();

    // Particles grid
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

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // 🔹 GSAP animations (DOM only)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

      gsap.set(".reveal-line span", { y: "100%" });

      tl.to(".reveal-line span", {
        y: 0,
        delay: 1,
        duration: 2,
        ease: "power4.out",
        stagger: 0.15,
      });

      tl.from(".img-1", { x: -200, rotate: -15, opacity: 0, scale: 0.8 }, "-=1.2");
      tl.from(".img-2", { x: 200, rotate: 15, opacity: 0, scale: 0.8 }, "-=1.2");
      tl.from(".img-3", { y: 200, rotate: -10, opacity: 0, scale: 0.9 }, "-=1.2");
      tl.from(".img-4", { y: 200, rotate: 10, opacity: 0, scale: 0.9 }, "-=1.2");

      // Parallax immagini
      // document.querySelectorAll(".img").forEach((img, index) => {
      //   const direction = index % 2 === 0 ? 1 : -1;
      //   const distance = 60;
      //   gsap.fromTo(
      //     img,
      //     { y: -distance * direction },
      //     {
      //       y: distance * direction,
      //       ease: "power1.out",
      //       scrollTrigger: {
      //         trigger: heroRef.current,
      //         start: "top bottom",
      //         end: "bottom top",
      //         scrub: 1,
      //         anticipatePin: 1,
      //         invalidateOnRefresh: true,
      //       },
      //     }
      //   );
      // });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
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
