"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedText from "./AnimatedText";
import { skills } from "@/data/projects";

const RADIUS = 95; // matches the SVG viewBox's sphere radius below
const MAX_TILT = 6; // degrees — kept small on purpose, this is a tilt, not a spin

/**
 * A lightweight wireframe "digital earth": one CSS radial-gradient sphere,
 * one slowly-rotating SVG grid for latitude/longitude lines, and a ring of
 * static technology nodes with thin lines back to the center. No WebGL —
 * this is the deliberate choice from the spec: the same visual quality
 * without the dependency or performance cost of Three.js.
 */
export default function DigitalEarth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const tilt = tiltRef.current;
    if (!container || !tilt) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    function handleMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      tilt!.style.transform = `rotateX(${-relY * MAX_TILT * 2}deg) rotateY(${
        relX * MAX_TILT * 2
      }deg)`;
    }

    function reset() {
      tilt!.style.transform = "rotateX(0deg) rotateY(0deg)";
    }

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", reset);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", reset);
    };
  }, []);

  const step = 360 / skills.length;

  return (
    <section
      id="skills"
      className="mx-auto max-w-[1100px] border-b border-border px-6 py-24"
    >
      <p className="reveal mb-4 font-mono text-xs uppercase tracking-[0.12em] text-cyan">
        // tech ecosystem
      </p>
      <AnimatedText
        as="h2"
        text="What I work with"
        delay={0.1}
        className="mb-16 font-display text-3xl font-bold tracking-tight"
      />

      <div
        ref={containerRef}
        className="relative mx-auto aspect-square w-full max-w-[480px]"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={tiltRef}
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Atmospheric glow */}
          <div className="absolute inset-[-18px] rounded-full bg-cyan/10 blur-3xl" />

          {/* Sphere shading — pseudo-3D via radial gradient + inset shadow, no 3D geometry needed */}
          <div
            className="absolute inset-0 rounded-full border border-cyan/20"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, rgba(66,200,255,0.14), rgba(16,20,26,0.95) 55%, rgba(8,10,13,1) 100%)",
              boxShadow:
                "inset -24px -24px 70px rgba(0,0,0,0.65), inset 10px 10px 40px rgba(66,200,255,0.05)",
            }}
          />

          {/* Wireframe grid — latitude/longitude lines, rotates slowly and continuously */}
          <div
            className="spin-ring absolute inset-0"
            style={{ animationDuration: "90s" }}
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              {/* latitude lines */}
              {[
                { y: 45, rx: 78 },
                { y: 72, rx: 92 },
                { y: 100, rx: 95 },
                { y: 128, rx: 92 },
                { y: 155, rx: 78 },
              ].map((l) => (
                <ellipse
                  key={l.y}
                  cx={100}
                  cy={l.y}
                  rx={l.rx}
                  ry={4}
                  fill="none"
                  stroke="rgba(66,200,255,0.22)"
                  strokeWidth={0.6}
                />
              ))}
              {/* longitude lines */}
              {[0, 36, 72, 108, 144].map((angle) => (
                <ellipse
                  key={angle}
                  cx={100}
                  cy={100}
                  rx={28}
                  ry={95}
                  fill="none"
                  stroke="rgba(66,200,255,0.18)"
                  strokeWidth={0.6}
                  transform={`rotate(${angle} 100 100)`}
                />
              ))}
            </svg>
          </div>

          {/* Technology nodes — fixed positions with thin connector lines to
              center, so they read as "attached to" the globe rather than
              orbiting freely around it */}
          {skills.map((skill, i) => {
            const angle = i * step;
            const isActive = hovered === skill.name;
            return (
              <div key={skill.name}>
                <div
                  className="absolute left-1/2 top-1/2 h-px origin-left transition-colors duration-200"
                  style={{
                    width: RADIUS,
                    transform: `rotate(${angle}deg)`,
                    background: isActive
                      ? "rgba(66,200,255,0.7)"
                      : "rgba(66,200,255,0.22)",
                  }}
                />
                <div
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${RADIUS}px) rotate(${-angle}deg)`,
                  }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setHovered(skill.name)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(skill.name)}
                    onBlur={() => setHovered(null)}
                    className={`whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-xs transition-colors duration-200 ${
                      isActive
                        ? "border-cyan bg-cyan/[0.12] text-cyan"
                        : "border-border bg-surface text-muted"
                    }`}
                  >
                    {skill.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
