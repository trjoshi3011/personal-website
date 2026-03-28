"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrollRevealCard, ScrollRevealHeading } from "./scroll-reveal";
import { moreProjects } from "@/app/data";

export function ProjectsGrid() {
  return (
    <section
      id="more-work"
      className="scroll-mt-8 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl text-center">
        <ScrollRevealHeading>
          <p className="text-sm tracking-widest text-stone-500 uppercase">
            More Work
          </p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-stone-900 md:text-6xl">
            Take a scroll
          </h2>
        </ScrollRevealHeading>

        <div className="mx-auto mt-16 grid max-w-6xl gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((project) => (
            <ScrollRevealCard key={project.title}>
              <motion.a
                href={project.link}
                className="group flex h-full flex-col justify-between rounded-2xl border border-amber-900/10 bg-white/60 p-6 transition-colors hover:border-orange-500/30 hover:bg-white/85 md:p-8"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold tracking-tight text-stone-900">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={16}
                      className="text-stone-500 transition-colors group-hover:text-orange-700"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    {project.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-amber-100/80 px-2.5 py-0.5 text-xs text-stone-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            </ScrollRevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
