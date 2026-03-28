"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrollRevealCard, ScrollRevealHeading } from "./scroll-reveal";
import { featuredProjects } from "@/app/data";

export function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="scroll-mt-8 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl text-center">
        <ScrollRevealHeading>
          <p className="text-sm tracking-widest text-stone-500 uppercase">
            Featured Work
          </p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-stone-900 md:text-6xl">
            Projects
          </h2>
        </ScrollRevealHeading>

        <div className="mx-auto mt-16 max-w-5xl space-y-8 text-left">
          {featuredProjects.map((project) => (
            <ScrollRevealCard key={project.title}>
              <motion.a
                href={project.link}
                className="group block overflow-hidden rounded-3xl border border-amber-900/10 bg-white/65 transition-colors hover:border-orange-500/30 hover:bg-white/85"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div
                  className={`h-64 w-full bg-gradient-to-br ${project.color} md:h-80`}
                />

                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
                      {project.title}
                    </h3>
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-900/15 text-stone-500 transition-all group-hover:border-orange-500/40 group-hover:text-orange-700">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-600">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-amber-100/80 px-3 py-1 text-xs text-stone-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            </ScrollRevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
