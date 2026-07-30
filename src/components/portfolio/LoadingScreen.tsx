"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BackgroundMeteors } from "@/components/portfolio/BackgroundMeteors";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extremely fast, organic loading curve (~800ms - 1s total)
  useEffect(() => {
    if (!mounted) return;
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        setShow(false);
      }, 150); // Snappy hold at 100%
      return () => clearTimeout(exitTimer);
    }

    let delay = 15;
    let step = 1;

    if (progress < 85) {
      step = Math.floor(Math.random() * 3) + 2; // Increments of 2-4%
      delay = Math.floor(Math.random() * 10) + 12; // 12-22ms delay
    } else {
      step = Math.random() > 0.4 ? 1 : 2; // Increments of 1-2% near completion
      delay = Math.floor(Math.random() * 20) + 15; // 15-35ms delay
    }

    const timer = setTimeout(() => {
      setProgress((prev) => Math.min(prev + step, 100));
    }, delay);

    return () => clearTimeout(timer);
  }, [progress, mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white select-none overflow-hidden"
        >
          {/* Drifting meteors background */}
          <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden opacity-30">
            <BackgroundMeteors number={15} />
          </div>

          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 2px, #fff 3px)",
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,#000000_85%)] pointer-events-none" />

          {/* Centerpiece: Simple, glowing percentage count */}
          <div className="relative flex flex-col items-center gap-6 z-[2]">
            <div className="flex items-baseline font-sans font-extrabold tracking-tight text-[15vw] sm:text-[12vw] leading-none text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              <span className="tabular-nums select-none bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent">
                {progress}
              </span>
              <motion.span
                animate={{ opacity: [0.6, 0.3, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-[5vw] sm:text-[4vw] font-light ml-2 text-white/50"
              >
                %
              </motion.span>
            </div>
          </div>

          {/* Radial pulse ping on completion */}
          {progress >= 100 && (
            <motion.div
              initial={{ opacity: 0.4, scale: 0 }}
              animate={{ opacity: 0, scale: 6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute h-4 w-4 rounded-full border border-white/40 pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}