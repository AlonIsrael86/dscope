import React from 'react';
import { motion } from 'motion/react';

const Jellyfish = ({ size = 40, delay = 0, x = '50%', y = '50%' }) => {
  return (
    <motion.div
      initial={{ x, y, opacity: 0 }}
      animate={{ 
        y: [y, `calc(${y} - 100px)`, y],
        x: [x, `calc(${x} + 20px)`, x],
        opacity: [0.4, 0.7, 0.4]
      }}
      transition={{ 
        duration: 15 + Math.random() * 10, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
      className="absolute pointer-events-none"
      style={{ width: size, height: size }}
    >
      {/* Jellyfish Head */}
      <motion.div 
        animate={{ scaleY: [1, 0.8, 1], scaleX: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-2/3 bg-blue-400/20 rounded-t-full border border-blue-400/30 backdrop-blur-sm relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 to-transparent rounded-t-full" />
      </motion.div>
      
      {/* Tentacles */}
      <div className="flex justify-around px-1 -mt-1 h-1/3">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              height: ['100%', '150%', '100%'],
              skewX: [-5, 5, -5]
            }}
            transition={{ 
              duration: 2 + Math.random(), 
              repeat: Infinity, 
              delay: i * 0.2,
              ease: "easeInOut" 
            }}
            className="w-0.5 bg-gradient-to-b from-blue-400/30 to-transparent rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
};

const Bubble = ({ size = 4, delay = 0, x = '50%' }) => (
  <motion.div
    initial={{ x, y: '110%', opacity: 0 }}
    animate={{ 
      y: '-20%', 
      opacity: [0, 0.4, 0],
      x: [x, `calc(${x} + 30px)`, x]
    }}
    transition={{ 
      duration: 12 + Math.random() * 15, 
      repeat: Infinity, 
      delay,
      ease: "linear"
    }}
    className="absolute bg-blue-200/20 rounded-full blur-[0.5px] pointer-events-none"
    style={{ width: size, height: size, border: '0.5px solid rgba(255,255,255,0.1)' }}
  />
);

export const OceanBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#010610]">
      {/* Deep Sea Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#010a1d] to-[#00050d]" />
      
      {/* Dynamic Light Rays (God Rays) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              rotate: [i * 10 - 20, i * 10 - 15, i * 10 - 20],
              x: [0, 20, 0]
            }}
            transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-50%] left-[-20%] w-[150%] h-[200%] origin-top bg-[conic-gradient(from_180deg_at_50%_0%,transparent_0deg,rgba(59,130,246,0.05)_160deg,rgba(59,130,246,0.1)_180deg,rgba(59,130,246,0.05)_200deg,transparent_360deg)] bg-repeat-x"
            style={{ filter: 'blur(40px)' }}
          />
        ))}
      </div>
      
      {/* Caustics effect simulator */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1)_0%,transparent_70%)]"
            style={{ transform: `rotate(${i * 45}deg)` }}
          />
        ))}
      </div>

      {/* Jellyfish Creatures */}
      <Jellyfish size={120} x="15%" y="30%" delay={0} />
      <Jellyfish size={80} x="85%" y="15%" delay={5} />
      <Jellyfish size={150} x="70%" y="60%" delay={2} />
      <Jellyfish size={60} x="25%" y="80%" delay={8} />
      <Jellyfish size={100} x="45%" y="20%" delay={3} />

      {/* Bubbles */}
      {[...Array(30)].map((_, i) => (
        <Bubble 
          key={i} 
          size={Math.random() * 6 + 2} 
          x={`${Math.random() * 100}%`} 
          delay={Math.random() * 20} 
        />
      ))}

      {/* Surface glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.3)]" />
    </div>
  );
};
