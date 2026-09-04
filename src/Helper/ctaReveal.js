import gsap from "./gsap-config";

export function createCtaRevealAnimation(target, { scrollTrigger, paused = false } = {}) {
  const tl = gsap.timeline({
    paused: paused || !!scrollTrigger,
    scrollTrigger,
  });

  tl.fromTo(
    target,
    { clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)" },
    {
      clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)",
      duration: 1.2,
      ease: "imgSE",
    }
  );

  tl.from(
    target,
    { scale: 1.5, duration: 1, ease: "imgSE" },
    "<"
  );

  return tl;
}