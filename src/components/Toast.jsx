import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../Helper/gsap-config";

const AUTO_DISMISS_MS = 5000;

/**
 * Top-centre status toast.
 *
 * Sits above every other layer (nav is z-40, mobile menu z-[100]) so it is never
 * occluded. Uses role="status" + aria-live="polite" so screen readers announce
 * it without stealing focus from the form the user just submitted.
 */
export default function Toast({
  open,
  title,
  description,
  tone = "success",
  onClose,
  duration = AUTO_DISMISS_MS,
}) {
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const checkRef = useRef(null);
  const barRef = useRef(null);
  const onCloseRef = useRef(onClose);

  // Keep the latest onClose without making it an animation dependency.
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Escape dismisses, matching the mobile menu's expectations.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onCloseRef.current?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useGSAP(
    () => {
      const panel = panelRef.current;
      const bar = barRef.current;
      const check = checkRef.current;
      if (!panel) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;

      if (!open) {
        // Leave: lift back up out of view, or a plain fade when motion is reduced.
        gsap.to(panel, {
          autoAlpha: 0,
          y: reduced ? 0 : -16,
          duration: reduced ? 0.2 : 0.4,
          ease: "power3.in",
        });
        return;
      }

      const tl = gsap.timeline();

      if (reduced) {
        tl.set(panel, { y: 0, scale: 1 });
        tl.to(panel, { autoAlpha: 1, duration: 0.2, ease: "none" });
        if (check) tl.set(check, { strokeDashoffset: 0 }, "<");
      } else {
        tl.fromTo(
          panel,
          { autoAlpha: 0, y: -28, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "expo.out",
          },
        );

        if (check) {
          // Draw the tick along its own path length.
          const length = check.getTotalLength?.() ?? 24;
          tl.fromTo(
            check,
            { strokeDasharray: length, strokeDashoffset: length },
            { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" },
            "-=0.35",
          );
        }
      }

      // Time-remaining bar. Deliberately scaleX so it never triggers layout.
      if (bar) {
        tl.fromTo(
          bar,
          { scaleX: 1 },
          {
            scaleX: 0,
            duration: duration / 1000,
            ease: "none",
            onComplete: () => onCloseRef.current?.(),
          },
          reduced ? ">" : "-=0.2",
        );
      }
    },
    { dependencies: [open, duration], scope: rootRef },
  );

  const accent =
    tone === "error" ? "bg-[#C2603F]" : "bg-brand-tan";

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] flex justify-center px-4 pt-4 sm:pt-6"
    >
      <div
        ref={panelRef}
        role="status"
        aria-live="polite"
        style={{ visibility: "hidden", opacity: 0 }}
        className={`pointer-events-auto relative w-[min(92vw,27rem)] overflow-hidden border border-brand-tan/30 bg-brand-brown px-4 py-3.5 sm:px-5 sm:py-4 ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <div className="flex items-start gap-3 sm:gap-3.5">
          <span
            aria-hidden="true"
            className="mt-0.5 flex size-5 shrink-0 items-center justify-center border border-brand-tan/50"
          >
            {tone === "error" ? (
              <svg viewBox="0 0 16 16" className="size-3" fill="none">
                <path
                  d="M8 4v5M8 11.5v.5"
                  stroke="#C9A882"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" className="size-3" fill="none">
                <path
                  ref={checkRef}
                  d="M3 8.5L6.4 12L13 4.5"
                  stroke="#C9A882"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>

          <div className="min-w-0 flex-1">
            <p className="font-serif text-sm font-light tracking-tight text-brand-bg sm:text-base">
              {title}
            </p>
            {description ? (
              <p className="mt-0.5 text-xs font-light leading-relaxed tracking-tight text-brand-bg/70">
                {description}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss notification"
            className="-mr-1 -mt-1 shrink-0 cursor-pointer p-1 text-brand-bg/60 transition-colors hover:text-brand-bg focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-brand-tan"
          >
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <span
          ref={barRef}
          aria-hidden="true"
          className={`absolute bottom-0 left-0 h-px w-full origin-left ${accent}`}
        />
      </div>
    </div>
  );
}
