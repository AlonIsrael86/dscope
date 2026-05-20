import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial , MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const useHologramAnimation = () => {
  const groupRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Periodic micro-flicker
      groupRef.current.visible = Math.random() > 0.01;
      
      // Gentle drift
      groupRef.current.position.y += Math.sin(time * 0.5) * 0.001;
    }
    if (wireframeRef.current) {
      // Wireframe pulse
      const s = 1.02 + Math.sin(time * 8) * 0.01;
      wireframeRef.current.scale.set(s, s, s);
      const mat = wireframeRef.current.material as any;
      if (mat) mat.opacity = 0.2 + Math.sin(time * 20) * 0.1;
    }
  });

  return { groupRef, wireframeRef };
};

// Algorithmic Connection Node Diagram Model
export const AlgorithmicNodeModel = ({ color = "#3b82f6" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  const particleRefs = useRef<any[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
    
    particleRefs.current.forEach((p, i) => {
      if (p) {
        const time = state.clock.elapsedTime + (i * 100);
        const speed = 0.5 + (i % 3) * 0.2;
        p.position.y = ((time * speed) % 2.5) - 1.25;
        p.material.opacity = Math.sin((p.position.y + 1.25) / 2.5 * Math.PI) * 0.8;
      }
    });
  });

  const lines = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      rotation: [
        (i * 30) * (Math.PI / 180),
        (i * 45) * (Math.PI / 180),
        (i * 15) * (Math.PI / 180)
      ]
    }));
  }, []);

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Central Hub */}
        <mesh>
          <sphereGeometry args={[0.35, 16, 16]} />
          <MeshTransmissionMaterial color={color} thickness={1} transmission={0.9} ior={1.2} chromaticAberration={0.1} />
        </mesh>
        
        {/* Holographic Wireframe Layer */}
        <mesh ref={wireframeRef}>
          <sphereGeometry args={[0.36, 16, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.3} />
        </mesh>

        {/* Global Connection Lattice */}
        <mesh>
          <sphereGeometry args={[1.3, 16, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1.5} distort={0.3}  opacity={0.15} transparent  />
        </mesh>

        {/* Neural Pathways */}
        {lines.map((line, i) => (
          <group key={i} rotation={line.rotation as any}>
            <mesh>
              <cylinderGeometry args={[0.01, 0.01, 2.6, 8]} />
              <meshBasicMaterial color={color} opacity={0.2} transparent />
            </mesh>
            <mesh ref={(el) => (particleRefs.current[i] = el)}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0} />
            </mesh>
          </group>
        ))}
        
        {/* Terminal Points */}
        {[...Array(6)].map((_, i) => (
          <group key={i} rotation={[0, (i * Math.PI) / 3, 0]}>
            <mesh position={[1.3, 0, 0]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={5} speed={2} distort={0.4} />
            </mesh>
          </group>
        ))}
      </Float>
    </group>
  );
};

export const ShieldModel = ({ color = "#3b82f6" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.2, 1]} />
          <MeshDistortMaterial color={color} wireframe speed={1.5} distort={0.3}  opacity={0.3} transparent side={THREE.DoubleSide}  />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.7, 0]} />
          <MeshTransmissionMaterial color={color} thickness={1} transmission={0.9} ior={1.3} />
        </mesh>
        <mesh ref={wireframeRef}>
          <octahedronGeometry args={[0.71, 0]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.4, 0.02, 8, 16]} />
          <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
        </mesh>
      </Float>
    </group>
  );
};

// 2. Global Delivery / Globe
export const GlobeModel = ({ color = "#10b981" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3;
  });
  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[1, 16, 16]} />
          <MeshTransmissionMaterial color={color} thickness={1} transmission={0.9} ior={1.1} />
        </mesh>
        <mesh ref={wireframeRef}>
          <sphereGeometry args={[1.01, 16, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        <mesh position={[1.5, 0, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 8, 16]} />
          <meshBasicMaterial color={color} opacity={0.5} transparent />
        </mesh>
      </Float>
    </group>
  );
};

