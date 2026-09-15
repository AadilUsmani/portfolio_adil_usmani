"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, GitBranch, Layers } from "lucide-react";
import { productionSystems } from "@/lib/systems";
import { useShell } from "@/components/v2/shell-context";
import { SectionHeader, Corner } from "@/components/v2/ui";

export function SystemsV2_1() {
  const { activeProjectId } = useShell();
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const skipInitial = useRef(true);

  // Number shortcuts and palette entries call focusProject(); make that visible here rather
  // than silently doing nothing (audit 3.2).
  useEffect(() => {
    if (skipInitial.current) {
      skipInitial.current = false;
      return;
    }
    setHighlighted(activeProjectId);
    document.getElementById(`system-${activeProjectId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeProjectId]);

  return (
    <section id="systems" className="relative scroll-mt-20 border-t border-line px-5 py-20 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="01"
          label="Systems Catalog · High Signal"
          title={
            <>
              Production systems built where <span className="text-signal">correctness</span> is non-negotiable.
            </>
          }
          blurb="Concise 1–2 line summaries. Click any system to open its dedicated page with the complete architectural challenge, GitHub repository, deployed demo, and interactive live topology."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
          {productionSystems.map((p, i) => (
            <motion.div
              key={p.id}
              id={`system-${p.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className={`group relative flex flex-col justify-between h-full rounded-xl border bg-ink-2 p-6 transition-all hover:border-signal/50 hover:bg-ink-3/40 cursor-pointer ${
                  highlighted === p.id ? "border-signal ring-1 ring-signal/50" : "border-line"
                }`}
              >
                <Corner />
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="mono text-[10px] tracking-[0.2em] font-semibold" style={{ color: p.accent }}>
                      SYS-{String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="mono text-[9px] text-mute uppercase px-2 py-0.5 rounded bg-ink-3 border border-line truncate max-w-[140px]">
                      {p.category.split("/")[0].trim()}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-paper leading-snug group-hover:text-signal transition-colors">
                    {p.title}
                  </h3>

                  {/* Concise 1-2 line description */}
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-paper-2 line-clamp-2">
                    {p.tagline}
                  </p>

                  {/* High-signal metric chips */}
                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-line/60 pt-3">
                    {p.outcomes.slice(0, 2).map((o) => (
                      <div key={o.label} className="mono text-[10px]">
                        <div className="text-mute truncate">{o.label}</div>
                        <div className="text-paper font-semibold tabular-nums mt-0.5" style={{ color: p.accent }}>
                          {o.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stack preview */}
                  <div className="mt-3.5 flex flex-wrap gap-1">
                    {p.stack.slice(0, 3).map((s) => (
                      <span key={s} className="mono text-[9.5px] bg-ink-4 px-2 py-0.5 rounded text-paper-2 border border-line/60">
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 3 && (
                      <span className="mono text-[9.5px] text-mute px-1 py-0.5">
                        +{p.stack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-3 text-xs font-semibold text-signal">
                  <span className="mono text-[11px] group-hover:translate-x-0.5 transition-transform flex items-center gap-1.5">
                    Inspect Architecture &amp; Graph
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
