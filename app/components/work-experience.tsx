"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { workExperienceTimeline } from "@/app/data";
import { ScrollRevealCard, ScrollRevealHeading } from "./scroll-reveal";

const N = workExperienceTimeline.length;

function clampIndex(i: number) {
  return Math.max(0, Math.min(N - 1, i));
}

export function WorkExperience() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stop = workExperienceTimeline[index];

  const setFromRatio = useCallback((ratio: number) => {
    const r = Math.min(1, Math.max(0, ratio));
    const i = clampIndex(Math.round(r * (N - 1)));
    setIndex(i);
  }, []);

  const clientXToRatio = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return (clientX - rect.left) / rect.width;
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    trackRef.current?.setPointerCapture(e.pointerId);
    setFromRatio(clientXToRatio(e.clientX));
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!trackRef.current?.hasPointerCapture(e.pointerId)) return;
    setFromRatio(clientXToRatio(e.clientX));
  };

  const endDrag = (e: React.PointerEvent) => {
    if (trackRef.current?.hasPointerCapture(e.pointerId)) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const thumbLeft = N <= 1 ? "0%" : `${(index / (N - 1)) * 100}%`;

  return (
    <section
      id="experience"
      className="scroll-mt-8 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl text-center">
        <ScrollRevealHeading>
          <p className="text-sm tracking-widest text-stone-500 uppercase">
            Career
          </p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-stone-900 md:text-6xl">
            Work Experience
          </h2>
        </ScrollRevealHeading>

        <ScrollRevealCard className="mx-auto mt-16 max-w-3xl text-left">
          <div className="space-y-8 rounded-3xl border border-amber-900/10 bg-white/65 p-8 md:space-y-10 md:p-10">
            <div>
              <p className="text-center text-xs tracking-widest text-stone-500 uppercase">
                Drag the timeline
              </p>

              <div
                role="slider"
                aria-valuemin={0}
                aria-valuemax={N - 1}
                aria-valuenow={index}
                aria-label="Work experience timeline"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                    e.preventDefault();
                    setIndex((i) => clampIndex(i - 1));
                  }
                  if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                    e.preventDefault();
                    setIndex((i) => clampIndex(i + 1));
                  }
                  if (e.key === "Home") {
                    e.preventDefault();
                    setIndex(0);
                  }
                  if (e.key === "End") {
                    e.preventDefault();
                    setIndex(N - 1);
                  }
                }}
                className="mt-8 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f2e9]"
              >
                <div
                  ref={trackRef}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={endDrag}
                  onPointerLeave={endDrag}
                  className="relative flex h-11 cursor-grab touch-none items-center active:cursor-grabbing"
                >
                  <div className="h-1 w-full rounded-full bg-stone-200/90" />
                  <motion.div
                    className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-600 to-amber-500"
                    style={{ width: thumbLeft }}
                    aria-hidden="true"
                  />
                  <motion.div
                    className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-orange-600 shadow-md ring-2 ring-orange-500/30"
                    style={{ left: thumbLeft }}
                    layout
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-4 flex justify-between gap-1 text-[10px] text-stone-500 sm:text-xs">
                  {workExperienceTimeline.map((t, i) => (
                    <button
                      key={t.term}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`max-w-[4.5rem] flex-1 text-center leading-tight transition-colors sm:max-w-none ${
                        i === index
                          ? "font-semibold text-orange-800"
                          : "hover:text-stone-700"
                      }`}
                    >
                      {t.term}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={stop.logo}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative mx-auto h-16 w-full max-w-lg md:h-[4.5rem]"
              >
                <Image
                  src={stop.logo}
                  alt={stop.label}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) min(100vw, 28rem), 28rem"
                  priority={false}
                />
              </motion.div>
            </AnimatePresence>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stop.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-center text-lg font-medium text-stone-800 md:text-xl"
                >
                  {stop.label}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={stop.description}
                  role="region"
                  aria-live="polite"
                  aria-label="Role details"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="rounded-xl bg-stone-100/55 px-5 py-4 text-left md:px-6 md:py-5"
                >
                  <p className="text-sm leading-relaxed text-stone-600 md:text-base">
                    {stop.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollRevealCard>
      </div>
    </section>
  );
}
