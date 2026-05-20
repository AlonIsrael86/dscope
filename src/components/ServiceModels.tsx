import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Torus, Cone, MeshDistortMaterial, MeshWobbleMaterial, MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Reusable hook for shared model animations (rotation, floating, scaling, emissive intensity)
 * Enhanced for more "living" and "organic" motion.
 */
export const useModelAnimation = ({
  isHovered,
  isClicked = false,
  scrollProgress = 0,
  rotationSpeed = 1,
  floatIntensity = 1,
  baseScale = 0.8,
  hoverScale = 1.4,
  baseEmissive = 0.2,
  hoverEmissive = 2.0,
}: {
  isHovered: boolean;
  isClicked?: boolean;
  scrollProgress?: number;
  rotationSpeed?: number;
  floatIntensity?: number;
  baseScale?: number;
  hoverScale?: number;
  baseEmissive?: number;
  hoverEmissive?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null);
  const wireframeRef = useRef<any>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Improved responsiveness to hover and click
      const driftSpeed = isHovered ? 0.3 : 0.1;
      const organicRotationX = Math.sin(time * 0.4) * driftSpeed;
      const organicRotationZ = Math.cos(time * 0.3) * driftSpeed;
      
      const targetRotationSpeed = isClicked ? rotationSpeed * 10 : (isHovered ? rotationSpeed * 3.5 : rotationSpeed);
      groupRef.current.rotation.y += delta * targetRotationSpeed + (scrollProgress * 0.03);
      
      // Subtle pulse scale: deep breath on neutral, rapid heart beat on click
      const targetScaleV = isClicked ? hoverScale * 1.15 : (isHovered ? hoverScale * 1.05 : baseScale);
      const breathFreq = isClicked ? 15.0 : (isHovered ? 4.0 : 1.5);
      const pulseAmplitude = isClicked ? 0.08 : (isHovered ? 0.04 : 0.02);
      const breathing = 1 + Math.sin(time * breathFreq) * pulseAmplitude;
      
      const appliedScale = targetScaleV * breathing;
      groupRef.current.scale.lerp(new THREE.Vector3(appliedScale, appliedScale, appliedScale), 0.15); // Faster lerp for more snap

      const targetX = (scrollProgress * Math.PI * 0.1) + organicRotationX + (isHovered ? 0.1 : 0);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);
      
      const targetZ = organicRotationZ + (isHovered ? -0.05 : 0);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, 0.1);
      
      const hoverFloat = isHovered ? floatIntensity * 1.5 : floatIntensity;
      const floatX = Math.sin(time * hoverFloat * 0.7) * 0.12;
      const floatY = Math.cos(time * hoverFloat * 0.9) * 0.15;
      const floatZ = Math.sin(time * hoverFloat * 0.5) * 0.1;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, floatX, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, floatY, 0.1);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, floatZ, 0.1);
    }
    
    if (materialRef.current) {
      const targetIntensity = isClicked ? hoverEmissive * 2.5 : (isHovered ? hoverEmissive * 1.2 : baseEmissive);
      const pulseFreq = isClicked ? 12 : (isHovered ? 5 : 2);
      const pulseAmplitude = isHovered ? 0.3 : 0.1;
      const pulse = 1 + Math.sin(time * pulseFreq) * pulseAmplitude;
      const appliedIntensity = targetIntensity * pulse;
      
      if ('emissiveIntensity' in materialRef.current) {
        materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
          materialRef.current.emissiveIntensity,
          appliedIntensity,
          0.2
        );
      }
      
      if ('opacity' in materialRef.current) {
        const scanline = 0.85 + Math.sin(time * 25) * 0.15;
        materialRef.current.opacity = THREE.MathUtils.lerp(
          materialRef.current.opacity,
          (isClicked ? 1.0 : (isHovered ? 0.95 : 0.7)) * scanline,
          0.2
        );
      }
    }

    if (wireframeRef.current) {
      // Wireframe pulse
      const wfScale = 1.02 + Math.sin(time * 5) * 0.01;
      // When wireframeRef doesn't have scale property directly, we bypass it for safety since we don't know the exact object structure but keep the logic if it's there
      if (wireframeRef.current.scale) {
        wireframeRef.current.scale.set(wfScale, wfScale, wfScale);
      }
      if (wireframeRef.current.material) {
        wireframeRef.current.material.opacity = (0.2 + Math.random() * 0.1) * (isHovered ? 2 : 1);
      }
    }
  });

  return { groupRef, materialRef, wireframeRef };
};

