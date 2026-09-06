"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download,
  BookOpen,
  Layers,
  Check,
  Copy,
  X,
  Menu,
} from "lucide-react";
import { PortfolioAssistant } from "@/components/portfolio-assistant";

interface PaperItem {
  id: string;
  title: string;
  subtitle: string;
  authors: string;
  status: string;
  statusBadge: string;
  datasetOrDomain: string;
  pdfUrl?: string;
  repoUrl?: string;
  executiveSummary: string;
  badges: { label: string; value: string }[];
  deepDive: {
    problem: string;
    methodology: string;
    validation: string;
  };
}

const RESEARCH_PAPERS: PaperItem[] = [
  {
    id: "eeg-confound",
    title: "A Mislabeled Contrast, Recovered: Blocked EEG Decoding Confound",
    subtitle: "Diagnosing and Correcting an Encode/Test-Phase Confound in Blocked EEG Decoding",
    authors: "Muhammad Hassan Siddiqui & Muhammad Adil Usmani",
    status: "Co-Authored Research Paper",
    statusBadge: "Co-Authored · ds005189 Reanalysis",
    datasetOrDomain: "OpenNeuro ds005189 (EEG Decoding)",
    pdfUrl: "/A_Mislabeled_Contrast_Recovered_EEG.pdf",
    repoUrl: "https://github.com/HassanSidd0946/Search-vs-Memorize-Correction",
    executiveSummary:
      "Diagnosed an analysis pipeline error in OpenNeuro ds005189 where 75% of class epochs were recognition-test responses rather than encoding trials (driving a spurious 70.78% artifact). After correcting to encode-only trials, recovered an authentic 57.73% (+7.73% above chance) pre-calibration neural signal validated across 4 independent statistical controls.",
    badges: [
      { label: "Diagnosed Artifact", value: "70.78% accuracy" },
      { label: "Joint Criterion", value: "86.57% confirmed" },
      { label: "Recovered Signal", value: "57.73% (4 controls)" },
    ],
    deepDive: {
      problem:
        "Blocked EEG decoding paradigms often face insidious label-dictionary errors. In prior analyses, 4 distinct stimulus marker types were collapsed into a single index, leaking test-phase recognition epochs into the encoding class and producing a false 70.78% decoding claim.",
      methodology:
        "Formulated a composition-arithmetic diagnostic that mathematically accounted for all 13 reported mappings without ambiguity. Implemented a pre-registered Riemannian tangent space covariance classifier (MNE-Python) to decode the joint criterion directly.",
      validation:
        "Validated recovered 57.73% ± 0.05% signal across 4 independent statistical controls: 30-shuffle label permutation null, 29-fold leave-one-subject-out (LOSO) jackknife, 500-shuffle grand null, and parity-split counterbalancing.",
    },
  },
  {
    id: "fintech-fusion",
    title: "Deterministic Data Fusion for FinTech",
    subtitle: "Fault-Tolerant State Synchronization Across Heterogeneous Financial Event Streams",
    authors: "Muhammad Adil Usmani",
    status: "Published Research Paper",
    statusBadge: "Published Paper · Peer Preprint",
    datasetOrDomain: "Distributed Systems & Financial Ledgers",
    pdfUrl: "/Deterministic_Data_Fusion_for_FinTech.pdf",
    executiveSummary:
      "Engineered a high-throughput, low-latency financial state synchronization pipeline employing hybrid logical clocks (HLC) and idempotent event folds under SERIALIZABLE isolation, guaranteeing replay-equivalent balances with zero ledger skew.",
    badges: [
      { label: "Partition Throughput", value: "42k ev/s" },
      { label: "Reconciliation", value: "<120ms p99" },
      { label: "Ledger Drift", value: "0 discrepancies" },
    ],
    deepDive: {
      problem:
        "Distributed multi-region financial networks suffer from write skew, network partitions, and out-of-order event ingestion that introduce balance discrepancies and non-deterministic transaction execution across heterogeneous ledgers.",
      methodology:
        "Combined hybrid logical clocks (HLC) with strict monotonic sequence indexing, monotonic event folding, and an asynchronous transactional outbox auditor running continuous checksum diffs against PostgreSQL source-of-truth snapshots.",
      validation:
        "Sustained 42,000 events/sec per partition with zero ledger discrepancies under 14 days of continuous Byzantine fault injection and synthetic network partition chaos engineering.",
    },
  },
  {
    id: "anarchist-llm",
    title: "Anarchist LLM: Disguised Algorithmic Reasoning",
    subtitle: "Pre-1900 Persona Constraint & Transformer Benchmarking on Modal A100 Clusters",
    authors: "Muhammad Adil Usmani",
    status: "Working Paper in Preparation",
    statusBadge: "Working Paper · Modal GPU Cluster",
    datasetOrDomain: "Transformer Reasoning & FlashAttention-3",
    repoUrl: "https://github.com/AadilUsmani/Anarchist-LLM",
    executiveSummary:
      "Autonomous research pipeline evaluating emergent algorithmic problem-solving in transformers when strictly forbidden from using modern computing jargon (enforced pre-1900 Victorian constraint). Accelerated inference by 4.38x on serverless NVIDIA A100 GPU clusters via FlashAttention-3 kernels.",
    badges: [
      { label: "Attention Speedup", value: "4.38x (Flash-3)" },
      { label: "Cluster GPUs", value: "NVIDIA A100-80GB" },
      { label: "Cold Start", value: "< 1.5 seconds" },
    ],
    deepDive: {
      problem:
        "Probing whether neural network reasoning is tied to semantic memorization of programming terminology or genuine algorithmic logic synthesis. Testing transformers under strict Victorian English lexical constraints.",
      methodology:
        "Built distributed serverless inference workers on Modal.com orchestrating A100 SXM4-80GB GPUs with custom FlashAttention-3 kernels, Byte Pair Encoding (BPE), and automated SQLite experiment telemetry with interactive Streamlit dashboards.",
      validation:
        "Reduced token latency from 184ms down to 42ms/token (4.38x acceleration) and established baseline reasoning curves across 200+ multi-step algorithmic challenges without computing vocabulary.",
    },
  },
];

