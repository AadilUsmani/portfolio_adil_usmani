"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, Mail, Send, AlertTriangle, GitBranch, Link2, FileDown } from "lucide-react";
import { profile } from "@/lib/dataV2";
import { SectionHeader, Corner, Dot } from "@/components/v2/ui";

const channels = [
  { id: "hiring", label: "Hiring", desc: "Full-time or contract roles" },
  { id: "collaboration", label: "Collaboration", desc: "Build something together" },
  { id: "research", label: "Research", desc: "Papers, datasets, replication" },
  { id: "speaking", label: "Speaking", desc: "Talks & workshops" },
  { id: "general", label: "General", desc: "Anything else" },
];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactV2() {
  const [form, setForm] = useState({ name: "", email: "", message: "", channel: "hiring", honey: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [receipt, setReceipt] = useState<{ id: number; at: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const update = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      const next = { ...e };
      delete next[k];
      return next;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Enter a valid email.";
    if (form.message.trim().length < 10) e.message = "Give me at least a sentence or two.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || (!json.ok && !json.success)) {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "Please check the highlighted fields.");
        setStatus("error");
        return;
      }
      setReceipt({ id: json.id, at: json.receivedAt });
      setStatus("sent");
      setForm({ name: "", email: "", message: "", channel: "hiring", honey: "" });
    } catch {
      setServerError("Network error — please try again.");
      setStatus("error");
    }
  };

  const messageLen = form.message.length;

  return (
    <section id="contact" className="relative scroll-mt-20 border-t border-line px-5 py-24 sm:px-8 lg:px-14">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-signal/10 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          index="05"
          label="Contact channel"
          title={
            <>
              Open a channel. Messages land in a <span className="text-signal">durable queue</span>, not a void.
            </>
          }
          blurb="Every message is validated, rate-limited and persisted to PostgreSQL through /api/contact. You'll get a receipt id back."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <form onSubmit={submit} className="relative overflow-hidden rounded-xl border border-line bg-ink-2" noValidate>
            <Corner />
            <div className="mono flex items-center justify-between border-b border-line px-5 py-2.5 text-[10px] tracking-[0.2em] text-mute">
              <span className="flex items-center gap-2">
                <Dot color={status === "sent" ? "var(--color-lime)" : status === "error" ? "var(--color-rose)" : "var(--color-signal)"} />
                POST /api/contact
              </span>
              <span>{status.toUpperCase()}</span>
            </div>

            <div className="grid gap-5 p-5 sm:p-6">
              <div>
                <div className="mono mb-2 text-[10px] tracking-[0.2em] text-mute">CHANNEL</div>
                <div className="flex flex-wrap gap-2">
                  {channels.map((c) => {
                    const active = form.channel === c.id;
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => update("channel", c.id)}
                        className={`rounded-lg border px-3 py-2 text-left transition-colors ${
                          active ? "border-signal/60 bg-signal/10" : "border-line-2 bg-ink-3 hover:border-line-2/80 hover:bg-ink-4"
                        }`}
                      >
                        <div className={`text-[13px] font-medium ${active ? "text-signal-2" : "text-paper"}`}>{c.label}</div>
                        <div className="text-[11px] text-mute">{c.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="NAME" error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                    className={inputCls(!!errors.name)}
                  />
                </Field>
                <Field label="EMAIL" error={errors.email}>
                  <input
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="ada@analytical.engine"
                    type="email"
                    autoComplete="email"
                    className={inputCls(!!errors.email)}
                  />
                </Field>
              </div>

              <Field label="MESSAGE" error={errors.message} trailing={<span className="mono text-[10px] text-mute">{messageLen}/4000</span>}>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value.slice(0, 4000))}
                  placeholder="What are you building, and where does it need to be correct under pressure?"
                  rows={6}
                  className={`${inputCls(!!errors.message)} resize-y leading-relaxed`}
                />
              </Field>

              <input
                tabIndex={-1}
                autoComplete="off"
                value={form.honey}
                onChange={(e) => update("honey", e.target.value)}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden
                name="website"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <div className="mono text-[10.5px] text-mute">
                  Replies typically within 24h · {profile.timezone}
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {status === "sending" ? "Transmitting" : "Send message"}
                </button>
              </div>

              <AnimatePresence>
                {status === "sent" && receipt ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-3 rounded-lg border border-lime/40 bg-lime/10 px-4 py-3"
                  >
                    <Check className="mt-0.5 h-4 w-4 text-lime" />
                    <div>
                      <div className="text-[13.5px] font-medium text-lime">Message persisted.</div>
                      <div className="mono mt-0.5 text-[11px] text-paper-2">
                        receipt #{String(receipt.id).padStart(4, "0")} · {new Date(receipt.at).toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
                {status === "error" && serverError ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-3 rounded-lg border border-rose/40 bg-rose/10 px-4 py-3"
                  >
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-rose" />
                    <div className="text-[13.5px] text-rose">{serverError}</div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </form>

          <aside className="space-y-4">
            <div className="rounded-xl border border-line bg-ink-2 p-5">
              <div className="mono text-[10px] tracking-[0.2em] text-mute">DIRECT</div>
              <a href={`mailto:${profile.email}`} className="mt-3 flex items-center justify-between rounded-lg border border-line-2 bg-ink-3 px-4 py-3 text-[13.5px] text-paper transition-colors hover:border-signal/50">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-signal" /> {profile.email}
                </span>
                <ArrowUpRight className="h-4 w-4 text-mute" />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-between rounded-lg border border-line-2 bg-ink-3 px-4 py-3 text-[13.5px] text-paper transition-colors hover:border-signal/50">
                <span className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-signal" /> GitHub
                </span>
                <ArrowUpRight className="h-4 w-4 text-mute" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-between rounded-lg border border-line-2 bg-ink-3 px-4 py-3 text-[13.5px] text-paper transition-colors hover:border-signal/50">
                <span className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-signal" /> LinkedIn
                </span>
                <ArrowUpRight className="h-4 w-4 text-mute" />
              </a>
              <a href={profile.cv} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-between rounded-lg border border-signal/40 bg-signal/10 px-4 py-3 text-[13.5px] text-signal-2 transition-colors hover:bg-signal/20">
                <span className="flex items-center gap-2">
                  <FileDown className="h-4 w-4" /> Muhammad_Adil_Usmani_cv.pdf
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="rounded-xl border border-line bg-ink-2 p-5">
              <div className="mono text-[10px] tracking-[0.2em] text-mute">CURRENTLY</div>
              <ul className="mt-3 space-y-2 text-[13.5px] text-paper-2">
                <li className="flex gap-2"><span className="text-signal">→</span> Open to backend / AI-infrastructure roles, remote or Lahore.</li>
                <li className="flex gap-2"><span className="text-signal">→</span> Consulting on RAG retrieval quality and agent reliability.</li>
                <li className="flex gap-2"><span className="text-signal">→</span> Reading: consensus under Byzantine faults, TCN scaling laws.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function inputCls(err: boolean) {
  return `w-full rounded-md border bg-ink-3 px-3.5 py-2.5 text-[14px] text-paper outline-none placeholder:text-mute transition-colors ${
    err ? "border-rose/60 focus:border-rose" : "border-line-2 focus:border-signal/60"
  }`;
}

function Field({ label, error, trailing, children }: { label: string; error?: string; trailing?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <span className="mono text-[10px] tracking-[0.2em] text-mute">{label}</span>
        {trailing}
      </div>
      {children}
      {error ? <div className="mono mt-1.5 text-[11px] text-rose">{error}</div> : null}
    </label>
  );
}
