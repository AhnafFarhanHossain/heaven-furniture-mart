import React from 'react';
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
