"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { projects } from "@/lib/dataV2";

export type SectionId = "top" | "systems" | "research" | "approach" | "assistant" | "contact";

type ShellState = {
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  assistantOpen: boolean;
  setAssistantOpen: (v: boolean) => void;
  assistantSeed: string | null;
  askAssistant: (q: string) => void;
  readerHref: string | null;
  openReader: (href: string | null) => void;
  activeSection: SectionId;
  setActiveSection: (s: SectionId) => void;
  goTo: (section: SectionId) => void;
  focusProject: (id: string) => void;
};

const ShellContext = createContext<ShellState | null>(null);

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used within ShellProvider");
  return ctx;
}

export function ShellProvider({ children }: { children: ReactNode }) {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantSeed, setAssistantSeed] = useState<string | null>(null);
  const [readerHref, setReaderHref] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("top");

  const goTo = useCallback((section: SectionId) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const focusProject = useCallback(
    (id: string) => {
      setActiveProjectId(id);
      goTo("systems");
    },
    [goTo],
  );

  const askAssistant = useCallback((q: string) => {
    setAssistantSeed(`${q}\u0000${Date.now()}`);
    setAssistantOpen(true);
  }, []);

  // Cursor spotlight
  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (!e.key) return;
      const k = e.key.toLowerCase();

      if ((e.metaKey || e.ctrlKey) && k === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        if (readerHref) setReaderHref(null);
        else if (paletteOpen) setPaletteOpen(false);
        else if (assistantOpen) setAssistantOpen(false);
        return;
      }
      if (typing || paletteOpen) return;

      if (e.key === "/") {
        e.preventDefault();
        setAssistantOpen(true);
        return;
      }
      if (e.key >= "1" && e.key <= "5") {
        const p = projects[Number(e.key) - 1];
        if (p) focusProject(p.id);
        return;
      }
      if (k === "g") {
        const next = (ev: KeyboardEvent) => {
          window.removeEventListener("keydown", next);
          if (!ev.key) return;
          const map: Record<string, SectionId> = { h: "top", s: "systems", r: "research", a: "approach", c: "contact" };
          const s = map[ev.key.toLowerCase()];
          if (s) goTo(s);
        };
        window.addEventListener("keydown", next, { once: true });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, assistantOpen, readerHref, goTo, focusProject]);

  const value = useMemo<ShellState>(
    () => ({
      activeProjectId,
      setActiveProjectId,
      paletteOpen,
      setPaletteOpen,
      assistantOpen,
      setAssistantOpen,
      assistantSeed,
      askAssistant,
      readerHref,
      openReader: setReaderHref,
      activeSection,
      setActiveSection,
      goTo,
      focusProject,
    }),
    [activeProjectId, paletteOpen, assistantOpen, assistantSeed, askAssistant, readerHref, activeSection, goTo, focusProject],
  );

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}
