"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  Brain,
  Download,
  ArrowUp,
  Eye,
  Zap,
  Moon,
  Sun,
  Menu,
  X,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  Send,
  Database,
  Search,
  Award,
  MapPin,
  Calendar,
  TrendingUp,
  GitBranch,
  Activity,
  Bot,
  Command,
  Code2,
  Terminal,
  ExternalLink,
  FileText,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PortfolioAssistant } from "@/components/portfolio-assistant"
import { CommandPalette } from "@/components/command-palette"
import { ArchitectureWorkbench } from "@/components/architecture-workbench"
import { PortfolioV2 } from "@/components/v2/PortfolioV2"
import { UiSwitcher } from "@/components/ui-switcher"

// ─── Data ─────────────────────────────────────────────────────────────────────

interface CaseStudyProject {
  title: string
  subtitle: string
  category: "rag" | "llm" | "ml" | "sec"
  challenge: string
  architecturalDecision: string
  outcome: string
  tags: string[]
  github: string
  demo?: string
  paper?: string
  metrics: Record<string, string>
  highlight?: string
}

const projectsData: CaseStudyProject[] = [
  {
    title: "Anarchist LLM: Disguised Algorithmic Reasoning",
    subtitle: "Pre-1900 Persona Constraint & Transformer Benchmarking",
    category: "llm",
    challenge:
      "Evaluating whether modern LLMs can solve complex algorithmic problems (dynamic programming, sorting, graph traversal) when forced to speak strictly in Victorian-era English without modern computing terminology.",
    architecturalDecision:
      "Engineered an autonomous research pipeline running distributed inference across serverless NVIDIA A100 GPU workers on Modal.com. Implemented FlashAttention-3 kernels with custom Byte Pair Encoding (BPE) and automated SQLite experiment telemetry with Streamlit analytics.",
    outcome:
      "Achieved 4.38x inference acceleration (42ms/token vs 184ms baseline) and uncovered emergent algorithmic problem-solving capabilities under constrained historical personas.",
    tags: ["PyTorch", "FlashAttention-3", "Modal (A100)", "Streamlit", "SQLite"],
    github: "https://github.com/AadilUsmani/Anarchist-LLM",
    metrics: { Hardware: "NVIDIA A100", Attention: "Flash-3 (4.38x)", Eval: "Victorian CS" },
    highlight: "Featured Research",
  },
  {
    title: "Deterministic Data Fusion for FinTech",
    subtitle: "Fault-Tolerant State Synchronization Across Financial Event Streams",
    category: "sec",
    challenge:
      "High-concurrency financial environments demand absolute determinism and fault-tolerant state synchronization across disparate event streams without race conditions, write skew, or ledger drift.",
    architecturalDecision:
      "Engineered a high-throughput ingestion and reconciliation pipeline using hybrid logical clocks, idempotent event folds under SERIALIZABLE isolation, and a transactional outbox daemon that continuously audits projected balances against ground-truth snapshots.",
    outcome:
      "Sustained 42k events/sec per partition with zero ledger discrepancies under 14-day continuous fault injection tests. Authored comprehensive research paper with formal proofs.",
    tags: ["Distributed Systems", "SERIALIZABLE Isolation", "Event Sourcing", "Research Paper", "FinTech"],
    github: "https://github.com/AadilUsmani",
    paper: "/Deterministic_Data_Fusion_for_FinTech.pdf",
    metrics: { Throughput: "42k ev/s", Reconciliation: "<120ms p99", Status: "Published Paper" },
    highlight: "Published Paper",
  },
  {
    title: "Lexical Graph RAG — SEC 10-K Intelligence",
    subtitle: "Knowledge Graph Retrieval with Deduplication Workflows",
    category: "rag",
    challenge:
      "Standard vector-only RAG frequently hallucinates and loses critical multi-hop context when answering complex financial queries across 200+ page SEC 10-K reports with high semantic redundancy.",
    architecturalDecision:
      "Constructed a multi-layer Knowledge Graph over SEC filings using Neo4j and LangGraph. Built lexical deduplication pipelines that link qualitative risk disclosures directly to balance sheet metrics with graph traversal queries.",
    outcome:
      "Reduced factual hallucination down to sub-2.0% while boosting multi-hop entity recall across multi-year enterprise filings.",
    tags: ["Neo4j", "LangGraph", "Python", "Knowledge Graphs", "SEC 10-K"],
    github: "https://github.com/AadilUsmani/Lexical_Graph_RAG",
    demo: "https://deepwiki.com/AadilUsmani/Lexical_Graph_RAG",
    metrics: { Hallucination: "< 2.0%", Domain: "SEC 10-K", Graph: "Neo4j" },
    highlight: "Graph RAG",
  },
  {
    title: "Corrective RAG (CRAG) — Self-Correcting Engine",
    subtitle: "Adaptive 3-Way Threshold Routing & Web Fallback",
    category: "rag",
    challenge:
      "Static RAG systems fail when local vector stores lack needed information, while naive web search fallbacks introduce massive latency and noise on simple questions.",
    architecturalDecision:
      "Designed an adaptive self-correcting RAG pipeline with 3-way confidence threshold routing. Directly answers verified queries (>=0.70), decomposes ambiguous queries (0.30-0.70), and triggers real-time Tavily search (<0.30).",
    outcome:
      "Cut unnecessary web calls by 60% and slashed end-to-end response latency to 3–8 seconds with 95%+ factual recall.",
    tags: ["LangGraph", "FAISS", "Tavily API", "GPT-4o-mini"],
    github: "https://github.com/AadilUsmani/Corrective_rag_CRAG",
    demo: "https://deepwiki.com/AadilUsmani/Corrective_rag_CRAG",
    metrics: { Latency: "3-8s", Routing: "3-Way Adaptive", Accuracy: "95%+" },
    highlight: "Adaptive Routing",
  },
  {
    title: "Titan Memory Architecture Implementation",
    subtitle: "Long-Term Memory Evaluation on Financial Reports",
    category: "llm",
    challenge:
      "Standard transformer attention mechanisms degrade rapidly over long token horizons (decaying to <40% accuracy beyond 100k tokens), losing critical cross-year context.",
    architecturalDecision:
      "Implemented and empirically benchmarked Google's Titan memory architecture using PyTorch. Tested associative memory persistence and contextual recall against multi-year annual corporate disclosures.",
    outcome:
      "Maintained 96.4% factual recall at 85k token horizons and 91.8% at 180k token horizons across 3 PSX-listed enterprises.",
    tags: ["Memory Architecture", "PyTorch", "Financial NLP", "Research"],
    github: "https://github.com/AadilUsmani/implementing_titan_architecture",
    metrics: { Dataset: "PSX Reports", Architecture: "Titan Memory", Horizon: "180k Tokens" },
    highlight: "Memory Research",
  },
  {
    title: "AeroSphere — Air Quality 72hr Forecasting",
    subtitle: "NASA TEMPO Data + Airflow Pipeline + LSTM",
    category: "ml",
    challenge:
      "Ingesting high-velocity satellite environmental feeds and generating accurate 72-hour air quality forecasts across 45 major cities with automated public health alerts.",
    architecturalDecision:
      "Engineered an automated Apache Airflow ETL pipeline on Azure Cloud ingesting NASA TEMPO satellite data (1.2M+ daily records). Built deep LSTM models predicting PM2.5 concentrations with automated natural language summaries.",
    outcome:
      "Achieved 85%+ predictive accuracy across 45 metropolitan hubs with automated daily summary generation.",
    tags: ["NASA TEMPO", "LSTM", "Apache Airflow", "Azure Cloud"],
    github: "https://github.com/AadilUsmani/AeroSphere",
    metrics: { Accuracy: "85%+", Cities: "45 Hubs", Ingestion: "1.2M / Day" },
    highlight: "Forecasting ETL",
  },
  {
    title: "Secure Examination Management System (SEMS)",
    subtitle: "Hybrid AES-256-GCM + RSA-3072 Cryptosystem & RBAC Portal",
    category: "sec",
    challenge:
      "Safeguarding and distributing confidential academic examination papers across multi-tier faculty hierarchies without risk of unauthorized access, key leakage, or in-transit tampering.",
    architecturalDecision:
      "Engineered a zero-trust hybrid cryptosystem pairing symmetric AES-256 (GCM mode with authenticated ciphertext integrity) and asymmetric RSA-3072 key exchange. Built a high-performance async FastAPI backend with Argon2id password hashing, scoped JWTs across 4 administrative tiers, MIME-sniffing file validation, client-side malware heuristic inspection, and Alembic-managed SQLAlchemy 2.x persistence.",
    outcome:
      "Achieved sub-10ms authenticated encryption latency, rigid role isolation (Admin, Faculty, HOD, Department), and 100% test coverage with automated Pytest E2E suites.",
    tags: ["AES-256-GCM", "RSA-3072", "FastAPI", "Argon2id", "SQLAlchemy 2.x", "Streamlit", "Pytest"],
    github: "https://github.com/AadilUsmani/Crypto_secure_system",
    metrics: { Encryption: "AES-256-GCM", "Key Exchange": "RSA-3072", Auth: "Argon2id + JWT" },
    highlight: "Security & Cryptosystem",
  },
]

