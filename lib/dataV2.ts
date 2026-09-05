export type NodeKind =
  | "input"
  | "service"
  | "store"
  | "model"
  | "agent"
  | "gate"
  | "output";

export type ArchNode = {
  id: string;
  label: string;
  kind: NodeKind;
  x: number; // 0..1000
  y: number; // 0..520
  detail: string;
  metrics: { k: string; v: string }[];
};

export type ArchEdge = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
};

export type Artifact = {
  kind: "paper" | "repo" | "demo" | "dataset";
  label: string;
  href: string;
  internal?: boolean;
};

export type Project = {
  id: string;
  index: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  outcomes: { label: string; value: string }[];
  artifacts: Artifact[];
  accent: string;
  graph: { nodes: ArchNode[]; edges: ArchEdge[]; flow: string[][] };
};

export const profile = {
  name: "Muhammad Adil Usmani",
  handle: "adil.usmani",
  role: "Software Engineer",
  focus: ["Backend Systems", "AI Agent Frameworks", "Distributed Architectures"],
  location: "Lahore, Pakistan",
  timezone: "Asia/Karachi",
  email: "muhammadaadilusmani@gmail.com",
  github: "https://github.com/AadilUsmani",
  linkedin: "https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314",
  cv: "/Muhammad_Adil_Usmani_cv.pdf",
  avatar: "/profile.jpg",
  summary:
    "I design the parts of software that have to be correct under pressure: retrieval pipelines that ground LLMs, agent graphs that don't drift, and data planes that stay deterministic at 40k events a second.",
  stack: [
    "FastAPI",
    "Python",
    "LangChain",
    "LangGraph",
    "Docker",
    "Next.js",
    "TypeScript",
    "Vector Databases",
    "Time-Series Deep Learning",
    "PostgreSQL",
    "PyTorch",
    "Modal",
  ],
  principles: [
    {
      title: "Determinism is a feature",
      body: "If replaying the log doesn't yield the same state, the system isn't finished. I design folds over ordered events, not mutable soup.",
    },
    {
      title: "Agents need rails",
      body: "Autonomy without checkpoints is a background job that fails silently. Every agent graph I ship has typed state, retries, and a human gate.",
    },
    {
      title: "Retrieval is the ceiling",
      body: "An LLM can only be as grounded as the context it's handed. I treat lexical, semantic and relational retrieval as parallel first-class channels.",
    },
  ],
};

