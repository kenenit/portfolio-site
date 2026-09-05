/**
 * Generic "developer at a desk" illustration for the About section —
 * hand-drawn as inline SVG line-art, matching the minimal style already
 * established by TechIcon.tsx (single accent stroke color, no photoreal
 * detail) rather than a stock photo/illustration, so it stays visually
 * consistent with the rest of the site and carries no licensing question.
 */
export default function AboutIllustration({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* desk */}
      <line
        x1="30"
        y1="146"
        x2="170"
        y2="146"
        stroke="#504045"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="146"
        x2="42"
        y2="158"
        stroke="#504045"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="158"
        y1="146"
        x2="158"
        y2="158"
        stroke="#504045"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* seated figure — simplified, no facial detail (generic on purpose) */}
      <circle cx="100" cy="70" r="14" stroke="#e8b7c8" strokeWidth="2" />
      <path
        d="M74 118c0-16 11.6-29 26-29s26 13 26 29"
        stroke="#e8b7c8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M84 100l-9 18M116 100l9 18"
        stroke="#e8b7c8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* laptop */}
      <rect
        x="76"
        y="108"
        width="48"
        height="30"
        rx="3"
        stroke="#f5f2f0"
        strokeWidth="2"
      />
      <path
        d="M70 138h60l-4 8H74l-4-8z"
        stroke="#f5f2f0"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M86 118l-6 6 6 6M114 118l6 6-6 6M102 116l-4 16"
        stroke="#e8b7c8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* coffee mug */}
      <path
        d="M40 128h14v12a7 7 0 0 1-7 7 7 7 0 0 1-7-7v-12z"
        stroke="#9a9698"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M54 131h3a4 4 0 0 1 0 8h-3"
        stroke="#9a9698"
        strokeWidth="1.5"
      />
      <path
        d="M44 122c1-2 3-2 3-4M50 122c1-2 3-2 3-4"
        stroke="#9a9698"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* floating code symbols */}
      <text
        x="34"
        y="60"
        fontFamily="monospace"
        fontSize="13"
        fill="#e8b7c8"
        opacity="0.55"
      >
        {"</>"}
      </text>
      <text
        x="148"
        y="52"
        fontFamily="monospace"
        fontSize="11"
        fill="#f3c4d5"
        opacity="0.45"
      >
        {"{ }"}
      </text>
      <circle cx="158" cy="90" r="2" fill="#e8b7c8" opacity="0.6" />
      <circle cx="30" cy="95" r="1.6" fill="#e8b7c8" opacity="0.5" />
      <circle cx="150" cy="115" r="1.6" fill="#e8b7c8" opacity="0.4" />
    </svg>
  );
}
