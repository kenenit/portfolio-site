"use client";

import { motion } from "framer-motion";
import { ArrowRightLeft, Sparkles, Layers, Rocket } from "lucide-react";
import AnimatedText from "./AnimatedText";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const services = [
  {
    icon: ArrowRightLeft,
    title: "Build a Web Product",
    description:
      "From a blank page to a live, working web application — interface, backend, and the systems that connect them.",
  },
  {
    icon: Sparkles,
    title: "Design a Digital Experience",
    description:
      "Interfaces that are clear, intentional, and considered — not just functional, but genuinely good to use.",
  },
  {
    icon: Layers,
    title: "Build the Backend",
    description:
      "APIs, databases, and authentication — the infrastructure a product needs to actually work.",
  },
  {
    icon: Rocket,
    title: "Turn an Idea Into a Working Product",
    description:
      "Taking a rough concept and shaping it into something real — scoped, built, and shipped.",
  },
];

export default function ServicesSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-20">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-accent"
        >
          // what i can do
        </motion.p>
        <AnimatedText
          as="h2"
          text="Where I Can Help"
          delay={0.1}
          className="mb-10 font-display text-2xl font-bold tracking-tight"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-[10px] border border-border bg-surface p-5 transition-colors duration-300 hover:border-accent"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg transition-colors duration-300 group-hover:border-accent">
                  <Icon
                    size={17}
                    className="text-accent transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="mb-2 font-display text-[15px] font-semibold">
                  {s.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-muted">
                  {s.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