/**
 * NEW: QuantumAnchor (formerly Spaceship)
 * A shifting crystalline lattice.
 */
export const SpaceshipModel = ({ color = '#3b82f6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, materialRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.4, floatIntensity: 1.2, baseScale: 0.7, hoverScale: 1.2, hoverEmissive: 4.0
  });

  return (
    <group ref={groupRef}>
      {/* Holographic Core */}
      <Sphere args={[0.67, 16, 16]}>
        <MeshTransmissionMaterial 
          ref={materialRef}
          color={color}
          thickness={1.5}
          roughness={0.05}
          transmission={0.95}
          ior={1.4}
          chromaticAberration={1}
          anisotropy={0.5}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          samples={6}
        />
      </Sphere>

      {/* Holographic Wireframe Layer */}
      <Sphere args={[0.67, 16, 16]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
      </Sphere>
      
      {/* Glowing Structure */}
      {[...Array(6)].map((_, i) => (
        <group key={i} rotation={[i * Math.PI / 3, i * Math.PI / 4, 0]}>
          <Sphere args={[1.00, 16, 16]} position={[0, 0, 0]}>
            <MeshDistortMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={isHovered ? 10 : 3} 
              transparent 
              opacity={0.8}
            speed={2} distort={0.4} />
          </Sphere>
          <Sphere args={[0.08, 12, 12]} position={[0.75, 0, 0]}>
            <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={15} speed={2} distort={0.4} />
          </Sphere>
        </group>
      ))}

      {/* Internal Pulse */}
      <Sphere args={[0.4, 16, 16]}>
        <MeshDistortMaterial color={color} transparent opacity={0.15} wireframe speed={1} distort={0.2} />
      </Sphere>
    </group>
  );
};

export const SatelliteModel = ({ color = '#10b981', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, materialRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.3, baseScale: 0.8, hoverScale: 1.3
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[0.6, 16, 16]}>
        <MeshTransmissionMaterial 
          ref={materialRef}
          thickness={2}
          roughness={0}
          transmission={1}
          ior={1.2}
          color={color}
          chromaticAberration={1}
        />
      </Sphere>

      {/* Holographic Wireframe Layer */}
      <Sphere args={[0.6, 16, 16]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
      </Sphere>
      
      {/* Orbital Scanning Rings */}
      {[...Array(3)].map((_, i) => (
        <Torus key={i} args={[1.2 + i * 0.1, 0.01, 16, 100]} rotation={[Math.PI / 2 + i, i * 0.5, 0]}>
          <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={5} transparent opacity={0.4} speed={2} distort={0.4} />
        </Torus>
      ))}

      {[...Array(6)].map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 6, 0]}>
          <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere args={[0.1, 12, 12]} position={[1.4, 0, 0]}>
              <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={8} speed={2} distort={0.4} />
            </Sphere>
          </Float>
        </group>
      ))}
    </group>
  );
};

