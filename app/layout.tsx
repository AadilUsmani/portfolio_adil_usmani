import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://v0-muhammadaadilusmani.vercel.app'),
  title: 'Muhammad Adil Usmani | AI Engineer — Graph RAG, LLMs & Deep Learning',
  description:
    'Muhammad Adil Usmani is an AI Engineer specializing in Graph RAG architectures, LLM inference optimization, FlashAttention-3, transformer research, and autonomous agent pipelines. Data Science Intern at ML1.',
  generator: 'Next.js',
  keywords: [
    'Muhammad Adil Usmani', 'AI Engineer', 'Machine Learning Engineer',
    'Graph RAG', 'LangGraph', 'Neo4j', 'Knowledge Graph',
    'LLM', 'Large Language Models', 'FlashAttention', 'Transformer',
    'PyTorch', 'Deep Learning', 'FAISS', 'Vector Database',
    'Corrective RAG', 'CRAG', 'Modal GPU', 'NVIDIA A100',
    'Apache Airflow', 'Data Pipeline', 'Python', 'FastAPI',
    'AI Portfolio', 'ML Researcher', 'Lahore Pakistan'
  ],
  authors: [{ name: 'Muhammad Adil Usmani', url: 'https://github.com/AadilUsmani' }],
  creator: 'Muhammad Adil Usmani',
  openGraph: {
    title: 'Muhammad Adil Usmani | AI Engineer — Graph RAG & LLM Systems',
    description:
      'AI Engineer specializing in Graph RAG, LLM inference, FlashAttention-3, and production-scale agent pipelines. View research projects, skills, and live AI demos.',
    url: 'https://v0-muhammadaadilusmani.vercel.app',
    siteName: 'Muhammad Adil Usmani Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Adil Usmani | AI Engineer — Graph RAG & LLM Systems',
    description: 'AI Engineer: Graph RAG, LLM Inference, FlashAttention-3, Autonomous Agent Pipelines. Data Science Intern @ ML1.',
    creator: '@AadilUsmani',
  },
  alternates: {
    canonical: 'https://v0-muhammadaadilusmani.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden transition-colors duration-300`}>
        {children}
      </body>
    </html>
  )
}
