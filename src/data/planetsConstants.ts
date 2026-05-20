export const PLANETS_DATA = [
  {
    id: 'mercury', name: 'Mercury', coordinates: '0.39 AU • 57.91M km', sizeClass: 'w-6 h-6 md:w-10 md:h-10',
    baseBg: 'bg-[#d1d5db]', // White-ish / Brownish
    texture: 'radial-gradient(circle at 30% 30%, #f3f4f6, #9ca3af, #4b5563)',
    position: 'top-[30%] left-[30%]',
    orbit: { rx: 12, ry: 10, speed: 4, angle: 0 }
  },
  {
    id: 'venus', name: 'Venus', coordinates: '0.72 AU • 108.2M km', sizeClass: 'w-10 h-10 md:w-16 md:h-16',
    baseBg: 'bg-[#fef3c7]', // Bright White / Yellowish
    texture: 'linear-gradient(10deg, #fde68a, #fef08a, #fdf6e3, #fef08a, #fde68a)',
    position: 'top-[15%] left-[55%]',
    orbit: { rx: 20, ry: 18, speed: 3, angle: 2 }
  },
  {
    id: 'earth', name: 'Earth', coordinates: '1.00 AU • 149.6M km', sizeClass: 'w-12 h-12 md:w-20 md:h-20',
    baseBg: 'bg-[#1e3a8a]', // Deep blue base
    texture: 'radial-gradient(circle at 40% 40%, rgba(34,197,94,0.8) 0%, transparent 20%), radial-gradient(circle at 60% 60%, rgba(234,179,8,0.6) 0%, transparent 30%), linear-gradient(135deg, #3b82f6, #1d4ed8, #1e3a8a)',
    position: 'top-[45%] right-[20%]',
    orbit: { rx: 28, ry: 25, speed: 2.2, angle: 4 }
  },
  {
    id: 'mars', name: 'Mars', coordinates: '1.52 AU • 227.9M km', sizeClass: 'w-8 h-8 md:w-12 md:h-12',
    baseBg: 'bg-[#b91c1c]', // Rust-Orange / Red
    texture: 'radial-gradient(circle at 50% 10%, #f1f5f9 0%, transparent 15%), radial-gradient(circle at 50% 90%, #f1f5f9 0%, transparent 15%), radial-gradient(circle at 50% 50%, #c2410c, #991b1b, #450a0a)',
    position: 'top-[75%] left-[10%]',
    orbit: { rx: 36, ry: 32, speed: 1.8, angle: 1 }
  },
  {
    id: 'jupiter', name: 'Jupiter', coordinates: '5.20 AU • 778.5M km', sizeClass: 'w-20 h-20 md:w-32 md:h-32',
    baseBg: 'bg-[#d6d3d1]', // Tan / Beige
    texture: 'linear-gradient(0deg, #a8a29e, #d6d3d1, #78716c, #e7e5e4, #a8a29e, #d6d3d1, #78716c)',
    hasMoons: true,
    position: 'top-[80%] right-[30%]',
    orbit: { rx: 48, ry: 40, speed: 1, angle: 3 }
  },
  {
    id: 'saturn', name: 'Saturn', coordinates: '9.58 AU • 1.43B km', sizeClass: 'w-16 h-16 md:w-24 md:h-24',
    baseBg: 'bg-[#fcd34d]', // Yellowish-Tan
    texture: 'linear-gradient(15deg, #d97706, #f59e0b, #fef3c7, #fcd34d, #d97706)',
    hasRings: true,
    position: 'top-[5%] right-[10%]',
    orbit: { rx: 60, ry: 50, speed: 0.7, angle: 5 }
  },
  {
    id: 'uranus', name: 'Uranus', coordinates: '19.22 AU • 2.87B km', sizeClass: 'w-10 h-10 md:w-14 md:h-14',
    baseBg: 'bg-[#a5f3fc]', // Pale Blue-Green
    texture: 'radial-gradient(circle at 50% 50%, #cffafe, #67e8f9, #06b6d4, #0891b2)',
    position: 'top-[35%] left-[10%]',
    orbit: { rx: 72, ry: 60, speed: 0.4, angle: 6 }
  },
  {
    id: 'neptune', name: 'Neptune', coordinates: '30.05 AU • 4.50B km', sizeClass: 'w-4 h-4 md:w-6 md:h-6',
    baseBg: 'bg-[#1e40af]', // Deep Blue
    texture: 'radial-gradient(circle at 50% 50%, #60a5fa, #3b82f6, #1d4ed8, #1e3a8a)',
    position: 'top-[60%] left-[30%]',
    orbit: { rx: 85, ry: 70, speed: 0.2, angle: 2.5 }
  }
];
