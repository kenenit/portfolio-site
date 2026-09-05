"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/projects";
import AnimatedText from "./AnimatedText";

export default function ProjectsSection() {
  return (
    <section id="work" className="mx-auto max-w-[1100px] border-b border-border px-6 py-24">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-accent"
      >
        // selected work
      </motion.p>
      <AnimatedText
        as="h2"
        text="Things I've built"
        delay={0.1}
        className="mb-12 font-display text-3xl font-bold tracking-tight"
      />

      {projects.map((project, i) => (
        <motion.div
          key={project.number}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className={`group grid grid-cols-1 items-center gap-12 border-t border-border py-14 first:border-t-0 md:grid-cols-2 ${
            i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-surface transition-colors duration-300 group-hover:border-accent">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-sm text-muted">
                {project.name} — screenshot
              </div>
            )}
          </div>

          <div>
            <div className="mb-3 font-mono text-[13px] text-accent transition-transform duration-300 group-hover:translate-x-1">
              {project.number}
            </div>
            <h3 className="mb-2.5 font-display text-2xl font-bold transition-colors duration-300 group-hover:text-accent">
              {project.name}
            </h3>
            <p className="mb-4 text-muted">{project.description}</p>
            <div className="mb-5 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded border border-border px-2.5 py-1 font-mono text-[11px] text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-text"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href={project.href ?? "#"}
              className="inline-flex items-center gap-1 font-mono text-[13px] text-accent hover:underline"
            >
              View case study{" "}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