// 3. Strategic Mgmt / Target
export const TargetModel = ({ color = "#10b981" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.6}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.1, 8, 16]} />
          <MeshDistortMaterial color={color} transparent opacity={0.6} speed={2} distort={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} ref={wireframeRef}>
          <torusGeometry args={[1.21, 0.1, 8, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6, 0.1, 8, 16]} />
          <MeshDistortMaterial color="#ffffff" transparent opacity={0.8} speed={2} distort={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 3]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
};

// 4. Financial Ops / Chart
export const ChartModel = ({ color = "#8b5cf6" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y -= delta * 0.3;
  });
  const bars = [
    { pos: [-0.6, -0.4, 0], height: 0.5 },
    { pos: [-0.2, -0.2, 0], height: 0.9 },
    { pos: [0.2, 0.1, 0], height: 1.5 },
    { pos: [0.6, 0.4, 0], height: 2.1 }
  ];
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.5, 2.5, 10, 10]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  opacity={0.4} transparent side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]} ref={wireframeRef}>
          <planeGeometry args={[2.51, 2.51, 10, 10]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        {bars.map((bar, i) => (
          <group key={i} position={bar.pos as any}>
            <mesh>
              <sphereGeometry args={[0.17, 16, 16]} />
              <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} ior={1.3} />
            </mesh>
            <mesh position={[0, bar.height / 2, 0]}>
              <sphereGeometry args={[0.17, 16, 16]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
            </mesh>
          </group>
        ))}
      </Float>
    </group>
  );
};

