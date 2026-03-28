"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

/** Same label + Lucide arrow + bounce as hero / scroll affordances. */
export function ClickMeHint({
  className = "",
  wrapperClassName = "",
}: {
  className?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={wrapperClassName} aria-hidden>
      <span
        className={`inline-flex items-center gap-2 text-xs tracking-widest text-stone-500 uppercase ${className}`}
      >
        Click me
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          aria-hidden
        >
          <ArrowDown size={14} />
        </motion.span>
      </span>
    </div>
  );
}
