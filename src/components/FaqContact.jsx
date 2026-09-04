import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../Helper/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Toast from "./Toast";
gsap.registerPlugin(ScrollTrigger, SplitText);

const initialForm = { name: "", email: "", question: "" };

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

function FaqBorder({ dimmed }) {
  return (
    <div
      aria-hidden="true"
      className={`h-px w-full bg-[#4A3B31] transition-opacity duration-500 ${dimmed ? "opacity-40" : "opacity-100"
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

      if (!didMountRef.current) {
        didMountRef.current = true;
        gsap.set(wrapper, { height: isOpen ? "auto" : 0, overflow: "hidden" });
        return;
      }

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
        gsap.set(wrapper, { height: wrapper.offsetHeight });
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
      className={`py-4 sm:py-6 transition-opacity duration-500 ${isDimmed ? "opacity-40" : "opacity-100"
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
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""
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
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const openIndex = faqItems.findIndex((item) => item.id === openId);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };
  const isBorderDimmed = (position) =>
    openIndex !== -1 && position !== openIndex + 1;

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validateForm = () => {
    const errors = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const question = form.question.trim();

    if (!name) errors.name = "Please tell us your name.";
    else if (name.length < 2) errors.name = "That name looks too short.";
    if (!email) errors.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/.test(email)) {
      errors.email = "Please check the email address.";
    }
    if (!question) errors.question = "Let us know what you'd like to ask.";
    else if (question.length < 10) errors.question = "Please add a little more detail.";

    return { errors, value: { name, email, question } };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { errors, value } = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (result.errors) setFieldErrors(result.errors);
        throw new Error(result.message || "We couldn't send that just now.");
      }
      setForm(initialForm);
      setToast({
        tone: "success",
        title: "Message sent",
        description: result.message || "We'll get back to you within a day.",
      });
    } catch (error) {
      setToast({
        tone: "error",
        title: "We couldn't send that",
        description: error.message || "Please try again shortly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(() => {
    const faqSplit = SplitText.create(".faq-question", {
      type: "words,lines",
      mask: "lines",
      linesClass: "lineChildren",
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
    <>
      <Toast
        open={Boolean(toast)}
        tone={toast?.tone}
        title={toast?.title}
        description={toast?.description}
        onClose={() => setToast(null)}
      />
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
          <div className="w-full max-w-sm sm:max-w-md h-44 sm:h-60 overflow-hidden mb-6 sm:mb-8">
            <img
              src="/workshop-craftsmanship.webp"
              alt="Heaven Furniture Mart Workshop"
              className="w-full h-full object-cover faq-img"
            />
          </div>

          <p className="text-base sm:text-lg text-[#4A3B31] font-light tracking-tight mb-4 w-full faq-question max-w-sm sm:max-w-md">
            Got any questions left unanswered?
          </p>

          <div className="w-full sm:max-w-md bg-[#F4F1EA] border border-[#4A3B31] p-5 sm:p-7 md:p-8">
            <div className="mb-5 sm:mb-6">
              <h3 className="font-serif font-light text-base sm:text-lg md:text-xl text-[#4A3B31] tracking-tight">
                Ask us anything
              </h3>
              <p className="text-xs sm:text-sm text-[#808080] font-light mt-1 tracking-tight">
                We'll get back within a day.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="contact-name" className="block font-serif font-light text-base sm:text-lg text-[#4A3B31] mb-1.5 tracking-tight">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleFieldChange}
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                  placeholder="Your name"
                  className="w-full bg-[#F4F1EA] border border-[#4A3B31] px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-[#242424] placeholder-[#808080] font-light tracking-tight focus:outline-none"
                />
                {fieldErrors.name ? <p id="contact-name-error" className="mt-1 text-xs text-[#9B3F2F]">{fieldErrors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="contact-email" className="block font-serif font-light text-base sm:text-lg text-[#4A3B31] mb-1.5 tracking-tight">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleFieldChange}
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                  placeholder="you@email.com"
                  className="w-full bg-[#F4F1EA] border border-[#4A3B31] px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-[#242424] placeholder-[#808080] font-light tracking-tight focus:outline-none"
                />
                {fieldErrors.email ? <p id="contact-email-error" className="mt-1 text-xs text-[#9B3F2F]">{fieldErrors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="contact-question" className="block font-serif font-light text-base sm:text-lg text-[#4A3B31] mb-1.5 tracking-tight">
                  Question
                </label>
                <textarea
                  id="contact-question"
                  name="question"
                  rows="3"
                  value={form.question}
                  onChange={handleFieldChange}
                  aria-invalid={Boolean(fieldErrors.question)}
                  aria-describedby={fieldErrors.question ? "contact-question-error" : undefined}
                  placeholder="Tell us what you're looking for..."
                  className="w-full bg-[#F4F1EA] border border-[#4A3B31] p-3 sm:p-3.5 text-sm sm:text-base text-[#242424] placeholder-[#808080] font-light resize-none tracking-tight focus:outline-none"
                ></textarea>
                {fieldErrors.question ? <p id="contact-question-error" className="mt-1 text-xs text-[#9B3F2F]">{fieldErrors.question}</p> : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-9 sm:h-10 faq-link bg-[#4A3B31] text-white text-base sm:text-lg font-light tracking-tight flex items-center justify-center cursor-pointer hover:bg-[#3d3027] transition-colors disabled:cursor-wait disabled:opacity-60"
              >
                <span className="faq-btn relative">{isSubmitting ? "Sending..." : "Send"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
