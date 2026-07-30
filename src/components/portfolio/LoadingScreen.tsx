"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// Boot log lines — feels like a real system coming online rather than a fake spinner
const BOOT_LINES = [
  "> initializing kernel modules",
  "> mounting neural filesystem",
  "> handshake: gpu cluster ok",
  "> loading portfolio assets",
  "> compiling render graph",
  "> calibrating viewport",
];

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glitchTick, setGlitchTick] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Drive the progress counter with an organic, uneven curve
  useEffect(() => {
    if (!mounted) return;
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        setShow(false);
      }, 550); // hold at 100% so the "ready" state registers
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

  // Boot log types itself out on a fixed cadence, independent of progress jitter
  useEffect(() => {
    if (!mounted) return;
    if (visibleLines >= BOOT_LINES.length) return;
    const t = setTimeout(() => {
      setVisibleLines((v) => v + 1);
    }, 260 + Math.random() * 180);
    return () => clearTimeout(t);
  }, [visibleLines, mounted]);

  // Occasional digit glitch on the big counter — cosmetic flicker, not tied to real progress
  useEffect(() => {
    if (!mounted || progress >= 100) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchTick((t) => t + 1);
      }
    }, 180);
    return () => clearInterval(interval);
  }, [mounted, progress]);

  const displayValue = useMemo(() => {
    // Briefly show a scrambled neighbor digit during a glitch tick for a CRT-flicker feel
    if (glitchTick > 0 && progress < 100 && progress > 0) {
      const jitter = Math.random() > 0.5 ? 1 : -1;
      return Math.min(99, Math.max(0, progress + jitter));
    }
    return progress;
  }, [progress, glitchTick]);

  if (!mounted) return null;

  const getStatusMessage = () => {
    if (progress < 25) return "SYSTEM INITIALIZATION...";
    if (progress < 50) return "RESOLVING AI NEURAL PATHWAYS...";
    if (progress < 75) return "GENERATING COGNITIVE GRAPHICS...";
    if (progress < 100) return "OPTIMIZING USER VIEWPORTS...";
    return "READY FOR CONNECTION";
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#030303] text-white p-6 sm:p-12 md:p-16 select-none overflow-hidden"
        >
          {/* Ambient grid, slowly drifting rather than static */}
          <motion.div
            className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none"
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* Scanline sweep — a single soft band drifting down the screen */}
          <motion.div
            className="absolute inset-x-0 h-32 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* Static scanline texture for CRT feel */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 2px, #fff 3px)",
            }}
          />

          {/* Spot highlight radial shadow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000_90%)] pointer-events-none" />

          {/* Corner HUD brackets */}
          {[
            "top-4 left-4 border-t border-l",
            "top-4 right-4 border-t border-r",
            "bottom-4 left-4 border-b border-l",
            "bottom-4 right-4 border-b border-r",
          ].map((pos, i) => (
            <motion.div
              key={pos}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              className={`absolute h-6 w-6 border-white/40 ${pos}`}
            />
          ))}

          {/* Top Row: Branding info */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <motion.span
                className="h-2 w-2 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[10px] md:text-xs tracking-[0.3em] font-medium opacity-50 uppercase font-mono">
                NS // PORTFOLIO v2.0
              </span>
            </div>
            <div className="text-[10px] md:text-xs tracking-[0.3em] font-medium opacity-50 uppercase font-mono hidden sm:block">
              AI / ML ENGINEER
            </div>
          </motion.div>

          {/* Middle Row: Massive counter, status, boot log */}
          <div className="relative flex flex-col items-center justify-center grow">
            <div className="relative flex items-baseline font-sans font-black tracking-tighter">
              <motion.span
                key={displayValue}
                initial={{ opacity: 0.4, filter: "blur(2px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.12 }}
                className="text-[18vw] leading-none tabular-nums font-extrabold select-none bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent"
                style={{
                  textShadow:
                    progress >= 100 ? "0 0 40px rgba(255,255,255,0.35)" : "none",
                }}
              >
                {displayValue}
              </motion.span>
              <span className="text-[6vw] font-light leading-none opacity-50 text-neutral-400 select-none ml-1">
                %
              </span>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-sm">
              <div className="flex justify-between items-center w-full text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 px-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={getStatusMessage()}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getStatusMessage()}
                  </motion.span>
                </AnimatePresence>
                <span>{String(progress).padStart(3, "0")}/100</span>
              </div>

              {/* Progress bar with animated glow leader */}
              <div className="w-full h-[2px] bg-neutral-800/80 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-white shadow-[0_0_8px_#fff]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              </div>

              {/* Terminal boot log */}
              <div className="w-full font-mono text-[9px] md:text-[10px] text-neutral-500 h-20 leading-relaxed overflow-hidden">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-emerald-500/70">✓</span>
                    <span>{line}</span>
                  </motion.div>
                ))}
                {visibleLines < BOOT_LINES.length && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1.5 h-3 bg-neutral-500 align-middle ml-5"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: Metadata details */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-[9px] md:text-[10px] tracking-widest font-mono opacity-40 uppercase"
          >
            <div>EST. 2026 // ALL SYSTEMS OPERATIONAL</div>
            <div className="flex items-center gap-6">
              <span>LATENCY: ~{24 + (glitchTick % 7)}ms</span>
              <span className="hidden md:inline">LOC: [ 22.8046° N, 86.2029° E ]</span>
            </div>
          </motion.div>

          {/* Flash + wipe accent on exit, layered under the parent's own y-translate */}
          {progress >= 100 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="absolute inset-0 bg-white pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}