// 5. Learning / Education
export const LearningModel = ({ color = "#8b5cf6" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.5;
  });
  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[0, 0.3, 0]} rotation={[0, Math.PI / 4, 0]}>
          <sphereGeometry args={[1.00, 16, 16]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
        <mesh position={[0, 0.3, 0]} rotation={[0, Math.PI / 4, 0]} ref={wireframeRef}>
          <sphereGeometry args={[1.01, 16, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.5]} />
          <MeshDistortMaterial color="#ffffff" opacity={0.6} transparent speed={2} distort={0.4} />
        </mesh>
        <mesh position={[0.7, -0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Float>
    </group>
  );
};

// 6. Factory Processes
export const FactoryModel = ({ color = "#10b981" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  const movingPartRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
    if (movingPartRef.current) {
      const t = state.clock.elapsedTime;
      movingPartRef.current.rotation.z = Math.sin(t * 2) * 0.5;
    }
  });
  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[1.33, 16, 16]} />
          <MeshDistortMaterial color="#ffffff" wireframe speed={1.5} distort={0.3}  transparent opacity={0.3}  />
        </mesh>
        <mesh position={[0, -0.5, 0]} ref={wireframeRef}>
          <sphereGeometry args={[1.34, 16, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        <mesh position={[-0.5, 0.2, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
        <group position={[-0.5, 0.7, 0]} ref={movingPartRef}>
          <mesh position={[0.6, 0, 0]}>
            <sphereGeometry args={[0.80, 16, 16]} />
            <MeshDistortMaterial color={color} transparent opacity={0.6} speed={2} distort={0.4} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

// 7. Food & Beverage / Coffee
export const CoffeeModel = ({ color = "#8b5cf6" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.2;
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.7, 0.5, 1.2, 16]} />
          <MeshTransmissionMaterial color={color} thickness={1} transmission={0.9} />
        </mesh>
        <mesh position={[0, -0.2, 0]} ref={wireframeRef}>
          <cylinderGeometry args={[0.71, 0.51, 1.21, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        <mesh position={[0.7, 0, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <torusGeometry args={[0.3, 0.08, 16, 16]} />
          <MeshDistortMaterial color="#ffffff" transparent opacity={0.6} speed={2} distort={0.4} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[(i - 1) * 0.3, 0.8 + i * 0.2, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#ffffff" opacity={0.3} transparent />
          </mesh>
        ))}
      </Float>
    </group>
  );
};

// 8. Shipping / Package
export const PackageModel = ({ color = "#10b981" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.4;
      groupRef.current.rotation.y += delta * 0.5;
    }
  });
  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[0.80, 16, 16]} />
          <MeshTransmissionMaterial color={color} thickness={1} transmission={0.9} />
        </mesh>
        <mesh ref={wireframeRef}>
          <sphereGeometry args={[0.81, 16, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.81, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.81, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
};

// 9. Construction / Hammer
export const ConstructionModel = ({ color = "#10b981" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y -= delta * 0.3;
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.08, 0.08, 2]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
        <mesh position={[0.7, 0.7, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.3, 0.3, 0.8]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
        <mesh position={[0.7, 0.7, 0]} rotation={[0, 0, -Math.PI / 4]} ref={wireframeRef}>
          <cylinderGeometry args={[0.31, 0.31, 0.81]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
};

// 10. Healthcare / HeartPulse
export const HeartPulseModel = ({ color = "#8b5cf6" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      const s = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1;
      groupRef.current.scale.set(s, s, s);
    }
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        <mesh position={[-0.4, 0, 0]}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
        <mesh position={[0.4, 0, 0]}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
        <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <sphereGeometry args={[0.60, 16, 16]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
        <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 4]} ref={wireframeRef}>
          <sphereGeometry args={[0.61, 16, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
};

// 11. Real Estate / Building
export const BuildingModel = ({ color = "#3b82f6" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.2;
  });
  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[-0.4, 0.2, 0]}>
          <sphereGeometry args={[1.20, 16, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1.5} distort={0.3}  transparent opacity={0.3}  />
        </mesh>
        <mesh position={[-0.4, 0.2, 0]} ref={wireframeRef}>
          <sphereGeometry args={[1.21, 16, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        <mesh position={[0.4, -0.1, 0.2]}>
          <sphereGeometry args={[0.80, 16, 16]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
      </Float>
    </group>
  );
};

// 12. Energy Grid
export const EnergyModel = ({ color = "#8b5cf6" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  const spinningPartRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
    if (spinningPartRef.current) {
      spinningPartRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.1;
    }
  });
  return (
    <group ref={groupRef}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
        <mesh position={[0, 0, 0]} ref={wireframeRef}>
          <sphereGeometry args={[0.41, 16, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        <group ref={spinningPartRef}>
          <mesh position={[0, 0.6, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0, 0.2, 1, 4]} />
            <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={5} transparent opacity={0.6} speed={2} distort={0.4} />
          </mesh>
          <mesh position={[0.1, -0.6, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.2, 0, 1, 4]} />
            <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={5} transparent opacity={0.6} speed={2} distort={0.4} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

// 13. Agriculture
export const AgricultureModel = ({ color = "#10b981" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.2;
  });
  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[1.2, 1.0, 0.2, 16]} />
          <MeshDistortMaterial color="#ffffff" wireframe speed={1.5} distort={0.3}  transparent opacity={0.3}  />
        </mesh>
        <mesh position={[0, -0.4, 0]} ref={wireframeRef}>
          <cylinderGeometry args={[1.21, 1.01, 0.21, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[1.0, 1.0, 0.1, 16]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
        {[[-0.4, 0.2], [0.3, 0.4], [-0.1, -0.3]].map((pos, i) => (
          <mesh key={i} position={[pos[0], 0, pos[1]]}>
            <coneGeometry args={[0.2, 0.6, 8]} />
            <MeshDistortMaterial color={color} transparent opacity={0.6} speed={2} distort={0.4} />
          </mesh>
        ))}
      </Float>
    </group>
  );
};

// 14. Retail & Commerce
export const RetailModel = ({ color = "#3b82f6" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y -= delta * 0.3;
  });
  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.80, 16, 16]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
        <mesh position={[0, -0.1, 0]} ref={wireframeRef}>
          <sphereGeometry args={[0.81, 16, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        <mesh position={[0, -0.6, 0.4]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 1.4]} />
          <MeshDistortMaterial color="#ffffff" transparent opacity={0.5} speed={2} distort={0.4} />
        </mesh>
        <mesh position={[0, -0.6, -0.4]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 1.4]} />
          <MeshDistortMaterial color="#ffffff" transparent opacity={0.5} speed={2} distort={0.4} />
        </mesh>
        <mesh position={[0, 0.5, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.4, 0.05, 16, 16]} />
          <MeshDistortMaterial color="#ffffff" transparent opacity={0.5} speed={2} distort={0.4} />
        </mesh>
      </Float>
    </group>
  );
};

// 15. Automotive / Car
export const AutomotiveModel = ({ color = "#8b5cf6" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.05;
    }
  });
  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh position={[0, -0.2, 0]}>
          <sphereGeometry args={[1.33, 16, 16]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
        <mesh position={[0, -0.2, 0]} ref={wireframeRef}>
          <sphereGeometry args={[1.34, 16, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        <mesh position={[-0.2, 0.2, 0]}>
          <sphereGeometry args={[0.67, 16, 16]} />
          <MeshDistortMaterial color="#ffffff" opacity={0.6} transparent speed={2} distort={0.4} />
        </mesh>
        {[[-0.6, -0.4, 0.5], [0.6, -0.4, 0.5], [-0.6, -0.4, -0.5], [0.6, -0.4, -0.5]].map((p, i) => (
          <mesh key={i} position={p as any} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
            <MeshDistortMaterial color="#ffffff" transparent opacity={0.5} speed={2} distort={0.4} />
          </mesh>
        ))}
      </Float>
    </group>
  );
};

// 16. Entertainment / Film
export const FilmModel = ({ color = "#8b5cf6" }: { color?: string }) => {
  const { groupRef, wireframeRef } = useHologramAnimation();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.z -= delta * 1.5;
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.1, 16]} />
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} ref={wireframeRef}>
          <cylinderGeometry args={[1.01, 1.01, 0.11, 16]} />
          <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
        </mesh>
        {[0, 1, 2, 3, 4].map(i => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.6, 0, Math.sin(angle) * 0.6]}>
              <cylinderGeometry args={[0.3, 0.3, 0.12, 16]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.8} />
            </mesh>
          )
        })}
      </Float>
    </group>
  );
};