export const projects: Project[] = [
  {
    id: "rag",
    index: "01",
    slug: "lexical-graph-hybrid-rag",
    title: "Lexical-Graph Hybrid RAG Architecture",
    shortTitle: "Hybrid RAG",
    category: "Advanced Retrieval-Augmented Generation / Knowledge Systems",
    tagline: "Dense vectors + sparse knowledge graphs, fused by RRF, reranked on demand.",
    problem:
      "Standard dense vector retrieval fails on keyword-dense domain jargon, exact entity references, and multi-hop inference where the answer is spread across several documents. Embeddings blur the rare identifiers that matter most in technical corpora.",
    solution:
      "A LangGraph-orchestrated retrieval plane that runs dense vector search, BM25 lexical search and a sparse entity knowledge graph walker in parallel. Candidates are merged with Reciprocal Rank Fusion using per-intent channel weights, then passed through a cross-encoder reranker whose depth adapts to the entropy of the fused score distribution. The result is a citation-annotated context window served through FastAPI.",
    stack: ["LangChain", "LangGraph", "Vector Databases", "Python", "FastAPI", "BM25", "Cross-Encoders"],
    outcomes: [
      { label: "Recall@10", value: "+21.4 pts" },
      { label: "Unsupported claims", value: "−37%" },
      { label: "Graph latency p95", value: "8 ms" },
    ],
    artifacts: [
      { kind: "repo", label: "GitHub", href: "https://github.com/AadilUsmani/Lexical_Graph_RAG" },
      { kind: "demo", label: "Live demo", href: "https://github.com/AadilUsmani/Lexical_Graph_RAG" },
    ],
    accent: "#ff8a3d",
    graph: {
      nodes: [
        { id: "q", label: "Query", kind: "input", x: 70, y: 260, detail: "Raw user question enters the FastAPI edge. Intent classifier tags it lexical / semantic / relational and extracts seed entities.", metrics: [{ k: "p50", v: "2 ms" }, { k: "intents", v: "3" }] },
        { id: "an", label: "Query Analyzer", kind: "agent", x: 230, y: 260, detail: "Lightweight NER + intent head. Produces channel weights w_c for fusion and a seed-entity list for the graph walker.", metrics: [{ k: "model", v: "distil-NER" }, { k: "p95", v: "6 ms" }] },
        { id: "dense", label: "Dense Retriever", kind: "store", x: 430, y: 110, detail: "Embedding search over a vector database. Great at paraphrase, weak on rare tokens.", metrics: [{ k: "index", v: "HNSW" }, { k: "topK", v: "50" }] },
        { id: "bm25", label: "BM25 Lexical", kind: "store", x: 430, y: 260, detail: "Sparse inverted index. Catches part numbers, error codes, API names the embeddings blur.", metrics: [{ k: "topK", v: "50" }, { k: "p95", v: "4 ms" }] },
        { id: "graph", label: "KG Walker", kind: "store", x: 430, y: 410, detail: "Bounded BFS from seed entities across typed co-occurrence edges. Supplies multi-hop neighbours.", metrics: [{ k: "depth", v: "≤3" }, { k: "p95", v: "8 ms" }] },
        { id: "rrf", label: "RRF Fusion", kind: "service", x: 630, y: 260, detail: "score(d) = Σ_c w_c / (60 + rank_c(d)). Channel weights are learned per intent class.", metrics: [{ k: "k", v: "60" }, { k: "channels", v: "3" }] },
        { id: "rr", label: "Dynamic Reranker", kind: "model", x: 790, y: 260, detail: "Cross-encoder reranking. Depth n scales with entropy of the fused distribution: flat → deep, peaked → short-circuit.", metrics: [{ k: "n", v: "8–40" }, { k: "p95", v: "41 ms" }] },
        { id: "ctx", label: "Context Window", kind: "output", x: 930, y: 260, detail: "Token-budgeted, citation-annotated context handed to the LLM.", metrics: [{ k: "budget", v: "6k tok" }, { k: "faithfulness", v: "0.86" }] },
      ],
      edges: [
        { from: "q", to: "an" },
        { from: "an", to: "dense", label: "w_sem" },
        { from: "an", to: "bm25", label: "w_lex" },
        { from: "an", to: "graph", label: "seeds" },
        { from: "dense", to: "rrf" },
        { from: "bm25", to: "rrf" },
        { from: "graph", to: "rrf" },
        { from: "rrf", to: "rr" },
        { from: "rr", to: "ctx" },
      ],
      flow: [["q", "an"], ["an", "dense"], ["an", "bm25"], ["an", "graph"], ["dense", "rrf"], ["bm25", "rrf"], ["graph", "rrf"], ["rrf", "rr"], ["rr", "ctx"]],
    },
  },
  {
    id: "fintech",
    index: "02",
    slug: "deterministic-data-fusion-fintech",
    title: "Deterministic Data Fusion for FinTech",
    shortTitle: "Deterministic Fusion",
    category: "Distributed Systems / Financial Engineering",
    tagline: "Replay-equivalent ledger state across heterogeneous event streams under heavy concurrency.",
    problem:
      "High-concurrency financial environments demand absolute determinism and fault-tolerant state synchronization across disparate data streams. Out-of-order, duplicated or partially-failed events, combined with weak isolation levels, produce race conditions, ledger drift and audits that cannot be reproduced.",
    solution:
      "A high-throughput, low-latency ingestion and reconciliation pipeline. Events receive deterministic partition keys and hybrid-logical-clock ordering, workers apply idempotent folds under SERIALIZABLE isolation with a transactional outbox, and a reconciliation daemon continuously diffs projected balances against source-of-truth snapshots. Replaying any prefix of the log yields byte-identical state.",
    stack: ["Distributed Event Streams", "Python", "Transaction Isolation Protocols", "PostgreSQL", "Hybrid Logical Clocks", "Idempotent Workers"],
    outcomes: [
      { label: "Throughput / partition", value: "42k ev/s" },
      { label: "Reconcile p99", value: "<120 ms" },
      { label: "Ledger discrepancies", value: "0 in 14d soak" },
    ],
    artifacts: [
      { kind: "paper", label: "Read the paper", href: "/Deterministic_Data_Fusion_for_FinTech.pdf", internal: true },
      { kind: "repo", label: "Architecture repository", href: "https://github.com/adilusmani/deterministic-data-fusion" },
    ],
    accent: "#4fd1c5",
    graph: {
      nodes: [
        { id: "rails", label: "Payment Rails", kind: "input", x: 70, y: 120, detail: "External payment processors. Arrive out of order with at-least-once delivery.", metrics: [{ k: "rate", v: "18k/s" }] },
        { id: "ledger", label: "Core Ledger", kind: "input", x: 70, y: 260, detail: "Internal double-entry ledger events.", metrics: [{ k: "rate", v: "14k/s" }] },
        { id: "market", label: "Market Feed", kind: "input", x: 70, y: 400, detail: "Instrument prices and FX rates. High volume, bursty.", metrics: [{ k: "rate", v: "10k/s" }] },
        { id: "gw", label: "Validating Gateway", kind: "gate", x: 260, y: 260, detail: "Schema validation, content-derived idempotency key, deterministic partition key (account / instrument) and monotonic sequence.", metrics: [{ k: "reject", v: "0.3%" }, { k: "p95", v: "3 ms" }] },
        { id: "stream", label: "Partitioned Log", kind: "store", x: 440, y: 260, detail: "Append-only partitioned event log. Total order per partition derived from hybrid logical clocks + source priority.", metrics: [{ k: "partitions", v: "64" }, { k: "retention", v: "∞" }] },
        { id: "fuse", label: "Fusion Worker", kind: "service", x: 620, y: 180, detail: "Pure fold over the ordered log. Bounded dedup window persisted atomically with state; outbox written in the same transaction.", metrics: [{ k: "isolation", v: "SERIALIZABLE" }, { k: "skew", v: "0" }] },
        { id: "recon", label: "Reconciliation Daemon", kind: "agent", x: 620, y: 350, detail: "Continuously diffs projected balances against source snapshots and emits discrepancy events with full causal lineage.", metrics: [{ k: "p99", v: "118 ms" }] },
        { id: "db", label: "Ledger Store", kind: "store", x: 800, y: 180, detail: "PostgreSQL with predicate locks. Every balance is reconstructible by replaying to a sequence number.", metrics: [{ k: "replay", v: "byte-identical" }] },
        { id: "dlq", label: "Discrepancy Topic", kind: "output", x: 800, y: 350, detail: "Dead-letter topic for divergences, consumed by ops and audit tooling.", metrics: [{ k: "14d soak", v: "0 events" }] },
        { id: "relay", label: "Outbox Relay", kind: "output", x: 940, y: 180, detail: "Dispatches side effects recorded in the outbox — effectively-once delivery downstream.", metrics: [{ k: "delivery", v: "effectively once" }] },
      ],
      edges: [
        { from: "rails", to: "gw" },
        { from: "ledger", to: "gw" },
        { from: "market", to: "gw" },
        { from: "gw", to: "stream", label: "HLC order" },
        { from: "stream", to: "fuse" },
        { from: "stream", to: "recon" },
        { from: "fuse", to: "db" },
        { from: "db", to: "recon", dashed: true, label: "snapshot" },
        { from: "recon", to: "dlq" },
        { from: "db", to: "relay", label: "outbox" },
      ],
      flow: [["rails", "gw"], ["ledger", "gw"], ["market", "gw"], ["gw", "stream"], ["stream", "fuse"], ["stream", "recon"], ["fuse", "db"], ["db", "recon"], ["recon", "dlq"], ["db", "relay"]],
    },
  },
  {
    id: "agents",
    index: "03",
    slug: "autonomous-multi-agent-workflow-engine",
    title: "Autonomous Multi-Agent Workflow Engine",
    shortTitle: "Agent Engine",
    category: "Agentic LLM Orchestration / Background Daemons",
    tagline: "A state-machine agent graph with deterministic checkpoints and human-in-the-loop gates.",
    problem:
      "Autonomous multi-stage execution pipelines drift or fail silently in unconstrained loops. Without typed state, checkpoints and explicit exits, an agent that 'almost' finished is indistinguishable from one that crashed.",
    solution:
      "A LangGraph state machine running on Modal serverless compute. Each stage — ingestion, deep document analysis, contextual summarization, automated dispatch — is a typed node with deterministic checkpointing. Confidence thresholds route low-certainty branches to a human-in-the-loop gate; every transition is persisted so runs can be resumed, replayed or audited.",
    stack: ["LangGraph", "Modal", "Serverless Workers", "Python", "Node.js", "Typed State Machines"],
    outcomes: [
      { label: "Silent failures", value: "0" },
      { label: "Resume from checkpoint", value: "any node" },
      { label: "Cold start", value: "<1.5 s" },
    ],
    artifacts: [
      { kind: "repo", label: "GitHub", href: "https://github.com/adilusmani/agent-workflow-engine" },
    ],
    accent: "#b794f4",
    graph: {
      nodes: [
        { id: "trig", label: "Trigger", kind: "input", x: 70, y: 260, detail: "Cron, webhook or queue message. Creates a run with a fresh typed state object.", metrics: [{ k: "sources", v: "3" }] },
        { id: "ingest", label: "Ingestion Agent", kind: "agent", x: 230, y: 260, detail: "Fetches and normalises documents from sources; writes checkpoint #1.", metrics: [{ k: "worker", v: "Modal" }, { k: "retries", v: "3" }] },
        { id: "analyze", label: "Deep Analysis", kind: "agent", x: 410, y: 160, detail: "Long-context document analysis with tool calls. Emits structured findings + confidence.", metrics: [{ k: "ctx", v: "128k" }, { k: "tools", v: "6" }] },
        { id: "sum", label: "Summarizer", kind: "agent", x: 410, y: 360, detail: "Contextual summarization against the run's goal. Deterministic prompt hashing for cache hits.", metrics: [{ k: "cache", v: "38%" }] },
        { id: "ckpt", label: "Checkpoint Store", kind: "store", x: 590, y: 460, detail: "Every node transition persisted. Runs resume from the last committed state after any failure.", metrics: [{ k: "durable", v: "yes" }] },
        { id: "gate", label: "Confidence Gate", kind: "gate", x: 610, y: 260, detail: "If confidence < threshold, the run pauses and a human approval task is created. Otherwise auto-dispatch.", metrics: [{ k: "threshold", v: "0.82" }] },
        { id: "human", label: "Human-in-the-loop", kind: "gate", x: 780, y: 120, detail: "Reviewer approves, edits or rejects. Decision is appended to state and the graph resumes.", metrics: [{ k: "median", v: "9 min" }] },
        { id: "dispatch", label: "Dispatch", kind: "service", x: 790, y: 360, detail: "Automated delivery: email, Slack, ticketing, or downstream queue. Idempotent by run id.", metrics: [{ k: "channels", v: "4" }] },
        { id: "done", label: "Completed", kind: "output", x: 940, y: 260, detail: "Terminal state with full transition log.", metrics: [{ k: "audit", v: "full" }] },
      ],
      edges: [
        { from: "trig", to: "ingest" },
        { from: "ingest", to: "analyze" },
        { from: "ingest", to: "sum" },
        { from: "analyze", to: "gate" },
        { from: "sum", to: "gate" },
        { from: "gate", to: "human", label: "low conf" },
        { from: "gate", to: "dispatch", label: "high conf" },
        { from: "human", to: "dispatch", label: "approved" },
        { from: "dispatch", to: "done" },
        { from: "ingest", to: "ckpt", dashed: true },
        { from: "sum", to: "ckpt", dashed: true },
        { from: "gate", to: "ckpt", dashed: true },
      ],
      flow: [["trig", "ingest"], ["ingest", "analyze"], ["ingest", "sum"], ["analyze", "gate"], ["sum", "gate"], ["gate", "human"], ["gate", "dispatch"], ["human", "dispatch"], ["dispatch", "done"]],
    },
  },
  {
    id: "avatar",
    index: "04",
    slug: "multimodal-ai-avatar-synthesis",
    title: "Multi-Modal AI Avatar Synthesis Platform",
    shortTitle: "Avatar Synthesis",
    category: "Generative Multimodal Deep Learning",
    tagline: "Few-shot voice cloning + phoneme-accurate lip-sync + neural face restoration.",
    problem:
      "Generating natural, synchronized virtual avatars traditionally requires heavy manual rigging or suffers from high inference latency. Voice and mouth motion drift apart, and upscaled faces look uncanny.",
    solution:
      "An end-to-end pipeline: Coqui XTTS v2 performs few-shot voice adaptation from seconds of reference audio, Wav2Lip aligns visemes to the synthesized phoneme stream, and GFPGAN restores facial detail on each frame. Stages are chunked and overlapped on CUDA streams to keep end-to-end latency low enough for interactive use.",
    stack: ["Coqui XTTS v2", "Wav2Lip", "GFPGAN", "PyTorch", "CUDA", "FFmpeg"],
    outcomes: [
      { label: "Reference audio", value: "6 s" },
      { label: "Lip-sync error (LSE-D)", value: "6.9" },
      { label: "Real-time factor", value: "0.7×" },
    ],
    artifacts: [
      { kind: "repo", label: "GitHub", href: "https://github.com/adilusmani/avatar-synthesis" },
    ],
    accent: "#f687b3",
    graph: {
      nodes: [
        { id: "text", label: "Script Text", kind: "input", x: 70, y: 160, detail: "Input text to be spoken.", metrics: [] },
        { id: "ref", label: "Reference Voice", kind: "input", x: 70, y: 360, detail: "6–10 s of reference speech for speaker adaptation.", metrics: [{ k: "min", v: "6 s" }] },
        { id: "xtts", label: "XTTS v2", kind: "model", x: 280, y: 260, detail: "Few-shot multilingual TTS. Produces waveform + phoneme timings.", metrics: [{ k: "RTF", v: "0.3" }, { k: "langs", v: "17" }] },
        { id: "face", label: "Source Face", kind: "input", x: 280, y: 460, detail: "Still image or driving video of the avatar.", metrics: [] },
        { id: "w2l", label: "Wav2Lip", kind: "model", x: 500, y: 260, detail: "Audio-conditioned lip generation. Mouth region synthesized per frame from mel spectrogram windows.", metrics: [{ k: "LSE-D", v: "6.9" }, { k: "fps", v: "25" }] },
        { id: "gfp", label: "GFPGAN", kind: "model", x: 700, y: 260, detail: "Neural face restoration on the synthesized frames to remove blur and artefacts.", metrics: [{ k: "scale", v: "2×" }] },
        { id: "mux", label: "Mux / Encode", kind: "service", x: 860, y: 260, detail: "FFmpeg muxing of restored frames with the cloned audio track, chunk-overlapped for streaming.", metrics: [{ k: "codec", v: "h264" }] },
        { id: "out", label: "Avatar Video", kind: "output", x: 960, y: 120, detail: "Final synchronized avatar clip.", metrics: [{ k: "e2e RTF", v: "0.7" }] },
      ],
      edges: [
        { from: "text", to: "xtts" },
        { from: "ref", to: "xtts", label: "speaker emb" },
        { from: "xtts", to: "w2l", label: "mel + phonemes" },
        { from: "face", to: "w2l" },
        { from: "w2l", to: "gfp" },
        { from: "gfp", to: "mux" },
        { from: "xtts", to: "mux", dashed: true, label: "audio" },
        { from: "mux", to: "out" },
      ],
      flow: [["text", "xtts"], ["ref", "xtts"], ["xtts", "w2l"], ["face", "w2l"], ["w2l", "gfp"], ["gfp", "mux"], ["xtts", "mux"], ["mux", "out"]],
    },
  },
  {
    id: "battery",
    index: "05",
    slug: "nasa-battery-soh-forecaster",
    title: "NASA Battery Degradation & State-of-Health Forecaster",
    shortTitle: "Battery SoH",
    category: "Predictive Time-Series Deep Learning",
    tagline: "LSTM vs. TCN on long-horizon lithium-ion capacity fade.",
    problem:
      "Lithium-ion capacity fades non-linearly over charge/discharge cycles, with regeneration spikes and knee points that defeat simple regression. Long-horizon State-of-Health forecasts are needed to schedule replacement before failure.",
    solution:
      "Empirical research and comparative modeling on the NASA Li-ion Battery Aging Dataset. Cycle-level features (capacity, impedance, temperature, voltage curves) are windowed and used to benchmark Long Short-Term Memory networks against Temporal Convolutional Networks for multi-step degradation trajectory forecasting, evaluated on RMSE, knee-point detection and end-of-life cycle error.",
    stack: ["PyTorch", "LSTM", "Temporal Convolutional Networks", "NumPy", "SciPy", "NASA PCoE Dataset"],
    outcomes: [
      { label: "EoL cycle error (TCN)", value: "±4 cycles" },
      { label: "RMSE improvement", value: "18% vs LSTM" },
      { label: "Forecast horizon", value: "50 cycles" },
    ],
    artifacts: [
      { kind: "repo", label: "GitHub", href: "https://github.com/AadilUsmani/AeroSphere" },
      { kind: "dataset", label: "NASA PCoE dataset", href: "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/" },
    ],
    accent: "#68d391",
    graph: {
      nodes: [
        { id: "raw", label: "NASA Aging Data", kind: "input", x: 70, y: 260, detail: "B0005 / B0006 / B0007 / B0018 cells: charge, discharge and impedance cycles.", metrics: [{ k: "cells", v: "4" }, { k: "cycles", v: "~168" }] },
        { id: "feat", label: "Feature Extraction", kind: "service", x: 250, y: 260, detail: "Per-cycle capacity, internal resistance, temperature peaks, constant-current time; SciPy smoothing.", metrics: [{ k: "features", v: "9" }] },
        { id: "win", label: "Windowing", kind: "service", x: 420, y: 260, detail: "Sliding windows of 16 cycles → 50-cycle horizon targets. Leave-one-cell-out splits.", metrics: [{ k: "window", v: "16" }, { k: "horizon", v: "50" }] },
        { id: "lstm", label: "LSTM", kind: "model", x: 610, y: 150, detail: "2-layer LSTM, hidden 64, teacher forcing during training.", metrics: [{ k: "params", v: "51k" }, { k: "RMSE", v: "0.031" }] },
        { id: "tcn", label: "TCN", kind: "model", x: 610, y: 370, detail: "Dilated causal convolutions with residual blocks; receptive field 64 cycles.", metrics: [{ k: "params", v: "44k" }, { k: "RMSE", v: "0.025" }] },
        { id: "eval", label: "Evaluation", kind: "service", x: 800, y: 260, detail: "RMSE, knee-point detection accuracy, end-of-life cycle error at 70% nominal capacity.", metrics: [{ k: "EoL err", v: "±4" }] },
        { id: "soh", label: "SoH Forecast", kind: "output", x: 950, y: 260, detail: "50-cycle degradation trajectory with uncertainty bands.", metrics: [{ k: "horizon", v: "50" }] },
      ],
      edges: [
        { from: "raw", to: "feat" },
        { from: "feat", to: "win" },
        { from: "win", to: "lstm" },
        { from: "win", to: "tcn" },
        { from: "lstm", to: "eval" },
        { from: "tcn", to: "eval" },
        { from: "eval", to: "soh" },
      ],
      flow: [["raw", "feat"], ["feat", "win"], ["win", "lstm"], ["win", "tcn"], ["lstm", "eval"], ["tcn", "eval"], ["eval", "soh"]],
    },
  },
];

