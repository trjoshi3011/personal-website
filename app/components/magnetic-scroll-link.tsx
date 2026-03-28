"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useCallback, useRef } from "react";

const SPRING = { stiffness: 220, damping: 18, mass: 0.35 };

export function MagneticScrollLink() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const strength = 0.32;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <a
      ref={ref}
      href="#about"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      className="relative inline-flex cursor-pointer items-center gap-2 rounded-full px-1 py-1 text-xs tracking-widest text-stone-500 uppercase outline-none transition-colors hover:text-orange-700 focus-visible:ring-2 focus-visible:ring-orange-500/50"
      aria-label="Scroll to about section"
    >
      <motion.span
        style={{ x: springX, y: springY }}
        className="inline-flex items-center gap-2 will-change-transform"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          aria-hidden="true"
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.span>
    </a>
  );
}
