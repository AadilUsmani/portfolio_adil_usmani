"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  Cpu,
  Layers,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  Shield,
  Zap,
  CornerDownRight,
  ExternalLink,
} from "lucide-react";
import { CyberBug } from "@/components/v2/CyberBug";
import { Corner, Tag } from "@/components/v2/ui";
import { profile } from "@/lib/dataV2";

interface SkillItem {
  name: string;
  level: number;
  provenance: string;
  details: string;
}

interface SkillCategory {
  title: string;
  icon: any;
  accent: string;
  summary: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI Agent Frameworks & LLM Architectures",
    icon: Brain,
    accent: "#ff8a3d",
    summary:
      "Specialized in stateful multi-agent execution graphs, hybrid dense/sparse knowledge graph retrieval, and GPU-accelerated transformer kernels.",
    skills: [
      {
        name: "LangGraph & Multi-Agent Workflows",
        level: 95,
        provenance: "ML1 & Lexical Graph RAG",
        details: "Deterministic checkpointing, typed state machines, human-in-the-loop gates, confidence routing.",
      },
      {
        name: "Knowledge Graph RAG (Neo4j + Vector)",
        level: 94,
        provenance: "Lexical Graph Hybrid RAG",
        details: "Dense HNSW + BM25 sparse + BFS knowledge graph walker with Reciprocal Rank Fusion.",
      },
      {
        name: "Transformer Acceleration (FlashAttention-3)",
        level: 90,
        provenance: "Anarchist LLM Research",
        details: "Hardware-fused attention kernels on Modal A100 SXM4 instances (4.38x inference speedup).",
      },
      {
        name: "Corrective RAG (CRAG)",
        level: 92,
        provenance: "CRAG Self-Correcting Engine",
        details: "3-way confidence threshold routing (direct answer, query rewrite, real-time web fallback).",
      },
      {
        name: "Vector Databases & Embedding Search",
        level: 90,
        provenance: "Production RAG Pipelines",
        details: "FAISS, ChromaDB, Cosine & Dot-Product index optimization, semantic deduplication.",
      },
    ],
  },
  {
    title: "Distributed Systems & Backend Platforms",
    icon: Cpu,
    accent: "#4fd1c5",
    summary:
      "Designing fault-tolerant data pipelines that remain byte-identical under heavy concurrency, partition splits, and chaos testing.",
    skills: [
      {
        name: "Deterministic Event Sourcing & HLC",
        level: 96,
        provenance: "FinTech Research Paper",
        details: "Hybrid logical clocks for monotonic causal ordering across distributed event partitions at 42k ev/s.",
      },
      {
        name: "Transaction Isolation Protocols",
        level: 94,
        provenance: "FinTech Fusion & PostgreSQL",
        details: "SERIALIZABLE isolation, predicate lock trees, transactional outbox daemons with zero ledger drift.",
      },
      {
        name: "FastAPI & Async Microservices",
        level: 95,
        provenance: "SEMS & Enterprise APIs",
        details: "High-throughput async endpoints, Pydantic v2 validation, scoped JWTs with Argon2id password hashing.",
      },
      {
        name: "Applied Cryptography & Security",
        level: 91,
        provenance: "Crypto Secure System (SEMS)",
        details: "Zero-trust hybrid cryptosystem with symmetric AES-256-GCM and asymmetric RSA-3072 key exchange.",
      },
      {
        name: "Docker, Cloud & Orchestration",
        level: 88,
        provenance: "Modal.com & Azure Cloud",
        details: "Containerized deployments, serverless GPU cluster management, GitHub Actions CI/CD automation.",
      },
    ],
  },
  {
    title: "Computational Neuroscience & Machine Learning",
    icon: Layers,
    accent: "#a78bfa",
    summary:
      "Mathematical re-analyses of high-density EEG datasets, Riemannian manifold classification, and comparative predictive modeling.",
  skills: [
      {
        name: "Riemannian Geometry & Covariance Manifolds",
        level: 93,
        provenance: "EEG Decoding Confound Paper",
        details: "SPD covariance matrices mapped to Euclidean tangent space via Affine-Invariant Riemannian Metric (AIRM).",
      },
      {
        name: "Signal Processing & MNE-Python",
        level: 92,
        provenance: "OpenNeuro ds005189",
        details: "Bandpass filtering, epoch segmentation, composition-arithmetic confound diagnostics, and jackknife controls.",
      },
      {
        name: "Time-Series Deep Learning (LSTM & TCN)",
        level: 89,
        provenance: "NASA Li-ion Aging Benchmark",
        details: "Multi-step degradation trajectory forecasting on battery capacity fade; 18% RMSE reduction.",
      },
      {
        name: "PyTorch & Custom Loss Formulations",
        level: 90,
        provenance: "Research Prototypes",
        details: "Custom training loops, teacher forcing, GPU memory pinning, and CUDA stream concurrency.",
      },
    ],
  },
];

