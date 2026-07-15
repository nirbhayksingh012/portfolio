"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/portfolio-data";

/* ── Typewriter ───────────────────────────────────────────── */

function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    const speed = deleting ? 40 : 90;
    const t = setTimeout(() => {
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      setText(next);
      if (!deleting && next === current) setTimeout(() => setDeleting(true), 1400);
      else if (deleting && next === "") {
        setDeleting(false);
        setI((v) => v + 1);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className="text-gradient">
      {text}
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] -translate-y-[-0.05em] bg-amber-400 align-middle animate-caret" />
    </span>
  );
}

/* ── Floating particles ─────────────────────────────────────── */

function Particles() {
  const [particles, setParticles] = useState<
    { left: string; top: string; bg: string; opacity: number; animation: string }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        bg: i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#60a5fa" : "#ffffff",
        opacity: 0.08 + Math.random() * 0.12,
        animation: `heroFloat ${4 + Math.random() * 6}s ${Math.random() * 4}s ease-in-out infinite`,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full"
          style={{
            left: p.left,
            top: p.top,
            backgroundColor: p.bg,
            opacity: p.opacity,
            animation: p.animation,
          }}
        />
      ))}
    </div>
  );
}

/* ── Motion variants ────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ── Hero ─────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Keyframes for floating particles */}
      <style jsx global>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-8px) translateX(-8px); }
          75% { transform: translateY(-25px) translateX(5px); }
        }
      `}</style>

      {/* Ambient gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.07] blur-[100px]"
        style={{ background: "radial-gradient(circle, #fbbf24, #3b82f6)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-amber-500/[0.04] blur-[80px]"
      />

      {/* Particles */}
      <Particles />

      <div className="relative mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >
              <span className="text-white">Hi, I&apos;m </span>
              <span className="text-gradient">{profile.name}</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={itemVariants}
              className="mt-6 text-xl font-medium sm:text-2xl md:text-3xl"
            >
              <Typewriter words={profile.roles} />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="/resume.pdf"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/[0.2] hover:bg-white/[0.07] hover:text-white"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-600 transition-all duration-300 hover:text-white"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-2"
            >
              {[
                { href: profile.github, icon: Github, label: "GitHub" },
                { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group/social grid h-11 w-11 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-slate-500 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white hover:shadow-lg hover:shadow-white/[0.05]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              variants={itemVariants}
              className="mt-16"
            >
              <a href="#experience" className="flex flex-col items-center gap-1 text-slate-700 transition-colors duration-300 hover:text-slate-400">
                <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                <ChevronDown className="h-4 w-4 animate-float" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}