export const papers = [
  {
    id: "paper-fintech",
    title: "Deterministic Data Fusion for FinTech",
    subtitle: "Fault-tolerant state synchronisation across heterogeneous financial event streams",
    href: "/Deterministic_Data_Fusion_for_FinTech.pdf",
    projectId: "fintech",
    isExternal: false,
    status: "Published Paper · Peer Preprint",
    abstract:
      "A replay-equivalent ingestion and reconciliation pipeline using partitioned logs, hybrid logical clocks, idempotent folds and SERIALIZABLE isolation. Sustains 42k events/s per partition with zero ledger discrepancies under 14 days of fault injection.",
    tags: ["Distributed Systems", "Isolation", "Event Sourcing", "Determinism"],
  },
  {
    id: "paper-anarchist",
    title: "Anarchist LLM: Disguised Algorithmic Reasoning",
    subtitle: "Pre-1900 Persona Constraint & Transformer Benchmarking on Serverless A100 Clusters",
    href: "https://github.com/AadilUsmani/Anarchist-LLM",
    projectId: "anarchist-llm",
    isExternal: true,
    status: "Working Paper · Preprint in Preparation",
    abstract:
      "Investigating emergent algorithmic problem-solving capabilities when modern transformers are constrained strictly to Victorian-era English without modern computing terminology. Distributed inference benchmarking across serverless NVIDIA A100 GPU workers on Modal using FlashAttention-3 kernels.",
    tags: ["LLM Benchmarking", "FlashAttention-3", "Modal A100", "Working Paper"],
  },
];

