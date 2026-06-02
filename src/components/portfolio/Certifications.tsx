"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { certifications } from "@/lib/portfolio-data";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Certifications"
          title="Continuous learning, certified"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, idx) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="group relative flex h-full flex-col gap-3 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-ai-violet/40"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-ai-violet/20 to-ai-cyan/20 text-ai-violet">
                    <Icon className="h-4 w-4" />
                  </span>
                  <Award className="h-4 w-4 text-muted-foreground/60" />
                </div>
                <h3 className="text-sm font-semibold leading-snug">{c.name}</h3>
                <p className="mt-auto text-xs uppercase tracking-wider text-muted-foreground">{c.issuer}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
