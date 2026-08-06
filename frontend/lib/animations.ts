import type { Variants } from "motion/react";

export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
    },
  },
};

export const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -48,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: easeOutExpo,
    },
  },
};

export const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 48,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: easeOutExpo,
    },
  },
};

export const fadeScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: easeOutExpo,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

export const fastStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const cardHover = {
  y: -6,
  transition: {
    duration: 0.25,
    ease: easeOutExpo,
  },
};

export const buttonHover = {
  y: -2,
  scale: 1.01,
  transition: {
    duration: 0.2,
    ease: easeOutExpo,
  },
};

export const buttonTap = {
  scale: 0.98,
};