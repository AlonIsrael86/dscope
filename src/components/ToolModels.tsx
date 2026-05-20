import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Torus, Cone, MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const useHologramAnimation = (hovered: boolean, isClicked: boolean) => {
  const groupRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.visible = Math.random() > 0.01;
      
      const targetScale = isClicked ? 1.4 : (hovered ? 1.2 : 1);
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    }
    if (wireframeRef.current) {
      const s = 1.05 + Math.sin(time * 8) * 0.02;
      wireframeRef.current.scale.set(s, s, s);
      const mat = wireframeRef.current.material as any;
      if (mat) mat.opacity = 0.2 + Math.sin(time * 20) * 0.1;
    }
  });

  return { groupRef, wireframeRef };
};

export const HammerModel = ({ hovered, color = "#3b82f6" }: { hovered: boolean, color?: string }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { groupRef, wireframeRef } = useHologramAnimation(hovered, isClicked);
  
  const handleClick = (e: any) => {
    e.stopPropagation();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (hovered || isClicked) {
         groupRef.current.rotation.y += delta * 2;
         groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.PI / 4, 0.1);
      } else {
         groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
         groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]} onClick={handleClick}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Cylinder args={[0.08, 0.12, 1.8, 16]} position={[0, -0.4, 0]}>
          <meshStandardMaterial color="#475569" roughness={0.7} metalness={0.2} transparent opacity={0.4} />
        </Cylinder>
        <Box args={[1.0, 0.35, 0.35]} position={[0, 0.6, 0]}>
          <MeshTransmissionMaterial color={color} thickness={1} transmission={0.9} ior={1.4} />
        </Box>
        <Box args={[1.02, 0.37, 0.37]} position={[0, 0.6, 0]} ref={wireframeRef}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
        </Box>
      </Float>
    </group>
  );
};

export const WrenchModel = ({ hovered, color = "#10b981" }: { hovered: boolean, color?: string }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { groupRef, wireframeRef } = useHologramAnimation(hovered, isClicked);
  
  const handleClick = (e: any) => {
    e.stopPropagation();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (hovered || isClicked) {
         groupRef.current.rotation.z += delta * 2;
      } else {
         groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
         groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.PI / 6, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 2, 0, Math.PI / 6]} onClick={handleClick}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
        <Box args={[0.2, 1.6, 0.05]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#64748b" transparent opacity={0.4} />
        </Box>
        <Torus args={[0.22, 0.08, 8, 16, Math.PI * 1.5]} position={[0, 0.9, 0]}>
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} ior={1.3} />
        </Torus>
        <Torus args={[0.24, 0.09, 16, 32, Math.PI * 1.5]} position={[0, 0.9, 0]} ref={wireframeRef}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
        </Torus>
        <Torus args={[0.18, 0.08, 16, 32, Math.PI * 1.5]} position={[0, -0.9, 0]} rotation={[0, 0, Math.PI]}>
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} ior={1.3} />
        </Torus>
      </Float>
    </group>
  );
};

export const ScrewdriverModel = ({ hovered, color = "#f59e0b" }: { hovered: boolean, color?: string }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { groupRef, wireframeRef } = useHologramAnimation(hovered, isClicked);
  
  const handleClick = (e: any) => {
    e.stopPropagation();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (hovered || isClicked) {
         groupRef.current.rotation.x += delta * 3;
      } else {
         groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -Math.PI / 4, 0.1);
         groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.PI / 4, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[-Math.PI / 4, 0, Math.PI / 4]} onClick={handleClick}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Cylinder args={[0.15, 0.12, 0.8, 8]} position={[0, -0.6, 0]}>
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} ior={1.4} />
        </Cylinder>
        <Cylinder args={[0.16, 0.13, 0.8, 8]} position={[0, -0.6, 0]} ref={wireframeRef}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
        </Cylinder>
        <Cylinder args={[0.04, 0.04, 1.2, 16]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#cbd5e1" transparent opacity={0.4} />
        </Cylinder>
        <Cone args={[0.04, 0.1, 4]} position={[0, 1.05, 0]}>
          <meshStandardMaterial color="#94a3b8" transparent opacity={0.4} />
        </Cone>
      </Float>
    </group>
  );
};

export const GearModel = ({ hovered, color = "#8b5cf6" }: { hovered: boolean, color?: string }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { groupRef, wireframeRef } = useHologramAnimation(hovered, isClicked);
  
  const handleClick = (e: any) => {
    e.stopPropagation();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (hovered || isClicked) {
         groupRef.current.rotation.z += delta * (isClicked ? 4 : 1.5);
         groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.PI / 3, 0.05);
      } else {
         groupRef.current.rotation.z += delta * 0.2;
         groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.PI / 8, 0.05);
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 8, 0, 0]} onClick={handleClick}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Cylinder args={[0.6, 0.6, 0.15, 16]} rotation={[Math.PI / 2, 0, 0]}>
          <MeshTransmissionMaterial color={color} thickness={0.5} transmission={0.9} ior={1.3} />
        </Cylinder>
        <Cylinder args={[0.61, 0.61, 0.16, 16]} rotation={[Math.PI / 2, 0, 0]} ref={wireframeRef}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
        </Cylinder>
        <Cylinder args={[0.3, 0.3, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#000000" transparent opacity={0.6} />
        </Cylinder>
        {[...Array(8)].map((_, i) => (
          <Box 
            key={i} 
            args={[0.2, 0.2, 0.15]} 
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 0.65, 
              Math.sin((i / 8) * Math.PI * 2) * 0.65, 
              0
            ]}
            rotation={[0, 0, (i / 8) * Math.PI * 2]}
          >
            <meshStandardMaterial color={color} transparent opacity={0.6} />
          </Box>
        ))}
      </Float>
    </group>
  );
};
