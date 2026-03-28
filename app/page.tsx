import { HeroShell } from "./components/hero-shell";
import { AboutShell } from "./components/about-shell";
import { WorkExperience } from "./components/work-experience";
import { FeaturedProjects } from "./components/featured-projects";
import { ProjectsGrid } from "./components/projects-grid";
import { Skills } from "./components/skills";
import { Contact } from "./components/contact";

export default function Home() {
  return (
    <main>
      <HeroShell />
      <AboutShell />
      <WorkExperience />
      <FeaturedProjects />
      <ProjectsGrid />
      <Skills />
      <Contact />
    </main>
  );
}
