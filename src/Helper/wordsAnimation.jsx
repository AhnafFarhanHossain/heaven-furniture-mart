// Helper/wordsAnimation.js
"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "./gsap-config";

gsap.registerPlugin(SplitText, ScrollTrigger);

function resolveType(mask, animate, type) {
  return type ?? Array.from(new Set([mask, animate])).join(",");
}

// --- GSAP official helper (SplitTextAnimator), adapted ---
function createSplitAnimator(target, splitConfig) {
  const subscribers = [];
  const originalOnSplit = splitConfig.onSplit;

  const self = SplitText.create(target, {
    ...splitConfig,
    autoSplit: true,
    onSplit(instance) {
      subscribers.forEach((fn) => fn(instance));
      originalOnSplit?.(instance);
    },
  });

  self.animate = (create) => {
    let animation;
    const onSplit = (instance) => {
      let parent, startTime;
      if (animation) {
        parent = animation.parent;       // 👈 kon timeline-e ache
        startTime = animation.startTime(); // 👈 kon position-e ache
        animation.kill();                // 👈 purono/stub tween shore felo
      }
      animation = create?.(instance);
      if (parent && animation) parent.add(animation, startTime || 0); // 👈 thik shei jaygay notun ta boshiye dao
    };
    subscribers.push(onSplit);
    onSplit(self); // first call — split ready thakle real, na thakle stub
    return animation;
  };

  return self;
}

function buildAnimation(self, options) {
  const {
    animate = "words",
    from = { yPercent: -120 },
    to = { yPercent: 0 },
    duration = 0.8,
    stagger = 0.05,
    ease = "textEs",
    onReveal,
  } = options;

  const targets = animate === "words" ? self.words : self.lines;
  if (!targets.length) return gsap.to({}, { duration: 0 }); // harmless placeholder, split na hoya porjonto

  gsap.set(targets, from);
  onReveal?.(self);
  return gsap.to(targets, { ...to, duration, stagger, ease });
}

/**
 * Timeline mode — plain function, jekhane khushi call koro:
 * tl.add(createTextReveal(".hero-title"), position)
 */
export function createTextReveal(selector, options = {}) {
  const { mask = "lines", animate = "words", type, linesClass = "lineChildren", wordsClass = "word++" } = options;

  const split = createSplitAnimator(selector, {
    type: resolveType(mask, animate, type),
    mask,
    linesClass,
    wordsClass,
  });

  return split.animate((self) => buildAnimation(self, options));
}

/**
 * Scroll/standalone mode — hook, tomar footer-e already kaj kortese, unchanged.
 */
export function useTextReveal(selector, options = {}, deps = []) {
  const splitsRef = useRef([]);

  useGSAP(
    () => {
      const { mask = "lines", animate = "words", type, linesClass = "lineChildren", wordsClass = "word++", scroll = false, scrollTrigger } = options;

      const elements = gsap.utils.toArray(selector);
      splitsRef.current = [];

      elements.forEach((el) => {
        const split = SplitText.create(el, {
          type: resolveType(mask, animate, type),
          mask,
          linesClass,
          wordsClass,
          autoSplit: true,
          onSplit(self) {
            const anim = buildAnimation(self, options);
            if (scroll) {
              anim.scrollTrigger = ScrollTrigger.create({
                trigger: el,
                start: "top bottom-=200",
                once: true,
                animation: anim,
                ...scrollTrigger,
              });
            }
            return anim;
          },
        });
        splitsRef.current.push(split);
      });

      return () => splitsRef.current.forEach((s) => s.revert());
    },
    { dependencies: [selector, ...deps] },
  );

  return { splits: splitsRef };
}