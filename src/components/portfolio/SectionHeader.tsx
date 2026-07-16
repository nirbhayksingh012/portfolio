"use client";

import { useRef } from "react";
import { useGSAPAnimations, gsap } from "@/hooks/useGSAP";
import { splitTextIntoSpans } from "@/lib/splitText";

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAPAnimations(() => {
    if (!containerRef.current) return;

    // Eyebrow — clip-path reveal from left
    if (eyebrowRef.current) {
      gsap.fromTo(
        eyebrowRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Title — per-word stagger with rotation
    if (titleRef.current) {
      const words = splitTextIntoSpans(titleRef.current, "words");
      gsap.fromTo(
        words,
        { y: "100%", rotateX: 8, opacity: 0 },
        {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Accent line — scale from center
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          delay: 0.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Description — fade up with blur dissolve
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { y: 20, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto mb-16 max-w-3xl text-center"
    >
      {/* Eyebrow — clip-path reveal */}
      <span
        ref={eyebrowRef}
        className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gradient"
      >
        {eyebrow}
      </span>

      {/* Title — per-word stagger */}
      <h2
        ref={titleRef}
        className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
        style={{ perspective: "600px" }}
      >
        {title}
      </h2>

      {/* Accent line */}
      <div
        ref={lineRef}
        className="mx-auto mt-5 h-[2px] w-16 origin-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
        style={{ transform: "scaleX(0)" }}
      />

      {description && (
        <p
          ref={descRef}
          className="mt-5 text-base text-slate-500 sm:text-lg"
        >
          {description}
        </p>
      )}
    </div>
  );
}
