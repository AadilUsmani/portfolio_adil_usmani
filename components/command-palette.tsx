"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Command,
  Brain,
  Layers,
  Sparkles,
  Download,
  Mail,
  Moon,
  Sun,
  Github,
  Linkedin,
  ExternalLink,
  FileText,
  Shield,
  Bot,
  Terminal,
  Activity,
  Check,
  X,
  ChevronRight,
  Send,
  Zap,
} from "lucide-react"

interface CommandAction {
  id: string
  title: string
  subtitle?: string
  category: "Navigation" | "AI Assistant" | "Projects" | "Actions"
  icon: React.ElementType
  action: () => void
  keywords?: string[]
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
  setIsDarkMode: (val: boolean) => void
  scrollToSection: (id: string) => void
}

export function CommandPalette({
  isOpen,
  onClose,
  isDarkMode,
  setIsDarkMode,
  scrollToSection,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Listen for global open event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        if (isOpen) onClose()
        else window.dispatchEvent(new CustomEvent("open-command-palette"))
      }
      if (e.key === "Escape" && isOpen) {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

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
    setTimeout(() => {
      setCopiedEmail(false)
      onClose()
    }, 1200)
  }

  const openAiAgent = (prefilledQuery?: string) => {
    onClose()
    window.dispatchEvent(
      new CustomEvent("open-portfolio-assistant", { detail: { query: prefilledQuery } })
    )
  }

  const actions: CommandAction[] = [
    // Navigation
    {
      id: "nav-about",
      title: "About Adil",
      subtitle: "Overview, background, and research focus",
      category: "Navigation",
      icon: Terminal,
      action: () => { scrollToSection("about"); onClose() },
      keywords: ["hero", "bio", "intro", "overview"],
    },
    {
      id: "nav-experience",
      title: "Experience & Education",
      subtitle: "ML1 Data Science Intern & UCP Degree",
      category: "Navigation",
      icon: Activity,
      action: () => { scrollToSection("experience"); onClose() },
      keywords: ["career", "work", "job", "university", "timeline"],
    },
    {
      id: "nav-workbench",
      title: "Interactive Architecture Workbench",
      subtitle: "Inspect live Graph RAG, GPU clusters, and CRAG routing",
      category: "Navigation",
      icon: Zap,
      action: () => { scrollToSection("workbench"); onClose() },
      keywords: ["demo", "interactive", "graph", "cluster", "routing", "neo4j"],
    },
    {
      id: "nav-projects",
      title: "Projects & Case Studies",
      subtitle: "Anarchist LLM, Lexical Graph RAG, CRAG, Titan, AeroSphere",
      category: "Navigation",
      icon: Brain,
      action: () => { scrollToSection("projects"); onClose() },
      keywords: ["research", "code", "repos", "implementations"],
    },
    {
      id: "nav-skills",
      title: "Skills & Tooling",
      subtitle: "LLMs, Graph RAG, FastAPI, PyTorch, Modal",
      category: "Navigation",
      icon: Layers,
      action: () => { scrollToSection("skills"); onClose() },
      keywords: ["stack", "tech", "python", "neo4j"],
    },
    {
      id: "nav-contact",
      title: "Contact Adil",
      subtitle: "Direct message form & email link",
      category: "Navigation",
      icon: Send,
      action: () => { scrollToSection("contact"); onClose() },
      keywords: ["message", "hire", "email", "reach out"],
    },

    // AI Assistant
    {
      id: "ai-launch",
      title: "Launch Graph AI Assistant",
      subtitle: "Interactive 4-node agent grounded in CV & GitHub",
      category: "AI Assistant",
      icon: Bot,
      action: () => openAiAgent(),
      keywords: ["chat", "bot", "assistant", "ask"],
    },
    {
      id: "ai-rag-query",
      title: 'Ask AI: "How does Adil\'s Graph RAG work?"',
      subtitle: "Explain Neo4j deduplication & SEC 10-K indexing",
      category: "AI Assistant",
      icon: Sparkles,
      action: () => openAiAgent("How does Adil's Graph RAG work?"),
      keywords: ["neo4j", "graph rag", "sec 10-k", "rag"],
    },
    {
      id: "ai-gpu-query",
      title: 'Ask AI: "Tell me about the Anarchist LLM Modal cluster"',
      subtitle: "FlashAttention-3, NVIDIA A100 GPU workers",
      category: "AI Assistant",
      icon: Sparkles,
      action: () => openAiAgent("Tell me about the Anarchist LLM Modal cluster and FlashAttention-3"),
      keywords: ["a100", "flashattention", "modal", "anarchist"],
    },
    {
      id: "ai-experience-query",
      title: 'Ask AI: "Summarize Adil\'s experience at ML1"',
      subtitle: "End-to-end automation products (ticketing, hiring & support)",
      category: "AI Assistant",
      icon: Sparkles,
      action: () => openAiAgent("What is Adil's experience at ML1?"),
      keywords: ["ml1", "intern", "experience", "automation", "ticketing", "hiring"],
    },

    // Actions
    {
      id: "act-copy-email",
      title: copiedEmail ? "Email Copied to Clipboard!" : "Copy Email Address",
      subtitle: "muhammadaadilusmani@gmail.com",
      category: "Actions",
      icon: copiedEmail ? Check : Mail,
      action: copyEmail,
      keywords: ["copy", "email", "contact", "address"],
    },
    {
      id: "act-download-cv",
      title: "Download Resume (PDF)",
      subtitle: "Verified CV with complete academic & work history",
      category: "Actions",
      icon: Download,
      action: () => {
        window.open("/Muhammad_Adil_Usmani_cv.pdf", "_blank")
        onClose()
      },
      keywords: ["cv", "resume", "pdf", "download"],
    },
    {
      id: "act-read-paper",
      title: "Read Research Paper: Deterministic Data Fusion for FinTech",
      subtitle: "Fault-tolerant state synchronisation across financial event streams",
      category: "Actions",
      icon: FileText,
      action: () => {
        window.open("/Deterministic_Data_Fusion_for_FinTech.pdf", "_blank")
        onClose()
      },
      keywords: ["paper", "research", "fintech", "distributed", "pdf"],
    },
    {
      id: "act-crypto-repo",
      title: "Open SEMS Cryptosystem Repo",
      subtitle: "github.com/AadilUsmani/Crypto_secure_system",
      category: "Actions",
      icon: Shield,
      action: () => {
        window.open("https://github.com/AadilUsmani/Crypto_secure_system", "_blank")
        onClose()
      },
      keywords: ["crypto", "sems", "security", "github"],
    },
    {
      id: "act-toggle-theme",
      title: `Switch to ${isDarkMode ? "Light" : "Dark"} Mode`,
      subtitle: `Currently in ${isDarkMode ? "Obsidian Dark" : "Alpine Light"} theme`,
      category: "Actions",
      icon: isDarkMode ? Sun : Moon,
      action: () => {
        setIsDarkMode(!isDarkMode)
        onClose()
      },
      keywords: ["theme", "mode", "dark", "light", "color"],
    },
    {
      id: "act-switch-v2",
      title: "Switch to Cyber Blueprint UI (v2)",
      subtitle: "Technical console with live topology visualizer and CyberBug mascot",
      category: "Actions",
      icon: Layers,
      action: () => {
        try {
          localStorage.setItem("adil-ui-variant", "v2")
          window.dispatchEvent(new CustomEvent("switch-ui-variant", { detail: { variant: "v2" } }))
        } catch {}
        onClose()
      },
      keywords: ["ui", "v2", "blueprint", "cyber", "variant", "switch"],
    },
    {
      id: "act-github",
      title: "Open GitHub Profile",
      subtitle: "github.com/AadilUsmani (10+ repositories)",
      category: "Actions",
      icon: Github,
      action: () => {
        window.open("https://github.com/AadilUsmani", "_blank")
        onClose()
      },
      keywords: ["github", "code", "profile", "git"],
    },
    {
      id: "act-linkedin",
      title: "Open LinkedIn Profile",
      subtitle: "Connect with Muhammad Adil Usmani",
      category: "Actions",
      icon: Linkedin,
      action: () => {
        window.open("https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314/", "_blank")
        onClose()
      },
      keywords: ["linkedin", "social", "connect", "profile"],
    },
  ]

  const filteredActions = actions.filter((act) => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      act.title.toLowerCase().includes(q) ||
      (act.subtitle && act.subtitle.toLowerCase().includes(q)) ||
      act.category.toLowerCase().includes(q) ||
      (act.keywords && act.keywords.some((k) => k.toLowerCase().includes(q)))
    )
  })

  // Keyboard navigation within list
  useEffect(() => {
    const handleListNav = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % Math.max(filteredActions.length, 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(filteredActions.length, 1))
      } else if (e.key === "Enter" && filteredActions[selectedIndex]) {
        e.preventDefault()
        filteredActions[selectedIndex].action()
      }
    }
    window.addEventListener("keydown", handleListNav)
    return () => window.removeEventListener("keydown", handleListNav)
  }, [isOpen, filteredActions, selectedIndex])

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`)
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-2xl rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 shadow-2xl shadow-black/40 overflow-hidden font-sans z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-200/80 dark:border-slate-800 gap-3">
              <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                placeholder="Type a command or search (e.g. Graph RAG, A100, Resume)..."
                className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs transition-colors"
                aria-label="Close"
              >
                <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400">ESC</kbd>
              </button>
            </div>

            {/* Results List */}
            <div ref={listRef} className="max-h-[380px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredActions.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                  <p>No commands found for &ldquo;<span className="font-semibold text-slate-700 dark:text-slate-300">{query}</span>&rdquo;</p>
                  <p className="text-xs mt-1">Try searching for &ldquo;Graph RAG&rdquo;, &ldquo;Resume&rdquo;, or &ldquo;Contact&rdquo;</p>
                </div>
              ) : (
                filteredActions.map((act, index) => {
                  const Icon = act.icon
                  const isSelected = index === selectedIndex
                  return (
                    <button
                      key={act.id}
                      data-index={index}
                      onClick={act.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all group ${
                        isSelected
                          ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/20"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate flex items-center gap-2">
                            <span>{act.title}</span>
                          </div>
                          {act.subtitle && (
                            <p
                              className={`text-xs truncate ${
                                isSelected
                                  ? "text-white/80"
                                  : "text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {act.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {act.category}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected
                              ? "text-white translate-x-0.5"
                              : "text-slate-400 dark:text-slate-600"
                          }`}
                        />
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer Tip */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[9px]">↑</kbd>
                  <kbd className="px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[9px]">↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[9px]">↵</kbd>
                  <span>Select</span>
                </span>
              </div>
              <span className="hidden sm:inline text-cyan-600 dark:text-cyan-400 font-medium">
                Tip: Press <kbd className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[9px]">Cmd+K</kbd> anytime
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
