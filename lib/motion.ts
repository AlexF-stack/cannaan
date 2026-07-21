"use client";

import { useReducedMotion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: easeOut } },
};

export const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const noMotion: Variants = {
  hidden: {},
  visible: {},
};

export function useMotionVariants() {
  const reduced = useReducedMotion();
  if (reduced) {
    return { fadeUp: noMotion, fadeIn: noMotion, stagger: noMotion, reduced: true as const };
  }
  return { fadeUp, fadeIn, stagger, reduced: false as const };
}

export function motionTransition(reduced: boolean, transition?: Transition): Transition {
  if (reduced) return { duration: 0 };
  return transition ?? { duration: 0.55, ease: easeOut };
}
