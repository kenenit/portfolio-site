"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const steps = [
  { num: "01", title: "Understand", desc: "Understand the problem before writing code." },
  { num: "02", title: "Shape", desc: "Turn the idea into a clear user experience." },
  { num: "03", title: "Build", desc: "Develop the interface, backend, and data layer." },
  { num: "04", title: "Validate", desc: "Test, refine, and fix what doesn't work." },
  { num: "05", title: "Ship", desc: "Deploy the product into the real world." },
  { num: "06", title: "Iterate", desc: "Learn from the result and improve it." },
];

export default function ProcessSection() {
  return (
    <section className="relative mx-auto max-w-[1100px] border-b border-border px-6 py-14">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-accent"
      >
        // how i build
      </motion.p>
      <AnimatedText
        as="h2"
        text="Process"
        delay={0.1}
        className="mb-8 font-display text-3xl font-bold tracking-tight"
      />

      <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="process-step relative border-b border-r border-border p-6"
          >
            <div className="process-ghost-num mb-3 font-display text-[38px] font-bold leading-none">
              {step.num}
            </div>
            <h4 className="mb-1.5 font-display text-base font-bold">
              {step.title}
            </h4>
            <p className="text-[13px] leading-relaxed text-muted">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}