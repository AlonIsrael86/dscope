import React, { useRef, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

export const ScrollParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const progressRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    progressRef.current = latest;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // PERF: respect reduced-motion + halve particle count on mobile.
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // skip particle animation entirely
    }
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const PARTICLE_TOTAL = isMobile ? 150 : 400;
    const PARTICLE_BASE = isMobile ? 25 : 50;
    const PARTICLE_RANGE = isMobile ? 125 : 350;

    let particles: { x: number, y: number, size: number, speedX: number, speedY: number, baseOpacity: number }[] = [];
    // PERF: cap device pixel ratio at 1 for this fullscreen 2d canvas.
    // The particles are small and the visual loss is invisible, but going
    // 2x on a 1440 screen quadruples per-frame fill work.
    const dpr = 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_TOTAL; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          baseOpacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    window.addEventListener('resize', resize);
    resize();

    let animationFrameId: number;
    let running = !(typeof document !== 'undefined' && document.hidden);

    const render = () => {
      if (!running) {
        animationFrameId = 0;
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const progress = progressRef.current;

      const activeCount = Math.floor(PARTICLE_BASE + progress * PARTICLE_RANGE);
      const speedMultiplier = 1 + (progress * 4);

      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];

        p.x += p.speedX * speedMultiplier;
        p.y += p.speedY * speedMultiplier - (progress * 2);

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        const opacity = Math.min(1, p.baseOpacity + (progress * 0.4));
        ctx.fillStyle = `rgba(100, 200, 255, ${opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      const shouldRun = !(typeof document !== 'undefined' && document.hidden);
      if (shouldRun && !running) {
        running = true;
        animationFrameId = requestAnimationFrame(render);
      } else if (!shouldRun) {
        running = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    render();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[1] mix-blend-screen opacity-60"
    />
  );
};
