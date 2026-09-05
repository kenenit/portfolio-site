"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const points = [
  { label: "Learning", desc: "Frontend fundamentals" },
  { label: "Building", desc: "Full-stack projects" },
  { label: "Deploying", desc: "Real products and websites" },
  { label: "Expanding", desc: "Freelancing, real-world work, AI/ML" },
];

export default function JourneySection() {
  return (
    <section className="mx-auto max-w-[1100px] border-b border-border px-6 py-24">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-accent"
      >
        // my journey
      </motion.p>
      <AnimatedText
        as="h2"
        text="Where I'm headed"
        delay={0.1}
        className="mb-16 font-display text-3xl font-bold tracking-tight"
      />

      <div className="relative flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="absolute left-0 right-0 top-[6px] hidden h-px bg-border md:block" />
        {points.map((point, i) => (
          <motion.div
            key={point.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative flex-1 md:text-center"
          >
            <div className="relative z-10 mb-4 h-[13px] w-[13px] rounded-full border-2 border-accent bg-bg md:mx-auto" />
            <div className="mb-1.5 font-mono text-xs uppercase tracking-wide text-accent">
              {point.label}
            </div>
            <div className="max-w-[160px] text-[13px] text-muted md:mx-auto">
              {point.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
