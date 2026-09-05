"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface PhotoFrameProps {
  src?: string;
  alt: string;
  topLabel?: string;
  bottomLabel?: string;
  parallax?: boolean;
  /** "frame" = rectangular technical frame (About section).
   *  "circle" = circular crop with a slow rotating ring, matching the
   *  reference image (Hero section). */
  shape?: "frame" | "circle";
}

export default function PhotoFrame({
  src,
  alt,
  topLabel,
  bottomLabel,
  parallax = false,
  shape = "frame",
}: PhotoFrameProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    function handleMove(e: MouseEvent) {
      const rect = wrap!.getBoundingClientRect();
      const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
      wrap!.style.transform = `translate(${relX * 14}px, ${relY * 14}px)`;
    }

    function handleLeave() {
      wrap!.style.transform = "translate(0, 0)";
    }

    const section = wrap.closest("section");
    section?.addEventListener("mousemove", handleMove as EventListener);
    section?.addEventListener("mouseleave", handleLeave);
    return () => {
      section?.removeEventListener("mousemove", handleMove as EventListener);
      section?.removeEventListener("mouseleave", handleLeave);
    };
  }, [parallax]);

  const photoContent = src ? (
    <Image src={src} alt={alt} fill className="object-cover" />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#10141a_0_12px,#151b23_12px_24px)] p-5 text-center font-mono text-[13px] text-muted">
      your photo here
      <br />
      (replace via `src` prop)
    </div>
  );

  if (shape === "circle") {
    return (
      <div
        ref={wrapRef}
        className="relative mx-auto aspect-square w-full max-w-[320px] transition-transform duration-150 ease-out"
      >
        {topLabel && (
          <span className="absolute -top-2 right-2 z-10 rounded border border-cyan/25 bg-bg/85 px-2.5 py-1 font-mono text-[11px] text-cyan">
            {topLabel}
          </span>
        )}

        {/* Two rotating dashed rings — same .orbit-ring keyframes that
            drive the Skills Universe section, reused here so the rotating-
            ring motif appears consistently across the site. */}
        <div
          className="orbit-ring absolute inset-[-22px] rounded-full border border-dashed border-cyan/20"
          style={{ animationDuration: "45s" }}
        />
        <div
          className="orbit-ring reverse absolute inset-[-44px] rounded-full border border-dashed border-border"
          style={{ animationDuration: "65s" }}
        />

        {/* Static glowing ring right at the photo edge (doesn't rotate —
            keeps a stable anchor while the two rings above spin around it) */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan/50 shadow-[0_0_50px_rgba(66,200,255,0.15)]" />

        <div className="absolute inset-0 overflow-hidden rounded-full">
          {photoContent}
        </div>

        {bottomLabel && (
          <span className="absolute -bottom-2 left-2 z-10 rounded border border-cyan/25 bg-bg/85 px-2.5 py-1 font-mono text-[11px] text-cyan">
            {bottomLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative transition-transform duration-150 ease-out">
      {topLabel && (
        <span className="absolute -top-3.5 left-5 z-10 rounded border border-cyan/25 bg-bg/85 px-2.5 py-1 font-mono text-[11px] text-cyan">
          {topLabel}
        </span>
      )}

      <div className="relative aspect-[4/5] overflow-hidden rounded border border-border bg-surface">
        <span className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-cyan/60" />
        <span className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-cyan/60" />
        {photoContent}
      </div>

      {bottomLabel && (
        <span className="absolute -bottom-3.5 right-5 z-10 rounded border border-cyan/25 bg-bg/85 px-2.5 py-1 font-mono text-[11px] text-cyan">
          {bottomLabel}
        </span>
      )}
    </div>
  );
}
