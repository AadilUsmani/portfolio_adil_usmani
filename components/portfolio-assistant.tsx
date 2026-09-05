"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Bot,
  Send,
  X,
  RotateCcw,
  User,
  ChevronRight,
  ExternalLink,
  Brain,
  Download,
  Loader2,
  FileText,
  Github,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  role: "assistant" | "user"
  text: string
  suggestions?: string[]
  timestamp: string
}

const INITIAL_SUGGESTIONS = [
  "🌟 Tell me about Anarchist LLM",
  "📑 What research papers has Adil written?",
  "🛡️ How is encryption built in Crypto_secure_system?",
  "🕸️ What is Adil's Graph RAG experience?",
  "⚡ How does Corrective RAG (CRAG) work?",
  "💼 Summarize Adil's work at ML1",
  "📄 How can I contact or hire Adil?",
]

export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputQuery, setInputQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "👋 Hi! I'm **Adil's AI Portfolio Assistant**.\n\nI'm grounded in Muhammad Adil Usmani's **verified CV** and **GitHub repositories**. Ask me anything about his research on **Anarchist LLM**, **Graph RAG**, **Titan Memory**, work experience at **ML1**, or skills!",
      suggestions: INITIAL_SUGGESTIONS,
      timestamp: "",
    },
  ])

  // Mount timestamp on client to guarantee 0 SSR hydration mismatch
  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === "welcome" && !m.timestamp
          ? { ...m, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
          : m
      )
    )
  }, [])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Allow external "Try AI" CTAs to open the assistant via a custom event
  useEffect(() => {
    const handler = (e: any) => {
      setIsOpen(true)
      if (e?.detail?.query) {
        setTimeout(() => handleSendMessage(e.detail.query), 150)
      }
    }
    window.addEventListener("open-portfolio-assistant", handler)
    return () => window.removeEventListener("open-portfolio-assistant", handler)
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 250)
    }
  }, [isOpen, messages])

  const handleSendMessage = async (queryText?: string) => {
    const query = (queryText || inputQuery).trim()
    if (!query || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputQuery("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ role: m.role, content: m.text })),
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: data.reply,
          suggestions: data.suggestedQuestions || [],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        throw new Error(data.error || "Failed to generate response")
      }
    } catch (err: any) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        text: `⚠️ **Notice:** ${err.message || "Could not connect to the agent service."}\n\nYou can reach Adil directly at [muhammadaadilusmani@gmail.com](mailto:muhammadaadilusmani@gmail.com).`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        text: "Conversation reset. Feel free to ask another question about Adil's background, research, or experience!",
        suggestions: INITIAL_SUGGESTIONS,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
  }

  // Simple, safe Markdown parser for links, bold, bullet points, headers
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split("\n")
    return (
      <div className="space-y-1.5 leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith("### ")) {
            return (
              <h4 key={idx} className="font-bold text-slate-900 dark:text-white text-xs mt-2 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-600 dark:text-cyan-400 shrink-0" />
                <span>{line.replace("### ", "")}</span>
              </h4>
            )
          }

          if (line.startsWith("- ") || line.startsWith("• ") || line.startsWith("* ")) {
            const bulletContent = line.replace(/^[-•*]\s+/, "")
            return (
              <div key={idx} className="flex items-start gap-1.5 ml-1 text-slate-700 dark:text-slate-300 text-xs">
                <span className="text-indigo-600 dark:text-cyan-400 font-bold mt-0.5">•</span>
                <span>{renderInlineMarkdown(bulletContent)}</span>
              </div>
            )
          }

          if (!line.trim()) {
            return <div key={idx} className="h-1" />
          }

          return (
            <p key={idx} className="text-xs text-slate-700 dark:text-slate-300">
              {renderInlineMarkdown(line)}
            </p>
          )
        })}
      </div>
    )
  }

  const renderInlineMarkdown = (text: string) => {
    const parts: React.ReactNode[] = []
    const linkRegex = /\[(.*?)\]\((.*?)\)/g
    let lastIdx = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        parts.push(renderBoldText(text.substring(lastIdx, match.index), `txt-${lastIdx}`))
      }
      const linkLabel = match[1]
      const linkUrl = match[2]
      parts.push(
        <a
          key={`link-${match.index}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-cyan-400 hover:underline font-semibold inline-flex items-center gap-0.5"
        >
          {linkLabel}
          <ExternalLink className="w-2.5 h-2.5 inline ml-0.5 opacity-80" />
        </a>
      )
      lastIdx = linkRegex.lastIndex
    }

    if (lastIdx < text.length) {
      parts.push(renderBoldText(text.substring(lastIdx), `txt-end`))
    }

    return parts.length > 0 ? parts : text
  }

  const renderBoldText = (text: string, keyPrefix: string) => {
    const boldParts = text.split(/(\*\*.*?\*\*)/g)
    return boldParts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={`${keyPrefix}-${i}`} className="font-bold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        )
      }
      return part
    })
  }

  return (
    <>
      {/* ── 1. Floating Action Pill ───────────────────────────────────────── */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-3 px-4 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/25 border border-indigo-400/30 text-xs font-semibold transition-all group"
              aria-label="Open AI Assistant"
            >
              <div className="relative flex items-center justify-center">
                <Bot className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold tracking-tight text-white flex items-center gap-1">
                  Ask AI About Adil
                  <Sparkles className="w-3 h-3 text-amber-300" />
                </span>
                <span className="text-[10px] text-indigo-100 font-normal">CV &amp; GitHub Agent</span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── 2. Glass Chat Modal (Adaptive Light/Dark) ────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] flex flex-col rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-900/20 dark:shadow-black/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    Adil&apos;s AI Agent
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Grounded in CV &amp; GitHub Repositories</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors"
                  title="Reset Conversation"
                  aria-label="Reset Conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors"
                  title="Close Assistant"
                  aria-label="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/50 dark:bg-slate-950/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs transition-all ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none bg-white dark:bg-slate-900/90 shadow-sm"
                    }`}
                  >
                    {msg.role === "assistant" ? renderFormattedText(msg.text) : <p>{msg.text}</p>}
                  </div>

                  <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 px-1">{msg.timestamp}</span>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                      {msg.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSendMessage(sug)}
                          disabled={isLoading}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium border border-slate-200 dark:border-slate-800 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-300 transition-all text-left flex items-center gap-1 group shadow-2xs"
                        >
                          <span>{sug}</span>
                          <ChevronRight className="w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 max-w-[75%] shadow-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600 dark:text-cyan-400" />
                  <span>Synthesizing verified CV context...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-slate-800 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask about Adil's research, skills, or CV..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-500/50 transition-colors disabled:opacity-50"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !inputQuery.trim()}
                  size="sm"
                  className="h-8 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
