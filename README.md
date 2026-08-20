# Muhammad Adil Usmani — AI & ML Engineer Portfolio
> **Production-Grade Knowledge Graph RAG, Distributed Transformer Inference & Autonomous Agent Pipelines**

[![Live Portfolio](https://img.shields.io/badge/Live%20Site-v0--muhammadaadilusmani.vercel.app-06b6d4?style=for-the-badge&logo=vercel&logoColor=white)](https://v0-muhammadaadilusmani.vercel.app/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2%20(App%20Router)-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%20(Strict)-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.x-f43f5e?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Google Gemini 3.6](https://img.shields.io/badge/Gemini-3.6%20Flash%20API-4285f4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 🧭 Overview

This repository houses the source code for the personal engineering portfolio and research showcase of **Muhammad Adil Usmani** (Data Science Intern @ **ML1**, BS Computer Science @ **UCP Lahore**). 

Unlike conventional static portfolios, this site **is itself an active AI engineering demonstration**: it runs an embedded **4-node deterministic Graph Agent Pipeline** grounded in Adil's verified CV and GitHub research repositories, powered by Google Gemini 3.6 Flash with sub-2s response latency.

---

## ⚡ Architectural Highlights

```
                          ┌───────────────────────────┐
                          │   Visitor Query / Chat    │
                          └─────────────┬─────────────┘
                                        │
                                        ▼
    ┌───────────────────────────────────────────────────────────────────────┐
    │ Node 1: IntentRouter (lib/agent_graph.ts)                             │
    │ Classifies query into 9 deterministic intent classes:                 │
    │ [ABOUT, PROJECTS, GRAPHRAG, EXPERIENCE, SKILLS, CONTACT, REPOS, etc.] │
    └───────────────────────────────────┬───────────────────────────────────┘
                                        │
                                        ▼
    ┌───────────────────────────────────────────────────────────────────────┐
    │ Node 2: MultiSourceContextFusion (lib/portfolio_knowledge_base.ts)    │
    │ Extracts structured knowledge facts from CV + Live GitHub Repos       │
    └───────────────────────────────────┬───────────────────────────────────┘
                                        │
                                        ▼
    ┌───────────────────────────────────────────────────────────────────────┐
    │ Node 3: GroundedResponseGenerator (Gemini 3.6 Flash)                  │
    │ Strict zero-hallucination prompt envelope (temp=0.25)                 │
    │ (Includes offline deterministic fallback if API unavailable)          │
    └───────────────────────────────────┬───────────────────────────────────┘
                                        │
                                        ▼
    ┌───────────────────────────────────────────────────────────────────────┐
    │ Node 4: DynamicSuggestionEngine                                       │
    │ Generates 3 contextual follow-up query chips per intent               │
    └───────────────────────────────────┬───────────────────────────────────┘
                                        │
                                        ▼
                          ┌───────────────────────────┐
                          │ Markdown Streamed Output  │
                          └───────────────────────────┘
```

---

## 🔬 Featured Engineering & Research Projects

| Project | Core Stack | Key Metric / Contribution | Source |
|---|---|---|---|
| **Anarchist LLM** | PyTorch, FlashAttention-3, Modal.com, SQLite, Streamlit | Benchmarked disguised algorithmic reasoning under Victorian personas on NVIDIA A100 GPU clusters. | [GitHub](https://github.com/AadilUsmani/Anarchist-LLM) |
| **Lexical Graph RAG** | Python, Neo4j, LangGraph, Knowledge Graphs | Synthesized multi-hop financial insights from unstructured SEC 10-K filings with deduplication workflows. | [GitHub](https://github.com/AadilUsmani/Lexical_Graph_RAG) |
| **Corrective RAG (CRAG)** | LangGraph, FAISS, Tavily Search, GPT-4o-mini | Adaptive 3-way confidence threshold routing slashing retrieval latency to **3–8s** with 95%+ accuracy. | [GitHub](https://github.com/AadilUsmani/Corrective_rag_CRAG) |
| **Titan Memory Architecture** | PyTorch, Memory Networks, Evaluation Harness | Implementation and empirical evaluation of Google's Titan memory architecture on PSX annual reports. | [GitHub](https://github.com/AadilUsmani/implementing_titan_architecture) |
| **AeroSphere** | LSTM, Apache Airflow, Azure Cloud, NASA TEMPO | Ingested **1.2M+ records/day** for 72-hour PM2.5 air quality forecasting across 45 major cities with 85%+ accuracy. | [GitHub](https://github.com/AadilUsmani/AeroSphere) |

---

## 🛠️ Tech Stack & Implementation Details

- **Framework**: [Next.js 14 App Router](https://nextjs.org/) (Server Components + Dynamic Edge API Routes)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with dual Obsidian Dark & Alpine Light glassmorphism themes
- **Animations**: [Framer Motion](https://www.framer.com/motion/) with GPU-composited spring physics, staggered viewport entry, and layout-shift-free typing rotators
- **AI Brain**: Google Gemini 3.6 Flash (`gemini-3.6-flash`) with strict grounding prompt envelope
- **Contact Pipeline**: Serverless Nodemailer SMTP integration with auto-timeout protection (`connectionTimeout: 8000ms`)
- **Performance**:
  - `content-visibility: auto` on off-screen viewport sections
  - Next.js font optimization with `display: swap` and `preconnect`
  - Zero heavy 3D/WebGL runtime bloat (pure animated SVG vectors)

---

## 📁 Repository Structure

```
portfolio_adil_usmani/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts          # POST endpoint powering the Graph Agent
│   │   └── contact/
│   │       └── route.ts          # SMTP contact form backend
│   ├── globals.css               # GPU acceleration, custom themes & mesh gradients
│   ├── layout.tsx                # Open Graph, Twitter Cards, SEO & font preloading
│   └── page.tsx                  # Single-page responsive portfolio layout
├── components/
│   ├── ui/                       # Radix UI primitives & custom button / badge components
│   ├── neural-network-viz.tsx    # Pure SVG animated neural network graph
│   └── portfolio-assistant.tsx   # Glassmorphic floating AI chatbot modal
├── lib/
│   ├── agent_graph.ts            # 4-node deterministic graph agent runtime
│   ├── portfolio_knowledge_base.ts # Structured factual dataset (CV + GitHub)
│   └── utils.ts                  # Tailwind class merge utilities
├── public/
│   └── Muhammad_Adil_Usmani_cv.pdf # Downloadable verified resume
└── scripts/
    └── send_completion_email.mjs # Automated pipeline notification utility
```

---

## 🚀 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/AadilUsmani/portfolio_adil_usmani.git
cd portfolio_adil_usmani
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set environment variables
Create a `.env.local` file in the root directory:
```env
# Google Gemini API Key for the Portfolio Assistant
GEMINI_API_KEY=your_gemini_api_key_here

# SMTP Configuration for Contact Form
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
CONTACT_RECEIVER=your_destination_email@gmail.com
```

### 4. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 5. Build for production
```bash
npm run build
npm run start
```

---

## 📬 Contact & Connect

- **Portfolio**: [https://v0-muhammadaadilusmani.vercel.app/](https://v0-muhammadaadilusmani.vercel.app/)
- **LinkedIn**: [Muhammad Adil Usmani](https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314/)
- **GitHub**: [@AadilUsmani](https://github.com/AadilUsmani)
- **Email**: [muhammadaadilusmani@gmail.com](mailto:muhammadaadilusmani@gmail.com)

---

<div align="center">
  <sub>Crafted with Next.js 14, Framer Motion, Tailwind CSS & Google Gemini. © 2026 Muhammad Adil Usmani.</sub>
</div>
