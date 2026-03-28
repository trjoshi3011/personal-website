"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { scrollNavSections } from "@/app/data";

const SECTION_IDS = scrollNavSections.map((s) => s.id);

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** True once the user has left the hero (About is entering the viewport). */
function isPastHero(): boolean {
  const about = document.getElementById("about");
  if (!about) return true;
  return about.getBoundingClientRect().top < window.innerHeight * 0.72;
}

/** Last section whose top has crossed the trigger line; null before any section hits the line. */
function pickActiveSection(): string | null {
  const trigger = window.innerHeight * 0.34;
  let last: string | null = null;
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top <= trigger) last = id;
  }
  return last;
}

export function ScrollProgressNav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNav, setShowNav] = useState(false);

  const update = useCallback(() => {
    setShowNav(isPastHero());
    setActiveId(pickActiveSection());
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    setScrollProgress(max > 0 ? window.scrollY / max : 0);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => update());
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const progressSpring = useSpring(scrollProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  useEffect(() => {
    progressSpring.set(scrollProgress);
  }, [scrollProgress, progressSpring]);

  const fillHeight = useTransform(progressSpring, (p) => `${Math.min(1, Math.max(0, p)) * 100}%`);

  return (
    <motion.nav
      initial={false}
      animate={{
        opacity: showNav ? 1 : 0,
        x: showNav ? 0 : 36,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 30,
        mass: 0.85,
      }}
      aria-hidden={!showNav}
      className="pointer-events-none fixed top-1/2 right-5 z-40 hidden w-36 -translate-y-1/2 will-change-transform md:block"
      aria-label="On this page"
    >
      <div
        className={`relative pl-3 ${showNav ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className="absolute top-0 bottom-0 left-0 w-px rounded-full bg-stone-400/35"
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-0 left-0 w-px rounded-full bg-gradient-to-b from-orange-700 via-orange-600 to-amber-500"
          style={{ height: fillHeight }}
          aria-hidden="true"
        />

        <ul className="relative flex flex-col gap-5 py-1">
          {scrollNavSections.map(({ id, label }) => {
            const isActive = activeId != null && activeId === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollToId(id)}
                  className={`group flex w-full items-center gap-2 text-left transition-colors ${
                    isActive
                      ? "text-orange-800"
                      : "text-stone-500 hover:text-stone-700"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ${
                      isActive
                        ? "scale-125 bg-orange-600 shadow-[0_0_0_3px_rgba(234,116,34,0.25)]"
                        : "bg-stone-400/70 group-hover:bg-stone-500"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`text-[11px] leading-tight tracking-wide uppercase ${
                      isActive ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
