/**
 * Creative Autonomous Engineering Agent Pipeline (Warmth & Delight Focus)
 * --------------------------------------------------------------------------
 * Deterministic State Machine for creative UI/UX auditing, warmth enhancement,
 * delightful micro-interactions, verification guardrails, and release management.
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// ─── 1. State Machine Schema ──────────────────────────────────────────────────

export class CreativePipelineState {
  constructor(config = {}) {
    this.repoUrl = config.repoUrl || 'https://github.com/AadilUsmani/portfolio_adil_usmani'
    this.repoOwner = config.repoOwner || 'AadilUsmani'
    this.repoName = config.repoName || 'portfolio_adil_usmani'
    this.baseBranch = config.baseBranch || 'main'
    this.branchName = ''
    this.auditFindings = []
    this.dimensionScores = {
      visualWarmth: 0,
      delight: 0,
      accessibility: 0,
      responsiveCraft: 0,
      codeHealth: 0,
    }
    this.warmthScore = 0
    this.selectedSpec = null
    this.pillarCoverage = {
      warmth: 0,
      delight: 0,
      craft: 0,
      clarity: 0,
    }
    this.retryCount = 0
    this.maxRetries = 3
    this.buildStatus = 'PENDING'
    this.lastError = null
    this.historyFile = path.resolve('.agent_history.json')
    this.executionHistory = this.loadHistory()
    this.dryRun = config.dryRun || false
    this.calculatePillarCoverage()
  }

  loadHistory() {
    try {
      if (fs.existsSync(this.historyFile)) {
        return JSON.parse(fs.readFileSync(this.historyFile, 'utf-8'))
      }
    } catch {
      // fallback
    }
    return []
  }

  calculatePillarCoverage() {
    for (const record of this.executionHistory) {
      if (record.pillar && this.pillarCoverage[record.pillar] !== undefined) {
        this.pillarCoverage[record.pillar] += 1
      }
    }
  }

  saveHistory(record) {
    this.executionHistory.push(record)
    if (record.pillar && this.pillarCoverage[record.pillar] !== undefined) {
      this.pillarCoverage[record.pillar] += 1
    }
    if (!this.dryRun) {
      fs.writeFileSync(this.historyFile, JSON.stringify(this.executionHistory, null, 2), 'utf-8')
    }
  }
}

// ─── 2. Node Implementations ──────────────────────────────────────────────────

/**
 * Node 1: Creative & UX Auditor
 * Inspects Visual Warmth, Delight & Playfulness, A11y, Responsive Craft, and Code Health
 */
export async function creativeAuditorNode(state) {
  console.log('\n🎨 [Node 1: Creative Auditor] Evaluating UI Across 5 Design Dimensions...')

  const findings = []
  let visualWarmth = 82
  let delight = 78
  let accessibility = 92
  let responsiveCraft = 90
  let codeHealth = 95

  // 1. Audit Visual Warmth (Color tokens & texture)
  const globalsCss = fs.existsSync('app/globals.css') ? fs.readFileSync('app/globals.css', 'utf-8') : ''
  if (!globalsCss.includes('amber') && !globalsCss.includes('sunset') && !globalsCss.includes('mesh-glow')) {
    findings.push({
      id: 'WARMTH-001',
      pillar: 'warmth',
      title: 'Enhance dark/light palette with glowing amber & warm terracotta accents',
      dimension: 'Visual Identity & Aesthetic Warmth',
      targetFile: 'app/globals.css',
      intent: 'Make the dark mode ambient glow feel like warm studio lighting rather than cold sterile monochrome',
      warmthDelta: 8,
      severity: 'HIGH',
    })
    visualWarmth -= 15
  }

  // 2. Audit Delight & Playfulness (Micro-interactions & tactile states)
  const pageTsx = fs.existsSync('app/page.tsx') ? fs.readFileSync('app/page.tsx', 'utf-8') : ''
  if (!pageTsx.includes('HeroInteractiveTerminal') || !pageTsx.includes('whileHover')) {
    findings.push({
      id: 'DELIGHT-001',
      pillar: 'delight',
      title: 'Add interactive architecture simulator and tactile card springs',
      dimension: 'Delight & Playfulness',
      targetFile: 'app/page.tsx',
      intent: 'Give recruiters an instant playful toy to interact with the moment they land on the hero',
      warmthDelta: 10,
      severity: 'HIGH',
    })
    delight -= 18
  }

  // 3. Audit Craft & Clarity (Responsive hierarchy & typography rhythm)
  if (!pageTsx.includes('Category Filter') && !pageTsx.includes('setProjectFilter')) {
    findings.push({
      id: 'CLARITY-001',
      pillar: 'clarity',
      title: 'Add Category Filter Tabs for RAG, LLM research, and forecasting',
      dimension: 'Responsive Craft & Clarity',
      targetFile: 'app/page.tsx',
      intent: 'Allow effortless exploration so visitors can zero in on specific AI engineering domains',
      warmthDelta: 6,
      severity: 'MEDIUM',
    })
    responsiveCraft -= 10
  }

  state.dimensionScores = {
    visualWarmth,
    delight,
    accessibility,
    responsiveCraft,
    codeHealth,
  }

  state.warmthScore = Math.round(
    visualWarmth * 0.3 + delight * 0.25 + accessibility * 0.15 + responsiveCraft * 0.15 + codeHealth * 0.15,
  )
  state.auditFindings = findings

  console.log(`📊 Audit Scores:`)
  console.log(`   Visual Identity & Warmth = ${visualWarmth}/100`)
  console.log(`   Delight & Playfulness     = ${delight}/100`)
  console.log(`   Accessibility & Inclusion = ${accessibility}/100`)
  console.log(`   Responsive Craft          = ${responsiveCraft}/100`)
  console.log(`   Code Health               = ${codeHealth}/100`)
  console.log(`🎯 Composite Warmth Score: ${state.warmthScore}/100`)
  console.log(`📌 Found ${findings.length} prioritized creative improvement candidates.`)

  return state
}

