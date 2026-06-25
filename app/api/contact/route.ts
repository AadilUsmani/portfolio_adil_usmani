import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Validate field lengths (mirrors client-side maxLength attributes)
    if (name.length > 100 || email.length > 254 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "Input exceeds maximum allowed length" }, { status: 400 })
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || "d8aced0c-d6f6-478a-821f-1dffd06e0d12"

    const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        subject: `Portfolio Contact: ${subject}`,
        message: `From: ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
        to: "muhammadaadilusmani@gmail.com",
        from_name: "Portfolio Contact Form",
        replyto: email,
      }),
    })

    const result = await web3formsResponse.json()

    if (web3formsResponse.ok && result.success) {
      return NextResponse.json(
        {
          message: "Message sent successfully! I'll get back to you soon.",
          success: true,
        },
        { status: 200 },
      )
    } else {
      throw new Error(result.message || "Failed to send email")
    }
  } catch (error) {
    console.error("❌ Contact form error:", error)
    return NextResponse.json(
      {
        error: "Unable to send message right now. Please use the direct email link below.",
        success: false,
      },
      { status: 500 },
    )
  }
}
