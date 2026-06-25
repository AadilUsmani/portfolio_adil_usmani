"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Database,
  Brain,
  Download,
  ArrowUp,
  Star,
  Eye,
  Zap,
  Code2,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// ─── Data ─────────────────────────────────────────────────────────────────────

const skillsData = {
  "Languages": [
    { name: "Python", level: 95, icon: "🐍", color: "from-blue-500 to-yellow-500", description: "Primary language for ML/AI development" },
    { name: "SQL", level: 85, icon: "🗄️", color: "from-orange-500 to-red-500", description: "Database queries and data analysis" },
  ],
  "Backend & APIs": [
    { name: "FastAPI", level: 88, icon: "⚡", color: "from-green-500 to-teal-500", description: "High-performance web APIs" },
    { name: "LangChain", level: 85, icon: "🔗", color: "from-indigo-500 to-purple-500", description: "LLM application framework" },
    { name: "LangGraph", level: 82, icon: "🕸️", color: "from-teal-500 to-blue-500", description: "Graph-based LLM workflows" },
    { name: "LangSmith", level: 80, icon: "🔍", color: "from-yellow-500 to-orange-500", description: "LLM observability and debugging" },
    { name: "REST APIs", level: 87, icon: "🌐", color: "from-cyan-500 to-blue-500", description: "RESTful API design and development" },
    { name: "Async Programming", level: 83, icon: "⚙️", color: "from-purple-500 to-pink-500", description: "Asynchronous programming patterns" },
  ],
  "AI/ML & Advanced Techniques": [
    { name: "RAG Pipelines", level: 88, icon: "🔄", color: "from-red-500 to-pink-500", description: "Retrieval-Augmented Generation systems" },
    { name: "LLM Applications", level: 87, icon: "🤖", color: "from-yellow-500 to-orange-500", description: "Building with large language models" },
    { name: "Embeddings", level: 85, icon: "📊", color: "from-blue-500 to-cyan-500", description: "Vector embeddings and representations" },
    { name: "Retrieval Systems", level: 86, icon: "🔍", color: "from-purple-500 to-blue-500", description: "Information retrieval and search" },
    { name: "Prompt Engineering", level: 85, icon: "💡", color: "from-orange-500 to-yellow-500", description: "Effective prompt design strategies" },
    { name: "Deep Learning", level: 82, icon: "🧠", color: "from-indigo-500 to-purple-500", description: "Neural networks and deep architectures" },
    { name: "Time-Series Forecasting", level: 80, icon: "📈", color: "from-green-500 to-teal-500", description: "Temporal data prediction" },
    { name: "Hybrid Retrieval", level: 84, icon: "🔀", color: "from-pink-500 to-red-500", description: "Combined vector and graph retrieval" },
    { name: "Evaluation Benchmarks", level: 83, icon: "📊", color: "from-cyan-500 to-blue-500", description: "LLM evaluation and benchmarking" },
  ],
  "Databases": [
    { name: "SQLite", level: 85, icon: "💾", color: "from-blue-500 to-teal-500", description: "Lightweight SQL database" },
    { name: "ChromaDB", level: 84, icon: "🔍", color: "from-purple-500 to-pink-500", description: "Vector database for embeddings" },
    { name: "Neo4j", level: 82, icon: "📊", color: "from-orange-500 to-red-500", description: "Graph database for relationships" },
  ],
  "Libraries & Frameworks": [
    { name: "Pandas", level: 92, icon: "🐼", color: "from-purple-500 to-pink-500", description: "Data manipulation and analysis" },
    { name: "NumPy", level: 90, icon: "🔢", color: "from-green-500 to-blue-500", description: "Numerical computing" },
    { name: "Matplotlib", level: 86, icon: "📈", color: "from-cyan-500 to-blue-500", description: "Data visualization" },
    { name: "PyTorch", level: 85, icon: "🔥", color: "from-red-500 to-orange-500", description: "Deep learning framework" },
    { name: "TensorFlow", level: 83, icon: "⚡", color: "from-orange-500 to-yellow-500", description: "ML and deep learning platform" },
    { name: "Scikit-Learn", level: 88, icon: "🧠", color: "from-blue-500 to-cyan-500", description: "Machine learning algorithms" },
  ],
  "Tools & Infrastructure": [
    { name: "GitHub", level: 80, icon: "🐙", color: "from-gray-700 to-black", description: "Version control and collaboration" },
    { name: "Docker", level: 75, icon: "🐳", color: "from-blue-500 to-cyan-500", description: "Container orchestration" },
    { name: "GitHub Actions", level: 84, icon: "⚙️", color: "from-purple-500 to-blue-500", description: "CI/CD automation" },
    { name: "Render", level: 83, icon: "🚀", color: "from-blue-500 to-purple-500", description: "Cloud deployment platform" },
    { name: "Vercel", level: 87, icon: "▲", color: "from-black to-gray-600", description: "Frontend deployment platform" },
    { name: "Azure", level: 78, icon: "☁️", color: "from-blue-600 to-cyan-500", description: "Microsoft cloud services" },
    { name: "GCP", level: 75, icon: "🌐", color: "from-red-500 to-yellow-500", description: "Google Cloud Platform" },
    { name: "GitHub Copilot", level: 82, icon: "✨", color: "from-yellow-500 to-orange-500", description: "AI code assistant" },
    { name: "Gemini CLI", level: 80, icon: "🎯", color: "from-purple-500 to-blue-500", description: "AI command line tools" },
    { name: "Deepwiki", level: 80, icon: "📚", color: "from-green-500 to-teal-500", description: "Project documentation platform" },
    { name: "Airflow", level: 78, icon: "🔄", color: "from-orange-500 to-red-500", description: "Workflow orchestration" },
    { name: "Copilot CLI", level: 82, icon: "⌨️", color: "from-gray-500 to-gray-300", description: "AI-powered terminal assistant" },
    { name: "Claude", level: 85, icon: "🧠", color: "from-orange-500 to-amber-500", description: "Anthropic's LLM assistant" },
    { name: "Modal.com", level: 80, icon: "☁️", color: "from-green-500 to-emerald-500", description: "Serverless cloud for AI" },
  ],
}

