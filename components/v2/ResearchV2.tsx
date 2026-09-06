"use client";

import { motion } from "framer-motion";
import { BookOpen, Download, ExternalLink, Network, FileCode2 } from "lucide-react";
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
              Published &amp; <span className="text-teal">co-authored research</span>, plus working paper.
            </>
          }
          blurb="Two formal research papers with in-browser PDF readers (Blocked EEG decoding confound recovery & FinTech deterministic fusion) plus Anarchist LLM working paper."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {papers.map((paper, i) => {
            const project = projects.find((p) => p.id === paper.projectId);
            const accent =
              paper.id === "paper-eeg-confound"
                ? "#a78bfa"
                : paper.id === "paper-anarchist"
                ? "#38bdf8"
                : "#2dd4bf";

            const paperCategory =
              paper.id === "paper-eeg-confound"
                ? "CO-AUTHORED PAPER · CS.NEURO · 2026"
                : paper.isExternal
                ? "WORKING PAPER · CS.AI · 2026"
                : "PUBLISHED PAPER · CS.DC · 2025";

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
                {/* Paper sheet preview card */}
                {paper.isExternal ? (
                  <a
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block overflow-hidden border-b border-line bg-ink-3 px-6 pt-6 text-left cursor-pointer"
                    aria-label={`View ${paper.title} repository`}
                  >
                    <div className="relative mx-auto aspect-[1.6/1] w-full max-w-md translate-y-3 rounded-t-md border border-line-2 border-b-0 bg-[#f3efe6] p-5 text-ink shadow-[0_-20px_60px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:-translate-y-0">
                      <div className="mono text-[8px] tracking-[0.2em] text-ink/60">
                        {paperCategory}
                      </div>
                      <div className="mt-2 text-[12px] font-semibold leading-tight text-ink">{paper.title}</div>
                      <div className="mt-1 text-[9px] italic text-ink/70">{paper.authors || "Muhammad Adil Usmani"}</div>
                      <div className="mt-3 space-y-1">
                        {[98, 92, 95, 84, 90, 65].map((w, k) => (
                          <div key={k} className="h-[3px] rounded bg-ink/15" style={{ width: `${w}%` }} />
                        ))}
                      </div>
                      <div className="absolute bottom-3 right-4 mono text-[8px] text-ink/40">pre-print</div>
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-3 to-transparent" />
                    <span
                      className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] mono tracking-wider"
                      style={{ borderColor: `${accent}66`, color: accent, background: `${accent}14` }}
                    >
                      <FileCode2 className="h-3 w-3" /> GITHUB REPO
                    </span>
                  </a>
                ) : (
                  <button
                    onClick={() => openReader(paper.href)}
                    className="relative block overflow-hidden border-b border-line bg-ink-3 px-6 pt-6 text-left cursor-pointer w-full"
                    aria-label={`Open ${paper.title}`}
                  >
                    <div className="relative mx-auto aspect-[1.6/1] w-full max-w-md translate-y-3 rounded-t-md border border-line-2 border-b-0 bg-[#f3efe6] p-5 text-ink shadow-[0_-20px_60px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:-translate-y-0">
                      <div className="mono text-[8px] tracking-[0.2em] text-ink/60">
                        {paperCategory}
                      </div>
                      <div className="mt-2 text-[12px] font-semibold leading-tight text-ink">{paper.title}</div>
                      <div className="mt-1 text-[9px] italic text-ink/70">{paper.authors || "Muhammad Adil Usmani"}</div>
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
                      style={{ borderColor: `${accent}66`, color: accent, background: `${accent}14` }}
                    >
                      <BookOpen className="h-3 w-3" /> OPEN READER
                    </span>
                  </button>
                )}

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="mono text-[10px] tracking-[0.2em] text-mute">
                      {paper.id === "paper-eeg-confound"
                        ? "CO-AUTHORED PAPER"
                        : paper.isExternal
                        ? "WORKING PAPER"
                        : "PUBLISHED PAPER"}
                    </div>
                    <span
                      className="mono rounded px-2 py-0.5 text-[9.5px] font-semibold truncate max-w-[170px]"
                      style={{ color: accent, background: `${accent}18` }}
                    >
                      {paper.status}
                    </span>
                  </div>

                  <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-paper">{paper.title}</h3>
                  <p className="mt-1 text-[11.5px] font-mono text-teal/90">{paper.authors}</p>
                  <p className="mt-1 text-[12.5px] text-paper-2 line-clamp-2">{paper.subtitle}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-paper-2/90">{paper.abstract}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {paper.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                    {paper.isExternal ? (
                      <>
                        <a
                          href={paper.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium text-ink transition-opacity hover:opacity-90"
                          style={{ background: accent }}
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> View Repo
                        </a>
                        <span className="mono inline-flex items-center gap-1 rounded-md border border-line-2 px-2.5 py-1.5 text-[10.5px] text-mute">
                          Preprint in Prep
                        </span>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => openReader(paper.href)}
                          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium text-ink transition-opacity hover:opacity-90 cursor-pointer"
                          style={{ background: accent }}
                        >
                          <BookOpen className="h-3.5 w-3.5" /> Read
                        </button>
                        <a
                          href={paper.href}
                          download
                          className="inline-flex items-center gap-1.5 rounded-md border border-line-2 px-2.5 py-1.5 text-[12px] text-paper-2 hover:text-paper"
                        >
                          <Download className="h-3.5 w-3.5" /> PDF
                        </a>
                        {"repoUrl" in paper && paper.repoUrl ? (
                          <a
                            href={paper.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border border-line-2 px-2.5 py-1.5 text-[12px] text-paper-2 hover:text-paper"
                          >
                            <ExternalLink className="h-3.5 w-3.5" /> Repo
                          </a>
                        ) : null}
                      </>
                    )}

                    {project ? (
                      <button
                        onClick={() => focusProject(project.id)}
                        className="ml-auto inline-flex items-center gap-1 text-[11px] text-mute hover:text-paper cursor-pointer"
                      >
                        <Network className="h-3.5 w-3.5" /> Sys {project.index}
                      </button>
                    ) : null}
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
