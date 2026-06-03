"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Send, Sparkles } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SectionHeader } from "./SectionHeader";
import { profile } from "@/lib/portfolio-data";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

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

        <div className="grid gap-6 lg:grid-cols-5">

          {/* ── LEFT: Personal CTA card ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden glass rounded-3xl p-7 lg:col-span-2 flex flex-col justify-between min-h-[360px]"
          >
            {/* Background decorative gradient blobs */}
            <div className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-ai-violet/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-ai-cyan/15 blur-3xl" />

            {/* Top: Big quote / headline */}
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-ai-violet/30 bg-ai-violet/10 px-3 py-1 text-xs font-medium text-ai-violet">
                <Sparkles className="h-3 w-3" /> Open to work
              </div>
              <h3 className="font-display text-2xl font-semibold leading-snug">
                Have an idea?<br />
                <span className="text-gradient">Let's make it real.</span>
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Whether it's a startup, a side project, or a full-time role — I'd love to hear what you're building and how I can help.
              </p>
            </div>

            {/* Middle: quick social pills */}
            <div className="relative mt-6 flex flex-wrap gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-all hover:border-ai-cyan/50 hover:text-ai-cyan"
              >
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-all hover:border-ai-violet/50 hover:text-ai-violet"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-all hover:border-ai-pink/50 hover:text-ai-pink"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-ai-emerald" /> {profile.location}
              </span>
            </div>

            {/* Bottom: response badge */}
            <div className="relative mt-6 flex items-center gap-2.5 rounded-2xl border border-border bg-card/40 px-4 py-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ai-emerald opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ai-emerald" />
              </span>
              <p className="text-xs text-muted-foreground">
                Usually replies within{" "}
                <span className="font-semibold text-foreground">24 hours</span>
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={onSubmit}
            className="glass space-y-4 rounded-3xl p-7 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</span>
                <input
                  name="name"
                  required
                  maxLength={80}
                  className="w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-ai-violet/60 focus:ring-2 focus:ring-ai-violet/20"
                  placeholder="nirbhay singh"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={160}
                  className="w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-ai-violet/60 focus:ring-2 focus:ring-ai-violet/20"
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                maxLength={1000}
                className="w-full resize-none rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-ai-violet/60 focus:ring-2 focus:ring-ai-violet/20"
                placeholder="Tell me about your project, role, or question…"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ai-violet to-ai-cyan px-5 py-3 text-sm font-medium text-white shadow-lg shadow-ai-violet/30 transition-all hover:shadow-xl disabled:opacity-60 sm:w-auto"
            >
              {loading ? "Sending…" : (<>Send Message <Send className="h-4 w-4" /></>)}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}