export const experience = [
  {
    period: "Jul 2026 — Present",
    title: "Data Science Intern · Enterprise Automation",
    org: "ML1",
    points: [
      "Building end-to-end AI automation products eliminating complex manual workflows across internal operations (ticketing triage & resolution).",
      "Architected customer support orchestration agents and external hiring automation pipelines with multi-agent LangGraph workflows.",
    ],
  },
  {
    period: "2024 — Present",
    title: "Software Engineer · AI Systems & RAG",
    org: "Independent / Research",
    points: [
      "Authored research paper 'Deterministic Data Fusion for FinTech' on multi-hop SEC 10-K graph deduplication.",
      "Shipped Anarchist LLM with FlashAttention-3 on Modal A100 GPU clusters and SEMS hybrid cryptosystem with AES-256-GCM + RSA-3072.",
    ],
  },
  {
    period: "2023 — 2024",
    title: "Backend Engineer · FinTech Data Platform",
    org: "Financial infrastructure team",
    points: [
      "Built the deterministic fusion and reconciliation pipeline described in the FinTech paper.",
      "Owned PostgreSQL isolation strategy, outbox relays and replay tooling.",
    ],
  },
  {
    period: "2022 — 2023",
    title: "ML Engineer · Applied Deep Learning",
    org: "Research & prototyping",
    points: [
      "Multi-modal avatar synthesis with XTTS v2, Wav2Lip and GFPGAN on CUDA.",
      "Time-series forecasting research on the NASA Li-ion aging dataset (LSTM vs TCN).",
    ],
  },
];

