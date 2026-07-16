"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { projects } from "@/lib/portfolio-data";
import { useGSAPAnimations, gsap } from "@/hooks/useGSAP";

/* ── Single project card ────────────────────────────────────── */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAPAnimations(() => {
    if (!cardRef.current) return;

    // Image — clip-path reveal (curtain from bottom)
    const image = cardRef.current.querySelector(".project-image");
    if (image) {
      gsap.fromTo(
        image,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Title + description — slide up with stagger
    const textEls = cardRef.current.querySelectorAll(".project-text");
    if (textEls.length) {
      gsap.fromTo(
        textEls,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Metrics — counter animation
    const metricEls = cardRef.current.querySelectorAll<HTMLElement>(".metric-value");
    metricEls.forEach((el) => {
      const finalText = el.dataset.value || el.textContent || "";
      const numericMatch = finalText.match(/[\d.]+/);

      if (numericMatch) {
        const finalNum = parseFloat(numericMatch[0]);
        const prefix = finalText.substring(0, finalText.indexOf(numericMatch[0]));
        const suffix = finalText.substring(
          finalText.indexOf(numericMatch[0]) + numericMatch[0].length
        );
        const isFloat = finalText.includes(".");

        const obj = { val: 0 };
        gsap.to(obj, {
          val: finalNum,
          duration: 1.5,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = `${prefix}${isFloat ? obj.val.toFixed(1) : Math.round(obj.val)}${suffix}`;
          },
        });
      }
    });

    // Tech pills — stagger scale-in
    const techPills = cardRef.current.querySelectorAll(".tech-pill");
    if (techPills.length) {
      gsap.fromTo(
        techPills,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.04,
          duration: 0.4,
          delay: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Links — fade in
    const links = cardRef.current.querySelectorAll(".project-link");
    if (links.length) {
      gsap.fromTo(
        links,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          delay: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={cardRef} className="mb-16">
      <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4 border border-gray-800">
        Project {index + 1}
      </h2>

      {/* Project Image — clip-path reveal */}
      <div className="project-image relative mb-6 w-full overflow-hidden rounded-xl border border-gray-800">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={800}
          className="w-full h-auto block"
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>

      {/* Title & Description */}
      <h3 className="project-text font-display text-xl font-semibold text-white">
        {project.title}
      </h3>
      <p className="project-text mt-2 text-sm leading-relaxed text-slate-400">
        {project.blurb}
      </p>

      {/* Metrics */}
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="flex items-baseline gap-1.5">
            <span
              className="metric-value text-lg font-bold text-white"
              data-value={metric.value}
            >
              {metric.value}
            </span>
            <span className="text-xs text-slate-500">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="tech-pill rounded-full border border-gray-700/50 bg-gray-800/40 px-3 py-1 text-xs text-slate-400"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-5 flex gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <Github className="h-4 w-4" /> Code
          </a>
        )}
        {project.demo && project.demo !== "#" && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <ExternalLink className="h-4 w-4" /> Demo
          </a>
        )}
      </div>

      {/* Separator */}
      {index < projects.length - 1 && (
        <div className="mt-12 h-px w-full bg-gray-800/60" />
      )}
    </div>
  );
}

/* ── Main section ───────────────────────────────────────────── */

export function Projects() {
  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Production AI work, shipped"
          description="Selected systems combining LLMs, retrieval, and well-engineered backends."
        />

        <TracingBeam className="px-6">
          <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}