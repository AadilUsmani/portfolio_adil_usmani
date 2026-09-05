"use client";

import { useEffect, useState } from "react";
import { RotateCcw, AlertTriangle, Home, Bug, Copy, Check } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Log exception to server for automated telemetry
    try {
      fetch("/api/client-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: error?.name,
          message: error?.message,
          stack: error?.stack,
          digest: error?.digest,
          url: typeof window !== "undefined" ? window.location.href : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    } catch {}
    console.error("[PORTFOLIO_SYSTEM_RECOVERY_TRIPPED]", error);
  }, [error]);

  const copyError = () => {
    const text = `${error?.name || "Error"}: ${error?.message || "Unknown"}\nDigest: ${error?.digest || "none"}\nStack: ${error?.stack || "none"}`;
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleHardReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    if (typeof window !== "undefined") {
      window.location.replace("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 font-sans">
      <div className="max-w-lg w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl text-center space-y-5">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="space-y-1.5">
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
            Fault-Tolerant Circuit Tripped
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            System State Restored
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            An unexpected client exception was captured by the portfolio boundary.
          </p>
        </div>

        {/* Live Diagnostics Card */}
        <div className="p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-left font-mono text-[11px] text-red-700 dark:text-red-300 space-y-1.5 overflow-hidden">
          <div className="flex items-center justify-between pb-1 border-b border-red-200/60 dark:border-red-900/40">
            <span className="font-bold flex items-center gap-1.5 text-[10.5px]">
              <Bug className="w-3.5 h-3.5 text-red-500" />
              <span>{error?.name || "ClientException"}</span>
            </span>
            <button
              onClick={copyError}
              className="inline-flex items-center gap-1 text-[10px] text-red-600 dark:text-red-400 hover:underline cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy Diagnostic"}</span>
            </button>
          </div>
          <div className="font-semibold break-words leading-snug">
            {error?.message || "Render exception occurred during hydration or component mount."}
          </div>
          {error?.digest && (
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Digest: <span className="text-slate-700 dark:text-slate-300">{error.digest}</span>
            </div>
          )}
          {error?.stack && (
            <pre className="text-[9.5px] max-h-24 overflow-y-auto whitespace-pre-wrap text-slate-600 dark:text-slate-400 pt-1">
              {error.stack.split("\n").slice(0, 5).join("\n")}
            </pre>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Re-initialize View
          </button>
          <button
            onClick={handleHardReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <Home className="h-3.5 w-3.5" /> Clean Reset Session
          </button>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-3.5 text-[11px] text-slate-400">
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
