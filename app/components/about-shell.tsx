import { ScatteredDoodles } from "./scattered-doodles";
import { About } from "./about";

export function AboutShell() {
  return (
    <section
      id="about"
      className="relative flex min-h-svh scroll-mt-8 flex-col overflow-hidden px-6 pt-6 pb-16 md:px-12 md:pt-8 md:pb-20"
    >
      <ScatteredDoodles />
      <About />
    </section>
  );
}
