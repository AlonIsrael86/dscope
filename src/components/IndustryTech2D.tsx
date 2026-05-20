import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INDUSTRY_TECH } from '../data/industryTechConstants';

export const IndustryTech2D = ({ typeIndex, type, color = "#3b82f6" }: { typeIndex?: number, type?: string, color?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  let tech = INDUSTRY_TECH[0];
  if (type) {
     tech = INDUSTRY_TECH.find(t => t.id === type) || INDUSTRY_TECH[0];
  } else if (typeIndex !== undefined) {
     tech = INDUSTRY_TECH[typeIndex % INDUSTRY_TECH.length];
  }

  const BlueprintGrid = () => (
    <motion.g animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.5 }}>
      <pattern id={`blueprint-grid-industry-${typeIndex}`} width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke={color} strokeWidth="0.5" opacity="0.15" />
      </pattern>
      <pattern id={`blueprint-grid-small-ind-${typeIndex}`} width="4" height="4" patternUnits="userSpaceOnUse">
        <path d="M 4 0 L 0 0 0 4" fill="none" stroke={color} strokeWidth="0.25" opacity="0.05" />
      </pattern>
      <rect width="100%" height="100%" fill={`url(#blueprint-grid-small-ind-${typeIndex})`} />
      <rect width="100%" height="100%" fill={`url(#blueprint-grid-industry-${typeIndex})`} />
      
      <motion.g 
        animate={{ opacity: isHovered ? 0.9 : 0.6 }}
        transition={{ duration: 0.5 }}
      >
        <path d="M 0 50 L 100 50 M 50 0 L 50 100" stroke={color} strokeWidth="1" opacity="0.6" />
        <path d="M 25 0 L 25 100 M 75 0 L 75 100 M 0 25 L 100 25 M 0 75 L 100 75" stroke={color} strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2" />
        <circle cx="50" cy="50" r="12.5" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" strokeDasharray="1,2" />
      </motion.g>

      {/* Target Crossshair & Technical Overlays */}
      <motion.g 
        animate={isHovered ? { rotate: [0, 90] } : { rotate: 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ originX: "50px", originY: "50px" }}
      >
        <path d="M 50 5 L 50 95 M 5 50 L 95 50" stroke={color} strokeWidth="0.75" opacity="0.6" strokeDasharray="4,4" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="0.75" opacity="0.4" strokeDasharray="1,5" />
        <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="0.75" opacity="0.5" />
        
        {isHovered && (
           <>
              <motion.path 
                 d="M 50 10 A 40 40 0 0 1 90 50" 
                 fill="none" stroke={color} strokeWidth="1" opacity="0.6" 
                 animate={{ opacity: [0.2, 0.8, 0.2] }} 
                 transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.path 
                 d="M 50 90 A 40 40 0 0 1 10 50" 
                 fill="none" stroke={color} strokeWidth="1" opacity="0.6" 
                 animate={{ opacity: [0.8, 0.2, 0.8] }} 
                 transition={{ duration: 2, repeat: Infinity }}
              />
           </>
        )}

        <motion.circle 
          cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.2" 
          strokeDasharray="10, 20"
          animate={isHovered ? { rotate: -180 } : { rotate: 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50px", originY: "50px" }}
        />
      </motion.g>
      
      {/* Corner Brackets */}
      {isHovered && (
        <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} style={{ originX: "50px", originY: "50px" }}>
          <path d="M 5 15 L 5 5 L 15 5" fill="none" stroke={color} strokeWidth="0.5" opacity="0.8" />
          <path d="M 95 15 L 95 5 L 85 5" fill="none" stroke={color} strokeWidth="0.5" opacity="0.8" />
          <path d="M 5 85 L 5 95 L 15 95" fill="none" stroke={color} strokeWidth="0.5" opacity="0.8" />
          <path d="M 95 85 L 95 95 L 85 95" fill="none" stroke={color} strokeWidth="0.5" opacity="0.8" />
        </motion.g>
      )}

      {/* Coordinate Data */}
      {isHovered && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <text x="2" y="8" fill={color} fontSize="4" opacity="0.6" fontFamily="monospace">X:{Math.floor(Math.random() * 100)}</text>
          <text x="2" y="14" fill={color} fontSize="4" opacity="0.6" fontFamily="monospace">Y:{Math.floor(Math.random() * 100)}</text>
          <text x="2" y="20" fill={color} fontSize="4" opacity="0.6" fontFamily="monospace">Z:{Math.floor(Math.random() * 100)}</text>
          <text x="80" y="8" fill={color} fontSize="4" opacity="0.6" fontFamily="monospace">ID:I{typeIndex || 0}</text>
          <text x="75" y="14" fill={color} fontSize="4" opacity="0.6" fontFamily="monospace">LVL:{Math.floor(Math.random() * 9)}</text>
          
          <motion.rect x="2" y="24" width="10" height="2" fill={color} opacity="0.4" animate={{ width: [10, 20, 5, 10] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.rect x="2" y="28" width="15" height="2" fill={color} opacity="0.4" animate={{ width: [15, 5, 25, 15] }} transition={{ duration: 3, repeat: Infinity }} />
        </motion.g>
      )}
      
      {/* Abstract Animated Polygons */}
      {isHovered && (
         <motion.g>
            <motion.polygon 
               points="10,35 25,30 20,45" 
               fill="none" stroke={color} strokeWidth="0.5" opacity="0.4"
               animate={{ rotate: 360, scale: [1, 1.2, 1] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               style={{ originX: "18px", originY: "36px" }}
            />
            <motion.polygon 
               points="80,75 95,70 85,85" 
               fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" strokeDasharray="1,2"
               animate={{ rotate: -360, scale: [1, 1.5, 1] }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
               style={{ originX: "86px", originY: "76px" }}
            />
         </motion.g>
      )}
    </motion.g>
  );

  const renderTech = () => {
    switch (tech.id) {
      case 'defense':
        return (
          <motion.g animate={isHovered ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}>
            <path d="M 50 20 L 80 30 L 80 60 C 80 80 50 90 50 90 C 50 90 20 80 20 60 L 20 30 Z" fill="none" stroke={color} strokeWidth="2.5" />
            <path d="M 50 20 L 50 90 M 20 30 L 80 30 M 20 60 L 80 60" stroke={color} strokeWidth="1.5" opacity="0.6" strokeDasharray="2,2" />
          </motion.g>
        );
      case 'govt':
        return (
          <motion.g animate={isHovered ? { y: [-2, 2, -2] } : {}} transition={{ duration: 3, repeat: isHovered ? Infinity : 0 }}>
            <rect x="30" y="40" width="40" height="40" fill="none" stroke={color} strokeWidth="2.5" />
            <path d="M 20 40 L 50 20 L 80 40 Z" fill="none" stroke={color} strokeWidth="2.5" />
            <rect x="40" y="60" width="20" height="20" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="50" cy="30" r="4" fill="none" stroke={color} strokeWidth="1.5" />
          </motion.g>
        );
      case 'logistics':
        return (
          <motion.g animate={isHovered ? { rotate: [0, 360] } : {}} transition={{ duration: 10, repeat: isHovered ? Infinity : 0, ease: "linear" }} style={{ originX: "50px", originY: "50px" }}>
            <circle cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth="2.5" />
            <path d="M 50 30 L 70 50 L 50 70 L 30 50 Z" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="50" cy="15" r="5" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="85" cy="50" r="5" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="50" cy="85" r="5" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="15" cy="50" r="5" fill="none" stroke={color} strokeWidth="2" />
            <path d="M 50 20 L 50 30 M 70 50 L 80 50 M 50 70 L 50 80 M 20 50 L 30 50" stroke={color} strokeWidth="1.25" strokeDasharray="2,2" />
          </motion.g>
        );
      case 'marketing':
        return (
          <motion.g animate={isHovered ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }} style={{ originX: "50px", originY: "50px" }}>
             <circle cx="50" cy="50" r="25" fill="none" stroke={color} strokeWidth="2.5" />
             <circle cx="50" cy="50" r="10" fill="none" stroke={color} strokeWidth="1.5" />
             <path d="M 50 25 L 50 10 M 75 50 L 90 50 M 50 75 L 50 90 M 25 50 L 10 50" stroke={color} strokeWidth="1.5" />
             <path d="M 32 32 L 20 20 M 68 32 L 80 20 M 68 68 L 80 80 M 32 68 L 20 80" stroke={color} strokeWidth="1.5" />
          </motion.g>
        );
      case 'finance':
        return (
          <motion.g animate={isHovered ? { x: [-5, 5, -5] } : {}} transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}>
             <path d="M 20 70 L 40 50 L 60 60 L 80 30" fill="none" stroke={color} strokeWidth="2.5" />
             <circle cx="20" cy="70" r="3" fill="none" stroke={color} strokeWidth="2" />
             <circle cx="40" cy="50" r="3" fill="none" stroke={color} strokeWidth="2" />
             <circle cx="60" cy="60" r="3" fill="none" stroke={color} strokeWidth="2" />
             <circle cx="80" cy="30" r="3" fill="none" stroke={color} strokeWidth="2" />
             <path d="M 20 90 L 20 70 M 40 90 L 40 50 M 60 90 L 60 60 M 80 90 L 80 30" stroke={color} strokeWidth="1.25" strokeDasharray="2,2" opacity="0.6" />
          </motion.g>
        );
      case 'academic':
        return (
          <motion.g animate={isHovered ? { rotate: [-10, 10, -10] } : {}} transition={{ duration: 4, repeat: isHovered ? Infinity : 0 }} style={{ originX: "50px", originY: "50px" }}>
            <path d="M 20 35 L 50 20 L 80 35 L 50 50 Z" fill="none" stroke={color} strokeWidth="2.5" />
            <path d="M 80 35 L 80 50" fill="none" stroke={color} strokeWidth="2" />
            <path d="M 30 40 L 30 70 L 70 70 L 70 40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
            <rect x="45" y="65" width="10" height="5" fill="none" stroke={color} strokeWidth="1.5" />
          </motion.g>
        );
      case 'factory':
        return (
          <motion.g animate={isHovered ? { x: [-2, 2, -2] } : {}} transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}>
            <path d="M 20 80 L 20 40 L 40 40 L 40 25 L 60 25 L 60 15 L 80 15 L 80 80 Z" fill="none" stroke={color} strokeWidth="2.5" />
            <rect x="30" y="55" width="10" height="25" fill="none" stroke={color} strokeWidth="1.5" />
            <rect x="60" y="45" width="10" height="35" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="50" cy="35" r="5" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2,2" />
          </motion.g>
        );
      case 'hospitality':
        return (
          <motion.g animate={isHovered ? { y: [-2, 2, -2] } : {}} transition={{ duration: 2.5, repeat: isHovered ? Infinity : 0 }}>
            <path d="M 30 70 L 70 70 L 65 30 L 35 30 Z" fill="none" stroke={color} strokeWidth="2.5" />
            <path d="M 20 70 L 80 70 C 80 80 20 80 20 70" fill="none" stroke={color} strokeWidth="2.5" />
            <path d="M 40 30 C 40 20 50 15 50 15 C 50 15 60 20 60 30" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="50" cy="50" r="8" fill="none" stroke={color} strokeWidth="1.5" />
          </motion.g>
        );
      case 'shipping':
        return (
          <motion.g animate={isHovered ? { rotate: [-5, 5, -5] } : {}} transition={{ duration: 3, repeat: isHovered ? Infinity : 0 }} style={{ originX: "50px", originY: "70px" }}>
            <path d="M 15 60 L 85 60 L 75 80 L 25 80 Z" fill="none" stroke={color} strokeWidth="2.5" />
            <rect x="35" y="40" width="30" height="20" fill="none" stroke={color} strokeWidth="2" />
            <rect x="45" y="30" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" />
            <path d="M 10 70 L 90 70" stroke={color} strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
          </motion.g>
        );
      case 'construction':
        return (
          <motion.g animate={isHovered ? { rotate: [0, 45, -45, 0] } : {}} transition={{ duration: 4, repeat: isHovered ? Infinity : 0 }} style={{ originX: "50px", originY: "50px" }}>
             <path d="M 30 70 L 70 30 M 20 80 L 80 20 M 40 80 L 80 40" stroke={color} strokeWidth="2" opacity="0.8" />
             <path d="M 40 40 L 60 60 M 30 50 L 50 70 M 50 30 L 70 50" stroke={color} strokeWidth="2" opacity="0.8" />
             <circle cx="50" cy="50" r="15" fill="none" stroke={color} strokeWidth="2.5" />
             <circle cx="50" cy="50" r="5" fill="none" stroke={color} strokeWidth="1.5" />
          </motion.g>
        );
      case 'healthcare':
        return (
          <motion.g animate={isHovered ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }} style={{ originX: "50px", originY: "50px" }}>
             <path d="M 50 80 C 20 60 20 30 35 20 C 45 15 50 25 50 25 C 50 25 55 15 65 20 C 80 30 80 60 50 80 Z" fill="none" stroke={color} strokeWidth="2.5" />
             <path d="M 40 45 L 60 45 M 50 35 L 50 55" stroke={color} strokeWidth="2.5" />
             <circle cx="50" cy="45" r="15" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
          </motion.g>
        );
      case 'realestate':
        return (
           <motion.g animate={isHovered ? { y: [-2, 2, -2] } : {}} transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}>
             <path d="M 25 80 L 25 35 L 50 15 L 75 35 L 75 80 Z" fill="none" stroke={color} strokeWidth="2.5" />
             <rect x="40" y="55" width="20" height="25" fill="none" stroke={color} strokeWidth="2" />
             <rect x="35" y="40" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" />
             <rect x="55" y="40" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" />
           </motion.g>
        );
      case 'energy':
        return (
          <motion.g animate={isHovered ? { rotate: [0, 15, -15, 0] } : {}} transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }} style={{ originX: "50px", originY: "50px" }}>
            <path d="M 55 15 L 35 50 L 50 50 L 45 85 L 65 50 L 50 50 Z" fill="none" stroke={color} strokeWidth="2.5" />
            <circle cx="50" cy="50" r="35" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3,3" />
            <circle cx="50" cy="50" r="25" fill="none" stroke={color} strokeWidth="1" />
          </motion.g>
        );
      case 'agriculture':
        return (
          <motion.g animate={isHovered ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 3, repeat: isHovered ? Infinity : 0 }} style={{ originX: "50px", originY: "50px" }}>
            <path d="M 50 20 C 50 40 30 40 30 60 M 50 30 C 50 50 70 50 70 70 M 50 80 L 50 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 20 80 L 80 80 M 30 90 L 70 90" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <circle cx="50" cy="20" r="3" fill="none" stroke={color} strokeWidth="1.5" />
          </motion.g>
        );
      case 'retail':
        return (
          <motion.g animate={isHovered ? { x: [-3, 3, -3] } : {}} transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}>
             <path d="M 20 30 L 80 30 L 70 70 L 30 70 Z" fill="none" stroke={color} strokeWidth="2.5" />
             <path d="M 40 30 C 40 15 60 15 60 30" fill="none" stroke={color} strokeWidth="2.5" />
             <circle cx="45" cy="50" r="3" fill="none" stroke={color} strokeWidth="1.5" />
             <circle cx="55" cy="50" r="3" fill="none" stroke={color} strokeWidth="1.5" />
          </motion.g>
        );
      case 'automotive':
        return (
          <motion.g animate={isHovered ? { y: [-2, 2, -2] } : {}} transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}>
             <path d="M 15 65 L 15 50 C 15 40 25 35 35 35 L 55 35 C 65 35 75 40 85 55 L 85 65 Z" fill="none" stroke={color} strokeWidth="2.5" />
             <circle cx="25" cy="65" r="10" fill="none" stroke={color} strokeWidth="2.5" />
             <circle cx="75" cy="65" r="10" fill="none" stroke={color} strokeWidth="2.5" />
             <circle cx="25" cy="65" r="4" fill="none" stroke={color} strokeWidth="1.5" />
             <circle cx="75" cy="65" r="4" fill="none" stroke={color} strokeWidth="1.5" />
             <path d="M 30 35 L 45 25 L 60 35" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
          </motion.g>
        );
      case 'entertainment':
        return (
          <motion.g animate={isHovered ? { rotate: [0, 360] } : {}} transition={{ duration: 10, repeat: isHovered ? Infinity : 0, ease: "linear" }} style={{ originX: "50px", originY: "50px" }}>
            <circle cx="35" cy="50" r="15" fill="none" stroke={color} strokeWidth="2.5" />
            <circle cx="65" cy="50" r="15" fill="none" stroke={color} strokeWidth="2.5" />
            <circle cx="35" cy="50" r="5" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="65" cy="50" r="5" fill="none" stroke={color} strokeWidth="1.5" />
            <path d="M 35 35 L 65 35 M 35 65 L 65 65" stroke={color} strokeWidth="2" />
            <path d="M 10 50 L 90 50" stroke={color} strokeWidth="1" strokeDasharray="3,3" />
          </motion.g>
        );
      case 'telecomm':
        return (
          <motion.g animate={isHovered ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }} style={{ originX: "50px", originY: "50px" }}>
             <path d="M 50 85 L 50 15 M 40 25 L 60 25 M 35 40 L 65 40 M 30 55 L 70 55" stroke={color} strokeLinecap="round" strokeWidth="2.5" fill="none" />
             <circle cx="50" cy="15" r="5" fill="none" stroke={color} strokeWidth="2.5" />
             {isHovered && <motion.circle cx="50" cy="15" r="15" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2,2" animate={{ scale: [1, 2], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />}
          </motion.g>
        );
      case 'pharma':
        return (
          <motion.g animate={isHovered ? { rotate: [-10, 10, -10] } : {}} transition={{ duration: 3, repeat: isHovered ? Infinity : 0 }} style={{ originX: "50px", originY: "50px" }}>
             <path d="M 40 20 L 60 20 L 60 40 L 70 70 L 30 70 L 40 40 Z" fill="none" stroke={color} strokeWidth="2.5" />
             <path d="M 45 10 L 55 10 L 55 20 L 45 20 Z" fill="none" stroke={color} strokeWidth="2" />
             <path d="M 35 55 L 65 55" stroke={color} strokeWidth="1.5" strokeDasharray="2,2" />
             <circle cx="45" cy="60" r="2" fill="none" stroke={color} strokeWidth="1.5" />
             <circle cx="55" cy="63" r="2" fill="none" stroke={color} strokeWidth="1.5" />
          </motion.g>
        );
      case 'aerospace':
        return (
          <motion.g animate={isHovered ? { y: [-5, 5, -5] } : {}} transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}>
            <path d="M 50 15 C 60 30 70 50 70 75 L 50 85 L 30 75 C 30 50 40 30 50 15 Z" fill="none" stroke={color} strokeWidth="2.5" />
            <path d="M 30 55 L 10 70 L 30 65 M 70 55 L 90 70 L 70 65" fill="none" stroke={color} strokeWidth="2" />
            <path d="M 50 25 L 50 75" stroke={color} strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />
            <circle cx="50" cy="45" r="5" fill="none" stroke={color} strokeWidth="1.5" />
          </motion.g>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center cursor-pointer relative overflow-visible group transition-colors bg-transparent border-none"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg viewBox="0 0 100 100" className="w-full h-32 md:h-40 relative z-10 overflow-visible">
        {/* Background Data Nodes */}
        {isHovered && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
               {Array.from({ length: 8 }).map((_, i) => (
                 <motion.circle 
                   key={`node-ind-${i}`}
                   cx={20 + Math.random() * 60}
                   cy={20 + Math.random() * 60}
                   r={0.5 + Math.random() * 1.5}
                   fill="none" stroke={color} strokeWidth="0.5" opacity="0.4"
                   animate={{ scale: [1, 2, 1], opacity: [0.4, 0.8, 0.4] }}
                   transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                 />
               ))}
            </motion.g>
        )}
        <motion.g animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.5 }}>
          <BlueprintGrid />
        </motion.g>
        
        {/* Dynamic connection lines shown on hover */}
        {isHovered && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <motion.path 
              d="M 10 90 L 30 70 L 40 70" 
              fill="none" stroke={color} strokeWidth="0.5" opacity="0.6" strokeDasharray="2,2" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
            />
            <motion.circle cx="10" cy="90" r="1.5" fill={color} />
            <motion.circle cx="30" cy="70" r="1" fill="none" stroke={color} strokeWidth="0.5" />

            <motion.path 
              d="M 90 10 L 70 30 L 60 30" 
              fill="none" stroke={color} strokeWidth="0.5" opacity="0.6" strokeDasharray="2,2" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
            />
            <motion.circle cx="90" cy="10" r="1.5" fill={color} />
            <motion.circle cx="70" cy="30" r="1" fill="none" stroke={color} strokeWidth="0.5" />
            
            <motion.line 
              x1="50" y1="0" x2="50" y2="100" 
              stroke={color} strokeWidth="0.25" opacity="0.4"
              animate={{ x: [-50, 50] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.g>
        )}

        {renderTech()}
      </svg>
    </div>
  );
};