export type KnowledgeChunk = {
  id: string;
  topic: string;
  source: string;
  text: string;
  keywords: string[];
};

export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: "kb-profile",
    topic: "Profile",
    source: "CV",
    text: `${profile.name} is a Software Engineer based in ${profile.location} specializing in backend systems, AI agent frameworks and distributed architectures. Core technologies: ${profile.stack.join(", ")}. ${profile.summary}`,
    keywords: ["who", "adil", "usmani", "about", "background", "role", "engineer", "location", "lahore", "pakistan", "based", "where", "introduce", "summary", "skills", "stack", "technologies", "tech"],
  },
  {
    id: "kb-contact",
    topic: "Contact & Links",
    source: "Portfolio",
    text: `You can reach Adil through the contact form on this site (stored securely via /api/contact), by email at ${profile.email}, on GitHub at ${profile.github}, or LinkedIn at ${profile.linkedin}. His CV is available at ${profile.cv}.`,
    keywords: ["contact", "email", "reach", "hire", "linkedin", "github", "cv", "resume", "download", "available", "availability", "work", "job", "freelance"],
  },
  ...projects.map((p) => ({
    id: `kb-${p.id}`,
    topic: p.title,
    source: p.artifacts.find((a) => a.kind === "paper") ? "Research paper" : "Project docs",
    text: `${p.title} (${p.category}). Problem: ${p.problem} Solution: ${p.solution} Stack: ${p.stack.join(", ")}. Key outcomes: ${p.outcomes.map((o) => `${o.label} ${o.value}`).join("; ")}.`,
    keywords: [
      p.shortTitle.toLowerCase(),
      ...p.title.toLowerCase().split(/[\s/&-]+/),
      ...p.stack.map((s) => s.toLowerCase()),
      ...p.category.toLowerCase().split(/[\s/&-]+/),
    ].filter((k) => k.length > 2),
  })),
  {
    id: "kb-rag-detail",
    topic: "Hybrid RAG internals",
    source: "Project Documentation",
    text: "In the Lexical-Graph Hybrid RAG system, three retrievers run in parallel: a dense vector retriever (HNSW index), a BM25 lexical index, and a knowledge-graph walker doing bounded breadth-first expansion from extracted seed entities. Results are merged with Reciprocal Rank Fusion, score(d) = Σ w_c / (60 + rank_c(d)), with channel weights learned per intent class. A cross-encoder reranker's depth adapts to the entropy of the fused scores. Recall@10 rose from 0.66 (dense-only) to 0.87 and faithfulness from 0.74 to 0.86 at +41 ms p95.",
    keywords: ["rag", "retrieval", "rrf", "reciprocal", "rank", "fusion", "rerank", "reranker", "vector", "embedding", "bm25", "lexical", "knowledge", "graph", "hybrid", "recall", "faithfulness", "multi-hop", "langgraph", "langchain", "cross-encoder", "entropy"],
  },
  {
    id: "kb-fintech-detail",
    topic: "Deterministic fusion internals",
    source: "Deterministic_Data_Fusion_for_FinTech.pdf",
    text: "The FinTech fusion pipeline assigns each event a content-derived idempotency key, a deterministic partition key and a hybrid-logical-clock sequence. Per-partition workers apply a pure fold under SERIALIZABLE isolation with a transactional outbox for effectively-once side effects. A reconciliation daemon diffs projected balances against snapshots and emits discrepancies with causal lineage. SERIALIZABLE was the only isolation level that eliminated write skew, at an 11% throughput cost. Any historical balance can be rebuilt by replaying the log to a sequence number.",
    keywords: ["fintech", "financial", "ledger", "deterministic", "determinism", "idempotent", "idempotency", "isolation", "serializable", "race", "condition", "concurrency", "event", "stream", "reconciliation", "replay", "outbox", "partition", "throughput", "latency", "write skew", "clock"],
  },
  {
    id: "kb-agents-detail",
    topic: "Agent engine internals",
    source: "Project docs",
    text: "The Autonomous Multi-Agent Workflow Engine is a LangGraph state machine deployed on Modal serverless workers. Nodes: ingestion agent, deep document analysis, contextual summarizer, confidence gate, human-in-the-loop review, and dispatch. Every transition writes a checkpoint so a run can resume from any node after failure. Confidence below 0.82 pauses the run and creates a human approval task; otherwise dispatch proceeds automatically and idempotently by run id.",
    keywords: ["agent", "agents", "agentic", "workflow", "orchestration", "langgraph", "modal", "serverless", "checkpoint", "checkpointing", "human", "loop", "hitl", "state", "machine", "daemon", "background", "autonomous", "dispatch", "summarization", "drift"],
  },
  {
    id: "kb-avatar-detail",
    topic: "Avatar synthesis internals",
    source: "Project docs",
    text: "The avatar platform chains Coqui XTTS v2 (few-shot voice cloning from ~6 seconds of reference audio, producing waveform and phoneme timings), Wav2Lip (audio-conditioned lip generation at 25 fps, LSE-D ≈ 6.9) and GFPGAN (neural face restoration). Stages are chunked and overlapped on CUDA streams; FFmpeg muxes restored frames with the cloned audio. End-to-end real-time factor is about 0.7×.",
    keywords: ["avatar", "voice", "cloning", "clone", "lip", "sync", "lipsync", "xtts", "coqui", "wav2lip", "gfpgan", "tts", "speech", "face", "restoration", "multimodal", "multi-modal", "generative", "video", "cuda", "pytorch"],
  },
  {
    id: "kb-battery-detail",
    topic: "Battery forecasting internals",
    source: "Project docs",
    text: "The battery study uses NASA PCoE cells B0005, B0006, B0007 and B0018. Per-cycle features (capacity, internal resistance, temperature peaks, constant-current time) are windowed 16 cycles → 50-cycle horizon with leave-one-cell-out splits. A 2-layer LSTM (hidden 64) is benchmarked against a TCN with dilated causal convolutions (receptive field 64). The TCN reduced RMSE by ~18% and predicted end-of-life (70% nominal capacity) within ±4 cycles.",
    keywords: ["battery", "nasa", "lithium", "li-ion", "degradation", "state", "health", "soh", "lstm", "tcn", "temporal", "convolutional", "time-series", "timeseries", "forecast", "forecasting", "capacity", "cycle", "cycles", "rmse", "knee", "end-of-life"],
  },
  {
    id: "kb-papers",
    topic: "Research papers",
    source: "Portfolio",
    text: "Adil has authored one published research paper: 'Deterministic Data Fusion for FinTech' (viewable in the in-browser reader at /Deterministic_Data_Fusion_for_FinTech.pdf). He is currently actively working on his second research paper: 'Anarchist LLM: Disguised Algorithmic Reasoning' (evaluating persona constraints and transformer benchmarking on serverless Modal A100 GPU clusters). Lexical Graph RAG is an engineering architecture project, not a research paper.",
    keywords: ["paper", "papers", "research", "publication", "publications", "published", "pdf", "read", "academic", "write", "wrote", "author", "anarchist", "deterministic"],
  },
  {
    id: "kb-principles",
    topic: "Engineering principles",
    source: "Portfolio",
    text: profile.principles.map((p) => `${p.title}: ${p.body}`).join(" "),
    keywords: ["principle", "principles", "philosophy", "approach", "believe", "values", "style", "how", "think", "design", "why"],
  },
  {
    id: "kb-site",
    topic: "This portfolio",
    source: "Portfolio",
    text: "This portfolio is a Next.js App Router application with Tailwind CSS and Framer Motion, backed by PostgreSQL through Drizzle ORM. It features an interactive architecture visualizer for each system, a ⌘K command palette for keyboard navigation, this knowledge assistant, an in-browser PDF reader for the papers, and a contact channel persisted through /api/contact.",
    keywords: ["site", "portfolio", "website", "built", "nextjs", "next.js", "tailwind", "framer", "drizzle", "postgres", "command", "palette", "keyboard", "shortcut", "visualizer", "assistant", "chat"],
  },
];

export const suggestedQuestions = [
  "What is the Lexical-Graph Hybrid RAG system?",
  "How does the FinTech pipeline stay deterministic?",
  "Which stack does Adil use for agents?",
  "LSTM vs TCN — which won on the NASA data?",
  "How can I contact Adil?",
];
