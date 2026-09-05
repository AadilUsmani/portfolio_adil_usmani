/**
 * GitHub Codebase Knowledge & Retrieval Service
 * --------------------------------------------------------------------------
 * Dynamically fetches live repository content from Adil Usmani's GitHub
 * (https://github.com/AadilUsmani) and provides deeply indexed architectural,
 * cryptographic, and implementation details for all portfolio codebases.
 */

export interface RepoCodebaseDetail {
  repoName: string
  fullName: string
  githubUrl: string
  branch: string
  primaryLanguage: string
  architecturePattern: string
  keyFiles: string[]
  coreModules: {
    name: string
    description: string
  }[]
  technicalDeepDive: string
}

// Deeply indexed verified codebase technical specs for all 7 repositories
export const VERIFIED_CODEBASES: Record<string, RepoCodebaseDetail> = {
  Crypto_secure_system: {
    repoName: "Crypto_secure_system",
    fullName: "AadilUsmani/Crypto_secure_system",
    githubUrl: "https://github.com/AadilUsmani/Crypto_secure_system",
    branch: "main",
    primaryLanguage: "Python (FastAPI + Streamlit)",
    architecturePattern: "Zero-Trust Hybrid Cryptosystem & Multi-Tier RBAC Portal",
    keyFiles: [
      "backend/crypto/cipher.py (AES-256-GCM symmetric encryption & decryption)",
      "backend/crypto/asymmetric.py (RSA-3072 key generation, OAEP padding, key exchange)",
      "backend/auth/security.py (Argon2id password hashing, scoped JWT token generation)",
      "backend/api/routes/exams.py (Encrypted exam workflow, submission, and grading APIs)",
      "backend/database/models.py (SQLAlchemy 2.x async ORM models for users, exams, logs)",
      "frontend/app.py (Streamlit dashboard for Admin, Faculty, HOD, and Staff tiers)",
      "tests/test_crypto.py (Pytest unit and integration tests for cryptographic operations)",
    ],
    coreModules: [
      {
        name: "Hybrid Cryptographic Engine",
        description:
          "Combines AES-256-GCM for authenticated bulk payload encryption with RSA-3072 (OAEP with SHA-256) for secure asymmetric key encapsulation and exchange. Ensures complete confidentiality, tamper-evidence, and zero plaintext exposure in transit or storage.",
      },
      {
        name: "Multi-Tier Role-Based Access Control (RBAC)",
        description:
          "Rigid permission isolation across 4 distinct roles: Admin, Faculty, Head of Department (HOD), and Department Staff. Uses Argon2id password hashing and short-lived scoped JWT access tokens with rotation.",
      },
      {
        name: "Security Guardrails & Hardening",
        description:
          "In-memory MIME magic-number inspection to block spoofed file extensions, client-side heuristic inspection, SQL injection defenses via SQLAlchemy 2.0 async query parameterization, and immutable audit trails.",
      },
    ],
    technicalDeepDive: `The Secure Examination Management System (SEMS) is an enterprise-grade academic cryptographic application.
• Symmetric: AES-256-GCM with 96-bit unique nonces and 128-bit authentication tags.
• Asymmetric: RSA-3072 keypairs with PKCS#1 OAEP padding using SHA-256 message digests.
• Auth & Passwords: Passlib Argon2id (memory-hard, resistant to GPU/ASIC rainbow attacks).
• Storage: Async SQLAlchemy with Alembic migrations supporting PostgreSQL and SQLite.
• Test Suite: 100% Pytest test coverage across key generation, encryption, tamper detection, and RBAC authorization barriers.`,
  },

  "Anarchist-LLM": {
    repoName: "Anarchist-LLM",
    fullName: "AadilUsmani/Anarchist-LLM",
    githubUrl: "https://github.com/AadilUsmani/Anarchist-LLM",
    branch: "main",
    primaryLanguage: "Python (PyTorch + Modal.com)",
    architecturePattern: "Serverless Distributed GPU Benchmarking & Persona Constraint Probing",
    keyFiles: [
      "modal_benchmark.py (Modal serverless app orchestration for NVIDIA A100 SXM4 80GB)",
      "models/transformer.py (Custom transformer architecture with FlashAttention-3 kernel hooks)",
      "tokenizer/bpe.py (Custom Byte Pair Encoding tokenizer trained on Victorian corpora)",
      "eval/cs_reasoning.py (Victorian Computer Science Reasoning benchmark evaluation harness)",
      "dashboard/app.py (Streamlit interactive telemetry and benchmark comparison dashboard)",
      "experiments.db (SQLite database logging latency, tokens/sec, and perplexity per run)",
    ],
    coreModules: [
      {
        name: "FlashAttention-3 Kernel Integration",
        description:
          "Integrates modern FlashAttention-3 kernels to accelerate long-context inference and reduce memory footprint on NVIDIA A100 GPUs, achieving 4.38x acceleration (42ms/tok vs 184ms/tok baseline).",
      },
      {
        name: "Victorian Persona Constraint Experiment",
        description:
          "A research experiment testing whether LLMs can solve modern algorithmic and dynamic programming challenges when strictly forbidden from using modern computing jargon (e.g., 'array', 'pointer', 'RAM', 'binary', 'function').",
      },
      {
        name: "Modal Serverless Infrastructure",
        description:
          "Distributed serverless execution allocating ephemeral A100-80GB GPU instances with cold start under 1.5s, automated checkpointing, and SQLite experiment tracking.",
      },
    ],
    technicalDeepDive: `Anarchist LLM investigates disguised algorithmic problem solving.
• Benchmark: Evaluates models on classic CS algorithms (sorting, graph search, memoization) formulated in pre-1900 Victorian prose.
• Hardware: Modal.com serverless GPU workers running NVIDIA A100 SXM4 (80GB VRAM).
• Inference: 4.38x speedup achieved via FlashAttention-3 and optimized KV caching.
• Status: Adil Usmani is currently authoring this as his second research paper (working paper / preprint in preparation).`,
  },

  Lexical_Graph_RAG: {
    repoName: "Lexical_Graph_RAG",
    fullName: "AadilUsmani/Lexical_Graph_RAG",
    githubUrl: "https://github.com/AadilUsmani/Lexical_Graph_RAG",
    branch: "main",
    primaryLanguage: "Python (Neo4j + LangGraph)",
    architecturePattern: "Dual-Channel Hybrid Knowledge Graph & Lexical Search over SEC 10-K",
    keyFiles: [
      "graph/neo4j_client.py (Neo4j graph connection, schema setup, Cypher query execution)",
      "graph/entity_extraction.py (NER pipeline extracting corporate entities, metrics, and relationships)",
      "graph/deduplication.py (Fuzzy matching and graph pruning workflows across multi-year 10-K filings)",
      "rag/pipeline.py (LangGraph stateful orchestration merging vector similarity and Cypher graph traversals)",
      "api/main.py (FastAPI service serving query endpoints with citation-annotated context windows)",
    ],
    coreModules: [
      {
        name: "Neo4j Knowledge Graph Construction",
        description:
          "Builds an interconnected entity-relationship graph over 200+ page SEC 10-K financial disclosures (e.g. Apple, Tesla, Engro), connecting qualitative risk disclosures to quantitative balance sheet items.",
      },
      {
        name: "Lexical Entity Deduplication",
        description:
          "Deduplicates corporate entity nodes across multi-year reporting cycles using graph similarity algorithms, slashing retrieval hallucinations to sub-2%.",
      },
      {
        name: "Dual-Channel Hybrid Retrieval",
        description:
          "Combines dense embedding retrieval with multi-hop Cypher queries, ensuring queries requiring cross-document relational facts are answered with full provenance.",
      },
    ],
    technicalDeepDive: `Lexical Graph RAG is an engineering architecture project.
• Role: Bridges unstructured financial disclosures and structured database metrics.
• Graph Store: Neo4j Graph Database with typed nodes (:Company, :Metric, :RiskFactor, :Period).
• Note: This is an engineering system and project, NOT a research paper (Adil's published paper is 'Deterministic Data Fusion for FinTech').`,
  },

  Corrective_rag_CRAG: {
    repoName: "Corrective_rag_CRAG",
    fullName: "AadilUsmani/Corrective_rag_CRAG",
    githubUrl: "https://github.com/AadilUsmani/Corrective_rag_CRAG",
    branch: "main",
    primaryLanguage: "Python (LangGraph + FAISS + Tavily)",
    architecturePattern: "Self-Correcting Adaptive 3-Way Confidence Threshold Routing",
    keyFiles: [
      "agent/workflow.py (LangGraph state machine defining retrieval, evaluation, and search fallback nodes)",
      "evaluator/confidence.py (Confidence scoring model evaluating local vector similarity scores)",
      "retrievers/vector_store.py (FAISS vector store indexing domain documentation)",
      "tools/tavily_search.py (Live Tavily Search API wrapper for low-confidence web fallback)",
      "main.py (CLI and API entrypoints for interactive evaluation)",
    ],
    coreModules: [
      {
        name: "3-Way Adaptive Confidence Routing",
        description:
          "Confidence >= 0.70: passes directly to generator; 0.30 - 0.70: decomposes query into parallel sub-queries; < 0.30: executes live web search fallback via Tavily.",
      },
      {
        name: "Latency & Cost Optimization",
        description:
          "Slashes unnecessary web search calls by 60% and maintains end-to-end response latency between 3–8s with 95%+ factual recall.",
      },
    ],
    technicalDeepDive: `Corrective RAG (CRAG) prevents both hallucinations and slow responses.
• Framework: LangGraph state machine with deterministic routing nodes.
• Evaluation: Automated grading node evaluates retrieved documents before generating answers.`,
  },

  implementing_titan_architecture: {
    repoName: "implementing_titan_architecture",
    fullName: "AadilUsmani/implementing_titan_architecture",
    githubUrl: "https://github.com/AadilUsmani/implementing_titan_architecture",
    branch: "main",
    primaryLanguage: "Python (PyTorch)",
    architecturePattern: "Long-Horizon Memory Neural Architecture Implementation",
    keyFiles: [
      "titan/memory.py (Neural long-term associative memory module implementation)",
      "titan/model.py (Transformer backbone integrated with persistent memory slots)",
      "data/loader.py (Financial report PDF extractor and long-context chunking pipeline)",
      "benchmarks/eval_retention.py (Context retention and factual recall evaluation suite)",
    ],
    coreModules: [
      {
        name: "Titan Associative Memory Implementation",
        description:
          "Empirical implementation of Google's Titan memory architecture, maintaining 96.4% factual recall at 85k token horizons and 91.8% at 180k token horizons.",
      },
      {
        name: "Corporate Financial Benchmark",
        description:
          "Tested against multi-year annual reports of 3 PSX-listed enterprises including Engro Corporation 2025 disclosures.",
      },
    ],
    technicalDeepDive: `Implements associative long-term memory for transformers.
• Solves: Catastrophic forgetting and quadratic attention degradation in long financial documents.`,
  },

  AeroSphere: {
    repoName: "AeroSphere",
    fullName: "AadilUsmani/AeroSphere",
    githubUrl: "https://github.com/AadilUsmani/AeroSphere",
    branch: "main",
    primaryLanguage: "Python (PyTorch + Apache Airflow + Azure)",
    architecturePattern: "Satellite Environmental Stream ETL & 72-Hour LSTM Forecaster",
    keyFiles: [
      "airflow/dags/tempo_ingestion.py (Airflow DAG fetching daily NASA TEMPO satellite streams)",
      "models/lstm_forecaster.py (2-layer LSTM with teacher forcing for multi-step PM2.5 forecasting)",
      "pipelines/preprocessing.py (Spatial aggregation, interpolation, and anomaly filtering)",
      "reports/generator.py (Automated natural language public health advisory generator)",
    ],
    coreModules: [
      {
        name: "Automated Airflow Pipeline",
        description:
          "Processes 1.2M+ daily satellite records across 45 metropolitan cities, scheduled via Apache Airflow.",
      },
      {
        name: "Deep Recurrent Forecaster",
        description:
          "Achieves 85%+ forecast accuracy for 72-hour particulate matter (PM2.5) concentrations.",
      },
    ],
    technicalDeepDive: `AeroSphere bridges high-velocity atmospheric satellite streams and public health analytics.
• Data: NASA TEMPO satellite streams.
• Infrastructure: Azure Cloud VMs + Apache Airflow.`,
  },

  "V.G.RAG": {
    repoName: "V.G.RAG",
    fullName: "AadilUsmani/V.G.RAG",
    githubUrl: "https://github.com/AadilUsmani/V.G.RAG",
    branch: "main",
    primaryLanguage: "Python (ChromaDB + Neo4j + Azure OpenAI)",
    architecturePattern: "Late-Fusion Hybrid Graph RAG vs Pure Vector Benchmark",
    keyFiles: [
      "benchmark/runner.py (53-question automated test suite measuring accuracy, depth, and speed)",
      "rag/hybrid_fusion.py (Late-fusion rank aggregator merging vector and graph paths)",
      "rag/vector_retriever.py (ChromaDB dense embedding retriever)",
      "rag/graph_retriever.py (Neo4j Cypher relational traversal retriever)",
    ],
    coreModules: [
      {
        name: "Late-Fusion Aggregator",
        description:
          "Dynamically balances dense semantic scores from ChromaDB and structural graph connectivity from Neo4j.",
      },
      {
        name: "Comparative Evaluation Benchmark",
        description:
          "A 53-question evaluation suite comparing dense-only, graph-only, and hybrid late-fusion over Apple and Tesla 10-K filings.",
      },
    ],
    technicalDeepDive: `V.G.RAG empirically proves where graph retrieval outperforms standard vector search on complex multi-hop enterprise data.`,
  },
}

