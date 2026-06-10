// TEMPORARY performance debug overlay — REMOVE before merge to main.
// Self-gated behind the `?fps=1` query param so it never shows on the
// normal page. Shows live FPS + the rolling minimum since the last route
// change + which route you're on, so / and /home-v2 can be compared
// cleanly (each route gets a fresh min).
//
// Compare: open  /?fps=1  and  /home-v2?fps=1  and scroll each fast.
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const FpsMeter = () => {
  const location = useLocation();
  const [fps, setFps] = useState(0);
  const [min, setMin] = useState(999);
  const frames = useRef(0);
  const last = useRef(performance.now());
  const minRef = useRef(999);

  // Reset the rolling min whenever the route changes, so each page is
  // measured from scratch (the App-level meter does NOT re-mount on nav).
  useEffect(() => {
    minRef.current = 999;
    setMin(999);
    frames.current = 0;
    last.current = performance.now();
  }, [location.pathname]);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      frames.current++;
      const now = performance.now();
      const elapsed = now - last.current;
      if (elapsed >= 500) {
        const current = Math.round((frames.current * 1000) / elapsed);
        setFps(current);
        // ignore the very first sample after a route change (mount spike)
        if (current < minRef.current && current > 0) {
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

  // Self-gate: only render when ?fps is present in the URL.
  if (typeof window !== 'undefined' && !new URLSearchParams(window.location.search).has('fps')) {
    return null;
  }

  const color = fps >= 50 ? '#10b981' : fps >= 30 ? '#f59e0b' : '#ef4444';
  const routeLabel = location.pathname === '/home-v2' ? 'home-v2 (NEW)' : location.pathname === '/' ? 'home (ORIGINAL)' : location.pathname;

  return (
    <div
      style={{
        position: 'fixed',
        top: 8,
        left: 8,
        zIndex: 2147483647,
        background: 'rgba(0,0,0,0.85)',
        color,
        font: '700 14px/1.4 monospace',
        padding: '8px 12px',
        borderRadius: 8,
        border: '1px solid ' + color,
        pointerEvents: 'none',
        userSelect: 'none',
        textAlign: 'left',
      }}
    >
      <div style={{ color: '#9ca3af', fontSize: 11, marginBottom: 2 }}>{routeLabel}</div>
      <div>FPS {fps} · min {min === 999 ? '—' : min}</div>
    </div>
  );
};
