import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const BrandLattice = ({ color = "#3b82f6" }: { color?: string }) => {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Generate a lattice of small spheres and connecting lines
  const { positions, connectionData } = useMemo(() => {
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
    
    // Create connections and their transforms
    const connections = [];
    const tempDir = new THREE.Vector3();
    const tempQuat = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const p1 = points[i];
        const p2 = points[j];
        const dist = p1.distanceTo(p2);
        
        if (dist < 1.5) {
          const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
          tempDir.subVectors(p2, p1).normalize();
          tempQuat.setFromUnitVectors(up, tempDir);
          
          connections.push({
            position: midPoint,
            quaternion: tempQuat.clone(),
            distance: dist
          });
        }
      }
    }
    
    return { positions: points, connectionData: connections };
  }, []);

  // Shared Geometries and Materials - Memoized for performance
  const sphereGeom = useMemo(() => new THREE.SphereGeometry(0.08, 12, 12), []);
  const cylinderGeom = useMemo(() => new THREE.CylinderGeometry(0.012, 0.012, 1, 6), []);
  const torusGeom1 = useMemo(() => new THREE.TorusGeometry(1.8, 0.008, 8, 64), []);
  const torusGeom2 = useMemo(() => new THREE.TorusGeometry(2.0, 0.004, 8, 64), []);

  // Performance-aware frame updates
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const t1 = time * 0.15;
    const t2 = time * 0.08;
    const t3 = time * 1.5;
    
    if (meshRef.current) {
      meshRef.current.rotation.y = t1;
      meshRef.current.rotation.z = t2;
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(t3) * 0.03;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        {/* Central Core */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.5, 0]} />
          <MeshTransmissionMaterial 
            color={color} 
            thickness={1} 
            transmission={0.8} 
            ior={1.2} 
            chromaticAberration={0.3}
            anisotropy={0.2}
            roughness={0.1}
          />
        </mesh>
        
        {/* Nodes */}
        {positions.map((pos, i) => (
          <mesh key={i} position={pos} geometry={sphereGeom}>
            <MeshDistortMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={1.5} 
              speed={1.5} 
              distort={0.3} 
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
        
        {/* Connections (Lines) */}
        {connectionData.map((data, i) => (
          <mesh 
            key={i} 
            position={data.position} 
            quaternion={data.quaternion} 
            scale={[1, data.distance, 1]}
            geometry={cylinderGeom}
          >
            <meshBasicMaterial color={color} transparent opacity={0.25} />
          </mesh>
        ))}
        
        {/* Outer Orbitals */}
        <mesh rotation={[Math.PI / 4, 0, 0]} geometry={torusGeom1}>
          <meshBasicMaterial color={color} transparent opacity={0.08} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]} geometry={torusGeom2}>
          <meshBasicMaterial color={color} transparent opacity={0.08} />
        </mesh>
      </Float>
    </group>
  );
};

export const BrandCrystalline = ({ color = "#a855f7" }: { color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.15;
      meshRef.current.rotation.y = time * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geom}>
        <MeshTransmissionMaterial 
          color={color} 
          thickness={2} 
          transmission={0.9} 
          ior={1.4} 
          chromaticAberration={0.8}
          roughness={0.05}
        />
        <mesh scale={1.05} geometry={geom}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.05} />
        </mesh>
      </mesh>
    </Float>
  );
};

export const BrandOculus = ({ color = "#ec4899" }: { color?: string }) => {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  const sphereGeom = useMemo(() => new THREE.SphereGeometry(0.4, 24, 24), []);
  const orbitalGeom = useMemo(() => new THREE.SphereGeometry(0.06, 16, 16), []);
  const shellGeom = useMemo(() => new THREE.SphereGeometry(0.7, 24, 24), []);
  const ringGeom = useMemo(() => new THREE.TorusGeometry(1.2, 0.012, 12, 80), []);
  const scanGeom = useMemo(() => new THREE.TorusGeometry(1.5, 0.004, 8, 80), []);

  const orbitalPositions = useMemo(() => {
    return [...Array(8)].map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      return [Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0] as [number, number, number];
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = time * 0.3;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.6;
      const s = 0.8 + Math.sin(time * 3) * 0.08;
      innerRef.current.scale.set(s, s, s);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.8;
    }
  });

  return (
    <group ref={outerRef}>
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.3}>
        {/* Core Eye */}
        <mesh ref={innerRef} geometry={sphereGeom}>
          <MeshDistortMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={1.5} 
            metalness={0.9} 
            roughness={0.1} 
            speed={1.5} 
            distort={0.3} 
          />
        </mesh>
        
        {/* Translucent Shell */}
        <mesh geometry={shellGeom}>
          <MeshTransmissionMaterial 
            color={color} 
            transmission={0.95} 
            thickness={1} 
            ior={1.3} 
            roughness={0.05}
          />
        </mesh>

        {/* Orbiting Elements */}
        <group ref={ringRef}>
          {orbitalPositions.map((pos, i) => (
            <mesh key={i} position={pos} geometry={orbitalGeom}>
              <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={3} speed={1.5} distort={0.3} />
            </mesh>
          ))}
          <mesh rotation={[Math.PI / 2, 0, 0]} geometry={ringGeom}>
            <meshBasicMaterial color={color} transparent opacity={0.3} />
          </mesh>
        </group>

        {/* Vertical Scanline */}
        <mesh rotation={[0, 0, 0]} geometry={scanGeom}>
          <meshBasicMaterial color="#fff" transparent opacity={0.15} />
        </mesh>
      </Float>
    </group>
  );
};
