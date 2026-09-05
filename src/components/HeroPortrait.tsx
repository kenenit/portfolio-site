"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface HeroPortraitProps {
  src?: string;
  alt: string;
  topLabel?: string;
  bottomLabel?: string;
}

const MAX_PARALLAX = 5; // px — the portrait shifts, but barely
const MAX_TILT = 3;     // deg — a light 3D tilt, not a spin

/**
 * Hero portrait: subtle cursor parallax + a gentle 3D tilt + a soft glow
 * that brightens toward the cursor, plus a slow ambient float so it has a
 * little life even before the cursor reaches it. The photo asset itself
 * already has its own hex-grid/ring styling baked in, so this component
 * stays otherwise plain — no extra CSS color overlays or second rings
 * competing with it.
 */
export default function HeroPortrait({
  src,
  alt,
  topLabel,
  bottomLabel,
}: HeroPortraitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    const glow = glowRef.current;
    if (!wrap || !tilt || !glow) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    function handleMove(e: MouseEvent) {
      const rect = wrap!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      tilt!.style.transform = `translate(${relX * MAX_PARALLAX * 2}px, ${
        relY * MAX_PARALLAX * 2
      }px) rotateX(${-relY * MAX_TILT * 2}deg) rotateY(${
        relX * MAX_TILT * 2
      }deg)`;

      // glow brightens as the cursor gets closer to the photo's center
      const dist = Math.hypot(relX, relY); // 0 at center, ~0.7 at corners
      const proximity = Math.max(0, 1 - dist / 0.7);
      glow!.style.opacity = String(0.35 + proximity * 0.4);
    }

    function reset() {
      tilt!.style.transform = "translate(0px, 0px) rotateX(0deg) rotateY(0deg)";
      glow!.style.opacity = "0.35";
    }

    // Track across the whole hero, not just while hovering the photo,
    // so the parallax feels connected to the section rather than a
    // small hotspot you have to find.
    const section = wrap.closest("section");
    section?.addEventListener("mousemove", handleMove as EventListener);
    section?.addEventListener("mouseleave", reset);
    return () => {
      section?.removeEventListener("mousemove", handleMove as EventListener);
      section?.removeEventListener("mouseleave", reset);
    };
  }, []);

  const photoContent = src ? (
    <Image src={src} alt={alt} fill className="object-cover" />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#140f12_0_12px,#1a1317_12px_24px)] p-5 text-center font-mono text-[13px] text-muted">
      your photo here
      <br />
      (replace via `src` prop)
    </div>
  );

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-square w-full max-w-[320px] animate-[about-float_8s_ease-in-out_infinite] motion-reduce:animate-none"
      style={{ perspective: "800px" }}
    >
      {topLabel && (
        <span className="absolute -top-2 right-2 z-20 rounded border border-accent/25 bg-bg/85 px-2.5 py-1 font-mono text-[11px] text-accent">
          {topLabel}
        </span>
      )}

      <div
        ref={glowRef}
        className="absolute inset-[-24px] rounded-full bg-accent/15 blur-2xl transition-opacity duration-300"
      />
      <div className="absolute inset-[-6px] rounded-full border border-accent/15" />

      <div
        ref={tiltRef}
        className="absolute inset-0 overflow-hidden rounded-full border-2 border-accent/50 shadow-[0_0_50px_rgba(232,183,200,0.15)] transition-transform duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {photoContent}
      </div>

      {bottomLabel && (
        <span className="absolute -bottom-2 left-2 z-20 rounded border border-accent/25 bg-bg/85 px-2.5 py-1 font-mono text-[11px] text-accent">
          {bottomLabel}
        </span>
      )}
    </div>
  );
}
