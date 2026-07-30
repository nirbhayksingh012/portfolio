"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// One sliding column per digit — gives the counter a mechanical, odometer-style tick
function DigitColumn({ digit }: { digit: string }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: "70%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-70%", opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Organic loading curve
  useEffect(() => {
    if (!mounted) return;
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        setShow(false);
      }, 650); // hold at 100% before the wipe
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

  const digits = useMemo(() => String(progress).padStart(2, "0").split(""), [progress]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07040f] text-white select-none overflow-hidden"
        >
          {/* Aurora field — three soft blurred blobs drifting past each other */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute rounded-full blur-[110px]"
              style={{
                width: 480,
                height: 480,
                left: "10%",
                top: "15%",
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0) 70%)",
              }}
              animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full blur-[110px]"
              style={{
                width: 420,
                height: 420,
                right: "8%",
                top: "25%",
                background:
                  "radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(34,211,238,0) 70%)",
              }}
              animate={{ x: [0, -50, 30, 0], y: [0, -30, 20, 0] }}
              transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full blur-[120px]"
              style={{
                width: 440,
                height: 440,
                left: "30%",
                bottom: "5%",
                background:
                  "radial-gradient(circle, rgba(251,113,133,0.35) 0%, rgba(251,113,133,0) 70%)",
              }}
              animate={{ x: [0, 40, -40, 0], y: [0, -20, 30, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Fine grain for texture over the gradients */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 2px, #fff 3px)",
            }}
          />

          {/* Vignette to keep focus centered */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,#07040f_88%)] pointer-events-none" />

          {/* Centerpiece: counter + progress arc */}
          <div className="relative flex flex-col items-center gap-10">
            <div
              className="flex items-baseline font-sans font-bold tracking-tight text-[16vw] leading-none"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #ffffff 0%, #c9c0ff 55%, #8b7bff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {digits.map((d, i) => (
                <DigitColumn digit={d} key={i} />
              ))}
              <motion.span
                animate={{ opacity: [0.55, 0.25, 0.55] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[5.5vw] font-light ml-2 text-violet-200/70"
              >
                %
              </motion.span>
            </div>

            {/* Slim gradient progress bar with a soft glowing leader */}
            <div className="relative w-56 sm:w-72 h-[3px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #7c3aed, #22d3ee)",
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
              <motion.div
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.7)]"
                animate={{ left: `calc(${progress}% - 4px)` }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Radial pulse ping right as it completes */}
          {progress >= 100 && (
            <motion.div
              initial={{ opacity: 0.5, scale: 0 }}
              animate={{ opacity: 0, scale: 8 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute h-4 w-4 rounded-full border border-white/60 pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}