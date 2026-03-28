"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

/** Section titles: translate + opacity tied to scroll progress through the viewport. */
export function ScrollRevealHeading({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "start 0.42"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/** Project / grid cards: subtler motion. */
export function ScrollRevealCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.52"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.45, 1]);
  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