interface SystemItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  githubUrl: string;
  liveUrl?: string;
  executiveSummary: string;
  badges: { label: string; value: string }[];
  deepDive: {
    challenge: string;
    architecture: string;
    impact: string;
  };
}

const PRODUCTION_SYSTEMS: SystemItem[] = [
  {
    id: "lexical-graph-rag",
    name: "Lexical Graph RAG — SEC 10-K Intelligence",
    subtitle: "Knowledge Graph Deduplication & Multi-Hop Query Routing",
    category: "Knowledge Graphs · LangGraph",
    githubUrl: "https://github.com/AadilUsmani/Lexical_Graph_RAG",
    liveUrl: "https://deepwiki.com/AadilUsmani/Lexical_Graph_RAG",
    executiveSummary:
      "Dual-channel Knowledge Graph RAG architecture over complex 200+ page SEC 10-K filings using Neo4j and LangGraph, slashing hallucination rates down to sub-2.0% via lexical entity deduplication.",
    badges: [
      { label: "Hallucination Rate", value: "< 2.0%" },
      { label: "Database", value: "Neo4j Graph" },
      { label: "Routing", value: "Multi-Hop LangGraph" },
    ],
    deepDive: {
      challenge:
        "Dense annual financial reports (SEC 10-K) contain redundant cross-references and multi-year entity variations that overwhelm standard vector search with irrelevant chunks.",
      architecture:
        "Extracted structural financial tables and qualitative disclosures into Neo4j graph nodes. Built lexical graph deduplication algorithms to merge duplicate enterprise entities and executed multi-hop Cypher queries orchestrated via LangGraph state machines.",
      impact:
        "Achieved 96.2% multi-hop question-answering accuracy with <2% hallucination rate, tested against SEC disclosures of Fortune 500 enterprises.",
    },
  },
  {
    id: "crag",
    name: "Corrective RAG (CRAG) — Self-Correcting Engine",
    subtitle: "Adaptive 3-Way Confidence Threshold Routing & Web Fallback",
    category: "Self-Correcting RAG · LangGraph",
    githubUrl: "https://github.com/AadilUsmani/Corrective_rag_CRAG",
    liveUrl: "https://deepwiki.com/AadilUsmani/Corrective_rag_CRAG",
    executiveSummary:
      "High-speed adaptive RAG pipeline routing verified queries directly (≥0.70 confidence), triggering real-time Tavily search for unknown domains (<0.30), and decomposing ambiguous queries in parallel.",
    badges: [
      { label: "End-to-End Latency", value: "3–8s" },
      { label: "Unnecessary Calls", value: "-60% Web Searches" },
      { label: "Factual Precision", value: "95%+" },
    ],
    deepDive: {
      challenge:
        "Naive RAG either answers incorrectly when knowledge is missing locally or incurs immense latency by querying external search engines indiscriminately on simple questions.",
      architecture:
        "Constructed a LangGraph evaluation agent with 3-way confidence threshold logic: pass high-confidence embeddings immediately, route low-confidence queries to Tavily web search, and split ambiguous queries into parallel sub-prompts.",
      impact:
        "Slashed unnecessary external search calls by 60%, delivering grounded answers in 3–8 seconds with verified citation links.",
    },
  },
  {
    id: "sems-crypto",
    name: "Secure Examination Management System (SEMS)",
    subtitle: "Hybrid AES-256-GCM + RSA-3072 Cryptosystem with Scoped RBAC",
    category: "Zero-Trust Cryptosystem · FastAPI",
    githubUrl: "https://github.com/AadilUsmani/Crypto_secure_system",
    executiveSummary:
      "Zero-trust academic portal providing end-to-end cryptographic confidentiality and tamper-proof verification via hybrid AES-256-GCM symmetric encryption and RSA-3072 key exchange with Argon2id password hashing.",
    badges: [
      { label: "Symmetric Cipher", value: "AES-256-GCM" },
      { label: "Key Exchange", value: "RSA-3072 OAEP" },
      { label: "Password Hash", value: "Argon2id" },
    ],
    deepDive: {
      challenge:
        "Academic examination papers require immutable tamper protection, confidential transit, and strict multi-tier role authorization without exposing raw key material.",
      architecture:
        "Generated unique 96-bit nonces per file with 128-bit authentication tags in AES-256-GCM. Encapsulated session keys with RSA-3072 PKCS#1 OAEP. Backed by an async FastAPI engine with Alembic migrations, scoped JWT tokens (Admin, Faculty, HOD, Staff), and in-memory MIME magic-number sniffing.",
      impact:
        "Zero ciphertext tamper vulnerabilities confirmed under automated Pytest security suites with verified cryptographic integrity.",
    },
  },
  {
    id: "titan-memory",
    name: "Titan Memory Architecture Implementation",
    subtitle: "Long-Horizon Context Retention & Associative Neural Recall",
    category: "Memory NLP · PyTorch",
    githubUrl: "https://github.com/AadilUsmani/implementing_titan_architecture",
    executiveSummary:
      "Empirical PyTorch implementation of Google's Titan long-term memory architecture, evaluating context retention and associative recall across 180k-token corporate annual reports of 3 PSX-listed enterprises.",
    badges: [
      { label: "Token Horizon", value: "180k Tokens" },
      { label: "Recall @ 85k", value: "96.4%" },
      { label: "Recall @ 180k", value: "91.8%" },
    ],
    deepDive: {
      challenge:
        "Standard attention degrades past 100k tokens, forgetting cross-year financial metrics and strategic disclosures.",
      architecture:
        "Built persistent associative memory banks with decaying memory vectors and neural update gates, indexing multi-year financial statements.",
      impact:
        "Preserved 91.8% factual recall at 180,000 tokens, outperforming standard sliding-window context by 2.4x.",
    },
  },
  {
    id: "aerosphere",
    name: "AeroSphere — 72hr Air Quality Forecasting",
    subtitle: "NASA TEMPO Satellite Ingestion & PyTorch LSTM on Azure",
    category: "Time-Series ML · Apache Airflow",
    githubUrl: "https://github.com/AadilUsmani/AeroSphere",
    executiveSummary:
      "Automated Apache Airflow data pipeline ingesting 1.2M+ daily satellite records from NASA TEMPO, training PyTorch LSTM recurrent models to predict 72-hour PM2.5 concentrations across 45 major cities with 85%+ accuracy.",
    badges: [
      { label: "Forecast Horizon", value: "72 Hours" },
      { label: "Daily Records", value: "1.2M+ Ingested" },
      { label: "Model Accuracy", value: "85%+ PM2.5" },
    ],
    deepDive: {
      challenge:
        "Processing high-velocity satellite raster feeds and training multi-step forecasting models capable of predicting atmospheric particulate shifts ahead of severe air quality events.",
      architecture:
        "Airflow DAGs orchestrating automated ETL from NASA TEMPO streams to Azure blob storage, feeding a stacked LSTM model with rolling temporal windows and automated health advisory generators.",
      impact:
        "Deployed automated public health forecasting across 45 major cities with continuous daily inference.",
    },
  },
];

