"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/hooks/useGSAP";

/**
 * Lenis-based smooth scroll that syncs with GSAP ScrollTrigger.
 * Wraps children with silky momentum scrolling.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker for Lenis RAF loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Import gsap to use its ticker
    import("gsap").then(({ default: gsap }) => {
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      import("gsap").then(({ default: gsap }) => {
        gsap.ticker.remove(tickerCallback);
      });
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
