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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, size: number, speedX: number, speedY: number, baseOpacity: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 400; i++) {
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

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const progress = progressRef.current;
      
      const activeCount = Math.floor(50 + progress * 350);
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

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[1] mix-blend-screen opacity-60"
    />
  );
};
