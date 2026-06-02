"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent — I'll get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    }, 900);
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
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-7 lg:col-span-2"
          >
            <h3 className="font-display text-lg font-semibold">Get in touch</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Prefer email? Reach me directly — I usually reply within a day.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-ai-cyan"><Mail className="h-4 w-4" /></span>
                <a href={`mailto:${profile.email}`} className="hover:text-foreground">{profile.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-ai-violet"><Github className="h-4 w-4" /></span>
                <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-foreground">github.com/nirbhaysingh</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-ai-pink"><Linkedin className="h-4 w-4" /></span>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">linkedin.com/in/nirbhaysingh</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-ai-emerald"><MapPin className="h-4 w-4" /></span>
                <span className="text-muted-foreground">{profile.location}</span>
              </li>
            </ul>
          </motion.div>

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
                  placeholder="Jane Doe"
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
