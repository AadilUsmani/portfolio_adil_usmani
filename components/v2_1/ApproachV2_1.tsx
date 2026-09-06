"use client";

import { motion } from "framer-motion";
import { experience, profile } from "@/lib/dataV2";
import { SectionHeader, Corner } from "@/components/v2/ui";

export function ApproachV2_1() {
  return (
    <section id="approach" className="relative scroll-mt-20 border-t border-line px-5 py-24 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="03"
          label="Approach & trajectory"
          title={
            <>
              Opinions earned in <span className="text-violet">production</span>, not borrowed from slides.
            </>
          }
          blurb="Three engineering principles distilled from real incidents and production outages."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {profile.principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-glow relative rounded-xl border border-line bg-ink-2 p-6"
            >
              <Corner />
              <div className="mono text-[28px] font-light leading-none text-outline">0{i + 1}</div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-paper">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-paper-2">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="section-label">Trajectory</div>
            <p className="mt-3 text-[15px] leading-relaxed text-paper-2">
              From applied deep learning and EEG signal decoding toward the infrastructure that makes models dependable:
              retrieval planes, multi-agent runtimes, and deterministic data systems.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {profile.stack.map((s) => (
                <span key={s} className="mono rounded border border-line-2 bg-ink-3 px-2 py-1 text-[10.5px] text-paper-2">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <ol className="relative space-y-6 border-l border-line pl-8">
            {experience.map((e, i) => (
              <motion.li
                key={e.title}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[37px] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-line-2 bg-ink">
                  <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-signal" : "bg-mute"}`} />
                </span>
                <div className="mono text-[10.5px] tracking-[0.2em] text-mute">{e.period.toUpperCase()}</div>
                <h4 className="mt-1 text-base font-semibold text-paper">
                  {e.title} <span className="text-paper-2 font-normal">· {e.org}</span>
                </h4>
                <ul className="mt-2 space-y-1">
                  {e.points.slice(0, 2).map((pt) => (
                    <li key={pt} className="flex gap-2 text-[13.5px] leading-relaxed text-paper-2">
                      <span className="mt-2 h-px w-3 shrink-0 bg-signal/70" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
