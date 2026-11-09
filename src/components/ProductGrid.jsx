import { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { useGSAP } from "@gsap/react";
import { createCtaRevealAnimation } from "../Helper/ctaReveal";
import "swiper/css";
import "swiper/css/free-mode";
import CollectionCta from "./CtaButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Luxurious Queen-sized Bed",
    price: "9.99 Lac BDT",
    image: "/product-queen-bed.webp",
  },
  {
    id: 2,
    name: "Deluxe Couch Set",
    price: "9.99 Lac BDT",
    image: "/product-couch-set.webp",
  },
  {
    id: 3,
    name: "Premium Desk Mirror",
    price: "9.99 Lac BDT",
    image: "/product-desk-mirror.webp",
  },
  {
    id: 4,
    name: "Large Dining Table",
    price: "9.99 Lac BDT",
    image: "/product-dining-table.webp",
  },
  {
    id: 5,
    name: "Handcrafted Bouclé Armchair",
    price: "9.99 Lac BDT",
    image: "/product-boucle-armchair.webp",
  },
  {
    id: 6,
    name: "Organic Travertine Coffee Table",
    price: "9.99 Lac BDT",
    image: "/product-travertine-table.webp",
  },
  {
    id: 7,
    name: "Slatted Walnut Tambour Credenza",
    price: "9.99 Lac BDT",
    image: "/product-walnut-credenza.webp",
  },
  {
    id: 8,
    name: "Sculptural Velvet Chaise Lounge",
    price: "9.99 Lac BDT",
    image: "/product-velvet-chaise.webp",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1 mb-1.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className="w-3 h-3 text-[#C9A227] fill-current"
          viewBox="0 0 12 12"
        >
          <path d="M6 1l1.5 3.5 3.5.5-2.5 2.5.5 3.5L6 9.5 2.5 11l.5-3.5L0.5 5l3.5-.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductGrid() {
  const progressFillRef = useRef(null);

  const handleProgress = useCallback((_swiper, progress) => {
    if (!progressFillRef.current) return;
    const clamped = Math.min(Math.max(progress, 0), 1);
    progressFillRef.current.style.transform = `scaleX(${clamped})`;
  }, []);

  useGSAP(() => {
    createCtaRevealAnimation(".product-cta", {
      scrollTrigger: {
        trigger: ".product-cta",
        start: "top 75%",
      },
    });

    gsap.to(".grid-border-line", {
      scaleY: 1,
      ease: "none",
      stagger: 0.3,
      duration: 2,
      scrollTrigger: {
        trigger: "#products",
        start: "top 70%",
        end: "top 20%",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <div className="shrink-0 w-full flex justify-end px-6 md:px-8 mb-8">
        <CollectionCta className="product-cta" />
      </div>
      <section id="products" className="relative w-full bg-[#F4F1EA]">
        <Swiper
          modules={[FreeMode]}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 1,
            sticky: false,
          }}
          slidesPerView="auto"
          spaceBetween={0}
          grabCursor
          resistanceRatio={0.65}
          onProgress={handleProgress}
          className="!border-t !border-b !border-[#4A3B31]/30"
        >
          {products.map((item, idx) => (
            <SwiperSlide
              key={item.id}
              className={`!w-[85vw] sm:!w-[48vw] md:!w-[350px] lg:!w-[380px] 2xl:!w-[420px] relative flex flex-col justify-between p-6 md:p-8 2xl:p-10 min-h-[520px] sm:min-h-[560px] 2xl:min-h-[620px]`}
            >
              <div className="w-full h-[320px] sm:h-[360px] 2xl:h-[400px] flex items-center justify-center p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-[300px] sm:max-h-[340px] 2xl:max-h-[380px] max-w-full object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              <div className="mt-4">
                <Stars />
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#242424] tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-base font-light text-[#242424] tracking-tight">
                      {item.price}
                    </p>
                  </div>

                  <div className="w-9 h-9 flex items-center justify-center">
                    <div className="flex items-center gap-1 text-[#242424]">
                      <span className="w-1.5 h-1.5 rounded-full border border-[#242424]" />
                      <svg
                        className="w-4 h-2.5"
                        fill="none"
                        stroke="#242424"
                        strokeWidth="1"
                        viewBox="0 0 20 9"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M1 4.5h18m-4-3.5l4 3.5-4 3.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {idx < products.length - 1 && (
                <div
                  className="grid-border-line absolute top-0 right-0 w-px h-full bg-[#4A3B31]/30 origin-top"
                  style={{ transform: "scaleY(0)" }}
                  aria-hidden="true"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#4A3B31]/15">
          <div
            ref={progressFillRef}
            className="h-full w-full origin-left bg-[#C9A227]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </section>
    </>
  );
}
