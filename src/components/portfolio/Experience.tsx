"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { useRef } from "react";
import { SectionHeader } from "./SectionHeader";
import { experiences } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

/* ── Stagger container + item variants ──────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const highlightVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.35 + i * 0.07, ease: "easeOut" },
  }),
};

/* ── Timeline progress line ─────────────────────────────────── */

function TimelineProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-6 top-0 bottom-0 hidden w-px md:block">
      {/* Track */}
      <div className="absolute inset-0 bg-gray-800" />
      {/* Progress fill */}
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0 bg-gradient-to-b from-amber-400 via-amber-400/60 to-transparent"
      />
    </div>
  );
}

/* ── Single experience entry ────────────────────────────────── */

function ExperienceEntry({
  exp,
  idx,
}: {
  exp: (typeof experiences)[number];
  idx: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
      className="group relative grid grid-cols-1 gap-y-1 md:grid-cols-[48px_1fr] md:gap-x-8"
    >
      {/* ── Timeline node (desktop) ── */}
      <div className="relative hidden md:flex md:flex-col md:items-center">
        <motion.div
          variants={itemVariants}
          className="relative z-10 grid h-12 w-12 place-items-center rounded-xl border-2 border-gray-800 bg-card/80 backdrop-blur transition-colors duration-300 group-hover:border-amber-400/60"
        >
          <Briefcase className="h-5 w-5 text-slate-400 transition-colors duration-300 group-hover:text-amber-400" />
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="relative">
        {/* Period pill */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-400/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            {exp.period}
          </span>
        </motion.div>

        {/* Role heading */}
        <motion.h3
          variants={itemVariants}
          className="mt-4 flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          {exp.role}
          <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-400" />
        </motion.h3>

        {/* Company */}
        <motion.p
          variants={itemVariants}
          className="mt-1 text-sm font-medium tracking-wide text-slate-500"
        >
          {exp.company}
        </motion.p>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mt-5 h-px w-20 origin-left bg-gradient-to-r from-amber-400/50 to-transparent"
        />

        {/* Highlights list */}
        <ul className="mt-5 space-y-3">
          {exp.highlights.map((h, i) => (
            <motion.li
              key={h}
              custom={i}
              variants={highlightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-400"
            >
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/40" />
              <span className="transition-colors duration-200 group-hover:text-slate-300">
                {h}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ── Main section ───────────────────────────────────────────── */

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          eyebrow="Experience"
          title="A timeline of shipping work"
          description="Roles where I've built production AI and full-stack systems."
        />

        <div className="relative mt-16">
          {/* Scroll-driven timeline line */}
          <TimelineProgress />

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