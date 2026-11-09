// components/Providers/ScrollLock.ts
let locked = false;

const prevent = (e) => e.preventDefault();

const preventKeys = (e) => {
  const keys = [
    "ArrowUp",
    "ArrowDown",
    "PageUp",
    "PageDown",
    "Home",
    "End",
    " ",
  ];
  if (keys.includes(e.key)) e.preventDefault();
};

export function lockScroll() {
  if (typeof window === "undefined" || locked) return;
  locked = true;
  document.documentElement.style.overflow = "hidden";
  window.addEventListener("wheel", prevent, { passive: false });
  window.addEventListener("touchmove", prevent, { passive: false });
  window.addEventListener("keydown", preventKeys);
}

export function unlockScroll() {
  if (typeof window === "undefined" || !locked) return;
  locked = false;
  document.documentElement.style.overflow = "";
  window.removeEventListener("wheel", prevent);
  window.removeEventListener("touchmove", prevent);
  window.removeEventListener("keydown", preventKeys);
}
