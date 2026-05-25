import React, { useMemo } from 'react';
import { motion } from 'motion/react';

/**
 * NebulaBackground
 *
 * Elegant cosmic dashboard background — replaces DeepOceanBackground per
 * Katia's call ("no ocean on /dashboard, want something cosmic and elegant").
 *
 * Layers (back → front):
 *  - Deep gradient base (indigo → black → violet)
 *  - Two large soft nebula blobs (slow drift + breathing scale)
 *  - Drifting star field (50 stars, twinkle staggered)
 *  - Sparse "data nodes" connected by faint lines (constellation feel,
 *    matches "data dashboards" content above the bg)
 *  - Top/bottom vignette so foreground UI stays readable
 *
 * All animations are CSS / Framer Motion — no Three.js, cheap to render.
 */
export const NebulaBackground = React.memo(() => {
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.8 + 0.6,
        delay: Math.random() * 4,
        duration: 2.5 + Math.random() * 4,
      })),
    []
  );

  const nodes = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        y: 15 + Math.random() * 70,
        color: ['#60a5fa', '#a855f7', '#22d3ee', '#34d399'][i % 4],
      })),
    []
  );

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

      {/* Two soft nebula blobs */}
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

      {/* Twinkling star field */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 4px rgba(255,255,255,0.7)',
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Constellation: faint connection lines + glowing data nodes */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length];
          return (
            <line
              key={`l-${n.id}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(148,163,184,0.18)"
              strokeWidth="0.15"
              strokeDasharray="0.4 0.8"
            />
          );
        })}
        {nodes.map((n) => (
          <g key={`n-${n.id}`}>
            <circle cx={n.x} cy={n.y} r="0.9" fill={n.color} opacity="0.85">
              <animate
                attributeName="r"
                values="0.9;1.4;0.9"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={n.x}
              cy={n.y}
              r="2.5"
              fill="none"
              stroke={n.color}
              strokeWidth="0.15"
              opacity="0.35"
            >
              <animate
                attributeName="r"
                values="2;3.5;2"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.35;0;0.35"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>

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
