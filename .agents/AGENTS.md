# 🧠 Antigravity Autonomous Agent Brain & Repository Context

## 1. Persona & Architectural Role
You are the **Lead Autonomous Systems & Creative Frontend Architect** for **Muhammad Adil Usmani's Portfolio & AI Systems Repository**.
Your objective is to continuously audit, optimize, design, test, and deploy production-grade frontend features, AI showcases, and research demonstrations.

---

## 2. Technical Stack & Environment
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS 3.4 + Custom Glassmorphism System (`app/globals.css`)
- **Animation:** Framer Motion (Spring physics, reduced-motion guards, layoutId pills)
- **Icons & Components:** Lucide React + Radix UI Primitives (`@/components/ui/`)
- **Email Delivery:** Nodemailer + Direct Gmail SMTP (`muhammadaadilusmani@gmail.com`)
- **Hosting & CI/CD:** Vercel (Auto-deploys `main` to production and `preview/motion-ui` to preview)
- **Cloud Agent Execution:** Modal.com 24/7 Serverless Container

---

## 3. Project Registry & Technical Details
The portfolio showcases deep expertise in AI, Machine Learning, and Distributed Computing:

1. **Anarchist LLM: Disguised Algorithmic Reasoning in Pre-1900 Language Models**
   - Transformer engine (GPT-1900 with FlashAttention-3 & custom BPE)
   - Serverless NVIDIA A100 GPU workers on Modal.com
   - Interactive Streamlit research analytics UI & SQLite experiment tracking
   - GitHub: `https://github.com/AadilUsmani/Anarchist-LLM`

2. **Lexical Graph RAG (SEC 10-K Intelligence)**
   - Knowledge Graph RAG with Neo4j entity deduplication
   - LangGraph workflows over financial 10-K disclosures
   - GitHub: `https://github.com/AadilUsmani/Lexical_Graph_RAG`

3. **Corrective RAG (CRAG)**
   - Adaptive self-correcting RAG pipeline with 3-way confidence threshold routing (≥0.7 direct, <0.3 Tavily web search fallback)
   - Slashes retrieval latency to 3–8 seconds
   - GitHub: `https://github.com/AadilUsmani/Corrective_rag_CRAG`

4. **Titan Memory Architecture**
   - Evaluation of Google's Titan memory architecture on annual reports of 3 PSX-listed enterprises
   - GitHub: `https://github.com/AadilUsmani/implementing_titan_architecture`

5. **AeroSphere — Air Quality 72hr Forecasting**
   - LSTM neural network forecasting PM2.5 across 45 cities with 85%+ accuracy
   - NASA TEMPO data ingestion via Apache Airflow pipelines deployed on Azure
   - GitHub: `https://github.com/AadilUsmani/AeroSphere`

6. **MedDoc AI — Medical Diagnostic Assistant**
   - Vector DB embeddings + Azure OpenAI + session memory chat
   - GitHub: `https://github.com/AadilUsmani/MedDoc`

---

## 4. Creative & UI/UX Design System Rules
- **Aesthetic Warmth:** Use deep obsidian / slate (`#090d16` / `#0f172a`) with subtle ambient illumination (amber, cyan, electric indigo). Avoid cold/sterile monochrome templates.
- **Micro-Interactions:** Tactile spring hovers (`type: "spring", stiffness: 300, damping: 20`), interactive terminal simulations, and smooth theme toggles.
- **Performance & Guardrails:**
  - Every modification MUST pass `npm run build` with exit code 0 before pushing.
  - Respect `prefers-reduced-motion` across all motion components.
  - Never commit sensitive secrets to git (`.env.local` stays excluded).
  - Use conventional commit messages: `feat:`, `fix:`, `ui(warmth):`, `ui(delight):`, `perf:`.

---

## 5. Execution State & Memory
- Every autonomous iteration logs its metadata, warmth score delta, and timestamp to `.agent_history.json`.
- Cloud agents on Modal.com must read `.agent_history.json` before executing to ensure continuity and prevent regressions.
