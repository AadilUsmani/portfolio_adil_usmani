import nodemailer from 'nodemailer'

async function sendSummaryEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'muhammadaadilusmani@gmail.com',
      pass: 'fhhs ueia mulw ldfv',
    },
  })

  const recipients = ['adilusmani@outlook.com', 'L1F22BSCS0399@UCP.EDU.PK']

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #0b0f19; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b; color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #4f46e5, #06b6d4); padding: 32px 24px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Portfolio Update &amp; Deployment Summary</h1>
        <p style="margin: 8px 0 0 0; color: #e0e7ff; font-size: 14px;">Autonomous Systems &amp; Engineering Agent Report</p>
      </div>

      <div style="padding: 28px 24px;">
        <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1; margin-top: 0;">
          Hi <strong>Muhammad Adil Usmani</strong>,<br><br>
          Here is the complete summary of the updates, research project integrations, UI/theme overhaul, and Git deployments made to your personal portfolio repository.
        </p>

        <!-- Section 1 -->
        <div style="background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 18px 20px; margin-bottom: 18px;">
          <h3 style="margin: 0 0 10px 0; color: #38bdf8; font-size: 16px;">
            🔬 1. Added Recent Research &amp; GitHub Projects
          </h3>
          <ul style="margin: 0; padding-left: 20px; color: #94a3b8; font-size: 14px; line-height: 1.6;">
            <li><strong style="color: #f1f5f9;">Anarchist LLM (Featured #1):</strong> Disguised algorithmic reasoning in pre-1900 language models, FlashAttention-3 transformer engine (GPT-1900), Modal.com A100 GPU worker, and Streamlit analytics.</li>
            <li><strong style="color: #f1f5f9;">Lexical Graph RAG:</strong> Knowledge Graph retrieval with Neo4j on SEC 10-K filings.</li>
            <li><strong style="color: #f1f5f9;">Corrective RAG (CRAG):</strong> Adaptive 3-way routing with Tavily search fallback.</li>
            <li><strong style="color: #f1f5f9;">Titan Architecture:</strong> Long-term memory evaluation on PSX financial annual reports.</li>
            <li><strong style="color: #f1f5f9;">Category Filter Tabs:</strong> Filter by All, RAG &amp; Graph RAG, LLMs &amp; Research, and Forecasting &amp; ML.</li>
          </ul>
        </div>

        <!-- Section 2 -->
        <div style="background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 18px 20px; margin-bottom: 18px;">
          <h3 style="margin: 0 0 10px 0; color: #818cf8; font-size: 16px;">
            🎨 2. UI &amp; Design System Overhaul
          </h3>
          <ul style="margin: 0; padding-left: 20px; color: #94a3b8; font-size: 14px; line-height: 1.6;">
            <li>Modern, bespoke obsidian/deep-slate theme with glowing cyan and indigo accents.</li>
            <li>Interactive live RAG / LLM agent terminal simulation card in the Hero section.</li>
            <li>Fluid Dark/Light theme switching with balanced contrast and glass panels.</li>
            <li>Clean responsive layout with active spring pill navbar indicator and progress ring back-to-top.</li>
          </ul>
        </div>

        <!-- Section 3 -->
        <div style="background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 18px 20px; margin-bottom: 18px;">
          <h3 style="margin: 0 0 10px 0; color: #34d399; font-size: 16px;">
            📬 3. Working Gmail SMTP Integration
          </h3>
          <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
            Integrated <code style="background: #1e293b; color: #38bdf8; padding: 2px 6px; border-radius: 4px;">nodemailer</code> with your Gmail App Password. Contact form inquiries now send formatted emails directly to <strong style="color: #f1f5f9;">muhammadaadilusmani@gmail.com</strong> with automatic Web3Forms failover backup.
          </p>
        </div>

        <!-- Section 4 -->
        <div style="background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 10px 0; color: #f472b6; font-size: 16px;">
            🚀 4. Git Commits &amp; Live Vercel Deployments
          </h3>
          <ul style="margin: 0; padding-left: 20px; color: #94a3b8; font-size: 14px; line-height: 1.6;">
            <li><strong>Repository:</strong> <a href="https://github.com/AadilUsmani/portfolio_adil_usmani" style="color: #38bdf8; text-decoration: none;">github.com/AadilUsmani/portfolio_adil_usmani</a></li>
            <li><strong>Production Branch (main):</strong> Merged &amp; pushed — triggers Vercel Production build.</li>
            <li><strong>Preview Branch (preview/motion-ui):</strong> Pushed — triggers Vercel Preview build.</li>
            <li><strong>Build Verification:</strong> Production bundle compiled successfully (5/5 static pages generated).</li>
          </ul>
        </div>

        <div style="text-align: center; padding: 10px 0;">
          <a href="https://github.com/AadilUsmani/portfolio_adil_usmani" style="background: linear-gradient(135deg, #4f46e5, #06b6d4); color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block;">
            View GitHub Repository ↗
          </a>
        </div>
      </div>

      <div style="padding: 16px 24px; background-color: #070a12; text-align: center; border-top: 1px solid #1f2937; font-size: 12px; color: #64748b;">
        Automated report sent from Muhammad Adil Usmani&apos;s Autonomous Engineering Pipeline.
      </div>
    </div>
  `

  console.log(`Sending summary email to: ${recipients.join(', ')}...`)

  const info = await transporter.sendMail({
    from: '"Muhammad Adil Usmani" <muhammadaadilusmani@gmail.com>',
    to: recipients,
    subject: '🚀 Portfolio Deployment & Architecture Summary — Muhammad Adil Usmani',
    html: htmlContent,
  })

  console.log('✅ Email successfully delivered! Message ID:', info.messageId)
}

sendSummaryEmail().catch((err) => {
  console.error('❌ Failed to send email:', err)
  process.exit(1)
})
