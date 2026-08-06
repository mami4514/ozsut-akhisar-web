"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.35,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-4 top-1/2 z-[60] hidden h-40 -translate-y-1/2 lg:block"
    >
      <div className="relative h-full w-px overflow-hidden rounded-full bg-[#B28A52]/20">
        <motion.div
          style={{ scaleY }}
          className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#D6B17A] via-[#B28A52] to-[#8B6840]"
        />
      </div>

      <span className="absolute -left-[3px] -top-1 h-2 w-2 rounded-full border border-[#B28A52]/50 bg-[#F8F5EF]" />

      <span className="absolute -bottom-1 -left-[3px] h-2 w-2 rounded-full border border-[#B28A52]/50 bg-[#F8F5EF]" />
    </div>
  );
}