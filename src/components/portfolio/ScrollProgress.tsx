"use client";

import { useRef } from "react";
import { useGSAPAnimations, gsap } from "@/hooks/useGSAP";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAPAnimations(() => {
    if (!barRef.current) return;

    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-foreground shadow-lg"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
