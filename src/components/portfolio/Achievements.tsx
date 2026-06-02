"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { SectionHeader } from "./SectionHeader";
import { achievements } from "@/lib/portfolio-data";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, to, mv]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-gradient sm:text-5xl">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function Achievements() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Achievements" title="Numbers that ship" />
        <div className="glass grid grid-cols-2 gap-6 rounded-3xl p-8 sm:grid-cols-3 lg:grid-cols-5">
          {achievements.map((a, idx) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="text-center"
            >
              <Counter to={a.value} suffix={a.suffix} />
              <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{a.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
