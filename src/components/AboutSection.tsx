"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// Real, verifiable numbers only — no invented client/project counts.
const stats = [
  { value: "3", label: "Live Projects" },
  { value: "15+", label: "Technologies" },
  { value: "2027", label: "Expected Grad." },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1100px] border-b border-border px-6 py-24"
    >
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Text column */}
        <div className="order-1">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-4 font-mono text-xs uppercase tracking-[0.13em] text-accent"
          >
            // about
          </motion.p>

          <AnimatedText
            as="h2"
            text="Who I am"
            delay={0.1}
            className="mb-7 font-display text-3xl font-bold tracking-tight sm:text-4xl"
          />

          <div className="mb-8 max-w-[560px]">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mb-[18px] text-[16.5px] leading-[1.75] text-muted"
            >
              I&apos;m Keneni — a{" "}
              <strong className="font-medium text-accent">
                Computer Science student
              </strong>{" "}
              and{" "}
              <strong className="font-medium text-accent">
                full-stack developer
              </strong>{" "}
              who enjoys turning ideas into{" "}
              <strong className="font-medium text-accent">
                digital products
              </strong>{" "}
              people can actually use.
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mb-[18px] text-[16.5px] leading-[1.75] text-muted"
            >
              I started with frontend development and gradually moved
              toward building complete products — working across
              interfaces, APIs, databases, and deployment. I care about
              how things look, but I also care about how they work.
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="text-[16.5px] leading-[1.75] text-muted"
            >
              Currently, I&apos;m continuing to grow as a full-stack
              developer while exploring AI/ML and building real-world
              projects.
            </motion.p>
          </div>

          <div className="grid max-w-[460px] grid-cols-3 gap-2.5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.42 + i * 0.08 }}
                className="rounded-[10px] border border-border bg-white/[0.015] px-3 py-3.5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
              >
                <div className="font-display text-xl font-bold text-accent">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[10.5px] text-muted">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="order-2 flex justify-center lg:order-2"
        >
          {/* The photo already has its own glow ring + dashed orbit dots
              baked in, so this wrapper only adds the ambient float — no
              extra CSS ring/glow layered on top, which would just double
              up on what's already in the image. */}
          <div className="relative h-[220px] w-[220px] animate-[about-float_7s_ease-in-out_infinite] overflow-hidden rounded-full motion-reduce:animate-none sm:h-[300px] sm:w-[300px] lg:h-[340px] lg:w-[340px]">
            <Image
              src="/about-photo.png"
              alt="Illustration of a developer working at a desk"
              fill
              sizes="340px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
