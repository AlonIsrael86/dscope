// HOME-CONCEPT: internal design-demo route (/home-concept). A ground-up
// redesign proposal for the home page - NOT linked from the nav, NOT the
// live home. The live home stays untouched at /.
//
// Design contract (from the 2026-06-10 redesign brief):
//   Metaphor: "signal resolving into a decision" - scattered points of light
//   converge into one clean line. Deep-space editorial, single blue-to-cyan
//   accent (#4FACFE -> #00F2FE), emerald (#34D399) only for the lead-lock
//   gesture. Italic Outfit 900 display, JetBrains Mono eyebrows, Inter body.
//   Motion explains (converge, underline draw, lock) - never decorates.
//
// Perf contract (inherits the home-v2 discipline): one capped-30fps canvas
// for the hero signal, CSS transitions for reveals, transform/opacity only,
// pauses off-screen / hidden tab, static under prefers-reduced-motion.
import React, { useEffect, useRef, useState } from 'react';
import { StarFieldCanvas } from '../components/v2/StarFieldCanvas';
import { useReducedEffects } from '../hooks/useReducedEffects';

/* ------------------------------------------------------------------ */
/* shared reveal-on-scroll (IntersectionObserver -> CSS class)         */
/* ------------------------------------------------------------------ */
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
};

