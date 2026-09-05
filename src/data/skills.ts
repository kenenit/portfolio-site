import { IconName } from "@/components/icons/TechIcon";

export interface SkillItem {
  name: string;
  /** devicon slug, e.g. "react/react-original" — used when a real logo exists */
  devicon?: string;
  /** hand-drawn icon name — used when there's no official logo */
  icon?: IconName;
}

export interface SkillGroup {
  label: string;
  /** What this capability area means — shown in The Stack's detail panel. */
  description: string;
  /** 2-3 short examples of what this capability builds. */
  examples: string[];
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "FRONTEND",
    description:
      "Building interfaces that feel fast, responsive, and intentional — from layout to interaction.",
    examples: ["Marketing sites", "Dashboards", "Interactive UIs"],
    items: [
      { name: "React", devicon: "react/react-original" },
      { name: "Next.js", devicon: "nextjs/nextjs-original" },
      { name: "JavaScript", devicon: "javascript/javascript-original" },
      { name: "Tailwind CSS", devicon: "tailwindcss/tailwindcss-plain" },
    ],
  },
  {
    label: "BACKEND",
    description:
      "Building the APIs, business logic, and authentication that power an application behind the scenes.",
    examples: ["REST APIs", "Auth systems", "Server logic"],
    items: [
      { name: "Node.js", devicon: "nodejs/nodejs-original" },
      { name: "Express.js", devicon: "express/express-original" },
      { name: "Auth.js", icon: "rest" },
      { name: "REST APIs", icon: "rest" },
    ],
  },
  {
    label: "DATABASE",
    description:
      "Designing how data is structured, stored, and queried so the rest of the product can rely on it.",
    examples: ["Schema design", "Relational data", "Data pipelines"],
    items: [
      { name: "PostgreSQL", devicon: "postgresql/postgresql-original" },
      { name: "Prisma", devicon: "prisma/prisma-original" },
      { name: "SQL", icon: "sql" },
      { name: "Data Modeling", icon: "model" },
    ],
  },
  {
    label: "AI / ML",
    description:
      "Exploring how data and machine learning can make a product smarter, not just functional.",
    examples: ["Predictive models", "Data analysis", "ML experiments"],
    items: [
      { name: "Python", devicon: "python/python-original" },
      { name: "Machine Learning", icon: "ml" },
      { name: "Data Analysis", icon: "analysis" },
    ],
  },
  {
    label: "TOOLS",
    description:
      "The tools that keep a project organized, versioned, and actually shippable.",
    examples: ["Version control", "CI/CD", "Deployment"],
    items: [
      { name: "Git", devicon: "git/git-original" },
      { name: "GitHub", icon: "github" },
      { name: "Vercel", icon: "vercel" },
    ],
  },
];
