"use client";

import { CyberBug } from "@/components/v2/CyberBug";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles, BookOpen, FileDown, ExternalLink, FileText } from "lucide-react";
import { profile, papers } from "@/lib/dataV2";
import { useShell } from "@/components/v2/shell-context";
import { Corner } from "@/components/v2/ui";

import { mechanicalSound } from "@/lib/mechanicalSound";

const bootLines = [
  { t: "boot", s: "control-plane v3.1 · lahore-1" },
  { t: "mount", s: "retrieval plane · dense + lexical + graph" },
  { t: "spawn", s: "agent graph · 6 nodes · checkpoints on" },
  { t: "verify", s: "ledger fold · replay equivalent · 0 drift" },
  { t: "ready", s: "portfolio online · press ⌘K" },
];

function VisualSoundIndicator() {
  const [enabled, setEnabled] = useState(false);
  const [pulseLevel, setPulseLevel] = useState(0);

  useEffect(() => {
    setEnabled(mechanicalSound.isEnabled());
    const unsub = mechanicalSound.subscribe((intensity) => {
      setPulseLevel(Math.min(1, intensity + Math.random() * 0.4));
      setTimeout(() => setPulseLevel((p) => Math.max(0, p - 0.3)), 70);
      setTimeout(() => setPulseLevel(0), 150);
    });

    const handleToggle = (e: any) => {
      if (typeof e?.detail?.enabled === "boolean") {
        setEnabled(e.detail.enabled);
      }
    };
    window.addEventListener("mechanical-sound-toggle", handleToggle);
    return () => {
      unsub();
      window.removeEventListener("mechanical-sound-toggle", handleToggle);
    };
  }, []);

  const toggleSound = () => {
    const next = mechanicalSound.toggle();
    setEnabled(next);
    if (next) {
      mechanicalSound.playKeyClick("enter");
    }
  };

  return (
    <button
      onClick={toggleSound}
      title={enabled ? "Interface sounds are on. Click to turn them off." : "Interface sounds are off. Click to enable."}
      className={`mono ml-auto inline-flex items-center gap-2 rounded-md border px-2 py-0.5 text-[10px] tracking-wider transition-all cursor-pointer ${
        enabled
          ? "border-signal/40 bg-signal/10 text-signal hover:bg-signal/20"
          : "border-line bg-ink-3 text-mute hover:text-paper hover:border-line-2"
      }`}
    >
      <span className="flex items-end gap-0.5 h-3">
        {[0.45, 0.9, 0.65, 1.0, 0.5].map((h, i) => {
          const activeH = pulseLevel > 0 ? Math.min(100, Math.max(25, h * pulseLevel * 100)) : (enabled ? 35 : 15);
          return (
            <span
              key={i}
              className={`w-0.5 rounded-full transition-all duration-75 ${
                enabled ? (pulseLevel > 0 ? "bg-signal" : "bg-signal/60") : "bg-mute"
              }`}
              style={{ height: `${activeH}%` }}
            />
          );
        })}
      </span>
      <span className="font-semibold">{enabled ? "SOUNDS: ON" : "SOUNDS: OFF"}</span>
      <span className="opacity-60 hidden sm:inline">· OPT-IN</span>
    </button>
  );
}

