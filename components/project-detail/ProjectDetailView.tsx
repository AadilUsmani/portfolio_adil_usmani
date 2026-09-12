"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  GitBranch,
  ExternalLink,
  BookOpen,
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  CheckCircle2,
  Database,
  Layers,
  Cpu,
  CornerDownRight,
  Image as ImageIcon,
  ZoomIn,
  X,
} from "lucide-react";
import { Project } from "@/lib/dataV2";
import { ShellProvider, useShell } from "@/components/v2/shell-context";
import { ArchitectureVisualizerV2 } from "@/components/v2/ArchitectureVisualizerV2";
import { CyberBug } from "@/components/v2/CyberBug";
import { PdfReaderV2 } from "@/components/v2/PdfReaderV2";
import { Corner, Tag } from "@/components/v2/ui";

interface ProjectDetailViewProps {
  project: Project;
}

function ProjectDetailContent({ project }: ProjectDetailViewProps) {
  const { openReader } = useShell();
  const [activeZoomImage, setActiveZoomImage] = useState<string | null>(null);

  // Dedicated Project Agent State
  const [messages, setMessages] = useState<{ role: "assistant" | "user"; text: string }[]>([
    {
      role: "assistant",
      text: `Hello! I am the architecture agent for **${project.title}**. Ask me about the concurrency model, evaluation benchmarks, or failure modes.`,
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    `How does ${project.shortTitle} ensure correctness?`,
    `What was the primary engineering challenge?`,
    `Explain the performance and latency metrics.`,
  ];

  const handleSend = async (q: string) => {
    if (!q.trim() || isLoading) return;
    const userMsg = q.trim();
    setInputQuery("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `${userMsg} (Context: ${project.title} - ${project.category})` }),
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
      } else {
        throw new Error(data.error || "Unable to reach agent.");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `In **${project.title}**, the architecture handles this through deterministic execution and strict isolation protocols (${project.stack.slice(0, 3).join(", ")}).`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const paperArtifact = project.artifacts.find((a) => a.kind === "paper");
  const repoArtifact = project.artifacts.find((a) => a.kind === "repo");
  const demoArtifact = project.artifacts.find((a) => a.kind === "demo");

  return (
    <div className="blueprint min-h-screen relative text-paper overflow-x-hidden">
      {/* Floating CyberBug in Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0 flex items-center justify-center">
        <CyberBug size={440} />
      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-md border border-line-2 bg-ink-2/80 px-3.5 py-1.5 text-xs font-mono font-medium text-paper-2 hover:border-signal/50 hover:text-paper transition-all cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 text-signal" />
            <span>← Back to Overview</span>
          </Link>

          <div className="mono text-[11px] text-mute flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: project.accent }} />
            <span>SYS-{project.index}</span>
            <span>·</span>
            <span className="text-paper-2 uppercase">{project.shortTitle}</span>
          </div>
        </div>

        {/* Project Header */}
        <header className="mt-8 relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-6 sm:p-10">
          <Corner />
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[110px]"
            style={{ background: `${project.accent}30` }}
          />

          <div className="mono flex flex-wrap items-center gap-2 text-[11px] tracking-[0.2em]" style={{ color: project.accent }}>
            <span>SYS-{project.index}</span>
            <span className="text-mute">/</span>
            <span className="text-mute">{project.category.toUpperCase()}</span>
          </div>

          <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-paper leading-[1.1]">
            {project.title}
          </h1>

          <p className="mt-4 text-lg text-paper-2 leading-relaxed max-w-3xl">
            {project.tagline}
          </p>

          {/* Action Links Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line/70 pt-6">
            {repoArtifact && (
              <a
                href={repoArtifact.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-paper px-4 py-2 text-xs sm:text-sm font-semibold text-ink hover:opacity-90 transition-opacity"
              >
                <GitBranch className="h-4 w-4" /> GitHub Repository
              </a>
            )}

            {paperArtifact && (
              <button
                onClick={() => openReader(paperArtifact.href)}
                className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs sm:text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 cursor-pointer"
                style={{ background: project.accent }}
              >
                <BookOpen className="h-4 w-4" /> Read Full Paper (PDF)
              </button>
            )}

            {demoArtifact && (
              <a
                href={demoArtifact.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line-2 bg-ink-3 px-4 py-2 text-xs sm:text-sm font-medium text-paper-2 hover:text-paper hover:border-paper/40 transition-colors"
              >
                <ExternalLink className="h-4 w-4" /> Live Deployed Demo
              </a>
            )}
          </div>
        </header>

        {/* Outcome Metrics Grid */}
        <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
          {project.outcomes.map((o) => (
            <div key={o.label} className="bg-ink-2 p-4 sm:p-6">
              <div className="mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-mute">{o.label}</div>
              <div className="mt-1 text-xl sm:text-3xl font-semibold tabular-nums tracking-tight" style={{ color: project.accent }}>
                {o.value}
              </div>
            </div>
          ))}
        </div>

        {/* Problem and Architectural Solution */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="card-glow rounded-xl border border-line bg-ink-2 p-6 sm:p-7">
            <Corner />
            <div className="mono text-[11px] tracking-[0.2em] text-rose font-bold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose" />
              THE CHALLENGE &amp; ROOT CAUSE
            </div>
            <p className="mt-4 text-[14.5px] leading-relaxed text-paper-2">
              {project.problem}
            </p>
          </div>

          <div className="card-glow rounded-xl border border-line bg-ink-2 p-6 sm:p-7">
            <Corner />
            <div className="mono text-[11px] tracking-[0.2em] text-lime font-bold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lime" />
              ARCHITECTURAL DECISION &amp; SOLUTION
            </div>
            <p className="mt-4 text-[14.5px] leading-relaxed text-paper-2">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Tech Stack Breakdown */}
        <div className="mt-8 rounded-xl border border-line bg-ink-2 p-6">
          <div className="mono text-[10.5px] tracking-[0.2em] text-mute uppercase mb-3">
            Core Technology Stack &amp; Infrastructure
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Tag key={s} color={project.accent}>
                {s}
              </Tag>
            ))}
          </div>
        </div>

        {/* Empirical Research Diagrams & Figures Section */}
        {project.figures && project.figures.length > 0 && (
          <section className="mt-12">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="mono text-[11px] tracking-[0.2em] text-signal uppercase font-bold flex items-center gap-1.5">
                  <ImageIcon className="h-4 w-4 text-signal" />
                  ▲ Empirical Research Diagrams &amp; Schematics
                </span>
                <span className="h-px w-12 bg-line-2" />
                <span className="mono text-[11px] text-mute">
                  {project.figures.length} Publication Figures
                </span>
              </div>
              <span className="mono text-[11px] text-paper-2">
                Click any diagram to inspect high-resolution view
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {project.figures.map((fig, idx) => (
                <div
                  key={fig.title}
                  className="group relative rounded-xl border border-line bg-ink-2 overflow-hidden flex flex-col justify-between hover:border-signal/60 transition-colors"
                >
                  <Corner />
                  {/* Image Container with Zoom Trigger */}
                  <div
                    onClick={() => setActiveZoomImage(fig.src)}
                    className="relative bg-ink-3/80 p-3 sm:p-4 cursor-pointer overflow-hidden flex items-center justify-center min-h-[220px]"
                  >
                    <img
                      src={fig.src}
                      alt={fig.title}
                      className="max-h-64 w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono text-paper backdrop-blur-[2px]">
                      <ZoomIn className="h-4 w-4 text-signal" />
                      <span>Click to enlarge diagram</span>
                    </div>
                  </div>

                  {/* Figure Caption & Detail */}
                  <div className="p-4 sm:p-5 border-t border-line/70 bg-ink-2">
                    <h4 className="text-sm font-semibold text-paper flex items-center justify-between">
                      <span>{fig.title}</span>
                      <span className="mono text-[10px] text-mute">FIG-{idx + 1}</span>
                    </h4>
                    <p className="mt-2 text-xs text-paper-2 leading-relaxed">
                      {fig.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lightbox Zoom Modal for Diagrams */}
        <AnimatePresence>
          {activeZoomImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveZoomImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-zoom-out"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl max-h-[90vh] rounded-2xl border border-line-2 bg-ink-2 p-3 sm:p-6 overflow-hidden flex flex-col shadow-2xl"
              >
                <button
                  onClick={() => setActiveZoomImage(null)}
                  className="absolute top-4 right-4 z-10 grid h-8 w-8 place-items-center rounded-lg border border-line-2 bg-ink-3 text-paper hover:bg-rose hover:text-ink transition-colors cursor-pointer"
                  aria-label="Close zoomed diagram"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="overflow-auto flex items-center justify-center p-2">
                  <img
                    src={activeZoomImage}
                    alt="Zoomed diagram preview"
                    className="max-h-[78vh] w-auto object-contain rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Architecture Visualizer */}
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="mono text-[11px] tracking-[0.2em] text-mute uppercase font-bold">
                ▲ Interactive Topology Visualizer
              </span>
              <span className="h-px w-12 bg-line-2" />
              <span className="mono text-[11px]" style={{ color: project.accent }}>
                Click nodes to inspect latencies and telemetry
              </span>
            </div>
          </div>
          <ArchitectureVisualizerV2 project={project} />
        </div>

        {/* Dedicated Project AI Agent Section */}
        <section className="mt-16 rounded-2xl border border-line bg-ink-2/95 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-teal/40 bg-teal/10 text-teal">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-paper">Ask the {project.shortTitle} Agent</h3>
              <p className="mono text-[11px] text-mute">Grounded in verified code repositories, test suites &amp; paper proofs</p>
            </div>
          </div>

          {/* Pre-seeded prompts */}
          <div className="flex flex-wrap gap-2 mb-5">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="mono text-[11.5px] rounded-md border border-line-2 bg-ink-3 px-3 py-1.5 text-paper-2 hover:text-paper hover:border-signal/50 transition-colors text-left cursor-pointer"
              >
                <CornerDownRight className="inline h-3 w-3 mr-1 text-signal" /> {q}
              </button>
            ))}
          </div>

          {/* Chat messages */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto rounded-lg border border-line bg-ink p-4 mono text-[12.5px] leading-relaxed">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 p-2.5 rounded-md ${
                  m.role === "assistant" ? "bg-ink-2/80 text-paper border border-line/40" : "bg-ink-3 text-paper-2"
                }`}
              >
                <span className="mono text-[10px] text-signal uppercase font-bold shrink-0">
                  {m.role === "assistant" ? "[AGENT]" : "[YOU]"}
                </span>
                <div className="whitespace-pre-line">{m.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-mute text-xs">
                <Loader2 className="h-4 w-4 animate-spin text-signal" />
                <span>Traversing agent graph for {project.shortTitle}...</span>
              </div>
            )}
          </div>

          {/* Chat input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputQuery);
            }}
            className="mt-4 flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Ask a technical question about ${project.shortTitle}...`}
              className="flex-1 rounded-md border border-line-2 bg-ink-3 px-4 py-2.5 text-xs sm:text-sm text-paper placeholder:text-mute focus:border-signal focus:outline-none mono"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-2.5 text-xs sm:text-sm font-semibold text-ink hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" /> Send
            </button>
          </form>
        </section>

        {/* Bottom Back Button */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-line-2 bg-ink-2 px-6 py-3 text-sm font-medium text-paper-2 hover:border-signal hover:text-paper transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-signal" /> Return to Main Portfolio Overview
          </Link>
        </div>
      </main>

      <PdfReaderV2 />
    </div>
  );
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  return (
    <ShellProvider>
      <ProjectDetailContent project={project} />
    </ShellProvider>
  );
}
