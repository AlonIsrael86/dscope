// Real client testimonials carousel. Rendered under the main CaseStudies grid.
// Auto-advances every 3s; slide-left transition; pauses on hover.
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, Quote, User, ChevronLeft, ChevronRight } from 'lucide-react';

type ClientCase = {
  id: string;
  logo: string;
  company: string;
  category: string;
  description: string;
  accent: string;        // Tailwind text color class for accent text
  glow: string;          // Box-shadow rgba color for hover glow
  person: {
    name: string;
    role: string;
    photo: string | null;  // null = placeholder
    quote: string;
  };
};

const REAL_CASES: ClientCase[] = [
  {
    id: 'yeda',
    logo: '/clients/yeda.png',
    company: 'Yeda',
    category: 'EdTech Platform',
    description:
      "Israeli edtech platform combining LMS and LXP with AI built into every layer — interactive course authoring, chatbots trained on the institution's own material, and digital adoption tools used across academic, enterprise, and tech sectors.",
    accent: 'text-blue-300',
    glow: 'rgba(59, 130, 246, 0.25)',
    person: {
      name: 'Seva Konradt',
      role: 'CEO, Yeda',
      photo: '/clients/people/seva.jpg',
      quote:
        "Modern learning isn't one product — it's content, assessment, support, and adoption woven together. We unify that stack with AI inside, so a learner gets the same intelligent assistant whether they're a student, an employee, or a software user.",
    },
  },
  {
    id: 'ipc',
    logo: '/clients/ipc.png',
    company: 'IPC',
    category: 'Professional Training & Placement',
    description:
      "Israel's career-acceleration college — 25+ professional tracks across hi-tech, finance, and professional skills. The only college with a Ministry of Labor-licensed placement department and active hiring partnerships with 100+ employers, including Microsoft, Google, and IBM.",
    accent: 'text-rose-300',
    glow: 'rgba(244, 63, 94, 0.25)',
    person: {
      name: 'Tal Benazref',
      role: 'IPC',
      photo: '/clients/people/tal.jpg',
      quote:
        'A course only matters if it ends in a job. That\'s why we operate placement under government license and measure ourselves by hires — not enrolments. When a graduate walks into Microsoft or IBM, that\'s the metric.',
    },
  },
  {
    id: 'techom',
    logo: '/clients/techom.png',
    company: 'Techom',
    category: 'Smart Security Hardware',
    description:
      'Israeli-engineered biometric smart locks designed for the local door market — fingerprint, facial recognition, remote-access, and integrated camera/doorbell models. Compatible with ~90% of Israeli doors and certified by the Ministry of Communications.',
    accent: 'text-cyan-300',
    glow: 'rgba(34, 211, 238, 0.25)',
    person: {
      name: 'Netanel',
      role: 'Techom',
      photo: null, // placeholder until real photo arrives
      quote:
        "Smart locks built for American or European doors don't fit ours — that's the gap we built the company on. Every Techom model is engineered for the Israeli market, certified by the Ministry of Communications, and installed by our own technicians.",
    },
  },
  {
    id: 'orin',
    logo: '/clients/orin.png',
    company: 'Orin Shpalter',
    category: 'Financial Education',
    description:
      "Israel's leading financial education college — 19 years training the country's insurance, investment, and mortgage professionals. Active placement partnerships with Menora, Migdal, Harel, Phoenix, and Bank Leumi. Hybrid format with Tel Aviv and Haifa campuses plus full online tracks.",
    accent: 'text-amber-300',
    glow: 'rgba(251, 191, 36, 0.22)',
    person: {
      name: 'Adi Sharon',
      role: 'Orin Shpalter',
      photo: '/clients/people/adi.jpg',
      quote:
        "Nineteen years of training Israel's financial professionals has built something no online course can replicate — direct placement pipelines into Menora, Migdal, Harel, Phoenix, and Bank Leumi. Our students don't graduate looking for work, they graduate into it.",
    },
  },
];

const ROTATE_MS = 3000;

