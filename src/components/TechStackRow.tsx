"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TechIcon from "./icons/TechIcon";
import { skillGroups } from "@/data/skills";

const allSkills = skillGroups.flatMap((g) => g.items);
// Duplicated once so the CSS marquee can loop seamlessly.
const row = [...allSkills, ...allSkills];

export default function TechStackRow() {
  return (
    <section className="border-b border-border py-10">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-center font-mono text-xs uppercase tracking-[0.12em] text-muted"
      >
        Technologies I work with
      </motion.p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 motion-reduce:animate-none">
          {row.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex flex-shrink-0 items-center gap-2.5 opacity-70 transition-opacity hover:opacity-100"
            >
              <div className="flex h-7 w-7 items-center justify-center">
                {item.devicon ? (
                  <Image
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.devicon}.svg`}
                    alt=""
                    width={22}
                    height={22}
                    unoptimized
                  />
                ) : (
                  item.icon && (
                    <TechIcon name={item.icon} className="h-5 w-5 text-muted" />
                  )
                )}
              </div>
              <span className="whitespace-nowrap font-mono text-[13px] text-text">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
