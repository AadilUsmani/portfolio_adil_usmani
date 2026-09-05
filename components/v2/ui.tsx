"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeader({
  index,
  label,
  title,
  blurb,
}: {
  index: string;
  label: string;
  title: ReactNode;
  blurb?: string;
}) {
  return (
    <div className="mb-10 grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex items-start gap-4"
      >
        <span className="mono text-[11px] tracking-[0.3em] text-signal">{index}</span>
        <span className="section-label">{label}</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-paper md:text-5xl">
          {title}
        </h2>
        {blurb ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper-2">{blurb}</p> : null}
      </motion.div>
    </div>
  );
}

export function Tag({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="mono inline-flex items-center rounded-md border px-2 py-1 text-[11px] leading-none tracking-wide"
      style={{
        borderColor: color ? `${color}55` : "var(--color-line-2)",
        color: color ?? "var(--color-paper-2)",
        background: color ? `${color}10` : "var(--color-ink-3)",
      }}
    >
      {children}
    </span>
  );
}

export function Dot({ color = "var(--color-lime)", pulse = true }: { color?: string; pulse?: boolean }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      {pulse ? (
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full" style={{ background: color }} />
      ) : null}
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: color }} />
    </span>
  );
}

export function Corner({ className = "" }: { className?: string }) {
  return (
    <>
      <span className={`pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-line-2 ${className}`} />
      <span className={`pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-line-2 ${className}`} />
      <span className={`pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-line-2 ${className}`} />
      <span className={`pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-line-2 ${className}`} />
    </>
  );
}
