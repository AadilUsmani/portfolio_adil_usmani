import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "muhammadaadilusmani@gmail.com",
    pass: "fhhsueiamulwldfv",
  },
  connectionTimeout: 8000,
  greetingTimeout: 5000,
});

const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 0; }
  .container { max-width: 620px; margin: 32px auto; padding: 32px; background: #1e293b; border-radius: 16px; border: 1px solid rgba(99,102,241,0.2); }
  h1 { color: #06b6d4; font-size: 22px; margin-bottom: 6px; }
  h2 { color: #a5b4fc; font-size: 15px; margin: 20px 0 8px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 4px; }
  .badge { display: inline-block; background: rgba(6,182,212,0.1); border: 1px solid rgba(6,182,212,0.3); color: #06b6d4; font-size: 11px; font-weight: 600; padding: 2px 10px; border-radius: 999px; margin-bottom: 16px; }
  .item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
  .dot { color: #06b6d4; font-weight: bold; flex-shrink: 0; margin-top: 1px; }
  .text { color: #cbd5e1; font-size: 13px; line-height: 1.5; }
  .strong { color: #f1f5f9; font-weight: 600; }
  .cta { display: inline-block; margin-top: 20px; background: linear-gradient(135deg, #6366f1, #06b6d4); color: white; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; }
  .footer { margin-top: 28px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 11px; color: #64748b; }
</style></head>
<body>
<div class="container">
  <div class="badge">✅ DEPLOYED — ${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })}</div>
  <h1>Portfolio Enhancement Complete</h1>
  <p style="color:#94a3b8;font-size:14px;">Muhammad Adil Usmani &mdash; AI Engineer Portfolio has been upgraded with 11 improvements and deployed to Vercel.</p>

  <h2>🚀 What Was Deployed</h2>

  <div class="item"><div class="dot">1.</div><div class="text"><span class="strong">Typing Role-Rotator Hero</span> — H1 now cycles through 5 expertise areas with smooth Framer Motion transitions</div></div>
  <div class="item"><div class="dot">2.</div><div class="text"><span class="strong">Animated Neural Network Visualization</span> — SVG network graph background in hero (lg screens), 4 layers with pulsing nodes &amp; animated edges</div></div>
  <div class="item"><div class="dot">3.</div><div class="text"><span class="strong">Experience &amp; Education Timeline</span> — New section with ML1 internship + UCP degree, animated vertical timeline with cards</div></div>
  <div class="item"><div class="dot">4.</div><div class="text"><span class="strong">Enhanced OG/Twitter Metadata</span> — Rich link previews (summary_large_image), 25 keywords, canonical URL, metadataBase, Twitter card</div></div>
  <div class="item"><div class="dot">5.</div><div class="text"><span class="strong">Staggered Section Animations</span> — Project cards and skill cards now stagger in (0.07s per item) for a dramatically more polished feel</div></div>
  <div class="item"><div class="dot">6.</div><div class="text"><span class="strong">Count-Up Animated Numbers</span> — Stat strip metrics animate as counting-up numbers when entering viewport (cubic ease-out)</div></div>
  <div class="item"><div class="dot">7.</div><div class="text"><span class="strong">GitHub Activity Badge Strip</span> — Before footer: 4 glassmorphism pills showing repo count, AI projects, profile link, open-to-collab status</div></div>
  <div class="item"><div class="dot">8.</div><div class="text"><span class="strong">"Currently Building" Status Banner</span> — Dismissable top banner: LIVE @ ML1, researching Graph RAG + LLM Inference, open to AI roles</div></div>
  <div class="item"><div class="dot">9.</div><div class="text"><span class="strong">"Why Work With Me" Proof Section</span> — 3 emerald proof cards: Research→Production, Full-Stack Ownership, Graph-Driven Architecture</div></div>
  <div class="item"><div class="dot">10.</div><div class="text"><span class="strong">Performance: Font swap + content-visibility</span> — Inter font with display:swap, preload:true; CSS content-visibility:auto for off-screen sections</div></div>
  <div class="item"><div class="dot">11.</div><div class="text"><span class="strong">AI Engineer Proof Section</span> — "This Portfolio IS the Demo" callout showing the 4-node graph agent pipeline diagram with "Try the Graph Agent Now →" CTA that opens the chatbot</div></div>

  <h2>✨ Additional Improvements</h2>
  <div class="item"><div class="dot">→</div><div class="text">Added <span class="strong">"Ask the AI Assistant"</span> CTA button in Hero alongside "Explore Projects" and "Resume"</div></div>
  <div class="item"><div class="dot">→</div><div class="text">Added <span class="strong">Experience</span> nav link in navbar (desktop + mobile)</div></div>
  <div class="item"><div class="dot">→</div><div class="text">Portfolio Assistant now opens via <code>CustomEvent('open-portfolio-assistant')</code> from any section</div></div>
  <div class="item"><div class="dot">→</div><div class="text">Footer nav updated with Experience + button-based scrollToSection instead of anchor hrefs</div></div>

  <a class="cta" href="https://v0-muhammadaadilusmani.vercel.app/" target="_blank">🌐 View Live Portfolio →</a>

  <div class="footer">
    <p>Built with: Next.js 14 · Framer Motion · Tailwind CSS · Google Gemini 3.6 Flash · Graph Agent Pipeline</p>
    <p>Deployed automatically via: git push origin main → Vercel CI/CD</p>
    <p>This message was sent automatically by the AI engineering pipeline.</p>
  </div>
</div>
</body>
</html>
`;

try {
  const info = await transporter.sendMail({
    from: '"Adil Portfolio AI" <muhammadaadilusmani@gmail.com>',
    to: ["adilusmani@outlook.com", "L1F22BSCS0399@UCP.EDU.PK"],
    subject: "✅ Portfolio Upgraded & Deployed — 11 AI/UX Enhancements Live",
    html,
    text: "Portfolio enhancement complete. 11 improvements deployed: typing rotator, neural network viz, timeline, OG metadata, stagger animations, count-up stats, GitHub strip, status banner, Why Work With Me proof, performance upgrades, and AI Engineer proof section with live graph agent demo. View live: https://v0-muhammadaadilusmani.vercel.app/",
  });
  console.log("Email sent:", info.messageId);
} catch (err) {
  console.error("Email error:", err.message);
  process.exit(1);
}
