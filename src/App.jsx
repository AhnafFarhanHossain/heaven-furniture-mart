import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { LenisContext } from "./Helper/LenisContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import ProductGrid from "./components/ProductGrid";
import TestimonialGallery from "./components/TestimonialGallery";
import FaqContact from "./components/FaqContact";
import ProjectBanner from "./components/ProjectBanner";
import VisionTimeline from "./components/VisionTimeline";
import FooterShowroom from "./components/FooterShowroom";

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenisInstance;

    return () => {
      lenisInstance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      <div className="w-full min-h-screen main bg-[#F4F1EA] text-[#242424] font-sans">
        <Navbar />
        <main className="w-full">
          <Hero />
          <Manifesto />
          <ProductGrid />
          <TestimonialGallery />
          <FaqContact />
          <ProjectBanner />
          <VisionTimeline />
        </main>
        <FooterShowroom />
      </div>
    </LenisContext.Provider>
  );
}
