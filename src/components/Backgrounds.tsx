import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Medusa, Dolphin, Shark, BioluminescentFish } from './BrandOceanCreatures';

// 1. Ocean Horizon
export const OceanHorizonBackground = () => {
  const [mouseY, setMouseY] = React.useState(0);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      {/* NIGHT/DAY LIGHT & Circadian Sky Gradient */}
      <motion.div 
        className="absolute inset-0 z-[-2]"
        animate={{ 
          background: [
            "linear-gradient(to bottom, #000000, #121b4a)", // Night
            "linear-gradient(to bottom, #ff7e5f, #feb47b)", // Sunrise
            "linear-gradient(to bottom, #4facfe, #00f2fe)", // Day
            "linear-gradient(to bottom, #ff5e62, #ff9966)", // Dusk
            "linear-gradient(to bottom, #000000, #121b4a)"  // Night
          ]
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Sun interacting with global mouse position + Circadian cycle */}
      <motion.div 
        className="absolute w-64 h-64 rounded-full bg-yellow-300 blur-[30px] left-1/2 -translate-x-1/2 pointer-events-none"
        animate={{ 
          y: (mouseY * 100) - 50,
          scale: 1 + (1 - mouseY) * 0.2,
          backgroundColor: ["#ffffff", "#ffdd00", "#ffffff", "#ff8800", "#ffffff"]
        }}
        transition={{ 
          y: { type: "spring", stiffness: 50, damping: 20 },
          scale: { type: "spring", stiffness: 50, damping: 20 },
          backgroundColor: { duration: 40, repeat: Infinity, ease: "linear" }
        }}
        style={{ bottom: "40%" }}
      />

      {/* RAINBOW */}
      <motion.div 
        className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full border-[30px] border-t-red-500 border-r-yellow-500 border-b-transparent border-l-blue-500 opacity-30 blur-[15px] mix-blend-screen pointer-events-none"
        animate={{ opacity: [0, 0, 0.4, 0.1, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* HURRICANE / WIND / RAIN and WEATHER CHANGES */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none"
        animate={{ opacity: [0, 0, 0.8, 0, 0] }} // Only active sometimes
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-[#001021] opacity-40 mix-blend-multiply" />
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-0.5 h-24 bg-blue-200/50"
            style={{ 
              left: `${Math.random() * 120}%`, 
              top: `-${Math.random() * 30}%`,
              transform: 'rotate(25deg)'
            }}
            animate={{ 
              y: ['0vh', '150vh'],
              x: ['0vw', '-30vw']
            }}
            transition={{ 
              duration: 0.4 + Math.random() * 0.3, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() 
            }}
          />
        ))}
      </motion.div>

      {/* TSUNAMI / Huge Background Waves */}
      <motion.div
        className="absolute bottom-0 w-[200%] h-[70vh] bg-[#14235e]/60 blur-[10px] origin-bottom z-10"
        style={{ borderRadius: '100% 100% 0 0' }}
        animate={{ 
          x: ['0%', '-50%', '0%'], 
          scaleY: [0.6, 1.4, 0.6],
          opacity: [0, 0.4, 0]
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* WAVES OF WATER / Ocean Surface */}
      <div className="absolute bottom-0 w-full h-[45%] z-10 overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          animate={{ background: [
             "linear-gradient(to top, #020514, #14235e)",
             "linear-gradient(to top, #020514, #2a5298)",
             "linear-gradient(to top, #020514, #4facfe)",
             "linear-gradient(to top, #020514, #1e3c72)",
             "linear-gradient(to top, #020514, #14235e)"
          ]}}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-0 opacity-50 flex items-start"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[100vw] h-[25vh] fill-[#253f8a] shrink-0 transform rotate-180">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C89.71,114.62,170.81,100.86,252.2,84.44,275,79.54,298.11,74.5,321.39,56.44Z"></path>
          </svg>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[100vw] h-[25vh] fill-[#253f8a] shrink-0 transform rotate-180">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C89.71,114.62,170.81,100.86,252.2,84.44,275,79.54,298.11,74.5,321.39,56.44Z"></path>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

// 2. Night on Mars
export const MarsBackground = () => {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden bg-gradient-to-b from-[#0b0300] via-[#210702] to-[#421b10]">
      {/* Phobos and Deimos */}
      <motion.div 
        className="absolute w-32 h-32 rounded-full bg-orange-200/40 blur-[2px] shadow-[0_0_50px_#ffedd5] pointer-events-none"
        animate={{ x: [0, 800, 0], y: [0, 200, 0] }}
        transition={{ repeat: Infinity, duration: 150, ease: "linear" }}
        style={{ top: '10%', left: '20%' }}
      />
      <motion.div 
        className="absolute w-16 h-16 rounded-full bg-red-200/30 blur-[1px] pointer-events-none"
        animate={{ x: [0, -600, 0], y: [0, 100, 0] }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        style={{ top: '30%', right: '10%' }}
      />

      {/* MOUNTAINS (Back Layer) */}
      <div className="absolute bottom-[20%] w-[200vw] h-[45vh] opacity-40 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[100vw] h-full fill-[#130401]">
          <path d="M0,80L80,20L200,90L350,15L500,60L750,5L900,50L1050,20L1200,100V120H0V80Z"></path>
        </svg>
      </div>

      {/* VOLCANIC ERUPTION */}
      <div className="absolute bottom-[10%] left-[25%] md:left-[35%] w-64 h-[40vh]">
        {/* Volcano Cone */}
        <div className="absolute bottom-0 w-full h-[60%] bg-[#1c0803]" style={{ clipPath: 'polygon(20% 100%, 45% 0, 55% 0, 80% 100%)' }} />
        <motion.div 
          className="absolute bottom-[60%] w-12 h-12 left-[45%] bg-[#ff4500] blur-[15px]" 
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.5, 1] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
        />
        {/* Lava Particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`magma-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 12 + 4,
              height: Math.random() * 12 + 4,
              backgroundColor: ['#ff4500', '#ff8c00', '#ffd700', '#ff0000'][Math.floor(Math.random()*4)],
              left: '50%',
              bottom: '55%',
              boxShadow: '0 0 15px #ff4500'
            }}
            animate={{
              y: [0, -300 - Math.random() * 200],
              x: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 300],
              opacity: [1, 1, 0],
              scale: [1, Math.random() * 2 + 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* GEYSER */}
      <div className="absolute bottom-[5%] right-[10%] md:right-[20%] w-40 h-[30vh]">
         {/* Steam/Smoke */}
         {[...Array(25)].map((_, i) => (
           <motion.div 
             key={`steam-${i}`}
             className="absolute bg-white/10 rounded-full blur-[10px]"
             style={{ width: 40 + Math.random()*30, height: 40 + Math.random()*30, left: '40%', bottom: 0 }}
             animate={{
               y: [0, -400],
               x: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 150],
               scale: [1, 4],
               opacity: [0, 0.5, 0]
             }}
             transition={{ duration: 4 + Math.random()*3, repeat: Infinity, delay: Math.random()*3, ease: "easeOut" }}
           />
         ))}
      </div>
      
      {/* MOUNTAINS (Front Layer) */}
      <div className="absolute bottom-0 w-[200vw] h-[40vh] bg-gradient-to-t from-[#0e0401] to-transparent pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[100vw] h-full fill-[#1c0803] opacity-80 left-0 absolute bottom-0">
          <path d="M0,80L100,20L250,90L400,10L500,50L700,0L900,60L1000,30L1200,100V120H0V80Z"></path>
        </svg>
        {/* Dust storm */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='nf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nf)'/%3E%3C/svg%3E")` }}></div>
      </div>
    </div>
  );
};

// 3. Deep Ocean
export const DeepOceanBackground = () => {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden bg-gradient-to-b from-[#001021] to-[#00040a]">
      {/* God Rays */}
      <div className="absolute inset-0 opacity-20 bg-[conic-gradient(from_0deg_at_50%_-20%,_rgba(0,180,255,0.4)_0deg,_transparent_60deg,_transparent_300deg,_rgba(0,180,255,0.4)_360deg)] pointer-events-none mix-blend-screen" />
      
      {/* WAVES OF WATER / UNDERWATER CURRENTS */}
      <motion.div 
        className="absolute inset-0 bg-[#001021] opacity-50 mix-blend-color-dodge z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse at center, rgba(0, 230, 255, 0.15) 0%, transparent 70%)"
        }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* HYDROTHERMAL VENTS / GEYSER (Submarine) */}
      <div className="absolute bottom-0 left-[20%] w-64 h-[40vh] z-10 pointer-events-none">
        <div className="absolute bottom-0 left-[40%] w-[20%] h-[30%] bg-[#05101a] rounded-t-lg blur-[2px]" />
        {[...Array(30)].map((_, i) => (
          <motion.div
             key={`vent-${i}`}
             className="absolute bg-gray-400/20 rounded-full blur-[5px]"
             style={{ width: 20 + Math.random()*20, height: 20 + Math.random()*20, left: '45%', bottom: '20%' }}
             animate={{
               y: [0, -400],
               x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 150],
               scale: [1, 3],
               opacity: [0, 0.4, 0]
             }}
             transition={{ duration: 5 + Math.random()*4, repeat: Infinity, delay: Math.random()*5, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Manta Rays / Animated Deep Ocean Creatures */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen scale-75 xl:scale-100">
        {/* Jellyfish (Medusa) */}
        {[...Array(5)].map((_, i) => {
          return (
            <motion.div
              key={`medusa-${i}`}
              className="absolute opacity-60"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                y: [0, -80, 0],
                rotate: [0, (Math.random() - 0.5) * 10, 0]
              }}
              transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 10 }}
            >
              <motion.div
                animate={{ x: [0, (Math.random() - 0.5) * 60, 0] }}
                transition={{ duration: 25 + Math.random() * 10, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Medusa pure={true} />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Small Swimming Bioluminescent Fish */}
        {[...Array(12)].map((_, i) => {
          const dir = Math.random() > 0.5 ? 1 : -1;
          const speed = 15 + Math.random() * 20;
          return (
            <motion.div
              key={`fish-${i}`}
              className="absolute opacity-70"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: dir === 1 ? '-10%' : '110%',
                scaleX: dir,
                scale: 0.5 + Math.random() * 0.5
              }}
              animate={{
                x: [0, dir * (typeof window !== 'undefined' ? window.innerWidth + 400 : 1800)]
              }}
              transition={{ duration: speed * 1.5, repeat: Infinity, ease: 'linear', delay: Math.random() * 10 }}
            >
              <motion.div
                animate={{
                  y: [0, -30, 0, 30, 0],
                  rotate: [0, -10, 0, 10, 0].map(r => r * dir)
                }}
                transition={{ duration: speed / 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <BioluminescentFish pure={true} />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Sharks in Distance */}
        {[...Array(3)].map((_, i) => {
          const dir = Math.random() > 0.5 ? 1 : -1;
          const speed = 40 + Math.random() * 20;
          return (
            <motion.div
              key={`shark-${i}`}
              className="absolute opacity-40 mix-blend-overlay"
              style={{
                top: `${Math.random() * 60 + 20}%`,
                left: dir === 1 ? '-20%' : '120%',
                scaleX: dir,
                scale: 0.8 + Math.random() * 0.4
              }}
              animate={{
                x: [0, dir * (typeof window !== 'undefined' ? window.innerWidth + 600 : 2500)]
              }}
              transition={{ duration: speed, repeat: Infinity, ease: 'linear', delay: Math.random() * 20 }}
            >
              <motion.div
                animate={{
                  y: [0, -15, 0, 15, 0],
                  rotate: [0, -2, 0, 2, 0].map(r => r * dir)
                }}
                transition={{ duration: speed / 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Shark pure={true} />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Dolphins Swimming */}
        {[...Array(4)].map((_, i) => {
          const dir = Math.random() > 0.5 ? 1 : -1;
          const speed = 25 + Math.random() * 15;
          return (
            <motion.div
              key={`dolphin-${i}`}
              className="absolute opacity-50"
              style={{
                top: `${Math.random() * 30 + 10}%`,
                left: dir === 1 ? '-10%' : '110%',
                scaleX: dir,
                scale: 0.6 + Math.random() * 0.4
              }}
              animate={{
                x: [0, dir * (typeof window !== 'undefined' ? window.innerWidth + 600 : 2200)]
              }}
              transition={{ duration: speed, repeat: Infinity, ease: 'linear', delay: Math.random() * 15 }}
            >
              <motion.div
                animate={{
                  y: [0, -60, 0, 20, 0],
                  rotate: [0, -15, 0, 5, 0].map(r => r * dir)
                }}
                transition={{ duration: speed / 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Dolphin pure={true} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Fish/Organisms (Small glowing dots) */}
      <div className="absolute inset-0 mix-blend-screen z-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: Math.random() * 8 + 2,
              height: Math.random() * 4 + 2,
              backgroundColor: ['#00e6ff', '#00ff99', '#7b00ff', '#ffffff'][Math.floor(Math.random() * 4)],
              boxShadow: '0 0 10px currentColor',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.1
            }}
            animate={{
              x: [0, Math.random() > 0.5 ? 200 : -200],
              y: [0, Math.random() * 40 - 20],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
        {/* Jellyfish */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`jelly-${i}`}
            className="absolute w-12 h-16 pointer-events-none flex flex-col items-center opacity-40 mix-blend-screen"
            style={{ left: `${Math.random() * 100}%`, top: `${150 + Math.random() * 50}%` }}
            animate={{ top: ['150%', '-20%'] }}
            transition={{ duration: 40 + Math.random() * 30, repeat: Infinity, ease: "linear", delay: Math.random() * 20 }}
          >
            <div className="w-8 h-6 bg-pink-500/50 rounded-t-full shadow-[0_0_15px_#ec4899] blur-[2px]" />
            <div className="flex gap-1 mt-1 origin-top">
              <motion.div className="w-0.5 h-8 bg-pink-400/50 blur-[1px]" animate={{ scaleY: [1, 1.5, 1], rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} />
              <motion.div className="w-0.5 h-10 bg-pink-400/50 blur-[1px]" animate={{ scaleY: [1, 1.3, 1], rotate: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <motion.div className="w-0.5 h-8 bg-pink-400/50 blur-[1px]" animate={{ scaleY: [1, 1.4, 1], rotate: [0, 5, 0] }} transition={{ duration: 2.5, repeat: Infinity }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 4. Molecules & Viruses
export const MoleculesBackground = () => {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden bg-gradient-to-b from-[#0a0515] via-[#100a2a] to-[#1a103a]">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.4)_0%,_transparent_70%)] mix-blend-screen" />
      
      {/* Floating Viruses / Complex Structures */}
      {[...Array(6)].map((_, i) => (
        <motion.div
           key={`virus-${i}`}
           className="absolute pointer-events-none opacity-40 mix-blend-screen"
           style={{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
           }}
           animate={{
             x: [0, (Math.random() - 0.5) * 100, 0],
             y: [0, (Math.random() - 0.5) * 100, 0],
             rotate: [0, 360],
           }}
           transition={{ duration: 20 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 rounded-full border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.4)] relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 blur-[2px]" />
            {[...Array(6)].map((_, j) => (
               <div 
                 key={`spike-${j}`} 
                 className="absolute w-1 h-3 bg-fuchsia-400/60 rounded-full" 
                 style={{ 
                   transform: `rotate(${j * 60}deg) translateY(-12px)`
                 }}
               />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Atoms and Electrons */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`atom-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
        >
          {/* Protons/Neutrons Core */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] blur-[1px]" />
            <div className="absolute w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444] blur-[1px] translate-x-1" />
            <div className="absolute w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] blur-[1px] translate-y-1" />
          </div>
          {/* Electron Orbits */}
          {[...Array(3)].map((_, k) => (
            <motion.div
              key={`orbit-${k}`}
              className="absolute top-1/2 left-1/2 w-20 h-8 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{ rotate: k * 60 }}
            >
               <motion.div 
                 className="w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_8px_#fde047]"
                 animate={{ x: [0, 80, 0, -80, 0], y: [0, 10, 0, -10, 0] }}
                 transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "linear" }}
               />
            </motion.div>
          ))}
        </motion.div>
      ))}

      {/* Floating Particles (Protons/Electrons individually) */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            backgroundColor: ['#3b82f6', '#ef4444', '#eab308'][Math.floor(Math.random() * 3)],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 200],
            y: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 200],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

// 5. Microchips & Neural Paths
export const MicrochipsBackground = () => {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden bg-[#030a08]">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='nf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nf)'/%3E%3C/svg%3E")` }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* Neural Paths / Electricity Signals */}
      {[...Array(15)].map((_, i) => {
        const isHorizontal = Math.random() > 0.5;
        const top = `${Math.floor(Math.random() * 20) * 5}%`;
        const left = `${Math.floor(Math.random() * 20) * 5}%`;
        
        return (
          <div key={`path-${i}`} className="absolute" style={{ top, left, width: isHorizontal ? '300px' : '2px', height: isHorizontal ? '2px' : '300px', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <motion.div 
              className="absolute bg-emerald-400 shadow-[0_0_15px_#10b981]"
              style={{
                 width: isHorizontal ? '20px' : '2px',
                 height: isHorizontal ? '2px' : '20px',
                 top: 0,
                 left: 0
              }}
              animate={isHorizontal ? { x: [0, 300, 0] } : { y: [0, 300, 0] }}
              transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
            />
          </div>
        );
      })}

      {/* Microchip Nodes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
           key={`chip-${i}`}
           className="absolute w-16 h-16 bg-[#041a12] border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)] rounded-sm flex items-center justify-center p-2 box-border"
           style={{
             top: `${10 + Math.random() * 80}%`,
             left: `${10 + Math.random() * 80}%`,
           }}
           animate={{ boxShadow: ['0 0 10px rgba(16,185,129,0.1)', '0 0 30px rgba(16,185,129,0.3)', '0 0 10px rgba(16,185,129,0.1)'] }}
           transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
        >
           <div className="w-full h-full border border-emerald-500/20 flex flex-wrap gap-1 p-1">
             {[...Array(9)].map((_, j) => (
                <div key={`pin-${j}`} className="w-2 h-2 bg-emerald-500/20" />
             ))}
           </div>
           
           {/* Connecting Pins */}
           <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-emerald-500/40" />
           <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-emerald-500/40" />
           <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-2 h-4 bg-emerald-500/40" />
           <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-2 h-4 bg-emerald-500/40" />
        </motion.div>
      ))}
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
};

