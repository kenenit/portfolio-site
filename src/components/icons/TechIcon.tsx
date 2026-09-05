export type IconName =
  | "sql"
  | "model"
  | "ml"
  | "analysis"
  | "rest"
  | "github"
  | "vercel"
  | "terminal";

/**
 * Small set of hand-drawn line icons for concepts that don't have an
 * official brand logo (SQL, data modeling, etc). Real technologies
 * (React, Node.js, PostgreSQL...) use their actual logos via devicon
 * instead — see SkillsSection.tsx.
 */
export default function TechIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.5,
    className,
  };

  switch (name) {
    case "sql":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="5" rx="7" ry="2.5" />
          <path d="M5 5v14c0 1.4 3 2.5 7 2.5s7-1.1 7-2.5V5" />
        </svg>
      );
    case "model":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "ml":
      return (
        <svg {...common}>
          <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.5A3 3 0 0 0 7 16a3 3 0 0 0 2 2h6a3 3 0 0 0 2-2 3 3 0 0 0 2-3.5A3 3 0 0 0 18 7a3 3 0 0 0-3-3 2.9 2.9 0 0 0-3 1 2.9 2.9 0 0 0-3-1z" />
        </svg>
      );
    case "analysis":
      return (
        <svg {...common}>
          <path d="M4 20V10M10 20V4M16 20v-7M22 20V13" />
        </svg>
      );
    case "rest":
      return (
        <svg {...common}>
          <path d="M8 3a3 3 0 0 0-3 3v2a2 2 0 0 1-2 2 2 2 0 0 1 2 2v2a3 3 0 0 0 3 3M16 3a3 3 0 0 1 3 3v2a2 2 0 0 0 2 2 2 2 0 0 0-2 2v2a3 3 0 0 1-3 3" />
        </svg>
      );
    case "terminal":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 9l3 3-3 3M13 15h4" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2z" />
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 3l10 18H2z" />
        </svg>
      );
    default:
      return null;
  }
}
