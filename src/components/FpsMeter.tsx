// TEMPORARY performance debug overlay — REMOVE before merge to main.
// Shows live FPS in the corner so Katia can measure on her machine
// (Claude-in-Chrome runs in a hidden tab and can't measure FPS).
import { useEffect, useRef, useState } from 'react';

export const FpsMeter = () => {
  const [fps, setFps] = useState(0);
  const [min, setMin] = useState(999);
  const frames = useRef(0);
  const last = useRef(performance.now());
  const minRef = useRef(999);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      frames.current++;
      const now = performance.now();
      const elapsed = now - last.current;
      if (elapsed >= 1000) {
        const current = Math.round((frames.current * 1000) / elapsed);
        setFps(current);
        if (current < minRef.current) {
          minRef.current = current;
          setMin(current);
        }
        frames.current = 0;
        last.current = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const color = fps >= 50 ? '#10b981' : fps >= 30 ? '#f59e0b' : '#ef4444';

  return (
    <div
      style={{
        position: 'fixed',
        top: 8,
        left: 8,
        zIndex: 2147483647,
        background: 'rgba(0,0,0,0.85)',
        color,
        font: '700 13px/1.2 monospace',
        padding: '6px 10px',
        borderRadius: 8,
        border: '1px solid ' + color,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      FPS {fps} · min {min === 999 ? '—' : min}
    </div>
  );
};
