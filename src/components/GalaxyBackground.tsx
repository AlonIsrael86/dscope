import React, { memo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'motion/react';

import { PLANETS_DATA } from '../data/planetsConstants';
import { Suspense, lazy } from 'react';
const RealisticPlanet = lazy(() => import('./Planets').then(m => ({ default: m.RealisticPlanet })));

const OrbitingPlanet = ({ planet, progress }: any) => {
  const { orbit } = planet;
  
  // Continuous time multiplier
  const timeOffset = useMotionValue(0);
  
  React.useEffect(() => {
    // Planets slowly orbit continuously even without scrolling.
    const controls = animate(timeOffset, Math.PI * 2, {
      duration: 300 / orbit.speed, // Slower inner, faster outer (inversely proportional over a very long time)
      repeat: Infinity,
      ease: "linear"
    });
    return controls.stop;
  }, [timeOffset, orbit.speed]);

  const x = useTransform(
    [progress, timeOffset],
    ([p, t]: [number, number]) => {
      const scrollAngle = p * Math.PI * 2 * orbit.speed;
      const currentAngle = orbit.angle + scrollAngle + t;
      return `calc(65vw + ${Math.cos(currentAngle) * orbit.rx}vw - 50%)`;
    }
  );
  
  const y = useTransform(
    [progress, timeOffset],
    ([p, t]: [number, number]) => {
      const scrollAngle = p * Math.PI * 2 * orbit.speed;
      const currentAngle = orbit.angle + scrollAngle + t;
      return `calc(25vh + ${Math.sin(currentAngle) * orbit.ry}vh - 50%)`;
    }
  );

  const scale = useTransform(progress, [0, 0.2, 0.5, 1], [0.05, 0.2, 0.8, 3.5]);
  const brightness = useTransform(progress, [0, 0.2, 0.5, 1], [0.1, 0.3, 0.9, 2.0]);
  const opacity = useTransform(progress, [0, 0.2, 0.5, 1], [0.1, 0.4, 0.9, 1]);
  const filter = useTransform(brightness, v => `brightness(${v})`);
  const rawZIndex = useTransform(progress, [0, 1], [1000, 10]);
  const zIndex = useTransform(rawZIndex, Math.round);

  return (
    <motion.div style={{ x, y, scale, filter, opacity, zIndex, transformPerspective: 1000 }} className="absolute top-0 left-0 pointer-events-auto">
      <Suspense fallback={<div className="w-4 h-4 rounded-full bg-white/20 animate-pulse" />}>
        <RealisticPlanet planet={planet} isHoverable={true} />
      </Suspense>
    </motion.div>
  );
};

export const GalaxyBackground = memo(() => {
  const { scrollYProgress } = useScroll();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    mass: 1.2
  });

  const layer1Y = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]); 
  const layer2Y = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);
  
  const layer1MouseX = useTransform(smoothMouseX, [-1000, 1000], ["-2%", "2%"]);
  const layer1MouseY = useTransform(smoothMouseY, [-1000, 1000], ["-2%", "2%"]);
  
  const layer2MouseX = useTransform(smoothMouseX, [-1000, 1000], ["-1%", "1%"]);
  const layer2MouseY = useTransform(smoothMouseY, [-1000, 1000], ["-1%", "1%"]);
  
  const sunOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const moonOpacity = useTransform(smoothProgress, [0.3, 0.6], [0, 1]);
  const celestialRotate = useTransform(smoothProgress, [0, 0.6], ["0deg", "180deg"]);
  
  const stars1 = React.useMemo(() => [...Array(200)].map(() => ({
    top: Math.random() * 120 + '%',
    left: Math.random() * 100 + '%',
    size: Math.random() * 2 + 1 + 'px',
    opacity: Math.random() * 0.8 + 0.4
  })), []);

  const stars2 = React.useMemo(() => [...Array(250)].map(() => ({
    top: Math.random() * 120 + '%',
    left: Math.random() * 100 + '%',
    size: Math.random() * 1.5 + 1 + 'px',
    opacity: Math.random() * 0.5 + 0.2
  })), []);

  const comets = React.useMemo(() => [...Array(8)].map(() => ({
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    delay: Math.random() * 15,
    duration: Math.random() * 10 + 5,
    angle: Math.random() * -30 - 15,
  })), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#020202]">
      
      {/* Celestial Body Container parallax wrapper */}
      <motion.div style={{ x: layer1MouseX }} className="absolute inset-0 pointer-events-none z-0">
        <motion.div style={{ y: layer1MouseY }} className="absolute inset-0">
          <motion.div 
            style={{ rotate: celestialRotate }}
            className="absolute top-[25%] left-[65%] w-[108vw] h-[108vw] md:w-[72vw] md:h-[72vw] -translate-x-1/2 -translate-y-1/2 origin-center"
          >
            {/* SUN */}
            <motion.div 
              style={{ opacity: sunOpacity }} 
              animate={{ 
                scale: [1, 1.05, 1],
                filter: ["brightness(0.9) contrast(1)", "brightness(1) contrast(1.1)", "brightness(0.9) contrast(1)"]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
            >
              <div className="absolute inset-[30%] rounded-full bg-white/10 blur-[80px]" />
              <div className="absolute inset-[40%] rounded-full bg-white/20 blur-[40px]" />
              <div className="absolute inset-[45%] rounded-full bg-slate-200/50 blur-[20px] shadow-[0_0_80px_rgba(255,255,255,0.4)]" />
            </motion.div>

            {/* MOON */}
            <motion.div style={{ opacity: moonOpacity }} className="absolute inset-0 rotate-180">
              <div className="absolute inset-[30%] rounded-full bg-slate-400/10 blur-[80px]" />
              <div className="absolute inset-[38%] rounded-full bg-white/20 blur-[40px]" />
              <div className="absolute inset-[45%] rounded-full bg-slate-300/70 blur-[8px] shadow-[0_0_50px_rgba(255,255,255,0.3)]" />
              {/* Moon craters */}
              <div className="absolute inset-[45%] rounded-full overflow-hidden">
                <div className="absolute top-[20%] left-[30%] w-[20%] h-[20%] rounded-full bg-black/20 blur-[2px]" />
                <div className="absolute top-[50%] left-[60%] w-[35%] h-[35%] rounded-full bg-black/30 blur-[4px]" />
                <div className="absolute top-[65%] left-[25%] w-[25%] h-[25%] rounded-full bg-black/20 blur-[3px]" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Galactic Dust */}
      <div className="absolute top-[10%] left-[20%] w-[60vw] h-[40vw] rounded-full bg-slate-800/10 blur-[180px] mix-blend-screen" />
      <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-zinc-800/10 blur-[180px] mix-blend-screen" />

      {/* Milky Way Path */}
      <div 
        className="absolute w-[200vw] h-[150vh] rounded-[100%] blur-[100px] -rotate-45 -top-[25%] -left-[50%] mix-blend-screen pointer-events-none opacity-50" 
        style={{
          background: 'radial-gradient(ellipse at center, rgba(150, 150, 160, 0.1) 0%, rgba(100, 100, 110, 0.05) 40%, rgba(0,0,0,0) 70%)',
        }}
      />
      <div 
        className="absolute w-[200vw] h-[100vh] rounded-[100%] blur-[120px] -rotate-45 top-[0%] -left-[30%] mix-blend-plus-lighter pointer-events-none opacity-50" 
        style={{
          background: 'radial-gradient(ellipse at center, rgba(200, 200, 200, 0.05) 0%, rgba(150, 150, 150, 0.03) 50%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* Realistic Planets */}
      <motion.div style={{ x: layer1MouseX }} className="absolute inset-0 pointer-events-none z-10">
        <motion.div style={{ y: layer1MouseY }} className="absolute inset-0">
          {PLANETS_DATA.map((planet) => (
            <OrbitingPlanet 
              key={planet.id} 
              planet={planet} 
              progress={smoothProgress} 
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Stars Layer 2 (Slower) */}
      <motion.div style={{ y: layer2Y, x: layer2MouseX }} className="absolute inset-0 h-[120%]">
        <motion.div style={{ y: layer2MouseY }} className="absolute inset-0">
          {stars2.map((s, i) => (
            <motion.div key={i} className="absolute rounded-full bg-white" 
              style={{ top: s.top, left: s.left, width: s.size, height: s.size }} 
              animate={{ opacity: [s.opacity * 0.3, s.opacity, s.opacity * 0.3] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Stars Layer 1 (Faster) */}
      <motion.div style={{ y: layer1Y, x: layer1MouseX }} className="absolute inset-0 h-[140%]">
        <motion.div style={{ y: layer1MouseY }} className="absolute inset-0">
          {stars1.map((s, i) => (
            <motion.div key={i} className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
              style={{ top: s.top, left: s.left, width: s.size, height: s.size }} 
              animate={{ opacity: [s.opacity * 0.1, s.opacity, s.opacity * 0.1], scale: [0.7, 1.3, 0.7] }}
              transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Flying Comets */}
      {comets.map((c, i) => (
        <motion.div
          key={`comet-${i}`}
          className="absolute w-[2px]"
          style={{
            top: c.top,
            left: c.left,
            height: '100px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(200,200,220,0))',
            rotate: `${c.angle}deg`,
          }}
          animate={{
            x: ['-50vw', '120vw'],
            y: ['-50vh', '120vh'],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Background Dimmer removed for brightness */}
    </div>
  );
});