const skillsCategories = [
  {
    title: "AI & LLM Architectures",
    icon: Brain,
    description: "Core architectures and intelligent reasoning workflows",
    skills: [
      { name: "RAG & Graph RAG", level: 95, detail: "Neo4j, LangGraph, Corrective RAG (CRAG)" },
      { name: "LLM App Development", level: 92, detail: "LangChain, Prompt Engineering, Agent Chains" },
      { name: "Vector Databases", level: 90, detail: "FAISS, ChromaDB, Vector Embeddings" },
      { name: "Transformer Inference", level: 88, detail: "FlashAttention-3, Custom BPE, KV Cache" },
      { name: "Evaluation & Benchmarks", level: 87, detail: "LLM-as-a-Judge, Latency Benchmarking" },
    ],
  },
  {
    title: "Backend & Cloud Systems",
    icon: Cpu,
    description: "Scalable APIs, cloud GPU clusters & async services",
    skills: [
      { name: "Python (Async/OOP)", level: 95, detail: "FastAPI, PyTorch, NumPy, Pandas" },
      { name: "GPU Cloud (Modal / Azure)", level: 88, detail: "NVIDIA A100/A10G SXM4, Azure OpenAI" },
      { name: "Data Pipelines & ETL", level: 85, detail: "Apache Airflow, Batch Schedulers" },
      { name: "Databases & Caching", level: 86, detail: "Neo4j, SQLite, Redis, PostgreSQL" },
      { name: "CI/CD & DevOps", level: 84, detail: "Docker, GitHub Actions, Vercel" },
    ],
  },
  {
    title: "Machine Learning & Analytics",
    icon: Layers,
    description: "Classical modeling, forecasting & research",
    skills: [
      { name: "Time-Series Forecasting", level: 88, detail: "LSTM, Recurrent Architectures" },
      { name: "Machine Learning", level: 90, detail: "Scikit-Learn, Random Forests, XGBoost" },
      { name: "Deep Learning (PyTorch)", level: 88, detail: "Neural Networks, Custom Loss Functions" },
      { name: "Data Dashboards", level: 86, detail: "Matplotlib, Seaborn, Streamlit" },
    ],
  },
]

