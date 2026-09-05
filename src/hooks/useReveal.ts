"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to a container ref and adds the
 * `.visible` class to any descendant `.reveal` element once it scrolls
 * into view. One observer per section instead of one per element keeps
 * this cheap even on long pages.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = node.classList.contains("reveal")
      ? [node, ...node.querySelectorAll(".reveal")]
      : Array.from(node.querySelectorAll(".reveal"));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}
