"use client";

import { ArrowUpRight, Briefcase } from "lucide-react";
import { useRef } from "react";
import { SectionHeader } from "./SectionHeader";
import { experiences } from "@/lib/portfolio-data";
import { useGSAPAnimations, gsap } from "@/hooks/useGSAP";

/* ── Single experience entry ────────────────────────────────── */

function ExperienceEntry({
  exp,
  idx,
}: {
  exp: (typeof experiences)[number];
  idx: number;
}) {
  const entryRef = useRef<HTMLDivElement>(null);

  useGSAPAnimations(() => {
    if (!entryRef.current) return;

    // Timeline node — scale + glow on enter
    const node = entryRef.current.querySelector(".timeline-node");
    if (node) {
      gsap.fromTo(
        node,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: entryRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Period pill — clip-path reveal
    const pill = entryRef.current.querySelector(".period-pill");
    if (pill) {
      gsap.fromTo(
        pill,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
          scrollTrigger: {
            trigger: entryRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Role title — slide up
    const role = entryRef.current.querySelector(".role-title");
    if (role) {
      gsap.fromTo(
        role,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: entryRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Company — fade in
    const company = entryRef.current.querySelector(".company-name");
    if (company) {
      gsap.fromTo(
        company,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: entryRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Divider — scale from left
    const divider = entryRef.current.querySelector(".entry-divider");
    if (divider) {
      gsap.fromTo(
        divider,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: entryRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Highlights — stagger from left
    const highlights = entryRef.current.querySelectorAll(".highlight-item");
    if (highlights.length) {
      gsap.fromTo(
        highlights,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.5,
          delay: 0.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: entryRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={entryRef}
      className="group relative grid grid-cols-1 gap-y-1 md:grid-cols-[48px_1fr] md:gap-x-8"
    >
      {/* ── Timeline node (desktop) ── */}
      <div className="relative hidden md:flex md:flex-col md:items-center">
        <div className="timeline-node relative z-10 grid h-12 w-12 place-items-center rounded-xl border-2 border-gray-800 bg-card/80 backdrop-blur transition-colors duration-300 group-hover:border-amber-400/60">
          <Briefcase className="h-5 w-5 text-slate-400 transition-colors duration-300 group-hover:text-amber-400" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative">
        {/* Period pill */}
        <div className="period-pill">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-400/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            {exp.period}
          </span>
        </div>

        {/* Role heading */}
        <h3 className="role-title mt-4 flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {exp.role}
          <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-400" />
        </h3>

        {/* Company */}
        <p className="company-name mt-1 text-sm font-medium tracking-wide text-slate-500">
          {exp.company}
        </p>

        {/* Animated divider */}
        <div className="entry-divider mt-5 h-px w-20 origin-left bg-gradient-to-r from-amber-400/50 to-transparent" />

        {/* Highlights list */}
        <ul className="mt-5 space-y-3">
          {exp.highlights.map((h) => (
            <li
              key={h}
              className="highlight-item flex items-start gap-3 text-[15px] leading-relaxed text-slate-400"
            >
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/40" />
              <span className="transition-colors duration-200 group-hover:text-slate-300">
                {h}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Main section ───────────────────────────────────────────── */

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll-scrubbed timeline line
  useGSAPAnimations(() => {
    if (!timelineRef.current || !sectionRef.current) return;

    // Timeline progress fill — draw as you scroll
    const fill = timelineRef.current.querySelector(".timeline-fill");
    if (fill) {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          eyebrow="Experience"
          title="A timeline of shipping work"
          description="Roles where I've built production AI and full-stack systems."
        />

        <div className="relative mt-16">
          {/* Scroll-driven timeline line */}
          <div ref={timelineRef} className="absolute left-6 top-0 bottom-0 hidden w-px md:block">
            {/* Track */}
            <div className="absolute inset-0 bg-gray-800" />
            {/* Progress fill — GSAP scrubbed */}
            <div
              className="timeline-fill absolute inset-0 origin-top bg-gradient-to-b from-amber-400 via-amber-400/60 to-transparent"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {/* Experience entries */}
          <div className="space-y-16 sm:space-y-20">
            {experiences.map((exp, idx) => (
              <ExperienceEntry key={exp.company} exp={exp} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}