// 17. Telecomm / RadioTower
export const RadioModel = ({ color = "#3b82f6" }: { color?: string }) => {
  const groupRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.5;
  });
  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.1, 0.6, 1.5, 4]} />
          <MeshDistortMaterial color={color} wireframe speed={1.5} distort={0.3}   />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <MeshDistortMaterial color="#ffffff" speed={2} distort={0.4} />
        </mesh>
        {[1, 1.5, 2].map((s, i) => (
          <mesh key={i} position={[0, 0.6 - i * 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.4 * s, 0.02, 16, 16]} />
            <meshBasicMaterial color={color} opacity={1 - i * 0.3} transparent />
          </mesh>
        ))}
      </Float>
    </group>
  );
};

// 18. Pharma / Flask
export const PharmaModel = ({ color = "#10b981" }: { color?: string }) => {
  const groupRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3;
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, -0.2, 0]}>
          <coneGeometry args={[0.8, 1.2, 16]} />
          <MeshDistortMaterial color="#ffffff" opacity={0.4} transparent speed={2} distort={0.4} />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <coneGeometry args={[0.7, 0.8, 16]} />
          <MeshDistortMaterial color={color} opacity={0.8} transparent speed={2} distort={0.4} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
          <MeshDistortMaterial color="#ffffff" opacity={0.6} transparent speed={2} distort={0.4} />
        </mesh>
        {[[-0.2, -0.5, 0], [0.3, -0.3, 0.2], [0, -0.2, -0.3]].map((p, i) => (
          <mesh key={i} position={p as any}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </Float>
    </group>
  );
};

// 19. Aerospace / Rocket
export const AerospaceModel = ({ color = "#8b5cf6" }: { color?: string }) => {
  const groupRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.5;
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.8}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 1.5, 16]} />
          <MeshDistortMaterial color="#ffffff" speed={2} distort={0.4} />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <coneGeometry args={[0.3, 0.6, 16]} />
          <MeshDistortMaterial color={color} speed={2} distort={0.4} />
        </mesh>
        {[0, 1, 2, 3].map(i => (
          <mesh key={i} position={[Math.cos(i * Math.PI / 2) * 0.4, -0.5, Math.sin(i * Math.PI / 2) * 0.4]} rotation={[0, -i * Math.PI / 2, 0]}>
            <sphereGeometry args={[0.40, 16, 16]} />
            <MeshDistortMaterial color={color} speed={2} distort={0.4} />
          </mesh>
        ))}
      </Float>
    </group>
  );
};

