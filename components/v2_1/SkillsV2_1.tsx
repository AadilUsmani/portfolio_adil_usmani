"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Cpu, Layers } from "lucide-react";
import { SectionHeader, Corner } from "@/components/v2/ui";

const domains = [
  {
    icon: Brain,
    title: "AI Agent Frameworks & LLM Architectures",
    tagline: "LangGraph state machines, Graph RAG, and accelerated FlashAttention-3 kernels.",
    technologies: ["LangGraph", "LangChain", "Vector Databases", "Knowledge Graph RAG", "FlashAttention-3", "CRAG", "Tool Use"],
    accent: "#ff8a3d",
  },
  {
    icon: Cpu,
    title: "Distributed Systems & Backend Platforms",
    tagline: "Deterministic event logs, SERIALIZABLE isolation, and fault-tolerant outbox daemons.",
    technologies: ["FastAPI", "Python Async", "Hybrid Logical Clocks", "Docker", "PostgreSQL", "Event Sourcing"],
    accent: "#4fd1c5",
  },
  {
    icon: Layers,
    title: "Computational Neuroscience & Statistical ML",
    tagline: "Riemannian tangent space geometry, EEG decoding, and time-series forecasting.",
    technologies: ["Riemannian Geometry", "MNE-Python", "PyTorch", "Covariance Classification", "LSTM / TCN", "OpenNeuro"],
    accent: "#a78bfa",
  },
];

export function SkillsV2_1() {
  return (
    <section id="skills" className="relative scroll-mt-20 border-t border-line px-5 py-20 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="02"
          label="Skills & Core Disciplines"
          title={
            <>
              Deep technical capabilities distilled across <span className="text-teal">production and research</span>.
            </>
          }
          blurb="Minimal domain overview. Click below to inspect the complete skills breakdown, production incident proofs, and verified metrics."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {domains.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-glow relative flex flex-col justify-between rounded-xl border border-line bg-ink-2 p-6"
              >
                <Corner />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="grid h-8 w-8 place-items-center rounded-md border border-line-2 bg-ink-3">
                      <Icon className="h-4 w-4" style={{ color: d.accent }} />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-paper leading-snug">{d.title}</h3>
                  <p className="mt-2 text-[13px] text-paper-2 leading-relaxed">{d.tagline}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {d.technologies.map((t) => (
                      <span key={t} className="mono text-[10px] rounded bg-ink-3 px-2 py-0.5 text-paper-2 border border-line">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action button to dedicated skills page */}
        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/skills"
            className="group inline-flex items-center gap-2.5 rounded-md border border-signal/50 bg-signal/15 px-6 py-3.5 text-sm font-semibold text-signal hover:bg-signal/25 transition-all shadow-sm"
          >
            <span>Inspect Complete Technical Skills Matrix &amp; Proofs</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