export const RocketModel = ({ color = '#8b5cf6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, materialRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.2, baseScale: 0.8, hoverScale: 1.4, baseEmissive: 0.5
  });

  return (
    <group ref={groupRef}>
      <Cylinder args={[0.5, 0.5, 2, 16]}>
        <MeshTransmissionMaterial 
          ref={materialRef}
          color={color}
          thickness={1}
          transmission={0.8}
          roughness={0.1}
          ior={1.5}
        />
      </Cylinder>

      {/* Holographic Wireframe Layer */}
      <Cylinder args={[0.5, 0.5, 2, 16]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
      </Cylinder>
      
      {/* Energy Core */}
      <Cylinder args={[0.2, 0.2, 1.8, 16]}>
        <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={10} speed={2} distort={0.4} />
      </Cylinder>

      {/* Holographic Fins */}
      {[...Array(4)].map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <Sphere args={[0.53, 16, 16]} position={[0.4, -0.6, 0]}>
            <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.3} speed={2} distort={0.4} />
          </Sphere>
        </group>
      ))}

      {/* Ion Ring */}
      <Torus args={[0.7, 0.02, 16, 64]} position={[0, -0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={15} speed={2} distort={0.4} />
      </Torus>
    </group>
  );
};

/**
 * NEW: ResonanceDisk (formerly UFO)
 * Translucent ripples.
 */
