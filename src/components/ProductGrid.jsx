import React, { useRef, useEffect } from 'react';

const products = [
  {
    id: 1,
    name: 'Luxurious Queen-sized Bed',
    price: '9.99 Lac BDT',
    image: '/product-queen-bed.webp',
  },
  {
    id: 2,
    name: 'Deluxe Couch Set',
    price: '9.99 Lac BDT',
    image: '/product-couch-set.webp',
  },
  {
    id: 3,
    name: 'Premium Desk Mirror',
    price: '9.99 Lac BDT',
    image: '/product-desk-mirror.webp',
  },
  {
    id: 4,
    name: 'Large Dining Table',
    price: '9.99 Lac BDT',
    image: '/product-dining-table.webp',
  },
  {
    id: 5,
    name: 'Handcrafted Bouclé Armchair',
    price: '9.99 Lac BDT',
    image: '/product-boucle-armchair.webp',
  },
  {
    id: 6,
    name: 'Organic Travertine Coffee Table',
    price: '9.99 Lac BDT',
    image: '/product-travertine-table.webp',
  },
  {
    id: 7,
    name: 'Slatted Walnut Tambour Credenza',
    price: '9.99 Lac BDT',
    image: '/product-walnut-credenza.webp',
  },
  {
    id: 8,
    name: 'Sculptural Velvet Chaise Lounge',
    price: '9.99 Lac BDT',
    image: '/product-velvet-chaise.webp',
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1 mb-1.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className="w-3 h-3 text-[#C9A227] fill-current"
          viewBox="0 0 12 12"
        >
          <path d="M6 1l1.5 3.5 3.5.5-2.5 2.5.5 3.5L6 9.5 2.5 11l.5-3.5L0.5 5l3.5-.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductGrid() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      // If user is using native horizontal trackpad gesture, let it handle natively
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScrollLeft = scrollWidth - clientWidth;

      if (maxScrollLeft <= 0) return;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      const canScrollRight = isScrollingDown && scrollLeft < maxScrollLeft - 2;
      const canScrollLeft = isScrollingUp && scrollLeft > 2;

      if (canScrollRight || canScrollLeft) {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) {
          e.stopImmediatePropagation();
        }
        e.lenisStopPropagation = true;

        el.scrollLeft += e.deltaY;
      }
      // When reaching the end or start, we don't block the event,
      // allowing Lenis to seamlessly continue scrolling the page vertically!
    };

    el.addEventListener('wheel', handleWheel, { capture: true, passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, []);

  return (
    <section id="products" className="w-full bg-[#F4F1EA]">
      <div
        ref={scrollRef}
        className="w-full flex overflow-x-auto custom-scrollbar border-t border-b border-[#4A3B31]/30"
      >
        {products.map((item, idx) => (
          <div
            key={item.id}
            className={`shrink-0 w-[85vw] sm:w-[48vw] md:w-[350px] lg:w-[380px] 2xl:w-[420px] flex flex-col justify-between p-6 md:p-8 2xl:p-10 min-h-[520px] sm:min-h-[560px] 2xl:min-h-[620px] ${
              idx < products.length - 1 ? 'border-r border-[#4A3B31]/30' : ''
            }`}
          >
            <div className="w-full h-[320px] sm:h-[360px] 2xl:h-[400px] flex items-center justify-center p-2">
              <img
                src={item.image}
                alt={item.name}
                className="max-h-[300px] sm:max-h-[340px] 2xl:max-h-[380px] max-w-full object-contain"
                loading="lazy"
              />
            </div>

            <div className="mt-4">
              <Stars />
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#242424] tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-base font-light text-[#242424] tracking-tight">
                    {item.price}
                  </p>
                </div>

                <div className="w-9 h-9 flex items-center justify-center">
                  <div className="flex items-center gap-1 text-[#242424]">
                    <span className="w-1.5 h-1.5 rounded-full border border-[#242424]" />
                    <svg className="w-4 h-2.5" fill="none" stroke="#242424" strokeWidth="1" viewBox="0 0 20 9">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M1 4.5h18m-4-3.5l4 3.5-4 3.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}




