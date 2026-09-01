import React from 'react';

const timeline = [
  {
    year: '2020',
    title: 'Founded by Abul Kalam Bhuiyan',
    subtitle: '(Currently serving as Managing Director)',
  },
  {
    year: '2021',
    title: 'Registered and Opened the Agrabad Showroom',
  },
  {
    year: '2024 & 2025',
    title: 'Participated the International furniture fair Chattogram',
  },
  {
    year: '2025',
    title: 'Became member of Chamber of the Commerce',
  },
  {
    year: '2026',
    title: 'Received the BFIOA recognision nationwide',
  },
];

export default function VisionTimeline() {
  return (
    <section id="vision" className="w-full bg-[#F4F1EA] py-28 md:py-36 2xl:py-44 px-6 md:px-12 2xl:px-16">
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto">
        <div className="w-full mb-20 md:mb-28 space-y-2">
          <h2 className="font-serif font-extralight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tighter text-[#242424] text-left md:pl-[8.5%]">
            Our sole purpose is to
          </h2>
          <h2 className="font-serif font-extralight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tighter text-[#242424] text-left md:pl-[25.3%]">
            make sure that your house looks
          </h2>
          <h2 className="font-serif font-extralight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tighter text-[#242424] text-left md:pl-[50.7%]">
            and feels like{' '}
            <span className="italic font-medium text-[#4A3B31]">home...</span>
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 md:pl-[8.5%] space-y-6">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-start gap-6">
                <span className="w-20 shrink-0 text-sm font-bold text-[#242424] tracking-tight">
                  {item.year}
                </span>
                <div className="text-sm text-[#242424] font-light tracking-tight">
                  <p>{item.title}</p>
                  {item.subtitle && (
                    <p className="text-[#8E8E93] text-sm">{item.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 flex justify-start lg:justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-between w-60 h-8 bg-[#4A3B31] text-white px-3.5 hover:bg-[#3d3027] transition-colors"
            >
              <span className="text-base font-light tracking-tight underline">
                Check out our Team
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full border border-[#F4F1EA]" />
                <svg className="w-3.5 h-2" fill="none" stroke="#F4F1EA" strokeWidth="1" viewBox="0 0 13 6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M1 3h11m-3-2l3 2-3 2" />
                </svg>
              </div>
            </a>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <p className="text-base text-[#242424] font-light leading-snug max-w-sm tracking-tight lg:text-right">
              Heaven Furniture Mart is one of the leading bespoke furniture brands in Chattogram, known for crafting premium-quality custom furniture that blends elegance, comfort, and durability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


