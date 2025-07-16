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

    // Replace the placeholder access key and uncomment the Web3Forms integration.
    // Also, remove the temporary demo response.

    // --- START: Web3Forms Integration ---
    const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "d8aced0c-d6f6-478a-821f-1dffd06e0d12", // <--- YOUR KEY IS HERE NOW
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
    // --- END: Web3Forms Integration ---

    // --- REMOVE THIS TEMPORARY BLOCK AFTER WEB3FORMS IS SET UP ---
    /*
  console.log("📧 Contact form submission received:", {
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
  })
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return NextResponse.json(
    {
      message: "Message received! Please use the direct email link below for now, or wait for email service setup.",
      success: true,
      demo: true,
    },
    { status: 200 },
  )
  */
    // --- END OF TEMPORARY BLOCK ---
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