export function SkillsDetailView() {
  // Skills Agent State
  const [messages, setMessages] = useState<{ role: "assistant" | "user"; text: string }[]>([
    {
      role: "assistant",
      text: "Hello! I am Adil's technical skills agent. Ask me about his experience in **Graph RAG**, **Distributed Systems**, **Riemannian Geometry**, or his work at **ML1**.",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const samplePrompts = [
    "What is Adil's strongest technical skill?",
    "How does Adil approach distributed transaction isolation?",
    "Explain Adil's computational neuroscience and EEG decoding background.",
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
        body: JSON.stringify({ message: `${userMsg} (Context: Technical Skills & Core Competencies)` }),
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
      } else {
        throw new Error(data.error || "Failed to reach agent.");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Muhammad Adil Usmani specializes in AI Agent Frameworks (LangGraph, Graph RAG), Distributed Systems (42k ev/s with SERIALIZABLE isolation), and Signal Processing (Riemannian tangent space EEG decoding).`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="blueprint min-h-screen relative text-paper overflow-x-hidden">
      {/* Floating CyberBug in Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0 flex items-center justify-center">
        <CyberBug size={460} />
      </div>

      <main id="main-content" className="relative z-10 mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-12">
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
            <span className="h-2 w-2 rounded-full bg-signal" />
            <span>CORE COMPETENCIES &amp; VERIFIED PROOFS</span>
          </div>
        </div>

        {/* Skills Header */}
        <header className="mt-8 relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-6 sm:p-10">
          <Corner />
          <div className="mono text-[11px] tracking-[0.2em] text-signal uppercase font-bold">
            ▲ TECHNICAL PROFICIENCY MATRIX
          </div>
          <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-paper">
            Engineering Skills &amp; Domain Mastery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paper-2 leading-relaxed max-w-3xl">
            Every capability listed here is backed by deployed production software, open-source repositories, or formal mathematical research papers.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-line/70 pt-4">
            {profile.stack.map((s) => (
              <span key={s} className="mono text-[11px] rounded bg-ink-3 px-2.5 py-1 text-paper-2 border border-line">
                {s}
              </span>
            ))}
          </div>
        </header>

        {/* Categories Breakdown */}
        <div className="mt-12 space-y-10">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <section key={cat.title} className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 relative">
                <Corner />
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line-2 bg-ink-3">
                    <Icon className="h-5 w-5" style={{ color: cat.accent }} />
                  </div>
                  <div>
                    <div className="mono text-[10px] tracking-wider uppercase font-semibold" style={{ color: cat.accent }}>
                      DOMAIN 0{idx + 1}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-paper mt-0.5">{cat.title}</h2>
                    <p className="text-sm text-paper-2 mt-1.5 leading-relaxed">{cat.summary}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {cat.skills.map((s) => (
                    <div
                      key={s.name}
                      className="rounded-xl border border-line/80 bg-ink-3/40 p-4 hover:border-line transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-paper">{s.name}</span>
                          <span className="mono text-[10px] text-mute px-2 py-0.5 rounded bg-ink-4 border border-line">
                            {s.provenance}
                          </span>
                        </div>
                        <div className="mono text-xs font-semibold" style={{ color: cat.accent }}>
                          {s.level}% Mastery
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-4">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${s.level}%`, background: cat.accent }}
                        />
                      </div>

                      <p className="mt-2 text-xs text-paper-2 leading-relaxed">{s.details}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Dedicated Skills AI Agent Section */}
        <section className="mt-14 rounded-2xl border border-line bg-ink-2/95 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-teal/40 bg-teal/10 text-teal">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-paper">Ask the Skills &amp; Qualifications Agent</h3>
              <p className="mono text-[11px] text-mute">Grounded in verified experience at ML1, academic coursework &amp; research</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {samplePrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                className="mono text-[11.5px] rounded-md border border-line-2 bg-ink-3 px-3 py-1.5 text-paper-2 hover:text-paper hover:border-signal/50 transition-colors text-left cursor-pointer"
              >
                <CornerDownRight className="inline h-3 w-3 mr-1 text-signal" /> {p}
              </button>
            ))}
          </div>

          <div className="space-y-3 max-h-[340px] overflow-y-auto rounded-lg border border-line bg-ink p-4 mono text-[12.5px] leading-relaxed">
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
                <span>Evaluating qualifications graph...</span>
              </div>
            )}
          </div>

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
              placeholder="Ask about Adil's backend experience, RAG skills, or internship at ML1..."
              className="flex-1 rounded-md border border-line-2 bg-ink-3 px-4 py-2.5 text-xs sm:text-sm text-paper placeholder:text-mute focus:border-signal mono"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="inline-flex items-center gap-2 rounded-md bg-signal-solid px-5 py-2.5 text-xs sm:text-sm font-semibold text-on-solid hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
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
    </div>
  );
}