// In-memory cache for live GitHub READMEs (TTL: 15 minutes)
const liveReadmeCache = new Map<string, { content: string; expiresAt: number }>()

/**
 * Dynamically fetches the live README.md from Adil Usmani's public GitHub repositories
 */
export async function fetchLiveGitHubReadme(repoName: string): Promise<string | null> {
  const cached = liveReadmeCache.get(repoName)
  if (cached && Date.now() < cached.expiresAt) {
    return cached.content
  }

  const urlsToTry = [
    `https://raw.githubusercontent.com/AadilUsmani/${repoName}/main/README.md`,
    `https://raw.githubusercontent.com/AadilUsmani/${repoName}/master/README.md`,
  ]

  for (const url of urlsToTry) {
    try {
      const headers: Record<string, string> = {
        "User-Agent": "AdilUsmani-Portfolio-Agent",
      }
      if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`
      }

      const res = await fetch(url, { headers })
      if (res.ok) {
        const text = await res.text()
        if (text && text.length > 50) {
          // Truncate to reasonable token limit (first 3500 chars) for prompt efficiency
          const truncated = text.slice(0, 3500)
          liveReadmeCache.set(repoName, { content: truncated, expiresAt: Date.now() + 15 * 60 * 1000 })
          return truncated
        }
      }
    } catch {
      // Continue to next URL or fallback
    }
  }

  return null
}

/**
 * Returns enhanced codebase context combining verified static architectural indexing
 * and dynamically retrieved live GitHub documentation.
 */
export async function getEnhancedCodebaseContext(
  repoKey: string,
): Promise<{ context: string; repoInfo?: RepoCodebaseDetail }> {
  const verified = VERIFIED_CODEBASES[repoKey]
  if (!verified) {
    return { context: "" }
  }

  const liveReadme = await fetchLiveGitHubReadme(verified.repoName)

  let ctx = `### GitHub Repository Deep Dive: ${verified.fullName} (${verified.githubUrl})
Primary Language: ${verified.primaryLanguage}
Architecture: ${verified.architecturePattern}

Key Repository Files & Structure:
${verified.keyFiles.map((f) => `- ${f}`).join("\n")}

Core Modules & Implementations:
${verified.coreModules.map((m) => `• ${m.name}: ${m.description}`).join("\n")}

Technical Specifications:
${verified.technicalDeepDive}`

  if (liveReadme) {
    ctx += `\n\nLive GitHub README (Fetched directly from ${verified.fullName}):\n${liveReadme}`
  }

  return { context: ctx, repoInfo: verified }
}
