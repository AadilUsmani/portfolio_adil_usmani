"use client";

import { useEffect, useState } from "react";
import { RotateCcw, AlertTriangle, Home, Bug, Copy, Check } from "lucide-react";
import { Corner } from "@/components/v2/ui";

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
    // Remove only this app's keys - never wipe the whole origin's storage (audit 9.5).
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("adil-"))
        .forEach((k) => localStorage.removeItem(k));
      Object.keys(sessionStorage)
        .filter((k) => k.startsWith("adil-"))
        .forEach((k) => sessionStorage.removeItem(k));
    } catch {}
    if (typeof window !== "undefined") {
      window.location.replace("/");
    }
  };

  return (
    <div className="blueprint flex min-h-screen items-center justify-center p-4 text-paper sm:p-6">
      <div className="relative w-full max-w-lg space-y-5 rounded-xl border border-line bg-ink-2 p-6 text-center shadow-2xl sm:p-8">
        <Corner />
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-signal/30 bg-signal/10 text-signal">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="space-y-1.5">
          <div className="mono text-[11px] font-semibold uppercase tracking-widest text-signal">System fault caught</div>
          <h2 className="text-xl font-semibold tracking-tight text-paper">Recovery ready</h2>
          <p className="text-[13px] leading-relaxed text-paper-2">
            The page hit an unexpected error. Nothing was lost - retry immediately, or reset this site&apos;s saved preferences.
          </p>
        </div>

        <div className="mono space-y-1.5 overflow-hidden rounded-xl border border-rose/40 bg-rose/10 p-3.5 text-left text-[11px] text-paper-2">
          <div className="flex items-center justify-between border-b border-rose/30 pb-1">
            <span className="flex items-center gap-1.5 text-[10.5px] font-bold">
              <Bug className="h-3.5 w-3.5 text-rose" />
              <span>{error?.name || "ClientException"}</span>
            </span>
            <button
              onClick={copyError}
              className="inline-flex cursor-pointer items-center gap-1 text-[10px] text-rose hover:underline"
            >
              {copied ? <Check className="h-3 w-3 text-lime" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy Diagnostic"}</span>
            </button>
          </div>
          <div className="break-words font-semibold leading-snug">
            {error?.message || "Render exception occurred during hydration or component mount."}
          </div>
          {error?.digest && (
            <div className="text-[10px] text-mute">
              Digest: <span className="text-paper-2">{error.digest}</span>
            </div>
          )}
          {error?.stack && (
            <pre className="max-h-24 overflow-y-auto whitespace-pre-wrap pt-1 text-[9.5px] text-paper-2">
              {error.stack.split("\n").slice(0, 5).join("\n")}
            </pre>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-3 pt-1 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-signal-solid px-5 py-2.5 text-xs font-semibold text-on-solid shadow-sm transition-opacity hover:opacity-90 sm:w-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Try again
          </button>
          <button
            onClick={handleHardReset}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-line-2 px-5 py-2.5 text-xs font-semibold text-paper-2 transition-colors hover:bg-ink-3 hover:text-paper sm:w-auto"
          >
            <Home className="h-3.5 w-3.5 text-signal" /> Reset site preferences
          </button>
        </div>

        <div className="border-t border-line pt-3.5 text-[11px] text-mute">
          Need immediate access? Reach Adil directly at{" "}
          <a
            href="mailto:muhammadaadilusmani@gmail.com"
            className="font-semibold text-signal underline hover:no-underline"
          >
            muhammadaadilusmani@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}