"use client";

import { useRef } from "react";
import { SectionHeader } from "./SectionHeader";
import { profile, focus } from "@/lib/portfolio-data";
import { useGSAPAnimations, gsap } from "@/hooks/useGSAP";
import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

/* ── Main section ───────────────────────────────────────────── */

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useGSAPAnimations(() => {
    if (!sectionRef.current) return;

    // Left content — slide from left with parallax
    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Parallax — left moves slightly slower
      gsap.to(leftRef.current, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    // Right Lanyard — slide from right with parallax
    if (rightRef.current) {
      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Parallax — right moves slightly faster
      gsap.to(rightRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    // Bio paragraphs — stagger fade in
    if (bioRef.current) {
      const paragraphs = bioRef.current.querySelectorAll("p");
      gsap.fromTo(
        paragraphs,
        { y: 30, opacity: 0, filter: "blur(4px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Focus area tags — pop in with stagger
    if (tagsRef.current) {
      const tags = tagsRef.current.querySelectorAll("span");
      gsap.fromTo(
        tags,
        { scale: 0.8, opacity: 0, y: 10 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: tagsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24">
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="About"
          title="Engineer obsessed with shipping intelligent systems"
          description="I design and build production-grade AI applications — from retrieval pipelines and LLM orchestration to the APIs and interfaces that bring them to users."
        />

        <div className="relative mt-8 grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* ── Left: Content ── */}
          <div ref={leftRef}>
            <div ref={bioRef}>
              {/* Bio text */}
              <p className="font-display text-2xl leading-snug text-white sm:text-3xl">
                I&apos;m a software engineer focused on the{" "}
                <span className="text-gradient">GenAI stack</span>: LLM
                architecture, RAG pipelines, sentiment analysis systems, and the
                full-stack plumbing that makes them production-ready.
              </p>

              <p className="mt-6 text-base leading-relaxed text-slate-500">
                I love taking research-grade ideas into production. I trained
                Rudra, a custom 6.5M-parameter Transformer LLM with autonomous
                tool-use, on a single consumer GPU. At TATA BlueScope Steel, I
                built a FinBERT-powered sentiment pipeline processing 500+
                financial articles daily at ~82% accuracy — cutting manual
                analyst effort by 60%.
              </p>
            </div>

            {/* Focus areas */}
            <div className="mt-10">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                What I focus on
              </h4>
              <div ref={tagsRef} className="flex flex-wrap gap-2">
                {focus.map((f) => {
                  const Icon = f.icon;
                  return (
                    <span
                      key={f.label}
                      className="group inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs font-medium text-slate-500 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
                    >
                      <Icon className="h-3.5 w-3.5 text-amber-400/70 transition-colors duration-300 group-hover:text-amber-400" />
                      {f.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Lanyard ── */}
          <div
            ref={rightRef}
            className="relative h-[480px] w-full sm:h-[540px]"
          >
            <Lanyard
              position={[0, -3.5, 18.0]}
              gravity={[0, -40, 0]}
              frontImage={profile.avatar}
              backImage={profile.avatar}
              imageFit="cover"
              lanyardWidth={1.2}
            />
          </div>
        </div>
      </div>
    </section>
  );
}