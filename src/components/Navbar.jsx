import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Vision', href: '#vision' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="w-full bg-[#F4F1EA] pt-4 px-6 sm:px-10 relative z-30">
        <div className="w-full flex items-center justify-between">
          <a href="#" aria-label="Heaven Furniture Mart Home">
            <img
              src="/logo-black.webp"
              alt="Heaven Furniture Mart"
              className="aspect-16/10 w-16 object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center text-sm text-[#242424] font-light tracking-tight">
            <a href="#products" className="underline hover:opacity-75 transition-opacity">Products</a>
            <span className="mx-1">, </span>
            <a href="#gallery" className="hover:underline hover:opacity-75 transition-opacity">Gallery</a>
            <span className="mx-1">, </span>
            <a href="#reviews" className="hover:underline hover:opacity-75 transition-opacity">Reviews</a>
            <span className="mx-1">, </span>
            <a href="#vision" className="hover:underline hover:opacity-75 transition-opacity">Vision</a>
            <span className="mx-1">, </span>
            <a href="#faqs" className="hover:underline hover:opacity-75 transition-opacity">FAQs</a>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-5 text-xs tracking-wider uppercase font-medium text-[#242424]">
            <a
              href="#contact"
              className="decoration-1 underline-offset-4 hover:opacity-75 transition-opacity tracking-tight"
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

      {/* Awwwards Inspired Mobile Fullscreen Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[#4A3B31] text-[#F4F1EA] flex flex-col justify-between p-6 sm:p-10 transition-all duration-500 ease-in-out md:hidden ${isOpen
          ? 'opacity-100 pointer-events-auto translate-y-0'
          : 'opacity-0 pointer-events-none -translate-y-4'
          }`}
      >
        {/* Top Header Row */}
        <div className="w-full flex items-center justify-between">
          <a href="#" onClick={() => setIsOpen(false)} aria-label="Heaven Furniture Mart Home">
            <img
              src="/logo-black.webp"
              alt="Heaven Furniture Mart"
              className="aspect-16/10 w-16 object-contain invert brightness-0 invert-100"
            />
          </a>

          <div className="flex items-center gap-5 text-xs tracking-tight uppercase font-medium">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="underline decoration-1 underline-offset-4 text-[#F4F1EA] hover:opacity-75 transition-opacity cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* Big Editorial Navigation Links */}
        <div className="flex flex-col space-y-4 my-auto py-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-sans text-5xl sm:text-4xl text-[#F4F1EA] font-light tracking-tight hover:text-[#C9A882] transition-colors w-fit"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom Section: Email & Socials */}
        <div className="space-y-6 pt-4 border-t border-white/10">
          <a
            href="mailto:heavenfurnituremart@gmail.com"
            className="text-xs sm:text-sm font-light tracking-wider uppercase text-[#F4F1EA]/90 hover:text-[#C9A882] transition-colors block"
          >
            heavenfurnituremart@gmail.com
          </a>

          <div className="flex flex-col space-y-1.5 text-xs sm:text-sm tracking-wider uppercase font-light text-[#F4F1EA]/70">
            <a
              href="#"
              className="hover:text-[#F4F1EA] transition-colors w-fit"
            >
              Instagram
            </a>
            <a
              href="#"
              className="hover:text-[#F4F1EA] transition-colors w-fit"
            >
              Facebook
            </a>
            <a
              href="#"
              className="hover:text-[#F4F1EA] transition-colors w-fit"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </>
  );
}



