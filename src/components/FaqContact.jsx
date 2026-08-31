import React, { useState } from 'react';

const faqItems = [
  {
    id: 1,
    question: "Do you have a return policy?",
    answer: "Our priority is to ensure customers choose our product by their own will. If they don’t like it, they are free to return it using the no-questions-asked return policy."
  },
  {
    id: 2,
    question: "What is your furniture made from?",
    answer: "We use premium solid teak, mahogany, and treated oak with handcrafted finishes."
  },
  {
    id: 3,
    question: "How long will it take for my order to arrive?",
    answer: "Catalog products are delivered within 3-5 business days; bespoke pieces take 2-3 weeks."
  },
  {
    id: 4,
    question: "Do your products come with a warranty?",
    answer: "Yes, every original furniture piece comes with a comprehensive warranty."
  }
];

export default function FaqContact() {
  const [openId, setOpenId] = useState(1);

  return (
    <section id="faqs" className="w-full bg-[#F4F1EA] py-16 sm:py-24 md:py-36 2xl:py-44 px-4 sm:px-6 md:px-12 2xl:px-16">
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-7">
          <h2 className="font-serif font-light text-[40px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[95%] tracking-[-0.06em] text-[#4A3B31] mb-6 sm:mb-10 md:mb-12">
            Faq’s
          </h2>

          <div className="w-full max-w-[744px] divide-y divide-[#4A3B31] border-t border-b border-[#4A3B31]">
            {faqItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="py-4 sm:py-6">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-serif font-light text-[17px] sm:text-[20px] md:text-[24px] text-[#4A3B31] tracking-[-0.03em] pr-2">
                      {item.question}
                    </span>
                    <span className="ml-2 sm:ml-4 text-[#4A3B31] shrink-0">
                      <svg
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="#4A3B31"
                        strokeWidth="1.5"
                        viewBox="0 0 16 16"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 sm:pt-4 pr-4 sm:pr-6 max-w-[373px]">
                      <p className="text-[13px] sm:text-[15px] md:text-[16px] text-[#242424] font-light leading-normal tracking-[-0.04em]">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div id="contact" className="lg:col-span-5 flex flex-col items-start lg:items-end">
          <div className="w-full max-w-[384px] h-[160px] sm:h-[216px] overflow-hidden mb-6 sm:mb-8">
            <img
              src="/workshop-craftsmanship.png"
              alt="Heaven Furniture Mart Workshop"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-[14px] sm:text-[16px] text-[#4A3B31] font-light tracking-[-0.04em] mb-4 w-full max-w-[345px]">
            Got any questions left unanswered?
          </p>

          <div className="w-full max-w-[345px] bg-[#F4F1EA] border border-[#4A3B31] p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <h3 className="font-serif font-light text-[15px] sm:text-[16px] text-[#4A3B31] tracking-[-0.04em]">
                Ask us anything
              </h3>
              <p className="text-[11px] sm:text-[12px] text-[#808080] font-light mt-0.5 sm:mt-1 tracking-[-0.04em]">
                We'll get back within a day.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block font-serif font-light text-[14px] sm:text-[16px] text-[#4A3B31] mb-1 tracking-[-0.04em]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-[#F4F1EA] border border-[#4A3B31] px-3 py-1.5 sm:py-2 text-[11px] sm:text-[12px] text-[#242424] placeholder-[#808080] font-light tracking-[-0.04em] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-light text-[14px] sm:text-[16px] text-[#4A3B31] mb-1 tracking-[-0.04em]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full bg-[#F4F1EA] border border-[#4A3B31] px-3 py-1.5 sm:py-2 text-[11px] sm:text-[12px] text-[#242424] placeholder-[#808080] font-light tracking-[-0.04em] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-light text-[14px] sm:text-[16px] text-[#4A3B31] mb-1 tracking-[-0.04em]">
                  Question
                </label>
                <textarea
                  rows="3"
                  placeholder="Tell us what you're looking for..."
                  className="w-full bg-[#F4F1EA] border border-[#4A3B31] p-2.5 sm:p-3 text-[11px] sm:text-[12px] text-[#242424] placeholder-[#808080] font-light resize-none tracking-[-0.04em] focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full h-[32px] bg-[#4A3B31] text-[#FFFFFF] text-[14px] sm:text-[16px] font-light tracking-[-0.04em] flex items-center justify-center underline cursor-pointer hover:bg-[#3d3027] transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}



