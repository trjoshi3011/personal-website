"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { LinkedinIcon } from "./icons";
import { ScrollRevealCard, ScrollRevealHeading } from "./scroll-reveal";
import { siteConfig } from "@/app/data";

const contactLinks = [
  {
    icon: Mail,
    label: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    isLucide: true,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    isLucide: false,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-8 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl text-center">
        <ScrollRevealHeading>
          <p className="text-sm tracking-widest text-stone-500 uppercase">
            Contact
          </p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-stone-900 md:text-6xl lg:text-7xl">
            Let&apos;s work
            <br />
            together
          </h2>
        </ScrollRevealHeading>

        <ScrollRevealCard className="mt-16">
          <div className="mx-auto grid gap-3 text-left sm:grid-cols-2 lg:max-w-2xl">
            {contactLinks.map(({ icon: Icon, label, href, isLucide }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-amber-900/10 bg-white/60 px-6 py-5 transition-all hover:border-orange-500/30 hover:bg-white/85"
              >
                <div className="flex items-center gap-3">
                  <span className="text-stone-500">
                    {isLucide ? (
                      <Icon size={18} />
                    ) : (
                      <Icon size={18} />
                    )}
                  </span>
                  <span className="text-sm text-stone-700">{label}</span>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-stone-500 transition-colors group-hover:text-orange-700"
                />
              </a>
            ))}
          </div>
        </ScrollRevealCard>

        <div className="mt-28 flex flex-col items-center justify-between gap-4 border-t border-amber-900/10 pt-8 sm:flex-row">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p className="text-xs text-stone-500">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}
