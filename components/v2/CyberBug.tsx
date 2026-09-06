"use client";

import { motion } from "framer-motion";

export function CyberBug({ size = 260 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      {/* Outer rotating telemetry reticles */}
      <svg
        viewBox="0 0 320 320"
        className="absolute inset-0 h-full w-full animate-spin-slow pointer-events-none"
      >
        <circle
          cx="160"
          cy="160"
          r="154"
          fill="none"
          stroke="var(--color-signal)"
          strokeWidth="1.2"
          strokeDasharray="3 8"
          strokeOpacity="0.45"
        />
        <circle
          cx="160"
          cy="160"
          r="142"
          fill="none"
          stroke="var(--color-line-2)"
          strokeWidth="1"
          strokeDasharray="40 20 6 20"
          strokeOpacity="0.6"
        />
      </svg>

      <svg
        viewBox="0 0 320 320"
        className="absolute inset-0 h-full w-full animate-spin-slower pointer-events-none"
      >
        <circle
          cx="160"
          cy="160"
          r="128"
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth="1.2"
          strokeDasharray="2 6"
          strokeOpacity="0.5"
        />
        {[0, 90, 180, 270].map((deg) => (
          <line
            key={deg}
            x1="160"
            y1="16"
            x2="160"
            y2="28"
            stroke="var(--color-signal)"
            strokeWidth="2"
            transform={`rotate(${deg} 160 160)`}
          />
        ))}
      </svg>

      {/* Center glowing circular aperture */}
      <div className="relative flex h-[78%] w-[78%] items-center justify-center rounded-full border border-line-2 bg-ink-2/95 shadow-[0_0_60px_rgba(249,115,22,0.18)] dark:shadow-[0_0_80px_rgba(249,115,22,0.22)] overflow-hidden">
        {/* Subtle background radar grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,209,197,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[2px] animate-scan bg-gradient-to-r from-transparent via-teal to-transparent opacity-80 pointer-events-none" />

        {/* ─── THE ANIMATED CYBER BUG / CODE BEETLE ─── */}
        <svg
          viewBox="0 0 200 200"
          className="relative h-[82%] w-[82%] drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for gradients & glows */}
          <defs>
            <linearGradient id="bugShellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--color-signal-2)" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="bugCoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4fd1c5" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
            <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ── Six Articulated Robotic Legs ── */}
          {/* Left Legs */}
          <motion.path
            d="M 82 82 L 48 64 L 28 72"
            stroke="var(--color-paper-2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transformOrigin: "82px 82px" }}
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 80 102 L 42 102 L 22 114"
            stroke="var(--color-paper-2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transformOrigin: "80px 102px" }}
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.path
            d="M 82 122 L 46 138 L 32 156"
            stroke="var(--color-paper-2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transformOrigin: "82px 122px" }}
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />

          {/* Right Legs */}
          <motion.path
            d="M 118 82 L 152 64 L 172 72"
            stroke="var(--color-paper-2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transformOrigin: "118px 82px" }}
            animate={{ rotate: [4, -4, 4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          />
          <motion.path
            d="M 120 102 L 158 102 L 178 114"
            stroke="var(--color-paper-2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transformOrigin: "120px 102px" }}
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.path
            d="M 118 122 L 154 138 L 168 156"
            stroke="var(--color-paper-2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transformOrigin: "118px 122px" }}
            animate={{ rotate: [4, -4, 4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          />

          {/* ── Twitching Antennae ── */}
          <motion.g
            style={{ transformOrigin: "92px 60px" }}
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M 92 60 C 86 46, 74 34, 58 26"
              stroke="var(--color-signal)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="58" cy="26" r="3.5" fill="var(--color-teal)" />
          </motion.g>

          <motion.g
            style={{ transformOrigin: "108px 60px" }}
            animate={{ rotate: [4, -4, 4] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            <path
              d="M 108 60 C 114 46, 126 34, 142 26"
              stroke="var(--color-signal)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="142" cy="26" r="3.5" fill="var(--color-teal)" />
          </motion.g>

          {/* ── Head Segment ── */}
          <polygon
            points="100,52 116,66 112,80 88,80 84,66"
            fill="var(--color-ink-3)"
            stroke="var(--color-line-2)"
            strokeWidth="2"
          />
          <circle cx="92" cy="68" r="2.8" fill="var(--color-teal)" />
          <circle cx="108" cy="68" r="2.8" fill="var(--color-teal)" />

          {/* ── Main Thorax & Shell ── */}
          <motion.g
            style={{ transformOrigin: "100px 128px" }}
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M 98 84 C 74 84, 66 106, 68 138 C 70 158, 86 168, 98 170 Z"
              fill="var(--color-ink-3)"
              stroke="var(--color-line-2)"
              strokeWidth="2"
            />
            <path
              d="M 102 84 C 126 84, 134 106, 132 138 C 130 158, 114 168, 102 170 Z"
              fill="var(--color-ink-3)"
              stroke="var(--color-line-2)"
              strokeWidth="2"
            />
          </motion.g>

          {/* Circuit Inlays on Shell */}
          <path d="M 80 110 L 92 118 L 92 142" stroke="var(--color-signal)" strokeWidth="1.2" strokeOpacity="0.8" />
          <path d="M 120 110 L 108 118 L 108 142" stroke="var(--color-signal)" strokeWidth="1.2" strokeOpacity="0.8" />

          {/* ── Central Pulsing Power Nucleus / Glowing Heart ── */}
          <motion.circle
            cx="100"
            cy="124"
            r="16"
            fill="url(#bugCoreGrad)"
            filter="url(#coreGlow)"
            style={{ transformOrigin: "100px 124px" }}
            animate={{
              scale: [0.95, 1.14, 0.95],
              opacity: [0.75, 1, 0.75],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.polygon
            points="100,116 106,124 100,132 94,124"
            fill="#ffffff"
            style={{ transformOrigin: "100px 124px" }}
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Telemetry labels around aperture */}
      <div className="mono absolute -bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-line-2 bg-ink-2 px-3 py-1 text-[10px] tracking-widest text-paper shadow-sm">
        <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
        BUG.AI-V3 · LIVE
      </div>
      <div className="mono absolute -left-3 top-6 rounded border border-line-2 bg-ink-2 px-2 py-0.5 text-[9.5px] text-mute shadow-2xs">
        FREQ 4.38GHz
      </div>
      <div className="mono absolute -right-3 top-6 rounded border border-line-2 bg-ink-2 px-2 py-0.5 text-[9.5px] text-mute shadow-2xs">
        REPLAY 0 DRIFT
      </div>
    </div>
  );
}
