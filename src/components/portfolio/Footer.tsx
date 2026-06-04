import { Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="relative border-t-2 border-foreground py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-foreground text-background">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          © {new Date().getFullYear()} {profile.name}. Crafted with care.
        </div>
        <div className="flex items-center gap-2">
          {[
            { href: profile.github, icon: Github, label: "GitHub" },
            { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
            { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-lg border-2 border-foreground text-foreground transition-all hover:bg-foreground hover:text-background">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
