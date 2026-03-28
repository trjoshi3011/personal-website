"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Snappy dot — follows the pointer closely */
const SPRING_DOT = { stiffness: 480, damping: 36, mass: 0.18 };
/** Mid ring — noticeable lag */
const SPRING_RING = { stiffness: 88, damping: 17, mass: 0.32 };
/** Wide halo — slow drift for depth */
const SPRING_HALO = { stiffness: 38, damping: 14, mass: 0.45 };

/**
 * Fine pointers only: dual-spring cursor (dot + lagging ring + faint halo).
 * Disabled when `prefers-reduced-motion` is set.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const dotX = useSpring(mx, SPRING_DOT);
  const dotY = useSpring(my, SPRING_DOT);
  const ringX = useSpring(mx, SPRING_RING);
  const ringY = useSpring(my, SPRING_RING);
  const haloX = useSpring(mx, SPRING_HALO);
  const haloY = useSpring(my, SPRING_HALO);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduce.matches);
    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    html.setAttribute("data-cursor-custom", "true");
    return () => html.removeAttribute("data-cursor-custom");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000] will-change-transform"
        style={{ x: haloX, y: haloY }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-orange-500/[0.06] blur-[2px]" />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10001] will-change-transform"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-orange-600/40 bg-gradient-to-br from-orange-500/12 to-transparent ring-1 ring-orange-500/15"
          animate={{ scale: pressed ? 0.86 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10002] will-change-transform"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-orange-600"
          animate={{ scale: pressed ? 0.65 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          style={{
            boxShadow:
              "0 0 14px rgba(234, 116, 34, 0.55), 0 0 2px rgba(30, 26, 22, 0.2)",
          }}
        />
      </motion.div>
    </>
  );
}
