"use client";

import React, { useEffect, useState } from "react";

export const BackgroundMeteors = ({ number = 30 }: { number?: number }) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const styles = Array.from({ length: number }).map(() => ({
      top: "-20px", // start just above the screen
      left: Math.random() * 130 - 20 + "vw", // distribute across the full width plus bleed space
      animationDelay: Math.random() * (6 - 0.2) + 0.2 + "s", // stagger delays
      animationDuration: Math.floor(Math.random() * (12 - 4) + 4) + "s", // vary speed for depth
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={"bg-meteor" + idx}
          className="animate-meteor-effect-long absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-400/80 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] pointer-events-none before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[120px] before:h-[1px] before:bg-gradient-to-r before:from-slate-400/40 before:to-transparent opacity-40"
          style={style}
        />
      ))}
    </>
  );
};

export default BackgroundMeteors;
