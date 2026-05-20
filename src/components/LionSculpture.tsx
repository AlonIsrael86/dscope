import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export const LionSculpture = () => {
  const group = useRef<Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={group} scale={1.2} position={[0, -1, 0]}>
      {/* Body */}
      <mesh position={[0, 1.5, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.6, 2.5, 6]} />
        <meshBasicMaterial color="#3b82f6" wireframe={true} />
      </mesh>

      {/* Mane / Head Area */}
      <mesh position={[0, 2, 0.5]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#10b981" wireframe={true} />
      </mesh>

      {/* Snout */}
      <mesh position={[0, 2, 1.2]} rotation={[Math.PI / 4, 0, 0]}>
        <coneGeometry args={[0.5, 0.8, 4]} />
        <meshBasicMaterial color="#3b82f6" wireframe={true} />
      </mesh>

      {/* Front Legs */}
      <mesh position={[-0.4, 0.8, 0.5]}>
        <cylinderGeometry args={[0.2, 0.15, 1.5, 4]} />
        <meshBasicMaterial color="#10b981" wireframe={true} />
      </mesh>
      <mesh position={[0.4, 0.8, 0.5]}>
        <cylinderGeometry args={[0.2, 0.15, 1.5, 4]} />
        <meshBasicMaterial color="#10b981" wireframe={true} />
      </mesh>

      {/* Back Legs */}
      <mesh position={[-0.4, 0.8, -1.5]}>
        <cylinderGeometry args={[0.2, 0.15, 1.5, 4]} />
        <meshBasicMaterial color="#3b82f6" wireframe={true} />
      </mesh>
      <mesh position={[0.4, 0.8, -1.5]}>
        <cylinderGeometry args={[0.2, 0.15, 1.5, 4]} />
        <meshBasicMaterial color="#3b82f6" wireframe={true} />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 1.8, -2.2]} rotation={[-Math.PI / 3, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 4]} />
        <meshBasicMaterial color="#10b981" wireframe={true} />
      </mesh>
    </group>
  );
};
