"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import TechIcon from "./icons/TechIcon";
import { skillGroups } from "@/data/skills";

const RADIUS_PCT = 40; // % of stack circle radius, from center

export default function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nodes = useMemo(
    () =>
      skillGroups.map((group, i) => {
        const angle = (360 / skillGroups.length) * i - 90;
        const rad = (angle * Math.PI) / 180;
        return {
          group,
          x: 50 + RADIUS_PCT * Math.cos(rad),
          y: 50 + RADIUS_PCT * Math.sin(rad),
          angle,
        };
      }),
    []
  );

  const active = skillGroups[activeIndex];

  return (
    <section
      id="skills"
      className="relative mx-auto max-w-[1100px] border-b border-border px-6 py-14"
    >
      <span className="absolute -top-5 -left-5 hidden h-14 w-14 border-l border-t border-dashed border-accent/30 md:block" />

      <div className="mb-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-accent"
        >
          // my skills
        </motion.p>
        <AnimatedText
          as="h2"
          text="The Stack"
          delay={0.1}
          className="mb-3 font-display text-3xl font-bold tracking-tight"
        />
        <p className="mx-auto max-w-[620px] text-sm text-muted">
          Capability areas, not just a tech list — what I can build, and
          what supports it.
        </p>
      </div>

      {/* Desktop: radial hub + spokes, with the detail panel beside it
          instead of stacked below — keeps the whole section inside one
          viewport instead of needing a scroll. */}
      <div className="hidden lg:grid lg:grid-cols-[380px_1fr] lg:items-center lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto aspect-square w-[380px]"
        >
          <div className="absolute inset-[12%] rounded-full border border-dashed border-border-hover" />
          {/* Slow outer ring with a bright lead dot — a touch of the same
              life Hero/About already have, fully covered by reduced-motion. */}
          <div className="absolute inset-[-4%] animate-[about-orbit-spin_90s_linear_infinite] rounded-full border border-dashed border-accent/25 motion-reduce:animate-none">
            <span
              className="absolute -top-[3px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-accent"
              style={{ boxShadow: "0 0 10px rgba(232,183,200,0.9)" }}
            />
          </div>

          {nodes.map((node) => (
            <div
              key={node.group.label}
              className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-border-hover to-transparent"
              style={{
                width: `${RADIUS_PCT}%`,
                transform: `rotate(${node.angle}deg)`,
                transformOrigin: "left center",
              }}
            />
          ))}

          {/* Hub — static "FULL-STACK" mark, no more cycling pipeline
              (that concept now belongs solely to Process). A gentle glow
              pulse keeps it from feeling inert. */}
          <div
            className="absolute top-1/2 left-1/2 z-[3] flex h-[108px] w-[108px] -translate-x-1/2 -translate-y-1/2 animate-[stack-hub-pulse_4s_ease-in-out_infinite] items-center justify-center rounded-full border border-accent/50 motion-reduce:animate-none"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, rgba(232,183,200,0.22), #111011 70%)",
            }}
          >
            <span className="text-center font-display text-sm font-bold tracking-tight text-accent">
              FULL-
              <br />
              STACK
            </span>
          </div>

          {/* Category nodes */}
          {nodes.map((node, i) => (
            <div
              key={node.group.label}
              className="absolute top-0 left-0 z-[2]"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                className={`flex h-[56px] w-[56px] flex-col items-center justify-center gap-0.5 rounded-full border p-1.5 text-center font-mono text-[9px] leading-tight transition-all duration-300 ${
                  activeIndex === i
                    ? "border-accent bg-accent/[0.1] text-accent scale-[1.08] shadow-[0_0_22px_rgba(232,183,200,0.25)]"
                    : "border-border-hover bg-surface text-text hover:border-accent/60 hover:text-accent"
                }`}
              >
                {node.group.label}
              </button>
            </div>
          ))}
        </motion.div>

        {/* Detail panel — beside the circle, not below it */}
        <div>
          <motion.div
            key={active.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[10px] border border-border bg-surface p-5"
          >
            <div className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
              {active.label}
            </div>
            <p className="mb-4 max-w-[440px] text-[13.5px] leading-relaxed text-muted">
              {active.description}
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {active.examples.map((ex) => (
                <span
                  key={ex}
                  className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-text"
                >
                  {ex}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-2.5 border-t border-border pt-4">
              {active.items.map((item) => (
                <div key={item.name} className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-border bg-bg">
                    {item.devicon ? (
                      <Image
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.devicon}.svg`}
                        alt=""
                        width={15}
                        height={15}
                        unoptimized
                      />
                    ) : (
                      item.icon && (
                        <TechIcon name={item.icon} className="h-[14px] w-[14px] text-muted" />
                      )
                    )}
                  </div>
                  <span className="text-[13px]">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <p className="mt-3 font-mono text-[11px] text-muted">
            Hover or tap a node to see what it means and what it&apos;s
            built with
          </p>
        </div>
      </div>

      {/* Mobile/tablet: stacked capability list (radial math assumes real
          screen width) — same content as desktop, including the
          description and examples, no separate pipeline strip. */}
      <div className="flex flex-col gap-3 lg:hidden">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="rounded-[10px] border border-border bg-surface p-[18px_16px]"
          >
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
              {group.label}
            </div>
            <p className="mb-3.5 text-[13px] leading-relaxed text-muted">
              {group.description}
            </p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {group.examples.map((ex) => (
                <span
                  key={ex}
                  className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-text"
                >
                  {ex}
                </span>
              ))}
            </div>
            {group.items.map((item, i) => (
              <div
                key={item.name}
                className={`flex items-center gap-2.5 py-2 ${
                  i > 0 ? "border-t border-border" : "border-t border-border"
                }`}
              >
                <div className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-md border border-border bg-bg">
                  {item.devicon ? (
                    <Image
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.devicon}.svg`}
                      alt=""
                      width={16}
                      height={16}
                      unoptimized
                    />
                  ) : (
                    item.icon && (
                      <TechIcon name={item.icon} className="h-[15px] w-[15px] text-muted" />
                    )
                  )}
                </div>
                <span className="flex-1 text-[13px]">{item.name}</span>
                <span className="h-[5px] w-[5px] flex-shrink-0 rounded-full bg-accent" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
