import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import ProductGrid from './components/ProductGrid';
import TestimonialGallery from './components/TestimonialGallery';
import FaqContact from './components/FaqContact';
import ProjectBanner from './components/ProjectBanner';
import VisionTimeline from './components/VisionTimeline';
import FooterShowroom from './components/FooterShowroom';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F4F1EA] text-[#242424] font-sans">
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
  );
}
