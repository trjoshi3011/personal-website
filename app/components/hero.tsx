"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ClickMeHint } from "./click-me-hint";
import { GithubIcon, LinkedinIcon } from "./icons";
import { MagneticScrollLink } from "./magnetic-scroll-link";
import { OrgHoverGroup } from "./org-hover-group";
import {
  locationTicker,
  nameInLanguages,
  organizations,
  roleTicker,
  siteConfig,
} from "@/app/data";

const socialIcons = [
  { icon: GithubIcon, href: siteConfig.socials.github, label: "GitHub" },
  { icon: LinkedinIcon, href: siteConfig.socials.linkedin, label: "LinkedIn" },
];

const TYPING_MS = 75;
const DELETING_MS = 40;
const PAUSE_AFTER_FULL_MS = 2200;
const PAUSE_BEFORE_NEXT_MS = 350;

export function Hero() {
  const [locationIndex, setLocationIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [nameLangIndex, setNameLangIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLocationIndex((prev) => (prev + 1) % locationTicker.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
      });

    (async () => {
      let idx = 0;
      while (!cancelled) {
        const full = roleTicker[idx];

        for (let i = 0; i <= full.length; i++) {
          if (cancelled) return;
          setRoleText(full.slice(0, i));
          await sleep(TYPING_MS);
        }

        await sleep(PAUSE_AFTER_FULL_MS);

        for (let i = full.length; i >= 0; i--) {
          if (cancelled) return;
          setRoleText(full.slice(0, i));
          await sleep(DELETING_MS);
        }

        await sleep(PAUSE_BEFORE_NEXT_MS);
        idx = (idx + 1) % roleTicker.length;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const advanceNameLanguage = useCallback(() => {
    setNameLangIndex((i) => (i + 1) % nameInLanguages.length);
  }, []);

  const displayName = nameInLanguages[nameLangIndex];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="absolute top-2 left-0 right-0 z-10 text-center text-sm text-stone-600"
      >
        <div className="min-h-[1.25rem]">
          <AnimatePresence mode="wait">
            <motion.span
              key={locationTicker[locationIndex]}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              {locationTicker[locationIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center text-center">
        <div className="mb-12" />

        {/* Name — click cycles scripts */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center"
        >
          <ClickMeHint
            wrapperClassName="pointer-events-none mb-1 flex w-full max-w-[min(100%,20rem)] justify-end md:max-w-md"
          />
          <h1 className="font-display text-[clamp(3.5rem,12vw,11rem)] font-semibold leading-[0.9] tracking-tight text-stone-900">
            <span className="sr-only">{siteConfig.name}</span>
            <button
              type="button"
              onClick={advanceNameLanguage}
              aria-label="Show name in another language or script"
              className="m-0 inline-block min-w-[4ch] cursor-pointer border-0 bg-transparent p-0 font-inherit text-inherit leading-[0.9] tracking-tight text-stone-900 outline-none select-none focus-visible:ring-2 focus-visible:ring-orange-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f2e9] md:min-w-[5ch]"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={displayName}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline-block"
                  aria-hidden
                >
                  {displayName}
                </motion.span>
              </AnimatePresence>
            </button>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.12,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-8"
        >
          <OrgHoverGroup organizations={organizations} />
        </motion.div>

        {/* Role & tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-10 max-w-2xl"
        >
          <p className="min-h-[1.75rem] text-xl text-stone-600 md:min-h-[2rem] md:text-2xl">
            <span>{roleText}</span>
            <span
              className="ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[0.06em] animate-pulse rounded-sm bg-stone-500"
              aria-hidden="true"
            />
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone-500 md:text-lg">
            {siteConfig.tagline}
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-10 flex items-center gap-5"
        >
          {socialIcons.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-amber-900/15 bg-white/65 text-stone-500 transition-all hover:border-orange-500/40 hover:text-orange-700"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-end justify-end"
      >
        <MagneticScrollLink />
      </motion.div>
    </>
  );
}
