import React, { useEffect, useMemo, useRef } from 'react';
import { motion } from 'motion/react';

/**
 * NebulaBackground
 *
 * Cosmic dashboard background per Katia:
 *  - Constellation: ~24 round nodes drifting in straight lines at the same
 *    speed but each at its own random angle → looks chaotic, not synced.
 *    Bounce off viewport edges (continuous motion edge-to-edge).
 *    Each node connects to its 4 nearest neighbors → lines persist while
 *    nodes traverse, naturally re-wiring as neighborhoods change.
 *  - 50 twinkling background stars, slow ambient.
 *  - Two soft nebula blobs + base gradient + vignette.
 *
 * Constellation is drawn on <canvas> (single rAF loop, no React re-render
 * per frame) for smooth 60fps. Rest is Framer Motion / static CSS.
 */

const NODE_COLORS = ['#60a5fa', '#a855f7', '#22d3ee', '#34d399', '#fbbf24', '#ec4899', '#f97316', '#818cf8'];
const NODE_COUNT = 24;
const NODE_SPEED = 0.45; // px per frame — same for every node (chaos comes from angles)
const CONNECTIONS_PER_NODE = 4;

type Node = { x: number; y: number; vx: number; vy: number; color: string; r: number };

export const NebulaBackground = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);

  // Twinkling background stars — pure CSS / Framer, no canvas
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.6 + 1,
        twinkleDelay: Math.random() * 4,
        twinkleDuration: 2.5 + Math.random() * 4,
      })),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seedNodes = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      nodesRef.current = Array.from({ length: NODE_COUNT }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * NODE_SPEED,
          vy: Math.sin(angle) * NODE_SPEED,
          color: NODE_COLORS[i % NODE_COLORS.length],
          r: 3.5 + Math.random() * 2.5,
        };
      });
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodesRef.current.length === 0) seedNodes();
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;

      // Physics: straight-line motion at constant speed, bounce off edges
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x <= 0) { n.x = 0; n.vx = Math.abs(n.vx); }
        else if (n.x >= w) { n.x = w; n.vx = -Math.abs(n.vx); }
        if (n.y <= 0) { n.y = 0; n.vy = Math.abs(n.vy); }
        else if (n.y >= h) { n.y = h; n.vy = -Math.abs(n.vy); }
      }

      // Connections: each node draws lines to its 4 nearest neighbors.
      // Use a Set to avoid double-drawing the same pair.
      ctx.lineCap = 'round';
      const drawn = new Set<string>();
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const dists: Array<{ j: number; d: number }> = [];
        for (let j = 0; j < nodes.length; j++) {
          if (j === i) continue;
          const b = nodes[j];
          dists.push({ j, d: Math.hypot(a.x - b.x, a.y - b.y) });
        }
        dists.sort((p, q) => p.d - q.d);
        for (let k = 0; k < CONNECTIONS_PER_NODE && k < dists.length; k++) {
          const { j, d } = dists[k];
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (drawn.has(key)) continue;
          drawn.add(key);
          const b = nodes[j];
          // Fade with distance — far links almost invisible
          const alpha = Math.max(0, 0.35 - d / 1400);
          ctx.strokeStyle = `rgba(148,163,184,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodes: glow halo + solid core
      for (const n of nodes) {
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.5);
        grd.addColorStop(0, n.color);
        grd.addColorStop(0.45, n.color + '55');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
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
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.95, 1] }}
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
        animate={{ x: [0, -30, 25, 0], y: [0, 25, -15, 0], scale: [1, 0.92, 1.07, 1] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Twinkling ambient stars */}
      {stars.map((s) => (
        <motion.div
          key={`star-${s.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 4px rgba(255,255,255,0.7)',
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: s.twinkleDuration, repeat: Infinity, delay: s.twinkleDelay, ease: 'easeInOut' }}
        />
      ))}

      {/* Constellation canvas — 24 nodes drifting in straight lines at
          constant speed, each its own random angle; bounce off edges; 4
          nearest-neighbor connection lines per node, continuously updated */}
      <canvas ref={canvasRef} className="absolute inset-0" />

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
