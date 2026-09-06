"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Layers, Check, Sun, Moon, Sparkles, X, ChevronRight, Compass } from "lucide-react";

interface UiSwitcherProps {
  currentVariant: "v1" | "v2" | "v2.1";
  onSelectVariant: (v: "v1" | "v2" | "v2.1") => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function UiSwitcher({
  currentVariant,
  onSelectVariant,
  isDarkMode,
  onToggleTheme,
}: UiSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating UI Switcher Dock Pill (Bottom-left across both views to guarantee 0 collision with chatbot or assistant drawer) */}
      <div className="fixed bottom-5 left-4 sm:left-6 z-[70] flex items-center gap-2 transition-all duration-300">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 rounded-full border border-slate-300/80 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 px-4 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)] backdrop-blur-md transition-all hover:border-indigo-500/80 dark:hover:border-indigo-400 cursor-pointer"
          title="Switch Portfolio UI Version"
          aria-label="Various UIs Switcher"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
          </span>

          <span className="flex items-center gap-1.5 text-xs font-bold tracking-tight text-slate-800 dark:text-slate-100">
            <Layers className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Various UIs</span>
          </span>

          <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {currentVariant === "v2.1"
              ? "v2.1 Focus"
              : currentVariant === "v2"
              ? "v2 Blueprint"
              : "v1 Precision"}
          </span>
        </motion.button>
      </div>

      {/* Switcher Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-label="Select Interface Design"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <LayoutGrid className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Interface Versions
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Choose your preferred layout & cognitive density
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Options List */}
              <div className="mt-4 space-y-3">
                {/* Option 1: v2.1 Zenith Focus (Recommended / Low Cognitive Load) */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectVariant("v2.1");
                    setIsOpen(false);
                  }}
                  className={`group relative flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition-all ${
                    currentVariant === "v2.1"
                      ? "border-emerald-500 bg-emerald-50/40 dark:border-emerald-500/80 dark:bg-emerald-500/10 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div
                    className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                      currentVariant === "v2.1"
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-300 dark:border-slate-700 text-transparent"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Zenith Focus (v2.1)
                      </span>
                      <span className="rounded bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 text-[10px] font-mono font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/40">
                        Low Cognitive Load
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Executive summaries first. Low cognitive load, scannable impact stats, expandable technical proofs, and in-browser PDF readers for both papers.
                    </p>
                  </div>
                </button>

                {/* Option 2: v2 Cyber Blueprint */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectVariant("v2");
                    setIsOpen(false);
                  }}
                  className={`group relative flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition-all ${
                    currentVariant === "v2"
                      ? "border-amber-500 bg-amber-50/40 dark:border-amber-500/80 dark:bg-amber-500/10 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div
                    className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                      currentVariant === "v2"
                        ? "border-amber-500 bg-amber-500 text-white"
                        : "border-slate-300 dark:border-slate-700 text-transparent"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Cyber Blueprint Console (v2)
                      </span>
                      <span className="rounded bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 text-[10px] font-mono font-medium text-amber-700 dark:text-amber-300">
                        Blueprint
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Technical side-rail console with live topology visualizer, animated cyber-bug mascot, boot log, and dual paper PDF reader.
                    </p>
                  </div>
                </button>

                {/* Option 3: v1 Precision */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectVariant("v1");
                    setIsOpen(false);
                  }}
                  className={`group relative flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition-all ${
                    currentVariant === "v1"
                      ? "border-indigo-500 bg-indigo-50/40 dark:border-indigo-500/80 dark:bg-indigo-500/10 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div
                    className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                      currentVariant === "v1"
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-slate-300 dark:border-slate-700 text-transparent"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Precision Engineering (v1)
                      </span>
                      <span className="rounded bg-indigo-100 dark:bg-indigo-900/50 px-1.5 py-0.5 text-[10px] font-mono font-medium text-indigo-700 dark:text-indigo-300">
                        Original
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Linear-inspired high-taste layout. Features the 4-tab Interactive Architecture Workbench, dense case studies, and floating Graph AI Agent.
                    </p>
                  </div>
                </button>
              </div>

              {/* Theme Toggle Bar */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Theme Appearance
                </span>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="h-3.5 w-3.5 text-amber-500" />
                      <span>Switch to Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-3.5 w-3.5 text-slate-600" />
                      <span>Switch to Dark</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