export const RealClientCases = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % REAL_CASES.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [paused]);

  const c = REAL_CASES[index];

  return (
    <section className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-8 relative">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-6 mb-16 md:mb-20">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-400/30 bg-emerald-400/5">
          <Radio className="w-4 h-4 text-emerald-300 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-emerald-300">
            System-Verified // Signal Received
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white uppercase drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          Verified <span className="text-emerald-300">Signal</span>
        </h2>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl font-light italic">
          Independent enterprise telemetry. Real operators, real deployments.
        </p>
      </div>

      {/* Carousel container */}
      <div
        className="relative min-h-[440px] md:min-h-[420px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Prev arrow */}
        <button
          onClick={() => setIndex((i) => (i - 1 + REAL_CASES.length) % REAL_CASES.length)}
          aria-label="Previous"
          className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/15 text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-emerald-300/40 hover:shadow-[0_0_25px_rgba(52,211,153,0.35)] transition-all flex items-center justify-center group/arrow"
        >
          <ChevronLeft className="w-5 h-5 group-hover/arrow:-translate-x-0.5 transition-transform" />
        </button>

        {/* Next arrow */}
        <button
          onClick={() => setIndex((i) => (i + 1) % REAL_CASES.length)}
          aria-label="Next"
          className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/15 text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-emerald-300/40 hover:shadow-[0_0_25px_rgba(52,211,153,0.35)] transition-all flex items-center justify-center group/arrow"
        >
          <ChevronRight className="w-5 h-5 group-hover/arrow:translate-x-0.5 transition-transform" />
        </button>

        <AnimatePresence mode="wait">
          <motion.article
            key={c.id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative grid grid-cols-1 md:grid-cols-5 rounded-[2rem] bg-white/[0.02] border border-white/5 overflow-hidden hover:border-white/15 transition-colors duration-500"
          >
            {/* Brand-color glow */}
            <div
              className="absolute inset-0 opacity-100 pointer-events-none transition-opacity duration-700"
              style={{ background: `radial-gradient(ellipse at left, ${c.glow} 0%, transparent 60%)` }}
            />

            {/* LEFT: Brand tile */}
            <div className="md:col-span-2 p-8 md:p-10 flex flex-col gap-6 relative border-b md:border-b-0 md:border-r border-white/5">
              {/* Logo tile — glassy translucent animated gradient. Bigger logos. */}
              <div className="relative rounded-2xl p-7 flex items-center justify-center h-[150px] overflow-hidden ring-1 ring-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                {/* Animated color-shifting gradient layer (lower opacities = glass) */}
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundSize: '300% 300%' }}
                  animate={{
                    backgroundImage: [
                      'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(79,172,254,0.10) 50%, rgba(0,242,254,0.08) 100%)',
                      'linear-gradient(135deg, rgba(0,242,254,0.08) 0%, rgba(255,255,255,0.16) 50%, rgba(167,139,250,0.10) 100%)',
                      'linear-gradient(135deg, rgba(167,139,250,0.10) 0%, rgba(79,172,254,0.10) 50%, rgba(255,255,255,0.14) 100%)',
                      'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(79,172,254,0.10) 50%, rgba(0,242,254,0.08) 100%)',
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                {/* Top glass highlight */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
                {/* Bottom subtle shadow edge for depth */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-white/10 pointer-events-none" />
                <img
                  src={c.logo}
                  alt={`${c.company} logo`}
                  loading="lazy"
                  className="relative max-h-[110px] max-w-[92%] w-auto h-auto object-contain drop-shadow-[0_3px_10px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* Company meta */}
              <div className="flex flex-col gap-2">
                <span className={`text-[9px] font-mono uppercase tracking-[0.4em] ${c.accent} opacity-80`}>
                  ▸ Transmission · 0{index + 1} / 0{REAL_CASES.length}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight uppercase">
                  {c.company}
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  {c.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-white/65 leading-relaxed font-light">
                {c.description}
              </p>
            </div>

            {/* RIGHT: Person + quote */}
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col gap-6 relative">
              <Quote className={`absolute top-6 right-8 w-12 h-12 ${c.accent} opacity-10`} strokeWidth={1} />

              <div className="flex items-center gap-5">
                <div
                  className="w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/30 shrink-0 transition-all duration-500"
                  style={{ boxShadow: `0 0 25px ${c.glow}` }}
                >
                  {c.person.photo ? (
                    <img
                      src={c.person.photo}
                      alt={c.person.name}
                      loading="lazy"
                      className="w-full h-full object-cover filter grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                      <User className="w-10 h-10 text-white/40" strokeWidth={1.2} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="text-xl font-display font-semibold text-white tracking-tight">
                    {c.person.name}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-[0.3em] ${c.accent}`}>
                    {c.person.role}
                  </span>
                </div>
              </div>

              <blockquote className="text-base md:text-lg text-white/80 leading-relaxed italic font-light border-l-2 border-white/10 group-hover:border-white/30 transition-colors duration-500 pl-5">
                <span className={`${c.accent} not-italic font-display font-bold mr-1`}>“</span>
                {c.person.quote}
                <span className={`${c.accent} not-italic font-display font-bold ml-1`}>”</span>
              </blockquote>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

    </section>
  );
};
