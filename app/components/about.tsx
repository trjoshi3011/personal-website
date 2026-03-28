"use client";

import Image from "next/image";
import { ScrollRevealCard, ScrollRevealHeading } from "./scroll-reveal";
import { aboutContent } from "@/app/data";

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

      <div className="flex min-h-0 flex-1 flex-col justify-center py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center md:gap-14 md:text-left">
          <ScrollRevealCard>
            <div className="space-y-6 text-center md:text-left">
              {aboutContent.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-stone-600 md:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </ScrollRevealCard>

          <ScrollRevealCard>
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
