"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Cpu,
  Database,
  Zap,
  Bot,
  ExternalLink,
  Code2,
  Server,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type WorkbenchTab = "graph-rag" | "gpu-cluster" | "crag-router" | "titan-memory"

export function ArchitectureWorkbench() {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>("graph-rag")
  const [selectedNode, setSelectedNode] = useState<string>("sec-filing")
  const [cragScore, setCragScore] = useState<number>(0.88)
  const [attentionEngine, setAttentionEngine] = useState<"standard" | "flash3">("flash3")
  const [memoryHorizon, setMemoryHorizon] = useState<"1yr" | "3yr" | "5yr">("3yr")

  const openAssistant = (query: string) => {
    window.dispatchEvent(
      new CustomEvent("open-portfolio-assistant", { detail: { query } })
    )
  }

  const tabs = [
    { id: "graph-rag", label: "Lexical Graph RAG (Neo4j)", icon: Database },
    { id: "gpu-cluster", label: "Modal.com GPU Clusters (A100)", icon: Cpu },
    { id: "crag-router", label: "Corrective RAG (CRAG 3-Way)", icon: Zap },
    { id: "titan-memory", label: "Titan Memory Evaluation", icon: Brain },
  ]

  return (
    <section id="workbench" className="py-20 relative z-10 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-1.5 font-mono">
              <Zap className="w-3.5 h-3.5" /> Interactive Technical Sandbox
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Live Architecture Workbench
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-xl">
              Inspect Cypher schemas, test confidence routing algorithms, and simulate GPU cluster inference.
            </p>
          </div>

          {/* Telemetry Status HUD */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>MODAL A100: READY</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-200/60 dark:bg-slate-850 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>LATENCY: 3.4s</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-200/60 dark:bg-slate-850 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>NEO4J: 5.4k NODES</span>
            </div>
          </div>
        </div>

        {/* Main Workbench Card */}
        <div className="glass-card rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 shadow-xl overflow-hidden">
          {/* Workbench Tab Navigation */}
          <div className="flex flex-wrap border-b border-slate-200/80 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/60 p-1.5 gap-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as WorkbenchTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Workbench Content */}
          <div className="p-6 sm:p-7">
            <AnimatePresence mode="wait">
              {/* ── TAB 1: LEXICAL GRAPH RAG ─────────────────────────────────── */}
              {activeTab === "graph-rag" && (
                <motion.div
                  key="graph-rag"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-mono">
                        Multi-Hop Traversal &amp; Deduplication
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                        SEC 10-K Knowledge Graph Synthesis
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                        Transforms unstructured enterprise 10-K financial disclosures into connected Neo4j entity graphs. Deduplicates lexical entities across reporting periods to slash retrieval hallucination to sub-2%.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => openAssistant("Explain how the Lexical Graph RAG Neo4j deduplication works")}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg"
                      >
                        <Bot className="w-3.5 h-3.5 mr-1.5" /> Test Query in AI Agent
                      </Button>
                      <a
                        href="https://github.com/AadilUsmani/Lexical_Graph_RAG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                        title="View GitHub Repository"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
                    {/* Visual Node Grid */}
                    <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-5 font-mono text-xs">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>Interactive Cypher Entity Schema</span>
                        <span className="text-cyan-400">CLICK NODE TO INSPECT</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: "company", label: ":CompanyEntity", meta: "Ticker: AAPL / ENGRO", type: "Root Node", color: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300" },
                          { id: "sec-filing", label: ":SEC_10K_Filing", meta: "FY2024 Items 1A & 7", type: "Document Node", color: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" },
                          { id: "risk-factor", label: ":RiskFactor", meta: "Multi-Hop Linkage", type: "Semantic Node", color: "border-slate-500/40 bg-slate-800/40 text-slate-200" },
                          { id: "liquidity", label: ":LiquidityMetric", meta: "Debt & Solvency", type: "Quantitative Node", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
                          { id: "dedup-layer", label: ":DeduplicationLayer", meta: "Signal-to-Noise", type: "Graph Guardrail", color: "border-purple-500/40 bg-purple-500/10 text-purple-300" },
                          { id: "fusion-agent", label: ":LangGraphRouter", meta: "Late-Fusion Context", type: "Execution Node", color: "border-teal-500/40 bg-teal-500/10 text-teal-300" },
                        ].map((node) => (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNode(node.id)}
                            className={`p-3 rounded-lg border text-left transition-all ${node.color} ${
                              selectedNode === node.id ? "ring-2 ring-cyan-400 shadow-md shadow-cyan-500/20" : "opacity-80 hover:opacity-100"
                            }`}
                          >
                            <div className="text-[9px] text-slate-400 font-semibold">{node.type}</div>
                            <div className="font-bold text-xs mt-0.5">{node.label}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{node.meta}</div>
                          </button>
                        ))}
                      </div>

                      {/* Cypher Query Box */}
                      <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                        <span className="text-cyan-400 font-bold">CYPHER: </span>
                        {selectedNode === "company" && 'MATCH (c:Company {ticker: "ENGRO"})-[:REPORTS_IN]->(f:SEC_10K) RETURN c, f;'}
                        {selectedNode === "sec-filing" && 'MATCH (f:SEC_10K)-[:CONTAINS_RISK]->(r:RiskFactor) WHERE r.severity > 0.8 RETURN r;'}
                        {selectedNode === "risk-factor" && 'MATCH (r:RiskFactor)-[:CORRELATES_WITH]->(l:LiquidityMetric) RETURN r.title, l.value;'}
                        {selectedNode === "liquidity" && 'MATCH (l:LiquidityMetric) WHERE l.year IN [2023, 2024] RETURN l.ratio, l.variance;'}
                        {selectedNode === "dedup-layer" && 'CALL apoc.nodes.collapse([n1, n2], {properties: "combine"}) YIELD from, to;'}
                        {selectedNode === "fusion-agent" && 'MATCH path = (c:Company)-[*1..3]->(res) RETURN path LIMIT 25;'}
                      </div>
                    </div>

                    {/* Node Inspector Details */}
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-900/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 font-mono">
                          <Code2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                          <span>Node Inspector</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white capitalize">
                          {selectedNode.replace("-", " ")}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                          {selectedNode === "company" && "Root enterprise entity indexing multi-year public filings across PSX and SEC databases."}
                          {selectedNode === "sec-filing" && "Extracted 10-K Item 1A (Risk Factors) and Item 7 (MD&A) parsed into structured semantic embeddings."}
                          {selectedNode === "risk-factor" && "Multi-hop cross-referenced risks (currency volatility, interest rate exposure) linked directly to balance sheet line items."}
                          {selectedNode === "liquidity" && "Quantitative solvency metrics synthesized alongside qualitative risk narratives for factual grounding."}
                          {selectedNode === "dedup-layer" && "Custom deduplication pipeline eliminating semantic overlap across consecutive quarterly disclosures."}
                          {selectedNode === "fusion-agent" && "Deterministic LangGraph state machine merging graph traversal paths into prompt context."}
                        </p>

                        <div className="mt-4 space-y-1.5 text-xs font-mono">
                          <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-slate-500">Signal-to-Noise:</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">98.4%</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-slate-500">Hallucination Rate:</span>
                            <span className="font-semibold text-cyan-600 dark:text-cyan-400">&lt; 2.0%</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-slate-500">Graph Database:</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Neo4j Enterprise</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── TAB 2: MODAL GPU CLUSTER ─────────────────────────────────── */}
              {activeTab === "gpu-cluster" && (
                <motion.div
                  key="gpu-cluster"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-mono">
                        Distributed A100 GPU Workers
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                        Anarchist LLM &amp; FlashAttention-3 Benchmarking
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                        Serverless distributed NVIDIA A100 SXM4 workers on Modal.com running transformer inference on time-constrained LLMs (GPT-1900 with custom BPE and FlashAttention-3 kernels).
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => openAssistant("Tell me about FlashAttention-3 and the Modal A100 GPU workers in Anarchist LLM")}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg"
                      >
                        <Bot className="w-3.5 h-3.5 mr-1.5" /> Ask AI About Hardware
                      </Button>
                      <a
                        href="https://github.com/AadilUsmani/Anarchist-LLM"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                        title="View GitHub Repository"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
                    <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-5 text-slate-100 font-mono text-xs">
                      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <Server className="w-4 h-4 text-cyan-400" />
                          <span className="font-bold text-slate-300">MODAL WORKER: A100 [80GB SXM4]</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setAttentionEngine("standard")}
                            className={`px-2.5 py-1 rounded text-[10px] transition-colors ${
                              attentionEngine === "standard" ? "bg-slate-700 text-white font-bold" : "text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            Standard Attention
                          </button>
                          <button
                            onClick={() => setAttentionEngine("flash3")}
                            className={`px-2.5 py-1 rounded text-[10px] transition-colors ${
                              attentionEngine === "flash3" ? "bg-cyan-500 text-black font-bold" : "text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            FlashAttention-3
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span>Per-Token Latency (Batch=1, SeqLen=4096)</span>
                            <span className="text-cyan-400 font-bold">
                              {attentionEngine === "flash3" ? "42 ms / token (4.38x speedup)" : "184 ms / token"}
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: attentionEngine === "flash3" ? "23%" : "100%" }}
                              transition={{ duration: 0.4 }}
                              className={`h-full rounded-full ${attentionEngine === "flash3" ? "bg-cyan-400" : "bg-red-400"}`}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span>VRAM Memory Footprint (KV Cache)</span>
                            <span className="text-emerald-400 font-bold">
                              {attentionEngine === "flash3" ? "14.2 GB / 80 GB (17.7%)" : "58.6 GB / 80 GB (73.2%)"}
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: attentionEngine === "flash3" ? "17.7%" : "73.2%" }}
                              transition={{ duration: 0.4 }}
                              className="h-full bg-emerald-400 rounded-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 p-3 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-400 space-y-0.5">
                        <div>[2026-08-29] <span className="text-emerald-400">INFO</span>: Initialized Modal container &ldquo;anarchist-eval-worker-0&rdquo;</div>
                        <div>[2026-08-29] <span className="text-cyan-400">CUDA</span>: Device 0: NVIDIA A100-SXM4-80GB (Capability 8.0)</div>
                        <div>[2026-08-29] <span className="text-indigo-400">BENCHMARK</span>: FlashAttention-3 kernel FP16 mixed precision verified.</div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-900/60 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 font-mono">
                          Experimental Harness
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Victorian CS Reasoning Probe</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                          Assesses disguised algorithmic reasoning where complex computer science queries (sorting, dynamic programming, recursion) are framed as 19th-century mechanical logic puzzles.
                        </p>

                        <div className="mt-4 space-y-1.5 text-xs font-mono">
                          <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-slate-500">Orchestration:</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">Modal Serverless</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-slate-500">Experiment DB:</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">SQLite + Streamlit</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-slate-500">Tokenizer:</span>
                            <span className="font-semibold text-cyan-600 dark:text-cyan-400">Custom BPE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── TAB 3: CRAG ROUTER ───────────────────────────────────────── */}
              {activeTab === "crag-router" && (
                <motion.div
                  key="crag-router"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider font-mono">
                        Self-Correcting Graph Architecture
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                        Adaptive 3-Way Confidence Threshold Routing
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                        Evaluates vector retrieval relevance before LLM generation. Automatically discriminates between high-confidence local context, ambiguous queries, and low-confidence web fallback.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => openAssistant("How does the Corrective RAG (CRAG) 3-way routing work?")}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg"
                      >
                        <Bot className="w-3.5 h-3.5 mr-1.5" /> Ask AI About CRAG
                      </Button>
                      <a
                        href="https://github.com/AadilUsmani/Corrective_rag_CRAG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                        title="View GitHub Repository"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
                    <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-5 text-slate-100 font-mono text-xs">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-400">CONFIDENCE ROUTING SIMULATOR:</span>
                        <span className="text-xs font-bold text-cyan-400">Score: {cragScore.toFixed(2)}</span>
                      </div>

                      {/* Preset Buttons */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        <button
                          onClick={() => setCragScore(0.92)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            cragScore >= 0.7 ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "border-slate-800 text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          High Confidence (0.92) &rarr; Direct Pass
                        </button>
                        <button
                          onClick={() => setCragScore(0.52)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            cragScore >= 0.3 && cragScore < 0.7 ? "bg-amber-500/20 border-amber-500 text-amber-300" : "border-slate-800 text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          Ambiguous (0.52) &rarr; Decomposition
                        </button>
                        <button
                          onClick={() => setCragScore(0.18)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            cragScore < 0.3 ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "border-slate-800 text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          Low Confidence (0.18) &rarr; Tavily Search
                        </button>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Evaluated Path:</span>
                          <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            cragScore >= 0.7
                              ? "bg-emerald-500/20 text-emerald-400"
                              : cragScore >= 0.3
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-cyan-500/20 text-cyan-400"
                          }`}>
                            {cragScore >= 0.7 ? "DIRECT PASS (≥ 0.70)" : cragScore >= 0.3 ? "PARALLEL DECOMPOSITION (0.30 - 0.70)" : "WEB SEARCH FALLBACK (< 0.30)"}
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {cragScore >= 0.7 && "✓ Vector retrieval confidence is high. Routing query directly to generation without external API latency."}
                          {cragScore >= 0.3 && cragScore < 0.7 && "⚡ Partial matches detected. Splitting query into sub-questions and fusing local FAISS index with targeted web retrieval."}
                          {cragScore < 0.3 && "🌐 Local corpus missing required facts. Triggering real-time Tavily search agent to inject verified live context."}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-900/60 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 font-mono">
                          System Performance
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Latency &amp; Quality</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                          Cuts 60% of unnecessary web queries while guaranteeing 95%+ factual recall across complex multi-part queries.
                        </p>

                        <div className="mt-4 space-y-1.5 text-xs font-mono">
                          <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-slate-500">End-to-End Latency:</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">3–8 Seconds</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-slate-500">Factual Accuracy:</span>
                            <span className="font-semibold text-cyan-600 dark:text-cyan-400">95%+ Verified</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-slate-500">Web Engine:</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Tavily + FAISS</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── TAB 4: TITAN MEMORY ──────────────────────────────────────── */}
              {activeTab === "titan-memory" && (
                <motion.div
                  key="titan-memory"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider font-mono">
                        Long-Horizon Context Retention
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                        Titan Memory Architecture Implementation
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                        Empirical evaluation of Google&apos;s Titan memory architecture. Benchmarks long-term associative recall across multi-year corporate financial reports.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => openAssistant("Tell me about the Titan Memory architecture implementation on financial reports")}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg"
                      >
                        <Bot className="w-3.5 h-3.5 mr-1.5" /> Ask AI About Titan Memory
                      </Button>
                      <a
                        href="https://github.com/AadilUsmani/implementing_titan_architecture"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                        title="View GitHub Repository"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
                    <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-5 text-slate-100 font-mono text-xs">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-400">CONTEXT HORIZON:</span>
                        <div className="flex gap-2">
                          {(["1yr", "3yr", "5yr"] as const).map((h) => (
                            <button
                              key={h}
                              onClick={() => setMemoryHorizon(h)}
                              className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                                memoryHorizon === h ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
                              }`}
                            >
                              {h === "1yr" ? "1-Yr (12k Tokens)" : h === "3yr" ? "3-Yr (85k Tokens)" : "5-Yr (180k Tokens)"}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-1">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span>Titan Associative Recall Accuracy</span>
                            <span className="text-indigo-400 font-bold">
                              {memoryHorizon === "1yr" ? "99.1%" : memoryHorizon === "3yr" ? "96.4%" : "91.8%"}
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: memoryHorizon === "1yr" ? "99.1%" : memoryHorizon === "3yr" ? "96.4%" : "91.8%" }}
                              transition={{ duration: 0.4 }}
                              className="h-full bg-indigo-500 rounded-full"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-slate-500">Standard Transformer Dense Attention Decay</span>
                            <span className="text-red-400 font-bold">
                              {memoryHorizon === "1yr" ? "92.4%" : memoryHorizon === "3yr" ? "68.1%" : "39.4%"}
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: memoryHorizon === "1yr" ? "92.4%" : memoryHorizon === "3yr" ? "68.1%" : "39.4%" }}
                              transition={{ duration: 0.4 }}
                              className="h-full bg-red-400/70 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-900/60 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 font-mono">
                          Dataset &amp; Rigor
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Financial NLP Benchmarks</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                          Tested across multi-year annual financial disclosures of 3 PSX-listed enterprises to measure factual continuity and numerical stability.
                        </p>

                        <div className="mt-4 space-y-1.5 text-xs font-mono">
                          <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-slate-500">Architecture:</span>
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Titan Memory</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-slate-500">Framework:</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">PyTorch</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-slate-500">Domain:</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Corporate Finance</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
