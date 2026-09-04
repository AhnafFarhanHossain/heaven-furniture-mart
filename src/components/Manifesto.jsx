import TextReveal from "../Helper/TextReveal";

export default function Manifesto() {
  return (
    <section className="w-full bg-[#F4F1EA] py-12 md:py-28 2xl:py-36 px-6 md:px-8">
      <div className="w-full max-w-5xl mx-auto text-center">
        <TextReveal>
          <h2 className="text-4xl manifesto-italic sm:text-6xl md:text-7xl lg:text-8xl leading-[95%] tracking-tighter text-[#4A3B31] font-light mb-12 md:mb-16">
            Your <span className="font-serif  italic font-normal">home</span>{" "}
            deserves more than off-the-shelf
          </h2>
        </TextReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 max-w-2xl 2xl:max-w-3xl mx-auto text-left text-[#3b3a3a] font-light text-base tracking-tight leading-normal">
          <p className="">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"We don't make furniture for your
            home. <br />
            We make it for the life you live in it."
          </p>
          <p>
            "Sustainable, earth-friendly, and made for comfort. Furniture that
            lets you breathe. We redefine luxury."
          </p>
        </div>
      </div>
    </section>
  );
}
