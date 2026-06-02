"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { experiences } from "@/lib/portfolio-data";

export function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="Experience"
          title="A timeline of shipping work"
          description="Roles where I've built production AI and full-stack systems."
        />

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-ai-violet via-ai-cyan to-transparent md:left-1/2" />

          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-10 ${
                  idx % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className="relative pl-12 md:pl-0 md:[direction:ltr] md:px-2">
                  <span className="absolute left-0 top-1.5 grid h-8 w-8 place-items-center rounded-full border border-border bg-card shadow-lg md:left-1/2 md:-translate-x-1/2">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-ai-violet to-ai-cyan" />
                  </span>
                  <div className="glass rounded-2xl p-6">
                    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                      <Briefcase className="h-3.5 w-3.5" /> {exp.period}
                    </div>
                    <h3 className="font-display text-xl font-semibold">{exp.role}</h3>
                    <p className="text-sm text-gradient font-medium">{exp.company}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ai-cyan" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
