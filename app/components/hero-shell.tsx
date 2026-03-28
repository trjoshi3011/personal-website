import { Hero } from "./hero";

export function HeroShell() {
  return (
    <section
      id="hero"
      className="hero-grid-bg relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pt-8 pb-12 md:px-12"
    >
      <Hero />
    </section>
  );
}
