import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/**
 * GalaxyAboutBackground
 *
 * Minimal galaxy backdrop dedicated to /about. The whole color palette
 * gently shifts as the visitor scrolls — page-bottom is a different hue
 * than page-top, with smooth midpoints between. All colors stay inside
 * the site's cosmic palette (deep indigo / violet / cyan / emerald);
 * nothing warm (no orange, gold, red, brown).
 *
 * Layers (back → front):
 *  - Scroll-driven primary gradient (3 keyframes: indigo → violet → cyan-indigo)
 *  - Single soft "galaxy core" blob, scroll-shifted in color too
 *  - Sparse drifting starfield on <canvas> (40 dots, slow parallax, no bounce —
 *    pure linear drift edge to edge so the field stays minimal and elegant)
 *  - Subtle vignette
 *
 * Performance: one rAF for the starfield, Framer Motion's CSS-var
 * interpolation for the gradient/blob. No SVG, no Three.js.
 */
export const GalaxyAboutBackground = React.memo(() => {
  const { scrollYProgress } = useScroll();

  // Color stops along scroll (0 → 1) — all cosmic, in-palette
  const colorTop = useTransform(scrollYProgress, [0, 0.5, 1], ['#1e1b4b', '#3b0764', '#0e1a3a']);
  const colorMid = useTransform(scrollYProgress, [0, 0.5, 1], ['#312e81', '#581c87', '#0c4a6e']);
  const colorBottom = useTransform(scrollYProgress, [0, 0.5, 1], ['#020617', '#0b021a', '#020617']);
  const coreColor = useTransform(scrollYProgress, [0, 0.5, 1], ['rgba(99,102,241,0.30)', 'rgba(168,85,247,0.30)', 'rgba(34,211,238,0.28)']);

  // Compose the gradient string from the three motion values
  const gradient = useTransform(
    [colorTop, colorMid, colorBottom],
    ([t, m, b]) => `linear-gradient(180deg, ${t} 0%, ${m} 55%, ${b} 100%)`
  );
  const coreBg = useTransform(
    [coreColor],
    ([c]) => `radial-gradient(circle, ${c} 0%, rgba(0,0,0,0) 65%)`
  );

  // Minimal starfield on canvas — slow linear drift, wrap around edges
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  type Star = { x: number; y: number; vx: number; vy: number; r: number; a: number };
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      starsRef.current = Array.from({ length: 40 }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.08 + Math.random() * 0.18; // very gentle
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 0.6 + Math.random() * 1.4,
          a: 0.4 + Math.random() * 0.5,
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
      if (starsRef.current.length === 0) seed();
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const s of starsRef.current) {
        s.x += s.vx;
        s.y += s.vy;
        // Wrap around — keeps motion uniform / minimal
        if (s.x < -2) s.x = w + 2;
        else if (s.x > w + 2) s.x = -2;
        if (s.y < -2) s.y = h + 2;
        else if (s.y > h + 2) s.y = -2;
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
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

  // Soft galaxy core blob — slowly orbits + scales as ambient motion
  const blobAnim = useMemo(
    () => ({
      x: [0, 30, -20, 0],
      y: [0, -25, 20, 0],
      scale: [1, 1.05, 0.96, 1],
    }),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Scroll-driven primary gradient */}
      <motion.div className="absolute inset-0" style={{ background: gradient }} />

      {/* Single soft galaxy core that breathes + drifts; color also follows scroll */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: '50%',
          top: '40%',
          width: '70vw',
          height: '70vw',
          translateX: '-50%',
          translateY: '-50%',
          background: coreBg,
          filter: 'blur(60px)',
        }}
        animate={blobAnim}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Minimal starfield */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Subtle vignette for foreground readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.65) 100%)',
        }}
      />
    </div>
  );
});

GalaxyAboutBackground.displayName = 'GalaxyAboutBackground';
