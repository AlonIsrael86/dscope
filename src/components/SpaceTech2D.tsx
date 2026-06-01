import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SPACE_TECH } from '../data/spaceTechConstants';

export const SpaceTech2D = ({ typeIndex, type, color = "#3b82f6" }: { typeIndex?: number, type?: string, color?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  let tech = SPACE_TECH[0];
  if (type) {
     tech = SPACE_TECH.find(t => t.id === type) || SPACE_TECH[0];
  } else if (typeIndex !== undefined) {
     tech = SPACE_TECH[typeIndex % SPACE_TECH.length];
  }

  const BlueprintGrid = () => (
    <motion.g animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.5 }}>
      <pattern id={`blueprint-grid-${typeIndex}`} width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke={color} strokeWidth="0.5" opacity="0.15" />
      </pattern>
      <pattern id={`blueprint-grid-small-${typeIndex}`} width="4" height="4" patternUnits="userSpaceOnUse">
        <path d="M 4 0 L 0 0 0 4" fill="none" stroke={color} strokeWidth="0.25" opacity="0.05" />
      </pattern>
      <rect width="100%" height="100%" fill={`url(#blueprint-grid-small-${typeIndex})`} />
      <rect width="100%" height="100%" fill={`url(#blueprint-grid-${typeIndex})`} />
      
      <motion.g 
        animate={{ opacity: isHovered ? 0.8 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <path d="M 0 50 L 100 50 M 50 0 L 50 100" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <path d="M 25 0 L 25 100 M 75 0 L 75 100 M 0 25 L 100 25 M 0 75 L 100 75" stroke={color} strokeWidth="0.25" opacity="0.2" strokeDasharray="2,2" />
        <circle cx="50" cy="50" r="12.5" fill="none" stroke={color} strokeWidth="0.25" opacity="0.3" strokeDasharray="1,2" />
      </motion.g>

      {/* Target Crossshair & Technical Overlays */}
      <motion.g 
        animate={isHovered ? { rotate: [0, 90] } : { rotate: 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ originX: "50px", originY: "50px" }}
      >
        <path d="M 50 5 L 50 95 M 5 50 L 95 50" stroke={color} strokeWidth="0.5" opacity="0.4" strokeDasharray="4,4" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" strokeDasharray="1,5" />
        <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
        
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

      {/* Decorative corners */}
      <path d="M 0 10 L 0 0 L 10 0" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M 100 10 L 100 0 L 90 0" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M 0 90 L 0 100 L 10 100" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M 100 90 L 100 100 L 90 100" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      
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
          <text x="80" y="8" fill={color} fontSize="4" opacity="0.6" fontFamily="monospace">ID:T{typeIndex || 0}</text>
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
      case 'satellite':
        return (
          <motion.g
            animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 10, repeat: isHovered ? Infinity : 0, ease: "linear" }}
            style={{ originX: "50px", originY: "50px" }}
          >
            {/* Body */}
            <rect x="40" y="30" width="20" height="40" fill="none" stroke={color} strokeWidth="2" />
            <path d="M 40 35 L 60 45 M 40 45 L 60 55 M 40 55 L 60 65" stroke={color} strokeWidth="1" opacity="0.5" />
            {/* Solar Panels */}
            <motion.rect 
              x="10" y="35" width="25" height="30" fill="none" stroke={color} strokeWidth="2"
              animate={isHovered ? { rotateY: [0, 45, 0] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ originX: "35px", originY: "50px" }}
            />
            <motion.rect 
              x="65" y="35" width="25" height="30" fill="none" stroke={color} strokeWidth="2" 
              animate={isHovered ? { rotateY: [0, -45, 0] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ originX: "65px", originY: "50px" }}
            />
            <path d="M 10 50 L 35 50 M 65 50 L 90 50" stroke={color} strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="50" cy="50" r="5" fill="none" stroke={color} strokeWidth="2" />
          </motion.g>
        );
      case 'starlink':
        return (
          <motion.g
            animate={isHovered ? { x: [-100, 100] } : { x: 0 }}
            transition={{ duration: 3, repeat: isHovered ? Infinity : 0, ease: "linear" }}
          >
            {[0, 20, 40, 60].map((offsetX, i) => (
              <g key={i} transform={`translate(${offsetX - 30}, 0)`}>
                <rect x="40" y="45" width="15" height="10" fill="none" stroke={color} strokeWidth="1.5" />
                <path d="M 40 45 L 55 55 M 55 45 L 40 55" stroke={color} strokeWidth="0.5" />
                <line x1="40" y1="50" x2="20" y2="50" stroke={color} strokeWidth="2" strokeDasharray="1,2" />
                <circle cx="47.5" cy="50" r="2" fill="none" stroke={color} strokeWidth="1" />
              </g>
            ))}
          </motion.g>
        );
      case 'spaceship':
        return (
          <motion.g
            animate={isHovered ? { y: [-5, -20, -5], x: [0, 5, 0] } : { y: 0, x: 0 }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
          >
            <path d="M50 20 L65 70 L35 70 Z" fill="none" stroke={color} strokeWidth="2" />
            <path d="M 50 20 L 50 70 M 42.5 45 L 57.5 45" stroke={color} strokeWidth="1" opacity="0.5" />
            <path d="M50 50 L60 70 L40 70 Z" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="50" cy="45" r="4" fill="none" stroke={color} strokeWidth="1.5" />
            {isHovered && (
              <motion.path 
                d="M40 70 L50 90 L60 70 Z" 
                fill="none" stroke={color} strokeWidth="1"
                animate={{ opacity: [0.5, 1, 0.5], scaleY: [1, 1.5, 1] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                style={{ originY: "70px" }}
                strokeDasharray="2,2"
              />
            )}
          </motion.g>
        );
      case 'ufo':
        return (
          <motion.g
            animate={isHovered ? { y: [-10, 10, -10], rotate: [-10, 10, -10] } : {}}
            transition={{ duration: 3, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
            style={{ originX: "50px", originY: "50px" }}
          >
            <ellipse cx="50" cy="50" rx="30" ry="10" fill="none" stroke={color} strokeWidth="2" />
            <ellipse cx="50" cy="50" rx="20" ry="5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
            <path d="M35 48 C35 30, 65 30, 65 48" fill="none" stroke={color} strokeWidth="2" />
            <path d="M 40 48 C 40 35, 60 35, 60 48" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
            {isHovered && (
              <motion.polygon 
                points="40,55 60,55 80,100 20,100" 
                fill="none" stroke={color} strokeWidth="1"
                opacity="0.5" strokeDasharray="4,4"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            <circle cx="35" cy="50" r="2" fill="none" stroke={color} strokeWidth="1" />
            <circle cx="50" cy="52" r="2" fill="none" stroke={color} strokeWidth="1" />
            <circle cx="65" cy="50" r="2" fill="none" stroke={color} strokeWidth="1" />
          </motion.g>
        );
      case 'telescope':
        return (
          <motion.g
            animate={isHovered ? { rotate: [-15, 15, -15] } : {}}
            transition={{ duration: 6, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
            style={{ originX: "50px", originY: "50px" }}
          >
            <rect x="35" y="30" width="30" height="40" fill="none" stroke={color} strokeWidth="2" />
            <path d="M 35 40 L 65 40 M 35 50 L 65 50 M 35 60 L 65 60" stroke={color} strokeWidth="1" opacity="0.5" />
            <rect x="40" y="20" width="20" height="10" fill="none" stroke={color} strokeWidth="2" />
            <path d="M45 70 L30 90 M55 70 L70 90" stroke={color} strokeWidth="2" />
            <path d="M 37.5 80 L 62.5 80" stroke={color} strokeWidth="1" opacity="0.5" />
            {isHovered && (
              <motion.circle 
                cx="50" cy="25" r="4" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="1,2"
                animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.g>
        );
      case 'meteorite':
        return (
          <motion.g
            animate={isHovered ? { x: [-30, 120], y: [-30, 120] } : {}}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: "linear" }}
          >
            <path d="M45 45 Q50 35 60 40 Q65 55 50 60 Q35 55 45 45" fill="none" stroke={color} strokeWidth="2" />
            <path d="M 45 50 Q 50 45 55 50" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
            {isHovered && (
              <motion.path 
                d="M40 40 L10 10 M35 50 L5 20 M50 35 L20 5" 
                fill="none" stroke={color} 
                strokeWidth="1.5"
                strokeDasharray="4,4"
                animate={{ strokeDasharray: ["0, 100", "50, 50"], opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </motion.g>
        );
      case 'comet':
        return (
          <motion.g
            animate={isHovered ? { x: [100, -100], y: [-100, 100] } : {}}
            transition={{ duration: 4, repeat: isHovered ? Infinity : 0, ease: "linear" }}
          >
            <circle cx="50" cy="50" r="8" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="50" cy="50" r="4" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
            <path d="M55 45 L90 10 Q80 30 55 55 Z" fill="none" stroke={color} strokeWidth="1" opacity="0.6" strokeDasharray="2,2" />
            {isHovered && (
              <motion.path 
                d="M55 45 L110 -10 Q90 40 60 60 Z" 
                fill="none" stroke={color} strokeWidth="1"
                opacity="0.4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.g>
        );
      case 'astronaut':
        return (
          <motion.g
            animate={isHovered ? { y: [-10, 10, -5], rotate: [-10, 20, -5], x: [0, 5, -5] } : {}}
            transition={{ duration: 4, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
            style={{ originX: "50px", originY: "50px" }}
          >
            <circle cx="50" cy="35" r="12" fill="none" stroke={color} strokeWidth="2" />
            <path d="M 42 35 C 42 25, 58 25, 58 35" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
            <rect x="42" y="30" width="16" height="8" rx="4" fill="none" stroke={color} strokeWidth="1.5" />
            <rect x="40" y="47" width="20" height="25" rx="5" fill="none" stroke={color} strokeWidth="2" />
            <path d="M 40 55 L 60 55 M 40 65 L 60 65" stroke={color} strokeWidth="1" opacity="0.5" />
            <path d="M35 50 Q25 60 30 70" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M65 50 Q75 60 70 70" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
            {isHovered && (
              <motion.circle 
                cx="58" cy="34" r="2" fill="none" stroke={color} strokeWidth="1"
                animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.g>
        );
      case 'spacestation':
        return (
          <motion.g
            animate={isHovered ? { rotate: 360 } : {}}
            transition={{ duration: 20, repeat: isHovered ? Infinity : 0, ease: "linear" }}
            style={{ originX: "50px", originY: "50px" }}
          >
            <circle cx="50" cy="50" r="15" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="50" cy="50" r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
            <rect x="15" y="45" width="20" height="10" fill="none" stroke={color} strokeWidth="1.5" />
            <path d="M 20 45 L 20 55 M 25 45 L 25 55 M 30 45 L 30 55" stroke={color} strokeWidth="1" opacity="0.5" />
            <rect x="65" y="45" width="20" height="10" fill="none" stroke={color} strokeWidth="1.5" />
            <path d="M 70 45 L 70 55 M 75 45 L 75 55 M 80 45 L 80 55" stroke={color} strokeWidth="1" opacity="0.5" />
            <rect x="45" y="15" width="10" height="20" fill="none" stroke={color} strokeWidth="1.5" />
            <rect x="45" y="65" width="10" height="20" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="50" cy="50" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity={isHovered ? 1 : 0.5} />
          </motion.g>
        );
      case 'rover':
        return (
          <motion.g
            animate={isHovered ? { x: [-10, 10, -10], y: [0, 2, 0] } : {}}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
          >
            <rect x="30" y="50" width="40" height="15" rx="2" fill="none" stroke={color} strokeWidth="2" />
            <path d="M 40 50 L 40 65 M 50 50 L 50 65 M 60 50 L 60 65" stroke={color} strokeWidth="1" opacity="0.5" />
            <rect x="40" y="40" width="20" height="10" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="35" cy="65" r="5" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="35" cy="65" r="2" fill="none" stroke={color} strokeWidth="0.5" />
            <circle cx="50" cy="65" r="5" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="50" cy="65" r="2" fill="none" stroke={color} strokeWidth="0.5" />
            <circle cx="65" cy="65" r="5" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="65" cy="65" r="2" fill="none" stroke={color} strokeWidth="0.5" />
            <path d="M60 40 L70 30 L65 25" stroke={color} strokeWidth="2" fill="none" />
            {isHovered && <circle cx="65" cy="25" r="2" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="1,1" />}
          </motion.g>
        );
      case 'mobile-phone':
        return (
          <motion.g
            animate={isHovered ? { y: [-2, 2, -2] } : {}}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
          >
            <rect x="35" y="20" width="30" height="60" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
            <rect x="38" y="25" width="24" height="45" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
            <path d="M 45 22 L 55 22" stroke={color} strokeWidth="1" strokeLinecap="round" />
            <circle cx="50" cy="75" r="2" fill="none" stroke={color} strokeWidth="1" />
            {isHovered && (
              <motion.g>
                <motion.rect 
                  x="40" y="30" width="20" height="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.6" strokeDasharray="1,1"
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <circle cx="50" cy="50" r="5" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2,2" />
              </motion.g>
            )}
          </motion.g>
        );
      case 'robot':
        return (
          <motion.g
            animate={isHovered ? { y: [-2, 2, -2] } : {}}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
          >
            <rect x="40" y="25" width="20" height="20" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
            <rect x="35" y="50" width="30" height="30" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
            <line x1="50" y1="45" x2="50" y2="50" stroke={color} strokeWidth="1.5" />
            
            <circle cx="45" cy="35" r="3" fill="none" stroke={color} strokeWidth="1" />
            <circle cx="55" cy="35" r="3" fill="none" stroke={color} strokeWidth="1" />
            <path d="M 45 40 L 55 40" stroke={color} strokeWidth="1" />
            
            <path d="M 35 55 L 25 65" stroke={color} strokeWidth="1.5" />
            <path d="M 65 55 L 75 65" stroke={color} strokeWidth="1.5" />
            
            {isHovered && (
              <motion.g>
                <motion.circle cx="45" cy="35" r="1.5" fill={color} opacity="0.8" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 0.5, repeat: Infinity }} />
                <motion.circle cx="55" cy="35" r="1.5" fill={color} opacity="0.8" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }} />
                <motion.rect x="40" y="60" width="20" height="10" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="2,2" animate={{ strokeDashoffset: [0, 10] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
              </motion.g>
            )}
          </motion.g>
        );
      case 'big-telescope':
        return (
          <motion.g
            animate={isHovered ? { rotate: [-5, 5, -5] } : {}}
            transition={{ duration: 4, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
            style={{ originX: "50px", originY: "70px" }}
          >
            <path d="M 30 80 L 70 80 L 60 40 L 40 40 Z" fill="none" stroke={color} strokeWidth="1.5" />
            <path d="M 40 40 L 45 10 L 80 0 L 60 40 Z" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="60" cy="20" r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
            <path d="M 50 40 L 50 80" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
            {isHovered && (
              <motion.g>
                <motion.circle cx="80" cy="0" r="5" fill="none" stroke={color} strokeWidth="1" animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.path d="M 85 -5 L 100 -20" stroke={color} strokeWidth="0.5" strokeDasharray="2,2" />
              </motion.g>
            )}
          </motion.g>
        );
      case 'water-waves':
        return (
          <motion.g>
            <motion.path 
              d="M 10 50 Q 25 40 40 50 T 70 50 T 100 50" 
              fill="none" stroke={color} strokeWidth="1.5" 
              animate={isHovered ? { d: ["M 10 50 Q 25 40 40 50 T 70 50 T 100 50", "M 10 50 Q 25 60 40 50 T 70 50 T 100 50", "M 10 50 Q 25 40 40 50 T 70 50 T 100 50"] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path 
              d="M 10 60 Q 30 70 45 60 T 75 60 T 100 60" 
              fill="none" stroke={color} strokeWidth="1" opacity="0.6"
              animate={isHovered ? { d: ["M 10 60 Q 30 70 45 60 T 75 60 T 100 60", "M 10 60 Q 30 50 45 60 T 75 60 T 100 60", "M 10 60 Q 30 70 45 60 T 75 60 T 100 60"] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.path 
              d="M 10 70 Q 20 60 35 70 T 65 70 T 100 70" 
              fill="none" stroke={color} strokeWidth="0.5" opacity="0.3"
              animate={isHovered ? { d: ["M 10 70 Q 20 60 35 70 T 65 70 T 100 70", "M 10 70 Q 20 80 35 70 T 65 70 T 100 70", "M 10 70 Q 20 60 35 70 T 65 70 T 100 70"] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            {isHovered && (
              <motion.g>
                <motion.circle cx="50" cy="55" r="2" fill="none" stroke={color} opacity="0.8" animate={{ y: [-10, 10, -10] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
              </motion.g>
            )}
          </motion.g>
        );
      case 'space-laboratory':
        return (
          <motion.g
            animate={isHovered ? { rotate: [0, 360] } : {}}
            transition={{ duration: 40, repeat: isHovered ? Infinity : 0, ease: "linear" }}
            style={{ originX: "50px", originY: "50px" }}
          >
            <circle cx="50" cy="50" r="25" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="50" cy="50" r="15" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="3,3" />
            <rect x="40" y="25" width="20" height="50" fill="none" stroke={color} strokeWidth="1" />
            <rect x="25" y="40" width="50" height="20" fill="none" stroke={color} strokeWidth="1" />
            <path d="M 35 35 L 65 65 M 35 65 L 65 35" stroke={color} strokeWidth="0.5" opacity="0.5" />
            {isHovered && (
              <motion.g>
                <circle cx="50" cy="50" r="5" fill="none" stroke={color} strokeWidth="1" />
                <motion.circle cx="50" cy="50" r="2" fill={color} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <motion.path d="M 50 15 L 50 5 M 50 85 L 50 95 M 15 50 L 5 50 M 85 50 L 95 50" stroke={color} strokeWidth="1" strokeDasharray="2,2" animate={{ strokeDashoffset: [0, 5] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
              </motion.g>
            )}
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
            <motion.g
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.5 }}
            >
               {Array.from({ length: 8 }).map((_, i) => (
                 <motion.circle 
                   key={`node-${i}`}
                   cx={20 + Math.random() * 60}
                   cy={20 + Math.random() * 60}
                   r={0.5 + Math.random() * 1.5}
                   fill="none"
                   stroke={color}
                   strokeWidth="0.5"
                   opacity="0.4"
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
          <motion.g 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.3 }}
          >
            <motion.path 
              d="M 10 90 L 30 70 L 40 70" 
              fill="none" stroke={color} strokeWidth="0.5" opacity="0.6" strokeDasharray="2,2" 
              initial={false}
            />
            <motion.circle cx="10" cy="90" r="1.5" fill={color} />
            <motion.circle cx="30" cy="70" r="1" fill="none" stroke={color} strokeWidth="0.5" />

            <motion.path 
              d="M 90 10 L 70 30 L 60 30" 
              fill="none" stroke={color} strokeWidth="0.5" opacity="0.6" strokeDasharray="2,2" 
              initial={false}
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
