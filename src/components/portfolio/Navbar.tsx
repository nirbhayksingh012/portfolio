"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header className="fixed left-1/2 top-4 z-40 w-[min(1100px,calc(100%-1.5rem))] -translate-x-1/2">
      <nav
        className={cn(
          "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
          scrolled ? "glass shadow-lg" : "bg-transparent",
        )}
      >
        <a href="#top" className="group flex items-center gap-2 font-display text-sm font-semibold">
          <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-ai-violet to-ai-cyan text-white shadow-lg shadow-ai-violet/30">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">Nirbhay<span className="text-gradient">.dev</span></span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card/60 text-foreground transition-colors hover:bg-accent"
        >
          {mounted && (resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
        </button>
      </nav>
    </header>
  );
}
