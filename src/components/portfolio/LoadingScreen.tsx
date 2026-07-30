"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// Fixed seeds so particle layout is stable across renders, only randomized once per mount
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 6,
  drift: (Math.random() - 0.5) * 60,
}));

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glitchTick, setGlitchTick] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Organic loading curve
  useEffect(() => {
    if (!mounted) return;
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        setShow(false);
      }, 600); // hold at 100% before exit
      return () => clearTimeout(exitTimer);
    }

    let delay = 30;
    let step = 1;

    if (progress < 25) {
      step = Math.floor(Math.random() * 3) + 2;
      delay = Math.floor(Math.random() * 20) + 15;
    } else if (progress < 65) {
      step = Math.random() > 0.55 ? 1 : 2;
      delay = Math.floor(Math.random() * 40) + 40;
    } else if (progress < 90) {
      step = Math.floor(Math.random() * 2) + 2;
      delay = Math.floor(Math.random() * 25) + 20;
    } else {
      step = 1;
      delay = Math.floor(Math.random() * 30) + 60;
    }

    const timer = setTimeout(() => {
      setProgress((prev) => Math.min(prev + step, 100));
    }, delay);

    return () => clearTimeout(timer);
  }, [progress, mounted]);

  // Occasional CRT-style digit flicker
  useEffect(() => {
    if (!mounted || progress >= 100) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.85) setGlitchTick((t) => t + 1);
    }, 180);
    return () => clearInterval(interval);
  }, [mounted, progress]);

  const displayValue = useMemo(() => {
    if (glitchTick > 0 && progress > 0 && progress < 100) {
      const jitter = Math.random() > 0.5 ? 1 : -1;
      return Math.min(99, Math.max(0, progress + jitter));
    }
    return progress;
  }, [progress, glitchTick]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303] text-white select-none overflow-hidden"
        >
          {/* Ambient grid, slowly drifting */}
          <motion.div
            className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none"
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* Rising particle field — density and speed pick up as progress climbs */}
          <div className="absolute inset-0 pointer-events-none">
            {PARTICLES.map((p) => (
              <motion.span
                key={p.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${p.left}%`,
                  bottom: "-5%",
                  width: p.size,
                  height: p.size,
                }}
                animate={{
                  y: ["0vh", "-105vh"],
                  x: [0, p.drift],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: progress >= 100 ? p.duration * 0.4 : p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Scanline sweep */}
          <motion.div
            className="absolute inset-x-0 h-32 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.05] to-transparent"
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* CRT grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 2px, #fff 3px)",
            }}
          />

          {/* Radial vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#000_92%)] pointer-events-none" />

          {/* Pulsing halo behind the counter, breathing with progress */}
          <motion.div
            className="absolute rounded-full bg-white blur-[120px] pointer-events-none"
            style={{ width: 420, height: 420 }}
            animate={{
              opacity: progress >= 100 ? 0.18 : [0.03, 0.07, 0.03],
              scale: progress >= 100 ? 1.15 : [1, 1.05, 1],
            }}
            transition={{
              duration: progress >= 100 ? 0.6 : 3,
              repeat: progress >= 100 ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />

          {/* The counter itself */}
          <div className="relative flex items-baseline font-sans font-black tracking-tighter">
            <motion.span
              key={displayValue}
              initial={{ opacity: 0.4, filter: "blur(3px)", y: 4 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.15 }}
              className="text-[20vw] leading-none tabular-nums font-extrabold bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent"
              style={{
                textShadow:
                  progress >= 100
                    ? "0 0 60px rgba(255,255,255,0.45)"
                    : "0 0 30px rgba(255,255,255,0.08)",
              }}
            >
              {displayValue}
            </motion.span>
            <motion.span
              animate={{ opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[6.5vw] font-light leading-none text-neutral-400 ml-1"
            >
              %
            </motion.span>
          </div>

          {/* Flash-wipe beat right before exit */}
          {progress >= 100 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.65, 0] }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="absolute inset-0 bg-white pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}