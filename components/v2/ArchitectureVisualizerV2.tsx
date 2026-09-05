"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Boxes,
  Database,
  Cpu,
  Bot,
  ShieldCheck,
  ArrowRightToLine,
  ArrowLeftFromLine,
  X,
} from "lucide-react";
import type { ArchEdge, ArchNode, NodeKind, Project } from "@/lib/dataV2";

const NODE_W = 136;
const NODE_H = 46;

const kindMeta: Record<NodeKind, { label: string; color: string; Icon: typeof Boxes }> = {
  input: { label: "Input", color: "#b8b3a8", Icon: ArrowLeftFromLine },
  service: { label: "Service", color: "#ff8a3d", Icon: Boxes },
  store: { label: "Store / Index", color: "#4fd1c5", Icon: Database },
  model: { label: "Model", color: "#f687b3", Icon: Cpu },
  agent: { label: "Agent", color: "#b794f4", Icon: Bot },
  gate: { label: "Gate / Control", color: "#f6e05e", Icon: ShieldCheck },
  output: { label: "Output", color: "#68d391", Icon: ArrowRightToLine },
};

function edgePath(a: ArchNode, b: ArchNode) {
  const x1 = a.x + NODE_W / 2;
  const y1 = a.y;
  const x2 = b.x - NODE_W / 2;
  const y2 = b.y;
  const dx = Math.max(40, (x2 - x1) / 2);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

function edgeKey(e: ArchEdge) {
  return `${e.from}->${e.to}`;
}

export function ArchitectureVisualizerV2({ project }: { project: Project }) {
  const { nodes, edges, flow } = project.graph;
  const nodeMap = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);

  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const dragRef = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // reset when project changes
  useEffect(() => {
    setSelected(null);
    setHovered(null);
    setStep(0);
    setPlaying(true);
    setView({ x: 0, y: 0, k: 1 });
  }, [project.id]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setStep((s) => (s + 1) % (flow.length + 2)), 900 / speed);
    return () => clearInterval(id);
  }, [playing, speed, flow.length]);

  const activeEdge = flow[step] ? `${flow[step][0]}->${flow[step][1]}` : null;
  const visitedNodes = useMemo(() => {
    const s = new Set<string>();
    flow.slice(0, Math.min(step + 1, flow.length)).forEach(([a, b]) => {
      s.add(a);
      s.add(b);
    });
    return s;
  }, [flow, step]);

  const focusId = hovered ?? selected;
  const connected = useMemo(() => {
    if (!focusId) return null;
    const set = new Set<string>();
    edges.forEach((e) => {
      if (e.from === focusId || e.to === focusId) {
        set.add(edgeKey(e));
      }
    });
    return set;
  }, [edges, focusId]);

  const selectedNode = selected ? nodeMap[selected] : null;
  const inbound = selectedNode ? edges.filter((e) => e.to === selectedNode.id) : [];
  const outbound = selectedNode ? edges.filter((e) => e.from === selectedNode.id) : [];

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as Element).closest("[data-node]")) return;
      dragRef.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    },
    [view.x, view.y],
  );
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const svg = svgRef.current;
    const scale = svg ? 1000 / svg.clientWidth : 1;
    const dx = (e.clientX - dragRef.current.x) * scale;
    const dy = (e.clientY - dragRef.current.y) * scale;
    setView((v) => ({ ...v, x: dragRef.current!.vx + dx, y: dragRef.current!.vy + dy }));
  }, []);
  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const zoom = (dir: 1 | -1) => setView((v) => ({ ...v, k: Math.min(2.2, Math.max(0.6, v.k + dir * 0.2)) }));
  const resetView = () => setView({ x: 0, y: 0, k: 1 });

  const restart = () => {
    setStep(0);
    setPlaying(true);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="relative overflow-hidden rounded-xl border border-line bg-ink-2">
        {/* toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="grid h-7 w-7 place-items-center rounded-md border border-line-2 bg-ink-3 text-paper-2 hover:text-paper"
              aria-label={playing ? "Pause simulation" : "Play simulation"}
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={restart}
              className="grid h-7 w-7 place-items-center rounded-md border border-line-2 bg-ink-3 text-paper-2 hover:text-paper"
              aria-label="Restart simulation"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <div className="mono ml-1 flex items-center gap-1 text-[10px] text-mute">
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`rounded px-1.5 py-1 ${speed === s ? "bg-ink-4 text-paper" : "hover:text-paper"}`}
                >
                  {s}×
                </button>
              ))}
            </div>
            <span className="mono ml-2 hidden text-[10px] tracking-widest text-mute sm:inline">
              STEP {String(Math.min(step + 1, flow.length)).padStart(2, "0")}/{String(flow.length).padStart(2, "0")}
              {activeEdge ? (
                <>
                  {" "}
                  · <span className="text-signal">{nodeMap[flow[step][0]].label}</span> →{" "}
                  <span className="text-teal">{nodeMap[flow[step][1]].label}</span>
                </>
              ) : (
                <span className="text-lime"> · CYCLE COMPLETE</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => zoom(-1)} className="grid h-7 w-7 place-items-center rounded-md border border-line-2 bg-ink-3 text-paper-2 hover:text-paper" aria-label="Zoom out">
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => zoom(1)} className="grid h-7 w-7 place-items-center rounded-md border border-line-2 bg-ink-3 text-paper-2 hover:text-paper" aria-label="Zoom in">
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button onClick={resetView} className="grid h-7 w-7 place-items-center rounded-md border border-line-2 bg-ink-3 text-paper-2 hover:text-paper" aria-label="Reset view">
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <svg
          ref={svgRef}
          viewBox="0 0 1000 520"
          className="block h-auto w-full cursor-grab touch-none select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onClick={(e) => {
            if (!(e.target as Element).closest("[data-node]")) setSelected(null);
          }}
        >
          <defs>
            <pattern id={`grid-${project.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
            <marker id={`arrow-${project.id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3a4257" />
            </marker>
            <marker id={`arrow-active-${project.id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={project.accent} />
            </marker>
            <filter id={`glow-${project.id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="1000" height="520" fill={`url(#grid-${project.id})`} />

          <g transform={`translate(${view.x} ${view.y}) translate(500 260) scale(${view.k}) translate(-500 -260)`}>
            {/* edges */}
            {edges.map((e, i) => {
              const a = nodeMap[e.from];
              const b = nodeMap[e.to];
              if (!a || !b) return null;
              const d = edgePath(a, b);
              const key = edgeKey(e);
              const isActive = activeEdge === key;
              const isConnected = connected?.has(key);
              const dimmed = connected && !isConnected;
              const pid = `edge-${project.id}-${i}`;
              return (
                <g key={key} opacity={dimmed ? 0.18 : 1} style={{ transition: "opacity 200ms" }}>
                  <path id={pid} d={d} fill="none" stroke="transparent" />
                  <path
                    d={d}
                    fill="none"
                    stroke={isActive || isConnected ? project.accent : "#2f3648"}
                    strokeWidth={isActive ? 2 : 1.25}
                    strokeDasharray={e.dashed ? "4 6" : undefined}
                    markerEnd={`url(#${isActive || isConnected ? `arrow-active-${project.id}` : `arrow-${project.id}`})`}
                    className={isActive ? "edge-flow" : undefined}
                  />
                  {e.label ? (
                    <text
                      fontSize="9.5"
                      fill={isActive || isConnected ? project.accent : "#7a8092"}
                      fontFamily="var(--font-mono)"
                      textAnchor="middle"
                    >
                      <textPath href={`#${pid}`} startOffset="50%">
                        <tspan dy="-4">{e.label}</tspan>
                      </textPath>
                    </text>
                  ) : null}
                  {playing && !dimmed ? (
                    <circle r={isActive ? 4 : 2.5} fill={isActive ? project.accent : "#4fd1c5"} filter={isActive ? `url(#glow-${project.id})` : undefined}>
                      <animateMotion dur={`${(2.6 + (i % 3) * 0.5) / speed}s`} repeatCount="indefinite" begin={`${(i * 0.35) % 2}s`}>
                        <mpath href={`#${pid}`} />
                      </animateMotion>
                    </circle>
                  ) : null}
                </g>
              );
            })}

            {/* nodes */}
            {nodes.map((n) => {
              const meta = kindMeta[n.kind];
              const isSel = selected === n.id;
              const isHov = hovered === n.id;
              const visited = visitedNodes.has(n.id);
              const isActiveNode = activeEdge ? flow[step].includes(n.id) : false;
              const dimmed = connected && !(focusId === n.id || edges.some((e) => connected.has(edgeKey(e)) && (e.from === n.id || e.to === n.id)));
              return (
                <g
                  key={n.id}
                  data-node
                  transform={`translate(${n.x - NODE_W / 2} ${n.y - NODE_H / 2})`}
                  className="cursor-pointer"
                  opacity={dimmed ? 0.25 : 1}
                  style={{ transition: "opacity 200ms" }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected((s) => (s === n.id ? null : n.id));
                  }}
                >
                  {isActiveNode ? (
                    <rect x={-4} y={-4} width={NODE_W + 8} height={NODE_H + 8} rx="10" fill="none" stroke={project.accent} strokeOpacity="0.5" strokeWidth="1">
                      <animate attributeName="stroke-opacity" values="0.6;0.1;0.6" dur="1.2s" repeatCount="indefinite" />
                    </rect>
                  ) : null}
                  <rect
                    width={NODE_W}
                    height={NODE_H}
                    rx="8"
                    fill={isSel ? "#1a1e28" : "#12151d"}
                    stroke={isSel || isHov ? meta.color : visited ? `${meta.color}88` : "#2f3648"}
                    strokeWidth={isSel ? 1.6 : 1}
                    filter={isSel ? `url(#glow-${project.id})` : undefined}
                  />
                  <rect x="0" y="0" width="4" height={NODE_H} rx="2" fill={meta.color} opacity={visited || isSel ? 1 : 0.4} />
                  <foreignObject x="10" y="8" width="18" height="18">
                    <div style={{ color: meta.color, display: "flex" }}>
                      <meta.Icon width={14} height={14} />
                    </div>
                  </foreignObject>
                  <text x="32" y="19" fontSize="11.5" fontWeight="600" fill="#ece7dd" fontFamily="var(--font-sans)">
                    {n.label.length > 17 ? `${n.label.slice(0, 16)}…` : n.label}
                  </text>
                  <text x="32" y="35" fontSize="9" fill="#7a8092" fontFamily="var(--font-mono)" letterSpacing="0.08em">
                    {meta.label.toUpperCase()}
                  </text>
                  {n.metrics[0] ? (
                    <text x={NODE_W - 8} y="35" fontSize="9" fill={meta.color} fontFamily="var(--font-mono)" textAnchor="end">
                      {n.metrics[0].v}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>
        </svg>

        {/* legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line px-3 py-2">
          {(Object.keys(kindMeta) as NodeKind[])
            .filter((k) => nodes.some((n) => n.kind === k))
            .map((k) => (
              <span key={k} className="mono flex items-center gap-1.5 text-[10px] tracking-wider text-mute">
                <span className="h-2 w-2 rounded-sm" style={{ background: kindMeta[k].color }} />
                {kindMeta[k].label.toUpperCase()}
              </span>
            ))}
          <span className="mono ml-auto hidden text-[10px] text-mute sm:inline">drag to pan · click a node to inspect</span>
        </div>
      </div>

      {/* inspector */}
      <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-line bg-ink-2">
        <AnimatePresence mode="wait">
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="flex h-full flex-col p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="mono text-[10px] tracking-[0.2em]" style={{ color: kindMeta[selectedNode.kind].color }}>
                    {kindMeta[selectedNode.kind].label.toUpperCase()}
                  </div>
                  <h4 className="mt-1 text-lg font-semibold leading-tight text-paper">{selectedNode.label}</h4>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-md border border-line-2 p-1 text-mute hover:text-paper" aria-label="Close inspector">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-paper-2">{selectedNode.detail}</p>
              {selectedNode.metrics.length ? (
                <dl className="mt-4 grid grid-cols-2 gap-2">
                  {selectedNode.metrics.map((m) => (
                    <div key={m.k} className="rounded-md border border-line bg-ink-3 px-2.5 py-2">
                      <dt className="mono text-[9.5px] uppercase tracking-wider text-mute">{m.k}</dt>
                      <dd className="mono mt-0.5 text-[12.5px] text-paper">{m.v}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <div className="mt-auto space-y-2 pt-4">
                {inbound.length ? (
                  <div>
                    <div className="mono text-[9.5px] tracking-widest text-mute">INBOUND</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {inbound.map((e) => (
                        <button key={edgeKey(e)} onClick={() => setSelected(e.from)} className="mono rounded border border-line-2 px-1.5 py-0.5 text-[10px] text-paper-2 hover:border-teal/50 hover:text-teal">
                          ← {nodeMap[e.from].label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
                {outbound.length ? (
                  <div>
                    <div className="mono text-[9.5px] tracking-widest text-mute">OUTBOUND</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {outbound.map((e) => (
                        <button key={edgeKey(e)} onClick={() => setSelected(e.to)} className="mono rounded border border-line-2 px-1.5 py-0.5 text-[10px] text-paper-2 hover:border-signal/50 hover:text-signal">
                          {nodeMap[e.to].label} →
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col p-4">
              <div className="mono text-[10px] tracking-[0.2em] text-mute">INSPECTOR</div>
              <h4 className="mt-1 text-lg font-semibold text-paper">Topology overview</h4>
              <p className="mt-2 text-[13px] leading-relaxed text-paper-2">{project.tagline}</p>
              <ul className="mt-4 space-y-1.5">
                {nodes.map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => setSelected(n.id)}
                      onMouseEnter={() => setHovered(n.id)}
                      onMouseLeave={() => setHovered(null)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-[12.5px] text-paper-2 transition-colors hover:bg-ink-3 hover:text-paper"
                    >
                      <span className="h-1.5 w-1.5 rounded-sm" style={{ background: kindMeta[n.kind].color }} />
                      <span className="flex-1">{n.label}</span>
                      {visitedNodes.has(n.id) ? <span className="mono text-[9px] text-lime">●</span> : <span className="mono text-[9px] text-mute">○</span>}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mono mt-auto pt-4 text-[10px] leading-relaxed text-mute">
                {nodes.length} nodes · {edges.length} edges · {flow.length} hops per cycle
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
