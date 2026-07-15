"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { certifications } from "@/lib/portfolio-data";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="Certifications"
          title="Continuous learning, certified"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((c, idx) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <div className="relative flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 backdrop-blur-sm transition-all duration-400 hover:border-white/[0.12] hover:bg-white/[0.05]">
                {/* Colored glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15"
                  style={{ backgroundColor: c.color }}
                />

                {/* Issuer logo */}
                <div
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] p-2 transition-all duration-400 group-hover:border-white/[0.15] group-hover:bg-white/[0.08]"
                >
                  <img
                    src={c.logo}
                    alt={c.issuer}
                    className="h-7 w-7 object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Text content */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-snug text-slate-300 transition-colors duration-300 group-hover:text-white">
                    {c.name}
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    {c.issuer}
                  </p>
                </div>

                {/* Award icon */}
                <Award
                  className="h-4 w-4 shrink-0 text-slate-700 transition-all duration-400 group-hover:text-amber-400"
                />

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-5 right-5 h-[1.5px] rounded-full opacity-0 transition-opacity duration-400 group-hover:opacity-50"
                  style={{ backgroundColor: c.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
