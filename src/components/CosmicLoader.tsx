import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * CosmicLoader — minimalist per Katia: only the logo + the dark cosmic
 * background, nothing else. No decorative corners, no progress bar, no
 * slogan, no percent indicator. The first character of the wordmark
 * cycles every 1.5 s through Alexei's three states (D / Δ / Delta)
 * with matching brand colour (Electric Blue → Bio Emerald → Plasma
 * Purple). Alon's original Glimmer fade-out sweep across the wordmark
 * is preserved.
 */
export const CosmicLoader = () => {
  const [logoState, setLogoState] = useState(0); // 0: D, 1: Δ, 2: Delta

  useEffect(() => {
    const timer = setInterval(() => {
      setLogoState((prev) => (prev + 1) % 3);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const getAnimatedPart = () => {
    switch (logoState) {
      case 0: return 'D';
      case 1: return 'Δ';
      case 2: return 'Delta';
      default: return 'D';
    }
  };

  const getAnimatedColor = () => {
    switch (logoState) {
      case 0: return 'text-[#3B82F6]'; // Electric Blue
      case 1: return 'text-[#34D399]'; // Bio Emerald
      case 2: return 'text-[#A855F7]'; // Plasma Purple
      default: return 'text-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[1000] bg-[#00040a] flex items-center justify-center overflow-hidden"
    >
      {/* Subtle background glow — single soft blob, no other decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[180px] rounded-full" />
      </div>

      {/* Logo (the only foreground element).
          Removed `drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]` and
          `p-2 -m-2` per Katia 2026-05-28: «бачиш там наче є рамка для
          лого коли сайт завантажується — треба ось цю рамку прибрати».
          The white drop-shadow rendered as a faintly-glowing rectangle
          around the wordmark on the near-black backdrop; the p-2/-m-2
          combo added an 8px padded box whose bounds were visible
          during the slot-machine transition gap. Clean text on bg now. */}
      <div className="relative z-20">
        <div className="relative flex items-center font-display font-black tracking-tighter text-6xl md:text-8xl text-white group overflow-visible">
          {/* Cycling first symbol — D / Δ / Delta, every 1.5 s.
              No min-width: the wrapper auto-sizes to the current glyph so
              "Scope" sits flush right next to D/Δ (no extra padding) and
              flush against "Delta" (per Katia: "коли пишеться deltascope
              то все супер — це залиш"). The motion layout animation
              smooths the width swap. */}
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              {/* Smooth cycle — removed the `filter: blur(10px)` from
                  the transition (GPU-expensive filter swap caused jank
                  per Katia: «дуже каряво міняється перший символ»).
                  Now a clean opacity + tiny scale fade with longer
                  duration for a calmer transition. */}
              <motion.span
                key={logoState}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.06 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                // Glow `drop-shadow-[0_0_15px_currentColor]` removed
                // per Katia 2026-05-28: «прибери в лого з символу який
                // змінюється ефект glowing». Plain coloured symbol now.
                className={`${getAnimatedColor()} flex items-center justify-center`}
              >
                {getAnimatedPart()}
              </motion.span>
            </AnimatePresence>
          </div>

          <span className="uppercase tracking-[-0.05em]">Scope</span>

          {/* Glimmer sweep removed per Katia 2026-05-28: «біля лого є
              наче якась дивна лінія від ефекту - прибери». The diagonal
              sweep crossing the wordmark looked like a stray line at
              certain frames. Cleaner loader without it. */}
        </div>
      </div>
    </motion.div>
  );
};
