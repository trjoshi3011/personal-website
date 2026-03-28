"use client";

import { ScrollRevealCard, ScrollRevealHeading } from "./scroll-reveal";
import { skills } from "@/app/data";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-8 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl text-center">
        <ScrollRevealHeading>
          <p className="text-sm tracking-widest text-stone-500 uppercase">
            Skills
          </p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-stone-900 md:text-6xl">
            What I work with
          </h2>
        </ScrollRevealHeading>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <ScrollRevealCard key={group.category}>
              <div className="rounded-2xl border border-amber-900/10 bg-white/60 p-6 transition-colors hover:border-orange-500/30 hover:bg-white/85 md:p-8">
                <h3 className="text-sm font-medium tracking-wider text-stone-500 uppercase">
                  {group.category}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-base text-stone-700 transition-colors hover:text-orange-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollRevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
