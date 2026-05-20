import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const BasaltSpires = ({ hovered, color = "#262626" }: { hovered: boolean, color?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  const spires = useMemo(() => {
    return [...Array(7)].map((_, i) => ({
      height: 1.5 + Math.random() * 2,
      delay: Math.random() * 2,
      position: [
        Math.cos((i / 7) * Math.PI * 2) * 0.5,
        0,
        Math.sin((i / 7) * Math.PI * 2) * 0.5
      ] as [number, number, number],
      rotation: [0, (i / 7) * Math.PI * 2, 0] as [number, number, number]
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      if (hovered) {
        groupRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {spires.map((s, i) => (
        <mesh key={i} position={s.position} rotation={s.rotation}>
          <cylinderGeometry args={[0.2, 0.25, s.height, 6]} />
          <MeshDistortMaterial 
            color={color} 
            roughness={0.9} 
            metalness={0.1} 
            flatShading
          speed={2} distort={0.4} />
        </mesh>
      ))}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.8, 1, 0.2, 8]} />
        <MeshDistortMaterial color="#171717" roughness={1} speed={2} distort={0.4} />
      </mesh>
    </group>
  );
};

export const XylemCore = ({ hovered, color = "#84cc16" }: { hovered: boolean, color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      if (hovered) {
        meshRef.current.rotation.y += 0.02;
      } else {
        meshRef.current.rotation.y += 0.005;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.8, 0.3, 64, 8]} />
        <MeshWobbleMaterial 
          color={color} 
          speed={hovered ? 2 : 1} 
          factor={0.4} 
        />
        {/* Inner glowing core */}
        <mesh scale={0.8}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <MeshDistortMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 2 : 1} 
            transparent 
            opacity={0.6} 
          speed={2} distort={0.4} />
        </mesh>
      </mesh>
    </Float>
  );
};

export const AmethystCluster = ({ hovered, color = "#a855f7" }: { hovered: boolean, color?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  const crystals = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      height: 0.6 + Math.random() * 0.8,
      radius: 0.1 + Math.random() * 0.15,
      position: [
        (Math.random() - 0.5) * 0.8,
        0,
        (Math.random() - 0.5) * 0.8
      ] as [number, number, number],
      rotation: [
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4
      ] as [number, number, number],
      scale: 0.8 + Math.random() * 0.4
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      if (hovered) {
        groupRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {crystals.map((c, i) => (
        <group key={i} position={c.position} rotation={c.rotation} scale={c.scale}>
          <mesh>
            <cylinderGeometry args={[0, c.radius, c.height, 6]} />
            <MeshDistortMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={hovered ? 1.5 : 0.5} 
              transparent 
              opacity={0.8}
              roughness={0.1}
              metalness={0.8}
            speed={2} distort={0.4} />
          </mesh>
          <mesh position={[0, c.height / 2, 0]}>
            <sphereGeometry args={[c.radius * 0.2, 8, 8]} />
            <MeshDistortMaterial color="#fff" emissive="#fff" emissiveIntensity={2} speed={2} distort={0.4} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.80, 32, 32]} />
        <MeshDistortMaterial color="#262626" roughness={1} speed={2} distort={0.4} />
      </mesh>
    </group>
  );
};
