"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Check, Loader2, AlertCircle } from "lucide-react";
import AnimatedText from "./AnimatedText";

type Status = "idle" | "sending" | "sent" | "error";

const EMAIL = "Keneniteha08@gmail.com";
const GITHUB_URL = "https://github.com/kenenit";
const LINKEDIN_URL = "https://www.linkedin.com/in/keneni-teha-376004342";
const TELEGRAM_URL = "https://t.me/keneniteha";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Couldn't reach the server. Please try again.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-[1100px] px-6 py-24">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-accent"
      >
        // contact
      </motion.p>
      <AnimatedText
        as="h2"
        text="Let's build something."
        delay={0.1}
        className="mb-10 font-display text-3xl font-bold tracking-tight"
      />

      {status === "sent" ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex max-w-[480px] items-center gap-3 rounded-md border border-accent/40 bg-accent/[0.06] px-4 py-3.5 text-sm text-text"
        >
          <Check size={18} className="flex-shrink-0 text-accent" />
          Message sent — thanks for reaching out, I&apos;ll get back to you
          soon.
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-10 flex max-w-[480px] flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="name@company.com"
            required
            disabled={status === "sending"}
            className="rounded-md border border-border bg-surface px-3.5 py-3 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none disabled:opacity-60"
          />
          <textarea
            name="message"
            placeholder="Tell me about your project"
            required
            minLength={2}
            rows={4}
            disabled={status === "sending"}
            className="rounded-md border border-border bg-surface px-3.5 py-3 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none disabled:opacity-60"
          />

          {status === "error" && (
            <div className="flex items-start gap-2 text-[13px] text-accent">
              <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-fit items-center gap-2 rounded-lg bg-gradient-to-br from-accent to-accent-soft px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(232,183,200,0.22)] disabled:pointer-events-none disabled:opacity-70"
          >
            {status === "sending" && (
              <Loader2 size={15} className="animate-spin" />
            )}
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
        </motion.form>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="flex gap-5"
      >
        <a
          href={`mailto:${EMAIL}`}
          aria-label="Email"
          className="text-muted transition-colors hover:text-accent"
        >
          <Mail size={20} />
        </a>
        <a
          href={GITHUB_URL}
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
          className="text-muted transition-colors hover:text-accent"
        >
          <Github size={20} />
        </a>
        <a
          href={LINKEDIN_URL}
          aria-label="LinkedIn"
          target="_blank"
          rel="noreferrer"
          className="text-muted transition-colors hover:text-accent"
        >
          <Linkedin size={20} />
        </a>
        <a
          href={TELEGRAM_URL}
          aria-label="Telegram"
          target="_blank"
          rel="noreferrer"
          className="text-muted transition-colors hover:text-accent"
        >
          <Send size={20} />
        </a>
      </motion.div>
    </section>
  );
}
