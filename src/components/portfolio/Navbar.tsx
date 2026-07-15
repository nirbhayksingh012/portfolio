"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { profile } from "@/lib/portfolio-data";
import { FloatingDock, FloatingDockItem } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconTerminal2,
  IconCpu,
  IconAward,
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const dockItems: FloatingDockItem[] = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full" />,
      href: "#top",
    },
    {
      title: "About",
      icon: <IconUser className="h-full w-full" />,
      href: "#about",
    },
    {
      title: "Experience",
      icon: <IconBriefcase className="h-full w-full" />,
      href: "#experience",
    },
    {
      title: "Projects",
      icon: <IconTerminal2 className="h-full w-full" />,
      href: "#projects",
    },
    {
      title: "Skills",
      icon: <IconCpu className="h-full w-full" />,
      href: "#skills",
    },
    {
      title: "Certifications",
      icon: <IconAward className="h-full w-full" />,
      href: "#certifications",
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full" />,
      href: "#contact",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full" />,
      href: profile.github,
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full" />,
      href: profile.linkedin,
    },
    {
      title: mounted ? (resolvedTheme === "dark" ? "Light Mode" : "Dark Mode") : "Theme",
      icon: mounted && resolvedTheme === "dark" ? (
        <IconSun className="h-full w-full" />
      ) : (
        <IconMoon className="h-full w-full" />
      ),
      onClick: toggleTheme,
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-fit">
      <FloatingDock items={dockItems} />
    </div>
  );
}