function BootLog() {
  const [currentLine, setCurrentLine] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return;

    if (currentLine >= bootLines.length) {
      setIsFinished(true);
      return;
    }

    const targetStr = bootLines[currentLine].s;
    if (typedChars < targetStr.length) {
      const nextChar = targetStr[typedChars];
      const delay = nextChar === " " ? 20 : nextChar === "·" ? 65 : 24 + Math.floor(Math.random() * 16);

      const timer = setTimeout(() => {
        setTypedChars((c) => c + 1);
        mechanicalSound.playKeyClick(nextChar === " " ? "space" : "key");
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Completed current line, simulate carriage return / enter
      const linePause = setTimeout(() => {
        mechanicalSound.playKeyClick("enter");
        setCurrentLine((l) => l + 1);
        setTypedChars(0);
      }, 160);
      return () => clearTimeout(linePause);
    }
  }, [currentLine, typedChars, isFinished]);

  return (
    <div className="mono relative overflow-hidden rounded-lg border border-line bg-ink-2/80 p-4 text-[11.5px] leading-relaxed">
      <Corner />
      <div className="mb-2.5 flex items-center gap-2 text-mute border-b border-line/60 pb-2">
        <span className="h-2 w-2 rounded-full bg-rose/70" />
        <span className="h-2 w-2 rounded-full bg-signal/70" />
        <span className="h-2 w-2 rounded-full bg-lime/70" />
        <span className="ml-1 tracking-widest text-paper font-semibold">init.log</span>
        <VisualSoundIndicator />
      </div>

      <div className="space-y-1">
        {bootLines.map((l, i) => {
          if (i > currentLine) return null;
          const isThisLineTyping = i === currentLine && !isFinished;
          const displayedText = isThisLineTyping ? l.s.slice(0, typedChars) : l.s;

          return (
            <div key={l.t} className="flex gap-3 items-baseline">
              <span className="text-mute select-none">{String(i + 1).padStart(2, "0")}</span>
              <span className={l.t === "ready" ? "text-lime font-semibold" : "text-signal"}>[{l.t}]</span>
              <span className="text-paper-2">
                {displayedText}
                {isThisLineTyping && <span className="animate-blink text-signal font-bold ml-0.5">▍</span>}
              </span>
            </div>
          );
        })}

        {isFinished && (
          <div className="flex gap-3 pt-1">
            <span className="text-mute select-none">$</span>
            <span className="animate-blink text-paper">▍</span>
          </div>
        )}
      </div>
    </div>
  );
}

const TAGLINE_CHUNKS = [
  { text: "One impossible problem at a time. ", highlight: false },
  { text: "Problema solutum, negotium factum", highlight: true },
  { text: " — isolate the bottleneck, prove the math, job well done.", highlight: false },
];

function TypewriterTagline() {
  const [charCount, setCharCount] = useState(0);
  const totalLength = TAGLINE_CHUNKS.reduce((acc, c) => acc + c.text.length, 0);

  useEffect(() => {
    if (charCount >= totalLength) return;

    // Determine current character to tune timing and mechanical acoustics
    let accum = 0;
    let currentChar = "";
    for (const chunk of TAGLINE_CHUNKS) {
      if (charCount < accum + chunk.text.length) {
        currentChar = chunk.text[charCount - accum];
        break;
      }
      accum += chunk.text.length;
    }

    const isPunctuation = currentChar === "." || currentChar === "—" || currentChar === ",";
    const delay = isPunctuation ? 140 : currentChar === " " ? 22 : 24 + Math.floor(Math.random() * 18);

    const timer = setTimeout(() => {
      setCharCount((c) => c + 1);
      mechanicalSound.playKeyClick(currentChar === " " ? "space" : isPunctuation ? "enter" : "key");
    }, delay);

    return () => clearTimeout(timer);
  }, [charCount, totalLength]);

  // Render sliced chunks up to charCount
  let remaining = charCount;
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-6 max-w-xl text-lg leading-relaxed text-paper-2 font-normal min-h-[5rem]"
    >
      {TAGLINE_CHUNKS.map((chunk, idx) => {
        if (remaining <= 0) return null;
        const take = Math.min(remaining, chunk.text.length);
        const slice = chunk.text.slice(0, take);
        remaining -= take;

        if (chunk.highlight) {
          return (
            <span key={idx} className="text-signal font-medium italic">
              {slice}
            </span>
          );
        }
        return <span key={idx}>{slice}</span>;
      })}
      {charCount < totalLength ? (
        <span className="animate-blink text-signal font-bold ml-0.5">▍</span>
      ) : (
        <span className="animate-pulse text-signal/60 font-bold ml-0.5">▍</span>
      )}
    </motion.p>
  );
}

