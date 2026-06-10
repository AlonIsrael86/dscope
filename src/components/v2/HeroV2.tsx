// HOME-V2 PERF: re-engineered copy of HeroContent with IDENTICAL visuals.
// What changed and why:
//
//   1. AtmosphericNeuralGrid ran 35 NeuralNodes, EACH with its own
//      infinite Framer Motion opacity loop, PLUS two mousemove springs
//      fanned out to 70 per-node drift transforms. In v1 every node gets
//      the same +/-25px drift swing anyway (same mouse transforms, only
//      the resting offset differs), so moving the CONTAINER with one
//      spring pair is visually identical: NeuralGridV2 does exactly that
//      and pulses each dot with a CSS keyframe (compositor, zero JS).
//
//   2. The 600px-tall ambient glow used bg-blue-600/10 + blur-[150px] -
//      a giant Gaussian filter re-rasterized whenever scale/opacity
//      animate. A 150px-blurred uniform-color block IS a radial gradient,
//      so we paint the gradient directly. Same pixels, no filter pass.
//
//   3. Headline word-by-word entrance, badge, paragraph, marquee:
//      kept 1:1 (one-shot animations + already-optimized CSS marquee).
import React, { memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ClientMarquee } from '../../App';

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const NeuralGridV2 = ({ progress }: { progress: any }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 100);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 100);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Same +/-25px swing the per-node transforms produced in v1.
  const driftX = useTransform(smoothMouseX, [-50, 50], [-25, 25]);
  const driftY = useTransform(smoothMouseY, [-50, 50], [-25, 25]);
  const scrollShift = useTransform(progress, [0, 1], [0, -80]);
  const opacity = useTransform(progress, [0, 0.4], [1, 0]);

  const nodes = React.useMemo(() => (
    [...Array(isMobile() ? 20 : 35)].map(() => ({
      baseOpacity: 0.05 + Math.random() * 0.15,
      duration: 8 + Math.random() * 8,
      delay: -Math.random() * 8, // negative: field is mid-pulse at mount, like v1
      restX: Math.random() * 20 - 10,
      restY: Math.random() * 20 - 10,
    }))
  ), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        style={{ y: scrollShift, opacity }}
        className="relative w-full h-[120%] will-change-transform"
      >
        <motion.div
          style={{ x: driftX, y: driftY }}
          className="w-full h-full flex flex-wrap gap-x-16 md:gap-x-24 gap-y-16 md:gap-y-24 p-10 md:p-32 justify-center"
        >
          {nodes.map((n, i) => (
            <div
              key={i}
              className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-blue-400/20 border border-blue-300/10 home-v2-node-pulse"
              style={{
                transform: `translate(${n.restX}px, ${n.restY}px)`,
                ['--node-base' as any]: n.baseOpacity,
                animationDuration: `${n.duration}s`,
                animationDelay: `${n.delay}s`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const HeroV2 = memo(({ progress }: { progress?: any }) => {
  const words = "Multi Tasking AI Automation Platform".split(" ");

  const localProgress = progress || useMotionValue(0);
  const smoothProgress = useSpring(localProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  const titleY = useTransform(smoothProgress as any, [0, 1], [0, -40]);
  const textY = useTransform(smoothProgress as any, [0, 1], [0, -20]);
  const bgScale = useTransform(smoothProgress as any, [0, 1], [1, 1.05]);
  const bgOpacity = useTransform(smoothProgress as any, [0, 0.8], [0.12, 0]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4 md:px-6 text-center relative overflow-visible">
      <NeuralGridV2 progress={smoothProgress} />

      {/* Ambient glow: radial gradient = the same pixels the v1
          blur-[150px] filter produced, without the per-frame filter. */}
      <motion.div
        style={{
          scale: bgScale,
          opacity: bgOpacity,
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(37,99,235,0.10) 0%, rgba(37,99,235,0.05) 45%, rgba(37,99,235,0) 72%)',
        }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[600px] w-full pointer-events-none z-0"
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ y: textY }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mb-8 md:mb-10 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] md:text-[11px] font-mono uppercase tracking-[0.5em] text-blue-300 z-20"
      >
        Multi-Tasking AI Platform
      </motion.div>

      <motion.div
        style={{ y: titleY }}
        className="relative mb-8 md:mb-12 z-20 flex flex-wrap justify-center items-center max-w-5xl mx-auto"
      >
        <h1 className="text-[9.5vw] sm:text-[8vw] md:text-[3.6rem] lg:text-[5.6rem] font-display font-bold tracking-tighter leading-[0.9] text-white italic flex flex-wrap justify-center gap-x-[0.1em]">
          {words.map((word, i, arr) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                className={`inline-block whitespace-normal break-words lightning-font ${i !== arr.length - 1 ? 'mr-[0.15em]' : ''}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {word}
              </motion.span>
          ))}
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ y: textY }}
        transition={{ delay: 1.8, duration: 1 }}
        className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 z-20 font-light tracking-tight"
      >
        DeltaScope solves automation of support, service, sales, marketing, and more issues for each industry using our AI algorithms and automation abilities.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="w-full flex justify-center"
      >
        <ClientMarquee />
      </motion.div>
    </div>
  );
});
