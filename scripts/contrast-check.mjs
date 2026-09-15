#!/usr/bin/env node
/**
 * Contrast regression check for the blueprint design system (audit §4.2 / plan B1.5).
 *
 * Two jobs:
 *  1. FAIL if any hue in tailwind.config.ts is not var()-backed. This guards the exact
 *     defect found in review: teal/violet/rose/lime were pinned to literal hex of the
 *     DARK values, so light-mode text rendered at ~1.8:1 regardless of the CSS tokens.
 *  2. FAIL if any audited foreground/background pair falls below its WCAG threshold.
 *
 * Usage: node scripts/contrast-check.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(path.join(root, "app", "globals.css"), "utf8");
const tailwind = readFileSync(path.join(root, "tailwind.config.ts"), "utf8");

const HUE_TOKENS = ["signal", "signal-2", "teal", "violet", "rose", "lime"];
const SOLID_TOKENS = ["signal-solid", "teal-solid", "violet-solid", "rose-solid", "lime-solid"];
const TEXT_TOKENS = [...HUE_TOKENS, "mute", "paper", "paper-2"];
/** Solid fills that actually carry text. rose-solid is decorative only (a status dot). */
const SOLID_WITH_TEXT = ["signal-solid", "teal-solid", "violet-solid", "lime-solid"];
/** Hardcoded accent fills in HeroV2_1 that no token reaches; they must still carry text-on-solid. */
const HEX_FILLS = ["#ea580c", "#38bdf8", "#a78bfa", "#2dd4bf"];

const TEXT_MIN = 4.5; // WCAG 2.x AA, normal text
const LARGE_MIN = 3.0; // AA large text / non-text UI

/** Flat { selector, body } scan; later definitions win, which matches CSS cascade here. */
function collectVars(kind) {
  const vars = {};
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const selector = m[1];
    const isDark = /\.dark\b/.test(selector);
    const isLight = /:root|\.light\b/.test(selector) && !isDark;
    if (kind === "dark" ? !isDark : !isLight) continue;
    for (const line of m[2].split("\n")) {
      const d = line.match(/^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/i);
      if (d) vars[d[1]] = d[2].trim();
    }
  }
  return vars;
}

function parseColor(value) {
  if (!value) return null;
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const h = hex[1];
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  }
  const rgb = value.match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const parts = rgb[1].split(",").map((p) => parseFloat(p.trim()));
    if (parts.length >= 3) return parts.slice(0, 3);
  }
  return null; // hsl()/oklch() etc. are not part of the blueprint palette
}

const channel = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
function ratio(fg, bg) {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

const failures = [];
const rows = [];
function check(label, fgVar, fgVal, bgVar, bgVal, min) {
  const fg = parseColor(fgVal);
  const bg = parseColor(bgVal);
  if (!fg || !bg) {
    failures.push(`${label}: unresolvable color (${fgVar}=${fgVal}, ${bgVar}=${bgVal})`);
    rows.push([label, `${fgVal} on ${bgVal}`, "n/a", `≥${min}`, "UNRESOLVED"]);
    return;
  }
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failures.push(`${label}: ${r.toFixed(2)}:1 < ${min}:1 (${fgVal} on ${bgVal})`);
  rows.push([label, `${fgVal} on ${bgVal}`, `${r.toFixed(2)}:1`, `≥${min}`, ok ? "PASS" : "FAIL"]);
}

for (const theme of ["light", "dark"]) {
  const vars = collectVars(theme);
  const canvas = vars["--color-ink"];
  const card = vars["--color-ink-2"] || canvas;
  for (const token of TEXT_TOKENS) {
    check(`${theme}: text-${token}`, `--color-${token}`, vars[`--color-${token}`], "--color-ink", canvas, TEXT_MIN);
    if (token !== "mute") {
      check(`${theme}: text-${token} on card`, `--color-${token}`, vars[`--color-${token}`], "--color-ink-2", card, TEXT_MIN);
    }
  }
  for (const token of SOLID_WITH_TEXT) {
    check(
      `${theme}: text-on-solid on bg-${token}`,
      "--color-on-solid",
      vars["--color-on-solid"],
      `--color-${token}`,
      vars[`--color-${token}`],
      TEXT_MIN,
    );
  }
  for (const hex of HEX_FILLS) {
    check(`${theme}: text-on-solid on ${hex}`, "--color-on-solid", vars["--color-on-solid"], hex, hex, TEXT_MIN);
  }
  check(`${theme}: .text-outline stroke`, "--color-paper-2", vars["--color-paper-2"], "--color-ink", canvas, LARGE_MIN);
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
for (const token of [...HUE_TOKENS, ...SOLID_TOKENS, "on-solid"]) {
  const re = new RegExp(`(?:^|[\\s{])'?${escape(token)}'?\\s*:\\s*'var\\(--color-${escape(token)}\\)'`, "m");
  const ok = re.test(tailwind);
  if (!ok) failures.push(`tailwind.config.ts: "${token}" is not var(--color-${token})-backed`);
  rows.push([`tailwind: ${token}`, "must be var()-backed", "—", "—", ok ? "PASS" : "FAIL"]);
}

const w = (i) => Math.max(...rows.map((r) => r[i].length));
console.log("\nWCAG contrast regression check\n" + "=".repeat(96));
console.log(
  ["CHECK".padEnd(w(0)), "PAIR".padEnd(Math.min(w(1), 42)), "RATIO".padStart(8), "MIN".padStart(6), "RESULT".padStart(7)].join("  "),
);
for (const r of rows) {
  console.log([r[0].padEnd(w(0)), r[1].slice(0, 42).padEnd(Math.min(w(1), 42)), r[2].padStart(8), r[3].padStart(6), r[4].padStart(7)].join("  "));
}
console.log("=".repeat(96));
if (failures.length) {
  console.error(`\n${failures.length} FAILURE(S):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`\n✓ All ${rows.length} checks passed.`);