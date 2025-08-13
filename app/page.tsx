"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Database,
  Brain,
  BarChart3,
  MessageSquare,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const skills = {
  "Programming Languages": ["Python (Primary)", "C++", "SQL"],
  "Machine Learning & AI": [
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Deep Learning",
    "Neural Networks",
    "Natural Language Processing (NLP)",
    "LangChain",
  ],
  "APIs & Frameworks": ["FastAPI", "REST APIs", "Google Gemini AI", "T5 Transformers"],
}

const projects = [
  {
    title: "CricTalk",
    description:
      "Developed and deployed a production-ready cricket knowledge chatbot API with 6 specialized expertise domains (rules, players, history, statistics, techniques). Implemented enterprise-grade security features including API key authentication, rate limiting (30 req/min), and advanced prompt injection prevention. Currently live on Render with Redis-backed caching, serving cricket enthusiasts globally with expert-level responses and comprehensive monitoring dashboard.",
    tags: ["FastAPI", "Google Gemini AI", "Redis", "LangChain", "Security", "Vercel"],
    github: "https://github.com/AadilUsmani/Cricket_chatbot",
    demo: "https://v0-image-analysis-amber-sigma-22.vercel.app/",
    icon: <MessageSquare className="w-6 h-6" />,
  },
  {
    title: "Article Summarization",
    description:
      "Built an NLP model using transformer architecture to automatically generate concise summaries of long-form articles with 85% accuracy using T5 small.",
    tags: ["NLP", "Transformers", "Python", "T5"],
    github: "https://github.com/AadilUsmani/news_article_summarizer",
    demo: "https://v0-news-article-summarizer-gamma.vercel.app/",
    icon: <Brain className="w-6 h-6" />,
  },
  {
    title: "Customer Churn Predictor",
    description:
      "Developed a machine learning model to predict customer churn with 92% accuracy using ensemble methods and feature engineering.",
    tags: ["Supervised Learning", "Random Forest", "Feature Engineering", "Python"],
    github: "https://github.com/AadilUsmani/churn_predictor_",
    demo: "https://kzml2mfup87xwyui0vgq.lite.vusercontent.net/churn-predictor",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    title: "Stock Price Prediction",
    description:
      "Implemented LSTM neural networks to predict stock prices using historical data and technical indicators with time series analysis.",
    tags: ["Deep Learning", "LSTM", "Time Series", "TensorFlow"],
    github: "https://github.com/AadilUsmani/nvdia_stock_predictor",
    demo: "https://preview-nvidia-stock-dashboard-kzmqjnlxx9b97rmuji28.vusercontent.net/",
    icon: <Database className="w-6 h-6" />,
  },
]

const style = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
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

  const cvUrl = "https://github.com/AadilUsmani/portfolio_adil_usmani/raw/main/Adil_Usmani_resume.pdf"

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-white"
            >
              Muhammad Adil Usmani
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["about", "skills", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section ? "text-white" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/AadilUsmani" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 text-white" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero/About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Muhammad Adil Usmani</h1>
              <span className="text-2xl md:text-3xl text-white font-semibold mb-8 block">AI/ML Developer</span>

              {/* Download Resume Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-8"
              >
                <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold">
                  <a
                    href={cvUrl}
                    download="Muhammad-Adil-Usmani-CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </a>
                </Button>
              </motion.div>

              <p className="text-xl text-white mb-8 max-w-4xl mx-auto leading-relaxed">
                Building intelligent systems that solve real-world problems through data-driven insights and innovative
                algorithms. Specializing in machine learning, natural language processing, and production-ready AI
                applications.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="bg-black text-white border border-white hover:bg-gray-800"
                >
                  View My Work
                </Button>
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="bg-black text-white border border-white hover:bg-gray-800"
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 animate-bounce text-gray-400" />
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Technical Skills</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Proficient in modern AI/ML technologies and data science tools
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/50 border-gray-800 hover:border-white transition-colors h-full">
                  <CardHeader>
                    <CardTitle className="text-white">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-gray-700 text-white">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Featured Projects</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Showcasing my expertise in machine learning and data science
            </p>
          </motion.div>

          {/* Horizontal Scrolling Projects */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => {
                const container = document.getElementById("projects-container")
                if (container) {
                  container.scrollBy({ left: -370, behavior: "smooth" })
                }
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-3 rounded-full border border-gray-600 hover:border-white transition-all duration-300 backdrop-blur-sm"
              aria-label="Scroll left"
            >
              <ChevronDown className="w-5 h-5 rotate-90" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => {
                const container = document.getElementById("projects-container")
                if (container) {
                  container.scrollBy({ left: 370, behavior: "smooth" })
                }
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-3 rounded-full border border-gray-600 hover:border-white transition-all duration-300 backdrop-blur-sm"
              aria-label="Scroll right"
            >
              <ChevronDown className="w-5 h-5 -rotate-90" />
            </button>

            {/* Fade Effects */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none" />

            {/* Projects Container */}
            <div
              id="projects-container"
              className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
              style={{
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="flex-shrink-0 w-[350px] h-[400px]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-white transition-all duration-300 h-full flex flex-col">
                    <CardHeader className="flex-shrink-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-white/20 rounded-lg w-fit">{project.icon}</div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-white hover:text-gray-300"
                            >
                              <Github className="w-4 h-4 mr-1" />
                              Code
                            </a>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-white hover:text-gray-300"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Demo
                            </a>
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-white mb-2 text-lg">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <CardDescription className="text-white text-sm leading-relaxed mb-4 flex-1 overflow-hidden">
                        {project.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-gray-600 text-white text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Get In Touch</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Interested in collaborating or have opportunities in AI/ML? Let's connect!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Name</label>
                      <Input
                        name="name"
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Your name"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Email</label>
                      <Input
                        name="email"
                        type="email"
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="your.email@example.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Subject</label>
                    <Input
                      name="subject"
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="What's this about?"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Message</label>
                    <Textarea
                      name="message"
                      className="bg-gray-700 border-gray-600 text-white min-h-32"
                      placeholder="Tell me about your project or opportunity..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-900/50 border border-green-500 rounded-md">
                      <p className="text-green-400">✅ {submitMessage}</p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-900/50 border border-red-500 rounded-md">
                      <p className="text-red-400">❌ {submitMessage}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white border border-white hover:bg-gray-800 disabled:opacity-50"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
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
            <p className="text-gray-400 mb-4">Or reach out directly:</p>
            <div className="flex justify-center space-x-6">
              <Button variant="ghost" asChild>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=muhammadaadilusmani@gmail.com&su=Portfolio%20Contact&body=Hi%20Muhammad,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect.%0D%0A%0D%0ABest%20regards,"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-gray-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  muhammadaadilusmani@gmail.com
                </a>
              </Button>
              <Button variant="ghost" asChild>
                <a
                  href="https://github.com/AadilUsmani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-gray-300"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button variant="ghost" asChild>
                <a
                  href="https://www.linkedin.com/in/muhammad-adil-usmani-9bb557314/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-gray-300"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 Muhammad Adil Usmani. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
