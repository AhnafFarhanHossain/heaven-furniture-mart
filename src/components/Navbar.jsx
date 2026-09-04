import { useState, useEffect, useRef } from "react";
import { useLenis } from "../Helper/LenisContext";

// Space (px) kept above a section when smooth-scrolling, so its heading is
// not tucked under the sticky navbar when that bar is revealed.
const SCROLL_OFFSET = 80;
// Minimum scroll movement (px) before toggling the sticky navbar (anti-jitter).
const SCROLL_DELTA = 6;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const topbarRef = useRef(null);
  const lenisRef = useLenis();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reveal the sticky navbar when scrolling up, hide it when scrolling down
  // (or while still within the original animated navbar's area near the top).
  useEffect(() => {
    let lastScroll = window.scrollY;
    let ticking = false;

    const update = () => {
      const current = Math.max(window.scrollY, 0);
      const cutoff = topbarRef.current?.offsetHeight ?? 90;
      const delta = current - lastScroll;

      if (current <= cutoff) {
        setShowSticky(false);
      } else if (delta > SCROLL_DELTA) {
        setShowSticky(false); // scrolling down -> hide
      } else if (delta < -SCROLL_DELTA) {
        setShowSticky(true); // scrolling up -> reveal
      }

      lastScroll = current;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop-only smooth scrolling through Lenis; mobile keeps the browser's
  // native anchor jump.
  const handleNavClick = (e, href) => {
    const lenis = lenisRef?.current;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop || !lenis || !href?.startsWith("#")) return;

    e.preventDefault();
    setIsOpen(false);

    if (href === "#") {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }

    lenis.scrollTo(href, { offset: -SCROLL_OFFSET, duration: 1.2 });
  };

  const navLinks = [
    { label: "Products", href: "#products" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Vision", href: "#vision" },
    { label: "FAQs", href: "#faqs" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <a
        href="#"
        aria-label="Heaven Furniture Mart Home"
        className="hover:opacity-80 transition-opacity absolute nav-img z-100"
      >
        <img
          src="/logo-black.webp"
          alt="Heaven Furniture Mart"
          className="w-[clamp(3.5rem,5vw,4.5rem)] h-auto object-contain"
        />
      </a>

      <div
        className={`fixed inset-0 z-[100] bg-brand-brown text-brand-bg flex flex-col justify-between p-6 sm:p-10 transition-all duration-500 ease-in-out md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            aria-label="Heaven Furniture Mart Home"
          >
            <img
              src="/logo-black.webp"
              alt="Heaven Furniture Mart"
              className="aspect-16/10 w-16 object-contain brightness-0 invert"
            />
          </a>

          <div className="flex items-center gap-5 text-xs tracking-tight uppercase font-medium">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="underline decoration-1 underline-offset-4 text-brand-bg hover:opacity-75 transition-opacity cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-4 my-auto py-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-sans text-5xl sm:text-4xl text-brand-bg font-light tracking-tight hover:text-brand-tan transition-colors w-fit"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="space-y-6 pt-4 border-t border-white/10">
          <a
            href="mailto:heavenfurnituremart@gmail.com"
            className="text-xs sm:text-sm font-light tracking-wider uppercase text-brand-bg/90 hover:text-brand-tan transition-colors block"
          >
            heavenfurnituremart@gmail.com
          </a>

          <div className="flex flex-col space-y-1.5 text-xs sm:text-sm tracking-wider uppercase font-light text-brand-bg/70">
            <a
              href="https://www.instagram.com/heaven_furniture_ltd"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-bg transition-colors w-fit"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/HeavenFurnitureMart"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-bg transition-colors w-fit"
            >
              Facebook
            </a>
            <a
              href="https://www.youtube.com/@HeavenFurnitureMart"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-bg transition-colors w-fit"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Sticky, animation-free duplicate navbar. Hidden while scrolling down,
          slides down from the top while scrolling up. It deliberately avoids
          the GSAP hook classes (nav-img / nav-logo-slot / nav-menu-md) so the
          hero intro animation is never re-triggered here. */}
      <header
        aria-hidden={!showSticky}
        className={`fixed top-0 inset-x-0 z-40 bg-brand-bg border-b border-black/5 transition-transform duration-500 ease-out will-change-transform ${
          showSticky ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="relative w-full max-w-360 mx-auto px-6 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            aria-label="Heaven Furniture Mart Home"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo-black.webp"
              alt="Heaven Furniture Mart"
              className="w-12 sm:w-14 aspect-16/10 object-contain"
            />
          </a>

          <nav className="hidden md:flex items-center text-[clamp(0.875rem,1.1vw,1rem)] gap-1.5 text-brand-dark font-light tracking-tight">
            <a
              href="#products"
              onClick={(e) => handleNavClick(e, "#products")}
              className="relative underline-offset-2 hover:opacity-75 transition-opacity line-anim"
            >
              Products,
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleNavClick(e, "#gallery")}
              className="relative hover:opacity-75 transition-opacity line-anim"
            >
              Gallery,
            </a>
            <a
              href="#reviews"
              onClick={(e) => handleNavClick(e, "#reviews")}
              className="relative hover:opacity-75 transition-opacity line-anim"
            >
              Reviews
            </a>
          </nav>

          <div className="flex md:hidden items-center gap-4 text-xs tracking-wider uppercase font-medium text-brand-dark">
            <a
              href="#contact"
              className="decoration-1 underline underline-offset-4 hover:opacity-75 transition-opacity tracking-tight"
            >
              Inquire &rarr;
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="tracking-tight underline decoration-1 underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <header
        ref={topbarRef}
        className="w-full bg-brand-bg pt-4 sm:pt-6 px-6 sm:px-8 max-w-360 mx-auto relative z-30"
      >
        <div className="w-full flex items-center justify-between">
          <div
            className="nav-logo-slot invisible w-12 mt-4 sm:w-14 aspect-16/10"
            aria-hidden="true"
          />

          <nav className="hidden nav-menu-md overflow-y-hidden pb-1 md:flex items-center text-[clamp(0.875rem,1.1vw,1rem)] gap-1.5 text-brand-dark font-light tracking-tight">
            <a
              href="#products"
              onClick={(e) => handleNavClick(e, "#products")}
              className=" underline-offset-2 hover:opacity-75 transition-opacity line-anim"
            >
              Products,
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleNavClick(e, "#gallery")}
              className=" hover:opacity-75 transition-opacity line-anim"
            >
              Gallery,
            </a>
            <a
              href="#reviews"
              onClick={(e) => handleNavClick(e, "#reviews")}
              className="hover:opacity-75 transition-opacity line-anim"
            >
              Reviews
            </a>
          </nav>

          <div className="flex md:hidden overflow-y-hidden pb-0.5 nav-menu-md items-center gap-4 text-xs tracking-wider uppercase font-medium text-brand-dark">
            <a
              href="#contact"
              className="decoration-1 underline underline-offset-4 hover:opacity-75 transition-opacity tracking-tight"
            >
              Inquire &rarr;
            </a>
            <a
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="tracking-tight underline decoration-1 underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer"
            >
              Menu
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
