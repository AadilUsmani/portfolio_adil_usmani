"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FileText, GitBranch, Play, Database, MessageSquareText, ChevronDown, ChevronUp, Cpu } from "lucide-react";
import { projects } from "@/lib/dataV2";
import { useShell } from "@/components/v2/shell-context";
import { SectionHeader, Tag, Corner } from "@/components/v2/ui";
import { ArchitectureVisualizerV2 } from "@/components/v2/ArchitectureVisualizerV2";

const artifactIcon = {
  paper: FileText,
  repo: GitBranch,
  demo: Play,
  dataset: Database,
};

export function SystemsV2_1() {
  const { activeProjectId, setActiveProjectId, openReader, askAssistant } = useShell();
  const project = projects.find((p) => p.id === activeProjectId) ?? projects[0];
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);

  return (
    <section id="systems" className="relative scroll-mt-20 px-5 py-24 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="01"
          label="Systems catalog · Progressive Disclosure"
          title={
            <>
              Five systems, each built where <span className="text-signal">correctness</span> was non-negotiable.
            </>
          }
          blurb="Executive summaries and impact metrics shown upfront. Expand technical deep dive for mathematical proofs, challenge breakdowns, and live topologies."
        />

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Systems index */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="relative overflow-hidden rounded-xl border border-line bg-ink-2">
              <Corner />
              <div className="mono flex items-center justify-between border-b border-line px-4 py-2.5 text-[10px] tracking-[0.2em] text-mute">
                <span>~/systems</span>
                <span>{projects.length} engines</span>
              </div>
              <ul className="-mx-0 flex gap-2 overflow-x-auto p-2 lg:block lg:space-y-1 lg:overflow-visible">
                {projects.map((p) => {
                  const active = p.id === project.id;
                  return (
                    <li key={p.id} className="min-w-[220px] flex-1 lg:min-w-0">
                      <button
                        onClick={() => {
                          setActiveProjectId(p.id);
                          setIsDeepDiveOpen(false); // Reset to clean scannable view on switch
                        }}
                        className={`group relative flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors cursor-pointer ${
                          active ? "bg-ink-3" : "hover:bg-ink-3/60"
                        }`}
                      >
                        <span className="mono mt-0.5 text-[11px]" style={{ color: active ? p.accent : "var(--color-mute)" }}>
                          {p.index}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block text-[13.5px] font-medium leading-snug ${active ? "text-paper" : "text-paper-2 group-hover:text-paper"}`}>
                            {p.shortTitle}
                          </span>
                          <span className="mono mt-1 block truncate text-[10px] tracking-wide text-mute">{p.category.split("/")[0].trim()}</span>
                        </span>
                        {active ? (
                          <motion.span layoutId="sys-active-v21" className="absolute inset-y-2 left-0 w-[2px] rounded" style={{ background: p.accent }} />
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mono hidden border-t border-line px-4 py-2.5 text-[10px] text-mute lg:block">
                <span className="kbd">1</span> – <span className="kbd">5</span> jump · <span className="kbd">⌘K</span> search
              </div>
            </div>
          </div>

          {/* System detail with progressive disclosure */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Header & Executive Summary */}
                <header className="relative overflow-hidden rounded-xl border border-line bg-ink-2 p-6 sm:p-8">
                  <div
                    className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-[100px]"
                    style={{ background: `${project.accent}33` }}
                  />
                  <div className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] tracking-[0.2em]" style={{ color: project.accent }}>
                    <span>SYS-{project.index}</span>
                    <span className="text-mute">/</span>
                    <span className="text-mute">{project.category.toUpperCase()}</span>
                    <span className="text-mute">/</span>
                    <span className="text-paper-2">EXECUTIVE SUMMARY</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-paper sm:text-4xl">{project.title}</h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-paper-2">{project.tagline}</p>

                  {/* High-Impact Outcome Metrics */}
                  <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
                    {project.outcomes.map((o) => (
                      <div key={o.label} className="bg-ink-2 px-4 py-3 sm:py-4">
                        <div className="mono text-[9px] uppercase tracking-[0.16em] text-mute sm:text-[9.5px]">{o.label}</div>
                        <div className="mt-1 text-base font-semibold tabular-nums tracking-tight sm:text-2xl" style={{ color: project.accent }}>
                          {o.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stack Badges */}
                  <div className="mt-5 flex flex-wrap items-center gap-1.5">
                    <span className="mono text-[10px] text-mute uppercase mr-1">Stack:</span>
                    {project.stack.map((s) => (
                      <Tag key={s} color={project.accent}>
                        {s}
                      </Tag>
                    ))}
                  </div>

                  {/* Artifact Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line/60 pt-5">
                    {project.artifacts.map((a) => {
                      const Icon = artifactIcon[a.kind];
                      if (a.internal) {
                        return (
                          <button
                            key={a.href}
                            onClick={() => openReader(a.href)}
                            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs sm:text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 cursor-pointer"
                            style={{ background: project.accent }}
                          >
                            <Icon className="h-4 w-4" /> {a.label}
                          </button>
                        );
                      }
                      return (
                        <a
                          key={a.href}
                          href={a.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-md border border-line-2 px-3.5 py-2 text-xs sm:text-sm text-paper-2 transition-colors hover:border-paper/40 hover:text-paper"
                        >
                          <Icon className="h-3.5 w-3.5" /> {a.label} <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      );
                    })}
                    <button
                      onClick={() => askAssistant(`Explain the ${project.title} in detail.`)}
                      className="inline-flex items-center gap-2 rounded-md border border-teal/40 bg-teal/10 px-3.5 py-2 text-xs sm:text-sm text-teal transition-colors hover:bg-teal/20 cursor-pointer"
                    >
                      <MessageSquareText className="h-4 w-4" /> Ask Assistant
                    </button>
                  </div>
                </header>

                {/* Progressive Disclosure: Accordion for Deep Dive & Topology */}
                <div className="rounded-xl border border-line bg-ink-2/60 overflow-hidden">
                  <button
                    onClick={() => setIsDeepDiveOpen(!isDeepDiveOpen)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-ink-3/40 transition-colors text-left cursor-pointer"
                    aria-expanded={isDeepDiveOpen}
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-md border border-line-2 bg-ink-3">
                        <Cpu className="h-4 w-4 text-signal" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-paper flex items-center gap-2">
                          Technical Deep Dive &amp; Live Topology
                          <span className="mono text-[10px] text-mute px-1.5 py-0.5 rounded bg-ink-3 border border-line">
                            {isDeepDiveOpen ? "EXPANDED" : "CLICK TO EXPAND"}
                          </span>
                        </div>
                        <div className="mono text-[11px] text-paper-2/80">
                          {isDeepDiveOpen
                            ? "Complete problem formulation, architectural mechanics, and interactive visualizer."
                            : "Inspect the engineering challenge, architectural rationale, and interactive node graph."}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-paper-2">
                      <span className="mono text-[11px] hidden sm:inline">{isDeepDiveOpen ? "Collapse" : "Expand"}</span>
                      {isDeepDiveOpen ? <ChevronUp className="h-4 w-4 text-signal" /> : <ChevronDown className="h-4 w-4 text-signal" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isDeepDiveOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-line p-5 sm:p-6 space-y-6"
                      >
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="card-glow rounded-xl border border-line bg-ink-2 p-5">
                            <div className="mono text-[10px] tracking-[0.2em] text-rose font-bold">CHALLENGE &amp; ROOT CAUSE</div>
                            <p className="mt-3 text-[13.5px] leading-relaxed text-paper-2">{project.problem}</p>
                          </div>
                          <div className="card-glow rounded-xl border border-line bg-ink-2 p-5">
                            <div className="mono text-[10px] tracking-[0.2em] text-lime font-bold">ARCHITECTURAL SOLUTION</div>
                            <p className="mt-3 text-[13.5px] leading-relaxed text-paper-2">{project.solution}</p>
                          </div>
                        </div>

                        <div>
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="mono text-[10px] tracking-[0.2em] text-mute">ARCHITECTURE VISUALIZER</span>
                              <span className="h-px w-10 bg-line-2" />
                              <span className="mono text-[10px] tracking-wider" style={{ color: project.accent }}>
                                INTERACTIVE TOPOLOGY
                              </span>
                            </div>
                          </div>
                          <ArchitectureVisualizerV2 project={project} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