const featuredProjects = [
  {
    title: "Lexical Graph RAG — Graph-Based Retrieval Research",
    description: "Engineered a Graph-based Retrieval-Augmented Generation system using lexical graphs to enhance factual accuracy and contextual depth in AI-driven query responses. Implemented knowledge graph deduplication workflows to synthesize structured data from unstructured SEC filings.",
    tags: [
      { name: "Python", color: "bg-yellow-500" },
      { name: "Neo4j", color: "bg-blue-500" },
      { name: "LangGraph", color: "bg-orange-500" },
      { name: "Knowledge Graphs", color: "bg-purple-500" },
    ],
    github: "https://github.com/AadilUsmani/Lexical_Graph_RAG",
    demo: "https://deepwiki.com/AadilUsmani/Lexical_Graph_RAG",
    image: "/placeholder.svg",
    metrics: { metrics: "Signal-to-Noise", domain: "SEC Filings" },
    featured: true,
  },
  {
    title: "AeroSphere — Air Quality Forecasting System",
    description: "Built LSTM model forecasting 72-hour PM2.5 across 45 cities achieving 85%+ accuracy, 30% above baseline. Designed Airflow pipeline processing 1.2M+ records with GPT-based natural language summaries for public air quality reports. Contributed to model training, batch scheduling, and end-to-end Azure cloud deployment.",
    tags: [
      { name: "NASA TEMPO", color: "bg-blue-500" },
      { name: "LSTM", color: "bg-red-500" },
      { name: "Airflow", color: "bg-orange-500" },
      { name: "Azure", color: "bg-cyan-500" },
      { name: "GPT", color: "bg-green-500" },
    ],
    github: "https://github.com/AadilUsmani/AeroSphere",
    demo: "https://www.aerosphere.earth",
    image: "/images/aerosphere.png",
    metrics: { accuracy: "85%+", cities: "45" },
    featured: true,
  },
  {
    title: "Hybrid Graph RAG vs Vector RAG",
    description: "Comparative analysis of hybrid retrieval from ChromaDB and Neo4j over SEC 10-K filings. Applied late fusion to merge vector and graph contexts for improved structured financial reasoning. Built 53-question benchmark evaluating accuracy, comprehensiveness, diversity, empowerment, and directness metrics.",
    tags: [
      { name: "ChromaDB", color: "bg-purple-500" },
      { name: "Neo4j", color: "bg-orange-500" },
      { name: "Azure OpenAI", color: "bg-blue-600" },
      { name: "LLM-as-Judge", color: "bg-pink-500" },
      { name: "Hybrid RAG", color: "bg-green-500" },
    ],
    github: "https://github.com/AadilUsmani/V.G.RAG",
    demo: "https://deepwiki.com/AadilUsmani/V.G.RAG",
    image: "/images/hybrid-rag.png",
    metrics: { benchmark: "53 Q&As", accuracy: "Outperforms" },
    featured: true,
  },
  {
    title: "Corrective RAG (CRAG)",
    description: "Adaptive self-correcting RAG pipeline with threshold-based routing. Routes CORRECT answers (≥0.7) directly, triggers Tavily web search for INCORRECT (<0.3), and runs parallel operations for AMBIGUOUS responses. Optimized for 3-6s latency on direct retrievals and 5-8s with web-augmented answers over geopolitical documents.",
    tags: [
      { name: "LangGraph", color: "bg-teal-500" },
      { name: "FAISS", color: "bg-blue-500" },
      { name: "Tavily Search", color: "bg-cyan-500" },
      { name: "GPT-4o-mini", color: "bg-green-500" },
      { name: "RAG", color: "bg-purple-500" },
    ],
    github: "https://github.com/AadilUsmani/Corrective_rag_CRAG",
    demo: "https://deepwiki.com/AadilUsmani/Corrective_rag_CRAG",
    image: "/images/crag.png",
    metrics: { latency: "3-8s", accuracy: "95%+" },
    featured: true,
  },
]

