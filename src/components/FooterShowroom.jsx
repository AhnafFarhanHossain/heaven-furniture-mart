import { useTextReveal } from "../Helper/wordsAnimation";
import gsap from "../Helper/gsap-config";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

export default function FooterShowroom() {
  useTextReveal(".footer-desc", { scroll: true });

  return (
    <footer className="w-full bg-[#F4F1EA] pt-10 sm:pt-14 md:pt-16 pb-0 px-4 sm:px-6 md:px-8 xl:px-12 2xl:px-16 border-[#4A3B31]/15 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-8 lg:gap-4 xl:gap-8">
        <div className="w-full lg:w-60 xl:w-72 2xl:w-80 shrink-0 flex flex-col justify-between py-2 sm:py-4 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12 order-1 self-stretch">
          <a
            href="#"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo-black.webp"
              alt="Heaven Furniture Mart"
              className="w-36 sm:w-44 lg:w-52 h-auto object-contain"
            />
          </a>

          <div className="max-w-xs">
            <p
              className="font-serif footer-desc text-lg sm:text-xl lg:text-2xl text-[#242424] font-light leading-snug tracking-tight"
            >
              “We don’t mass produce. We craft furniture that fits your space
              and <span className="italic font-normal">personality</span>.”
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm lg:text-base text-[#808080] font-light tracking-tight">
              Copyright 2026 Heaven Furniture Mart
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-0 relative flex flex-col items-center justify-end order-3 lg:order-2 mt-4 sm:mt-6 lg:mt-0">
          <div className="relative w-full max-w-5xl 2xl:max-w-6xl flex flex-col items-center">
            <img
              src="/showroom-facade.webp"
              alt="Heaven Furniture Mart Showroom"
              className="w-full h-auto max-h-96 sm:max-h-[32.5rem] md:max-h-[41.25rem] lg:max-h-[48.75rem] 2xl:max-h-[53.125rem] object-contain object-bottom block"
            />
          </div>
        </div>

        <div className="w-full lg:w-60 xl:w-72 2xl:w-80 shrink-0 flex flex-col justify-center space-y-6 sm:space-y-8 lg:space-y-10 py-2 sm:py-4 lg:py-12 order-2 lg:order-3">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#242424] mb-1.5 sm:mb-2 tracking-tight">
              Contact
            </h4>
            <a
              href="mailto:heavenfurnituremart@gmail.com"
              className="block text-sm xl:text-base text-[#242424] font-light underline tracking-tight hover:opacity-75 transition-opacity truncate"
            >
              heavenfurnituremart@gmail.com
            </a>
            <a
              href="tel:+8801960481983"
              className="block text-sm xl:text-base text-[#242424] font-light underline tracking-tight mt-1 hover:opacity-75 transition-opacity"
            >
              +880 1960-481983
            </a>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#242424] mb-1.5 sm:mb-2 tracking-tight">
              Socials
            </h4>
            <div className="flex items-center gap-4 sm:gap-5 xl:gap-6 text-sm xl:text-base text-[#242424] font-light tracking-tight">
              <a href="#" className="hover:underline">
                Facebook
              </a>
              <a href="#" className="hover:underline">
                Instagram
              </a>
              <a href="#" className="hover:underline">
                YouTube
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#242424] mb-1.5 sm:mb-2 tracking-tight">
              Address
            </h4>
            <p className="text-sm xl:text-base text-[#242424] font-light max-w-60 leading-snug tracking-tight">
              Heaven Furniture Mart, Agrabad Access Road, Chattogram
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
