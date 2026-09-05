"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X, Trash2, ExternalLink, Cpu } from "lucide-react";
import { profile, suggestedQuestions, projects } from "@/lib/dataV2";
import { useShell } from "@/components/v2/shell-context";
import { SectionHeader, Corner, Dot } from "@/components/v2/ui";

type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { id: string; topic: string; source: string }[];
  mode?: "llm" | "extractive";
  relatedProjectId?: string | null;
  pending?: boolean;
};

const welcome: Msg = {
  id: "welcome",
  role: "assistant",
  content: `Hi, I'm Adil's portfolio assistant. I answer from his verified CV, live GitHub codebases, research papers, and system architectures. Ask me about any system, the stack, or how to reach him.`,
};

type Store = { messages: Msg[]; sessionId: string | null; busy: boolean };
let store: Store = { messages: [welcome], sessionId: null, busy: false };
const listeners = new Set<() => void>();
function setStore(patch: Partial<Store>) {
  store = { ...store, ...patch };
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}
const serverSnapshot: Store = { messages: [welcome], sessionId: null, busy: false };
let lastSeedHandled: string | null = null;

function useChat() {
  const state = useSyncExternalStore(subscribe, () => store, () => serverSnapshot);

  const send = useCallback(async (text: string) => {
    const q = text.trim();
    if (!q || store.busy) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: q };
    const pendingId = crypto.randomUUID();
    setStore({
      messages: [...store.messages, userMsg, { id: pendingId, role: "assistant", content: "", pending: true }],
      busy: true,
    });
    try {
      const history = store.messages.filter((m) => !m.pending && m.id !== "welcome").map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, sessionId: store.sessionId, history }),
      });
      const json = await res.json();
      if (!res.ok || (!json.ok && !json.success)) throw new Error(json.error || "Request failed");
      setStore({
        sessionId: json.sessionId,
        busy: false,
        messages: store.messages.map((m) =>
          m.id === pendingId
            ? { id: pendingId, role: "assistant", content: json.answer || json.reply || "Done.", sources: json.sources, mode: json.mode, relatedProjectId: json.relatedProjectId }
            : m,
        ),
      });
    } catch (err) {
      setStore({
        busy: false,
        messages: store.messages.map((m) =>
          m.id === pendingId
            ? { id: pendingId, role: "assistant", content: `I hit an error reaching the knowledge service (${err instanceof Error ? err.message : "unknown"}). Please try again.` }
            : m,
        ),
      });
    }
  }, []);

  const clear = useCallback(() => setStore({ messages: [welcome], sessionId: null, busy: false }), []);
  return { ...state, send, clear };
}

function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      setShown(i);
      if (i >= text.length) clearInterval(id);
    }, 12);
    return () => clearInterval(id);
  }, [text]);
  return <>{text.slice(0, shown)}</>;
}

