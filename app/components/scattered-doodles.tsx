/**
 * Server component — decorative PNGs for the About section only (plain `<img>` for stable SSR).
 * Right-side placements removed so they don’t sit under the fixed scroll rail (z-index clash).
 */

type Placement = {
  src: string;
  className: string;
};

const DOODLES = {
  camera: "/doodles/camera.png",
  stats: "/doodles/stats.png",
  laptop: "/doodles/laptop.png",
  earth: "/doodles/earth.png",
} as const;

const PLACEMENTS: Placement[] = [
  {
    src: DOODLES.camera,
    className:
      "absolute top-[28%] left-[2%] h-14 w-14 rotate-[-5deg] opacity-90 md:left-[5%] md:h-16 md:w-16",
  },
  {
    src: DOODLES.stats,
    className:
      "absolute bottom-[18%] left-[3%] h-11 w-11 rotate-[4deg] opacity-[0.85] md:bottom-[20%] md:left-[8%] md:h-12 md:w-12",
  },
  {
    src: DOODLES.laptop,
    className:
      "absolute top-[58%] left-[6%] h-10 w-10 rotate-[6deg] opacity-[0.88] md:left-[10%] md:h-11 md:w-11",
  },
  {
    src: DOODLES.earth,
    className:
      "absolute top-[14%] left-[1%] h-[3.5rem] w-[3.5rem] rotate-[10deg] opacity-[0.87] md:left-[4%] md:h-16 md:w-16",
  },
];

export function ScatteredDoodles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {PLACEMENTS.map((p, i) => (
        <div key={`about-doodle-${i}`} className={p.className}>
          {/* eslint-disable-next-line @next/next/no-img-element -- static decorative assets */}
          <img
            src={p.src}
            alt=""
            width={96}
            height={96}
            className="h-full w-full object-contain drop-shadow-sm"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </div>
      ))}
    </div>
  );
}
