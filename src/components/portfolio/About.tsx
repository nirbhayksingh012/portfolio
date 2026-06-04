"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { focus } from "@/lib/portfolio-data";

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="About"
          title="Engineer obsessed with shipping intelligent systems"
          description="I design and build production-grade AI applications — from retrieval pipelines and LLM orchestration to the APIs and interfaces that bring them to users."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass relative overflow-hidden rounded-3xl p-8 lg:col-span-3 border-2 border-foreground"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-foreground opacity-5 blur-3xl" />
            <p className="text-lg leading-relaxed text-foreground/90">
              I'm a software engineer focused on the GenAI stack: retrieval-augmented generation,
              LLM evaluation, agentic workflows, and the production plumbing that makes them
              reliable. I love taking research-grade ideas and turning them into responsive,
              cost-efficient products.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Recently I shipped a RAG pipeline that cut token costs by 40% while keeping
              sub-2-second responses, and an NLP system processing 500+ financial news articles
              per day at 82% sentiment accuracy.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <div className="font-display text-3xl font-semibold">2+</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Years building</div>
              </div>
              <div className="h-10 w-px bg-foreground opacity-30" />
              <div>
                <div className="font-display text-3xl font-semibold">10+</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Projects shipped</div>
              </div>
              <div className="h-10 w-px bg-foreground opacity-30" />
              <div>
                <div className="font-display text-3xl font-semibold">8</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Certifications</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-3xl p-6 lg:col-span-2 border-2 border-foreground"
          >
            <div className="mb-4 text-xs uppercase tracking-[0.18em] text-foreground font-semibold">Focus areas</div>
            <ul className="grid grid-cols-2 gap-2">
              {focus.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="group flex items-center gap-2 rounded-xl border-2 border-foreground bg-background px-3 py-2.5 text-sm transition-all hover:bg-foreground hover:text-background"
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span className="font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
