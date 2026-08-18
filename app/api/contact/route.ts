import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

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

    // Validate field lengths
    if (name.length > 100 || email.length > 254 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "Input exceeds maximum allowed length" }, { status: 400 })
    }

    const smtpUser = process.env.SMTP_USER || "muhammadaadilusmani@gmail.com"
    const smtpPass = (process.env.SMTP_PASS || "fhhsuelamulwldfv").replace(/\s+/g, "")
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
      })

      const htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 24px; text-align: center;">
            <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Portfolio Message</h2>
            <p style="margin: 6px 0 0 0; color: #e2e8f0; font-size: 14px;">from ${name}</p>
          </div>
          <div style="padding: 24px; background: #0f172a;">
            <div style="background: #1e293b; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #94a3b8;"><strong>Sender:</strong> <span style="color: #f8fafc;">${name}</span></p>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #94a3b8;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></p>
              <p style="margin: 0; font-size: 14px; color: #94a3b8;"><strong>Subject:</strong> <span style="color: #f8fafc;">${subject}</span></p>
            </div>
            <div style="background: #1e293b; padding: 18px; border-radius: 8px;">
              <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
              <p style="margin: 0; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; font-size: 15px;">${message}</p>
            </div>
          </div>
          <div style="padding: 16px 24px; background: #0b0f19; text-align: center; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b;">
            Sent directly from Muhammad Adil Usmani's AI Portfolio Contact Form
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
    } catch (smtpError) {
      console.warn("⚠️ SMTP failed, attempting Web3Forms fallback:", smtpError)
    }

    // Attempt 2: Fallback to Web3Forms if SMTP is blocked in certain host environments
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
        message: "Your message has been sent successfully! I'll get back to you shortly.",
        success: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Contact route error:", error)
    return NextResponse.json(
      {
        error: "Unable to deliver message right now. Please connect directly via email at muhammadaadilusmani@gmail.com",
        success: false,
      },
      { status: 500 },
    )
  }
}