const timelineData = [
  {
    period: "Jul 2026 – Present",
    title: "Data Science Intern",
    org: "ML1",
    location: "Lahore, Pakistan",
    type: "work" as const,
    description:
      "Building end-to-end AI automation products that eliminate complex manual workflows for companies — automating internal operations (ticketing triage & resolution), customer support orchestration, and external business processes (hiring & candidate screening pipelines).",
    tags: ["End-to-End Automation", "Ticketing Triage", "Hiring Workflows", "Customer Support", "Graph RAG", "Python"],
  },
  {
    period: "2022 – 2026",
    title: "BS Computer Science",
    org: "University of Central Punjab (UCP)",
    location: "Lahore, Pakistan",
    type: "edu" as const,
    description:
      "Specializing in AI, Deep Learning, and Data Science. Coursework spanning transformer architectures, statistical ML, distributed systems, and knowledge engineering.",
    tags: ["Deep Learning", "AI Research", "Transformer Models", "Algorithms"],
  },
]

const heroFocusRoles = [
  "Autonomous Workflows",
  "Knowledge Graph RAG",
  "Multi-Agent Pipelines",
  "Distributed GPU Systems",
  "Self-Correcting RAG",
]

// ─── Subcomponents ──────────────────────────────────────────────────────────

function FocusRotator() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroFocusRoles.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="inline-flex items-center justify-center min-h-[1.25em] h-[1.25em] overflow-hidden align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(3px)" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-indigo-600 dark:text-cyan-400 font-extrabold"
        >
          {heroFocusRoles[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [projectFilter, setProjectFilter] = useState<"all" | "rag" | "llm" | "sec" | "ml">("all")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [uiVariant, setUiVariant] = useState<"v1" | "v2">("v1")

  // Sync UI variant preference
  useEffect(() => {
    try {
      const savedUi = localStorage.getItem("adil-ui-variant")
      if (savedUi === "v2" || savedUi === "v1") {
        setUiVariant(savedUi)
      }
    } catch {}
  }, [])

  const handleSelectVariant = (v: "v1" | "v2") => {
    setUiVariant(v)
    try {
      localStorage.setItem("adil-ui-variant", v)
    } catch {}
  }

  // Listen for global UI variant switch events from Rail or header triggers
  useEffect(() => {
    const handleSwitchEvent = (e: any) => {
      if (e?.detail?.variant === "v1" || e?.detail?.variant === "v2") {
        handleSelectVariant(e.detail.variant)
      }
    }
    window.addEventListener("switch-ui-variant", handleSwitchEvent)
    return () => window.removeEventListener("switch-ui-variant", handleSwitchEvent)
  }, [])

  // Initialize theme from localStorage if set, default to light
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("adil-theme")
      if (savedTheme === "dark") {
        setIsDarkMode(true)
      } else {
        setIsDarkMode(false)
      }
    } catch {}
  }, [])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const copyEmail = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText("muhammadaadilusmani@gmail.com").catch(() => {})
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = "muhammadaadilusmani@gmail.com"
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }
    } catch {}
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2200)
  }

  // Cross-tab theme sync
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "adil-theme") {
        setIsDarkMode(e.newValue === "dark")
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const { scrollYProgress } = useScroll()
  const circumference = 2 * Math.PI * 20
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [circumference, 0])

  // Global command palette listener
  useEffect(() => {
    const handleOpenPalette = () => setIsCommandPaletteOpen(true)
    window.addEventListener("open-command-palette", handleOpenPalette)
    return () => window.removeEventListener("open-command-palette", handleOpenPalette)
  }, [])

  // Section observer on scroll with bottom-detection
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80
      if (isAtBottom) {
        setActiveSection("contact")
        return
      }

      const sections = ["about", "workbench", "projects", "experience", "skills", "contact"]
      const scrollPosition = window.scrollY + 160
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add("dark")
      root.classList.remove("light")
      try { localStorage.setItem("adil-theme", "dark") } catch {}
    } else {
      root.classList.remove("dark")
      root.classList.add("light")
      try { localStorage.setItem("adil-theme", "light") } catch {}
    }
  }, [isDarkMode])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 75, behavior: "smooth" })
      setActiveSection(id)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setSubmitMessage("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitStatus("success")
        setSubmitMessage(data.message || "Message sent! I will reply shortly.")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error(data.error || "Failed to send message.")
      }
    } catch (err: any) {
      setSubmitStatus("error")
      setSubmitMessage(err.message || "Please email muhammadaadilusmani@gmail.com directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredProjects =
    projectFilter === "all" ? projectsData : projectsData.filter((p) => p.category === projectFilter)

  const navItems = [
    { id: "about", label: "About" },
    { id: "workbench", label: "Workbench" },
    { id: "projects", label: "Case Studies" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  if (uiVariant === "v2") {
    return (
      <div className={isDarkMode ? "dark" : "light"}>
        <PortfolioV2 />
        <UiSwitcher
          currentVariant="v2"
          onSelectVariant={handleSelectVariant}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden font-sans">
      <div className="fixed inset-0 bg-dot-pattern pointer-events-none opacity-30 z-0" />
      <div className="fixed inset-0 mesh-glow pointer-events-none z-0" />

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("about")}
            className="flex items-center gap-2.5 font-bold text-base sm:text-lg tracking-tight group text-slate-900 dark:text-slate-100"
          >
            <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-sm group-hover:scale-105 transition-transform">
              AU
            </span>
            <span className="font-semibold">Muhammad Adil Usmani</span>
          </button>

          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
            {navItems.map((item) => {
              const active = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    active
                      ? "text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-indigo-600 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Quick Command Palette Button */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 text-xs font-medium transition-colors"
              title="Open Command Palette (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono">
                ⌘K
              </kbd>
            </button>

            <a
              href="/Muhammad_Adil_Usmani_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Resume
            </a>

            {/* Quick Switch to v2 Blueprint */}
            <button
              onClick={() => handleSelectVariant("v2")}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/60 hover:border-amber-400 dark:hover:border-amber-500 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              title="Switch to Cyber Blueprint UI (v2)"
            >
              <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Cyber UI (v2)</span>
            </button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div key="sun" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                    <Sun className="w-4 h-4 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                    <Moon className="w-4 h-4 text-indigo-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            <a
              href="https://github.com/AadilUsmani"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors hidden sm:inline-flex"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/Muhammad_Adil_Usmani_cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 text-white mt-2"
              >
                <Download className="w-4 h-4" /> Download Resume
              </a>
              <button
                onClick={() => {
                  handleSelectVariant("v2");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg text-sm font-semibold border border-amber-300 dark:border-amber-700/60 bg-amber-50/60 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 mt-2 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Switch to Cyber Blueprint (v2)</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero Section (Clean, Confident, Restrained) ──────────────────── */}
      <section id="about" className="pt-32 pb-16 md:pt-40 md:pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 text-xs text-slate-700 dark:text-slate-300 mb-6 font-mono shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Data Science Intern @ ML1 &middot; Open to AI Engineering Roles</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] max-w-4xl mx-auto leading-[1.08] mb-5 text-slate-900 dark:text-white"
          >
            Building AI that actually does the work.
          </motion.h1>

          {/* Rotating Focus Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-xl text-slate-600 dark:text-slate-400 font-medium mb-6 flex items-center justify-center gap-2"
          >
            <span className="text-slate-500 dark:text-slate-400">Focus:</span>
            <FocusRotator />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 font-normal"
          >
            Hi, I&apos;m <span className="font-bold text-slate-900 dark:text-slate-100">Muhammad Adil Usmani</span>. I build end-to-end AI automation products that eliminate complex manual workflows for companies &mdash; from internal ticketing triage and hiring pipelines to{" "}
            <span className="font-semibold text-indigo-600 dark:text-cyan-400">Knowledge Graph RAG</span> and serverless GPU clusters on Modal A100s.
          </motion.p>

          {/* Clean Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              size="default"
              onClick={() => scrollToSection("projects")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 text-sm rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              Explore Case Studies <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              size="default"
              variant="outline"
              onClick={() => window.dispatchEvent(new CustomEvent("open-portfolio-assistant"))}
              className="border border-slate-300/90 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium px-4 py-2.5 text-sm rounded-xl shadow-2xs transition-all"
            >
              <Bot className="w-4 h-4 mr-1.5 text-indigo-600 dark:text-cyan-400" /> Ask AI Assistant
            </Button>
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="inline-flex items-center gap-1.5 border border-slate-300/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 px-3 py-2 text-xs rounded-xl font-mono shadow-2xs transition-colors"
            >
              <Command className="w-3.5 h-3.5" /> <kbd className="text-[10px]">⌘K</kbd>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Flagship Interactive Architecture Workbench ─────────────────── */}
      <ArchitectureWorkbench />

      {/* ── Engineering Case Studies ─────────────────────────────────────── */}
      <section id="projects" className="py-20 relative z-10 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-1 font-mono">
                Technical Implementations
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Case Studies &amp; Research
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-xl">
                Rigorous problem formulations, architectural decisions, and empirically measured benchmarks.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "All Projects" },
                { id: "rag", label: "RAG & Graphs" },
                { id: "llm", label: "LLMs & GPU" },
                { id: "sec", label: "Security & Systems" },
                { id: "ml", label: "Forecasting" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setProjectFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    projectFilter === tab.id
                      ? "bg-indigo-600 text-white font-semibold shadow-sm"
                      : "border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {project.highlight && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 font-mono">
                          {project.highlight}
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 ml-auto">
                        {project.paper && (
                          <a
                            href={project.paper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 rounded-lg border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-700 dark:text-cyan-400 transition-colors flex items-center gap-1 text-[11px] font-semibold"
                            title="Read Research Paper (PDF)"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Paper</span>
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 transition-colors"
                          title="View Source Code"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-indigo-600 dark:text-cyan-400 transition-colors"
                            title="Live DeepWiki Demo"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-0.5">
                      {project.title}
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-4">{project.subtitle}</p>

                    {/* Case Study Breakdown: Challenge -> Decision -> Outcome */}
                    <div className="space-y-2.5 mb-5 text-xs leading-relaxed">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                        <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-0.5 font-mono text-[10px]">
                          Challenge:
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">{project.challenge}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                        <span className="font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider block mb-0.5 font-mono text-[10px]">
                          Architectural Decision:
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">{project.architecturalDecision}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-0.5 font-mono text-[10px]">
                          Measured Outcome:
                        </span>
                        <span className="text-slate-700 dark:text-slate-200 font-medium">{project.outcome}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Footer */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-2 text-center bg-slate-50 dark:bg-slate-900/40 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 px-4 py-2.5 rounded-b-2xl font-mono">
                    {Object.entries(project.metrics).map(([key, val]) => (
                      <div key={key}>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">{key}</div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">{val}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Experience & Education Timeline ──────────────────────────────── */}
      <section id="experience" className="py-20 relative z-10 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-1 font-mono">
              Career &amp; Background
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Experience &amp; Education
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              End-to-end automation products and deep learning research.
            </p>
          </div>

          <div className="space-y-6">
            {timelineData.map((item) => (
              <div
                key={item.title}
                className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{item.org}</p>
                  </div>
                  <div className="text-right text-xs font-mono text-slate-500 dark:text-slate-400">
                    <div>{item.period}</div>
                    <div className="text-slate-400 text-[11px]">{item.location}</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Skills ─────────────────────────────────────────────── */}
      <section id="skills" className="py-20 relative z-10 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-1 font-mono">
              Engineering Stack
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Skills &amp; Toolkit
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Deep capabilities across Graph RAG, serverless GPU infrastructure, and production APIs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillsCategories.map((cat) => (
              <div
                key={cat.title}
                className="glass-card rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                    <cat.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{cat.title}</h3>
                    <p className="text-[11px] text-slate-500">{cat.description}</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                        <span className="text-slate-500 font-mono text-[11px]">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${skill.level}%` }}
                          className="h-full bg-indigo-600 dark:bg-cyan-400 rounded-full"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">{skill.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Section ──────────────────────────────────────────────── */}
      <section id="contact" className="py-20 relative z-10 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-1 font-mono">
              Get in Touch
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Let&apos;s Build Something Real
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Have an engineering role, automation project, or collaboration? Send a direct message.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5 font-mono">
                    Name
                  </label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm h-10"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5 font-mono">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@company.com"
                    className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm h-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5 font-mono">
                  Subject
                </label>
                <Input
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="AI Engineering Role / Project Discussion"
                  className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm h-10"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5 font-mono">
                  Message
                </label>
                <Textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about the project, role, or timeline..."
                  className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm"
                />
              </div>

              {submitStatus === "success" && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{submitMessage}</span>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 text-xs">
                  {submitMessage}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 text-sm rounded-xl transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Message...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" /> Send Direct Message
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center flex-wrap gap-1.5">
                <span>Direct Email:</span>
                <a href="mailto:muhammadaadilusmani@gmail.com" className="text-indigo-600 dark:text-cyan-400 font-semibold hover:underline">
                  muhammadaadilusmani@gmail.com
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-[11px] font-mono transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-500" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </span>
              <div className="flex gap-4">
                <a href="https://github.com/AadilUsmani" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="py-6 border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>&copy; {new Date().getFullYear()} Muhammad Adil Usmani &middot; Built with Next.js &amp; Tailwind CSS.</p>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Back to Top ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full glass-panel border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-white shadow-lg hover:scale-105 transition-transform"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
          </motion.button>
        )}
      </AnimatePresence>

      <PortfolioAssistant />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        scrollToSection={scrollToSection}
      />
      <UiSwitcher
        currentVariant="v1"
        onSelectVariant={handleSelectVariant}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
    </div>
  )
}
