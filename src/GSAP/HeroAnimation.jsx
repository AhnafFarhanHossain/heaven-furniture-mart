"use client";
import { useGSAP } from "@gsap/react";
import gsap from "../Helper/gsap-config";
import { lockScroll, unlockScroll } from "../Helper/scrollLock";

import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { GSDevTools } from "gsap/all";
import { createCtaRevealAnimation } from "../Helper/ctaReveal";
import { createTextReveal, useTextReveal } from "../Helper/wordsAnimation";
gsap.registerPlugin(SplitText, GSDevTools);

export function HeroAnimation({ children, className = "" }) {
  const containerRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useGSAP(() => {
    window.scrollTo(0, 0);

    // .nav-img is absolutely positioned outside the header, so its
    // top/left has to be measured against the real header layout
    // (px/py/mx, plus max-w-360's mx-auto centering) instead of
    // being hardcoded — this stays correct at every breakpoint.
    const getLogoTarget = () => {
      const slot = document.querySelector(".nav-logo-slot");
      const navImg = document.querySelector(".nav-img");
      if (!slot || !navImg) return null;

      const offsetParent = navImg.offsetParent || document.body;
      const slotRect = slot.getBoundingClientRect();
      const parentRect = offsetParent.getBoundingClientRect();

      return {
        top: slotRect.top - parentRect.top,
        left: slotRect.left - parentRect.left,
      };
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 639.98px)",
        isDesktop: "(min-width: 640px)",
      },
      () => {
        const syncLogoPosition = () => {
          const target = getLogoTarget();
          if (!target) return;
          gsap.set(".nav-img", {
            top: target.top,
            left: target.left,
            xPercent: 0,
            yPercent: 0,
          });
        };

        if (hasPlayedRef.current) {
          // Breakpoint changed after the intro already played —
          // just resnap the logo, don't replay the whole timeline.
          syncLogoPosition();
        } else {
          gsap.set(".nav-img", {
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            scale: 2.8,
          });

          const tl = gsap.timeline({
            onStart: lockScroll,
            onComplete: () => {
              unlockScroll();
              hasPlayedRef.current = true;
            },
          });

          tl.set("body", { height: "100vh", overflow: "hidden" });

          tl.to(".nav-img", {
            scale: 1.5,
            duration: 1,
            ease: "bounce",
          });

          tl.to(
            ".preload",
            {
              scale: 1.5,
              duration: 1,
              ease: "power4.in",
            },
            ">-=0.4",
          );

          const endTarget = getLogoTarget() ?? { top: 50, left: 260 };

          tl.to(
            ".nav-img",
            {
              top: () => getLogoTarget()?.top ?? 50,
              left: () => getLogoTarget()?.left ?? 260,
              xPercent: 0,
              yPercent: 0,
              duration: 1,
              scale: 1,
              ease: "quick",
            },
            "-=0.2",
          );
          tl.call(syncLogoPosition);
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

          tl.from(
            ".hero-img-2",
            {
              scale: 1.5,
              duration: 1,
              ease: "imgSE",
            },
            "<",
          );

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

          tl.from(
            ".hero-img-1",
            {
              scale: 1.5,
              duration: 1,
              ease: "imgSE",
            },
            "<",
          );

          // GSDevTools.create({ animation: tl });
        }

        // Keep the logo glued to the header slot on any resize /
        // orientation change, without replaying the whole intro.
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