export const UfoModel = ({ color = '#3b82f6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.1, floatIntensity: 2, hoverScale: 1.5
  });

  return (
    <group ref={groupRef}>
      {[...Array(4)].map((_, i) => (
        <Torus key={i} args={[0.5 + i * 0.4, 0.02, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <MeshWobbleMaterial 
            color={color} 
            factor={0.4} 
            speed={2} 
            transparent 
            opacity={0.8 - i * i * 0.05} 
            emissive={color} 
            emissiveIntensity={3 + i * 2} 
          />
        </Torus>
      ))}
      <Sphere args={[0.3, 16, 16]}>
        <MeshTransmissionMaterial color="#fff" thickness={2} transmission={1} ior={1.2} chromaticAberration={2} />
      </Sphere>
      
      {/* Holographic Wireframe Layer */}
      <Sphere args={[0.31, 16, 16]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
      </Sphere>
      {/* Light Beam */}
      <Cylinder args={[0.2, 0.8, 4, 16]} position={[0, -2, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </Cylinder>
    </group>
  );
};

export const TelescopeModel = ({ color = '#10b981', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, materialRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.3, baseScale: 0.8, hoverScale: 1.4
  });

  return (
    <group ref={groupRef}>
      <Cylinder args={[0.6, 0.4, 1.5, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <MeshTransmissionMaterial ref={materialRef} color={color} thickness={1} transmission={0.9} ior={1.4} />
      </Cylinder>

      {/* Holographic Wireframe Layer */}
      <Cylinder args={[0.6, 0.4, 1.5, 16]} rotation={[Math.PI / 2, 0, 0]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
      </Cylinder>
      {[...Array(3)].map((_, i) => (
        <Torus key={i} args={[0.45 + i * 0.05, 0.01, 16, 64]} position={[0, 0, 0.7 - i * 0.5]} rotation={[0, 0, 0]}>
          <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={10} speed={2} distort={0.4} />
        </Torus>
      ))}
      <Sphere args={[0.35, 16, 16]} position={[0, 0, 0.75]}>
        <MeshTransmissionMaterial color={color} thickness={3} transmission={1} ior={2.4} chromaticAberration={3} />
      </Sphere>
    </group>
  );
};

export const SpaceStationModel = ({ color = '#8b5cf6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, materialRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.15, baseScale: 0.7, hoverScale: 1.2
  });

  return (
    <group ref={groupRef}>
      <Torus args={[1.5, 0.02, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.5} speed={2} distort={0.4} />
      </Torus>
      <Sphere args={[0.4, 12, 12]}>
        <MeshTransmissionMaterial ref={materialRef} color={color} thickness={2} transmission={0.9} />
      </Sphere>

      {/* Holographic Wireframe Layer */}
      <Sphere args={[0.4, 24, 24]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
      </Sphere>
      {[...Array(4)].map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <Sphere args={[0.53, 16, 16]} position={[1.1, 0, 0]}>
            <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={5} transparent opacity={0.2} speed={2} distort={0.4} />
          </Sphere>
          <Cylinder args={[0.01, 0.01, 1]} position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={10} speed={2} distort={0.4} />
          </Cylinder>
        </group>
      ))}
    </group>
  );
};

/**
 * NEW: MoebiusFlow (formerly Infinity)
 */
export const InfinityModel = ({ color = '#8b5cf6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, materialRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.8, baseScale: 0.7, hoverScale: 1.1
  });

  return (
    <group ref={groupRef}>
      <Torus args={[1, 0.15, 16, 64]}>
        <MeshTransmissionMaterial 
          ref={materialRef}
          color={color}
          thickness={1.5}
          transmission={0.9}
          ior={1.6}
          chromaticAberration={1}
        />
      </Torus>

      {/* Holographic Wireframe Layer */}
      <Torus args={[1, 0.15, 16, 64]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
      </Torus>
      <Torus args={[1, 0.05, 12, 64]} rotation={[0, Math.PI / 2, 0]}>
        <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={5} transparent opacity={0.4} speed={2} distort={0.4} />
      </Torus>
    </group>
  );
};

export const DNAModel = ({ color = '#10b981', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.4, baseScale: 0.6, hoverScale: 0.9
  });

  return (
    <group ref={groupRef}>
      {[...Array(12)].map((_, i) => (
        <group key={i} position={[0, i * 0.4 - 2.2, 0]} rotation={[0, i * 0.6, 0]}>
          <Cylinder args={[0.01, 0.01, 1.4, 8]} rotation={[0, 0, Math.PI / 2]}>
            <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={5} transparent opacity={0.3} speed={2} distort={0.4} />
          </Cylinder>
          <Sphere args={[0.2, 16, 16]} position={[0.75, 0, 0]}>
            <MeshTransmissionMaterial color={color} thickness={1} transmission={1} ior={1.3} />
          </Sphere>
          <Sphere args={[0.2, 16, 16]} position={[-0.75, 0, 0]}>
            <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={10} speed={2} distort={0.4} />
          </Sphere>
        </group>
      ))}
      <Cylinder args={[0.02, 0.02, 4.8, 8]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.1} />
      </Cylinder>
    </group>
  );
};

export const MicrochipModel = ({ color = '#3b82f6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, materialRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.3, baseScale: 0.9, hoverScale: 1.3
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 4, 0, 0]}>
      <Sphere args={[1.33, 16, 16]}>
        <MeshTransmissionMaterial ref={materialRef} color={color} thickness={0.5} transmission={0.95} ior={1.5} />
      </Sphere>
      {/* Holographic Wireframe Layer */}
      <Sphere args={[1.37, 16, 16]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
      </Sphere>
      {[...Array(16)].map((_, i) => (
        <Sphere 
          key={i} 
          args={[0.10, 16, 16]} 
          position={[(i % 4) * 0.4 - 0.6, 0.06, Math.floor(i / 4) * 0.4 - 0.6]}
        >
          <MeshDistortMaterial 
            color="#fff" 
            emissive={color} 
            emissiveIntensity={isHovered ? 20 : 5} 
          speed={2} distort={0.4} />
        </Sphere>
      ))}
      <Torus args={[1.5, 0.01, 16, 64]} position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={2} speed={2} distort={0.4} />
      </Torus>
    </group>
  );
};

export const BoltModel = ({ color = '#3b82f6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, materialRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.6, baseScale: 0.8, hoverScale: 1.3
  });

  return (
    <group ref={groupRef}>
      <Cylinder args={[0.4, 0.4, 1.8, 16]}>
        <MeshTransmissionMaterial ref={materialRef} color={color} thickness={1} transmission={0.8} />
      </Cylinder>
      {/* Holographic Wireframe Layer */}
      <Cylinder args={[0.42, 0.42, 1.82, 16]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
      </Cylinder>
      {[...Array(5)].map((_, i) => (
        <Torus key={i} args={[0.5, 0.02, 8, 16]} position={[0, i * 0.3 - 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={10} speed={2} distort={0.4} />
        </Torus>
      ))}
      <Sphere args={[0.67, 16, 16]} position={[0, 0.9, 0]}>
        <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} />
      </Sphere>
    </group>
  );
};

export const ConveyorBeltModel = ({ color = '#8b5cf6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.1, baseScale: 0.7, hoverScale: 1.1
  });

  return (
    <group ref={groupRef}>
      <Torus args={[1.5, 0.02, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={5} transparent opacity={0.3} speed={2} distort={0.4} />
      </Torus>
      <Torus args={[1.51, 0.03, 16, 64]} rotation={[Math.PI / 2, 0, 0]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.1} />
      </Torus>
      {[...Array(8)].map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 8, 0]}>
          <Sphere args={[0.20, 16, 16]} position={[1.5, 0.2, 0]}>
            <MeshTransmissionMaterial color={color} thickness={2} transmission={0.9} ior={1.5} />
          </Sphere>
          <Sphere args={[0.1, 12, 12]} position={[1.5, 0.5, 0]}>
            <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={10} speed={2} distort={0.4} />
          </Sphere>
        </group>
      ))}
    </group>
  );
};

export const ElectricButterflyModel = ({ color = '#8b5cf6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, materialRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.5, floatIntensity: 3, baseScale: 0.7, hoverScale: 1.1
  });

  return (
    <group ref={groupRef}>
      <Box args={[0.2, 0.2, 0.4]}>
        <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={15} speed={2} distort={0.1} />
      </Box>
      <Box args={[0.25, 0.25, 0.45]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.1} transparent opacity={0.2} />
      </Box>
      <Cone args={[0.1, 0.4, 4]} position={[0, 0, 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={10} speed={2} distort={0.1} />
      </Cone>
      {[...Array(2)].map((_, i) => (
        <group key={i} rotation={[0, i * Math.PI, 0]}>
          <Box args={[1.2, 0.05, 0.8]} position={[0.6, 0, 0]}>
            <MeshWobbleMaterial ref={i === 0 ? materialRef : null} color={color} factor={0.2} speed={8} transparent opacity={0.4} />
          </Box>
          {/* spikes on wings */}
          <Cone args={[0.1, 0.4, 3]} position={[1.1, 0, 0.4]} rotation={[-Math.PI/2, Math.PI/2, 0]}>
            <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={10} speed={2} distort={0.1} />
          </Cone>
          {/* wing veins */}
          <Cylinder args={[0.02, 0.02, 1.2]} position={[0.6, 0.05, 0]} rotation={[0, 0, Math.PI/2]}>
            <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={5} speed={2} distort={0.1} />
          </Cylinder>
        </group>
      ))}
    </group>
  );
};

export const DigitalViolinModel = ({ color = '#3b82f6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, materialRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.2, baseScale: 0.7, hoverScale: 1.0
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
      <Sphere args={[1.67, 16, 16]}>
        <MeshTransmissionMaterial ref={materialRef} color={color} thickness={1} transmission={0.9} ior={1.6} />
      </Sphere>
      <Sphere args={[1.68, 16, 16]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.2}  transparent opacity={0.2} />
      </Sphere>
      {[...Array(4)].map((_, i) => (
        <Cylinder key={i} args={[0.005, 0.005, 2.8]} position={[i * 0.06 - 0.09, 0, 0.06]}>
          <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={15} speed={2} distort={0.4} />
        </Cylinder>
      ))}
      <Torus args={[0.3, 0.02, 16, 64]} position={[0, -0.2, 0]}>
        <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={5} speed={2} distort={0.4} />
      </Torus>
    </group>
  );
};

export const ElectricDragonflyModel = ({ color = '#10b981', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, materialRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.8, floatIntensity: 4, baseScale: 0.6, hoverScale: 1.0
  });

  return (
    <group ref={groupRef}>
      <Box args={[0.1, 0.1, 2.5]} position={[0, 0, -0.5]}>
        <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={5} speed={2} distort={0.1} />
      </Box>
      <Box args={[0.12, 0.12, 2.6]} position={[0, 0, -0.5]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.1} transparent opacity={0.2} />
      </Box>
      <Cone args={[0.15, 0.5, 4]} position={[0, 0.15, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={10} speed={2} distort={0.1} />
      </Cone>
      {[...Array(4)].map((_, i) => (
        <group key={i} rotation={[0, (i % 2 === 0 ? 0 : Math.PI), 0]} position={[0, 0, (i < 2 ? 0.4 : -0.3)]}>
          <Box args={[1.5, 0.02, 0.2]} position={[0.75, 0, 0]}>
            <MeshWobbleMaterial ref={i === 0 ? materialRef : null} color={color} factor={0.2} speed={12} transparent opacity={0.5} />
          </Box>
          <Cone args={[0.05, 0.3, 3]} position={[1.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={10} speed={2} distort={0.1} />
          </Cone>
        </group>
      ))}
    </group>
  );
};

export const ElectricAntModel = ({ color = '#3b82f6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  const { groupRef, materialRef, wireframeRef } = useModelAnimation({
    isHovered, isClicked, scrollProgress,
    rotationSpeed: 0.5, baseScale: 0.7, hoverScale: 1.1
  });

  return (
    <group ref={groupRef}>
      <Box args={[0.5, 0.5, 0.7]} position={[0, 0, -0.5]} ref={wireframeRef}>
        <MeshDistortMaterial color={color} wireframe speed={1} distort={0.1} transparent opacity={0.2} />
      </Box>
      {[...Array(3)].map((_, i) => (
        <Box key={i} args={[0.4 - i * 0.05, 0.4 - i * 0.05, 0.6]} position={[0, 0, i * 0.6 - 0.5]}>
          <MeshTransmissionMaterial ref={i === 0 ? materialRef : null} color={color} thickness={1} transmission={0.9} ior={1.3} />
        </Box>
      ))}
      {/* Mecha legs */}
      {[...Array(6)].map((_, i) => (
        <group key={i} position={[i < 3 ? 0.3 : -0.3, -0.1, (i % 3) * 0.5 - 0.4]} rotation={[0, 0, i < 3 ? -0.8 : 0.8]}>
          <Box args={[0.05, 0.6, 0.05]}>
            <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={10} speed={2} distort={0.1} />
          </Box>
          <Cone args={[0.08, 0.2, 4]} position={[0, -0.3, 0]} rotation={[Math.PI, 0, 0]}>
            <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={15} speed={2} distort={0.1} />
          </Cone>
        </group>
      ))}
      {/* Sharp Mandibles */}
      {[...Array(2)].map((_, i) => (
        <Cone key={`mandible-${i}`} args={[0.05, 0.4, 3]} position={[i === 0 ? 0.15 : -0.15, -0.1, 0.8]} rotation={[-Math.PI / 3, 0, i === 0 ? -0.2 : 0.2]}>
          <MeshDistortMaterial color="#fff" emissive={color} emissiveIntensity={10} speed={2} distort={0.1} />
        </Cone>
      ))}
    </group>
  );
};

export const CyberButterflyModel = ({ color = '#8b5cf6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  return <ElectricButterflyModel color={color} isHovered={isHovered} scrollProgress={scrollProgress} isClicked={isClicked} />;
};

export const NeonButterflyModel = ({ color = '#10b981', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  return <ElectricButterflyModel color={color} isHovered={isHovered} scrollProgress={scrollProgress} isClicked={isClicked} />;
};

export const PhaseDragonflyModel = ({ color = '#3b82f6', isHovered = false, scrollProgress = 0, isClicked = false }: { color?: string, isHovered?: boolean, scrollProgress?: number, isClicked?: boolean }) => {
  return <ElectricDragonflyModel color={color} isHovered={isHovered} scrollProgress={scrollProgress} isClicked={isClicked} />;
};
