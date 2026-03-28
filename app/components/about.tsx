"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { ClickMeHint } from "./click-me-hint";
import { ScrollRevealCard, ScrollRevealHeading } from "./scroll-reveal";
import { aboutContent, yearInReviewStats } from "@/app/data";

function YearInReviewStats() {
  const [idx, setIdx] = useState(0);

  const advance = useCallback(() => {
    setIdx((i) => (i + 1) % yearInReviewStats.length);
  }, []);

  const stat = yearInReviewStats[idx];

  return (
    <div className="mt-10 md:mt-12">
      <ClickMeHint
        wrapperClassName="pointer-events-none mb-2 flex justify-end md:justify-start"
      />
      <button
        type="button"
        onClick={advance}
        aria-label="Show another year-in-review stat"
        className="group relative w-full overflow-hidden rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50/80 via-amber-50/50 to-white/70 p-6 text-left shadow-md shadow-orange-900/[0.06] backdrop-blur-sm transition-all duration-300 hover:border-orange-300/70 hover:shadow-lg hover:shadow-orange-900/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f2e9] md:p-7"
      >
        <div className="absolute top-0 left-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-orange-400 to-amber-500" />
        <p className="pl-3 text-[10px] font-semibold tracking-[0.15em] text-orange-600/80 uppercase md:text-xs">
          Year in review
        </p>
        <div className="mt-3 min-h-[2.5rem] pl-3 md:min-h-[2.75rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={stat}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display text-xl font-bold tracking-tight text-stone-800 md:text-2xl"
            >
              {stat}
            </motion.p>
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
}

export function About() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col">
      <ScrollRevealHeading className="shrink-0 text-center">
        <p className="text-sm tracking-widest text-stone-500 uppercase">
          About
        </p>
        <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight text-stone-900 md:mt-3 md:text-6xl">
          A bit about me
        </h2>
      </ScrollRevealHeading>

      <div className="flex min-h-0 flex-1 flex-col justify-start py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-start md:gap-14">
          <ScrollRevealCard>
            <div className="space-y-5 text-center md:space-y-6 md:text-left">
              {aboutContent.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-stone-600 md:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
            <YearInReviewStats />
          </ScrollRevealCard>

          <ScrollRevealCard className="pt-4 md:pt-10">
            <div className="flex justify-center md:justify-end">
              <div className="relative h-80 w-80 shrink-0 overflow-hidden rounded-full border border-amber-900/15 shadow-lg shadow-stone-900/10 sm:h-96 sm:w-96 md:h-[28rem] md:w-[28rem]">
                <Image
                  src="/headshot.png"
                  alt="Tanay"
                  fill
                  className="object-cover object-[center_75%]"
                  sizes="(max-width: 768px) 320px, 448px"
                  priority
                />
              </div>
            </div>
          </ScrollRevealCard>
        </div>
      </div>
    </div>
  );
}
