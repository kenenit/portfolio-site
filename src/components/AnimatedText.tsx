"use client";

import { motion, Variants } from "framer-motion";
import { ElementType } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: ElementType;
  /** Extra delay (seconds) before the stagger starts — useful when a
   * label/eyebrow above this heading is already animating in first. */
  delay?: number;
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Splits `text` into words and reveals them one at a time as the element
 * scrolls into view. Only for plain-text headings — headings with nested
 * markup (like Hero's "work." in a different color) stay hand-written.
 */
export default function AnimatedText({
  text,
  className,
  as: Tag = "span",
  delay = 0,
}: AnimatedTextProps) {
  const MotionTag = motion(Tag);
  const words = text.split(" ");

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
      transition={{ delayChildren: delay }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {w}
        </motion.span>
      ))}
    </MotionTag>
  );
}
