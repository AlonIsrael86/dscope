import { useEffect, useRef } from 'react';
import { PrismStage } from './PrismStage';
import { WhatDscopeSees } from './WhatDscopeSees';

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Alternative hero for dscope — Δ prism scroll-driven hero.
 * Standalone page, mounted at /scroll-hero. Does NOT touch the main App.
 */
export default function PrismHeroPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollMultiplier = 3.5;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const t = Math.min(1, Math.max(0, -rect.top / scrollable));
      progressRef.current = t;

      // Hero text fades 0.30 → 0.50 to clear the dramatic moment
      const hero = heroOverlayRef.current;
      if (hero) {
        const ht = t < 0.3 ? 1 : t > 0.5 ? 0 : 1 - (t - 0.3) / 0.2;
        hero.style.opacity = String(ht);
        hero.style.transform = `translate3d(0, ${(1 - ht) * -20}px, 0)`;
      }

      // Glow wash behind canvas — peaks at the dramatic moment (t≈0.35)
      const glow = glowRef.current;
      if (glow) {
        // Triangular peak: 0 at t=0, max at t=0.35, fades by t=0.7
        const g =
          t < 0.35
            ? t / 0.35
            : t < 0.7
              ? 1 - (t - 0.35) / 0.35
              : 0;
        glow.style.opacity = String(g * 0.85);
        glow.style.transform = `scale(${0.85 + g * 0.4})`;
      }

      // Counter-card slides in 0.55 → 0.80
      const card = cardWrapperRef.current;
      if (card) {
        const ct = t < 0.55 ? 0 : Math.min(1, (t - 0.55) / 0.25);
        const e = easeInOutCubic(ct);
        const y = 40 + (1 - e) * 50;
        const x = (1 - e) * -30;
        card.style.opacity = String(e);
        card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        card.style.pointerEvents = ct > 0.5 ? 'auto' : 'none';
      }

      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white antialiased">
      <section
        ref={sectionRef}
        style={{ height: `${scrollMultiplier * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Deep-space gradient backdrop behind the canvas */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 80% at 50% 35%, #0b1734 0%, #050b1f 50%, #020617 100%)',
            }}
          />

          {/* Scroll-driven glow wash — peaks behind prism at dramatic moment */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute inset-0 transition-transform"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 55%, rgba(79,172,254,0.55) 0%, rgba(0,242,254,0.18) 30%, rgba(2,6,23,0) 65%)',
              opacity: 0,
              willChange: 'opacity, transform',
              transformOrigin: 'center',
            }}
          />

          {/* The 3D canvas */}
          <PrismStage progressRef={progressRef} />

          {/* Subtle top wash so the headline stays legible without dimming the prism */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
            style={{
              background:
                'linear-gradient(180deg, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0) 100%)',
            }}
          />

          {/* Hero overlay — italic display headline (matches dscope brand) */}
          <div
            ref={heroOverlayRef}
            className="pointer-events-none absolute inset-x-0 top-[14vh] z-20 mx-auto max-w-5xl px-6 text-center transition-opacity"
          >
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.42em] text-cyan-300/80">
              Δ scope · enterprise ai visibility
            </div>
            <h1 className="text-balance text-5xl font-semibold italic leading-[1.05] tracking-tight md:text-7xl">
              See your brand{' '}
              <span className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent">
                through every lens
              </span>{' '}
              that matters.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/65 md:text-lg">
              dscope refracts your enterprise signal across AI assistants, search,
              and generative engines — so you know exactly where you stand,
              where you&apos;re losing share, and what to fix next.
            </p>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
              scroll
              <span className="ms-2 inline-block h-3 w-px animate-pulse bg-white/40 align-middle" />
            </div>
          </div>

          {/* Counter-balance card — bottom-left, slides in as prism exits upper-right */}
          <div
            ref={cardWrapperRef}
            className="absolute bottom-6 left-6 z-30 opacity-0"
            style={{ transform: 'translate3d(-30px, 90px, 0)' }}
          >
            <WhatDscopeSees />
          </div>
        </div>
      </section>

      {/* After the sticky stage releases, a brief outro block + back-to-main link */}
      <section className="border-t border-white/10 bg-[#020617] px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-cyan-300/80">
            alternative hero · concept
          </div>
          <h2 className="text-balance text-3xl font-semibold italic md:text-4xl">
            One prism. Three lenses. Every enterprise signal that matters.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            This is a concept variant of the dscope hero. The main site lives at{' '}
            <a href="/" className="text-cyan-300 underline-offset-4 hover:underline">
              dscope.targetbob.ai
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
