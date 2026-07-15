"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

/* ── All skills with real logos ──────────────────────────────── */

const allSkills = [
  // Row 1
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", color: "#3776AB" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", color: "#ED8B00" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", color: "#339933" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", color: "#009688" },
  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg", color: "#FF6F00" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", color: "#2496ED" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", color: "#4169E1" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", color: "#47A248" },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg", color: "#DC382D" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", color: "#F05032" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", color: "#FF9900" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", color: "#ffffff", invert: true },
  // Row 2
  { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C", color: "#1C3C3C", invert: true },
  { name: "Scikit-Learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg", color: "#F7931E" },
  { name: "HuggingFace", logo: "https://cdn.simpleicons.org/huggingface/FFD21E", color: "#FFD21E" },
  { name: "RAG", text: "RAG", color: "#A78BFA" },
  { name: "LLM Integration", text: "LLM", color: "#818CF8" },
  { name: "Prompt Engineering", text: "PE", color: "#C084FC" },
  { name: "Semantic Search", text: "SS", color: "#22D3EE" },
  { name: "AI Agents", text: "AI", color: "#F472B6" },
  { name: "NLP", text: "NLP", color: "#34D399" },
  { name: "FinBERT", text: "FB", color: "#60A5FA" },
  { name: "Transformers", text: "TF", color: "#FBBF24" },
  { name: "FAISS", text: "FS", color: "#06B6D4" },
  { name: "ChromaDB", text: "CD", color: "#E879F9" },
  { name: "Vector Embeddings", text: "VE", color: "#4ADE80" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg", color: "#CC2927" },
];

/* ── Split into two rows ────────────────────────────────────── */

const row1 = allSkills.slice(0, 14);
const row2 = allSkills.slice(14);

/* ── Skill pill component ───────────────────────────────────── */

function SkillPill({
  skill,
}: {
  skill: (typeof allSkills)[number];
}) {
  return (
    <div
      className="group relative flex shrink-0 items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-3 backdrop-blur-sm transition-all duration-400 hover:scale-105 hover:border-white/[0.12] hover:bg-white/[0.07]"
      style={{
        // @ts-expect-error CSS custom property
        "--skill-color": skill.color,
      }}
    >
      {/* Colored glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: skill.color }}
      />

      {/* Logo or text badge */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.06] p-1.5 transition-all duration-400 group-hover:bg-white/[0.1]">
        {skill.logo ? (
          <img
            src={skill.logo}
            alt={skill.name}
            className={`h-full w-full object-contain ${skill.invert ? "brightness-0 invert" : ""}`}
            loading="lazy"
          />
        ) : (
          <span
            className="text-sm font-bold"
            style={{ color: skill.color }}
          >
            {skill.text}
          </span>
        )}
      </div>

      {/* Name */}
      <span className="whitespace-nowrap text-sm font-medium text-slate-400 transition-colors duration-300 group-hover:text-white">
        {skill.name}
      </span>

      {/* Bottom color line */}
      <div
        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full opacity-0 transition-opacity duration-400 group-hover:opacity-60"
        style={{ backgroundColor: skill.color }}
      />
    </div>
  );
}

/* ── Marquee row ────────────────────────────────────────────── */

function MarqueeRow({
  items,
  direction = "left",
  speed = 30,
}: {
  items: typeof allSkills;
  direction?: "left" | "right";
  speed?: number;
}) {
  // Double the items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="group/marquee relative flex overflow-hidden py-3">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[var(--background)] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-24" />

      <div
        className="flex gap-4 hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

/* ── Main section ───────────────────────────────────────────── */

export function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="Skills"
          title="The stack I build with"
          description="Practical, production-tested tools across the AI and full-stack spectrum."
        />
      </div>

      {/* Full-bleed marquee rows */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mt-4 space-y-3"
      >
        <MarqueeRow items={row1} direction="left" speed={35} />
        <MarqueeRow items={row2} direction="right" speed={40} />
      </motion.div>
    </section>
  );
}
