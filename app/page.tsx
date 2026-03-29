"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"
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
    { name: "GitHub", level: 90, icon: "🐙", color: "from-gray-700 to-black", description: "Version control and collaboration" },
    { name: "Docker", level: 85, icon: "🐳", color: "from-blue-500 to-cyan-500", description: "Container orchestration" },
    { name: "GitHub Actions", level: 84, icon: "⚙️", color: "from-purple-500 to-blue-500", description: "CI/CD automation" },
    { name: "Render", level: 83, icon: "🚀", color: "from-blue-500 to-purple-500", description: "Cloud deployment platform" },
    { name: "Vercel", level: 87, icon: "▲", color: "from-black to-gray-600", description: "Frontend deployment platform" },
    { name: "Azure", level: 78, icon: "☁️", color: "from-blue-600 to-cyan-500", description: "Microsoft cloud services" },
    { name: "GCP", level: 75, icon: "🌐", color: "from-red-500 to-yellow-500", description: "Google Cloud Platform" },
    { name: "GitHub Copilot", level: 82, icon: "✨", color: "from-yellow-500 to-orange-500", description: "AI code assistant" },
    { name: "Gemini CLI", level: 80, icon: "🎯", color: "from-purple-500 to-blue-500", description: "AI command line tools" },
    { name: "Deepwiki", level: 80, icon: "📚", color: "from-green-500 to-teal-500", description: "Project documentation platform" },
    { name: "Airflow", level: 78, icon: "🔄", color: "from-orange-500 to-red-500", description: "Workflow orchestration" },
  ],
}

const featuredProjects = [
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
    description:
      "Production-ready cricket knowledge chatbot API with 6 specialized expertise domains. Features enterprise-grade security, API key authentication, rate limiting, and Redis-backed caching.",
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
    description:
      "NLP model using transformer architecture to generate concise summaries of long-form articles with 85% accuracy using T5 small transformer model.",
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
    demo: "https://preview-nvidia-stock-dashboard-kzmqjnlxx9b97rmuji28.vusercontent.net/",
    image: "/images/stock-predictor.png",
    metrics: { accuracy: "78%", predictions: "Predictions" },
  },
]

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  
  * {
    font-family: 'Inter', sans-serif;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .glass-morphism {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    border-radius: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, #2563eb, #7c3aed);
  }
  html {
    scroll-behavior: smooth;
  }
  .skill-progress {
    border-radius: 8px;
  }
  .bg-pattern {
    background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
    background-size: 20px 20px;
  }
  .cursor-custom {
    cursor: pointer;
  }
  .cursor-custom:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease;
  }
