import React from 'react';

export default function FooterShowroom() {
  return (
    <footer className="w-full bg-[#F4F1EA] pt-10 sm:pt-14 md:pt-16 pb-0 px-4 sm:px-6 md:px-8 xl:px-12 2xl:px-16 border-[#4A3B31]/15 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-8 lg:gap-4 xl:gap-8">
        <div className="w-full lg:w-[240px] xl:w-[270px] 2xl:w-[300px] shrink-0 flex flex-col justify-between py-2 sm:py-4 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12 order-1 self-stretch">
          <a href="#" className="inline-block hover:opacity-80 transition-opacity">
            <img
              src="/logo-black.png"
              alt="Heaven Furniture Mart"
              className="w-[140px] sm:w-[180px] lg:w-[216px] h-auto object-contain"
            />
          </a>

          <div className="max-w-[280px] lg:max-w-[260px]">
            <p className="font-serif text-[18px] sm:text-[20px] lg:text-[24px] text-[#242424] font-light leading-[1.3] tracking-[-0.03em]">
              “We don’t mass produce. We craft furniture that fits your space and{' '}
              <span className="italic font-normal">personality</span>.”
            </p>
          </div>

          <div>
            <p className="text-[13px] sm:text-[14px] lg:text-[16px] text-[#808080] font-light tracking-[-0.04em]">
              Copyright 2026 Heaven Furniture Mart
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-0 relative flex flex-col items-center justify-end order-3 lg:order-2 mt-4 sm:mt-6 lg:mt-0">
          <div className="relative w-full max-w-[1059px] 2xl:max-w-[1180px] flex flex-col items-center">
            <img
              src="/showroom-facade.png"
              alt="Heaven Furniture Mart Showroom"
              className="w-full h-auto max-h-[380px] sm:max-h-[520px] md:max-h-[660px] lg:max-h-[780px] 2xl:max-h-[850px] object-contain object-bottom block"
            />
          </div>
        </div>

        <div className="w-full lg:w-[240px] xl:w-[270px] 2xl:w-[290px] shrink-0 flex flex-col justify-center space-y-6 sm:space-y-8 lg:space-y-10 py-2 sm:py-4 lg:py-12 order-2 lg:order-3">
          <div>
            <h4 className="text-[15px] sm:text-[16px] font-bold text-[#242424] mb-1.5 sm:mb-2 tracking-[-0.04em]">
              Contact
            </h4>
            <a
              href="mailto:heavenfurnituremart@gmail.com"
              className="block text-[14px] sm:text-[15px] xl:text-[16px] text-[#242424] font-light underline tracking-[-0.04em] hover:opacity-75 transition-opacity truncate"
            >
              heavenfurnituremart@gmail.com
            </a>
            <a
              href="tel:+8801960481983"
              className="block text-[14px] sm:text-[15px] xl:text-[16px] text-[#242424] font-light underline tracking-[-0.04em] mt-1 hover:opacity-75 transition-opacity"
            >
              +880 1960-481983
            </a>
          </div>

          <div>
            <h4 className="text-[15px] sm:text-[16px] font-bold text-[#242424] mb-1.5 sm:mb-2 tracking-[-0.04em]">
              Socials
            </h4>
            <div className="flex items-center gap-4 sm:gap-5 xl:gap-6 text-[14px] sm:text-[15px] xl:text-[16px] text-[#242424] font-light tracking-[-0.04em]">
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">Instagram</a>
              <a href="#" className="hover:underline">YouTube</a>
            </div>
          </div>

          <div>
            <h4 className="text-[15px] sm:text-[16px] font-bold text-[#242424] mb-1.5 sm:mb-2 tracking-[-0.04em]">
              Address
            </h4>
            <p className="text-[14px] sm:text-[15px] xl:text-[16px] text-[#242424] font-light max-w-[240px] leading-snug tracking-[-0.04em]">
              Heaven Furniture Mart, Agrabad Access Road, Chattogram
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}







