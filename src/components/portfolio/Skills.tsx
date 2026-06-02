"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { skillGroups } from "@/lib/portfolio-data";

export function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Skills"
          title="The stack I build with"
          description="Practical, production-tested tools across the AI and full-stack spectrum."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, idx) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-ai-cyan/40"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-ai-cyan opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" />
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-ai-violet/20 to-ai-cyan/20 text-ai-cyan">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{g.label}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-md border border-border bg-background/50 px-2.5 py-1 text-xs font-medium text-foreground/80 transition-colors hover:border-ai-violet/40 hover:text-foreground"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
