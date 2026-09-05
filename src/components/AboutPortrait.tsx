"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AboutPortraitProps {
  src?: string;
  alt: string;
  label?: string;
}

/**
 * The About photo is deliberately NOT another circular avatar — the spec
 * is explicit that Hero = polished professional portrait, About = the
 * person behind it. This is an asymmetric editorial card: slight offset
 * border, a corner label, and just enough hover motion to feel alive
 * without competing with Hero's more technical presentation.
 */
export default function AboutPortrait({ src, alt, label }: AboutPortraitProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const photoContent = src ? (
    <Image src={src} alt={alt} fill className="object-cover" />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#140f12_0_12px,#1a1317_12px_24px)] p-5 text-center font-mono text-[13px] text-muted">
      your photo here
      <br />
      (replace via `src` prop — an outdoor / candid shot works well here,
      to contrast with the Hero portrait)
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      className="relative mx-auto max-w-[360px]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Offset border sits behind the photo, slightly shifted — the
          "asymmetric crop" cue from the spec, done with layout rather
          than an actual off-axis image crop. */}
      <div className="absolute -bottom-3 -right-3 h-full w-full rounded-md border border-accent/25" />

      <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-border">
        {photoContent}
        {/* The source photo has a plain white background, which would read
            as a bright rectangle on a black page. A single flat overlay
            wasn't enough to fix that, so this integrates it two ways:
            a multiply layer darkens the white background itself, and a
            bottom-up vignette grounds the photo into the section rather
            than having it float as a hard-edged card. */}
        <div className="pointer-events-none absolute inset-0 bg-bg/35 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
      </div>

      {label && (
        <span className="absolute -bottom-3 left-4 z-10 rounded border border-accent/25 bg-bg/90 px-2.5 py-1 font-mono text-[11px] tracking-wide text-accent">
          {label}
        </span>
      )}
    </motion.div>
  );
}
