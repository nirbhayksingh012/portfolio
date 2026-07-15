"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Send, Sparkles, ArrowUpRight } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SectionHeader } from "./SectionHeader";
import { profile } from "@/lib/portfolio-data";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

/* ── Social link pill ───────────────────────────────────────── */

function SocialPill({
  href,
  icon: Icon,
  label,
  color,
  external = true,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  color: string;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileHover={{ y: -3 }}
      className="group/pill relative flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 backdrop-blur-sm transition-all duration-400 hover:border-white/[0.12] hover:bg-white/[0.05]"
    >
      {/* Colored glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-2xl transition-opacity duration-500 group-hover/pill:opacity-20"
        style={{ backgroundColor: color }}
      />

      <div
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-all duration-400"
        style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}
      >
        <Icon className="h-5 w-5 transition-colors duration-300" style={{ color }} />
      </div>

      <span className="text-sm font-medium text-slate-400 transition-colors duration-300 group-hover/pill:text-white">
        {label}
      </span>

      <ArrowUpRight className="ml-auto h-4 w-4 text-slate-700 transition-all duration-300 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5 group-hover/pill:text-slate-400" />

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full opacity-0 transition-opacity duration-400 group-hover/pill:opacity-50"
        style={{ backgroundColor: color }}
      />
    </motion.a>
  );
}

/* ── Main section ───────────────────────────────────────────── */

export function Contact() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.error || "Failed to send message");
        return;
      }
      toast.success("Message sent — I'll get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something"
          description="Open to roles, collaborations, and consulting on AI products."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          {/* ── LEFT: Info + Socials ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold leading-snug text-white">
                Have an idea?
                <br />
                <span className="text-gradient">Let&apos;s make it real.</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Whether it&apos;s a startup, a side project, or a full-time role
                — I&apos;d love to hear what you&apos;re building.
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              <SocialPill
                href={`mailto:${profile.email}`}
                icon={Mail}
                label={profile.email}
                color="#EA4335"
                external={false}
              />
              <SocialPill
                href={profile.github}
                icon={Github}
                label="GitHub"
                color="#ffffff"
              />
              <SocialPill
                href={profile.linkedin}
                icon={Linkedin}
                label="LinkedIn"
                color="#0A66C2"
              />
              <div className="flex items-center gap-2 px-5 py-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </div>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <p className="text-xs text-slate-500">
                Usually replies within{" "}
                <span className="font-semibold text-slate-300">24 hours</span>
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={onSubmit}
            className="lg:col-span-3 space-y-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Name
                </span>
                <input
                  name="name"
                  required
                  maxLength={80}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-amber-400/40 focus:bg-white/[0.05] focus:ring-1 focus:ring-amber-400/20"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={160}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-amber-400/40 focus:bg-white/[0.05] focus:ring-1 focus:ring-amber-400/20"
                  placeholder="you@company.com"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={5}
                maxLength={1000}
                className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-amber-400/40 focus:bg-white/[0.05] focus:ring-1 focus:ring-amber-400/20"
                placeholder="Tell me about your project, role, or question…"
              />
            </label>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-60 sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  "Sending…"
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}