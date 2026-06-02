"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/portfolio-data";

function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    const speed = deleting ? 40 : 90;
    const t = setTimeout(() => {
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
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
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] -translate-y-[-0.05em] bg-ai-cyan animate-caret align-middle" />
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ai-emerald opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ai-emerald" />
          </span>
          Available for opportunities
          <Sparkles className="h-3 w-3 text-ai-cyan" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
        >
          Hi, I'm <span className="text-gradient">{profile.name.split(" ")[0]}</span>{" "}
          <span className="text-gradient-subtle">{profile.name.split(" ").slice(1).join(" ")}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-xl font-medium sm:text-2xl"
        >
          <Typewriter words={profile.roles} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/resume.pdf"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-ai-violet to-ai-cyan px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-ai-violet/30 transition-all hover:shadow-xl hover:shadow-ai-violet/40"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-accent"
          >
            View Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-2"
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
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 text-muted-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-ai-violet/40 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
