"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, X, FileText } from "lucide-react";
import { papers } from "@/lib/dataV2";
import { useShell } from "@/components/v2/shell-context";

export function PdfReaderV2() {
  const { readerHref, openReader } = useShell();
  const paper = papers.find((p) => p.href === readerHref);
  const title = paper?.title ?? (readerHref ? readerHref.replace(/^\//, "").replace(/_/g, " ").replace(/\.pdf$/, "") : "");

  return (
    <AnimatePresence>
      {readerHref ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => openReader(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-line-2 bg-ink-2 shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
            role="dialog"
            aria-label={`Reading ${title}`}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-signal/40 bg-signal/10 text-signal">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13.5px] font-semibold text-paper">{title}</div>
                <div className="mono truncate text-[10px] tracking-widest text-mute">{readerHref.toUpperCase()} · IN-BROWSER READER</div>
              </div>
              <a href={readerHref} download className="hidden items-center gap-1.5 rounded-md border border-line-2 px-3 py-1.5 text-[12px] text-paper-2 hover:text-paper sm:inline-flex">
                <Download className="h-3.5 w-3.5" /> Download
              </a>
              <a href={readerHref} target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 rounded-md border border-line-2 px-3 py-1.5 text-[12px] text-paper-2 hover:text-paper sm:inline-flex">
                <ExternalLink className="h-3.5 w-3.5" /> New tab
              </a>
              <button onClick={() => openReader(null)} className="rounded-md border border-line-2 p-1.5 text-mute hover:text-paper" aria-label="Close reader">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative flex-1 bg-[#26292f]">
              <object
                data={`${readerHref}#view=FitH&toolbar=1`}
                type="application/pdf"
                className="absolute inset-0 h-full w-full"
                title={title}
              >
                <iframe
                  title={title}
                  src={`${readerHref}#view=FitH&toolbar=1`}
                  className="h-full w-full border-0"
                >
                  <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center text-slate-300">
                    <p className="text-sm font-medium mb-3">Your browser does not support inline PDF viewing.</p>
                    <a
                      href={readerHref}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-ink"
                    >
                      Open PDF in New Tab
                    </a>
                  </div>
                </iframe>
              </object>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-3 sm:hidden">
                <a href={readerHref} target="_blank" rel="noreferrer" className="pointer-events-auto rounded-full border border-line-2 bg-ink-2 px-4 py-2 text-[12px] text-paper">
                  Open in new tab
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
