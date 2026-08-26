/**
 * Verified Portfolio Knowledge Base (CV + GitHub Context)
 * --------------------------------------------------------------------------
 * Combines verified information extracted from Muhammad Adil Usmani's CV
 * and GitHub repositories to serve as the grounded context for the AI agent.
 */

export interface CVData {
  name: string
  title: string
  contact: {
    email: string
    phone: string
    linkedin: string
    github: string
    website: string
  }
  summary: string
  technicalSkills: {
    languages: string[]
    backend: string[]
    aiAndLLM: string[]
    databases: string[]
    cloudAndTools: string[]
  }
  experience: {
    role: string
    company: string
    period: string
    description: string
    highlights: string[]
  }[]
  education: {
    institution: string
    degree: string
    location: string
  }[]
  certifications: string[]
}

export interface ProjectData {
  id: string
  name: string
  subtitle: string
  category: "rag" | "llm" | "ml" | "agent"
  githubUrl: string
  liveUrl?: string
  description: string
  techStack: string[]
  metricsAndBenchmarks: Record<string, string>
  keyFeatures: string[]
}

export const PORTFOLIO_CV_DATA: CVData = {
  name: "Muhammad Adil Usmani",
  title: "Software Engineer — Applicational AI, RAG Pipelines & LLM Orchestration",
  contact: {
    email: "muhammadaadilusmani@gmail.com",
    phone: "03114086626",
    linkedin: "https://linkedin.com/in/muhammad-adil-usmani-9bb557314",
    github: "https://github.com/AadilUsmani",
    website: "https://v0-muhammadaadilusmani.vercel.app",
  },
  summary:
    "Software Engineer specializing in Applicational AI, Retrieval-Augmented Generation (RAG) pipelines, and LLM workflow orchestration. Builds and integrates ML models served through FastAPI across unstructured text and structured JSON data flows, applying prompt and context engineering to optimize LLM outputs across varied retrieval architectures.",
  technicalSkills: {
    languages: ["Python", "SQL", "TypeScript", "JavaScript"],
    backend: ["FastAPI", "Async Python", "REST APIs", "Redis Caching"],
    aiAndLLM: [
      "RAG & Knowledge Graph RAG",
      "Prompt Engineering & Context Engineering",
      "LLM Workflow Orchestration",
      "LangChain",
      "LangGraph",
      "LangSmith",
      "Azure OpenAI",
      "OpenAI API",
      "Gemini API",
      "GPT-4o-mini",
      "T5 Transformers",
      "Transformer Inference (FlashAttention-3, Custom BPE)",
    ],
    databases: ["Neo4j", "ChromaDB", "FAISS", "SQLite", "Redis", "PostgreSQL"],
    cloudAndTools: [
      "Modal.com (NVIDIA A100 GPU Clusters)",
      "Azure Cloud",
      "GCP",
      "Vercel",
      "Render",
      "Docker",
      "GitHub Actions",
      "Apache Airflow",
      "Hugging Face",
      "Git & GitHub",
    ],
  },
  experience: [
    {
      role: "Data Science Intern",
      company: "ML1",
      period: "Jul 2026 – Present",
      description:
        "Building end-to-end AI automation products that eliminate complex manual workflows for companies — automating internal operations (ticketing triage & resolution), customer support orchestration, and external business processes (hiring & candidate screening pipelines).",
      highlights: [
        "Engineered end-to-end automation workflows that replace repetitive manual tasks for enterprises across internal and external operations.",
        "Built automated internal ticketing triage, routing, and resolution systems that cut operational overhead.",
        "Developed multi-agent customer support workflows for real-time inquiry classification and context-grounded response generation.",
        "Architected external hiring automation pipelines — automating candidate resume parsing, screening workflows, and interview scheduling.",
      ],
    },
    {
      role: "Data Science Trainee",
      company: "ML1",
      period: "Jun 2026 – Jul 2026",
      description:
        "Strengthened foundational machine learning knowledge with a focus on implementing and training algorithms from scratch.",
      highlights: [
        "Implemented and trained foundational machine learning algorithms from scratch.",
        "Deepened understanding of statistical learning, loss surfaces, and model evaluation.",
      ],
    },
  ],
  education: [
    {
      institution: "University of Central Punjab, Lahore, Pakistan",
      degree: "BS Computer Science",
      location: "Lahore, Pakistan",
    },
    {
      institution: "Unique Group of Institutions, Lahore, Pakistan",
      degree: "Intermediate in Computer Science",
      location: "Lahore, Pakistan",
    },
    {
      institution: "Lahore Grammar School, Lahore, Pakistan",
      degree: "O/A Levels / High School",
      location: "Lahore, Pakistan",
    },
  ],
  certifications: [
    "Supervised Machine Learning: Regression and Classification — Stanford University / Coursera",
    "Introduction to Generative AI — Coursera",
    "Machine Learning Specialization — Stanford University, Coursera (In Progress)",
    "LLMOps Specialization — Duke University, Coursera (In Progress)",
  ],
}

