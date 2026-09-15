"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GLOBAL_SYSTEM_RECOVERY_TRIPPED]", error);
  }, [error]);

  const handleRestart = () => {
    // Remove only this app's keys - never wipe the whole origin's storage (audit 9.5).
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("adil-"))
        .forEach((k) => localStorage.removeItem(k));
    } catch {}
    try {
      reset();
    } catch {}
    if (typeof window !== "undefined") {
      window.location.replace("/");
    }
  };

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-ink p-6 text-paper">
        <div className="w-full max-w-md space-y-6 rounded-xl border border-line bg-ink-2 p-8 text-center shadow-2xl">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-signal/30 bg-signal/10 text-signal">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <div className="mono text-[11px] font-semibold uppercase tracking-widest text-signal">Shell fault caught</div>
            <h2 className="text-xl font-semibold tracking-tight text-paper">Restart available</h2>
            <p className="text-[13px] leading-relaxed text-paper-2">
              A root rendering error occurred. Your browser session was protected - restart below.
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-signal-solid px-5 py-2.5 text-xs font-semibold text-on-solid shadow-sm transition-opacity hover:opacity-90"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Restart clean session
          </button>
        </div>
      </body>
    </html>
  );
}