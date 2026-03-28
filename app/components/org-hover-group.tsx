"use client";

import { useMotionValue } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { OrgHoverBox } from "./org-hover-box";

const NEIGHBOR_WEIGHTS = [1, 0.38, 0.17, 0.07, 0.025] as const;

type Org = { label: string; color: string };

export function OrgHoverGroup({ organizations }: { organizations: Org[] }) {
  const orgs = organizations.slice(0, 5);
  const n = orgs.length;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const mx0 = useMotionValue(0);
  const mx1 = useMotionValue(0);
  const mx2 = useMotionValue(0);
  const mx3 = useMotionValue(0);
  const mx4 = useMotionValue(0);
  const my0 = useMotionValue(0);
  const my1 = useMotionValue(0);
  const my2 = useMotionValue(0);
  const my3 = useMotionValue(0);
  const my4 = useMotionValue(0);

  const mxs = useMemo(
    () => [mx0, mx1, mx2, mx3, mx4],
    [mx0, mx1, mx2, mx3, mx4],
  );
  const mys = useMemo(
    () => [my0, my1, my2, my3, my4],
    [my0, my1, my2, my3, my4],
  );

  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      boxRefs.current[i] = el;
    },
    [],
  );

  const resetAll = useCallback(() => {
    for (let j = 0; j < n; j++) {
      mxs[j]?.set(0);
      mys[j]?.set(0);
    }
    setActiveIndex(null);
  }, [n, mxs, mys]);

  const applyInfluence = useCallback(
    (activeIndex: number, mx: number, my: number) => {
      for (let j = 0; j < n; j++) {
        const d = Math.abs(j - activeIndex);
        const w = NEIGHBOR_WEIGHTS[d] ?? 0;
        mxs[j]?.set(mx * w);
        mys[j]?.set(my * w);
      }
    },
    [n, mxs, mys],
  );

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      for (let i = 0; i < n; i++) {
        const el = boxRefs.current[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom
        ) {
          const mx = (e.clientX - r.left) / r.width - 0.5;
          const my = (e.clientY - r.top) / r.height - 0.5;
          setActiveIndex(i);
          applyInfluence(i, mx, my);
          return;
        }
      }
      resetAll();
    },
    [n, applyInfluence, resetAll],
  );

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
      onMouseMove={handleMove}
      onMouseLeave={resetAll}
    >
      {orgs.map((org, i) => (
        <div key={org.label} ref={setRef(i)} className="inline-block">
          <OrgHoverBox
            color={org.color}
            label={org.label}
            mx={mxs[i]!}
            my={mys[i]!}
            isActive={activeIndex === i}
          />
        </div>
      ))}
    </div>
  );
}
