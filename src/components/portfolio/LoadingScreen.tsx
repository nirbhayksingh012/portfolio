"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        setShow(false);
      }, 350); // Pause briefly at 100% to let the user see it
      return () => clearTimeout(exitTimer);
    }

    let delay = 30;
    let step = 1;

    // Organic loading curve simulation
    if (progress < 25) {
      step = Math.floor(Math.random() * 3) + 2; // Fast start (2-4% increments)
      delay = Math.floor(Math.random() * 20) + 15; // 15-35ms delay
    } else if (progress < 65) {
      step = Math.random() > 0.55 ? 1 : 2; // Slow down for simulated computations (1-2% increments)
      delay = Math.floor(Math.random() * 40) + 40; // 40-80ms delay
    } else if (progress < 90) {
      step = Math.floor(Math.random() * 2) + 2; // Speed up again (2-3% increments)
      delay = Math.floor(Math.random() * 25) + 20; // 20-45ms delay
    } else {
      step = 1; // End slowly for precision look
      delay = Math.floor(Math.random() * 30) + 60; // 60-90ms delay
    }

    const timer = setTimeout(() => {
      setProgress((prev) => Math.min(prev + step, 100));
    }, delay);

    return () => clearTimeout(timer);
  }, [progress, mounted]);

  if (!mounted) return null;

  // Change system messages based on loading milestones
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
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#030303] text-white p-6 sm:p-12 md:p-16 select-none overflow-hidden"
        >
          {/* Subtle grid background overlay */}
          <div className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none" />
          
          {/* Spot highlight radial shadow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000_90%)] pointer-events-none" />

          {/* Top Row: Branding info */}
          <div className="relative flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] md:text-xs tracking-[0.3em] font-medium opacity-50 uppercase font-mono">
                NS // PORTFOLIO v2.0
              </span>
            </div>
            <div className="text-[10px] md:text-xs tracking-[0.3em] font-medium opacity-50 uppercase font-mono hidden sm:block">
              AI / ML ENGINEER
            </div>
          </div>

          {/* Middle Row: Massive Counter and loading status bar */}
          <div className="relative flex flex-col items-center justify-center grow">
            <div className="relative flex items-baseline font-sans font-black tracking-tighter">
              <span className="text-[18vw] leading-none tabular-nums font-extrabold select-none bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
                {progress}
              </span>
              <span className="text-[6vw] font-light leading-none opacity-50 text-neutral-400 select-none ml-1">%</span>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-sm">
              <div className="flex justify-between items-center w-full text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 px-1">
                <span>{getStatusMessage()}</span>
              </div>
              
              {/* Sleek slim progress bar */}
              <div className="w-full h-[2px] bg-neutral-800/80 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-white transition-all duration-75 ease-out shadow-[0_0_8px_#fff]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Row: Metadata details */}
          <div className="relative flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-[9px] md:text-[10px] tracking-widest font-mono opacity-40 uppercase">
            <div>EST. 2026 // ALL SYSTEMS OPERATIONAL</div>
            <div className="flex items-center gap-6">
              <span>LATENCY: ~24ms</span>
              <span className="hidden md:inline">LOC: [ 22.8046° N, 86.2029° E ]</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

