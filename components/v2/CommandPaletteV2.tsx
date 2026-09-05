"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Network,
  FileText,
  Download,
  Mail,
  MessageSquareText,
  Home,
  BookOpen,
  Compass,
  GitBranch,
  Link2,
  CornerDownLeft,
  Layers,
} from "lucide-react";
import { papers, profile, projects } from "@/lib/dataV2";
import { useShell, type SectionId } from "@/components/v2/shell-context";

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords: string;
  Icon: typeof Search;
  run: () => void;
};

export function CommandPaletteV2() {
  const { paletteOpen, setPaletteOpen, goTo, focusProject, openReader, setAssistantOpen, askAssistant } = useShell();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo<Item[]>(() => {
    const close = () => setPaletteOpen(false);
    const nav = (s: SectionId, label: string, Icon: typeof Search, hint?: string): Item => ({
      id: `nav-${s}`,
      group: "Navigate",
      label,
      hint,
      keywords: `${label} section go`,
      Icon,
      run: () => {
        close();
        goTo(s);
      },
    });
    return [
      nav("top", "Index / Home", Home, "g h"),
      nav("systems", "Systems catalog", Compass, "g s"),
      nav("research", "Research papers", BookOpen, "g r"),
      nav("approach", "Approach & trajectory", Compass, "g a"),
      nav("contact", "Contact", Mail, "g c"),
      ...projects.map<Item>((p) => ({
        id: `proj-${p.id}`,
        group: "Systems",
        label: p.title,
        hint: p.index,
        keywords: `${p.title} ${p.category} ${p.stack.join(" ")} project system`,
        Icon: Network,
        run: () => {
          close();
          focusProject(p.id);
        },
      })),
      ...papers.map<Item>((pp) => ({
        id: `paper-${pp.id}`,
        group: "Papers",
        label: pp.isExternal ? `View: ${pp.title}` : `Read: ${pp.title}`,
        hint: pp.isExternal ? "github" : "reader",
        keywords: `${pp.title} ${pp.tags.join(" ")} paper pdf read preprint`,
        Icon: FileText,
        run: () => {
          close();
          if (pp.isExternal) {
            window.open(pp.href, "_blank", "noopener,noreferrer");
          } else {
            openReader(pp.href);
          }
        },
      })),
      {
        id: "switch-ui-v1",
        group: "Preferences",
        label: "Switch to Precision UI (v1)",
        hint: "ui",
        keywords: "switch ui variant version 1 classic precision",
        Icon: Layers,
        run: () => {
          close();
          try {
            localStorage.setItem("adil-ui-variant", "v1");
            window.dispatchEvent(new CustomEvent("switch-ui-variant", { detail: { variant: "v1" } }));
          } catch {}
        },
      },
      {
        id: "cv",
        group: "Actions",
        label: "Download CV",
        hint: "pdf",
        keywords: "cv resume download pdf",
        Icon: Download,
        run: () => {
          close();
          window.open(profile.cv, "_blank", "noopener");
        },
      },
      {
        id: "assistant",
        group: "Actions",
        label: "Open knowledge assistant",
        hint: "/",
        keywords: "assistant chat ask ai agent question",
        Icon: MessageSquareText,
        run: () => {
          close();
          setAssistantOpen(true);
        },
      },
      {
        id: "email",
        group: "Actions",
        label: `Email ${profile.email}`,
        keywords: "email mail contact",
        Icon: Mail,
        run: () => {
          close();
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "github",
        group: "Links",
        label: "GitHub profile",
        keywords: "github code repos",
        Icon: GitBranch,
        run: () => {
          close();
          window.open(profile.github, "_blank", "noopener");
        },
      },
      {
        id: "linkedin",
        group: "Links",
        label: "LinkedIn profile",
        keywords: "linkedin network",
        Icon: Link2,
        run: () => {
          close();
          window.open(profile.linkedin, "_blank", "noopener");
        },
      },
    ];
  }, [setPaletteOpen, goTo, focusProject, openReader, setAssistantOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    const tokens = q.split(/\s+/);
    return items
      .map((it) => {
        const hay = `${it.label} ${it.keywords} ${it.group}`.toLowerCase();
        const score = tokens.reduce((acc, t) => acc + (hay.includes(t) ? (it.label.toLowerCase().includes(t) ? 3 : 1) : -5), 0);
        return { it, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.it);
  }, [items, query]);

  const askItem: Item | null =
    query.trim().length > 3 && (filtered.length === 0 || /\?$/.test(query.trim()))
      ? {
          id: "ask",
          group: "Assistant",
          label: `Ask assistant: “${query.trim()}”`,
          keywords: "",
          Icon: MessageSquareText,
          run: () => {
            setPaletteOpen(false);
            askAssistant(query.trim());
          },
        }
      : null;

  const visible = askItem ? [askItem, ...filtered] : filtered;

  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [paletteOpen]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${cursor}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(visible.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      visible[cursor]?.run();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {paletteOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/70 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setPaletteOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-line-2 bg-ink-2 shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 text-mute" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKey}
                placeholder="Jump to a system, open a paper, or ask a question…"
                className="h-13 w-full bg-transparent py-4 text-[14px] text-paper outline-none placeholder:text-mute"
              />
              <span className="kbd">esc</span>
            </div>
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {visible.length === 0 ? (
                <div className="mono px-3 py-8 text-center text-[12px] text-mute">No matches. Try a system name or a question.</div>
              ) : null}
              {visible.map((it, idx) => {
                const showGroup = it.group !== lastGroup;
                lastGroup = it.group;
                const active = idx === cursor;
                return (
                  <div key={it.id}>
                    {showGroup ? <div className="mono px-3 pb-1 pt-3 text-[9.5px] tracking-[0.2em] text-mute">{it.group.toUpperCase()}</div> : null}
                    <button
                      data-idx={idx}
                      onMouseEnter={() => setCursor(idx)}
                      onClick={it.run}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13.5px] transition-colors ${
                        active ? "bg-ink-4 text-paper" : "text-paper-2"
                      }`}
                    >
                      <it.Icon className={`h-4 w-4 ${active ? "text-signal" : "text-mute"}`} />
                      <span className="flex-1 truncate">{it.label}</span>
                      {it.hint ? <span className="kbd">{it.hint}</span> : null}
                      {active ? <CornerDownLeft className="h-3.5 w-3.5 text-mute" /> : null}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mono flex items-center justify-between border-t border-line px-4 py-2 text-[10px] text-mute">
              <span>
                <span className="kbd">↑</span> <span className="kbd">↓</span> navigate · <span className="kbd">↵</span> run
              </span>
              <span>
                <span className="kbd">1</span>–<span className="kbd">5</span> systems · <span className="kbd">/</span> assistant
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
