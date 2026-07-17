"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/portfolio-data";
import { useGSAPAnimations, gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { splitTextIntoSpans } from "@/lib/splitText";

/* ── Typewriter ───────────────────────────────────────────── */

function Typewriter({ words, delay = 1500 }: { words: string[]; delay?: number }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [phase, setPhase] = useState<"starting" | "typing" | "holding" | "erasing" | "pausing">(
    delay > 0 ? "starting" : "typing"
  );
  const currentWord = words[wordIndex % words.length];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    switch (phase) {
      case "starting":
        timeout = setTimeout(() => setPhase("typing"), delay);
        break;

      case "typing":
        if (displayedChars < currentWord.length) {
          timeout = setTimeout(() => {
            setDisplayedChars((c) => c + 1);
          }, 70 + Math.random() * 50);
        } else {
          timeout = setTimeout(() => setPhase("holding"), 100);
        }
        break;

      case "holding":
        timeout = setTimeout(() => setPhase("erasing"), 2000);
        break;

      case "erasing":
        if (displayedChars > 0) {
          timeout = setTimeout(() => {
            setDisplayedChars((c) => c - 1);
          }, 35);
        } else {
          timeout = setTimeout(() => setPhase("pausing"), 200);
        }
        break;

      case "pausing":
        setWordIndex((i) => i + 1);
        setPhase("typing");
        break;
    }

    return () => clearTimeout(timeout);
  }, [displayedChars, phase, currentWord]);

  const visibleText = currentWord.slice(0, displayedChars);

  return (
    <span className="relative inline-flex items-baseline min-h-[1.2em]">
      <span className="text-gradient" aria-label={currentWord}>
        {visibleText || "\u200B"}
      </span>

      <motion.span
        className="ml-[2px] inline-block h-[0.85em] w-[3px] translate-y-[0.05em] rounded-full bg-amber-400 align-middle"
        animate={{
          opacity: [1, 1, 0, 0, 1],
          scaleY: [1, 1, 0.8, 0.8, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 0.5, 0.9, 1],
        }}
        style={{
          boxShadow: "0 0 8px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 191, 36, 0.2)",
        }}
      />
    </span>
  );
}

/* ── Floating particles ─────────────────────────────────────── */

function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<
    { left: string; top: string; bg: string; opacity: number; size: number; speed: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        bg: i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#60a5fa" : "#ffffff",
        opacity: 0.08 + Math.random() * 0.12,
        size: 2 + Math.random() * 3,
        speed: 0.3 + Math.random() * 0.7, // parallax speed multiplier
      }))
    );
  }, []);

  // GSAP parallax: particles move at different speeds on scroll
  useGSAPAnimations(() => {
    if (!containerRef.current) return;
    const particleEls = containerRef.current.querySelectorAll<HTMLElement>(".hero-particle");

    particleEls.forEach((el, i) => {
      const speed = particles[i]?.speed ?? 0.5;

      // Floating animation
      gsap.to(el, {
        y: `random(-25, 0)`,
        x: `random(-10, 10)`,
        duration: 4 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 3,
      });

      // Parallax on scroll
      gsap.to(el, {
        yPercent: -80 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, [particles]);

  if (particles.length === 0) return null;

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <div
          key={i}
          className="hero-particle absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            backgroundColor: p.bg,
            opacity: p.opacity,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // GSAP cinematic entrance timeline
  useGSAPAnimations(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      delay: 1, // wait for loading screen
    });

    // 1. Name — split into characters, fly in from bottom with blur
    if (nameRef.current) {
      const nameChars = splitTextIntoSpans(nameRef.current, "chars");
      gsap.set(nameChars, { y: 60, opacity: 0, filter: "blur(8px)" });
      tl.to(nameChars, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.03,
        duration: 0.8,
        ease: "back.out(1.4)",
      });
    }

    // 2. Typewriter container — fade in
    if (typewriterRef.current) {
      gsap.set(typewriterRef.current, { y: 30, opacity: 0 });
      tl.to(
        typewriterRef.current,
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      );
    }

    // 3. Tagline — slide up with elastic
    if (taglineRef.current) {
      gsap.set(taglineRef.current, { y: 40, opacity: 0 });
      tl.to(
        taglineRef.current,
        { y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.2"
      );
    }

    // 4. CTA buttons — scale up with bounce
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll("a");
      gsap.set(buttons, { scale: 0, opacity: 0 });
      tl.to(
        buttons,
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.2"
      );
    }

    // 5. Social icons — pop in
    if (socialsRef.current) {
      const icons = socialsRef.current.querySelectorAll("a");
      gsap.set(icons, { y: 20, opacity: 0 });
      tl.to(
        icons,
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 },
        "-=0.3"
      );
    }

    // 6. Scroll indicator — fade in last
    if (scrollRef.current) {
      gsap.set(scrollRef.current, { y: 10, opacity: 0 });
      tl.to(
        scrollRef.current,
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.1"
      );
    }

    // Hero scroll-away: fade + scale as user scrolls down
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Ambient gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.07] blur-[100px]"
        style={{ background: "radial-gradient(circle, #fbbf24, #3b82f6)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-amber-500/[0.04] blur-[80px]"
      />

      {/* Particles with GSAP parallax */}
      <Particles />

      <div ref={contentRef} className="relative mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            {/* Name — GSAP character split animation */}
            <h1
              ref={nameRef}
              className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-white"
            >
              Hi, I&apos;m {profile.name}
            </h1>

            {/* Typewriter */}
            <div
              ref={typewriterRef}
              className="mt-6 text-xl font-medium sm:text-2xl md:text-3xl"
            >
              <Typewriter words={profile.roles} delay={1500} />
            </div>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg"
            >
              {profile.tagline}
            </p>

            {/* CTA buttons */}
            <div
              ref={ctaRef}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="/resume.pdf"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/[0.2] hover:bg-white/[0.07] hover:text-white"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-600 transition-all duration-300 hover:text-white"
              >
                Contact Me
              </a>
            </div>

            {/* Social icons */}
            <div
              ref={socialsRef}
              className="mt-10 flex items-center gap-2"
            >
              {[
                { href: profile.github, icon: Github, label: "GitHub" },
                { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group/social grid h-11 w-11 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-slate-500 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white hover:shadow-lg hover:shadow-white/[0.05]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Scroll indicator */}
            <div ref={scrollRef} className="mt-16">
              <a href="#experience" className="flex flex-col items-center gap-1 text-slate-700 transition-colors duration-300 hover:text-slate-400">
                <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                <ChevronDown className="h-4 w-4 animate-float" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}