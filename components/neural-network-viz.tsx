"use client"

import { motion } from "framer-motion"

const LAYERS = [
  [{ cx: 60, cy: 80 }, { cx: 60, cy: 160 }, { cx: 60, cy: 240 }],
  [{ cx: 200, cy: 55 }, { cx: 200, cy: 130 }, { cx: 200, cy: 200 }, { cx: 200, cy: 270 }],
  [{ cx: 340, cy: 80 }, { cx: 340, cy: 160 }, { cx: 340, cy: 240 }],
  [{ cx: 460, cy: 120 }, { cx: 460, cy: 200 }],
]

const LAYER_COLORS = ["#06b6d4", "#6366f1", "#a855f7", "#f59e0b"]
const LABELS = ["Query", "Graph Retrieval", "LLM Core", "Response"]

type Edge = { x1: number; y1: number; x2: number; y2: number; id: string; delay: number }

function buildEdges(): Edge[] {
  const edges: Edge[] = []
  for (let li = 0; li < LAYERS.length - 1; li++) {
    for (let fi = 0; fi < LAYERS[li].length; fi++) {
      for (let ti = 0; ti < LAYERS[li + 1].length; ti++) {
        const from = LAYERS[li][fi]
        const to = LAYERS[li + 1][ti]
        edges.push({
          x1: from.cx, y1: from.cy, x2: to.cx, y2: to.cy,
          id: `e-${li}-${fi}-${ti}`,
          delay: (fi * 0.2 + ti * 0.15 + li * 0.4) % 2,
        })
      }
    }
  }
  return edges
}

const edges = buildEdges()

export function NeuralNetworkViz() {
  return (
    <svg viewBox="0 0 520 330" className="w-full h-full" aria-hidden="true" role="presentation">
      <defs>
        <linearGradient id="nn-edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
        </linearGradient>
        <filter id="nn-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {edges.map((e) => (
        <motion.line key={e.id} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="url(#nn-edge-grad)" strokeWidth="0.75"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.08, 0.45, 0.08] }}
          transition={{ duration: 3.5, delay: e.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {LAYERS.map((layer, li) =>
        layer.map((node, ni) => (
          <g key={`n-${li}-${ni}`}>
            <motion.circle cx={node.cx} cy={node.cy} r={18}
              fill="none" stroke={LAYER_COLORS[li]} strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.12, 0.45, 0.12], scale: [0.9, 1.15, 0.9] }}
              transition={{ duration: 2.8, delay: ni * 0.25 + li * 0.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
            />
            <motion.circle cx={node.cx} cy={node.cy} r={9}
              fill={`${LAYER_COLORS[li]}22`} stroke={LAYER_COLORS[li]} strokeWidth="1.5"
              filter="url(#nn-glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, delay: ni * 0.2 + li * 0.35, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        ))
      )}
      {LAYERS.map((layer, li) => {
        const avgY = layer.reduce((sum, n) => sum + n.cy, 0) / layer.length
        return (
          <text key={`lbl-${li}`} x={layer[0].cx} y={avgY + 42}
            textAnchor="middle" fill="#475569" fontSize="9"
            fontFamily="monospace" letterSpacing="0.05em"
          >
            {LABELS[li]}
          </text>
        )
      })}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle key={`pulse-${i}`} r={3} fill="#06b6d4" opacity={0.7}
          initial={{ cx: LAYERS[0][1].cx, cy: LAYERS[0][1].cy }}
          animate={{
            cx: [LAYERS[0][1].cx, LAYERS[1][1].cx, LAYERS[2][1].cx, LAYERS[3][0].cx],
            cy: [LAYERS[0][1].cy, LAYERS[1][1].cy, LAYERS[2][1].cy, LAYERS[3][0].cy],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{ duration: 2.8, delay: i * 0.9, repeat: Infinity, ease: "easeInOut", times: [0, 0.33, 0.66, 1] }}
        />
      ))}
    </svg>
  )
}
