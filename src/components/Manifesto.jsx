import React from 'react';

export default function Manifesto() {
  return (
    <section className="w-full bg-[#F4F1EA] py-28 md:py-36 2xl:py-44 px-6 md:px-8">
      <div className="w-full max-w-5xl mx-auto text-center">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[95%] tracking-tighter text-[#4A3B31] font-light mb-12 md:mb-16">
          Your <span className="font-serif italic font-normal">home</span> deserves more than off-the-shelf
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 max-w-2xl 2xl:max-w-3xl mx-auto text-left text-[#808080] font-light text-base tracking-tight leading-normal">
          <p>
            We don't make furniture for your home. We make it for the life you live in it.
          </p>
          <p>
            Sustainable, earth-friendly, and made for comfort. Furniture that lets you breathe. We redefine luxury.
          </p>
        </div>
      </div>
    </section>
  );
}



