// ============================================================
// SITE CONTENT — Edit everything here to make the portfolio yours
// ============================================================

export const siteConfig = {
  name: "Tanay",
  tagline:
    "I enjoy messing around with things",
  email: "trjoshi@berkeley.edu",
  socials: {
    github: "https://github.com/tanay",
    linkedin: "https://linkedin.com/in/tanay",
  },
};

/** Right-rail scroll spy + smooth-scroll targets (order = top to bottom). */
export const scrollNavSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "more-work", label: "More Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "More Work", href: "#more-work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const locationTicker = [
  "San Ramon, CA",
  "Berkeley, CA",
  "Seattle, WA",
  "Pune, MH",
];

export const roleTicker = [
  "Student at UC Berkeley",
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Business Intelligence Engineer"
];

export const organizations = [
  { label: "Amazon", color: "#FF9900" },
  { label: "Adobe", color: "#FF0000" },
  { label: "UN", color: "#009EDB" },
  { label: "Cal", color: "#FDB515" },
  { label: "Gia", color: "#efbbcc" },
];

export const aboutContent = {
  paragraphs: [
    "I'm a software engineer with a passion for crafting elegant solutions to complex problems. With experience spanning full-stack development, system design, and creative coding, I bring a unique perspective to every project I take on.",
    "When I'm not writing code, you'll find me exploring new technologies, contributing to open source, or designing interfaces that push the boundaries of what's possible on the web.",
  ],
};

/** Timeline stops for the Work Experience slider (left → right = chronological). */
export const workExperienceTimeline = [
  {
    term: "Fall 2023",
    label: "Started at Berkeley",
    logo: "/work/berkeley.png",
    description:
      "Started at UC Berkeley, building fundamentals in CS and data while joining student orgs and early project teams. Focused on strong engineering habits, collaboration, and exploring where software meets real-world impact.",
  },
  {
    term: "Spring 2024",
    label: "Technical Consultant at Udemy",
    logo: "/work/udemy.png",
    description:
      "Partnered with course teams and stakeholders on technical scoping and delivery. Helped translate product goals into concrete implementation plans, debug integration issues, and improve the learner experience through iterative fixes.",
  },
  {
    term: "Summer 2024",
    label: "Software Engineer Intern at Gia",
    logo: "/work/gia.png",
    description:
      "Shipped features across the stack in a fast-moving environment. Owned small end-to-end slices of work—from API changes to UI polish—while participating in code review, testing, and release cadence with the team.",
  },
  {
    term: "Fall 2024",
    label: "Technical Consultant at Kaplan",
    logo: "/work/kaplan.png",
    description:
      "Advised on technical approaches for education products and internal tooling. Worked cross-functionally to clarify requirements, document tradeoffs, and support stable rollouts alongside engineering and program leads.",
  },
  {
    term: "Spring 2025",
    label: "Software Engineer at United Nations",
    logo: "/work/un.png",
    description:
      "Built and maintained software supporting international programs and operations. Emphasized reliability, accessibility for global users, and clear handoffs with subject-matter experts and distributed collaborators.",
  },
  {
    term: "Summer 2025",
    label: "Data Scientist at Adobe",
    logo: "/work/adobe.png",
    description:
      "Applied statistical and ML methods to product data problems: exploratory analysis, metric design, and modeling pipelines. Communicated findings to partners and helped turn insights into actionable product and engineering decisions.",
  },
  {
    term: "Summer 2026",
    label: "Amazon BIE intern",
    logo: "/work/amazon.png",
    description:
      "Business Intelligence Engineering internship focused on data pipelines, SQL/analytics at scale, and dashboards that drive operations. Partnered with analysts and PMs to define KPIs, automate reporting, and validate data quality.",
  },
] as const;

export const featuredProjects = [
  {
    title: "Project Atlas",
    description:
      "A real-time collaborative platform for distributed teams, featuring live document editing, video conferencing, and integrated project management.",
    tags: ["React", "Node.js", "WebSocket", "PostgreSQL"],
    link: "#",
    color: "from-amber-200/80 to-orange-100/70",
  },
  {
    title: "Synthwave",
    description:
      "An AI-powered music generation tool that creates unique ambient soundscapes. Built with a custom ML pipeline and a sleek, immersive frontend.",
    tags: ["Python", "TensorFlow", "Next.js", "WebAudio API"],
    link: "#",
    color: "from-orange-200/80 to-amber-100/70",
  },
  {
    title: "Terraform",
    description:
      "A procedural terrain generator with real-time rendering. Explore infinite, dynamically generated worlds with realistic biome transitions.",
    tags: ["Three.js", "Rust", "WASM", "GLSL"],
    link: "#",
    color: "from-yellow-200/80 to-orange-100/70",
  },
];

export const moreProjects = [
  {
    title: "Pixel",
    description: "A minimalist image editor with layer support and export tools.",
    tags: ["TypeScript", "Canvas API"],
    link: "#",
  },
  {
    title: "Relay",
    description: "End-to-end encrypted messaging with ephemeral channels.",
    tags: ["Go", "React Native"],
    link: "#",
  },
  {
    title: "Chronicle",
    description: "A markdown-first blogging platform with built-in analytics.",
    tags: ["Next.js", "MDX"],
    link: "#",
  },
  {
    title: "Flux",
    description: "Real-time data pipeline visualization and monitoring dashboard.",
    tags: ["D3.js", "Kafka"],
    link: "#",
  },
  {
    title: "Orbit",
    description: "Task management CLI with natural-language time parsing.",
    tags: ["Rust", "SQLite"],
    link: "#",
  },
  {
    title: "Prism",
    description: "Design token manager that syncs Figma variables to code.",
    tags: ["Figma API", "Node.js"],
    link: "#",
  },
];

export const skills = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "AWS", "CI/CD", "Git", "Linux", "Terraform"],
  },
  {
    category: "Design",
    items: [
      "Figma",
      "UI/UX Design",
      "Responsive Design",
      "Design Systems",
      "Prototyping",
    ],
  },
];
