"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/projects";
import AnimatedText from "./AnimatedText";

const RING_CONFIG = {
  1: { radius: 110, duration: 40, reverse: false },
  2: { radius: 180, duration: 60, reverse: true },
  3: { radius: 250, duration: 80, reverse: false },
} as const;

export default function SkillsUniverse() {
  const rings = [1, 2, 3] as const;

  return (
    <section
      id="skills"
      className="mx-auto max-w-[1100px] border-b border-border px-6 py-24"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-cyan"
      >
        // tech universe
      </motion.p>
      <AnimatedText
        as="h2"
        text="What I work with"
        delay={0.1}
        className="mb-16 font-display text-3xl font-bold tracking-tight"
      />

      {/*
        Structure per node, three nested elements — required because a CSS
        animation overrides an element's own inline `transform` entirely,
        so "static position" and "counter-rotation" can't live on one node:
          .orbit-ring    -> animated, spins the whole ring
            .orbit-pos   -> static inline transform, places node at its
                            angle+radius and self-cancels that angle so
                            content starts upright
              .orbit-counter -> animated, spins opposite to the ring at
                                 the same speed so the label stays upright
                                 while still orbiting with the ring
      */}
      <div className="relative mx-auto aspect-square w-full max-w-[560px]">
        <div className="absolute left-1/2 top-1/2 h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/40 bg-[radial-gradient(circle,rgba(66,200,255,0.35),rgba(66,200,255,0.05))]" />

        {rings.map((ring) => {
          const { radius, duration, reverse } = RING_CONFIG[ring];
          const ringSkills = skills.filter((s) => s.ring === ring);
          const step = 360 / ringSkills.length;

          return (
            <div
              key={ring}
              className={`orbit-ring absolute left-1/2 top-1/2 rounded-full border border-dashed border-border ${
                reverse ? "reverse" : ""
              }`}
              style={{
                width: radius * 2,
                height: radius * 2,
                animationDuration: `${duration}s`,
              }}
            >
              {ringSkills.map((skill, i) => {
                const angle = i * step;
                return (
                  <div
                    key={skill.name}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`,
                    }}
                  >
                    <div
                      className={`orbit-counter whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-cyan hover:bg-cyan/[0.08] hover:text-cyan ${
                        reverse ? "reverse" : ""
                      }`}
                      style={{ animationDuration: `${duration}s` }}
                    >
                      {skill.name}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
