import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../Helper/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

const faqItems = [
  {
    id: 1,
    question: "Do you have a return policy?",
    answer:
      "Our priority is to ensure customers choose our product by their own will. If they don’t like it, they are free to return it using the no-questions-asked return policy.",
  },
  {
    id: 2,
    question: "What is your furniture made from?",
    answer:
      "We use premium solid teak, mahogany, and treated oak with handcrafted finishes.",
  },
  {
    id: 3,
    question: "How long will it take for my order to arrive?",
    answer:
      "Catalog products are delivered within 3-5 business days; bespoke pieces take 2-3 weeks.",
  },
  {
    id: 4,
    question: "Do your products come with a warranty?",
    answer:
      "Yes, every original furniture piece comes with a comprehensive warranty.",
  },
];

// A single horizontal rule between/around FAQ items. Kept as its own
// element (instead of relying on `divide-y`) so its opacity can be
// controlled independently of whichever item happens to sit next to it.
function FaqBorder({ dimmed }) {
  return (
    <div
      aria-hidden="true"
      className={`h-px w-full bg-[#4A3B31] transition-opacity duration-500 ${
        dimmed ? "opacity-40" : "opacity-100"
      }`}
    />
  );
}

function FaqItem({ item, isOpen, isDimmed, onToggle }) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);
  const didMountRef = useRef(false);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const inner = innerRef.current;
      if (!wrapper || !inner) return;

      // First render: snap instantly to the correct state, no tween —
      // otherwise the default-open item would "grow" on page load.
      if (!didMountRef.current) {
        didMountRef.current = true;
        gsap.set(wrapper, { height: isOpen ? "auto" : 0, overflow: "hidden" });
        return;
      }

      // Stop mid-flight in case of rapid clicking, so height picks up
      // smoothly from wherever it currently is instead of jumping.
      gsap.killTweensOf(wrapper);

      if (isOpen) {
        const targetHeight = inner.scrollHeight;
        gsap.fromTo(
          wrapper,
          { height: 0 },
          {
            height: targetHeight,
            duration: 0.8,
            ease: "expo.out",
            onComplete: () => gsap.set(wrapper, { height: "auto" }),
          },
        );
      } else {
        gsap.set(wrapper, { height: wrapper.offsetHeight }); // resolve "auto" to a px value first
        gsap.to(wrapper, {
          height: 0,
          duration: 0.6,
          ease: "expo.inOut",
        });
      }
    },
    { dependencies: [isOpen], scope: wrapperRef },
  );

  return (
    <div
      className={`py-4 sm:py-6 transition-opacity duration-500 ${
        isDimmed ? "opacity-40" : "opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left cursor-pointer"
      >
        <span className="font-serif font-light text-lg sm:text-xl md:text-2xl text-[#4A3B31] tracking-tight pr-2">
          {item.question}
        </span>
        <span className="ml-2 sm:ml-4 text-[#4A3B31] shrink-0">
          <svg
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="#4A3B31"
            strokeWidth="1.5"
            viewBox="0 0 16 16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6l4 4 4-4"
            />
          </svg>
        </span>
      </button>

      <div ref={wrapperRef} style={{ height: 0, overflow: "hidden" }}>
        <div ref={innerRef} className="pt-3 sm:pt-4 pr-4 sm:pr-6 max-w-sm">
          <p className="text-sm md:text-base text-[#242424] font-light leading-normal tracking-tight">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqContact() {
  const [openId, setOpenId] = useState(1);
  const openIndex = faqItems.findIndex((item) => item.id === openId);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };
  const isBorderDimmed = (position) =>
    openIndex !== -1 && position !== openIndex + 1;

  useGSAP(() => {
    const faqSplit = SplitText.create(".faq-question", {
      type: "words,lines",
      mask: "lines", // pick ONE
      linesClass: "lineChildren", // note: it's linesClass, not lineClass
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".faq-question",
        start: "top 80%",
      },
    });

    tl.from(faqSplit.words, {
      yPercent: -120,
      duration: 0.8,
      stagger: 0.05,
      ease: "textEs",
    });

    tl.fromTo(
      ".faq-img",
      {
        scale: 1.1,
      },
      {
        scale: 1,
        duration: 1,
        ease: "quick",
      },
      "<",
    );
  });

  return (
    <section
      id="faqs"
      className="w-full bg-[#F4F1EA] py-16 sm:py-24 md:py-36 2xl:py-44 px-4 sm:px-6 md:px-12 2xl:px-16"
    >
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-7">
          <h2 className="font-serif font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[95%] tracking-tighter text-[#4A3B31] mb-6 sm:mb-10 md:mb-12">
            Faq’s
          </h2>

          <div className="w-full max-w-3xl">
            <FaqBorder dimmed={isBorderDimmed(0)} />
            {faqItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <FaqItem
                  item={item}
                  isOpen={openId === item.id}
                  isDimmed={openId !== null && openId !== item.id}
                  onToggle={() => handleToggle(item.id)}
                />
                <FaqBorder dimmed={isBorderDimmed(index + 1)} />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div
          id="contact"
          className="lg:col-span-5 flex flex-col items-start lg:items-end"
        >
          <div className="w-full max-w-sm h-40 sm:h-54 overflow-hidden mb-6 sm:mb-8">
            <img
              src="/workshop-craftsmanship.webp"
              alt="Heaven Furniture Mart Workshop"
              className="w-full h-full object-cover faq-img"
            />
          </div>

          <p className="text-sm sm:text-base text-[#4A3B31] font-light tracking-tight mb-4 w-full faq-question max-w-sm">
            Got any questions left unanswered?
          </p>

          <div className="w-full sm:max-w-sm bg-[#F4F1EA] border border-[#4A3B31] p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <h3 className="font-serif font-light text-sm sm:text-base text-[#4A3B31] tracking-tight">
                Ask us anything
              </h3>
              <p className="text-xs text-[#808080] font-light mt-0.5 sm:mt-1 tracking-tight">
                We'll get back within a day.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-3 sm:space-y-4"
            >
              <div>
                <label className="block font-serif font-light text-sm sm:text-base text-[#4A3B31] mb-1 tracking-tight">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-[#F4F1EA] border border-[#4A3B31] px-3 py-1.5 sm:py-2 text-xs text-[#242424] placeholder-[#808080] font-light tracking-tight focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-light text-sm sm:text-base text-[#4A3B31] mb-1 tracking-tight">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full bg-[#F4F1EA] border border-[#4A3B31] px-3 py-1.5 sm:py-2 text-xs text-[#242424] placeholder-[#808080] font-light tracking-tight focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-light text-sm sm:text-base text-[#4A3B31] mb-1 tracking-tight">
                  Question
                </label>
                <textarea
                  rows="3"
                  placeholder="Tell us what you're looking for..."
                  className="w-full bg-[#F4F1EA] border border-[#4A3B31] p-2.5 sm:p-3 text-xs text-[#242424] placeholder-[#808080] font-light resize-none tracking-tight focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full h-8 faq-link bg-[#4A3B31] text-white text-sm sm:text-base font-light tracking-tight flex items-center justify-center  cursor-pointer hover:bg-[#3d3027] transition-colors"
              >
                <span className="faq-btn relative">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
