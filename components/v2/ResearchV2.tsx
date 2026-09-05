"use client";

import { motion } from "framer-motion";
import { BookOpen, Download, ExternalLink, Network } from "lucide-react";
import { papers, projects } from "@/lib/dataV2";
import { useShell } from "@/components/v2/shell-context";
import { SectionHeader, Tag, Corner } from "@/components/v2/ui";

export function ResearchV2() {
  const { openReader, focusProject } = useShell();

  return (
    <section id="research" className="relative scroll-mt-20 border-t border-line px-5 py-24 sm:px-8 lg:px-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="02"
          label="Research"
          title={
            <>
              Two papers, written because the <span className="text-teal">systems</span> demanded a proof.
            </>
          }
          blurb="Each paper documents an architecture that first ran in production. Open them in the in-browser reader or download the PDF."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {papers.map((paper, i) => {
            const project = projects.find((p) => p.id === paper.projectId)!;
            return (
              <motion.article
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-glow group relative flex flex-col overflow-hidden rounded-xl border border-line bg-ink-2"
              >
                <Corner />
                {/* paper sheet preview */}
                <button
                  onClick={() => openReader(paper.href)}
                  className="relative block overflow-hidden border-b border-line bg-ink-3 px-8 pt-8 text-left"
                  aria-label={`Open ${paper.title}`}
                >
                  <div className="relative mx-auto aspect-[1.6/1] w-full max-w-md translate-y-3 rounded-t-md border border-line-2 border-b-0 bg-[#f3efe6] p-6 text-ink shadow-[0_-20px_60px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:-translate-y-0">
                    <div className="mono text-[8px] tracking-[0.2em] text-ink/50">PREPRINT · {paper.projectId === "rag" ? "CS.IR" : "CS.DC"} · 2025</div>
                    <div className="mt-2 text-[13px] font-semibold leading-tight">{paper.title}</div>
                    <div className="mt-1 text-[9px] italic text-ink/70">Muhammad Adil Usmani — Lahore, Pakistan</div>
                    <div className="mt-3 space-y-1">
                      {[100, 96, 98, 88, 94, 70].map((w, k) => (
                        <div key={k} className="h-[3px] rounded bg-ink/15" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                    <div className="absolute bottom-3 right-4 mono text-[8px] text-ink/40">p. 1</div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-3 to-transparent" />
                  <span
                    className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] mono tracking-wider"
                    style={{ borderColor: `${project.accent}66`, color: project.accent, background: `${project.accent}14` }}
                  >
                    <BookOpen className="h-3 w-3" /> OPEN READER
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mono text-[10px] tracking-[0.2em] text-mute">PAPER {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-paper">{paper.title}</h3>
                  <p className="mt-1 text-[13px] text-paper-2">{paper.subtitle}</p>
                  <p className="mt-4 text-[14px] leading-relaxed text-paper-2">{paper.abstract}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {paper.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                    <button
                      onClick={() => openReader(paper.href)}
                      className="inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-[13px] font-medium text-ink"
                      style={{ background: project.accent }}
                    >
                      <BookOpen className="h-3.5 w-3.5" /> Read
                    </button>
                    <a
                      href={paper.href}
                      download
                      className="inline-flex items-center gap-2 rounded-md border border-line-2 px-3.5 py-2 text-[13px] text-paper-2 hover:text-paper"
                    >
                      <Download className="h-3.5 w-3.5" /> PDF
                    </a>
                    <a
                      href={paper.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-line-2 px-3.5 py-2 text-[13px] text-paper-2 hover:text-paper"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> New tab
                    </a>
                    <button
                      onClick={() => focusProject(project.id)}
                      className="ml-auto inline-flex items-center gap-1.5 text-[12px] text-mute hover:text-paper"
                    >
                      <Network className="h-3.5 w-3.5" /> View system {project.index}
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
