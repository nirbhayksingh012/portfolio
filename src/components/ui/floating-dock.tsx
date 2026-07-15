"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import React, { useRef, useState } from "react";

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-gray-100/90 dark:bg-neutral-950/80 border border-gray-200/50 dark:border-neutral-800/50 backdrop-blur-md px-4 pb-3 shadow-xl",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 72, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 72, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [18, 36, 18]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [18, 36, 18]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="aspect-square rounded-full bg-gray-200/80 dark:bg-neutral-800/80 flex items-center justify-center relative hover:bg-gray-300/80 dark:hover:bg-neutral-700/85 transition-colors border border-gray-300/30 dark:border-neutral-700/30"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-900 dark:bg-neutral-900 border border-gray-800 dark:border-neutral-800 text-white border-neutral-700 absolute left-1/2 -top-10 text-[10px] w-fit shadow-lg font-sans"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center text-neutral-600 dark:text-neutral-300"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="focus:outline-none cursor-pointer">
        {content}
      </button>
    );
  }

  return (
    <Link href={href || "#"}>
      {content}
    </Link>
  );
}

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-3 right-0 flex flex-col gap-2.5 items-end"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.8,
                  transition: {
                    delay: idx * 0.03,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.03 }}
              >
                {item.onClick ? (
                  <button
                    onClick={() => {
                      item.onClick?.();
                      setOpen(false);
                    }}
                    className="h-10 w-10 rounded-full bg-gray-100/90 dark:bg-neutral-900/95 border border-gray-200 dark:border-neutral-800 flex items-center justify-center shadow-lg cursor-pointer text-neutral-600 dark:text-neutral-300"
                  >
                    <div className="h-5 w-5 flex items-center justify-center">{item.icon}</div>
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={() => setOpen(false)}
                    className="h-10 w-10 rounded-full bg-gray-100/90 dark:bg-neutral-900/95 border border-gray-200 dark:border-neutral-800 flex items-center justify-center shadow-lg text-neutral-600 dark:text-neutral-300"
                  >
                    <div className="h-5 w-5 flex items-center justify-center">{item.icon}</div>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-11 w-11 rounded-full bg-gray-100/90 dark:bg-neutral-900/95 border border-gray-250 dark:border-neutral-850 flex items-center justify-center shadow-xl text-neutral-500 dark:text-neutral-400"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5" />
      </button>
    </div>
  );
};
