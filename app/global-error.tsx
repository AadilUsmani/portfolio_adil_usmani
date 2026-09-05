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
    try {
      localStorage.removeItem("adil-ui-variant");
      sessionStorage.clear();
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
      <body className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-6 font-sans">
        <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl text-center space-y-6">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Application Shell Error Caught
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              A root rendering exception occurred. The system protected your browser session from freezing.
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Restart Clean Session
          </button>
        </div>
      </body>
    </html>
  );
}
