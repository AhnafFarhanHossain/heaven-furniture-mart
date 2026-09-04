import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import React, { useRef } from "react";
import gsap from "../Helper/gsap-config";
gsap.registerPlugin(SplitText, ScrollTrigger);

type Props = {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  start?: string;
};

export default function TextReveal({
  children,
  animateOnScroll = true,
  delay = 0,
  start = "top 65%",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const splitRef = useRef<any[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || typeof window === "undefined") return;

      splitRef.current = [];

      const elements: HTMLElement[] = container.hasAttribute(
        "data-copy-wrapper",
      )
        ? (Array.from(container.children) as HTMLElement[])
        : [container];

      elements.forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
          // resize / breakpoint change / font load hole nijei re-split hobe
          autoSplit: true,
          onSplit(self) {
            const splitLines = self.lines as HTMLElement[];
            if (!splitLines.length) return;

            try {
              const computedStyle = window.getComputedStyle(el);
              const textIndent = computedStyle.textIndent;
              if (textIndent && textIndent !== "0px") {
                splitLines[0].style.paddingLeft = textIndent;
                el.style.textIndent = "0";
              }
            } catch (styleError) {
              console.warn(
                "TextReveal: Error getting computed styles:",
                styleError,
              );
            }

            gsap.set(splitLines, { yPercent: 100 });

            const animationProps = {
              yPercent: 0,
              duration: 1,
              stagger: 0.1,
              ease: "textEs",
              delay,
            };

            // return kora joruri — autoSplit eta manage kore,
            // porer re-split er age nijei revert/kill kore dey
            if (animateOnScroll) {
              return gsap.to(splitLines, {
                ...animationProps,
                scrollTrigger: {
                  trigger: container,
                  start,
                  markers: false,
                  once: true,
                },
              });
            }

            return gsap.to(splitLines, {
              ...animationProps,
              onComplete: () => {
                splitLines.forEach((line) => {
                  if (line && line.isConnected) {
                    line.style.transform = "none";
                  }
                });
              },
            });
          },
        });

        splitRef.current.push(split);
      });

      return () => {
        splitRef.current.forEach((split) => {
          if (split && typeof split.revert === "function") {
            try {
              split.revert();
            } catch (error) {
              console.warn("TextReveal: Error reverting split:", error);
            }
          }
        });
        splitRef.current = [];
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, start],
    },
  );

  return (
    <div ref={containerRef} data-copy-wrapper="true" suppressHydrationWarning>
      {children}
    </div>
  );
}