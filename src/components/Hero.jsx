import { HeroAnimation } from "../GSAP/HeroAnimation";
import CollectionCta from "./CtaButton";

export default function Hero() {
  return (
    <HeroAnimation>
      <section className="w-full bg-[#F4F1EA] pt-4 sm:pt-6 md:pt-8 pb-[clamp(2.5rem,6vw,5rem)]">
        <div className="w-full mx-auto px-6 sm:px-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-7 items-stretch">
            {/* Left Column (5 cols): Title + Dining Setting Image */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div className="pt-1 md:pt-2">
                <h1 className="font-sans hero-title font-light text-[clamp(3.15rem,7.4vw,7.6rem)] leading-[0.93] tracking-[-0.07em] text-[#242424]">
                  Furniture
                  <br />
                  that starts
                  <br />
                  with{" "}
                  <span className="font-serif italic font-light text-[#4A3B31]">
                    you
                  </span>
                </h1>
              </div>

              <div className="w-full mt-6 sm:mt-8 md:mt-10 overflow-hidden">
                <img
                  src="/project-remontada-4.webp"
                  alt="Handcrafted bespoke dining table and chairs setting"
                  className="w-full h-auto aspect-[540/464] hero-img-1 object-cover block shadow-sm"
                  loading="eager"
                />
              </div>
            </div>

            {/* Right Column (7 cols): Collection Button + Emerald Velvet Bed Image */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div className="flex justify-end pt-1 md:pt-3 mb-4 overflow-hidden sm:mb-6 md:mb-8">
                <CollectionCta className="hero-cta" />
              </div>

              <div className="w-full flex-1 overflow-hidden">
                <img
                  src="/hero-furniture.webp"
                  alt="Luxury bedroom suite with emerald green velvet bed"
                  className="w-full h-full hero-img-2 aspect-[840/790] object-cover block shadow-sm"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </HeroAnimation>
  );
}
