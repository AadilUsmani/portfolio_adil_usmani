"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
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
  ShieldCheck,
  Server,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PortfolioAssistant } from "@/components/portfolio-assistant"
import { NeuralNetworkViz } from "@/components/neural-network-viz"
import { CommandPalette } from "@/components/command-palette"
import { ArchitectureWorkbench } from "@/components/architecture-workbench"

// ─── Data ─────────────────────────────────────────────────────────────────────

interface CaseStudyProject {
  title: string
  subtitle: string
  category: "rag" | "llm" | "ml"
  challenge: string
  architecturalDecision: string
  outcome: string
  tags: { name: string; color: string }[]
  github: string
  demo?: string
  metrics: Record<string, string>
  featured: boolean
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
    tags: [
      { name: "PyTorch", color: "border-orange-500/30 text-orange-600 dark:text-orange-400 bg-orange-500/10" },
      { name: "FlashAttention-3", color: "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10" },
      { name: "Modal.com (A100)", color: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" },
      { name: "Streamlit", color: "border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/10" },
      { name: "SQLite", color: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10" },
    ],
    github: "https://github.com/AadilUsmani/Anarchist-LLM",
    metrics: { Hardware: "NVIDIA A100", Attention: "Flash-3 (4.38x)", Eval: "Victorian CS" },
    featured: true,
    highlight: "Featured Research",
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
    tags: [
      { name: "Python", color: "border-yellow-500/30 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10" },
      { name: "Neo4j", color: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10" },
      { name: "LangGraph", color: "border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10" },
      { name: "Knowledge Graphs", color: "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10" },
      { name: "SEC Filings", color: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" },
    ],
    github: "https://github.com/AadilUsmani/Lexical_Graph_RAG",
    demo: "https://deepwiki.com/AadilUsmani/Lexical_Graph_RAG",
    metrics: { "Hallucination": "< 2.0%", Domain: "SEC 10-K", Graph: "Neo4j" },
    featured: true,
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
    tags: [
      { name: "LangGraph", color: "border-teal-500/30 text-teal-600 dark:text-teal-400 bg-teal-500/10" },
      { name: "FAISS", color: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10" },
      { name: "Tavily Search", color: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10" },
      { name: "GPT-4o-mini", color: "border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/10" },
    ],
    github: "https://github.com/AadilUsmani/Corrective_rag_CRAG",
    demo: "https://deepwiki.com/AadilUsmani/Corrective_rag_CRAG",
    metrics: { Latency: "3-8s", Routing: "3-Way Adaptive", Accuracy: "95%+" },
    featured: true,
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
    tags: [
      { name: "Memory Architecture", color: "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10" },
      { name: "PyTorch", color: "border-orange-500/30 text-orange-600 dark:text-orange-400 bg-orange-500/10" },
      { name: "Financial NLP", color: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" },
    ],
    github: "https://github.com/AadilUsmani/implementing_titan_architecture",
    metrics: { Dataset: "PSX Reports", Architecture: "Titan Memory", Horizon: "180k Tokens" },
    featured: true,
    highlight: "Architecture Research",
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
    tags: [
      { name: "NASA TEMPO", color: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10" },
      { name: "LSTM", color: "border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/10" },
      { name: "Airflow", color: "border-orange-500/30 text-orange-600 dark:text-orange-400 bg-orange-500/10" },
      { name: "Azure Cloud", color: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10" },
    ],
    github: "https://github.com/AadilUsmani/AeroSphere",
    metrics: { Accuracy: "85%+", Cities: "45", Ingestion: "1.2M Records" },
    featured: false,
    highlight: "Deep Learning & Forecasting",
  },
]

const skillsCategories = [
  {
    title: "AI & LLM Architectures",
    icon: Brain,
    description: "Core architectures and intelligent reasoning workflows",
    skills: [
      { name: "RAG & Graph RAG", level: 95, detail: "Neo4j, LangGraph, Corrective RAG (CRAG)" },
      { name: "LLM App Development", level: 92, detail: "LangChain, LangSmith, Prompt Engineering" },
      { name: "Vector Databases", level: 90, detail: "FAISS, ChromaDB, Vector Embeddings" },
      { name: "Transformer Inference", level: 88, detail: "FlashAttention-3, Custom BPE, KV Cache" },
      { name: "Evaluation & Benchmarks", level: 87, detail: "LLM-as-a-Judge, Latency Optimization" },
    ],
  },
  {
    title: "Backend & Cloud Systems",
    icon: Cpu,
    description: "Scalable APIs, cloud GPU clusters & async microservices",
    skills: [
      { name: "Python (Async/OOP)", level: 95, detail: "FastAPI, PyTorch, NumPy, Pandas" },
      { name: "GPU Cloud (Modal / Azure)", level: 88, detail: "NVIDIA A100/A10G, Azure OpenAI" },
      { name: "Data Pipelines & ETL", level: 85, detail: "Apache Airflow, Batch Scheduling" },
      { name: "Databases & Caching", level: 86, detail: "Neo4j, SQLite, Redis, PostgreSQL" },
      { name: "CI/CD & DevOps", level: 84, detail: "Docker, GitHub Actions, Vercel, Render" },
    ],
  },
  {
    title: "Machine Learning & Analytics",
    icon: Layers,
    description: "Classical modeling, forecasting & statistical research",
    skills: [
      { name: "Time-Series Forecasting", level: 88, detail: "LSTM, Recurrent Architectures" },
      { name: "Machine Learning", level: 90, detail: "Scikit-Learn, Random Forests, XGBoost" },
      { name: "Deep Learning (PyTorch)", level: 88, detail: "Neural Networks, Custom Loss Functions" },
      { name: "Data Visualization", level: 86, detail: "Matplotlib, Seaborn, Streamlit Dashboards" },
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

const heroRoles = [
  "Autonomous Workflows",
  "Knowledge Graph RAG",
  "Multi-Agent Pipelines",
  "Distributed GPU Systems",
  "Self-Correcting RAG",
]

// ─── Hooks ─────────────────────────────────────────────────────────────────

function useCountUp(target: number, decimals = 0, duration = 1600) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    const update = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target
      setCount(decimals > 0 ? Math.round(current * 10) / 10 : Math.floor(current))
      if (progress < 1) requestAnimationFrame(update)
      else setCount(target)
    }
    requestAnimationFrame(update)
  }, [inView, target, duration, decimals])

  return { count, ref }
}

function TypingRotator() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroRoles.length), 3000)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="inline-flex items-center justify-center min-h-[1.25em] h-[1.25em] overflow-hidden align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-r from-cyan-600 via-indigo-600 to-cyan-600 dark:from-cyan-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent inline-block font-extrabold"
        >
          {heroRoles[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function HeroInteractiveTerminal() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    { label: "QUERY", code: 'User: "Synthesize liquidity & debt risk from 10-K filings"' },
    { label: "GRAPH ROUTE", code: "CRAG Router: Confidence score = 0.92 [High] -> Direct Neo4j Node" },
    { label: "EMBEDDING", code: "Vector search: 53 chunks retrieved, merged via Late-Fusion" },
    { label: "SYNTHESIS", code: "Response generated in 3.4s with 98.4% factual groundness" },
  ]
  useEffect(() => {
    const interval = setInterval(() => setActiveStep((prev) => (prev + 1) % steps.length), 2800)
    return () => clearInterval(interval)
  }, [steps.length])
  return (
    <div className="w-full max-w-xl mx-auto rounded-xl overflow-hidden glass-panel border border-slate-300/80 dark:border-slate-700/50 shadow-2xl text-left font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 dark:bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-slate-400 text-xs">agent_graph_runtime.py</span>
        </div>
        <div className="flex items-center gap-1.5 text-cyan-400 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          ACTIVE
        </div>
      </div>
      <div className="p-4 space-y-2.5 bg-slate-950/95 dark:bg-slate-950/80">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`transition-all duration-300 flex items-start gap-2.5 ${
              idx === activeStep ? "text-cyan-300 opacity-100 font-semibold" : "text-slate-500 opacity-60"
            }`}
          >
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 shrink-0">{step.label}</span>
            <span className="leading-relaxed">{step.code}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Portfolio ──────────────────────────────────────────────────────────

export default function Portfolio() {
  const reducedMotion = useReducedMotion() ?? false
  const [activeSection, setActiveSection] = useState("about")
  const [projectFilter, setProjectFilter] = useState<"all" | "rag" | "llm" | "ml">("all")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const countArch = useCountUp(4)
  const countLatMin = useCountUp(3)
  const countLatMax = useCountUp(8)
  const countRecords = useCountUp(1.2, 1)

  const { scrollYProgress } = useScroll()
  const circumference = 2 * Math.PI * 20
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [circumference, 0])

  useEffect(() => {
    try {
      if (localStorage.getItem("adil-status-banner-v1") !== "1") setShowBanner(true)
    } catch {}
  }, [])

  const dismissBanner = () => {
    try { localStorage.setItem("adil-status-banner-v1", "1") } catch {}
    setShowBanner(false)
  }

  // Global command palette listener
  useEffect(() => {
    const handleOpenPalette = () => setIsCommandPaletteOpen(true)
    window.addEventListener("open-command-palette", handleOpenPalette)
    return () => window.removeEventListener("open-command-palette", handleOpenPalette)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "workbench", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 140
      setShowBackToTop(window.scrollY > 400)
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
    if (isDarkMode) { root.classList.add("dark"); root.classList.remove("light") }
    else { root.classList.remove("dark"); root.classList.add("light") }
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

  const filteredProjects = projectFilter === "all" ? projectsData : projectsData.filter((p) => p.category === projectFilter)

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 22, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as any } },
  }

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "workbench", label: "Workbench" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden font-sans">
      <div className="fixed inset-0 bg-dot-pattern pointer-events-none opacity-40 z-0" />
      <div className="fixed inset-0 mesh-glow pointer-events-none z-0" />

      {/* Status Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -52, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -52, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-100/95 via-slate-100/95 to-indigo-100/95 dark:from-amber-900/90 dark:via-slate-900/95 dark:to-indigo-900/90 border-b border-amber-300/70 dark:border-amber-500/30 backdrop-blur-sm shadow-xs"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                <span className="text-amber-800 dark:text-amber-300 font-bold hidden sm:inline">LIVE &mdash;</span>
                <span className="text-slate-800 dark:text-slate-300">
                  Data Science Intern <span className="text-amber-800 dark:text-amber-300 font-semibold">@ ML1</span>
                  <span className="hidden sm:inline text-slate-600 dark:text-slate-400"> &middot; Automating enterprise workflows (ticketing, hiring &amp; support) &middot; Open to AI Engineering roles</span>
                </span>
              </div>
              <button onClick={dismissBanner} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors shrink-0 ml-4" aria-label="Dismiss">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <header className="fixed left-0 right-0 z-50 glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-all" style={{ top: showBanner ? "36px" : "0px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => scrollToSection("about")} className="flex items-center gap-2.5 font-bold text-lg tracking-tight group text-slate-900 dark:text-slate-100">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">AU</span>
            <span className="hidden sm:inline">Muhammad Adil Usmani</span>
          </button>

          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
            {navItems.map((item) => {
              const active = activeSection === item.id
              return (
                <button key={item.id} onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${active ? "text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"}`}>
                  {active && (
                    <motion.div layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 shadow-md"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }} />
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
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium transition-colors"
              title="Open Command Palette (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Commands</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400">⌘K</kbd>
            </button>

            <a href="/Muhammad_Adil_Usmani_cv.pdf" target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]">
              <Download className="w-3.5 h-3.5" /> Resume
            </a>
            <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle Theme"
              className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
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
            <a href="https://github.com/AadilUsmani" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors hidden sm:inline-flex">
              <Github className="w-4 h-4" />
            </a>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300" aria-label="Menu">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => { scrollToSection(item.id); setIsMobileMenuOpen(false) }}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white">
                  {item.label}
                </button>
              ))}
              <a href="/Muhammad_Adil_Usmani_cv.pdf" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 text-white mt-2">
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section id="about" className="pt-36 pb-20 md:pt-44 md:pb-28 relative z-10">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[320px] opacity-[0.18] pointer-events-none hidden lg:block">
          <NeuralNetworkViz />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          {/* Live Telemetry Status Pill */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-300/70 dark:border-cyan-500/30 text-xs font-medium text-cyan-800 dark:text-cyan-300 mb-6 shadow-sm dark:shadow-cyan-500/10 bg-cyan-50/80 dark:bg-cyan-950/40 font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-cyan-500 -ml-3" />
            <span>AI APPARATUS: ALL SYSTEMS NOMINAL</span>
            <span className="text-slate-400">·</span>
            <span className="hidden sm:inline">AUTOMATION WORKFLOWS &amp; GRAPH RAG</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight mb-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
            <span className="hero-gradient-text">Automating the un-automatable with</span>
            <TypingRotator />
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
            Hi, I&apos;m <span className="text-slate-900 dark:text-slate-100 font-semibold">Muhammad Adil Usmani</span>. I build end-to-end AI automation
            products that replace complex manual workflows for companies &mdash; from internal ticketing triage and hiring pipelines to{" "}
            <span className="text-cyan-700 dark:text-cyan-400 font-medium">Knowledge Graph RAG</span> and serverless GPU clusters.
          </motion.p>

          {/* Count-Up Impact Metrics */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10 text-left">
            {[
              { label: "AI Architectures", ref: countArch.ref, val: `${countArch.count}+ Custom RAG & LLMs`, sub: "Graph RAG, CRAG, Titan Memory", icon: Brain, color: "text-amber-700 dark:text-amber-400 border-amber-300/60 dark:border-amber-500/20 bg-amber-50/70 dark:bg-amber-500/5" },
              { label: "Retrieval Latency", ref: countLatMin.ref, val: `${countLatMin.count}\u20138s End-to-End`, sub: "Adaptive 3-way routing", icon: Zap, color: "text-cyan-700 dark:text-cyan-400 border-cyan-300/60 dark:border-cyan-500/20 bg-cyan-50/70 dark:bg-cyan-500/5" },
              { label: "GPU Infrastructure", ref: null, val: "Modal A100 Clusters", sub: "FlashAttention-3 & BPE", icon: Cpu, color: "text-indigo-700 dark:text-indigo-400 border-indigo-300/60 dark:border-indigo-500/20 bg-indigo-50/70 dark:bg-indigo-500/5" },
              { label: "Data Pipeline Scale", ref: countRecords.ref, val: `${countRecords.count}M+ Records / Day`, sub: "Apache Airflow + Azure", icon: Database, color: "text-emerald-700 dark:text-emerald-400 border-emerald-300/60 dark:border-emerald-500/20 bg-emerald-50/70 dark:bg-emerald-500/5" },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} ref={stat.ref} className={`p-4 rounded-xl border glass-card ${stat.color} transition-all hover:scale-[1.02]`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">{stat.val}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{stat.sub}</div>
                </div>
              )
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Button size="lg" onClick={() => scrollToSection("workbench")}
              className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold px-7 py-6 text-base rounded-xl shadow-xl shadow-indigo-600/25 transition-all hover:scale-105">
              Launch Live Workbench <Zap className="w-4 h-4 ml-1.5" />
            </Button>
            <Button size="lg" onClick={() => window.dispatchEvent(new CustomEvent("open-portfolio-assistant"))}
              className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-semibold px-7 py-6 text-base rounded-xl shadow-xl shadow-cyan-600/20 transition-all hover:scale-105">
              <Bot className="w-4 h-4 mr-2" /> Ask the AI Assistant
            </Button>
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="inline-flex items-center gap-2 glass-panel border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-6 py-3.5 text-base rounded-xl transition-all hover:scale-105"
            >
              <Command className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Commands <kbd className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono ml-1">⌘K</kbd>
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            <HeroInteractiveTerminal />
          </motion.div>
        </div>
      </section>

      {/* Core Architectural Strengths */}
      <section className="py-16 relative z-10 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/40 dark:bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400 uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Engineering Philosophy &amp; Depth
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Core Architectural Strengths</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">How I design, scale, and evaluate AI systems for real-world production environments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Brain, colorKey: "cyan", title: "Knowledge Graph RAG & Reasoning", desc: "Specialized in multi-hop entity extraction, Neo4j graph schemas, confidence-based 3-way threshold routing (CRAG), and slashing retrieval hallucination down to sub-2%.", tags: ["Neo4j", "LangGraph", "Self-Correction"] },
              { icon: Cpu, colorKey: "amber", title: "Distributed Serverless GPU Inference", desc: "Hands-on with Modal.com NVIDIA A100 GPU workers, FlashAttention-3 kernel optimization, KV cache management, and distributed evaluation harnesses.", tags: ["Modal A100", "FlashAttention-3", "PyTorch"] },
              { icon: Layers, colorKey: "indigo", title: "Production Rigor & Automated Guardrails", desc: "Strict TypeScript engineering, asynchronous FastAPI endpoints with Redis token buckets, Next.js 14 App Router, and recursive autonomous deployment pipelines.", tags: ["Strict TS", "FastAPI", "State Graphs"] },
            ].map((card, i) => {
              const Icon = card.icon
              const c = card.colorKey
              const bHover = c==="cyan"?"hover:border-cyan-500/40":c==="amber"?"hover:border-amber-500/40":"hover:border-indigo-500/40"
              const iBg = c==="cyan"?"bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400":c==="amber"?"bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400":"bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400"
              const tHov = c==="cyan"?"group-hover:text-cyan-600 dark:group-hover:text-cyan-300":c==="amber"?"group-hover:text-amber-600 dark:group-hover:text-amber-300":"group-hover:text-indigo-600 dark:group-hover:text-indigo-300"
              const tgCol = c==="cyan"?"text-cyan-600 dark:text-cyan-400":c==="amber"?"text-amber-600 dark:text-amber-400":"text-indigo-600 dark:text-indigo-400"
              return (
                <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`glass-card rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 ${bHover} transition-all group`}>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${iBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors ${tHov}`}>{card.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{card.desc}</p>
                  <div className={`mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/60 text-[11px] font-semibold ${tgCol}`}>
                    {card.tags.join(" • ")}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Why Work With Me */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/40">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase mb-6">
              <Award className="w-3.5 h-3.5" /> Why AI Teams Hire Adil
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: CheckCircle2, title: "Research → Production", desc: "Papers implemented on real A100 GPUs — Titan Memory, FlashAttention-3, CRAG — not just read." },
                { icon: TrendingUp, title: "Full-Stack AI Ownership", desc: "Data pipeline → LLM → API → UI → Monitoring. End-to-end delivery without handoff." },
                { icon: GitBranch, title: "Graph-Driven Architecture", desc: "Graph agents, state machines, and knowledge graphs as a core engineering philosophy — not a buzzword." },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Timeline */}
      <section id="experience" className="py-24 relative z-10 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase mb-2">
              <Activity className="w-3.5 h-3.5" /> Career &amp; Education
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Experience &amp; Background</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">From academic research to production AI engineering.</p>
          </div>

          <div className="relative">
            <div className="absolute left-6 sm:left-8 top-4 bottom-4 w-px bg-gradient-to-b from-cyan-500 via-indigo-500 to-transparent" />
            <div className="space-y-10">
              {timelineData.map((item, i) => {
                const isWork = item.type === "work"
                const dotColor = isWork ? "bg-cyan-500 shadow-cyan-500/50" : "bg-indigo-500 shadow-indigo-500/50"
                const borderHover = isWork ? "hover:border-cyan-500/40" : "hover:border-indigo-500/40"
                const tagColor = isWork ? "border-cyan-500/30 text-cyan-700 dark:text-cyan-400 bg-cyan-500/10" : "border-indigo-500/30 text-indigo-700 dark:text-indigo-400 bg-indigo-500/10"
                const TypeIcon = isWork ? TrendingUp : Award
                const iconColor = isWork ? "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/30" : "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/30"
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="relative flex gap-6 sm:gap-8">
                    <div className="relative shrink-0 mt-5">
                      <div className={`w-4 h-4 rounded-full ${dotColor} shadow-lg ring-4 ring-slate-100 dark:ring-slate-950 z-10 relative`} />
                    </div>
                    <div className={`flex-1 glass-card rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 ${borderHover} transition-all group`}>
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${iconColor}`}>
                            <TypeIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.org}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 text-right">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <Calendar className="w-3 h-3" /> {item.period}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin className="w-3 h-3" /> {item.location}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span key={tag} className={`text-[11px] px-2.5 py-0.5 rounded-md border font-medium ${tagColor}`}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Flagship Interactive Architecture Workbench ─────────────────── */}
      <ArchitectureWorkbench />

      {/* ── Case Studies & Research Implementations ──────────────────────── */}
      <section id="projects" className="py-24 relative z-10 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Engineering Case Studies
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Case Studies &amp; Architectures
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
                Rigorous problem formulations, architectural decisions, and empirically measured benchmarks.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Case Studies" },
                { id: "rag", label: "RAG & Knowledge Graphs" },
                { id: "llm", label: "LLMs & GPU Inference" },
                { id: "ml", label: "Forecasting & Analytics" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setProjectFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    projectFilter === tab.id
                      ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20"
                      : "glass-panel border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                  className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group border border-slate-200/90 dark:border-slate-800"
                >
                  <div>
                    {/* Header pill & Action Links */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {project.highlight ? (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/40 text-cyan-700 dark:text-cyan-300">
                          {project.highlight}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-400">
                          {project.category.toUpperCase()}
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                          title="View Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-700 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                            title="Live DeepWiki Demo"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-4">{project.subtitle}</p>

                    {/* Structured Case Study: Challenge -> Decision -> Outcome */}
                    <div className="space-y-3 mb-6 text-xs leading-relaxed">
                      <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                        <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">
                          Problem &amp; Challenge:
                        </span>
                        <span className="text-slate-600 dark:text-slate-300">{project.challenge}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                        <span className="font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider block mb-1">
                          Architectural Decision:
                        </span>
                        <span className="text-slate-600 dark:text-slate-300">{project.architecturalDecision}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                          Empirical Outcome:
                        </span>
                        <span className="text-slate-700 dark:text-slate-200 font-medium">{project.outcome}</span>
                      </div>
                    </div>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag.name} className={`text-xs px-2.5 py-1 rounded-md border font-medium ${tag.color}`}>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Footer Bar */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center bg-slate-100/80 dark:bg-slate-900/40 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 px-4 py-3 rounded-b-2xl">
                    {Object.entries(project.metrics).map(([key, val]) => (
                      <div key={key}>
                        <div className="text-[11px] text-slate-500 dark:text-slate-500 font-medium uppercase tracking-wider">{key}</div>
                        <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">{val}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── AI Assistant Callout Demo ─────────────────────────────────────── */}
      <section className="py-20 relative z-10 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl border border-cyan-400/40 dark:border-cyan-500/20 p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-cyan-50/60 via-white/80 to-indigo-50/60 dark:from-cyan-500/5 dark:via-transparent dark:to-indigo-500/5">
            <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-xs font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase">Live AI Engineering Demo &mdash; Built Into This Portfolio</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">This Portfolio Runs a Real Graph Agent Pipeline</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mb-10 leading-relaxed">
                The AI assistant here isn&apos;t a generic chatbot &mdash; it&apos;s a production-grade{" "}
                <span className="text-cyan-700 dark:text-cyan-400 font-medium">4-node deterministic graph agent</span> built with the same architecture used in Adil&apos;s RAG research.
                Graph-based intent routing, multi-source context fusion, and Gemini-grounded responses. This portfolio <em>is</em> the demo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-start gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2">
                {[
                  { label: "Intent Router", sub: "9 query types, keyword classification", color: "border-cyan-400/50 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300", icon: Search },
                  { label: "Context Fusion", sub: "CV + GitHub multi-source retrieval", color: "border-indigo-400/50 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-800 dark:text-indigo-300", icon: Database },
                  { label: "Gemini 3.6 Flash", sub: "Grounded generation, temp=0.25", color: "border-purple-400/50 bg-purple-50 dark:bg-purple-500/10 text-purple-800 dark:text-purple-300", icon: Brain },
                  { label: "Suggestion Engine", sub: "3 dynamic follow-up chips", color: "border-amber-400/50 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300", icon: Sparkles },
                ].map((node, i, arr) => {
                  const Icon = node.icon
                  return (
                    <div key={node.label} className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.12 }}
                        className={`flex flex-col items-center text-center p-4 rounded-xl border ${node.color} min-w-[138px]`}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-white dark:bg-slate-900/60 shadow-xs">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{node.label}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{node.sub}</span>
                        <span className="text-[9px] font-mono text-slate-500 dark:text-slate-600 mt-2">NODE {i + 1}</span>
                      </motion.div>
                      {i < arr.length - 1 && <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 shrink-0" />}
                    </div>
                  )
                })}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => window.dispatchEvent(new CustomEvent("open-portfolio-assistant"))}
                  className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]">
                  <Bot className="w-4 h-4 mr-2" /> Try the Graph Agent Now &rarr;
                </Button>
                <a href="https://github.com/AadilUsmani/portfolio_adil_usmani" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 glass-panel border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300 font-semibold px-5 py-3 rounded-xl text-sm transition-all hover:scale-[1.02]">
                  <Github className="w-4 h-4" /> View Portfolio Source
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 relative z-10 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-2">
              <Layers className="w-3.5 h-3.5" /> Technical Stack &amp; Mastery
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Skills &amp; Engineering Toolkit</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">Deep capabilities across Large Language Models, knowledge graphs, distributed cloud compute, and production APIs.</p>
          </div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillsCategories.map((cat) => (
              <motion.div key={cat.title} variants={itemVariants} className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800/80">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{cat.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{cat.description}</p>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  {cat.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-mono">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: si * 0.08, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-1">{skill.detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 relative z-10 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-950/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase mb-2">
              <Send className="w-3.5 h-3.5" /> Direct Channel
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Let&apos;s Build Something Extraordinary</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">Have a project, research collaboration, or engineering role? Send a message directly to my inbox.</p>
          </div>
          <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800/80">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-2">Your Name</label>
                  <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Turing" className="bg-white dark:bg-slate-900/80 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 h-11" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-2">Your Email</label>
                  <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com" className="bg-white dark:bg-slate-900/80 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 h-11" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-2">Subject</label>
                <Input id="subject" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. AI Engineering Collaboration / Job Opportunity"
                  className="bg-white dark:bg-slate-900/80 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 h-11" />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-2">Message</label>
                <Textarea id="message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, timeline, or position..."
                  className="bg-white dark:bg-slate-900/80 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500" />
              </div>
              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" /><span>{submitMessage}</span>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 text-sm">{submitMessage}</div>
              )}
              <Button type="submit" disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold py-6 text-base rounded-xl shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.01]">
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Delivering Email via SMTP...</span>
                ) : (
                  <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Direct Message</span>
                )}
              </Button>
            </form>
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
              <span>Direct Email: <a href="mailto:muhammadaadilusmani@gmail.com" className="text-cyan-700 dark:text-cyan-400 hover:underline">muhammadaadilusmani@gmail.com</a></span>
              <div className="flex gap-4">
                <a href="https://github.com/AadilUsmani" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1"><Github className="w-3.5 h-3.5" /> GitHub</a>
                <a href="https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Activity Strip */}
      <section className="py-10 border-t border-slate-200 dark:border-slate-900 bg-slate-100/80 dark:bg-slate-950 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { label: "Public Repos", val: "10+", icon: GitBranch, color: "text-cyan-700 dark:text-cyan-400 border-cyan-300/60 dark:border-cyan-500/30 bg-cyan-50/70 dark:bg-cyan-500/5" },
              { label: "AI / ML Projects", val: "5 Featured", icon: Brain, color: "text-indigo-700 dark:text-indigo-400 border-indigo-300/60 dark:border-indigo-500/30 bg-indigo-50/70 dark:bg-indigo-500/5" },
              { label: "GitHub Profile", val: "AadilUsmani", icon: Github, color: "text-slate-700 dark:text-slate-300 border-slate-300/80 dark:border-slate-700 bg-white/80 dark:bg-slate-800/40", href: "https://github.com/AadilUsmani" },
              { label: "Open to Collab", val: "Yes", icon: CheckCircle2, color: "text-emerald-700 dark:text-emerald-400 border-emerald-300/60 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-500/5" },
            ].map((badge) => {
              const Icon = badge.icon
              const inner = (
                <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border glass-panel text-sm font-medium transition-all hover:scale-[1.03] ${badge.color}`}>
                  <Icon className="w-4 h-4" />
                  <span className="text-slate-500 dark:text-slate-400 text-xs">{badge.label}:</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{badge.val}</span>
                </div>
              )
              return (badge as any).href ? (
                <a key={badge.label} href={(badge as any).href} target="_blank" rel="noopener noreferrer">{inner}</a>
              ) : <div key={badge.label}>{inner}</div>
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 text-center text-xs text-slate-500 dark:text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Muhammad Adil Usmani. Crafted with Next.js, Framer Motion &amp; Tailwind CSS.</p>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="hover:text-slate-900 dark:hover:text-white transition-colors">{item.label}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full glass-panel border border-slate-300 dark:border-slate-700/80 flex items-center justify-center text-slate-800 dark:text-white shadow-xl hover:scale-110 transition-transform"
            aria-label="Back to Top">
            <svg width="44" height="44" viewBox="0 0 48 48" className="rotate-[-90deg] absolute">
              <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(0,0,0,0.1)" className="dark:stroke-white/10" strokeWidth="2.5" />
              <motion.circle cx="24" cy="24" r="20" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"
                strokeDasharray={circumference} style={{ strokeDashoffset }} />
            </svg>
            <ArrowUp className="w-4 h-4 relative z-10 text-cyan-600 dark:text-cyan-300" />
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
    </div>
  )
}
