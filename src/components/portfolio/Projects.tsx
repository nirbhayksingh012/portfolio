"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { projects } from "@/lib/portfolio-data";

export function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Production AI work, shipped"
          description="Selected systems combining LLMs, retrieval, and well-engineered backends."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-ai-violet/40 hover:shadow-2xl hover:shadow-ai-violet/10"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${p.accent}`} />
              <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-ai-violet opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />

              <h3 className="font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl border border-border bg-background/40 p-3">
                {p.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="font-display text-base font-semibold text-gradient">{m.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-xs font-medium transition-colors hover:bg-accent hover:border-ai-violet/40"
                >
                  <Github className="h-3.5 w-3.5" /> View on GitHub
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}