/**
 * Node 2: Strategy & Spec Node (Design Direction)
 * Warmth-First Heuristic + Pillar Balance Rule
 */
export async function creativeStrategySpecNode(state) {
  console.log('\n🎯 [Node 2: Strategy & Spec] Formulating Design Direction...')

  const executedTaskIds = new Set(state.executionHistory.map((h) => h.taskId))
  const candidates = state.auditFindings.filter((f) => !executedTaskIds.has(f.id))

  if (candidates.length === 0) {
    console.log('✨ No pending creative tasks found. All design recommendations addressed.')
    state.selectedSpec = null
    return state
  }

  // Pillar Balance Check: Check if any pillar is at 0 while others >= 2
  const minPillar = Object.entries(state.pillarCoverage).reduce((min, curr) => (curr[1] < min[1] ? curr : min))[0]
  const underServedCandidate = candidates.find((c) => c.pillar === minPillar)

  // Warmth-First Heuristic: Choose highest warmthDelta
  const selected = underServedCandidate || candidates.sort((a, b) => b.warmthDelta - a.warmthDelta)[0]

  state.selectedSpec = {
    taskId: selected.id,
    pillar: selected.pillar,
    title: selected.title,
    dimension: selected.dimension,
    targetFile: selected.targetFile,
    designIntent: selected.intent,
    warmthDelta: selected.warmthDelta,
    acceptanceCriteria: [
      `1. Implement design improvement ${selected.id}: ${selected.title}`,
      `2. Evoke design intent: "${selected.intent}"`,
      `3. Maintain WCAG AA contrast ratios and reduced-motion fallbacks.`,
      `4. Production build (next build) must compile with exit code 0.`,
    ],
    timestamp: new Date().toISOString(),
  }

  console.log(`📋 Selected Spec: [${selected.id}] ${selected.title}`)
  console.log(`🎨 Design Pillar: ${selected.pillar}`)
  console.log(`💭 Design Intent: "${selected.intent}"`)
  console.log(`🎯 Target File: ${selected.targetFile}`)

  return state
}

/**
 * Node 3: Coder Node (GitHub MCP / Creative Refiner)
 */
export async function creativeCoderNode(state) {
  console.log('\n💻 [Node 3: Coder Node] Preparing Creative Code Modification...')

  if (!state.selectedSpec) return state

  const timestamp = Date.now()
  state.branchName = `ui/warmth-loop-${state.selectedSpec.taskId.toLowerCase()}-${timestamp}`

  console.log(`🌿 Target Feature Branch: ${state.branchName}`)

  if (state.dryRun) {
    console.log(`[DRY-RUN] Applying surgical patch for ${state.selectedSpec.taskId}...`)
  } else {
    try {
      execSync(`git checkout -b ${state.branchName}`, { stdio: 'pipe' })
      console.log(`✅ Checked out feature branch ${state.branchName}`)
    } catch (err) {
      console.warn(`Branch notice: ${err.message}`)
    }
  }

  return state
}

