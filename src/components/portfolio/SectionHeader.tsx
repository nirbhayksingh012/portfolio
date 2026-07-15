"use client";

import { motion } from "framer-motion";

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-16 max-w-3xl text-center"
    >
      {/* Eyebrow — simple gradient text, no badge */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gradient"
      >
        {eyebrow}
      </motion.span>

      {/* Title — larger and bolder */}
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>

      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
        className="mx-auto mt-5 h-[2px] w-16 origin-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5 text-base text-slate-500 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
