"use client";

import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const SPRING = { stiffness: 420, damping: 22, mass: 0.45 };

type Props = {
  color: string;
  label: string;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  /** True when the pointer is over this box — morphs pill → circle */
  isActive: boolean;
};

export function OrgHoverBox({ color, label, mx, my, isActive }: Props) {
  const springX = useSpring(mx, SPRING);
  const springY = useSpring(my, SPRING);

  const rotateX = useTransform(springY, [-0.5, 0.5], [28, -28]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-28, 28]);
  const rotateZ = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  const tx = useTransform(springX, [-0.5, 0.5], [22, -22]);
  const ty = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const scale = useTransform([springX, springY], ([x, y]) => {
    const ax = typeof x === "number" ? x : 0;
    const ay = typeof y === "number" ? y : 0;
    const m = Math.sqrt(ax * ax + ay * ay);
    return 0.94 + Math.min(m * 1.15, 0.14);
  });

  return (
    <div className="perspective-[600px]">
      <motion.div
        title={label}
        style={{
          backgroundColor: color,
          rotateX,
          rotateY,
          rotateZ,
          x: tx,
          y: ty,
          scale,
          transformStyle: "preserve-3d",
        }}
        className={`relative cursor-pointer shadow-md shadow-stone-900/20 ring-1 ring-black/10 transition-[width,height,border-radius] duration-300 ease-out will-change-transform ${
          isActive
            ? "h-16 w-16 rounded-full"
            : "h-16 w-24 rounded-2xl"
        }`}
      />
    </div>
  );
}
