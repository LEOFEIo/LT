"use client";

import { useEffect, useRef } from "react";

const revealSelector = [
  ".landing-hero .hero-copy",
  ".landing-hero .meta-hero-visual",
  ".showcase-section > header",
  ".showcase-frame",
  ".metric-strip article",
  ".apple-planner-section > header",
  ".apple-planner",
  ".landing-section > header",
  ".landing-section .ui-card",
].join(",");

export function PageMotion() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    root.classList.add("motion-enabled");
    items.forEach((item, index) => {
      item.classList.add("motion-item");
      item.style.setProperty("--motion-delay", `${Math.min(index % 4, 3) * 55}ms`);
    });

    const observer: IntersectionObserver | null = !reduceMotion && "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        }, { rootMargin: "0px 0px -8%", threshold: .08 })
      : null;

    items.forEach((item) => {
      if (observer) observer.observe(item);
      else item.classList.add("is-visible");
    });

    let frame = 0;
    const syncProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${value})`;
        }
      });
    };

    window.addEventListener("scroll", syncProgress, { passive: true });
    window.addEventListener("resize", syncProgress, { passive: true });
    syncProgress();

    const tiltCard = document.querySelector<HTMLElement>(".featured-talent-card");
    const onPointerMove = (event: PointerEvent) => {
      if (!tiltCard || !finePointer || reduceMotion) return;
      const bounds = tiltCard.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      tiltCard.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
      tiltCard.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
      tiltCard.classList.add("is-tilting");
    };
    const resetTilt = () => {
      tiltCard?.classList.remove("is-tilting");
      tiltCard?.style.removeProperty("--tilt-x");
      tiltCard?.style.removeProperty("--tilt-y");
    };

    tiltCard?.addEventListener("pointermove", onPointerMove);
    tiltCard?.addEventListener("pointerleave", resetTilt);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", syncProgress);
      window.removeEventListener("resize", syncProgress);
      tiltCard?.removeEventListener("pointermove", onPointerMove);
      tiltCard?.removeEventListener("pointerleave", resetTilt);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("motion-enabled");
      items.forEach((item) => {
        item.classList.remove("motion-item", "is-visible");
        item.style.removeProperty("--motion-delay");
      });
    };
  }, []);

  return <div ref={progressRef} className="page-progress" aria-hidden="true" />;
}
