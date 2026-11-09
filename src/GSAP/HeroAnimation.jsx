"use client";
import { useGSAP } from "@gsap/react";
import gsap from "../Helper/gsap-config";
import { lockScroll, unlockScroll } from "../Helper/scrollLock";

import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { createCtaRevealAnimation } from "../Helper/ctaReveal";
import { createTextReveal } from "../Helper/wordsAnimation";
gsap.registerPlugin(SplitText);

export function HeroAnimation({ children, className = "" }) {
  const containerRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useGSAP(() => {
    window.scrollTo(0, 0);
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 639.98px)",
        isDesktop: "(min-width: 640px)",
      },
      () => {
        // Snap the logo onto the header slot (no animation)

        // Start: logo hidden, centered
        gsap.set(".nav-img", {
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          scale: 1.5,
        });

        const tl = gsap.timeline({
          onStart: lockScroll,
          onComplete: () => {
            unlockScroll();
            hasPlayedRef.current = true;
          },
        });

        tl.set("body", { height: "100vh", overflow: "hidden" });

        // 1. Fade in at center
        tl.to(".nav-img", {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });

        tl.to(
          ".nav-img",
          {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          "+=0.3",
        );
        tl.to(
          ".preload",
          {
            scale: 1.5,
            duration: 1,
            ease: "power4.in",
          },
          "<",
        );

        tl.to(
          ".preload",
          {
            opacity: 0,
            duration: 0.6,
            ease: "power4.in",
            zIndex: -1,
          },
          "<",
        );

        tl.set("body", { height: "auto", overflow: "auto" });
        ;
        // Rest of the intro — unchanged

        tl.fromTo(
          ".nav-logo-slot",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          },
        );

        tl.from(".nav-menu-md a", {
          yPercent: -110,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
        });
        tl.add(createTextReveal(".hero-title"), "<");
        tl.add(createCtaRevealAnimation(".hero-cta"), "<+=0.3");

        tl.fromTo(
          ".hero-img-2",
          { clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)" },
          {
            clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)",
            duration: 1.2,
            ease: "imgSE",
          },
          "<",
        );
        tl.from(".hero-img-2", { scale: 1.5, duration: 1, ease: "imgSE" }, "<");

        tl.fromTo(
          ".hero-img-1",
          { clipPath: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)" },
          {
            clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)",
            duration: 1.2,
            ease: "imgSE",
          },
          "<",
        );
        tl.from(".hero-img-1", { scale: 1.5, duration: 1, ease: "imgSE" }, "<");

        // Keep the logo glued to the header slot on resize / rotation
        const handleResize = () => {
          if (hasPlayedRef.current) syncLogoPosition();
        };
        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      },
    );

    return () => {
      unlockScroll();
      mm.revert();
    };
  });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
