// P2 perf: only render heavy children when the section is in / near the
// viewport. Offscreen sections unmount, so their framer-motion
// repeat:Infinity animations stop consuming the main thread.
//
// Visual safety: rootMargin is large (default 1200px) so the section is
// already mounted well before it scrolls into view — the user never sees
// an empty gap. A fixed minHeight placeholder keeps scroll position
// stable (no layout shift) while unmounted.
import { useEffect, useRef, useState, type ReactNode } from 'react';

interface InViewGateProps {
  children: ReactNode;
  /** Placeholder height while unmounted. Keep close to real section height. */
  minHeight?: string;
  /** Mount this much before the section enters the viewport. */
  rootMargin?: string;
  /** Render children on first paint (true for above-the-fold sections). */
  initialInView?: boolean;
}

export const InViewGate = ({
  children,
  minHeight = '60vh',
  rootMargin = '1200px 0px',
  initialInView = false,
}: InViewGateProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(initialInView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting),
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={inView ? undefined : { minHeight }}>
      {inView ? children : null}
    </div>
  );
};
