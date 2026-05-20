import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleCluster = () => {
  const ref = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
        scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [positions, initialPositions] = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    const initialPos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
        const radius = Math.random() * 8;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        // Sphere with some clustering
        const r = radius * Math.pow(Math.random(), 1.5);
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 5;
        const z = r * Math.cos(phi);
        
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        initialPos[i * 3] = x;
        initialPos[i * 3 + 1] = y;
        initialPos[i * 3 + 2] = z;
    }
    
    return [pos, initialPos];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    
    // Rotate entire cluster slowly and react to scroll
    const scrollOffset = scrollRef.current * 0.001;
    ref.current.rotation.x = state.clock.elapsedTime * 0.05 + scrollOffset * 0.5;
    ref.current.rotation.y = state.clock.elapsedTime * 0.08 - scrollOffset * 0.2;
    ref.current.rotation.z = scrollOffset * 0.1;

    // Mouse interaction
    const targetX = (mouse.x * viewport.width) / 5;
    const targetY = (mouse.y * viewport.height) / 5;
    
    // Subtle mouse sway
    ref.current.position.x += (targetX - ref.current.position.x) * 0.02;
    ref.current.position.y += (targetY - ref.current.position.y) * 0.02;
    
    // Wavy motion within the cluster based on time
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < positions.length / 3; i++) {
        const i3 = i * 3;
        const ix = initialPositions[i3];
        const iy = initialPositions[i3 + 1];
        const iz = initialPositions[i3 + 2];

        // Let the particles pulse slightly
        positions[i3] = ix + Math.sin(time * 0.5 + iy) * 0.2;
        positions[i3 + 1] = iy + Math.cos(time * 0.6 + ix) * 0.2;
        positions[i3 + 2] = iz + Math.sin(time * 0.4 + iz) * 0.2;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </points>
  );
};

export const DataClusterBackground = () => {
   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-70">
          {/* Subtle mist effect using gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-indigo-900/10 to-transparent blur-3xl z-0" />
          
          <Canvas performance={{ min: 0.5 }} dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false, alpha: true }} camera={{ position: [0, 0, 10], fov: 60 }} className="absolute inset-0 z-10">
              <fog attach="fog" args={["#050a15", 5, 20]} />
              <ambientLight intensity={0.5} />
              <ParticleCluster />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050a15] via-transparent to-[#050a15] z-20 pointer-events-none" />
      </div>
   )
}