export function PortfolioV2_1() {
  const [activePdf, setActivePdf] = useState<string | null>(null);
  const [expandedPapers, setExpandedPapers] = useState<Record<string, boolean>>({});
  const [expandedSystems, setExpandedSystems] = useState<Record<string, boolean>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const togglePaper = (id: string) => {
    setExpandedPapers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSystem = (id: string) => {
    setExpandedSystems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyEmail = () => {
    const email = "muhammadaadilusmani@gmail.com";
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollTo = (id: string) => {
    setIsNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activePdf) {
        setActivePdf(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePdf]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans antialiased selection:bg-teal-500/20 selection:text-teal-900 dark:selection:text-teal-200">
      {/* Background Subtle Gradient Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      {/* ── Fixed Header / Navigation ── */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#090d16]/80 backdrop-blur-md transition-colors">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500 font-bold text-xs text-white shadow-sm transition-transform group-hover:scale-105">
                AU
              </div>
              <div>
                <div className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Muhammad Adil Usmani
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  AI Engineer · Lahore, PK
                </div>
              </div>
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => scrollTo("research")}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Research Papers (02)
            </button>
            <button
              onClick={() => scrollTo("systems")}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Core Systems (05)
            </button>
            <button
              onClick={() => scrollTo("experience")}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Experience
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="/Muhammad_Adil_Usmani_cv.pdf"
              download
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
              <span>Resume</span>
            </a>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedEmail ? "Copied" : "Copy Email"}</span>
            </button>
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="md:hidden rounded-lg border border-slate-200 dark:border-slate-800 p-1.5 text-slate-600 dark:text-slate-400 cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {isNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isNavOpen && (
          <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 md:hidden space-y-2">
            <button
              onClick={() => scrollTo("research")}
              className="block w-full text-left py-2 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Research Papers (02)
            </button>
            <button
              onClick={() => scrollTo("systems")}
              className="block w-full text-left py-2 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Core Systems (05)
            </button>
            <button
              onClick={() => scrollTo("experience")}
              className="block w-full text-left py-2 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Experience &amp; Education
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="block w-full text-left py-2 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Contact
            </button>
          </div>
        )}
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-24">
        {/* ── 1. Hero Section (Calm, High-Signal, Low Cognitive Load) ── */}
        <section id="hero" className="space-y-6 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-950/40 px-3.5 py-1 text-xs font-mono text-indigo-700 dark:text-indigo-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            </span>
            <span>Data Science Intern at ML1 · Co-Author in EEG Neural Decoding</span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Applicational AI, RAG Pipelines &amp; Deterministic Systems.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              I build enterprise AI workflows that eliminate manual friction — orchestrating Knowledge Graph RAG, serverless GPU inference clusters, and cryptographically verified pipelines. Co-authored research on EEG decoding confounds and published in distributed event fusion.
            </p>
          </div>

          {/* Clean 4-Stat Badge Bar (Zero Clutter) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-4 shadow-sm">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">FinTech Ingestion</div>
              <div className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                42k ev/s
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">SERIALIZABLE zero skew</div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-4 shadow-sm">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">EEG Confound Recovery</div>
              <div className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-teal-600 dark:text-teal-400">
                57.73%
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">Genuine signal recovered</div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-4 shadow-sm">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">FlashAttention-3</div>
              <div className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-sky-600 dark:text-sky-400">
                4.38x
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">Modal A100 GPU speedup</div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-4 shadow-sm">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Lexical Graph RAG</div>
              <div className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-violet-600 dark:text-violet-400">
                &lt; 2.0%
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">Neo4j SEC 10-K hallucinations</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollTo("research")}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-xs sm:text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Read Research Papers</span>
            </button>
            <button
              onClick={() => scrollTo("systems")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer"
            >
              <Layers className="h-4 w-4 text-slate-500" />
              <span>Explore Systems</span>
            </button>
            <a
              href="https://github.com/AadilUsmani"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
            >
              <Github className="h-4 w-4 text-slate-500" />
              <span>GitHub</span>
            </a>
          </div>
        </section>

        {/* ── 2. Research Papers Section (Both In-Browser PDFs + Working Paper) ── */}
        <section id="research" className="space-y-8 scroll-mt-20">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              <span>Section 01</span>
              <span>·</span>
              <span>Formal Publications</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Research Papers &amp; Scholarly Works
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Two formal papers viewable directly in the built-in reader, plus one working paper on time-constrained algorithmic reasoning.
            </p>
          </div>

          <div className="space-y-6">
            {RESEARCH_PAPERS.map((paper) => {
              const isExpanded = !!expandedPapers[paper.id];
              return (
                <article
                  key={paper.id}
                  className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-7 shadow-sm transition-all hover:border-indigo-300 dark:hover:border-indigo-700/60"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 text-[10.5px] font-mono font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                          {paper.statusBadge}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {paper.datasetOrDomain}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        {paper.title}
                      </h3>
                      <div className="text-xs font-mono text-teal-600 dark:text-teal-400 font-medium">
                        Authors: {paper.authors}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                        {paper.executiveSummary}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex shrink-0 flex-wrap md:flex-col items-start md:items-end gap-2 pt-2 md:pt-0">
                      {paper.pdfUrl ? (
                        <>
                          <button
                            onClick={() => setActivePdf(paper.pdfUrl!)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                          >
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>Read PDF</span>
                          </button>
                          <a
                            href={paper.pdfUrl}
                            download
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                          >
                            <Download className="h-3 w-3 text-slate-400" />
                            <span>Download</span>
                          </a>
                        </>
                      ) : null}

                      {paper.repoUrl ? (
                        <a
                          href={paper.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                        >
                          <Github className="h-3 w-3 text-slate-400" />
                          <span>Code Repository</span>
                        </a>
                      ) : null}
                    </div>
                  </div>

                  {/* Scannable Metric Badges */}
                  <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {paper.badges.map((b, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 text-[11px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        <span className="text-slate-400 font-sans">{b.label}:</span>
                        <strong className="font-semibold text-slate-900 dark:text-slate-100">{b.value}</strong>
                      </span>
                    ))}

                    <button
                      onClick={() => togglePaper(paper.id)}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer pt-1"
                    >
                      <span>{isExpanded ? "Hide Technical Details" : "Technical Deep Dive & Proofs"}</span>
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  {/* Progressive Disclosure: Expandable Technical Deep Dive */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-3 rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20 p-4 text-xs sm:text-[13px] leading-relaxed">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-slate-100">Root Cause &amp; Problem: </span>
                            <span className="text-slate-700 dark:text-slate-300">{paper.deepDive.problem}</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-slate-100">Methodology &amp; Architecture: </span>
                            <span className="text-slate-700 dark:text-slate-300">{paper.deepDive.methodology}</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-slate-100">Statistical Verification: </span>
                            <span className="text-slate-700 dark:text-slate-300">{paper.deepDive.validation}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── 3. Flagship Systems (Executive Summary + Expandable Deep Dives) ── */}
        <section id="systems" className="space-y-8 scroll-mt-20">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
              <span>Section 02</span>
              <span>·</span>
              <span>Production Systems</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Applicational AI &amp; Systems Engineering
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Click &quot;Technical Deep Dive&quot; on any card to view architectural decisions, proofs, and benchmarks.
            </p>
          </div>

          <div className="space-y-6">
            {PRODUCTION_SYSTEMS.map((sys) => {
              const isExpanded = !!expandedSystems[sys.id];
              return (
                <div
                  key={sys.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-7 shadow-sm transition-all hover:border-teal-300 dark:hover:border-teal-700/60"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 text-[10.5px] font-mono font-semibold text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
                          {sys.category}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        {sys.name}
                      </h3>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {sys.subtitle}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                        {sys.executiveSummary}
                      </p>
                    </div>

                    {/* Action Links */}
                    <div className="flex shrink-0 flex-wrap md:flex-col items-start md:items-end gap-2 pt-2 md:pt-0">
                      <a
                        href={sys.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                      >
                        <Github className="h-3.5 w-3.5 text-slate-400" />
                        <span>Repository</span>
                      </a>
                      {sys.liveUrl ? (
                        <a
                          href={sys.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 text-xs font-semibold shadow-sm transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Live Demo</span>
                        </a>
                      ) : null}
                    </div>
                  </div>

                  {/* Scannable Badges */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {sys.badges.map((b, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 text-[11px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        <span className="text-slate-400 font-sans">{b.label}:</span>
                        <strong className="font-semibold text-slate-900 dark:text-slate-100">{b.value}</strong>
                      </span>
                    ))}

                    <button
                      onClick={() => toggleSystem(sys.id)}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer pt-1"
                    >
                      <span>{isExpanded ? "Hide Details" : "Technical Deep Dive & Architecture"}</span>
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  {/* Expandable Technical Accordion */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-3 rounded-xl border border-teal-100 dark:border-teal-900/40 bg-teal-50/40 dark:bg-teal-950/20 p-4 text-xs sm:text-[13px] leading-relaxed">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-slate-100">Engineering Challenge: </span>
                            <span className="text-slate-700 dark:text-slate-300">{sys.deepDive.challenge}</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-slate-100">Architectural Solution: </span>
                            <span className="text-slate-700 dark:text-slate-300">{sys.deepDive.architecture}</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-slate-100">Measured Impact: </span>
                            <span className="text-slate-700 dark:text-slate-300">{sys.deepDive.impact}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 4. Experience & Education ── */}
        <section id="experience" className="space-y-8 scroll-mt-20">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest">
              <span>Section 03</span>
              <span>·</span>
              <span>Work &amp; Education</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Professional Experience
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 text-[10px] font-mono font-semibold text-indigo-700 dark:text-indigo-300">
                  Jul 2026 – Present
                </span>
                <span className="text-xs text-slate-500 font-mono">Lahore, Pakistan</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Data Science Intern · ML1
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Previously Data Science Trainee (Jun 2026 – Jul 2026)
                </p>
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 list-disc list-inside leading-relaxed">
                <li>Building end-to-end AI automation workflows replacing repetitive manual operations for enterprises.</li>
                <li>Engineered internal automated ticketing triage, semantic routing, and resolution pipelines.</li>
                <li>Developed multi-agent customer support workflows for inquiry classification and grounded response generation.</li>
                <li>Architected candidate screening pipelines automating resume parsing and interview scheduling.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-700 dark:text-slate-300">
                  BS Computer Science
                </span>
                <span className="text-xs text-slate-500 font-mono">Lahore, Pakistan</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  University of Central Punjab (UCP)
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Foundations in algorithms, distributed systems &amp; statistical learning
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="font-semibold text-slate-900 dark:text-slate-100">Certifications &amp; Specializations:</div>
                <div className="text-[12px] space-y-1">
                  <div>• Supervised Machine Learning (Stanford / Coursera)</div>
                  <div>• Introduction to Generative AI (Coursera)</div>
                  <div>• Machine Learning Specialization (Stanford - In Progress)</div>
                  <div>• LLMOps Specialization (Duke University - In Progress)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Contact Section ── */}
        <section id="contact" className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-50/50 to-teal-50/30 dark:from-indigo-950/20 dark:to-teal-950/10 p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Let&apos;s Build Something Resilient.
          </h2>
          <p className="mx-auto max-w-xl text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Interested in Applicational AI, Graph RAG pipelines, or high-throughput distributed systems? Reach out directly via email or LinkedIn.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              {copiedEmail ? <Check className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
              <span>{copiedEmail ? "Email Copied!" : "muhammadaadilusmani@gmail.com"}</span>
            </button>
            <a
              href="https://linkedin.com/in/muhammad-adil-usmani-9bb557314"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
            >
              <Linkedin className="h-4 w-4 text-indigo-600" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/AadilUsmani"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </main>

      {/* ── In-Browser PDF Reader Modal (Clean, Dedicated) ── */}
      <AnimatePresence>
        {activePdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/80 p-3 sm:p-6 backdrop-blur-sm"
            onClick={() => setActivePdf(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl"
              role="dialog"
              aria-label="In-Browser PDF Reader"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                      {activePdf.includes("EEG")
                        ? "A Mislabeled Contrast, Recovered: Blocked EEG Decoding Confound"
                        : "Deterministic Data Fusion for FinTech"}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {activePdf.toUpperCase()} · IN-BROWSER PDF VIEWER
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activePdf}
                    download
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </a>
                  <a
                    href={activePdf}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>New Tab</span>
                  </a>
                  <button
                    onClick={() => setActivePdf(null)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
                    aria-label="Close Reader"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer Embed */}
              <div className="relative flex-1 bg-slate-800">
                <object
                  data={`${activePdf}#view=FitH`}
                  type="application/pdf"
                  className="h-full w-full"
                  title="PDF Reader"
                >
                  <iframe
                    src={`${activePdf}#view=FitH`}
                    title="PDF Viewer"
                    className="h-full w-full border-0"
                  >
                    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center text-slate-300">
                      <p className="text-sm font-medium mb-3">
                        Your browser doesn&apos;t support inline PDF previews.
                      </p>
                      <a
                        href={activePdf}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
                      >
                        Open PDF in New Window
                      </a>
                    </div>
                  </iframe>
                </object>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Graph AI Assistant (Situated cleanly at bottom-right, 0 overlap with UI Switcher at bottom-left) */}
      <PortfolioAssistant />
    </div>
  );
}
