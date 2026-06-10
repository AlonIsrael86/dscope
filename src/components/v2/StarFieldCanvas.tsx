// HOME-V2 PERF: one <canvas> replaces N individually-animated star divs.
// The original GalaxyBackground renders 450 motion.divs, each running its
// own infinite Framer Motion opacity/scale loop (450 JS animation tickers
// + 450 composite layers). This canvas draws the same star field - same
// density, same size range, same twinkle rhythm, same glow on the "near"
// layer - in a single rAF loop throttled to 30fps (twinkle is slow; 30fps
// is visually indistinguishable for sub-pixel dots).
//
// Visual parity contract (vs GalaxyBackground.tsx):
//   layer "far"  = stars2: 250 stars, 1-2.5px, opacity 0.2-0.7, slow pulse
//   layer "near" = stars1: 200 stars, 1-3px, opacity 0.4-1.2 clamp 1,
//                  radius pulse 0.7-1.3, soft white glow
// Pauses on: tab hidden, container off-screen, reduced-effects (static draw).
import React, { useEffect, useRef } from 'react';
import { useReducedEffects } from '../../hooks/useReducedEffects';

interface StarFieldCanvasProps {
  layer: 'near' | 'far';
  className?: string;
}

interface Star {
  x: number;       // 0..1 of width
  y: number;       // 0..1 of height
  r: number;       // px radius
  baseAlpha: number;
  phase: number;   // twinkle phase offset
  speed: number;   // twinkle radians/sec
  pulse: number;   // radius pulse amplitude (near layer only)
}

const LAYER_CONFIG = {
  far:  { count: 250, rMin: 0.5, rMax: 1.25, aMin: 0.2, aMax: 0.7, durMin: 2, durMax: 5, glow: false, pulse: 0 },
  near: { count: 200, rMin: 0.5, rMax: 1.5,  aMin: 0.4, aMax: 1.0, durMin: 1, durMax: 3, glow: true,  pulse: 0.3 },
} as const;

export const StarFieldCanvas = ({ layer, className = '' }: StarFieldCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reduced } = useReducedEffects();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cfg = LAYER_CONFIG[layer];

    // Deterministic-ish star field, generated once per mount.
    const stars: Star[] = Array.from({ length: cfg.count }, () => ({
      x: Math.random(),
      y: Math.random() * 1.2, // matches the original 120% top spread
      r: cfg.rMin + Math.random() * (cfg.rMax - cfg.rMin),
      baseAlpha: cfg.aMin + Math.random() * (cfg.aMax - cfg.aMin),
      phase: Math.random() * Math.PI * 2,
      speed: (Math.PI * 2) / (cfg.durMin + Math.random() * (cfg.durMax - cfg.durMin)),
      pulse: cfg.pulse,
    }));

    // Pre-render the glow sprite once (radial gradient) - drawImage of a
    // tiny sprite is ~free vs canvas shadowBlur on every star.
    let glowSprite: HTMLCanvasElement | null = null;
    if (cfg.glow) {
      glowSprite = document.createElement('canvas');
      glowSprite.width = 32; glowSprite.height = 32;
      const gctx = glowSprite.getContext('2d')!;
      const grad = gctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,0.55)');
      grad.addColorStop(0.4, 'rgba(255,255,255,0.18)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, 32, 32);
    }

    let raf = 0;
    let running = false;
    let inView = true;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    const FRAME_MS = 1000 / 30; // twinkle at 30fps - indistinguishable, half the cost
    let lastDraw = 0;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.max(1, Math.round(clientWidth * DPR));
      canvas.height = Math.max(1, Math.round(clientHeight * DPR));
    };

    const draw = (t: number) => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const ts = t / 1000;
      for (const s of stars) {
        const tw = reduced ? 0.6 : 0.5 + 0.5 * Math.sin(s.phase + ts * s.speed);
        const alpha = Math.min(1, s.baseAlpha * (0.3 + 0.9 * tw));
        const r = s.r * (1 + (s.pulse ? (tw - 0.5) * 2 * s.pulse : 0)) * DPR;
        const x = s.x * w, y = s.y * h;
        if (glowSprite && s.r > 0.9) {
          ctx.globalAlpha = alpha * 0.8;
          const gs = r * 8;
          ctx.drawImage(glowSprite, x - gs / 2, y - gs / 2, gs, gs);
        }
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      if (!running) return;
      if (t - lastDraw >= FRAME_MS) { lastDraw = t; draw(t); }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const syncRunState = () => {
      if (document.hidden || !inView || reduced) stop(); else start();
    };

    resize();
    if (reduced) {
      // Static field - draw once, no loop (mirrors LITE's static dots,
      // but keeps FULL density since drawing once costs nothing).
      draw(0);
    } else {
      start();
    }

    const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
    ro.observe(canvas);
    const io = new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      syncRunState();
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', syncRunState);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', syncRunState);
    };
  }, [layer, reduced]);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} aria-hidden="true" />;
};
