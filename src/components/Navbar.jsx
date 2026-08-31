import React from 'react';

export default function Navbar() {
  return (
    <header className="w-full bg-[#F4F1EA] pt-4 px-6 md:px-12 2xl:px-16">
      <div className="w-full mx-auto flex items-center justify-between">
        <a href="#">
          <img
            src="/logo-black.png"
            alt="Heaven Furniture Mart"
            className="w-[142px] h-[54px] object-contain"
          />
        </a>

        <nav className="text-[16px] text-[#242424] font-light tracking-[-0.04em]">
          <a href="#products" className="underline">Products</a>
          <span>, </span>
          <a href="#gallery">Gallery</a>
          <span>, </span>
          <a href="#reviews">Reviews</a>
        </nav>
      </div>
    </header>
  );
}



