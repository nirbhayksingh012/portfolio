"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/portfolio-data";
import Image from "next/image";

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
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] -translate-y-[-0.05em] bg-foreground animate-caret align-middle" />
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:items-center md:justify-between">

          {/* ── LEFT: all text content ── */}
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
              </span>
              Available for opportunities
              <Sparkles className="h-3 w-3 text-foreground" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
            >
              Hi, I'm{" "}
              <span className="text-gradient">{profile.name.split(" ")[0]}</span>{" "}
              <span className="text-gradient-subtle">
                {profile.name.split(" ").slice(1).join(" ")}
              </span>
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
              className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="/resume.pdf"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-lg shadow-foreground/30 transition-all overflow-hidden hover:shadow-xl hover:shadow-foreground/40 hover:scale-105"
              >
                <span className="absolute inset-0 bg-foreground -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <Download className="h-4 w-4 relative z-10" /> 
                <span className="relative z-10">Download Resume</span>
              </a>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl border-2 border-foreground bg-transparent px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-all hover:bg-foreground hover:text-background hover:scale-105"
              >
                View Projects{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:scale-105"
              >
                Contact Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
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
                  className="grid h-10 w-10 place-items-center rounded-xl border-2 border-foreground bg-card/60 text-foreground backdrop-blur transition-all hover:-translate-y-1 hover:bg-foreground hover:text-background hover:shadow-lg"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: profile picture ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex shrink-0 items-center justify-center"
          >
            <div className="relative group">
              {/* Animated glow ring */}
              <span className="absolute inset-0 rounded-full bg-foreground animate-pulse opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
              {/* Black border */}
              <div className="relative rounded-full p-1 bg-foreground">
                <div className="rounded-full overflow-hidden h-52 w-52 sm:h-64 sm:w-64 md:h-72 md:w-72 bg-card ring-4 ring-background transform group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    width={288}
                    height={288}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}