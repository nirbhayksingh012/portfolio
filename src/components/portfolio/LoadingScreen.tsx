"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ai-violet to-ai-cyan blur-xl opacity-60" />
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-ai-violet to-ai-cyan text-white">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                  className="block h-6 w-6 rounded-full border-2 border-white/30 border-t-white"
                />
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Initializing</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
