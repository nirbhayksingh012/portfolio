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
          <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-foreground text-background shadow-lg shadow-foreground/30 group-hover:scale-110 transition-transform">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">Nirbhay<span className="text-gradient">.dev</span></span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-all hover:text-foreground overflow-hidden"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="grid h-9 w-9 place-items-center rounded-xl border-2 border-foreground bg-background text-foreground transition-all hover:bg-foreground hover:text-background hover:scale-110"
        >
          {mounted && (resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
        </button>
      </nav>
    </header>
  );
}
