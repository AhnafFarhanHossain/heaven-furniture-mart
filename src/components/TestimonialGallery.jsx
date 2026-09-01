import React, { useState } from 'react';

const testimonials = [
  {
    quote: "“Their furniture literally changed the way our home looks, guests say that they feel like they are in a castle.”",
    author: "- One of our 4213+ happy customers",
  },
  {
    quote: "“The craftsmanship and attention to detail exceeded all our expectations. Our living space feels elevated and peaceful.”",
    author: "- One of our 4213+ happy customers",
  },
  {
    quote: "“Custom made to perfection. Truly timeless furniture that makes our house feel completely like home.”",
    author: "- One of our 4213+ happy customers",
  },
];

export default function TestimonialGallery() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  return (
    <section id="reviews" className="w-full relative text-white">
      <div className="w-full bg-[#4A3B31] mx-auto min-h-[560px] md:min-h-[640px] 2xl:min-h-[700px] py-16 md:py-24 2xl:py-32 px-6 md:px-12 relative flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col justify-between max-w-[473px] min-h-[360px] md:min-h-[400px]">
            <div className="space-y-4">
              <p className="font-serif font-light text-2xl sm:text-3xl leading-snug text-white tracking-tight">
                {testimonials[current].quote}
              </p>
              <p className="text-base font-light text-[#808080] tracking-tight">
                {testimonials[current].author}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-5 h-5 flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="w-5 h-5 flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div id="gallery" className="lg:col-span-7 relative w-full min-h-[360px] md:min-h-[460px] 2xl:min-h-[520px]">
            <div className="hidden md:block relative w-full h-70 2xl:h-150">
              <div className="absolute left-[0%] top-0 w-[46%] max-w-[600px] aspect-square overflow-hidden">
                <img
                  src="/gallery-living-room-1.webp"
                  alt="Curated interior styling 1"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute right-[2%] top-[60px] w-[44%] max-w-[600px] aspect-square overflow-hidden">
                <img
                  src="/gallery-living-room-2.webp"
                  alt="Curated interior styling 2"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-[-220px] sm:left-[5%] max-w-[700px] w-[65%] overflow-hidden z-20">
                <img
                  src="/gallery-living-room-3.webp"
                  alt="Curated interior styling 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <img src="/gallery-living-room-1.webp" alt="Curated interior styling 1" className="w-full h-[240px] object-cover" />
              <img src="/gallery-living-room-2.webp" alt="Curated interior styling 2" className="w-full h-[240px] object-cover" />
              <img src="/gallery-living-room-3.webp" alt="Curated interior styling 3" className="w-full h-[240px] object-cover sm:col-span-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



