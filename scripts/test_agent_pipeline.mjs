/**
 * Dry-Run Test Suite for Autonomous Engineering Agent Pipeline
 */

import { runAutonomousOptimizer } from './agent_optimizer_pipeline.mjs'

async function runTests() {
  console.log('🧪 Initiating Pipeline Dry-Run Simulation...')
  
  try {
    const resultState = await runAutonomousOptimizer({
      dryRun: true,
      repoOwner: 'AadilUsmani',
      repoName: 'portfolio_adil_usmani',
      baseBranch: 'main'
    })

    console.log('\n✅ Test Suite Results:')
    console.log(`- Final Build Status: ${resultState.buildStatus}`)
    console.log(`- Selected Task: ${resultState.selectedSpec ? resultState.selectedSpec.taskId : 'None'}`)
    console.log(`- Convergence Score: ${resultState.convergenceScore}/100`)
    console.log(`- Retries Used: ${resultState.retryCount}/${resultState.maxRetries}`)
    console.log(`- Recorded History Length: ${resultState.executionHistory.length}`)
    
    if (resultState.buildStatus === 'PASSED') {
      console.log('\n🎯 Simulation PASS: State machine verified end-to-end.')
    } else {
      console.error('\n❌ Simulation FAIL: State machine failed verification.')
      process.exit(1)
    }
  } catch (error) {
    console.error('Fatal error during test suite execution:', error)
    process.exit(1)
  }
}

runTests()
