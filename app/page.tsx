"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Database,
  Brain,
  BarChart3,
  MapPin,
  Download,
  Menu,
  X,
  GraduationCap,
  Award,
  Calendar,
  Code,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRef } from "react"

const skills = {
  "Programming Languages": [
    { name: "Python", level: 90 },
    { name: "C++", level: 75 },
    { name: "SQL", level: 80 },
  ],
  "ML/AI Frameworks": [
    { name: "scikit-learn", level: 85 },
    { name: "TensorFlow", level: 85 },
    { name: "Pandas", level: 90 },
    { name: "NumPy", level: 88 },
  ],
  "Data & Visualization": [
    { name: "Matplotlib", level: 80 },
    { name: "Plotly", level: 75 },
    { name: "Seaborn", level: 70 },
  ],
  "Tools & Platforms": [
    { name: "Git", level: 85 },
    { name: "Jupyter", level: 90 },
    { name: "Flask", level: 75 },
  ],
}

const projects = [
  {
    title: "Article Summarization",
    description:
      "Built an NLP model using transformer architecture to automatically generate concise summaries of long-form articles with 85% accuracy using T5 small.",
    tags: ["NLP", "Transformers", "Python", "T5"],
    github: "https://github.com/AadilUsmani/news_article_summarizer",
    demo: "https://v0-news-article-summarizer-gamma.vercel.app/",
    icon: <Brain className="w-6 h-6" />,
    accuracy: "85%",
  },
  {
    title: "Customer Churn Predictor",
    description:
      "Developed a machine learning model to predict customer churn with 92% accuracy using ensemble methods and feature engineering.",
    tags: ["Supervised Learning", "Random Forest", "Feature Engineering", "Python"],
    github: "https://github.com/AadilUsmani/churn_predictor_",
    demo: "https://kzml2mfup87xwyui0vgq.lite.vusercontent.net/churn-predictor",
    icon: <BarChart3 className="w-6 h-6" />,
    accuracy: "92%",
  },
  {
    title: "Stock Price Prediction",
    description:
      "Implemented LSTM neural networks to predict stock prices using historical data and technical indicators with time series analysis.",
    tags: ["Deep Learning", "LSTM", "Time Series", "TensorFlow"],
    github: "https://github.com/AadilUsmani/nvdia_stock_predictor",
    demo: "https://preview-nvidia-stock-dashboard-kzmqjnlxx9b97rmuji28.vusercontent.net/",
    icon: <Database className="w-6 h-6" />,
    accuracy: "78%",
  },
]

const timeline = [
  {
    year: "2024-Present",
    title: "Advanced ML Projects",
    description: "Developing sophisticated machine learning models with focus on NLP and predictive analytics",
  },
  {
    year: "2024",
    title: "Stanford ML Certification",
    description: "Completed Stanford's Machine Learning course with distinction, mastering core ML algorithms",
  },
  {
    year: "2022-2026",
    title: "BSCS Studies",
    description: "Pursuing Bachelor's in Computer Science at University of Central Punjab with focus on AI/ML",
  },
]

