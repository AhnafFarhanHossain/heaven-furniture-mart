import React from 'react';

export default function Hero() {
  return (
    <section className="w-full bg-[#F4F1EA] pt-12 pb-0">
      <div className="w-full px-6 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <h1 className="text-[42px] sm:text-[56px] md:text-[64px] lg:text-[72px] leading-[95%] tracking-[-0.04em] text-[#242424] font-light">
          Furniture that starts with{' '}
          <span className="font-serif italic font-normal text-[#4A3B31]">you</span>
        </h1>

        <div className="shrink-0 mb-1">
          <a
            href="#products"
            className="inline-flex items-center justify-between w-[243px] h-[32px] bg-[#4A3B31] text-[#FFFFFF] px-3.5 hover:bg-[#3d3027] transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full border border-[#F4F1EA]" />
              <svg className="w-3.5 h-2" fill="none" stroke="#F4F1EA" strokeWidth="1" viewBox="0 0 13 6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 3h11m-3-2l3 2-3 2" />
              </svg>
            </div>
            <span className="text-[16px] font-light tracking-[-0.04em] underline text-white">
              Our collection
            </span>
          </a>
        </div>
      </div>

      <div className="w-full p-6 md:p-8">
        <img
          src="/hero-furniture.png"
          alt="Living room furniture collection"
          className="w-full h-auto object-cover block"
        />
      </div>
    </section>
  );
}