export const PORTFOLIO_PROJECTS: ProjectData[] = [
  {
    id: "anarchist-llm",
    name: "Anarchist LLM: Disguised Algorithmic Reasoning",
    subtitle: "Pre-1900 Persona Constraint & Transformer Benchmarking",
    category: "llm",
    githubUrl: "https://github.com/AadilUsmani/Anarchist-LLM",
    description:
      "Autonomous research pipeline running inference on time-constrained LLMs (GPT-1900 with FlashAttention-3 & custom BPE) evaluating disguised algorithmic reasoning under Victorian personas. Built distributed A100 GPU serverless workers on Modal.com with automated SQLite experiment tracking and Streamlit analytics.",
    techStack: ["PyTorch", "FlashAttention-3", "Modal.com (A100)", "Streamlit", "SQLite", "Transformer Inference"],
    metricsAndBenchmarks: {
      Hardware: "NVIDIA A100 (Modal)",
      Attention: "FlashAttention-3",
      Evaluation: "Victorian CS Reasoning Benchmark",
    },
    keyFeatures: [
      "FlashAttention-3 kernel integration for accelerated inference.",
      "Victorian persona constraint probing emergent algorithmic problem-solving.",
      "Distributed serverless execution on Modal A100 GPU clusters.",
      "Automated experiment logging to SQLite and interactive Streamlit dashboards.",
    ],
  },
  {
    id: "lexical-graph-rag",
    name: "Lexical Graph RAG — SEC 10-K Intelligence",
    subtitle: "Knowledge Graph Retrieval with Deduplication Workflows",
    category: "rag",
    githubUrl: "https://github.com/AadilUsmani/Lexical_Graph_RAG",
    liveUrl: "https://deepwiki.com/AadilUsmani/Lexical_Graph_RAG",
    description:
      "Graph-based Retrieval-Augmented Generation system using lexical graphs to enhance factual accuracy and contextual depth in AI query responses. Implemented knowledge graph deduplication workflows to synthesize structured insights from unstructured SEC 10-K financial filings.",
    techStack: ["Python", "Neo4j", "LangGraph", "Knowledge Graphs", "SEC Filings"],
    metricsAndBenchmarks: {
      "Signal-to-Noise": "Optimized via graph pruning",
      Domain: "SEC 10-K Filings",
      GraphDB: "Neo4j",
    },
    keyFeatures: [
      "Entity extraction and knowledge graph construction over financial 10-K documents.",
      "Deduplication workflows balancing hallucination reduction and retrieval recall.",
      "LangGraph-orchestrated multi-hop query routing.",
    ],
  },
  {
    id: "corrective-rag",
    name: "Corrective RAG (CRAG) — Self-Correcting Engine",
    subtitle: "Adaptive 3-Way Threshold Routing & Web Fallback",
    category: "rag",
    githubUrl: "https://github.com/AadilUsmani/Corrective_rag_CRAG",
    liveUrl: "https://deepwiki.com/AadilUsmani/Corrective_rag_CRAG",
    description:
      "High-performance adaptive self-correcting RAG pipeline with confidence threshold routing. Directly passes verified answers (≥0.7), triggers real-time Tavily search for low confidence (<0.3), and runs parallel decomposition for ambiguous cases. Slashes end-to-end latency to 3-8s.",
    techStack: ["LangGraph", "FAISS", "Tavily Search", "GPT-4o-mini", "Python"],
    metricsAndBenchmarks: {
      Latency: "3–8s End-to-End",
      Routing: "3-Way Adaptive Threshold",
      Accuracy: "95%+ grounded accuracy",
    },
    keyFeatures: [
      "Confidence evaluator routing queries between local vector index and live web search.",
      "Parallel sub-query decomposition for complex multi-part questions.",
      "LangGraph stateful workflow preventing hallucinations.",
    ],
  },
  {
    id: "titan-architecture",
    name: "Titan Memory Architecture Implementation",
    subtitle: "Long-Term Memory Evaluation on Financial Reports",
    category: "llm",
    githubUrl: "https://github.com/AadilUsmani/implementing_titan_architecture",
    description:
      "Implementation and empirical evaluation of Google's Titan memory architecture. Benchmarked long-horizon context retention and associative recall across multi-year annual financial reports of 3 PSX-listed enterprises (including Engro 2025).",
    techStack: ["Memory Architecture", "PyTorch", "Financial NLP", "Evaluation Benchmarks"],
    metricsAndBenchmarks: {
      Dataset: "PSX Corporate Annual Reports (Engro, etc.)",
      Architecture: "Titan Long-Horizon Memory",
      Domain: "Corporate Financial NLP",
    },
    keyFeatures: [
      "PDF extraction and document preprocessing pipelines for corporate disclosures.",
      "Empirical benchmark of context recall over long financial documents.",
      "Associative memory indexing for rapid query retrieval.",
    ],
  },
  {
    id: "aerosphere",
    name: "AeroSphere — Air Quality 72hr Forecasting",
    subtitle: "NASA TEMPO Data + Airflow Pipeline + LSTM",
    category: "ml",
    githubUrl: "https://github.com/AadilUsmani/AeroSphere",
    description:
      "Engineered LSTM model predicting 72-hour PM2.5 concentrations across 45 major cities with 85%+ accuracy. Designed Apache Airflow pipeline processing 1.2M+ records daily with automated natural language summaries for public health monitoring on Azure.",
    techStack: ["NASA TEMPO", "LSTM", "Apache Airflow", "Azure Cloud", "Python"],
    metricsAndBenchmarks: {
      Accuracy: "85%+ PM2.5 forecast accuracy",
      Scale: "45 major metropolitan cities",
      Ingestion: "1.2M+ daily satellite records",
    },
    keyFeatures: [
      "Automated Apache Airflow data ingestion pipeline from NASA TEMPO satellite streams.",
      "Recurrent LSTM architecture for multi-step time-series forecasting.",
      "Automated natural language public health report generator deployed on Azure.",
    ],
  },
  {
    id: "v-g-rag",
    name: "Hybrid Graph RAG vs Vector RAG Evaluation System",
    subtitle: "Comparative Benchmark on Apple & Tesla 10-K Filings",
    category: "rag",
    githubUrl: "https://github.com/AadilUsmani/V.G.RAG",
    description:
      "Built a hybrid RAG system over Apple and Tesla SEC 10-K filings using ChromaDB + Neo4j with late-fusion aggregation and a 53-question automated benchmark for accuracy, comprehensiveness, and directness.",
    techStack: ["ChromaDB", "Neo4j", "Azure OpenAI", "Python", "Late-Fusion"],
    metricsAndBenchmarks: {
      Benchmark: "53-question automated test suite",
      Target: "Apple & Tesla 10-K Disclosures",
      Architecture: "Hybrid Vector + Graph Late Fusion",
    },
    keyFeatures: [
      "Late-fusion aggregation combining dense vector search and knowledge graph traversal.",
      "Automated evaluation framework comparing pure vector vs hybrid graph retrieval.",
    ],
  },
]
