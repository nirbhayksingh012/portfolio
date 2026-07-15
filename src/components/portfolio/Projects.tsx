"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { projects } from "@/lib/portfolio-data";

export function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Production AI work, shipped"
          description="Selected systems combining LLMs, retrieval, and well-engineered backends."
        />

        <TracingBeam className="px-6">
          <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-16"
              >
                <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4 border border-gray-800">
                  Project {index + 1}
                </h2>

                {/* Project Image */}
                <div className="relative mb-6 w-full overflow-hidden rounded-xl border border-gray-800">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto block"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>

                {/* Title & Description */}
                <h3 className="font-display text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {project.blurb}
                </p>

                {/* Metrics */}
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-white">{metric.value}</span>
                      <span className="text-xs text-slate-500">{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-gray-700/50 bg-gray-800/40 px-3 py-1 text-xs text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-5 flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      <Github className="h-4 w-4" /> Code
                    </a>
                  )}
                  {project.demo && project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" /> Demo
                    </a>
                  )}
                </div>

                {/* Separator */}
                {index < projects.length - 1 && (
                  <div className="mt-12 h-px w-full bg-gray-800/60" />
                )}
              </motion.div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}