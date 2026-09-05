import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// In-memory IP rate limiter: max 5 submissions per 10 minutes
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now()
  const record = ipRequestCounts.get(ip)

  if (!record || now > record.resetAt) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + windowMs })
    return false
  }

  if (record.count >= limit) {
    return true
  }

  record.count++
  return false
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "anonymous"
    if (isRateLimited(ip, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many contact requests. Please wait a few minutes before trying again." },
        { status: 429 },
      )
    }

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

    // Validate field lengths
    if (name.length > 100 || email.length > 254 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "Input exceeds maximum allowed length" }, { status: 400 })
    }

    const safeName = escapeHtml(name.trim())
    const safeSubject = escapeHtml(subject.trim())
    const safeMessage = escapeHtml(message.trim())

    const smtpUser = process.env.SMTP_USER || "muhammadaadilusmani@gmail.com"
    // Exact verified Google App Password without typo
    const smtpPass = (process.env.SMTP_PASS || "fhhs ueia mulw ldfv").replace(/\s+/g, "")
    const targetEmail = "muhammadaadilusmani@gmail.com"

    let sentViaSMTP = false

    // Attempt 1: Direct SMTP Delivery via Gmail Nodemailer
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        connectionTimeout: 8000,
        greetingTimeout: 5000,
        socketTimeout: 10000,
      })

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #6366f1, #06b6d4); padding: 24px; text-align: center;">
            <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">📬 New Portfolio Contact Message</h2>
            <p style="margin: 6px 0 0 0; color: #e0e7ff; font-size: 14px;">from ${safeName} (${email})</p>
          </div>
          <div style="padding: 24px; background: #0f172a;">
            <div style="background: #1e293b; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #06b6d4;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #94a3b8;"><strong>Sender:</strong> <span style="color: #f8fafc;">${safeName}</span></p>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #94a3b8;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></p>
              <p style="margin: 0; font-size: 14px; color: #94a3b8;"><strong>Subject:</strong> <span style="color: #f8fafc;">${safeSubject}</span></p>
            </div>
            <div style="background: #1e293b; padding: 18px; border-radius: 8px;">
              <h3 style="margin: 0 0 10px 0; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Message Content</h3>
              <p style="margin: 0; line-height: 1.6; color: #f1f5f9; white-space: pre-wrap; font-size: 15px;">${safeMessage}</p>
            </div>
          </div>
          <div style="padding: 14px 24px; background: #0b0f19; text-align: center; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b;">
            Delivered directly to Muhammad Adil Usmani via Gmail SMTP
          </div>
        </div>
      `

      await transporter.sendMail({
        from: `"${name} (Portfolio)" <${smtpUser}>`,
        to: targetEmail,
        replyTo: email,
        subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: htmlContent,
      })

      sentViaSMTP = true
      console.log("✅ Email sent successfully via Gmail SMTP!")
    } catch (smtpError: any) {
      console.warn("⚠️ SMTP failed, attempting Web3Forms fallback:", smtpError?.message || smtpError)
    }

    // Attempt 2: Fallback to Web3Forms if SMTP is blocked
    if (!sentViaSMTP) {
      const accessKey = process.env.WEB3FORMS_ACCESS_KEY || "d8aced0c-d6f6-478a-821f-1dffd06e0d12"
      const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject: `Portfolio Contact: ${subject}`,
          message: `From: ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
          to: targetEmail,
          from_name: "Portfolio Contact Form",
          replyto: email,
        }),
      })

      const result = await web3formsResponse.json()
      if (!web3formsResponse.ok || !result.success) {
        throw new Error(result.message || "Failed to deliver email through all providers")
      }
    }

    return NextResponse.json(
      {
        ok: true,
        success: true,
        message: "Your message has been sent successfully! I'll get back to you shortly.",
        receipt: { id: Date.now(), at: new Date().toISOString() },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("❌ Contact route error:", error?.message || error)
    return NextResponse.json(
      {
        error: "Unable to deliver message right now. Please connect directly via email at muhammadaadilusmani@gmail.com",
        success: false,
      },
      { status: 500 },
    )
  }
}
