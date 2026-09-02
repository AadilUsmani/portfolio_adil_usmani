import { NextResponse } from "next/server"
import { runPortfolioChatAgent } from "@/lib/agent_graph"

export const runtime = "nodejs"

// In-memory IP rate limiter: max 25 queries per minute
const chatRateLimit = new Map<string, { count: number; resetAt: number }>()

function isChatRateLimited(ip: string, limit = 25, windowMs = 60 * 1000): boolean {
  const now = Date.now()
  const record = chatRateLimit.get(ip)

  if (!record || now > record.resetAt) {
    chatRateLimit.set(ip, { count: 1, resetAt: now + windowMs })
    return false
  }

  if (record.count >= limit) {
    return true
  }

  record.count++
  return false
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "anonymous"
    if (isChatRateLimited(ip, 25, 60 * 1000)) {
      return NextResponse.json(
        { success: false, error: "Rate limit reached. Please wait a moment before sending another query." },
        { status: 429 },
      )
    }

    const body = await req.json()
    const { message, history = [] } = body

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 })
    }

    // Guard against oversized payload attacks
    if (message.length > 2500 || (Array.isArray(history) && history.length > 30)) {
      return NextResponse.json({ error: "Payload exceeds maximum length." }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY || ""
    const state = await runPortfolioChatAgent(message.trim(), history, apiKey)

    return NextResponse.json({
      success: true,
      reply: state.generatedResponse,
      intent: state.intent,
      suggestedQuestions: state.suggestedQuestions,
      relevantProjects: state.relevantProjects,
    })
  } catch (error: any) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process question.",
      },
      { status: 500 },
    )
  }
}