function SkillBar({ skill, delay }: { skill: { name: string; level: number }; delay: number }) {
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(skill.level)
      }, delay * 100)
      return () => clearTimeout(timer)
    }
  }, [isInView, skill.level, delay])

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-white">{skill.name}</span>
        <span className="text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])

  const sections = ["about", "education", "skills", "projects", "timeline", "contact"]

  useEffect(() => {
    const handleScroll = () => {
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
    setMobileMenuOpen(false)
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

  const downloadResume = () => {
    // Create a temporary link to download resume
    const link = document.createElement("a")
    link.href = "/resume.pdf" // You'll need to add your resume PDF to the public folder
    link.download = "Muhammad_Adil_Usmani_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {sections.map((section) => (
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

            {/* Social Links */}
            <div className="hidden md:flex space-x-4">
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

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{
            opacity: mobileMenuOpen ? 1 : 0,
            x: mobileMenuOpen ? "0%" : "100%",
          }}
          transition={{ duration: 0.3 }}
          className={`md:hidden fixed top-16 right-0 w-64 h-screen bg-black/95 backdrop-blur-md border-l border-gray-800 ${
            mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-4 p-6">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize text-left py-2 transition-colors ${
                  activeSection === section ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {section}
              </button>
            ))}
            <div className="flex space-x-4 pt-4 border-t border-gray-800">
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
        </motion.div>
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
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Left side - Profile Picture and Info */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white p-1 mb-6">
                  <img
                    src="/profile.jpg"
                    alt="Muhammad Adil Usmani"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Muhammad Adil Usmani</h1>
                  <span className="text-2xl md:text-3xl text-white font-semibold">AI/ML Developer</span>
                  <div className="flex items-center justify-center lg:justify-start mt-2 text-gray-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Lahore, Pakistan</span>
                  </div>
                </div>
              </div>

              {/* Right side - Description and Buttons */}
              <div className="flex-1 text-center lg:text-left lg:ml-8">
                <p className="text-xl text-white mb-6 max-w-3xl leading-relaxed">
                  Computer Science student with practical experience in machine learning and data analysis, building
                  intelligent systems that solve real-world problems through data-driven insights.
                </p>

                {/* Achievement Badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                  <Badge variant="outline" className="border-green-500 text-green-400 px-3 py-1">
                    <Zap className="w-4 h-4 mr-1" />
                    85%+ Model Accuracy
                  </Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-400 px-3 py-1">
                    <Code className="w-4 h-4 mr-1" />
                    3+ ML Projects
                  </Badge>
                  <Badge variant="outline" className="border-purple-500 text-purple-400 px-3 py-1">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    BSCS 2026
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("projects")}
                    className="bg-black text-white border border-white hover:bg-gray-800"
                  >
                    View My Work
                  </Button>
                  <Button
                    size="lg"
                    onClick={downloadResume}
                    className="bg-black text-white border border-white hover:bg-gray-800"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
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

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Education</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Academic foundation and continuous learning in computer science and AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* University */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-white transition-colors h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                    <CardTitle className="text-white">Bachelor of Science in Computer Science</CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">University of Central Punjab, Lahore</CardDescription>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>2022 - 2026</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white mb-4">
                    Pursuing comprehensive education in computer science with specialization in artificial intelligence
                    and machine learning.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-gray-700 text-white">
                      Data Structures
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-700 text-white">
                      Algorithms
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-700 text-white">
                      Machine Learning
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-700 text-white">
                      Database Systems
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-white transition-colors h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <CardTitle className="text-white">Certifications</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-2 border-yellow-400 pl-4">
                    <h4 className="font-semibold text-white">Stanford Machine Learning Course</h4>
                    <p className="text-gray-300 text-sm">Completed with distinction</p>
                    <p className="text-gray-400 text-xs">2024</p>
                  </div>
                  <div className="border-l-2 border-blue-400 pl-4">
                    <h4 className="font-semibold text-white">Deep Learning Specialization</h4>
                    <p className="text-gray-300 text-sm">Neural Networks and Deep Learning</p>
                    <p className="text-gray-400 text-xs">2024</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
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

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/50 border-gray-800 hover:border-white transition-colors h-full">
                  <CardHeader>
                    <CardTitle className="text-white">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skillList.map((skill, skillIndex) => (
                      <SkillBar key={skill.name} skill={skill} delay={categoryIndex * skillList.length + skillIndex} />
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <Card className="bg-gray-900/50 border-gray-800 hover:border-white transition-all duration-300 h-full flex flex-col">
                  <CardHeader>
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
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <CardDescription className="text-white">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-gray-600 text-white">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <span className="text-gray-400 text-sm">Model Accuracy</span>
                      <span className="text-green-400 font-semibold">{project.accuracy}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Journey Timeline</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">Key milestones in my AI/ML learning journey</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <Card className="bg-gray-900/50 border-gray-800 hover:border-white transition-colors">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-300 mb-2">{item.description}</p>
                        <span className="text-blue-400 font-semibold">{item.year}</span>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-2/12 flex justify-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-black"></div>
                  </div>

                  <div className="w-5/12"></div>
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
                        className="bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
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
                        className="bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
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
                      className="bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                      placeholder="What's this about?"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Message</label>
                    <Textarea
                      name="message"
                      className="bg-gray-700 border-gray-600 text-white min-h-32 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Tell me about your project or opportunity..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Status Messages */}
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

      {/* Footer */}
      <footer className="py-8 border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 Muhammad Adil Usmani. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
