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
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Allow external "Try AI" CTAs to open the assistant via a custom event
  useEffect(() => {
    const handler = () => setIsOpen(true)
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
          id: `asst-${Date.now()}`,
          role: "assistant",
          text: data.reply,
          suggestions: data.suggestedQuestions && data.suggestedQuestions.length > 0 ? data.suggestedQuestions : undefined,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        throw new Error(data.error || "Failed to fetch response.")
      }
    } catch (err: any) {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        text: `⚠️ **Connection Note**: Unable to complete the request right now.\n\nYou can also contact Adil directly at **muhammadaadilusmani@gmail.com** or check his [GitHub Profile](https://github.com/AadilUsmani).`,
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
        id: `welcome-${Date.now()}`,
        role: "assistant",
        text: "👋 Chat reset! Ask me anything about Adil's **CV**, **research projects**, or **technical stack**.",
        suggestions: INITIAL_SUGGESTIONS,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
  }

  // Format basic markdown elements (bold, links, bullet points, headers)
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n")
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-bold text-cyan-300 text-sm mt-2 mb-1">
            {line.replace("### ", "")}
          </h4>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={idx} className="font-bold text-white text-sm mt-2 mb-1">
            {line.replace("## ", "")}
          </h3>
        )
      }
      // Bullet points
      if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
        const itemContent = line.trim().replace(/^[-•]\s*/, "")
        return (
          <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300 my-0.5 pl-1">
            <span className="text-cyan-400 mt-0.5">•</span>
            <span>{parseInlineMarkdown(itemContent)}</span>
          </div>
        )
      }
      // Blank lines
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />
      }
      // Normal paragraphs
      return (
        <p key={idx} className="text-xs text-slate-200 leading-relaxed my-1">
          {parseInlineMarkdown(line)}
        </p>
      )
    })
  }

  const parseInlineMarkdown = (content: string) => {
    // Basic regex replacer for markdown links [text](url) and bold **text**
    const parts = []
    let lastIndex = 0

    // Match links or bold
    const regex = /(\[.*?\]\(https?:\/\/.*?\)|\*\*.*?\*\*)/g
    let match

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index))
      }

      const raw = match[0]
      if (raw.startsWith("[") && raw.includes("](")) {
        const linkText = raw.substring(1, raw.indexOf("]("))
        const linkUrl = raw.substring(raw.indexOf("](") + 2, raw.length - 1)
        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline hover:text-cyan-300 inline-flex items-center gap-0.5"
          >
            {linkText}
            <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" />
          </a>,
        )
      } else if (raw.startsWith("**") && raw.endsWith("**")) {
        const boldText = raw.substring(2, raw.length - 2)
        parts.push(
          <strong key={match.index} className="text-white font-semibold">
            {boldText}
          </strong>,
        )
      }

      lastIndex = regex.lastIndex
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex))
    }

    return parts.length > 0 ? parts : content
  }

  return (
    <>
      {/* ── 1. Floating Trigger Pill (Bottom Right) ────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 border border-cyan-400/40 backdrop-blur-lg group transition-all"
              aria-label="Open AI Portfolio Assistant"
            >
              <div className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5" />
                <div className="w-7 h-7 rounded-full bg-slate-900/80 flex items-center justify-center border border-white/20">
                  <Bot className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold tracking-tight text-white flex items-center gap-1">
                  Ask AI About Adil
                  <Sparkles className="w-3 h-3 text-amber-300" />
                </span>
                <span className="text-[10px] text-cyan-100/80 font-normal">CV + GitHub Knowledge Base</span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── 2. Obsidian Glass Chat Modal ──────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] flex flex-col rounded-2xl glass-panel border border-slate-700/80 shadow-2xl shadow-black/80 bg-slate-950/95 backdrop-blur-2xl overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    Adil's AI Agent
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-medium text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400">Grounded in CV &amp; GitHub Repositories</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
                  title="Reset Conversation"
                  aria-label="Reset Conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
                  title="Close Assistant"
                  aria-label="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-950/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs shadow-md transition-all ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-br-none border border-indigo-400/30"
                        : "glass-card border border-slate-800 text-slate-200 rounded-bl-none bg-slate-900/80"
                    }`}
                  >
                    {msg.role === "assistant" ? renderFormattedText(msg.text) : <p>{msg.text}</p>}
                  </div>

                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                      {msg.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSendMessage(sug)}
                          disabled={isLoading}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium glass-panel border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60 transition-all text-left flex items-center gap-1 group"
                        >
                          <span>{sug}</span>
                          <ChevronRight className="w-2.5 h-2.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-400 p-2 glass-card rounded-xl border border-slate-800/60 max-w-[70%]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>Agent synthesizing CV &amp; GitHub context...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions & Input Footer */}
            <div className="p-3 bg-slate-900/90 border-t border-slate-800 shrink-0">
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
                  className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !inputQuery.trim()}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-3 py-2 shadow-md shadow-indigo-600/20 disabled:opacity-40 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>

              {/* Footer Links */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 px-1">
                <a
                  href="/Muhammad_Adil_Usmani_cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  <FileText className="w-2.5 h-2.5" />
                  View CV PDF
                </a>
                <a
                  href="https://github.com/AadilUsmani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  <Github className="w-2.5 h-2.5" />
                  github.com/AadilUsmani
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