const Reveal = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={`hc-reveal ${shown ? 'hc-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* mono eyebrow with a drawing underline                               */
/* ------------------------------------------------------------------ */
const Eyebrow = ({ children }: { children: React.ReactNode }) => {
  const { ref, shown } = useReveal();
  return (
    <div ref={ref} className="inline-block">
      <div className={`hc-reveal ${shown ? 'hc-in' : ''} font-mono text-[11px] md:text-xs uppercase tracking-[0.38em] text-white/60`}>
        {children}
      </div>
      <div className={`hc-tick ${shown ? 'hc-tick-in' : ''}`} aria-hidden="true" />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* hero signal canvas: scattered noise converges into one clean line   */
/* ------------------------------------------------------------------ */
const SignalCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reduced } = useReducedEffects();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // deterministic LCG so the field is stable across visits
    let seed = 42;
    const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;

    const N = 110;
    const parts = Array.from({ length: N }, (_, i) => ({
      hx: 0.06 + rnd() * 0.88, // chaos home (fraction of w/h)
      hy: 0.12 + rnd() * 0.76,
      ph: rnd() * Math.PI * 2,
      sp: 2 + rnd() * 6,
      amp: 0.006 + rnd() * 0.02,
      r: 0.8 + rnd() * 1.6,
      t: i / (N - 1), // slot along the resolved line
    }));

    // resolved line: gentle ascending arc, left-low -> right-high
    const lineAt = (t: number, w: number, h: number) => ({
      x: w * (0.06 + t * 0.88),
      y: h * (0.74 - t * 0.42) + Math.sin(t * Math.PI) * h * -0.05,
    });

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    const FRAME_MS = 1000 / 30;
    let raf = 0;
    let running = false;
    let inView = true;
    let lastDraw = 0;
    let born = 0; // first-frame timestamp; converge eases over 3.2s

    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * DPR));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * DPR));
    };

    const draw = (now: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      if (!born) born = now;
      const T = (now - born) / 1000;
      // phase 0 -> 1 over 3.2s starting after a 0.6s beat (smoothstep)
      const raw = reduced ? 1 : Math.min(1, Math.max(0, (T - 0.6) / 3.2));
      const P = raw * raw * (3 - 2 * raw);

      // the resolved line strokes in underneath once converge passes 45%
      if (P > 0.45) {
        const lt = Math.min(1, (P - 0.45) / 0.5);
        const a = lineAt(0, w, h);
        const b = lineAt(1, w, h);
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, '#4FACFE');
        grad.addColorStop(1, '#00F2FE');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2 * DPR;
        ctx.globalAlpha = 0.85 * lt;
        ctx.beginPath();
        const steps = Math.max(2, Math.round(90 * lt));
        for (let i = 0; i <= steps; i++) {
          const p = lineAt((i / steps) * lt, w, h);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      for (const p of parts) {
        const jx = (p.hx + Math.sin(T * p.sp + p.ph) * p.amp * (1 - P)) * w;
        const jy = (p.hy + Math.cos(T * p.sp * 1.3 + p.ph) * p.amp * (1 - P)) * h;
        const tgt = lineAt(p.t, w, h);
        const x = jx + (tgt.x - jx) * P;
        const y = jy + (tgt.y - jy) * P;
        // after converge, particles shimmer gently along the line
        const settledDrift = P >= 1 ? Math.sin(T * 1.4 + p.ph) * 1.5 * DPR : 0;
        const cyan = Math.round(172 + 70 * P);
        ctx.globalAlpha = 0.28 + 0.6 * Math.abs(Math.sin(p.ph + T * 1.6)) * (1 - P * 0.45);
        ctx.fillStyle = P > 0.5 ? `rgb(79,${cyan},254)` : 'rgba(255,255,255,0.85)';
        ctx.beginPath();
        ctx.arc(x, y + settledDrift, p.r * DPR * (1 - P * 0.2), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      if (!running) return;
      if (t - lastDraw >= FRAME_MS) {
        lastDraw = t;
        draw(t);
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => {
      if (document.hidden || !inView || reduced) stop();
      else start();
    };

    resize();
    if (reduced) {
      draw(0); // static resolved line - no loop
    } else {
      start();
    }

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', sync);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
};

/* ------------------------------------------------------------------ */
/* integrations constellation: many systems converge into one node     */
/* ------------------------------------------------------------------ */
const INTEGRATIONS = ['Salesforce', 'HubSpot', 'Zoho', 'Monday', 'Pipedrive', 'Dynamics'];

const Constellation = () => {
  const { ref, shown } = useReveal();
  // 6 nodes arranged on an arc feeding one center node
  const nodes = INTEGRATIONS.map((name, i) => {
    const a = (-150 + i * 60) * (Math.PI / 180); // -150deg .. +150deg sweep
    return {
      name,
      x: 400 + Math.cos(a) * 295,
      y: 250 + Math.sin(a) * 175,
    };
  });
  return (
    <div ref={ref} className={`hc-reveal ${shown ? 'hc-in' : ''} relative mx-auto max-w-[820px]`}>
      <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="Dscope connects to Salesforce, HubSpot, Zoho, Monday, Pipedrive, and Dynamics">
        <defs>
          <linearGradient id="hcSignal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#4FACFE" />
            <stop offset="1" stopColor="#00F2FE" />
          </linearGradient>
        </defs>
        {nodes.map((n) => (
          <line
            key={`l-${n.name}`}
            x1={n.x}
            y1={n.y}
            x2={400}
            y2={250}
            stroke="url(#hcSignal)"
            strokeWidth="1"
            strokeOpacity="0.35"
            className={shown ? 'hc-dash hc-dash-in' : 'hc-dash'}
            pathLength={1}
          />
        ))}
        {nodes.map((n) => (
          <g key={`n-${n.name}`}>
            <circle cx={n.x} cy={n.y} r="5" fill="#4FACFE" fillOpacity="0.9" />
            <circle cx={n.x} cy={n.y} r="11" fill="none" stroke="#4FACFE" strokeOpacity="0.25" />
            <text
              x={n.x}
              y={n.y + (n.y < 250 ? -26 : 38)}
              textAnchor="middle"
              fill="rgba(255,255,255,0.72)"
              fontSize="17"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="2"
            >
              {n.name.toUpperCase()}
            </text>
          </g>
        ))}
        {/* center: Dscope */}
        <circle cx="400" cy="250" r="13" fill="url(#hcSignal)" className={shown ? 'hc-core-pulse' : ''} />
        <circle cx="400" cy="250" r="26" fill="none" stroke="#00F2FE" strokeOpacity="0.3" />
        <text x="400" y="305" textAnchor="middle" fill="#fff" fontSize="19" fontWeight="600" fontFamily="'JetBrains Mono', monospace" letterSpacing="4">
          DSCOPE
        </text>
      </svg>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* emerald lead-lock dot (the "captured" gesture)                      */
/* ------------------------------------------------------------------ */
const LeadLock = () => {
  const { ref, shown } = useReveal();
  return (
    <div ref={ref} className="flex items-center justify-center gap-3" aria-hidden="true">
      <span className={`hc-lock ${shown ? 'hc-lock-in' : ''}`} />
      <span className={`hc-reveal ${shown ? 'hc-in' : ''} font-mono text-[11px] uppercase tracking-[0.34em] text-emerald-400/90`} style={{ transitionDelay: '350ms' }}>
        Lead captured · routed to CRM
      </span>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* product module card                                                 */
/* ------------------------------------------------------------------ */
const ModuleCard = ({
  tag,
  title,
  body,
  foot,
  emerald = false,
  delay = 0,
}: {
  tag: string;
  title: string;
  body: string;
  foot: string;
  emerald?: boolean;
  delay?: number;
}) => (
  <Reveal delay={delay}>
    <article className="h-full rounded-[2rem] border border-white/10 bg-white/[0.045] backdrop-blur-md p-8 md:p-10 flex flex-col gap-5 hover:border-white/20 transition-colors duration-300">
      <div className={`font-mono text-[10px] uppercase tracking-[0.32em] ${emerald ? 'text-emerald-400/90' : 'text-[#4FACFE]'}`}>{tag}</div>
      <h3 className="font-display italic font-black text-2xl md:text-[1.7rem] leading-snug tracking-tight text-white">{title}</h3>
      <p className="text-white/60 text-[15px] leading-relaxed flex-1">{body}</p>
      <div className={`font-mono text-[11px] uppercase tracking-[0.22em] pt-4 border-t border-white/[0.07] ${emerald ? 'text-emerald-400/80' : 'text-white/45'}`}>{foot}</div>
    </article>
  </Reveal>
);

/* ================================================================== */
/* the page                                                            */
/* ================================================================== */
export const HomeConcept = () => {
  return (
    <main id="main-content" className="relative min-h-screen bg-[#020617] text-white overflow-hidden">
      {/* route-scoped styles: reveals, ticks, dashes, lock */}
      <style>{`
        .hc-reveal { opacity: 0; transform: translateY(26px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); will-change: opacity, transform; }
        .hc-in { opacity: 1; transform: translateY(0); }
        .hc-tick { height: 1px; width: 0; margin-top: 10px; background: linear-gradient(90deg,#4FACFE,#00F2FE); transition: width .9s cubic-bezier(.65,0,.35,1) .25s; }
        .hc-tick-in { width: 100%; }
        .hc-dash { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .hc-dash-in { transition: stroke-dashoffset 1.4s cubic-bezier(.65,0,.35,1) .3s; stroke-dashoffset: 0; }
        .hc-core-pulse { animation: hcCorePulse 3.2s ease-in-out infinite; transform-origin: 400px 250px; }
        @keyframes hcCorePulse { 0%,100% { opacity: .85; } 50% { opacity: 1; } }
        .hc-lock { width: 12px; height: 12px; border-radius: 9999px; background: #34D399; opacity: 0; transform: scale(.3); transition: opacity .45s cubic-bezier(.34,1.56,.64,1), transform .45s cubic-bezier(.34,1.56,.64,1); }
        .hc-lock-in { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(52,211,153,.5); animation: hcLockRipple 1.1s cubic-bezier(.22,1,.36,1) .15s; }
        @keyframes hcLockRipple { 0% { box-shadow: 0 0 0 0 rgba(52,211,153,.45); } 100% { box-shadow: 0 0 0 22px rgba(52,211,153,0); } }
        .hc-cta { background: linear-gradient(120deg,#4FACFE,#00F2FE); color: #020617; }
        .hc-cta:hover { filter: brightness(1.08); }
        @media (prefers-reduced-motion: reduce) {
          .hc-reveal { opacity: 1; transform: none; transition: none; }
          .hc-tick { width: 100%; transition: none; }
          .hc-dash { stroke-dashoffset: 0; }
          .hc-core-pulse, .hc-lock-in { animation: none; }
          .hc-lock { opacity: 1; transform: scale(1); transition: none; }
        }
      `}</style>

      {/* atmosphere: star bed + one blue glow pool + vignette */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <StarFieldCanvas layer="far" className="opacity-70" />
        <div
          className="absolute left-1/2 top-[8%] -translate-x-1/2 w-[120vw] max-w-[1500px] h-[70vh]"
          style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 40%, rgba(79,172,254,0.10) 0%, rgba(79,172,254,0.035) 45%, rgba(79,172,254,0) 72%)' }}
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 75% at 50% 38%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(1,6,16,0.6) 100%)' }} />
      </div>

      {/* ---------------- S1 · HERO ---------------- */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12">
        {/* on phones the converged line would cut through the CTAs at full
            strength - keep it as subtle depth there, full presence on md+ */}
        <div className="absolute inset-x-0 bottom-0 top-[18%] opacity-35 md:opacity-100">
          <SignalCanvas />
        </div>
        <div className="relative max-w-6xl mx-auto w-full pt-28 pb-24">
          <Eyebrow>
            Dscope <span className="text-[#4FACFE]">·</span> Enterprise AI Automation
          </Eyebrow>
          <Reveal delay={120}>
            <h1 className="font-display italic font-black tracking-tight leading-[1.04] text-5xl sm:text-6xl md:text-[5.4rem] mt-7 max-w-4xl" style={{ textWrap: 'balance' as any }}>
              Every conversation,{' '}
              <span className="bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] bg-clip-text text-transparent">resolved.</span>
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-8 max-w-xl text-white/60 text-lg leading-relaxed">
              AI agents across support, sales, and marketing. Voice, chat, and forms that answer
              customers, capture leads, and land them in your CRM - around the clock.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="/contact"
                className="hc-cta inline-flex items-center rounded-full px-8 py-4 font-semibold text-[15px] tracking-tight shadow-[0_18px_50px_-12px_rgba(0,242,254,0.45)] transition-[filter] duration-200"
              >
                Book a walk-through
              </a>
              <a
                href="/platform"
                className="inline-flex items-center rounded-full px-8 py-4 font-medium text-[15px] text-white/80 border border-white/15 hover:border-white/35 hover:text-white transition-colors duration-200"
              >
                Explore the platform
              </a>
            </div>
          </Reveal>
          <Reveal delay={560}>
            <div className="mt-20 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/35">
              In production <span className="text-[#4FACFE]">·</span> Travel <span className="text-white/20">·</span> Education{' '}
              <span className="text-white/20">·</span> Finance <span className="text-white/20">·</span> Real estate
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- S2 · THE PROBLEM ---------------- */}
      <section className="relative px-6 md:px-12 py-28 md:py-40">
        <div className="max-w-5xl mx-auto">
          <Eyebrow>The old way</Eyebrow>
          <Reveal delay={120}>
            <h2 className="font-display italic font-black tracking-tight leading-[1.08] text-4xl md:text-[3.6rem] mt-7" style={{ textWrap: 'balance' as any }}>
              Disconnected tools.
              <br />
              <span className="text-white/40">Missed conversations.</span>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-8 max-w-2xl text-white/60 text-lg leading-relaxed">
              Support lives in one system, sales in another, marketing in a third. Visitors ask a
              question, wait, and leave. Every unanswered conversation is a customer someone else
              just won.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- S3 · THE NEW WAY ---------------- */}
      <section className="relative px-6 md:px-12 py-28 md:py-40 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto text-center">
          <Eyebrow>The Dscope way</Eyebrow>
          <Reveal delay={120}>
            <h2 className="font-display italic font-black tracking-tight leading-[1.08] text-4xl md:text-[3.6rem] mt-7" style={{ textWrap: 'balance' as any }}>
              One platform.{' '}
              <span className="bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] bg-clip-text text-transparent">Agents everywhere.</span>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-8 max-w-2xl mx-auto text-white/60 text-lg leading-relaxed">
              Dscope puts one intelligence across every customer surface. Every signal resolves into
              a decision: answer, qualify, route, close.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- S4 · PRODUCT MODULES ---------------- */}
      <section className="relative px-6 md:px-12 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>What runs on Dscope</Eyebrow>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ModuleCard
              tag="Support agent"
              title="Answers around the clock."
              body="Customers get instant, accurate answers in your tone, from your own knowledge - with human handoff one tap away."
              foot="Fewer tickets · faster resolutions"
            />
            <ModuleCard
              tag="Sales & lead capture"
              title="Visitors become pipeline."
              body="The agent qualifies intent mid-conversation, captures name and contact, and routes the lead the moment it forms."
              foot="Every lead, locked in"
              emerald
              delay={90}
            />
            <ModuleCard
              tag="Voice · chat · form"
              title="One agent, three surfaces."
              body="It talks, types, or takes the form - whatever the visitor prefers, on any page of your site, in your branding."
              foot="Meets customers where they are"
              delay={140}
            />
            <ModuleCard
              tag="CRM sync"
              title="Structured. Attributed. Synced."
              body="Conversations land in your CRM as clean records - source, intent, and transcript attached. No copy-paste, no lost context."
              foot="Your CRM, always current"
              delay={200}
            />
          </div>
          <div className="mt-14">
            <LeadLock />
          </div>
        </div>
      </section>

      {/* ---------------- S5 · INTEGRATIONS ---------------- */}
      <section className="relative px-6 md:px-12 py-28 md:py-36 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <Eyebrow>Integrations</Eyebrow>
            <Reveal delay={120}>
              <h2 className="font-display italic font-black tracking-tight leading-[1.08] text-4xl md:text-[3.2rem] mt-7" style={{ textWrap: 'balance' as any }}>
                Plays well with your stack.
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 max-w-2xl mx-auto text-white/60 text-lg leading-relaxed">
                Salesforce, HubSpot, Zoho, Monday, Pipedrive, Dynamics - if your team lives in it,
                Dscope writes to it.
              </p>
            </Reveal>
          </div>
          <div className="mt-16">
            <Constellation />
          </div>
        </div>
      </section>

      {/* ---------------- S6 · ENTERPRISE TRUST ---------------- */}
      <section className="relative px-6 md:px-12 py-28 md:py-36 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <Eyebrow>Enterprise trust</Eyebrow>
          <Reveal delay={120}>
            <h2 className="font-display italic font-black tracking-tight leading-[1.08] text-4xl md:text-[3.2rem] mt-7">
              Quiet, by design.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            {[
              ['Your data stays yours', 'Conversations and customer records remain inside your boundary.'],
              ['Full audit trail', 'Every agent answer is logged, reviewable, and attributable.'],
              ['Human handoff, any moment', 'The agent steps back the instant your team steps in.'],
              ['Role-based access', 'Granular control over who configures, reviews, and exports.'],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="border-l border-white/15 pl-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-white/80">{t}</div>
                  <p className="mt-2 text-white/50 text-[15px] leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- S7 · FINAL CTA ---------------- */}
      <section className="relative px-6 md:px-12 py-32 md:py-44 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="font-display italic font-black tracking-tight leading-[1.06] text-4xl md:text-[3.8rem]" style={{ textWrap: 'balance' as any }}>
              See your first agent{' '}
              <span className="bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] bg-clip-text text-transparent">live.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-7 max-w-xl mx-auto text-white/60 text-lg leading-relaxed">
              One walk-through. Your site, your use case, a working agent.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-10">
              <a
                href="/contact"
                className="hc-cta inline-flex items-center rounded-full px-10 py-5 font-semibold text-base tracking-tight shadow-[0_18px_50px_-12px_rgba(0,242,254,0.45)] transition-[filter] duration-200"
              >
                Book a walk-through
              </a>
            </div>
          </Reveal>
          <div className="mt-16">
            <LeadLock />
          </div>
          <Reveal delay={200}>
            <div className="mt-20 font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
              Design concept preview <span className="text-white/15">·</span> internal
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};
