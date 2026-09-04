"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "./gsap-config";

gsap.registerPlugin(SplitText, ScrollTrigger);

function resolveType(mask, animate, type) {
  return type ?? Array.from(new Set([mask, animate])).join(",");
}

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
        parent = animation.parent;
        startTime = animation.startTime();
        animation.kill();
      }
      animation = create?.(instance);
      if (parent && animation) parent.add(animation, startTime || 0);
    };
    subscribers.push(onSplit);
    onSplit(self);
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
  if (!targets.length) return gsap.to({}, { duration: 0 });

  gsap.set(targets, from);
  onReveal?.(self);
  return gsap.to(targets, { ...to, duration, stagger, ease });
}

export function createTextReveal(selector, options = {}) {
  const {
    mask = "lines",
    animate = "words",
    type,
    linesClass = "lineChildren",
    wordsClass = "word++",
  } = options;

  const split = createSplitAnimator(selector, {
    type: resolveType(mask, animate, type),
    mask,
    linesClass,
    wordsClass,
  });

  return split.animate((self) => buildAnimation(self, options));
}

export function useTextReveal(selector, options = {}, deps = []) {
  const splitsRef = useRef([]);

  useGSAP(
    () => {
      const {
        mask = "lines",
        animate = "words",
        type,
        linesClass = "lineChildren",
        wordsClass = "word++",
        scroll = false,
        scrollTrigger,
      } = options;

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