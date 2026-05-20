import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const BrandLattice = ({ color = "#3b82f6" }: { color?: string }) => {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Generate a lattice of small spheres and connecting lines
  const { positions, connections } = useMemo(() => {
    const points = [];
    const size = 1.2;
    const count = 12;
    
    // Create points of a dodecahedron-like structure or abstract cluster
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      points.push(new THREE.Vector3(
        size * Math.cos(theta) * Math.sin(phi),
        size * Math.sin(theta) * Math.sin(phi),
        size * Math.cos(phi)
      ));
    }
    
    // Create connections between close points
    const lines = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (points[i].distanceTo(points[j]) < 1.5) {
          lines.push([points[i], points[j]]);
        }
      }
    }
    
    return { positions: points, connections: lines };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.z = time * 0.1;
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(time * 2) * 0.05;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Central Core */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.5, 0]} />
          <MeshTransmissionMaterial 
            color={color} 
            thickness={1} 
            transmission={0.8} 
            ior={1.2} 
            chromaticAberration={0.5}
            anisotropy={0.3}
          />
        </mesh>
        
        {/* Nodes */}
        {positions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={2} speed={2} distort={0.4} />
          </mesh>
        ))}
        
        {/* Connections (Lines) */}
        {connections.map(([p1, p2], i) => {
          const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
          const distance = p1.distanceTo(p2);
          const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
          const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
          
          return (
            <mesh key={i} position={midPoint} quaternion={quaternion}>
              <cylinderGeometry args={[0.015, 0.015, distance, 8]} />
              <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>
          );
        })}
        
        {/* Outer Orbitals */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.8, 0.01, 16, 100]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.0, 0.005, 16, 100]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  );
};

export const BrandCrystalline = ({ color = "#a855f7" }: { color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      meshRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial 
          color={color} 
          thickness={2} 
          transmission={0.9} 
          ior={1.5} 
          chromaticAberration={1}
          roughness={0.1}
        />
        <mesh scale={1.05}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
        </mesh>
      </mesh>
    </Float>
  );
};

export const BrandOculus = ({ color = "#ec4899" }: { color?: string }) => {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = time * 0.4;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.8;
      const s = 0.8 + Math.sin(time * 4) * 0.1;
      innerRef.current.scale.set(s, s, s);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 1.2;
    }
  });

  return (
    <group ref={outerRef}>
      <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Core Eye */}
        <mesh ref={innerRef}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <MeshDistortMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={2} 
            metalness={0.9} 
            roughness={0.1} 
          speed={2} distort={0.4} />
        </mesh>
        
        {/* Translucent Shell */}
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <MeshTransmissionMaterial 
            color={color} 
            transmission={0.95} 
            thickness={1} 
            ior={1.3} 
          />
        </mesh>

        {/* Orbiting Elements */}
        <group ref={ringRef}>
          {[...Array(8)].map((_, i) => (
            <mesh key={i} position={[Math.cos((i / 8) * Math.PI * 2) * 1.2, Math.sin((i / 8) * Math.PI * 2) * 1.2, 0]}>
              <sphereGeometry args={[0.07, 32, 32]} />
              <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={5} speed={2} distort={0.4} />
            </mesh>
          ))}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.2, 0.015, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.4} />
          </mesh>
        </group>

        {/* Vertical Scanline */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[1.5, 0.005, 16, 100]} />
          <meshBasicMaterial color="#fff" transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
};
