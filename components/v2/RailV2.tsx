"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Command, MessageSquareText, FileDown, Layers } from "lucide-react";
import { useShell, type SectionId } from "@/components/v2/shell-context";
import { profile } from "@/lib/dataV2";
import { Dot } from "@/components/v2/ui";

const sections: { id: SectionId; label: string; key: string }[] = [
  { id: "top", label: "Index", key: "g h" },
  { id: "systems", label: "Systems", key: "g s" },
  { id: "research", label: "Research", key: "g r" },
  { id: "approach", label: "Approach", key: "g a" },
  { id: "assistant", label: "Assistant", key: "/" },
  { id: "contact", label: "Contact", key: "g c" },
];

function useLahoreClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function RailV2() {
  const { activeSection, setActiveSection, goTo, setPaletteOpen, setAssistantOpen } = useShell();
  const time = useLahoreClock();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[232px] flex-col justify-between border-r border-line bg-ink/80 px-6 py-7 backdrop-blur-md lg:flex">
        <div>
          <button onClick={() => goTo("top")} className="group flex items-center gap-3 text-left">
            <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-line-2 bg-ink-3">
              <span className="mono text-[13px] font-semibold text-signal">AU</span>
              <span className="absolute -right-1 -top-1">
                <Dot />
              </span>
            </span>
            <span>
              <span className="block text-[13px] font-semibold leading-none text-paper">Adil Usmani</span>
              <span className="mono mt-1 block text-[10px] tracking-widest text-mute">SYS · ENGINEER</span>
            </span>
          </button>

          <nav className="mt-12 space-y-1">
            {sections.map((s, i) => {
              const active = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => goTo(s.id)}
                  className="group relative flex w-full items-center justify-between rounded-md px-2 py-2 text-left transition-colors hover:bg-ink-3"
                >
                  <span className="flex items-center gap-3">
                    <span className={`mono text-[10px] ${active ? "text-signal" : "text-mute"}`}>0{i + 1}</span>
                    <span className={`text-[13px] ${active ? "text-paper" : "text-paper-2 group-hover:text-paper"}`}>{s.label}</span>
                  </span>
                  <span className="mono text-[10px] text-mute opacity-0 transition-opacity group-hover:opacity-100">{s.key}</span>
                  {active ? (
                    <motion.span layoutId="rail-active" className="absolute -left-6 top-1/2 h-4 w-[2px] -translate-y-1/2 bg-signal" />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex items-center justify-center gap-2 rounded-md border border-line-2 bg-ink-3 px-2 py-2 text-[12px] text-paper-2 transition-colors hover:border-signal/50 hover:text-paper"
            >
              <Command className="h-3.5 w-3.5" /> <span className="kbd">⌘K</span>
            </button>
            <button
              onClick={() => setAssistantOpen(true)}
              className="flex items-center justify-center gap-2 rounded-md border border-line-2 bg-ink-3 px-2 py-2 text-[12px] text-paper-2 transition-colors hover:border-teal/50 hover:text-paper"
            >
              <MessageSquareText className="h-3.5 w-3.5" /> <span className="kbd">/</span>
            </button>
          </div>
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-md border border-signal/40 bg-signal/10 px-3 py-2 text-[12px] text-signal-2 transition-colors hover:bg-signal/20"
          >
            <span className="flex items-center gap-2">
              <FileDown className="h-3.5 w-3.5" /> Download CV
            </span>
            <span className="mono text-[10px]">PDF</span>
          </a>
          <button
            onClick={() => {
              try {
                localStorage.setItem("adil-ui-variant", "v1");
                window.dispatchEvent(new CustomEvent("switch-ui-variant", { detail: { variant: "v1" } }));
              } catch {}
            }}
            className="mt-2 flex w-full items-center justify-between rounded-md border border-line-2 bg-ink-3 px-3 py-2 text-[12px] text-paper-2 hover:text-paper hover:border-signal/50 transition-colors cursor-pointer"
            title="Switch to Precision Engineering UI (v1)"
          >
            <span className="flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-signal" /> Precision UI (v1)
            </span>
            <span className="mono text-[10px] text-signal font-semibold">SWITCH</span>
          </button>
          <div className="border-t border-line pt-4">
            <div className="flex items-center justify-between">
              <span className="mono text-[10px] tracking-widest text-mute">LHE · PKT</span>
              <span className="mono text-[12px] tabular-nums text-paper-2">{time || "--:--:--"}</span>
            </div>
            <div className="mt-3 h-[2px] w-full overflow-hidden rounded bg-ink-4">
              <div className="h-full bg-gradient-to-r from-signal to-teal" style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="mono text-[10px] text-mute">scroll</span>
              <span className="mono text-[10px] tabular-nums text-mute">{Math.round(progress * 100)}%</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-line bg-ink/85 px-4 py-3 backdrop-blur-md lg:hidden">
        <button onClick={() => goTo("top")} className="flex items-center gap-2">
          <span className="mono grid h-8 w-8 place-items-center rounded-md border border-line-2 bg-ink-3 text-[12px] font-semibold text-signal">
            AU
          </span>
          <span className="text-[13px] font-semibold">Adil Usmani</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              try {
                localStorage.setItem("adil-ui-variant", "v1");
                window.dispatchEvent(new CustomEvent("switch-ui-variant", { detail: { variant: "v1" } }));
              } catch {}
            }}
            aria-label="Switch to v1 Precision UI"
            title="Switch to v1 Precision UI"
            className="h-8 px-2.5 flex items-center gap-1.5 rounded-md border border-line-2 bg-ink-3 text-[11px] font-mono font-semibold text-signal hover:border-signal/50 cursor-pointer"
          >
            <Layers className="h-3 w-3" />
            <span>v1 UI</span>
          </button>
          <button
            onClick={() => setAssistantOpen(true)}
            aria-label="Open assistant"
            className="grid h-8 w-8 place-items-center rounded-md border border-line-2 bg-ink-3 text-paper-2"
          >
            <MessageSquareText className="h-4 w-4" />
          </button>
          <button
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            className="grid h-8 w-8 place-items-center rounded-md border border-line-2 bg-ink-3 text-paper-2"
          >
            <Command className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-ink-4">
          <div className="h-full bg-gradient-to-r from-signal to-teal" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      </header>
    </>
  );
}