export function HeroV2_1() {
  const { goTo, setAssistantOpen, openReader } = useShell();

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24 lg:pt-8">
      <div className="blueprint pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-signal/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-[10%] h-[380px] w-[380px] rounded-full bg-teal/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-4 sm:px-8 lg:px-14">
        {/* Top Header Fold */}
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mono mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] tracking-[0.2em] text-mute"
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
              aria-label="Muhammad Adil Usmani"
              className="text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.03em]"
            >
              <span className="block text-paper">Muhammad</span>
              <span className="block text-paper">
                Adil <span className="text-outline">Usmani</span>
              </span>
            </motion.h1>

            <TypewriterTagline />

            {/* Primary Actions: Prominent CV & Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              {/* Prominent Verified CV Button */}
              <a
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-md border border-signal/50 bg-signal/15 px-5 py-3 text-sm font-semibold text-signal hover:bg-signal/25 transition-all cursor-pointer shadow-sm"
              >
                <FileDown className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                <span>View / Download CV (PDF)</span>
              </a>

              <button
                onClick={() => goTo("systems")}
                className="inline-flex items-center gap-2 rounded-md bg-paper px-5 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Inspect Systems</span>
                <ArrowDownRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setAssistantOpen(true)}
                className="inline-flex items-center gap-2 rounded-md border border-teal/40 bg-teal/10 px-4 py-3 text-sm font-medium text-teal transition-colors hover:bg-teal/20 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Ask Assistant</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: CyberBug & Boot Log */}
          <div className="relative space-y-6">
            <div className="relative mx-auto flex items-center justify-center">
              <CyberBug size={300} />
            </div>
            <BootLog />
          </div>
        </div>

        {/* Featured Research Papers Showcase: Prominent at Starting Fold */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-14 border-t border-line pt-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="mono text-[10px] tracking-[0.25em] text-signal uppercase font-bold">
                ▲ FEATURED SCHOLARLY RESEARCH
              </span>
              <span className="h-px w-8 bg-line-2" />
              <span className="mono text-[10.5px] text-mute">2 Completed Papers · 1 In Preparation</span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Paper 1: Co-Authored EEG Confound */}
            <article className="relative rounded-xl border border-line bg-ink-2 p-5 flex flex-col justify-between group hover:border-signal/50 hover:bg-ink-3/40 focus-within:border-signal/50 transition-all shadow-sm">
              <Corner />
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="mono text-[9px] tracking-wider rounded bg-[#a78bfa]/15 text-[#a78bfa] px-2 py-0.5 font-semibold">
                    CO-AUTHORED PAPER · 2026
                  </span>
                  <span className="mono text-[9px] text-mute">OpenNeuro ds005189</span>
                </div>
                <h3 className="text-sm font-semibold text-paper leading-snug">
                  <Link
                    href="/projects/blocked-eeg-decoding-confound"
                    className="group-hover:text-signal transition-colors after:absolute after:inset-0 after:content-['']"
                  >
                    A Mislabeled Contrast, Recovered: Blocked EEG Decoding Confound
                  </Link>
                </h3>
                <p className="mono text-[11px] text-teal/90 mt-1">Muhammad Hassan Siddiqui &amp; Muhammad Adil Usmani</p>
                <p className="text-[12.5px] text-paper-2 leading-relaxed mt-2.5">
                  Diagnosed a 4:1 marker error leaking test trials (70.78% artifact). Recovered authentic 57.73% encode-phase neural signal validated across 4 independent controls.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="mono text-[9.5px] bg-ink-3 px-2 py-0.5 rounded text-paper-2 border border-line">Riemannian Geometry</span>
                  <span className="mono text-[9.5px] bg-ink-3 px-2 py-0.5 rounded text-paper-2 border border-line">57.73% Recovered</span>
                  <span className="mono text-[9.5px] bg-ink-3 px-2 py-0.5 rounded text-[#a78bfa] border border-[#a78bfa]/30">4 Figures &amp; Proofs →</span>
                </div>
              </div>
              <div className="relative z-10 flex items-center gap-2 mt-5 pt-3 border-t border-line/60">
                <button
                  type="button"
                  onClick={() => openReader("/A_Mislabeled_Contrast_Recovered_EEG.pdf")}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#a78bfa] text-on-solid px-3 py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Read PDF
                </button>
                <a
                  href="https://github.com/HassanSidd0946/Search-vs-Memorize-Correction"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-line-2 px-3 py-1.5 text-xs text-paper-2 hover:text-paper hover:border-paper/40 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" /> Repo
                </a>
                <span className="mono text-[10.5px] text-signal ml-auto group-hover:translate-x-0.5 transition-transform">
                  Deep Dive →
                </span>
              </div>
            </article>

            {/* Paper 2: Published FinTech Fusion */}
            <article className="relative rounded-xl border border-line bg-ink-2 p-5 flex flex-col justify-between group hover:border-signal/50 hover:bg-ink-3/40 focus-within:border-signal/50 transition-all shadow-sm">
              <Corner />
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="mono text-[9px] tracking-wider rounded bg-[#2dd4bf]/15 text-[#2dd4bf] px-2 py-0.5 font-semibold">
                    PUBLISHED PAPER · 2025
                  </span>
                  <span className="mono text-[9px] text-mute">Distributed Systems</span>
                </div>
                <h3 className="text-sm font-semibold text-paper leading-snug">
                  <Link
                    href="/projects/deterministic-data-fusion-fintech"
                    className="group-hover:text-signal transition-colors after:absolute after:inset-0 after:content-['']"
                  >
                    Deterministic Data Fusion for FinTech
                  </Link>
                </h3>
                <p className="mono text-[11px] text-teal/90 mt-1">Muhammad Adil Usmani</p>
                <p className="text-[12.5px] text-paper-2 leading-relaxed mt-2.5">
                  Fault-tolerant state synchronization across heterogeneous financial event streams. Sustains 42k ev/s under SERIALIZABLE isolation with zero discrepancies.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="mono text-[9.5px] bg-ink-3 px-2 py-0.5 rounded text-paper-2 border border-line">42k ev/s Throughput</span>
                  <span className="mono text-[9.5px] bg-ink-3 px-2 py-0.5 rounded text-paper-2 border border-line">HLC Log Order</span>
                  <span className="mono text-[9.5px] bg-ink-3 px-2 py-0.5 rounded text-[#2dd4bf] border border-[#2dd4bf]/30">Topology &amp; Specs →</span>
                </div>
              </div>
              <div className="relative z-10 flex items-center gap-2 mt-5 pt-3 border-t border-line/60">
                <button
                  type="button"
                  onClick={() => openReader("/Deterministic_Data_Fusion_for_FinTech.pdf")}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#2dd4bf] text-on-solid px-3 py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Read PDF
                </button>
                <a
                  href="https://github.com/adilusmani/deterministic-data-fusion"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-line-2 px-3 py-1.5 text-xs text-paper-2 hover:text-paper hover:border-paper/40 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" /> Repo
                </a>
                <span className="mono text-[10.5px] text-signal ml-auto group-hover:translate-x-0.5 transition-transform">
                  Deep Dive →
                </span>
              </div>
            </article>

            {/* Paper 3: Working Paper Anarchist LLM */}
            <article className="relative rounded-xl border border-line bg-ink-2 p-5 flex flex-col justify-between group hover:border-signal/50 hover:bg-ink-3/40 focus-within:border-signal/50 transition-all shadow-sm">
              <Corner />
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="mono text-[9px] tracking-wider rounded bg-[#38bdf8]/15 text-[#38bdf8] px-2 py-0.5 font-semibold">
                    WORKING PAPER · 2026
                  </span>
                  <span className="mono text-[9px] text-mute">A100 SXM4 Cluster</span>
                </div>
                <h3 className="text-sm font-semibold text-paper leading-snug">
                  <Link
                    href="/projects/anarchist-llm-reasoning"
                    className="group-hover:text-signal transition-colors after:absolute after:inset-0 after:content-['']"
                  >
                    Anarchist LLM: Disguised Algorithmic Reasoning
                  </Link>
                </h3>
                <p className="mono text-[11px] text-teal/90 mt-1">Muhammad Adil Usmani</p>
                <p className="text-[12.5px] text-paper-2 leading-relaxed mt-2.5">
                  Pre-1900 Victorian persona constraints benchmarking complex algorithm execution. Modal serverless workers with FlashAttention-3 achieving 4.38x acceleration.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="mono text-[9.5px] bg-ink-3 px-2 py-0.5 rounded text-paper-2 border border-line">FlashAttention-3</span>
                  <span className="mono text-[9.5px] bg-ink-3 px-2 py-0.5 rounded text-paper-2 border border-line">4.38x Faster</span>
                  <span className="mono text-[9.5px] bg-ink-3 px-2 py-0.5 rounded text-[#38bdf8] border border-[#38bdf8]/30">Schematic &amp; Data →</span>
                </div>
              </div>
              <div className="relative z-10 flex items-center gap-2 mt-5 pt-3 border-t border-line/60">
                <a
                  href="https://github.com/AadilUsmani/Anarchist-LLM"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#38bdf8] text-on-solid px-3 py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> View Repo
                </a>
                <span className="mono text-[10.5px] text-signal ml-auto group-hover:translate-x-0.5 transition-transform">
                  Deep Dive →
                </span>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