const otherProjects = [
  {
    title: "CricTalk",
    description: "Production-ready cricket knowledge chatbot API with 6 specialized expertise domains. Features enterprise-grade security, API key authentication, rate limiting, and Redis-backed caching.",
    tags: [
      { name: "FastAPI", color: "bg-green-500" },
      { name: "Google Gemini AI", color: "bg-blue-500" },
      { name: "Redis", color: "bg-red-500" },
      { name: "LangChain", color: "bg-purple-500" },
      { name: "Security", color: "bg-yellow-500" },
    ],
    github: "https://github.com/AadilUsmani/Cricket_chatbot",
    demo: "https://v0-image-analysis-amber-sigma-22.vercel.app/",
    image: "/images/crictalk.png",
    metrics: { accuracy: "95%", uptime: "99.9%" },
  },
  {
    title: "Article Summarization",
    description: "NLP model using transformer architecture to generate concise summaries of long-form articles with 85% accuracy using T5 small transformer model.",
    tags: [
      { name: "NLP", color: "bg-indigo-500" },
      { name: "Transformers", color: "bg-pink-500" },
      { name: "Python", color: "bg-blue-600" },
      { name: "T5", color: "bg-green-600" },
    ],
    github: "https://github.com/AadilUsmani/news_article_summarizer",
    demo: "https://v0-news-article-summarizer-gamma.vercel.app/",
    image: "/images/article-summarizer.png",
    metrics: { accuracy: "85%", articles: "10K+" },
  },
  {
    title: "Customer Churn Predictor",
    description: "ML model predicting customer churn with 92% accuracy using ensemble methods and feature engineering.",
    tags: [
      { name: "ML", color: "bg-orange-500" },
      { name: "Random Forest", color: "bg-green-500" },
      { name: "Python", color: "bg-blue-600" },
    ],
    github: "https://github.com/AadilUsmani/churn_predictor_",
    demo: "https://kzml2mfup87xwyui0vgq.lite.vusercontent.net/churn-predictor",
    image: "/images/churn-predictor.png",
    metrics: { accuracy: "92%", predictions: "Predictions" },
  },
  {
    title: "Stock Price Prediction",
    description: "LSTM neural networks predicting stock prices using historical data and technical indicators.",
    tags: [
      { name: "Deep Learning", color: "bg-purple-500" },
      { name: "LSTM", color: "bg-red-500" },
      { name: "TensorFlow", color: "bg-orange-600" },
    ],
    github: "https://github.com/AadilUsmani/nvdia_stock_predictor",
    demo: "https://v0-nvidia-stock-dashboard.vercel.app/",
    image: "/images/stock-predictor.png",
    metrics: { accuracy: "78%", predictions: "Predictions" },
  },
]

// ─── Animation Variants ────────────────────────────────────────────────────────

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const sectionHeadingVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const cardGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const heroContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const heroCTAVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 12 },
  },
}

const skillBadgeContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const skillBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
}

// ─── Helper Hooks & Functions ──────────────────────────────────────────────────

function useSpotlight(ref: React.RefObject<HTMLDivElement>) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
    opacity.set(1)
  }

  const handleMouseLeave = () => {
    opacity.set(0)
  }

  const spotlightStyle = useMotionTemplate`radial-gradient(circle 150px at ${x}px ${y}px, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 100%)`

  return { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, spotlightStyle, spotlightOpacity: opacity }
}