`

function SkillCard({ category, skills, index }: { category: string; skills: any[]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const accentColors = [
    "from-blue-500/20 to-cyan-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-green-500/20 to-teal-500/20",
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group"
    >
      <Card
        className={`glass-morphism hover:bg-white/10 transition-all duration-500 h-full border-l-4 border-l-blue-500 bg-gradient-to-br ${accentColors[index % 3]}`}
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-xl font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            {category}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {skills.map((skill, skillIndex) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.2 + skillIndex * 0.1 }}
              className="group/skill cursor-custom"
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
                    transition={{ duration: 1.5, delay: index * 0.2 + skillIndex * 0.1, ease: "easeOut" }}
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
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute z-10 bg-black/90 text-white text-xs p-2 rounded-lg mt-2 pointer-events-none opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"
              >
                {skill.description}
              </motion.div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])

  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.textContent = style
    document.head.appendChild(styleElement)
    return () => document.head.removeChild(styleElement)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      setShowBackToTop(window.scrollY > 500)

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus("success")
        setSubmitMessage(result.message || "Message sent successfully!")

        if (form) {
          form.reset()
        }

        setTimeout(() => {
          setSubmitStatus("idle")
          setSubmitMessage("")
        }, 8000)
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Contact form error:", error)
      setSubmitStatus("error")
      setSubmitMessage(
        error instanceof Error ? error.message : "Unable to send message. Please use the direct email link below.",
      )

      setTimeout(() => {
        setSubmitStatus("idle")
        setSubmitMessage("")
      }, 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {/* Glass-morphism Navigation */}
      <nav className="fixed top-0 w-full glass-morphism z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold"
          >
            Muhammad Adil Usmani
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["about", "skills", "projects", "contact"].map((section) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize transition-all duration-300 px-4 py-2 rounded-lg font-medium cursor-custom ${
                  activeSection === section
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section}
              </motion.button>
            ))}
          </div>
          
          {/* Right Side Icons & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="/Muhammad Adil Usmani — Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-morphism px-4 py-2 rounded-lg font-medium cursor-custom hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-sm hidden sm:flex"
              >
                Resume ↗
              </a>
            </motion.div>
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="glass-morphism p-2 rounded-lg cursor-custom"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }} className="hidden sm:block">
              <Button variant="ghost" size="icon" asChild className="glass-morphism cursor-custom">
                <a href="https://github.com/AadilUsmani" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="hidden sm:block">
              <Button variant="ghost" size="icon" asChild className="glass-morphism cursor-custom">
                <a
                  href="https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
            
            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden glass-morphism p-2 rounded-lg cursor-custom"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu Panel */}
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
                {/* Mobile Navigation Links */}
                {["about", "skills", "projects", "contact"].map((section, index) => (
                  <motion.button
                    key={section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => {
                      scrollToSection(section)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full text-left capitalize py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      activeSection === section
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "hover:bg-white/10 text-zinc-400"
                    }`}
                  >
                    {section}
                  </motion.button>
                ))}
                
                {/* Mobile Resume Button */}
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  href="/Muhammad Adil Usmani — Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left py-3 px-4 rounded-lg font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resume ↗
                </motion.a>
                
                {/* Mobile Social Links */}
                <div className="flex gap-3 pt-3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex-1"
                  >
                    <Button
                      variant="ghost"
                      asChild
                      className="glass-morphism w-full cursor-custom hover:bg-white/20 text-zinc-400 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <a href="https://github.com/AadilUsmani" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex-1"
                  >
                    <Button
                      variant="ghost"
                      asChild
                      className="glass-morphism w-full cursor-custom hover:bg-white/20 text-zinc-400 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <a
                        href="https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 glass-morphism p-4 rounded-full hover:bg-white/20 transition-all duration-300 cursor-custom shadow-2xl"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero/About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-pattern">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-900/30" />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
              }}
              animate={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Parallax Background Elements with Breathing Animation */}
        <motion.div
          style={{ y: y1 }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />

        {/* Floating Tech Icons */}
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
              animate={{
                y: [0, -20 + index * 5, 0],
                x: [0, 10 - index * 2, 0],
                rotate: [0, 5 - index * 2, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: item.delay,
              }}
              className={`absolute ${item.position} ${item.color}`}
            >
              <item.icon className="w-8 h-8" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-center">
              {/* Professional Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  {/* Glowing Ring Background */}
                  <motion.div
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg -z-10 scale-110"
                  />
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-0.5 shadow-2xl shadow-blue-500/50">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">MA</span>
                    </div>
                  </div>
                  {/* Subtle pulsing outer ring */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.4)",
                        "0 0 40px rgba(168, 85, 247, 0.6)",
                        "0 0 20px rgba(59, 130, 246, 0.4)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500/30 to-purple-500/30 bg-clip-border"
                  />
                </div>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-6"
              >
                <motion.h1
                  className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4 leading-tight drop-shadow-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  whileHover={{
                    textShadow: "0 0 30px rgba(96, 165, 250, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)",
                  }}
                >
                  Muhammad Adil Usmani
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mb-8"
                >
                  AI/ML Developer
                </motion.div>
              </motion.div>

  {/* Download Resume Button */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.8 }}
    className="mb-8"
  >
    <a
      href="/Muhammad Adil Usmani — Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="project-link inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl font-bold text-lg transition-all duration-300 hover:scale-105"
    >
      Download Resume ↗
    </a>
  </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-5xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                Building intelligent systems that solve real-world problems through data-driven insights and innovative
                algorithms. Specializing in machine learning, natural language processing, and production-ready AI
                applications.
              </motion.p>

              {/* Enhanced CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("projects")}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 text-lg shadow-2xl border-0 cursor-custom"
                  >
                    <span className="flex items-center gap-2">
                      View My Work
                      <ExternalLink className="w-5 h-5" />
                    </span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("contact")}
                    className="glass-morphism text-white hover:bg-white/20 font-semibold px-8 py-4 text-lg shadow-2xl transition-all duration-300 cursor-custom"
                  >
                    <span className="flex items-center gap-2">
                      Get In Touch
                      <Mail className="w-5 h-5" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-custom"
            onClick={() => scrollToSection("skills")}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-gray-400 text-sm mb-2 font-light"
            >
              Scroll to explore
            </motion.div>
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Section Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* Enhanced Skills Section */}
      <section
        id="skills"
        className="min-h-screen flex items-center py-32 bg-gradient-to-b from-black to-gray-900/50 relative"
      >
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Technical Expertise
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Mastering cutting-edge technologies to build intelligent solutions
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {Object.entries(skillsData).map(([category, skills], index) => (
              <SkillCard key={category} category={category} skills={skills} index={index} />
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* Premium Projects Section */}
      <section id="projects" className="min-h-screen py-32 bg-gradient-to-b from-gray-900/50 to-black relative">
        <div className="absolute inset-0 bg-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
              Featured Projects
            </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
              Showcasing production-ready applications and innovative solutions
            </p>
          </motion.div>

          {/* Featured Projects */}
          <div className="mb-20">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-8 flex items-center gap-2"
            >
              <Star className="w-6 h-6 text-yellow-400" />
              Featured Projects
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group cursor-custom"
                >
                  <Card className="glass-morphism hover:bg-white/10 transition-all duration-500 h-full overflow-hidden group-hover:shadow-2xl group-hover:shadow-purple-500/40 border-0">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30 font-semibold">
                            Featured
                          </Badge>
                          <CardTitle className="text-white text-xl font-bold">{project.title}</CardTitle>
                        </div>
                        <div className="flex space-x-2">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="ghost" size="sm" asChild className="glass-morphism cursor-custom">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-white hover:text-blue-400"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="ghost" size="sm" asChild className="glass-morphism cursor-custom">
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-white hover:text-green-400"
                              >
                                <Eye className="w-4 h-4" />
                              </a>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                      <CardDescription className="text-zinc-400 leading-relaxed font-light">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <motion.div key={tag.name} whileHover={{ scale: 1.08, y: -2 }}>
                            <Badge className={`${tag.color} text-white border-2 font-medium cursor-custom shadow-lg hover:shadow-xl transition-all duration-300`} style={{
                              boxShadow: `0 0 12px ${tag.color.includes('blue') ? 'rgba(59, 130, 246, 0.4)' : tag.color.includes('green') ? 'rgba(34, 197, 94, 0.4)' : tag.color.includes('purple') ? 'rgba(168, 85, 247, 0.4)' : tag.color.includes('orange') ? 'rgba(234, 88, 12, 0.4)' : 'rgba(236, 72, 153, 0.4)'}`
                            }}>
                              {tag.name}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>

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
                </motion.div>
              ))}
            </div>
          </div>

          {/* Other Projects */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-8 flex items-center gap-2"
            >
              <Code2 className="w-6 h-6 text-blue-400" />
              Other Projects
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group cursor-custom"
                >
                  <Card className="glass-morphism hover:bg-white/10 transition-all duration-500 h-full overflow-hidden group-hover:shadow-2xl group-hover:shadow-blue-500/40 border-0">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-white text-lg font-bold">{project.title}</CardTitle>
                          <div className="flex space-x-1">
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <Button variant="ghost" size="sm" asChild className="glass-morphism p-1 cursor-custom">
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white hover:text-blue-400"
                                >
                                  <Github className="w-3 h-3" />
                                </a>
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <Button variant="ghost" size="sm" asChild className="glass-morphism p-1 cursor-custom">
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white hover:text-green-400"
                                >
                                  <Eye className="w-3 h-3" />
                                </a>
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                        <CardDescription className="text-zinc-400 text-sm leading-relaxed font-light">
                          {project.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-2">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tags.map((tag) => (
                            <motion.div key={tag.name} whileHover={{ scale: 1.08, y: -2 }}>
                              <Badge className={`${tag.color} text-white border border-current text-xs font-medium cursor-custom shadow-md hover:shadow-lg transition-all duration-300`} style={{
                                boxShadow: `0 0 8px ${tag.color.includes('blue') ? 'rgba(59, 130, 246, 0.5)' : tag.color.includes('green') ? 'rgba(34, 197, 94, 0.5)' : tag.color.includes('purple') ? 'rgba(168, 85, 247, 0.5)' : tag.color.includes('orange') ? 'rgba(234, 88, 12, 0.5)' : 'rgba(236, 72, 153, 0.5)'}`
                              }}>
                                {tag.name}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>

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
                  </motion.div>
                ))}
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center py-32 bg-gradient-to-b from-black to-gray-900/50 relative"
      >
        <div className="absolute inset-0 bg-pattern opacity-5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
              Get In Touch
            </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
              Ready to collaborate on innovative AI/ML projects? Let's build something amazing together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass-morphism hover:bg-white/5 transition-all duration-300 border-0">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label className="block text-sm font-medium mb-2 text-white">Name</label>
                      <Input
                        name="name"
                        className="glass-morphism text-white placeholder:text-gray-400 border-white/20 focus:border-blue-400 transition-all duration-300 cursor-custom"
                        placeholder="Your name"
                        required
                        disabled={isSubmitting}
                      />
                    </motion.div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label className="block text-sm font-medium mb-2 text-white">Email</label>
                      <Input
                        name="email"
                        type="email"
                        className="glass-morphism text-white placeholder:text-gray-400 border-white/20 focus:border-blue-400 transition-all duration-300 cursor-custom"
                        placeholder="your.email@example.com"
                        required
                        disabled={isSubmitting}
                      />
                    </motion.div>
                  </div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium mb-2 text-white">Subject</label>
                    <Input
                      name="subject"
                      className="glass-morphism text-white placeholder:text-gray-400 border-white/20 focus:border-blue-400 transition-all duration-300 cursor-custom"
                      placeholder="What's this about?"
                      required
                      disabled={isSubmitting}
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium mb-2 text-white">Message</label>
                    <Textarea
                      name="message"
                      className="glass-morphism text-white placeholder:text-gray-400 border-white/20 focus:border-blue-400 min-h-32 transition-all duration-300 cursor-custom"
                      placeholder="Tell me about your project or opportunity..."
                      required
                      disabled={isSubmitting}
                    />
                  </motion.div>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 glass-morphism border border-green-500/30 rounded-lg"
                    >
                      <p className="text-green-400 font-medium">✅ {submitMessage}</p>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 glass-morphism border border-red-500/30 rounded-lg"
                    >
                      <p className="text-red-400 font-medium">❌ {submitMessage}</p>
                    </motion.div>
                  )}

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold disabled:opacity-50 transition-all duration-300 cursor-custom shadow-2xl"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
                {
                  href: "https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314/",
                  icon: Linkedin,
                  label: "LinkedIn",
                  color: "hover:text-blue-400",
                },
              ].map((social) => (
                <motion.div key={social.label} whileHover={{ scale: 1.1, y: -2 }}>
                  <Button variant="ghost" asChild className="glass-morphism cursor-custom">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center text-white ${social.color} transition-colors duration-300`}
                    >
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

      <footer className="py-8 border-t border-gray-800/50 glass-morphism">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-zinc-400 font-light">© 2025 Muhammad Adil Usmani. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
