import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Muhammad Adil Usmani - AI/ML Portfolio',
  description: 'Professional portfolio showcasing AI, Machine Learning, and Data Science projects',
  generator: 'v0.dev',
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
