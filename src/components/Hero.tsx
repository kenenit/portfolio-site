"use client";

import { motion } from "framer-motion";
import Nav from "./Nav";
import Honeycomb from "./Honeycomb";
import HeroPortrait from "./HeroPortrait";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" as const },
  }),
};

// Hand-rolled word stagger for the headline (rather than the shared
// AnimatedText component) because "work." needs to stay a separate
// colored <span>, not plain text AnimatedText could split cleanly.
const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const headlineWord = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden border-b border-border">
      <Honeycomb />
      <Nav />

      <div className="relative z-10 mx-auto grid w-full max-w-[1100px] flex-1 grid-cols-1 items-center gap-10 px-6 pb-16 pt-5 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1.5 font-mono text-xs text-accent"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Available for opportunities
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={headlineContainer}
            className="mb-5 font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-[52px]"
          >
            <motion.span variants={headlineWord} style={{ display: "inline-block", marginRight: "0.28em" }}>I</motion.span>
            <motion.span variants={headlineWord} style={{ display: "inline-block", marginRight: "0.28em" }}>build</motion.span>
            <motion.span variants={headlineWord} style={{ display: "inline-block" }}>digital</motion.span>
            <br />
            <motion.span variants={headlineWord} style={{ display: "inline-block", marginRight: "0.28em" }}>experiences</motion.span>
            <motion.span variants={headlineWord} style={{ display: "inline-block", marginRight: "0.28em" }}>that</motion.span>
            <motion.span variants={headlineWord} className="text-accent" style={{ display: "inline-block" }}>work.</motion.span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeUp}
            className="mb-8 max-w-[460px] text-[17px] text-muted"
          >
            Full-stack developer — I design, build, and ship real products,
            from database to deployed interface.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.55}
            variants={fadeUp}
            className="flex gap-3"
          >
            <a
              href="#work"
              className="rounded-lg bg-gradient-to-br from-accent to-accent-soft px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(232,183,200,0.25)]"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:-translate-y-0.5 hover:border-accent"
            >
              Let&apos;s talk
            </a>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.35}
          variants={fadeUp}
        >
          <HeroPortrait
            src="/keneni-photo-pink.png"
            alt="Keneni Teha"
            topLabel="FULL-STACK"
            bottomLabel="UI / UX / CODE"
          />
        </motion.div>
      </div>
    </section>
  );
}