// 20. Social Management / Users
export const SocialModel = ({ color = "#3b82f6" }: { color?: string }) => {
  const groupRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3;
  });
  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {[0, 1, 2].map(i => {
          const a = (i / 3) * Math.PI * 2;
          return (
            <group key={i} position={[Math.cos(a) * 0.6, 0, Math.sin(a) * 0.6]}>
              <mesh position={[0, 0.4, 0]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <MeshDistortMaterial color="#ffffff" speed={2} distort={0.4} />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <coneGeometry args={[0.3, 0.6, 16]} />
                <MeshDistortMaterial color={color} opacity={0.8} transparent speed={2} distort={0.4} />
              </mesh>
            </group>
          )
        })}
      </Float>
    </group>
  );
};

// 21. Cyber Security / Lock
export const SecurityModel = ({ color = "#8b5cf6" }: { color?: string }) => {
  const groupRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.4;
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.67, 16, 16]} />
          <MeshDistortMaterial color={color} speed={2} distort={0.4} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <torusGeometry args={[0.35, 0.1, 16, 32, Math.PI]} />
          <MeshDistortMaterial color="#ffffff" speed={2} distort={0.4} />
        </mesh>
        <mesh position={[0, -0.3, 0.21]}>
          <circleGeometry args={[0.2, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </Float>
    </group>
  );
};

// 22. Legal Discovery / Scale
export const ScaleModel = ({ color = "#10b981" }: { color?: string }) => {
  const groupRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.2;
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 0.2, 8]} />
          <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.2} speed={2} distort={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 1.0, 8]} />
          <MeshDistortMaterial color="#ffffff" opacity={0.6} transparent wireframe speed={1.5} distort={0.3}   />
        </mesh>
        <group position={[0, 0.5, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 1.4, 8]} />
            <MeshDistortMaterial color="#ffffff" speed={2} distort={0.4} />
          </mesh>
          <mesh position={[-0.6, -0.5, 0]}>
            <cylinderGeometry args={[0.25, 0.2, 0.05, 16]} />
            <MeshDistortMaterial color={color} speed={2} distort={0.4} />
          </mesh>
          <mesh position={[0.6, -0.5, 0]}>
            <cylinderGeometry args={[0.25, 0.2, 0.05, 16]} />
            <MeshDistortMaterial color={color} opacity={0.4} transparent wireframe speed={1.5} distort={0.3}   />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

// 23. Public Sector / Landmark
export const LandmarkModel = ({ color = "#3b82f6" }: { color?: string }) => {
  const groupRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3;
  });
  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[0, -0.6, 0]}>
          <sphereGeometry args={[1.07, 16, 16]} />
          <MeshDistortMaterial color={color} speed={2} distort={0.4} />
        </mesh>
        {[-0.6, -0.2, 0.2, 0.6].map(x => (
          <mesh key={x} position={[x, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
            <MeshDistortMaterial color="#ffffff" speed={2} distort={0.4} />
          </mesh>
        ))}
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[1.20, 16, 16]} />
          <MeshDistortMaterial color={color} speed={2} distort={0.4} />
        </mesh>
        <mesh position={[0, 0.9, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0, 0.9, 0.4, 4]} />
          <MeshDistortMaterial color={color} speed={2} distort={0.4} />
        </mesh>
      </Float>
    </group>
  );
};

// 24. Mining & Resources / Gem
export const GemModel = ({ color = "#10b981" }: { color?: string }) => {
  const groupRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial color={color} wireframe speed={1.5} distort={0.3}   />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.8, 0]} />
          <MeshDistortMaterial color="#ffffff" opacity={0.8} transparent speed={2} distort={0.4} />
        </mesh>
      </Float>
    </group>
  );
};

