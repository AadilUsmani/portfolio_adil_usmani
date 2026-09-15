"use client";

import { useEffect, useState } from "react";
import { Layers } from "lucide-react";

export function VersionSwitcherTopRight() {
  const [variant, setVariant] = useState<"v1" | "v2" | "v2.1">("v2.1");
  // Developer-facing control: hidden in production builds unless explicitly requested
  // with ?dev=1 (audit 5.1). Read post-mount only, to avoid a hydration mismatch.
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || window.location.search.includes("dev=1")) {
      setDevMode(true);
    }
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("adil-ui-variant");
      if (saved === "v1" || saved === "v2" || saved === "v2.1") {
        setVariant(saved as "v1" | "v2" | "v2.1");
      }
    } catch {}
    const handleSwitch = (e: any) => {
      if (e?.detail?.variant) {
        setVariant(e.detail.variant);
      }
    };
    window.addEventListener("switch-ui-variant", handleSwitch);
    return () => window.removeEventListener("switch-ui-variant", handleSwitch);
  }, []);

  const handleSwitch = (next: "v1" | "v2" | "v2.1") => {
    setVariant(next);
    try {
      localStorage.setItem("adil-ui-variant", next);
      window.dispatchEvent(new CustomEvent("switch-ui-variant", { detail: { variant: next } }));
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        window.location.href = "/";
      }
    } catch {}
  };

  if (!devMode) return null;

  return (
    <div className="fixed top-2.5 right-2.5 sm:top-4 sm:right-4 z-50 flex items-center gap-1 rounded-lg border border-line-2 bg-ink-2/95 p-1 backdrop-blur-md shadow-xl text-paper">
      <div className="hidden sm:flex items-center gap-1.5 px-2 text-mute mono text-[9.5px] uppercase tracking-wider">
        <Layers className="h-3 w-3 text-signal" />
        <span>VERSION:</span>
      </div>
      <button
        onClick={() => handleSwitch("v2.1")}
        className={`mono inline-flex min-h-6 min-w-6 items-center justify-center rounded px-2 py-1 text-[10px] sm:text-[10.5px] font-semibold transition-all cursor-pointer ${
          variant === "v2.1"
            ? "bg-signal-solid text-on-solid font-bold shadow-sm"
            : "text-paper-2 hover:bg-ink-3 hover:text-paper"
        }`}
        title="v2.1 Focus (Streamlined Minimal Hub)"
      >
        <span className="sm:hidden">v2.1</span>
        <span className="hidden sm:inline">v2.1 Focus</span>
      </button>
      <button
        onClick={() => handleSwitch("v2")}
        className={`mono inline-flex min-h-6 min-w-6 items-center justify-center rounded px-2 py-1 text-[10px] sm:text-[10.5px] font-semibold transition-all cursor-pointer ${
          variant === "v2"
            ? "bg-signal-solid text-on-solid font-bold shadow-sm"
            : "text-paper-2 hover:bg-ink-3 hover:text-paper"
        }`}
        title="v2 Blueprint (Full Architecture Specs)"
      >
        <span className="sm:hidden">v2</span>
        <span className="hidden sm:inline">v2 Full</span>
      </button>
      <button
        onClick={() => handleSwitch("v1")}
        className={`mono inline-flex min-h-6 min-w-6 items-center justify-center rounded px-2 py-1 text-[10px] sm:text-[10.5px] font-semibold transition-all cursor-pointer ${
          variant === "v1"
            ? "bg-signal-solid text-on-solid font-bold shadow-sm"
            : "text-paper-2 hover:bg-ink-3 hover:text-paper"
        }`}
        title="v1 Classic (Precision Engineering)"
      >
        <span className="sm:hidden">v1</span>
        <span className="hidden sm:inline">v1 Classic</span>
      </button>
    </div>
  );
}
