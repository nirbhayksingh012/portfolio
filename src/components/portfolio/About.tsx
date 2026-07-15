"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { profile, focus } from "@/lib/portfolio-data";
import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

/* ── Main section ───────────────────────────────────────────── */

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="About"
          title="Engineer obsessed with shipping intelligent systems"
          description="I design and build production-grade AI applications — from retrieval pipelines and LLM orchestration to the APIs and interfaces that bring them to users."
        />

        <div className="relative mt-8 grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* ── Left: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
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

            {/* Focus areas */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10"
            >
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                What I focus on
              </h4>
              <div className="flex flex-wrap gap-2">
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
            </motion.div>
          </motion.div>

          {/* ── Right: Lanyard ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}