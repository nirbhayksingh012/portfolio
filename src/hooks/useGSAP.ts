"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP as useGSAPReact } from "@gsap/react";

// Register plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook that wraps @gsap/react's useGSAP for safe cleanup.
 * All GSAP animations created inside the callback are auto-killed on unmount.
 */
export function useGSAPAnimations(
  callback: (context: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }) => void,
  deps: unknown[] = [],
  scope?: React.RefObject<HTMLElement | null>
) {
  useGSAPReact(
    () => {
      callback({ gsap, ScrollTrigger });
    },
    { dependencies: deps, scope: scope ?? undefined }
  );
}

/**
 * Re-export for convenience
 */
export { gsap, ScrollTrigger };
