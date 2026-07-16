"use client";

import { useRef, useCallback } from "react";
import { gsap } from "@/hooks/useGSAP";

/**
 * Magnetic hover effect — element subtly follows the cursor within a radius.
 * Attach the returned ref to any element.
 */
export function useMagnetic(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  const attachMagnetic = useCallback(
    (node: HTMLElement | null) => {
      // Cleanup previous
      if (ref.current) {
        ref.current.removeEventListener("mousemove", handleMouseMove);
        ref.current.removeEventListener("mouseleave", handleMouseLeave);
      }

      ref.current = node;

      if (node) {
        node.addEventListener("mousemove", handleMouseMove);
        node.addEventListener("mouseleave", handleMouseLeave);
      }
    },
    [handleMouseMove, handleMouseLeave]
  );

  return attachMagnetic;
}