function getTagBoxShadow(color: string, alpha = 0.4): string {
  if (color.includes("blue")) return `rgba(59, 130, 246, ${alpha})`
  if (color.includes("green")) return `rgba(34, 197, 94, ${alpha})`
  if (color.includes("purple")) return `rgba(168, 85, 247, ${alpha})`
  if (color.includes("orange")) return `rgba(234, 88, 12, ${alpha})`
  return `rgba(236, 72, 153, ${alpha})`
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function FeaturedProjectCard({
  project,
  index,
  reducedMotion,
}: {
  project: (typeof featuredProjects)[number]
  index: number
  reducedMotion: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const spotlight = useSpotlight(cardRef)

  // Inner-card parallax motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })
  const titleX = useTransform(springX, [-150, 150], [-4, 4])
  const titleY = useTransform(springY, [-150, 150], [-4, 4])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reducedMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = e.clientX - rect.left - rect.width / 2
    const cy = e.clientY - rect.top - rect.height / 2
    mouseX.set(cx)
    mouseY.set(cy)
    spotlight.onMouseMove(e)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.set(0)
    mouseY.set(0)
    spotlight.onMouseLeave()
  }

  return (
    <motion.div
      variants={cardItemVariants}
      whileHover={reducedMotion ? {} : { y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group cursor-custom will-change-transform"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full"
      >
        {/* Spotlight effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none z-0"
          style={{ background: spotlight.spotlightStyle, opacity: spotlight.spotlightOpacity }}
        />
        <Card className="glass-morphism hover:bg-white/10 transition-all duration-500 h-full overflow-hidden group-hover:shadow-2xl group-hover:shadow-purple-500/40 border-0 relative z-10">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30 font-semibold">Featured</Badge>
                {/* Parallax title */}
                <motion.div style={reducedMotion ? {} : { x: titleX, y: titleY }} className="will-change-transform">
                  <CardTitle className="text-white text-xl font-bold">{project.title}</CardTitle>
                </motion.div>
              </div>
              <div className="flex space-x-2">
                <motion.div whileHover={reducedMotion ? {} : { scale: 1.1 }} whileTap={reducedMotion ? {} : { scale: 0.9 }}>
                  <Button variant="ghost" size="sm" asChild className="glass-morphism cursor-custom">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-blue-400" aria-label="View on GitHub">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={reducedMotion ? {} : { scale: 1.1 }} whileTap={reducedMotion ? {} : { scale: 0.9 }}>
                  <Button variant="ghost" size="sm" asChild className="glass-morphism cursor-custom">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-green-400" aria-label="View live demo">
                      <Eye className="w-4 h-4" />
                      <motion.span
                        className="ml-1 text-xs"
                        whileHover={reducedMotion ? {} : { x: 2, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        ↗
                      </motion.span>
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
            <CardDescription className="text-zinc-400 leading-relaxed font-light">{project.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              variants={reducedMotion ? {} : skillBadgeContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {project.tags.map((tag) => (
                <motion.div key={tag.name} variants={reducedMotion ? {} : skillBadgeVariants} whileHover={reducedMotion ? {} : { scale: 1.08, y: -2 }}>
                  <Badge
                    className={`${tag.color} text-white border-2 font-medium cursor-custom shadow-lg hover:shadow-xl transition-all duration-300`}
                    style={{ boxShadow: `0 0 12px ${getTagBoxShadow(tag.color)}` }}
                  >
                    {tag.name}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-between text-sm text-gray-400 pt-4 border-t border-gray-700">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-white font-bold text-lg">{value}</div>
                  <div className="capitalize font-medium">{key}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

function OtherProjectCard({
  project,
  index,
  reducedMotion,
}: {
  project: (typeof otherProjects)[number]
  index: number
  reducedMotion: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const spotlight = useSpotlight(cardRef)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })
  const titleX = useTransform(springX, [-100, 100], [-3, 3])
  const titleY = useTransform(springY, [-100, 100], [-3, 3])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reducedMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
    spotlight.onMouseMove(e)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    spotlight.onMouseLeave()
  }

  return (
    <motion.div
      variants={cardItemVariants}
      whileHover={reducedMotion ? {} : { y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group cursor-custom will-change-transform"
    >
      <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative h-full">
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none z-0"
          style={{ background: spotlight.spotlightStyle, opacity: spotlight.spotlightOpacity }}
        />
        <Card className="glass-morphism hover:bg-white/10 transition-all duration-500 h-full overflow-hidden group-hover:shadow-2xl group-hover:shadow-blue-500/40 border-0 relative z-10">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-2">
              <motion.div style={reducedMotion ? {} : { x: titleX, y: titleY }} className="will-change-transform">
                <CardTitle className="text-white text-lg font-bold">{project.title}</CardTitle>
              </motion.div>
              <div className="flex space-x-1">
                <motion.div whileHover={reducedMotion ? {} : { scale: 1.1 }}>
                  <Button variant="ghost" size="sm" asChild className="glass-morphism p-1 cursor-custom">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400" aria-label="View on GitHub">
                      <Github className="w-3 h-3" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={reducedMotion ? {} : { scale: 1.1 }}>
                  <Button variant="ghost" size="sm" asChild className="glass-morphism p-1 cursor-custom">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 flex items-center" aria-label="View live demo">
                      <Eye className="w-3 h-3" />
                      <motion.span
                        className="ml-0.5 text-xs"
                        whileHover={reducedMotion ? {} : { x: 2, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        ↗
                      </motion.span>
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
            <CardDescription className="text-zinc-400 text-sm leading-relaxed font-light">{project.description}</CardDescription>
          </CardHeader>

          <CardContent className="pt-2">
            <motion.div
              className="flex flex-wrap gap-1 mb-3"
              variants={reducedMotion ? {} : skillBadgeContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {project.tags.map((tag) => (
                <motion.div key={tag.name} variants={reducedMotion ? {} : skillBadgeVariants} whileHover={reducedMotion ? {} : { scale: 1.08, y: -2 }}>
                  <Badge
                    className={`${tag.color} text-white border border-current text-xs font-medium cursor-custom shadow-md hover:shadow-lg transition-all duration-300`}
                    style={{ boxShadow: `0 0 8px ${getTagBoxShadow(tag.color, 0.5)}` }}
                  >
                    {tag.name}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-between text-xs text-gray-400 pt-3 border-t border-gray-700">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-white font-bold">{value}</div>
                  <div className="capitalize font-medium">{key}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

function SkillCard({
  category,
  skills,
  index,
  reducedMotion,
}: {
  category: string
  skills: any[]
  index: number
  reducedMotion: boolean
}) {
  const ref = useRef(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const spotlight = useSpotlight(cardRef)

  const accentColors = [
    "from-blue-500/20 to-cyan-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-green-500/20 to-teal-500/20",
  ]

  return (
    <motion.div
      ref={ref}
      variants={reducedMotion ? {} : cardItemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={spotlight.onMouseMove}
        onMouseLeave={spotlight.onMouseLeave}
        className="relative h-full"
      >
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none z-0"
          style={{ background: spotlight.spotlightStyle, opacity: spotlight.spotlightOpacity }}
        />
        <Card className={`glass-morphism hover:bg-white/10 transition-all duration-500 h-full border-l-4 border-l-blue-500 bg-gradient-to-br ${accentColors[index % 3]} relative z-10`}>
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-xl font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {category}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div
              variants={reducedMotion ? {} : skillBadgeContainerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  variants={reducedMotion ? {} : skillBadgeVariants}
                  className="group/skill cursor-custom mb-6 last:mb-0"
                  whileHover={reducedMotion ? {} : { x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="text-white font-medium">{skill.name}</span>
                    </div>
                    <span className="text-gray-400 text-sm font-mono">{skill.level}%</span>
                  </div>

                  <div className="relative">
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} skill-progress relative`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.15 + skillIndex * 0.08, ease: "easeOut" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute z-10 bg-black/90 text-white text-xs p-2 rounded-lg mt-2 pointer-events-none opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
                    {skill.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

// Floating label input wrapper for contact form
function FloatingInput({
  id,
  name,
  type = "text",
  label,
  placeholder,
  required,
  maxLength,
  disabled,
  reducedMotion,
}: {
  id: string
  name: string
  type?: string
  label: string
  placeholder: string
  required?: boolean
  maxLength?: number
  disabled?: boolean
  reducedMotion: boolean
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium mb-2 text-white">{label}</label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={type}
          className="glass-morphism text-white placeholder:text-gray-400 border-white/20 focus:border-blue-400 transition-all duration-300 cursor-custom"
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {/* Animated focus underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={reducedMotion ? {} : { scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

function FloatingTextarea({
  id,
  name,
  label,
  placeholder,
  required,
  maxLength,
  disabled,
  reducedMotion,
}: {
  id: string
  name: string
  label: string
  placeholder: string
  required?: boolean
  maxLength?: number
  disabled?: boolean
  reducedMotion: boolean
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium mb-2 text-white">{label}</label>
      <div className="relative">
        <Textarea
          id={id}
          name={name}
          className="glass-morphism text-white placeholder:text-gray-400 border-white/20 focus:border-blue-400 min-h-32 transition-all duration-300 cursor-custom"
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={reducedMotion ? {} : { scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// Magnetic submit button
function MagneticButton({
  children,
  className,
  onClick,
  type,
  disabled,
  reducedMotion,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "submit" | "button"
  disabled?: boolean
  reducedMotion: boolean
}) {
  const btnRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 300, damping: 20 }
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current || reducedMotion) return
    const rect = btnRef.current.getBoundingClientRect()
    const cx = e.clientX - rect.left - rect.width / 2
    const cy = e.clientY - rect.top - rect.height / 2
    x.set(cx * 0.25)
    y.set(cy * 0.25)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div ref={btnRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div
        style={reducedMotion ? {} : { x: sx, y: sy }}
        whileHover={reducedMotion ? {} : { scale: 1.03 }}
        whileTap={reducedMotion ? {} : { scale: 0.97 }}
        className="will-change-transform"
      >
        <Button
          type={type}
          size="lg"
          disabled={disabled}
          className={className}
          onClick={onClick}
        >
          {children}
        </Button>
      </motion.div>
    </div>
  )
}

// ─── Main Portfolio Component ──────────────────────────────────────────────────

export default function Portfolio() {
  const reducedMotion = useReducedMotion() ?? false

  const [activeSection, setActiveSection] = useState("about")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; tx: number; ty: number; duration: number }>
  | null>(null)

  const { scrollY, scrollYProgress } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])

  // Nav background on scroll
  const navBg = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"])

  // Scroll progress ring (circumference for r=20)
  const circumference = 2 * Math.PI * 20
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [circumference, 0])

  // Active section detector
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100
      setShowBackToTop(window.scrollY > 300)
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Dark mode class toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Particle generation
  useEffect(() => {
    const generateParticles = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      setParticles(
        Array.from({ length: 20 }, (_, idx) => ({
          id: idx,
          x: Math.random() * w,
          y: Math.random() * h,
          tx: Math.random() * w,
          ty: Math.random() * h,
          duration: Math.random() * 20 + 10,
        }))
      )
    }
    generateParticles()
    window.addEventListener("resize", generateParticles)
    return () => window.removeEventListener("resize", generateParticles)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setSubmitMessage("")

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus("success")
        setSubmitMessage(result.message || "Message sent successfully!")
        if (form) form.reset()
        setTimeout(() => { setSubmitStatus("idle"); setSubmitMessage("") }, 8000)
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Contact form error:", error)
      setSubmitStatus("error")
      setSubmitMessage(error instanceof Error ? error.message : "Unable to send message. Please use the direct email link below.")
      setTimeout(() => { setSubmitStatus("idle"); setSubmitMessage("") }, 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white text-gray-900 dark:bg-black dark:text-white">

      {/* ── Navigation ──────────────────────────────────────────────────── */}
      <motion.nav
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{ backgroundColor: reducedMotion ? "rgba(0,0,0,0.85)" : navBg, backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            Muhammad Adil Usmani
          </motion.div>

          {/* Desktop Navigation with sliding indicator */}
          <div className="hidden md:flex space-x-2">
            {["about", "skills", "projects", "contact"].map((section, i) => (
              <motion.button
                key={section}
                initial={reducedMotion ? {} : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                onClick={() => scrollToSection(section)}
                className="relative capitalize px-4 py-2 rounded-lg font-medium cursor-custom transition-colors duration-300 hover:text-white"
                whileHover={reducedMotion ? {} : { scale: 1.05 }}
                whileTap={reducedMotion ? {} : { scale: 0.95 }}
              >
                {activeSection === section && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={activeSection === section ? "text-white" : "text-zinc-400 hover:text-white"}>
                  {section}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={reducedMotion ? {} : { scale: 1.05 }}
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
            >
              <a
                href="/Muhammad_Adil_Usmani_cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-morphism px-4 py-2 rounded-lg font-medium cursor-custom hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-sm hidden sm:flex"
              >
                Resume ↗
              </a>
            </motion.div>

            {/* Dark mode toggle with morphing icon */}
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="glass-morphism p-2 rounded-lg cursor-custom relative overflow-hidden"
              whileHover={reducedMotion ? {} : { scale: 1.1, boxShadow: "0 0 16px rgba(168,85,247,0.5)" }}
              whileTap={reducedMotion ? {} : { scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={reducedMotion ? {} : { scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={reducedMotion ? {} : { scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={reducedMotion ? {} : { scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={reducedMotion ? {} : { scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.div whileHover={reducedMotion ? {} : { scale: 1.1 }} className="hidden sm:block">
              <Button variant="ghost" size="icon" asChild className="glass-morphism cursor-custom">
                <a href="https://github.com/AadilUsmani" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={reducedMotion ? {} : { scale: 1.1 }} className="hidden sm:block">
              <Button variant="ghost" size="icon" asChild className="glass-morphism cursor-custom">
                <a href="https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden glass-morphism p-2 rounded-lg cursor-custom"
              whileHover={reducedMotion ? {} : { scale: 1.1 }}
              whileTap={reducedMotion ? {} : { scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="x" initial={reducedMotion ? {} : { rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={reducedMotion ? {} : { rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={reducedMotion ? {} : { rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={reducedMotion ? {} : { rotate: -90, scale: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-3">
                {["about", "skills", "projects", "contact"].map((section, index) => (
                  <motion.button
                    key={section}
                    initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => { scrollToSection(section); setIsMobileMenuOpen(false) }}
                    className={`w-full text-left capitalize py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      activeSection === section
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "hover:bg-white/10 text-zinc-400"
                    }`}
                  >
                    {section}
                  </motion.button>
                ))}
                <motion.a
                  initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  href="/Muhammad_Adil_Usmani_cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left py-3 px-4 rounded-lg font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resume ↗
                </motion.a>
                <div className="flex gap-3 pt-3">
                  {[
                    { href: "https://github.com/AadilUsmani", icon: Github, delay: 0.5 },
                    { href: "https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314/", icon: Linkedin, delay: 0.6 },
                  ].map(({ href, icon: Icon, delay }) => (
                    <motion.div
                      key={href}
                      initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay, duration: 0.3 }}
                      whileHover={reducedMotion ? {} : { scale: 1.1 }}
                      className="flex-1"
                    >
                      <Button variant="ghost" asChild className="glass-morphism w-full cursor-custom hover:bg-white/20 text-zinc-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          <Icon className="w-4 h-4" />
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Back to Top — SVG Progress Ring ─────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={reducedMotion ? {} : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? {} : { opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-8 right-8 z-50 cursor-custom will-change-transform"
            whileHover={reducedMotion ? {} : { scale: 1.1 }}
            whileTap={reducedMotion ? {} : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <svg width="52" height="52" viewBox="0 0 52 52" className="rotate-[-90deg]">
              {/* Background track */}
              <circle cx="26" cy="26" r="20" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              {/* Progress arc */}
              <motion.circle
                cx="26"
                cy="26"
                r="20"
                fill="none"
                stroke="url(#progressGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{ strokeDashoffset }}
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            {/* Icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <ArrowUp className="w-5 h-5 text-white" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-pattern">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-900/30" />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0" suppressHydrationWarning>
          {particles?.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-1 h-1 bg-white/20 rounded-full will-change-transform"
              initial={reducedMotion ? {} : { x: p.x, y: p.y, opacity: 0 }}
              animate={reducedMotion ? {} : { x: p.tx, y: p.ty, opacity: 0.6 }}
              transition={{
                x: { duration: p.duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                y: { duration: p.duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                opacity: { duration: 2, delay: p.id * 0.1 },
              }}
            />
          ))}
        </div>

        {/* Parallax orbs */}
        <motion.div
          style={{ y: y1 }}
          animate={reducedMotion ? {} : { scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          animate={reducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />

        {/* Floating tech icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { icon: Code2, position: "top-1/4 left-1/6", color: "text-blue-400/30", delay: 0 },
            { icon: Zap, position: "top-1/3 right-1/6", color: "text-yellow-400/30", delay: 1 },
            { icon: Github, position: "bottom-1/4 left-1/5", color: "text-green-400/30", delay: 2 },
            { icon: Brain, position: "top-2/3 right-1/4", color: "text-purple-400/30", delay: 0.5 },
            { icon: Database, position: "bottom-1/3 right-1/6", color: "text-cyan-400/30", delay: 1.5 },
          ].map((item, index) => (
            <motion.div
              key={index}
              animate={reducedMotion ? {} : { y: [0, -20 + index * 5, 0], x: [0, 10 - index * 2, 0], rotate: [0, 5 - index * 2, 0] }}
              transition={{ duration: 4 + index, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: item.delay }}
              className={`absolute ${item.position} ${item.color}`}
            >
              <item.icon className="w-8 h-8" />
            </motion.div>
          ))}
        </div>

        {/* Hero content — choreographed stagger entrance */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center pt-16"
            variants={reducedMotion ? {} : heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* H1 name */}
            <motion.div variants={reducedMotion ? {} : heroItemVariants} className="mb-6">
              <motion.h1
                className="hero-title text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6 leading-tight drop-shadow-2xl will-change-transform"
                whileHover={reducedMotion ? {} : { scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Engineering Intelligence with AI &amp; Machine Learning
              </motion.h1>
            </motion.div>

            {/* Subtitle — word-by-word stagger */}
            <motion.div variants={reducedMotion ? {} : heroItemVariants} className="mb-6">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mb-8">
                {reducedMotion
                  ? "Specializing in LLM Development & Advanced RAG Architectures"
                  : "Specializing in LLM Development & Advanced RAG Architectures"
                    .split(" ")
                    .map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-[0.3em]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 + i * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        {word}
                      </motion.span>
                    ))}
              </div>
            </motion.div>

            {/* Download button */}
            <motion.div variants={reducedMotion ? {} : heroCTAVariants} className="mb-8">
              <a
                href="/Muhammad_Adil_Usmani_cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Resume PDF"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl font-bold text-lg transition-all duration-300 hover:scale-105 will-change-transform"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </motion.div>

            {/* Description paragraph */}
            <motion.p
              variants={reducedMotion ? {} : heroItemVariants}
              className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-5xl mx-auto leading-relaxed font-light"
            >
              Building intelligent systems that solve real-world problems through data-driven insights and innovative
              algorithms. Specializing in machine learning, natural language processing, and production-ready AI
              applications.
            </motion.p>

            {/* CTA buttons — spring pop */}
            <motion.div
              variants={reducedMotion ? {} : { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div variants={reducedMotion ? {} : heroCTAVariants} whileHover={reducedMotion ? {} : { scale: 1.05, y: -2 }} whileTap={reducedMotion ? {} : { scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 text-lg shadow-2xl border-0 cursor-custom will-change-transform"
                >
                  <span className="flex items-center gap-2">
                    View My Work
                    <ExternalLink className="w-5 h-5" />
                  </span>
                </Button>
              </motion.div>

              <motion.div variants={reducedMotion ? {} : heroCTAVariants} whileHover={reducedMotion ? {} : { scale: 1.05, y: -2 }} whileTap={reducedMotion ? {} : { scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="glass-morphism text-white hover:bg-white/20 font-semibold px-8 py-4 text-lg shadow-2xl transition-all duration-300 cursor-custom will-change-transform"
                >
                  <span className="flex items-center gap-2">
                    Get In Touch
                    <Mail className="w-5 h-5" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-custom"
            onClick={() => scrollToSection("skills")}
          >
            <motion.div
              animate={reducedMotion ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="text-gray-400 text-sm mb-2 font-light"
            >
              Scroll to explore
            </motion.div>
            <motion.div
              animate={reducedMotion ? {} : { y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={reducedMotion ? {} : { y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
                className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* ── SKILLS SECTION ──────────────────────────────────────────────── */}
      <section id="skills" className="min-h-screen flex items-center py-32 bg-gradient-to-b from-black to-gray-900/50 relative">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <motion.div
            variants={reducedMotion ? {} : sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.h2
              variants={reducedMotion ? {} : sectionHeadingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100"
            >
              Technical Expertise
            </motion.h2>
            <motion.p
              variants={reducedMotion ? {} : sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-2xl mx-auto font-light"
            >
              Mastering cutting-edge technologies to build intelligent solutions
            </motion.p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
            variants={reducedMotion ? {} : cardGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {Object.entries(skillsData).map(([category, skills], index) => (
              <SkillCard key={category} category={category} skills={skills} index={index} reducedMotion={reducedMotion} />
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* ── PROJECTS SECTION ────────────────────────────────────────────── */}
      <section id="projects" className="min-h-screen py-32 bg-gradient-to-b from-gray-900/50 to-black relative">
        <div className="absolute inset-0 bg-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={reducedMotion ? {} : sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-left mb-20"
          >
            <motion.h2
              variants={reducedMotion ? {} : sectionHeadingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100"
            >
              Projects
            </motion.h2>
            <p className="text-xl text-zinc-400 max-w-2xl font-light">
              Showcasing production-ready applications and innovative solutions
            </p>
          </motion.div>

          {/* Featured projects */}
          <div className="mb-20">
            <motion.h3
              variants={reducedMotion ? {} : sectionHeadingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-8 flex items-center gap-2"
            >
              <Star className="w-6 h-6 text-yellow-400" />
              Featured Projects
            </motion.h3>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              variants={reducedMotion ? {} : cardGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {featuredProjects.map((project, index) => (
                <FeaturedProjectCard key={project.title} project={project} index={index} reducedMotion={reducedMotion} />
              ))}
            </motion.div>
          </div>

          {/* Other projects */}
          <div>
            <motion.h3
              variants={reducedMotion ? {} : sectionHeadingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-8 flex items-center gap-2"
            >
              <Code2 className="w-6 h-6 text-blue-400" />
              Other Projects
            </motion.h3>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={reducedMotion ? {} : cardGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {otherProjects.map((project, index) => (
                <OtherProjectCard key={project.title} project={project} index={index} reducedMotion={reducedMotion} />
              ))}
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* ── CONTACT SECTION ─────────────────────────────────────────────── */}
      <section id="contact" className="min-h-screen flex items-center py-32 bg-gradient-to-b from-black to-gray-900/50 relative">
        <div className="absolute inset-0 bg-pattern opacity-5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <motion.div
            variants={reducedMotion ? {} : sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={reducedMotion ? {} : sectionHeadingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100"
            >
              Get In Touch
            </motion.h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
              Ready to collaborate on innovative AI/ML projects? Let&apos;s build something amazing together.
            </p>
          </motion.div>

          <motion.div
            variants={reducedMotion ? {} : sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="glass-morphism hover:bg-white/5 transition-all duration-300 border-0">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput
                      id="name"
                      name="name"
                      label="Name"
                      placeholder="Your name"
                      required
                      maxLength={100}
                      disabled={isSubmitting}
                      reducedMotion={reducedMotion}
                    />
                    <FloatingInput
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="your.email@example.com"
                      required
                      maxLength={254}
                      disabled={isSubmitting}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                  <FloatingInput
                    id="subject"
                    name="subject"
                    label="Subject"
                    placeholder="What's this about?"
                    required
                    maxLength={200}
                    disabled={isSubmitting}
                    reducedMotion={reducedMotion}
                  />
                  <FloatingTextarea
                    id="message"
                    name="message"
                    label="Message"
                    placeholder="Tell me about your project or opportunity..."
                    required
                    maxLength={5000}
                    disabled={isSubmitting}
                    reducedMotion={reducedMotion}
                  />

                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 glass-morphism border border-green-500/30 rounded-lg"
                      >
                        <p className="text-green-400 font-medium">✅ {submitMessage}</p>
                      </motion.div>
                    )}
                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 glass-morphism border border-red-500/30 rounded-lg"
                      >
                        <p className="text-red-400 font-medium">❌ {submitMessage}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold disabled:opacity-50 transition-all duration-300 cursor-custom shadow-2xl"
                    reducedMotion={reducedMotion}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </MagneticButton>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={reducedMotion ? {} : sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-zinc-400 mb-4 font-light">Or connect directly:</p>
            <div className="flex justify-center space-x-6">
              {[
                {
                  href: "https://mail.google.com/mail/?view=cm&to=muhammadaadilusmani@gmail.com&su=Portfolio%20Contact&body=Hi%20Muhammad,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect.%0D%0A%0D%0ABest%20regards,",
                  icon: Mail,
                  label: "Email",
                  color: "hover:text-blue-400",
                },
                { href: "https://github.com/AadilUsmani", icon: Github, label: "GitHub", color: "hover:text-gray-300" },
                { href: "https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314/", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
              ].map((social) => (
                <motion.div key={social.label} whileHover={reducedMotion ? {} : { scale: 1.1, y: -2 }}>
                  <Button variant="ghost" asChild className="glass-morphism cursor-custom">
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className={`flex items-center text-white ${social.color} transition-colors duration-300`}>
                      <social.icon className="w-4 h-4 mr-2" />
                      {social.label}
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-8 border-t border-gray-800/50 glass-morphism">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-zinc-400 font-light">© {new Date().getFullYear()} Muhammad Adil Usmani. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