export function ChatConsole({ compact = false }: { compact?: boolean }) {
  const { messages, busy, send, clear } = useChat();
  const { assistantSeed, focusProject, setAssistantOpen } = useShell();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (assistantSeed && assistantSeed !== lastSeedHandled && compact) {
      lastSeedHandled = assistantSeed;
      void send(assistantSeed.split("\u0000")[0]);
    }
  }, [assistantSeed, send, compact]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    void send(input);
    setInput("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div ref={scrollRef} className={`min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 ${compact ? "" : "max-h-[520px]"}`}>
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] ${m.role === "user" ? "" : "flex gap-3"}`}>
              {m.role === "assistant" ? (
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border border-teal/40 bg-teal/10 text-teal">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
              ) : null}
              <div>
                <div
                  className={`rounded-xl px-4 py-3 text-[13.5px] leading-relaxed ${
                    m.role === "user" ? "bg-paper text-ink" : "border border-line bg-ink-3 text-paper-2"
                  }`}
                >
                  {m.pending ? (
                    <span className="mono flex items-center gap-2 text-[11px] text-mute">
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal [animation-delay:0ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal [animation-delay:120ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal [animation-delay:240ms]" />
                      </span>
                      retrieving · ranking · composing
                    </span>
                  ) : m.role === "assistant" && m.id !== "welcome" ? (
                    <div className="prose-tight whitespace-pre-wrap">
                      <Typewriter text={m.content} />
                    </div>
                  ) : (
                    <div className="prose-tight whitespace-pre-wrap">{m.content}</div>
                  )}
                </div>
                {m.sources && m.sources.length ? (
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="mono text-[9.5px] tracking-widest text-mute">SOURCES</span>
                    {m.sources.map((s) => (
                      <span key={s.id} className="mono rounded border border-line-2 bg-ink-2 px-1.5 py-0.5 text-[9.5px] text-paper-2">
                        {s.topic}
                      </span>
                    ))}
                    {m.mode ? (
                      <span className="mono ml-auto flex items-center gap-1 text-[9.5px] text-mute">
                        <Cpu className="h-3 w-3" /> {m.mode === "llm" ? "LLM synthesis" : "extractive"}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                {m.relatedProjectId ? (
                  <button
                    onClick={() => {
                      focusProject(m.relatedProjectId!);
                      setAssistantOpen(false);
                    }}
                    className="mt-1.5 inline-flex items-center gap-1 text-[11.5px] text-teal hover:underline"
                  >
                    Open system {projects.find((p) => p.id === m.relatedProjectId)?.index} <ExternalLink className="h-3 w-3" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-line px-3 pb-3 pt-2">
        <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => void send(q)}
              disabled={busy}
              className="mono shrink-0 rounded-full border border-line-2 bg-ink-3 px-2.5 py-1 text-[10.5px] text-paper-2 transition-colors hover:border-teal/50 hover:text-teal disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="flex items-center gap-2">
          <button type="button" onClick={clear} aria-label="Clear conversation" className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-line-2 text-mute hover:text-paper">
            <Trash2 className="h-4 w-4" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a system, a paper, or the stack…"
            className="h-10 min-w-0 flex-1 rounded-md border border-line-2 bg-ink-3 px-3 text-[13.5px] text-paper outline-none placeholder:text-mute focus:border-teal/60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-teal text-ink transition-opacity disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function AssistantSectionV2() {
  const { setAssistantOpen } = useShell();
  return (
    <section id="assistant" className="relative scroll-mt-20 border-t border-line px-5 py-24 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="04"
          label="Knowledge assistant"
          title={
            <>
              Interrogate the portfolio. It answers from the <span className="text-teal">source material</span>.
            </>
          }
          blurb="A retrieval-backed agent grounded in Adil's CV, project documentation and both papers. Each answer cites the chunks it was composed from."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="relative overflow-hidden rounded-xl border border-line bg-ink-2">
            <Corner />
            <div className="mono flex items-center justify-between border-b border-line px-4 py-2.5 text-[10px] tracking-[0.2em] text-mute">
              <span className="flex items-center gap-2">
                <Dot color="var(--color-teal)" /> ASSISTANT · ONLINE
              </span>
              <span>retrieval · rrf-lite · {profile.handle}</span>
            </div>
            <ChatConsole />
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-line bg-ink-2 p-5">
              <div className="mono text-[10px] tracking-[0.2em] text-mute">HOW IT WORKS</div>
              <ol className="mt-3 space-y-3">
                {[
                  ["Tokenize", "Query is normalised and stop-words stripped."],
                  ["Retrieve", "Chunks from CV, docs and papers scored on keyword + body + topic hits."],
                  ["Compose", "Top sentences are assembled — or synthesised by an LLM when a key is configured."],
                  ["Persist", "Sessions and turns are stored in PostgreSQL via Drizzle."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-3">
                    <span className="mono text-[11px] text-teal">0{i + 1}</span>
                    <div>
                      <div className="text-[13px] font-medium text-paper">{t}</div>
                      <div className="text-[12.5px] leading-relaxed text-paper-2">{d}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <button
              onClick={() => setAssistantOpen(true)}
              className="flex w-full items-center justify-between rounded-xl border border-teal/40 bg-teal/10 px-5 py-4 text-left text-teal transition-colors hover:bg-teal/20"
            >
              <span className="text-[13.5px] font-medium">Dock the assistant while you browse</span>
              <span className="kbd">/</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AssistantDrawerV2() {
  const { assistantOpen, setAssistantOpen } = useShell();
  return (
    <AnimatePresence>
      {assistantOpen ? (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAssistantOpen(false)}
            className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-[2px] lg:pointer-events-none lg:bg-transparent lg:backdrop-blur-none"
          />
          <motion.div
            key="drawer"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed bottom-0 right-0 z-[71] flex h-[85vh] w-full flex-col overflow-hidden rounded-t-2xl border border-line bg-ink-2 shadow-[0_-20px_80px_rgba(0,0,0,0.6)] sm:bottom-4 sm:right-4 sm:h-[640px] sm:max-h-[calc(100vh-2rem)] sm:w-[420px] sm:rounded-2xl"
            role="dialog"
            aria-label="Portfolio knowledge assistant"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md border border-teal/40 bg-teal/10 text-teal">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-paper">Knowledge assistant</div>
                  <div className="mono text-[9.5px] tracking-widest text-mute">GROUNDED · CV + DOCS + PAPERS</div>
                </div>
              </div>
              <button onClick={() => setAssistantOpen(false)} className="rounded-md border border-line-2 p-1.5 text-mute hover:text-paper" aria-label="Close assistant">
                <X className="h-4 w-4" />
              </button>
            </div>
            <ChatConsole compact />
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
