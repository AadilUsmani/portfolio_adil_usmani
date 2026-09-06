"use client";

import { CyberBug } from "@/components/v2/CyberBug";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles, BookOpen } from "lucide-react";
import { profile, projects } from "@/lib/dataV2";
import { useShell } from "@/components/v2/shell-context";
import { Corner } from "@/components/v2/ui";

const bootLines = [
  { t: "boot", s: "control-plane v3.1 · lahore-1" },
  { t: "mount", s: "retrieval plane · dense + lexical + graph" },
  { t: "spawn", s: "agent graph · 6 nodes · checkpoints on" },
  { t: "verify", s: "ledger fold · replay equivalent · 0 drift" },
  { t: "ready", s: "portfolio online · press ⌘K" },
];

function BootLog() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count >= bootLines.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), count === 0 ? 300 : 420);
    return () => clearTimeout(id);
  }, [count]);
  return (
    <div className="mono relative overflow-hidden rounded-lg border border-line bg-ink-2/80 p-4 text-[11.5px] leading-relaxed">
      <Corner />
      <div className="mb-2 flex items-center gap-2 text-mute">
        <span className="h-2 w-2 rounded-full bg-rose/70" />
        <span className="h-2 w-2 rounded-full bg-signal/70" />
        <span className="h-2 w-2 rounded-full bg-lime/70" />
        <span className="ml-2 tracking-widest">init.log</span>
      </div>
      {bootLines.slice(0, count).map((l, i) => (
        <motion.div key={l.t} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
          <span className="text-mute">{String(i + 1).padStart(2, "0")}</span>
          <span className={l.t === "ready" ? "text-lime" : "text-signal"}>[{l.t}]</span>
          <span className="text-paper-2">{l.s}</span>
        </motion.div>
      ))}
      {count < bootLines.length ? (
        <div className="flex gap-3">
          <span className="text-mute">{String(count + 1).padStart(2, "0")}</span>
          <span className="animate-blink text-paper">▍</span>
        </div>
      ) : (
        <div className="flex gap-3">
          <span className="text-mute">$</span>
          <span className="animate-blink text-paper">▍</span>
        </div>
      )}
    </div>
  );
}

export function HeroV2_1() {
  const { goTo, setAssistantOpen } = useShell();
  const stats = [
    { k: "deterministic throughput", v: "42k ev/s", sub: "0 drift · serializable" },
    { k: "recovered eeg decode", v: "57.73%", sub: "4 controls · ds005189" },
    { k: "inference acceleration", v: "4.38x", sub: "modal a100 · flash-3" },
    { k: "graph rag hallucination", v: "< 2.0%", sub: "sec 10-k multi-hop" },
  ];

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24 lg:pt-0">
      <div className="blueprint pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-signal/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-[10%] h-[380px] w-[380px] rounded-full bg-teal/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-6 sm:px-8 lg:min-h-screen lg:grid-cols-[1.25fr_1fr] lg:items-center lg:px-14 lg:pt-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mono mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] tracking-[0.2em] text-mute"
          >
            <span className="text-signal">▲ PORTFOLIO / 2026 · FOCUS VIEW</span>
            <span className="hidden h-px w-10 bg-line-2 sm:block" />
            <span>{profile.role.toUpperCase()}</span>
            <span className="hidden h-px w-10 bg-line-2 sm:block" />
            <span>{profile.location.toUpperCase()}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.6rem,7.5vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.03em]"
          >
            <span className="block text-paper">Muhammad</span>
            <span className="block text-paper">
              Adil <span className="text-outline">Usmani</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-paper-2 font-normal"
          >
            I build dependable distributed systems and grounded AI architectures — deterministic event sourcing at 42k events/sec, multi-hop Graph RAG pipelines, and accelerated transformer inference.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {profile.focus.map((f, i) => (
              <span
                key={f}
                className="mono rounded-full border border-line-2 bg-ink-3 px-3 py-1.5 text-[11px] tracking-wider text-paper-2"
              >
                <span className="mr-2 text-signal">0{i + 1}</span>
                {f}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => goTo("systems")}
              className="group inline-flex items-center gap-2 rounded-md bg-paper px-5 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              Inspect Systems
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={() => goTo("research")}
              className="inline-flex items-center gap-2 rounded-md border border-line-2 px-5 py-3 text-sm text-paper-2 transition-colors hover:border-signal/50 hover:text-paper cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-signal" /> Research Papers
            </button>
            <button
              onClick={() => setAssistantOpen(true)}
              className="inline-flex items-center gap-2 rounded-md border border-teal/40 bg-teal/10 px-5 py-3 text-sm font-medium text-teal transition-colors hover:bg-teal/20 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" /> Ask Assistant
            </button>
          </motion.div>

          {/* Scannable High-Impact Stat Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-12 grid grid-cols-2 gap-3 border-t border-line pt-8 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.k} className="rounded-lg border border-line bg-ink-2/60 p-3">
                <div className="mono text-xl font-semibold tabular-nums text-paper">{s.v}</div>
                <div className="mono mt-1 text-[10px] uppercase tracking-wider text-signal">{s.k}</div>
                <div className="mono text-[9px] text-mute truncate">{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative space-y-6">
          <div className="relative mx-auto flex items-center justify-center">
            <CyberBug size={320} />
          </div>
          <BootLog />
        </div>
      </div>
    </section>
  );
}
