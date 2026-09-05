"use client";

import { useEffect } from "react";
import { RotateCcw, AlertTriangle, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception for telemetry without crashing the user session
    console.error("[PORTFOLIO_SYSTEM_RECOVERY_TRIPPED]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 font-sans">
      <div className="max-w-md w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-2xl text-center space-y-6">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
            Fault-Tolerant Circuit Tripped
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            System State Restored
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            An unexpected client exception was captured by the portfolio boundary. The session state has been isolated so your browser remains completely stable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Re-initialize View
          </button>
          <a
            href="/"
            onClick={() => {
              try {
                localStorage.removeItem("adil-ui-variant");
              } catch {}
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
          >
            <Home className="h-3.5 w-3.5" /> Return to Clean State
          </a>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 text-[11px] text-slate-400">
          Need immediate access? Reach Adil directly at{" "}
          <a
            href="mailto:muhammadaadilusmani@gmail.com"
            className="text-indigo-600 dark:text-cyan-400 hover:underline font-semibold"
          >
            muhammadaadilusmani@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
