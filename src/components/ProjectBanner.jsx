import React, { useState, useEffect } from 'react';

const bannerImages = [
  { id: 1, src: '/project-remontada-1.jpg', alt: 'Project Remontada 1' },
  { id: 2, src: '/project-remontada-2.jpg', alt: 'Project Remontada 2' },
  { id: 3, src: '/project-remontada-3.jpg', alt: 'Project Remontada 3' },
  { id: 4, src: '/project-remontada-4.jpg', alt: 'Project Remontada 4' },
];

export default function ProjectBanner() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full relative bg-[#242424] overflow-hidden">
      <div className="relative w-full h-[560px] sm:h-[700px] md:h-[860px] lg:h-[980px] xl:h-[1080px] 2xl:h-[1200px]">
        {bannerImages.map((img, idx) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              idx === currentIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        ))}

        <div className="absolute bottom-8 left-6 md:left-[8.5%] flex items-center gap-2 z-10">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIdx(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIdx ? 'bg-[#C9A882] scale-125' : 'bg-[#F4F1EA] hover:opacity-80'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-8 right-6 md:right-[8.5%] text-right z-10">
          <p className="text-[16px] font-medium text-[#C9A882] mb-1 tracking-[-0.04em]">
            Project Remontada
          </p>
          <h2 className="font-serif text-[36px] sm:text-[44px] md:text-[48px] text-[#F4F1EA] font-light leading-[95%] tracking-[-0.06em]">
            Luxury.{' '}
            <span className="italic font-medium text-[#F4F1EA]">Redefined</span>
          </h2>
        </div>
      </div>
    </section>
  );
}


