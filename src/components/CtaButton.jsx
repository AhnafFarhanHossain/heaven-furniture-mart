import { useRef } from "react";
import gsap from "../Helper/gsap-config";

const REST_LEN = 11;
const HOVER_LEN = 25;
const REST_HEAD = 2;
const HOVER_HEAD = 3;

function buildArrowPath(len, head) {
  return `M1 3 h${len} m-3,${-head} l3,${head} -3,${head}`;
}

export default function CollectionCta({ href, className = "" }) {
  const circleRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const proxy = useRef({ len: REST_LEN, head: REST_HEAD });

  const applyArrow = () => {
    pathRef.current?.setAttribute(
      "d",
      buildArrowPath(proxy.current.len, proxy.current.head),
    );
  };

  const handleEnter = () => {
    gsap.to(circleRef.current, { scale: 0.9, duration: 0.5, ease: "expo.out" });
    gsap.to(svgRef.current, {
      scale: 2,
      transformOrigin: "left center",
      duration: 0.5,
      ease: "expo.out",
    });
    gsap.to(proxy.current, {
      len: HOVER_LEN,
      head: HOVER_HEAD,
      duration: 0.5,
      ease: "expo.out",
      onUpdate: applyArrow,
    });
  };

  const handleLeave = () => {
    gsap.to(circleRef.current, { scale: 1, duration: 0.5, ease: "expo.inOut" });
    gsap.to(svgRef.current, {
      scale: 1,
      transformOrigin: "left center",
      duration: 0.5,
      ease: "expo.inOut",
    });
    gsap.to(proxy.current, {
      len: REST_LEN,
      head: REST_HEAD,
      duration: 0.5,
      ease: "expo.inOut",
      onUpdate: applyArrow,
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`inline-flex cta items-center cursor-pointer  justify-between w-60 h-8 bg-brand-brown text-white px-3.5 ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span
          ref={circleRef}
          className="w-1.5 h-1.5 rounded-full border border-brand-bg will-change-transform backface-hidden"
        />
        <svg
          ref={svgRef}
          className="w-3.5 h-2 overflow-visible will-change-transform backface-hidden"
          viewBox="0 0 13 6"
          fill="none"
          stroke="#F4F1EA"
          strokeWidth="1"
        >
          <path
            ref={pathRef}
            d={buildArrowPath(REST_LEN, REST_HEAD)}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-base font-light relative tracking-tight cta-anim text-white">
        Our collection
      </span>
    </a>
  );
}
