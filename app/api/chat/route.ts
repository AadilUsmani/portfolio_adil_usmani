import { NextResponse } from "next/server"
import { runPortfolioChatAgent } from "@/lib/agent_graph"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { message, history = [] } = body

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 })
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
