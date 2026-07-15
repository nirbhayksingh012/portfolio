"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

const socials = [
  { href: "https://github.com/nirbhayksingh012", icon: Github, label: "GitHub", color: "#ffffff" },
  { href: "https://www.linkedin.com/in/nirbhay-singh-5229542b2", icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
  { href: `mailto:${profile.email}`, icon: Mail, label: "Email", color: "#EA4335" },
];

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-8">
      {/* Subtle gradient glow at top */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="mx-auto max-w-5xl px-6">
        {/* Top row: Brand + Nav + Socials */}
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center sm:text-left"
          >
            <span className="font-display text-xl font-semibold text-white">
              {profile.name.split(" ")[0]}
              <span className="text-slate-500">.</span>
            </span>
            <p className="mt-1.5 max-w-[240px] text-xs leading-relaxed text-slate-600">
              Building scalable AI systems &amp; modern web experiences.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-600 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            {socials.map(({ href, icon: Icon, label, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="group/icon grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.06]"
              >
                <Icon
                  className="h-4 w-4 text-slate-600 transition-colors duration-300 group-hover/icon:text-white"
                />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-slate-700">
            © {new Date().getFullYear()} {profile.name}
            <span className="text-slate-800">·</span>
            Crafted with
            <Heart className="inline h-3 w-3 text-rose-500/60" />
          </p>

          {/* Back to top */}
          <a
            href="#top"
            className="group/top inline-flex items-center gap-1.5 text-xs text-slate-700 transition-colors duration-300 hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover/top:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
