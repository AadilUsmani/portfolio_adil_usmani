# Engineering Architecture Log & System Diagnostic Journal

**Project:** Muhammad Adil Usmani — Engineering Portfolio & Technical Systems  
**Author & Maintainer:** Muhammad Adil Usmani (`@AadilUsmani`)  
**Production URL:** [https://v0-muhammadaadilusmani.vercel.app/](https://v0-muhammadaadilusmani.vercel.app/)  
**Date:** September 5, 2026  
**Status:** All Systems Operational · 0 TypeScript Errors · Live Deployed  

---

## 1. Executive Summary & Architectural Vision

This repository hosts Muhammad Adil Usmani's production portfolio showcasing high-performance engineering in **Applicational AI, Knowledge Graph RAG, Distributed Systems, Cryptography, and LLM Orchestration**.

The platform is designed around two distinct, high-craft user interfaces that share a single unified data layer, live API backend, and deterministic AI agent pipeline:

1. **Precision Engineering (v1)**: A Linear-inspired, restrained interface featuring the 4-tab Interactive Architecture Workbench (with live Cypher node graphs), verifiable case study breakdowns (Challenge → Decision → Outcome), and a floating Graph AI Agent.
2. **Cyber Blueprint Console (v2)**: A technical side-rail terminal featuring an interactive SVG topology flow visualizer, animated SVG CyberBug mascot with telemetry rings, boot sequence logger, in-browser PDF reader, and technical command dock.

---

## 2. Chronological Engineering Log: What, Why, and How

### Phase 1: In-Browser PDF Reader Connection Diagnostic & Resolution
* **The Problem:** When opening research papers in the in-browser reader, browsers reported `v0-muhammadaadilusmani.vercel.app refused to connect`.
* **Root Cause:** Next.js served a strict `X-Frame-Options: DENY` header in `next.config.mjs`, which instructed browsers to block framing of all resources, even when embedded from the same origin.
* **Why It Matters:** Visitors and recruiters could not read the published research paper directly within the interface without an abrupt external redirect or broken frame.
* **The Solution & Thought Process:**
  1. Updated `next.config.mjs` to set `X-Frame-Options: SAMEORIGIN` and added `Content-Security-Policy: frame-ancestors 'self'`. This maintains tight security against third-party clickjacking while permitting secure same-origin embedding.
  2. Upgraded `components/v2/PdfReaderV2.tsx` to utilize an `<object data="..." type="application/pdf">` container with a nested `<iframe>` and fallback buttons ("Download PDF", "Open in New Tab").
  3. Verified production response headers via `curl -s -I`:
     ```http
     HTTP/1.1 200 OK
     Content-Security-Policy: frame-ancestors 'self'
     X-Frame-Options: SAMEORIGIN
     Content-Type: application/pdf
     ```

---

### Phase 2: Paper Hierarchy & Factual Grounding
* **The Problem:** The portfolio previously misattributed a research paper badge and PDF link to *Lexical Graph RAG — SEC 10-K Intelligence*, blurring the line between engineering projects and published papers.
* **Factual Grounding:**
  - **01 Published Paper:** *Deterministic Data Fusion for FinTech: Fault-Tolerant State Synchronization Across Heterogeneous Financial Event Streams* (`/Deterministic_Data_Fusion_for_FinTech.pdf`).
  - **02 Working Paper in Progress:** *Anarchist LLM: Disguised Algorithmic Reasoning (Pre-1900 Persona Constraint & Transformer Benchmarking on Modal A100 Clusters)* (`https://github.com/AadilUsmani/Anarchist-LLM`).
  - **Engineering System (Not a Paper):** *Lexical Graph RAG — SEC 10-K Intelligence* is an engineering architecture project and production prototype over SEC 10-K filings using Neo4j and LangGraph.
* **Changes Implemented:**
  1. `app/page.tsx`: Removed `paper` property from Lexical Graph RAG; added *Deterministic Data Fusion for FinTech* as an independent featured publication in `projectsData`.
  2. `components/architecture-workbench.tsx`: Removed the "Research Paper (PDF)" button from the Lexical Graph RAG tab.
  3. `components/command-palette.tsx`: Updated the ⌘K command to accurately describe the FinTech paper.
  4. `components/v2/ResearchV2.tsx`: Rendered Paper 1 with the in-browser reader and Paper 2 with a "Preprint in Preparation" badge and GitHub research repository link.
  5. `lib/portfolio_knowledge_base.ts` & `lib/dataV2.ts`: Updated all knowledge entities to ensure strict adherence across both UIs and AI agents.

---

### Phase 3: Dynamic GitHub Codebase Retrieval for the AI Assistant
* **The Problem:** The AI chatbot relied on static, hardcoded strings and lacked real-time awareness of Adil's actual codebases.
* **Why It Matters:** When technical interviewers or visitors ask questions about implementation details (such as how AES-256-GCM is implemented in `Crypto_secure_system`, or what the file hierarchy looks like in `Anarchist-LLM`), the assistant must answer with code-level accuracy.
* **The Solution:**
  1. Built `lib/github_codebase_service.ts`:
     - Implemented dynamic fetching of live `README.md` documentation from `https://raw.githubusercontent.com/AadilUsmani/{repo}/main/README.md` with an in-memory cache (15-minute TTL).
     - Deeply indexed verified architectural schemas, cryptographic parameters, file trees, and test suites for all 7 public repositories (`Crypto_secure_system`, `Anarchist-LLM`, `Lexical_Graph_RAG`, `Corrective_rag_CRAG`, `implementing_titan_architecture`, `AeroSphere`, `V.G.RAG`).
  2. Integrated with `lib/agent_graph.ts`:
     - Made `retrieveContextNode` asynchronous to fetch live repository documentation on demand.
     - Fed repository file trees, cryptographic algorithms, and model benchmarks directly into the Gemini 3.6 Flash prompt.
     - Provided deterministic fallback responses with verified code-level details for zero-latency, 100% reliable responses.

---

### Phase 4: Complete System Audit & Edge-Case Elimination
During the exhaustive diagnostic across all components, several edge-case flaws were detected and resolved:

1. **Contact API Payload Mismatch (`ContactV2.tsx` ↔ `route.ts`)**:
   - *Issue Found:* `ContactV2.tsx` sent `{ name, email, message, channel, honey }` without a `subject` property. `app/api/contact/route.ts` strictly required `subject`, which caused all contact messages from v2 to be rejected with HTTP 400: `"All fields are required"`.
   - *Fix:* Updated `app/api/contact/route.ts` to support optional `subject` with fallback to `[Portfolio] Inquiry: ${channel}` and added a silent honeypot drop for bot protection. Updated `ContactV2.tsx` to send explicit subjects and aligned receipt handling.
2. **Command Palette External Paper Link (`CommandPaletteV2.tsx`)**:
   - *Issue Found:* `CommandPaletteV2.tsx` called `openReader(pp.href)` unconditionally for all papers, which would have loaded the GitHub repo of *Anarchist LLM* into the PDF modal.
   - *Fix:* Added condition checking `pp.isExternal` to open external tabs for preprints and `openReader()` only for PDFs.
3. **Bidirectional ⌘K UI Switching**:
   - *Added:* Added "Switch to Precision UI (v1)" in `CommandPaletteV2.tsx` and "Switch to Cyber Blueprint UI (v2)" in `command-palette.tsx`, allowing fluid keyboard navigation between designs.
4. **Intent Routing Keyword Collision**:
   - *Issue Found:* `routeIntentNode` previously checked `q.includes("sec")` for SEC 10-K filings, which inadvertently matched `"secure"`, `"security"`, and `"crypto_secure_system"`, routing crypto queries to Graph RAG.
   - *Fix:* Refined the check to `q.includes("sec 10-k") || q.includes("sec filings")` and prioritized `CRYPTO_SEMS` routing before Graph RAG.
5. **Git Author Identity Calibration**:
   - *Issue Found:* Commits made with `muhammadaadilusmani@gmail.com` were linked to a secondary GitHub handle (`MAdilUsmani`) instead of the repository owner (`AadilUsmani`), preventing commits from populating on the user's primary GitHub profile contribution graph.
   - *Fix:* Re-configured local git author to `Muhammad Adil Usmani <adilusmani@outlook.com>` (the verified primary email for `@AadilUsmani` on GitHub).

---

## 3. Comprehensive System Diagnostic & Feature Verification Matrix

| Component / Flow | Verified Behaviors & Diagnostics | Status |
| :--- | :--- | :--- |
| **In-Browser PDF Reader** | Same-origin iframe loading `/Deterministic_Data_Fusion_for_FinTech.pdf`, zoom controls, PDF download CTA, fallback open-in-tab button. | ✅ PASS |
| **Research Cards (v1 & v2)** | Paper 1 triggers PDF reader; Paper 2 links to GitHub research repository; Lexical Graph RAG has 0 paper badges. | ✅ PASS |
| **Contact Flow (v1 & v2)** | Input validation, length bounds, email format regex, rate limiting (5 req/10 min), honeypot, Gmail SMTP delivery, Web3Forms fallback, receipt ID generation. | ✅ PASS |
| **AI Assistant (v1 Modal & v2 Console)** | Grounded retrieval via Gemini 3.6 Flash, dynamic GitHub repo documentation, deterministic fallback, clickable Markdown links, suggestion chips. | ✅ PASS |
| **Architecture Workbench (v1)** | 4-tab switcher, interactive Cypher graph node inspection, latency & throughput sliders, query tester CTA to AI assistant. | ✅ PASS |
| **Architecture Visualizer (v2)** | Interactive SVG topology canvas, pan/zoom, play/pause/step controls, speed selector, active edge data pulse, node inspection drawer. | ✅ PASS |
| **Command Palette (⌘K)** | Global shortcut (`⌘K` / `Ctrl+K`), keyword fuzzy matching, quick jumps (`g h`, `g s`, `g r`, `g a`, `g c`), direct theme toggle, UI variant switcher. | ✅ PASS |
| **Theme & UI Variant Persistence** | `localStorage` persistence for `adil-theme` (`light` / `dark`) and `adil-ui-variant` (`v1` / `v2`), cross-tab storage event synchronization, 0 hydration mismatch. | ✅ PASS |
| **CyberBug Mascot (v2)** | Dual counter-rotating SVG telemetry reticles, breathing cybernetic eye, animated legs, responsive scaling across viewports. | ✅ PASS |
| **Mobile Navigation & Dock** | Collapsible mobile hamburger menu, mobile header progress bar, non-overlapping floating UI switcher dock pill. | ✅ PASS |

---

## 4. Live Production Verification Log

```powershell
# Diagnostic 1: Verify PDF HTTP response headers and same-origin framing
curl -s -I "https://v0-muhammadaadilusmani.vercel.app/Deterministic_Data_Fusion_for_FinTech.pdf"
# -> HTTP/1.1 200 OK
# -> Content-Security-Policy: frame-ancestors 'self'
# -> X-Frame-Options: SAMEORIGIN
# -> Content-Type: application/pdf

# Diagnostic 2: Verify Paper Count and Status via AI Agent
$body = @{ message = "How many research papers has Adil written?" } | ConvertTo-Json
Invoke-RestMethod -Uri "https://v0-muhammadaadilusmani.vercel.app/api/chat" -Method POST -ContentType "application/json" -Body $body
# -> Returns: 1 Published Paper (Deterministic Data Fusion) + 1 Working Paper in Progress (Anarchist LLM)

# Diagnostic 3: Verify Live GitHub Codebase Retrieval
$body = @{ message = "How is encryption implemented in Crypto_secure_system?" } | ConvertTo-Json
Invoke-RestMethod -Uri "https://v0-muhammadaadilusmani.vercel.app/api/chat" -Method POST -ContentType "application/json" -Body $body
# -> Returns: Full breakdown of AES-256-GCM (96-bit nonce, 128-bit tag), RSA-3072 OAEP key exchange, Argon2id, and 4-tier RBAC

# Diagnostic 4: Verify Contact Submission API
$body = @{ name = "Diagnostic Tester"; email = "recruiter@tech.co"; channel = "Hiring"; message = "Automated verification test." } | ConvertTo-Json
Invoke-RestMethod -Uri "https://v0-muhammadaadilusmani.vercel.app/api/contact" -Method POST -ContentType "application/json" -Body $body
# -> Returns: { ok: true, success: true, message: "...", receipt: { id: ..., at: ... } }
```

---

### Phase 5: Client-Side Crash Elimination, Console Sanitization & Error Boundaries
* **The Problem:** Intermittent crashes occurred when switching system architectures, along with console errors (404 on `/favicon.ico`, SSR hydration timestamp mismatches, and `crypto.randomUUID` failures in non-secure or older mobile browsers).
* **Root Causes & Solutions:**
  1. **SVG Topology Flow Out-of-Bounds Exception (`ArchitectureVisualizerV2.tsx`)**:
     - *Cause:* When switching between systems with differing flow step counts (e.g., FinTech 10 steps → Battery 7 steps), React re-rendered with `step = 8` before the reset effect ran, causing `nodeMap[flow[step][0]].label` to throw an unhandled `TypeError`.
     - *Fix:* Added null-safe chaining `activePair && fromNode && toNode`, protected `visitedNodes` array slicing, and guarded SVG scale computations against zero-width containers (`Number.isFinite`).
  2. **Safe UUID Fallback (`AssistantV2.tsx`)**:
     - *Cause:* `crypto.randomUUID()` is strictly scoped to Secure Contexts (HTTPS/localhost) and fails in some webviews and older mobile browsers.
     - *Fix:* Built `safeUUID()` utility providing a resilient fallback generator.
  3. **Hydration Mismatch Fix (`portfolio-assistant.tsx`)**:
     - *Cause:* Evaluating `new Date().toLocaleTimeString()` during initial `useState` generated differing server/client timestamps during SSR.
     - *Fix:* Initialized welcome message timestamp to empty string and populated it on client mount in `useEffect`.
  4. **Favicon 404 Resolution**:
     - *Cause:* Missing `favicon.ico` triggered automatic 404 console errors on every session.
     - *Fix:* Generated `public/favicon.ico` and `app/favicon.ico` with explicit metadata link definitions in `app/layout.tsx`.
  5. **Clipboard & Storage Resilience (`app/page.tsx`, `command-palette.tsx`, `RailV2.tsx`)**:
     - *Cause:* Unprotected `navigator.clipboard.writeText()` rejected in non-focused documents, and `localStorage.setItem()` threw in private browsing modes.
     - *Fix:* Wrapped clipboard copies with textarea fallback and protected all `localStorage` writes with `try/catch`.
  6. **Next.js App Router Error Boundaries (`app/error.tsx` & `app/global-error.tsx`)**:
     - *Fix:* Implemented fault-tolerant client boundaries so any unexpected child exception isolates state gracefully without blanking the screen.

---

### Phase 6: Mobile Virtual Keyboard & Timezone Exception Elimination
* **The Problem:** Mobile devices running Android Chrome / ColorOS / WebViews were triggering the newly introduced error boundary (`app/error.tsx`), appearing persistently on user mobile screens.
* **Root Causes & Solutions:**
  1. **Virtual Keyboard Event Anomaly (`command-palette.tsx`, `shell-context.tsx`)**:
     - *Cause:* On mobile virtual keyboards (Gboard, SwiftKey, ColorOS IME), touch typing or autocomplete fires `keydown` events where `e.key` is `undefined` or `"Unidentified"`. Executing `e.key.toLowerCase()` threw `TypeError: Cannot read properties of undefined (reading 'toLowerCase')`, immediately tripping the React error boundary.
     - *Fix:* Added `if (!e.key) return;` guards in all global and local keydown listeners before checking key names.
  2. **IANA Timezone Compatibility on Mobile (`RailV2.tsx`)**:
     - *Cause:* `new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi" })` threw `RangeError: Invalid time zone specified: Asia/Karachi` on mobile devices with trimmed IANA timezone databases.
     - *Fix:* Wrapped `Intl.DateTimeFormat` in a `try/catch` with a mathematical UTC+5 (Pakistan Standard Time) offset calculation fallback.
  3. **Pointer Capture DOMException (`ArchitectureVisualizerV2.tsx`)**:
     - *Cause:* Calling `(e.currentTarget as Element).setPointerCapture(e.pointerId)` on touch screen drag gestures threw `DOMException: InvalidPointerId` when touch events completed rapidly.
     - *Fix:* Wrapped `setPointerCapture` in a `try/catch` block and provided fallback `kindMeta` node lookups.
  4. **Typewriter String Safety (`AssistantV2.tsx`)**:
     - *Cause:* Calling `.length` or `.slice()` on empty/undefined typewriter strings threw exceptions during dynamic streaming.
     - *Fix:* Coerced inputs with safe string fallbacks (`safeText = text || ""`).
  5. **Transparent Diagnostic Telemetry & Reset Session (`app/error.tsx`, `app/global-error.tsx`, `app/api/client-error`)**:
     - *Fix:* Updated error boundaries to expose exact exception names, messages, digests, and stack traces on screen with a single-tap "Copy Diagnostic" tool and automated background reporting to `/api/client-error`. Provided a "Clean Reset Session" button that clears storage and performs a hard refresh back to the clean root state.

---

*This document serves as the permanent engineering log for Muhammad Adil Usmani's portfolio systems.*

