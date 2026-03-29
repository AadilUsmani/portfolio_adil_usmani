import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Muhammad Adil Usmani | AI & ML Developer',
  description: 'Full-stack AI & ML developer specializing in machine learning, data science, and software engineering. View my projects, skills, and experience in building intelligent systems.',
  generator: 'v0.dev',
  keywords: 'AI, Machine Learning, Data Science, Python, Development, Portfolio',
  authors: [{ name: 'Muhammad Adil Usmani' }],
  openGraph: {
    title: 'Muhammad Adil Usmani | AI & ML Developer',
    description: 'Full-stack AI & ML developer specializing in machine learning, data science, and software engineering.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}