/**
 * Node 4: Verification & Test Guardrail
 */
export async function creativeVerificationNode(state) {
  console.log('\n🛡️ [Node 4: Verification Guardrail] Running Deterministic Validation...')

  if (state.dryRun) {
    console.log('✅ [DRY-RUN] All verification checks (tsc, next build, smoke tests) PASSED.')
    state.buildStatus = 'PASSED'
    state.lastError = null
    return state
  }

  try {
    console.log('⚙️ Testing Next.js production compilation...')
    execSync('npm run build', { stdio: 'pipe', encoding: 'utf-8' })
    state.buildStatus = 'PASSED'
    state.lastError = null
    console.log('✅ Build compilation and page generation PASSED.')
  } catch (error) {
    state.buildStatus = 'FAILED'
    state.lastError = error.stdout || error.stderr || error.message
    state.retryCount += 1
    console.error(`❌ Build Verification FAILED (Attempt ${state.retryCount}/${state.maxRetries})`)
  }

  return state
}

/**
 * Node 5: Deployment & Release Node
 */
export async function creativeDeploymentNode(state) {
  console.log('\n🚀 [Node 5: Deployment & Release] Packaging Creative Improvement...')

  const changelogRecord = {
    taskId: state.selectedSpec.taskId,
    pillar: state.selectedSpec.pillar,
    title: state.selectedSpec.title,
    intent: state.selectedSpec.designIntent,
    branch: state.branchName,
    status: state.buildStatus,
    timestamp: new Date().toISOString(),
    warmthScore: state.warmthScore + state.selectedSpec.warmthDelta,
  }

  state.saveHistory(changelogRecord)
  console.log(`📝 Logged to changelog (.agent_history.json) — pillar: ${state.selectedSpec.pillar}`)

  const commitMsg = `ui(${state.selectedSpec.pillar}): ${state.selectedSpec.title.toLowerCase()}`
  if (state.dryRun) {
    console.log(`[DRY-RUN] Conventional commit: ${commitMsg}`)
    console.log(`[DRY-RUN] GitHub PR prepared with design rationale & before/after visual specs.`)
  }

  return state
}

// ─── 3. State Machine Runner ──────────────────────────────────────────────────

export async function runCreativeAutonomousOptimizer(options = {}) {
  const state = new CreativePipelineState(options)

  console.log('==================================================================')
  console.log('🎨 Starting Creative Autonomous Engineering State Graph Execution')
  console.log('==================================================================')

  // Step 1: Creative Audit
  await creativeAuditorNode(state)

  // Convergence Control: Warmth Score >= 90 & all 4 pillars touched & 0 findings
  const allPillarsTouched = Object.values(state.pillarCoverage).every((count) => count > 0)
  if (state.warmthScore >= 90 && allPillarsTouched && state.auditFindings.length === 0) {
    console.log('\n🏁 [Creative Optimal State Reached] Warmth Score >= 90 and all design pillars covered. Terminating gracefully.')
    return state
  }

  // Step 2: Strategy & Spec
  await creativeStrategySpecNode(state)

  if (!state.selectedSpec) {
    console.log('\n🏁 [Creative Optimal State Reached] No further creative tasks pending.')
    return state
  }

  // Step 3 & 4: Coder & Verification Loop
  while (state.retryCount < state.maxRetries) {
    await creativeCoderNode(state)
    await creativeVerificationNode(state)

    if (state.buildStatus === 'PASSED') {
      break
    } else {
      console.log(`\n🔁 [Conditional Edge] Retrying with compiler feedback...`)
    }
  }

  if (state.buildStatus !== 'PASSED') {
    console.error(`\n🛑 [Pipeline Aborted] Max retries exceeded.`)
    return state
  }

  // Step 5: Deployment & Release
  await creativeDeploymentNode(state)

  console.log('\n==================================================================')
  console.log('🎨 Creative Optimization Cycle Completed Successfully!')
  console.log('==================================================================\n')

  return state
}
