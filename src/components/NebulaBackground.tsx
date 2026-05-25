import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';

/**
 * NebulaBackground
 *
 * Cosmic dashboard background — replaces the previous DeepOceanBackground on
 * /dashboards per Katia's call ("no ocean, want cosmic + elegant").
 *
 * Layers (back → front):
 *  - Deep gradient base (indigo → black → violet)
 *  - Two large soft nebula blobs (slow drift + breathing scale)
 *  - Drifting starfield (50 stars, true circles, each one continuously
 *    wanders a small random orbit)
 *  - Constellation network: 7 glowing data nodes that random-walk across
 *    the whole viewport; SVG lines connect them and continuously re-render
 *    as the nodes move (per Katia: "точки рухаються хаотично, а зв'язки
 *    між ними залишаються")
 *  - Top + bottom vignette so the dashboard UI stays readable
 *
 * All animation is CSS / Framer Motion + tiny React state — no Three.js.
 */

type NodePos = { id: number; x: number; y: number; color: string };

const NODE_COLORS = ['#60a5fa', '#a855f7', '#22d3ee', '#34d399', '#fbbf24', '#ec4899', '#f97316'];

const INITIAL_NODES: NodePos[] = NODE_COLORS.map((color, id) => ({
  id,
  x: 10 + Math.random() * 80,
  y: 15 + Math.random() * 70,
  color,
}));

export const NebulaBackground = React.memo(() => {
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        startLeft: Math.random() * 100,
        startTop: Math.random() * 100,
        size: Math.random() * 1.8 + 1.2,
        twinkleDelay: Math.random() * 4,
        twinkleDuration: 2.5 + Math.random() * 4,
        driftDuration: 14 + Math.random() * 16,
        driftDx: (Math.random() - 0.5) * 60, // px wander range
        driftDy: (Math.random() - 0.5) * 60,
      })),
    []
  );

  // Constellation nodes — state-driven random walk so SVG lines re-render with them
  const [nodes, setNodes] = useState<NodePos[]>(INITIAL_NODES);

  useEffect(() => {
    const id = setInterval(() => {
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          x: Math.max(6, Math.min(94, n.x + (Math.random() - 0.5) * 22)),
          y: Math.max(8, Math.min(92, n.y + (Math.random() - 0.5) * 22)),
        }))
      );
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, #1e1b4b 0%, #050416 45%, #000000 100%), radial-gradient(ellipse at 80% 80%, #2e1065 0%, transparent 60%)',
          backgroundBlendMode: 'screen',
        }}
      />

      {/* Two soft nebula blobs (slow drift + breathing scale) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: '15%',
          top: '20%',
          width: '50vw',
          height: '50vw',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0) 65%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          right: '10%',
          bottom: '15%',
          width: '45vw',
          height: '45vw',
          background:
            'radial-gradient(circle, rgba(168,85,247,0.28) 0%, rgba(168,85,247,0) 65%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, -30, 25, 0],
          y: [0, 25, -15, 0],
          scale: [1, 0.92, 1.07, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Drifting starfield — true circles (equal w/h, rounded-full),
          each wandering its own random orbit + twinkling */}
      {stars.map((s) => (
        <motion.div
          key={`star-${s.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.startLeft}%`,
            top: `${s.startTop}%`,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 4px rgba(255,255,255,0.7)',
          }}
          animate={{
            x: [0, s.driftDx, -s.driftDx * 0.6, 0],
            y: [0, s.driftDy, -s.driftDy * 0.6, 0],
            opacity: [0.25, 1, 0.4, 1, 0.25],
          }}
          transition={{
            x: { duration: s.driftDuration, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: s.driftDuration * 0.9, repeat: Infinity, ease: 'easeInOut' },
            opacity: {
              duration: s.twinkleDuration,
              repeat: Infinity,
              delay: s.twinkleDelay,
              ease: 'easeInOut',
            },
          }}
        />
      ))}

      {/* Constellation: faint connection lines between nodes
          (re-renders on nodes state change → lines follow the random walk) */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length];
          return (
            <motion.line
              key={`l-${n.id}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(148,163,184,0.28)"
              strokeWidth="0.18"
              strokeDasharray="0.4 0.8"
              initial={false}
              animate={{ x1: n.x, y1: n.y, x2: next.x, y2: next.y }}
              transition={{ duration: 2.6, ease: 'easeInOut' }}
            />
          );
        })}
      </svg>

      {/* Constellation nodes as motion.div circles (round, never stretched).
          They animate to new positions every ~2.8s — lines above follow. */}
      {nodes.map((n) => (
        <motion.div
          key={`n-${n.id}`}
          className="absolute rounded-full"
          initial={false}
          animate={{ left: `${n.x}%`, top: `${n.y}%` }}
          transition={{ duration: 2.6, ease: 'easeInOut' }}
          style={{
            width: 14,
            height: 14,
            backgroundColor: n.color,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 14px ${n.color}, 0 0 24px ${n.color}90`,
          }}
        />
      ))}

      {/* Top + bottom vignette for foreground readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.7) 100%)',
        }}
      />
    </div>
  );
});

NebulaBackground.displayName = 'NebulaBackground';
