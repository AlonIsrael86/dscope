import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

export const SPACE_ANIMALS_3D = [
  { id: 'wolf', name: 'Cyber Wolf', desc: 'Apex data routing.' },
  { id: 'owl', name: 'Stellar Owl', desc: 'Omnidirectional surveillance.' },
  { id: 'panther', name: 'Void Panther', desc: 'Stealth protocol execution.' },
  { id: 'mantis', name: 'Zenith Mantis', desc: 'Precision algorithm slices.' },
  { id: 'dragonfly', name: 'Nebula Dragonfly', desc: 'Rapid vector shifts.' },
  { id: 'beetle', name: 'Cosmic Beetle', desc: 'Armored data vault.' },
  { id: 'butterfly', name: 'Solar Butterfly', desc: 'Self-healing architectures.' },
  { id: 'dolphin', name: 'Pulsar Dolphin', desc: 'Deep latency sonar.' },
  { id: 'eagle', name: 'Comet Eagle', desc: 'High-altitude cloud vectors.' },
  { id: 'spider', name: 'Dark Matter Spider', desc: 'Vast network branching.' }
];

const BodyMaterial = ({ color }: { color: string }) => (
  <meshBasicMaterial 
    color={color} 
    wireframe={true} 
    transparent 
    opacity={0.8} 
  />
);

const WolfModel = ({ color, hovered }: any) => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, hovered ? state.clock.elapsedTime * 0.5 : 0, 0.1);
      group.current.position.y = hovered ? Math.sin(state.clock.elapsedTime * 2) * 0.2 : 0;
    }
  });

  return (
    <group ref={group} scale={0.8}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 6]} />
        <BodyMaterial color={color} />
      </mesh>
      <mesh position={[0.6, 0.8, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <coneGeometry args={[0.4, 1, 4]} />
        <BodyMaterial color={color} />
      </mesh>
      {/* Ears */}
      <mesh position={[0.4, 1.2, 0.2]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.1, 0.4, 3]} />
        <meshBasicMaterial color={color} wireframe={true} />
      </mesh>
      <mesh position={[0.4, 1.2, -0.2]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.1, 0.4, 3]} />
        <meshBasicMaterial color={color} wireframe={true} />
      </mesh>
    </group>
  );
};

const OwlModel = ({ color, hovered }: any) => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = hovered ? Math.sin(state.clock.elapsedTime * 3) * 0.5 : 0;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.7, 1]} />
        <BodyMaterial color={color} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.3, 0.2, 0.3]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 6]} />
        <meshBasicMaterial color={color} wireframe={true} />
      </mesh>
      <mesh position={[0.3, 0.2, -0.3]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 6]} />
        <meshBasicMaterial color={color} wireframe={true} />
      </mesh>
    </group>
  );
};

const ButterflyModel = ({ color, hovered }: any) => {
  const wings = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (wings.current) {
      const speed = hovered ? 20 : 2;
      wings.current.children[0].rotation.z = Math.sin(state.clock.elapsedTime * speed) * 0.5 + 0.5;
      wings.current.children[1].rotation.z = -Math.sin(state.clock.elapsedTime * speed) * 0.5 - 0.5;
    }
  });

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 4]} />
        <meshBasicMaterial color={color} wireframe={true} />
      </mesh>
      <group ref={wings}>
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, 0.5]}>
          <planeGeometry args={[1.5, 1.5, 2, 2]} />
          <BodyMaterial color={color} />
        </mesh>
        <mesh position={[-0.1, 0, 0]} rotation={[0, 0, -0.5]}>
          <planeGeometry args={[1.5, 1.5, 2, 2]} />
          <BodyMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
};

const DefaultModel = ({ color, hovered }: any) => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.5;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3;
      mesh.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, 1]} />
      <BodyMaterial color={color} />
    </mesh>
  );
};

export const RealisticAnimals3D = ({ typeIndex, color = "#3b82f6", hovered }: { typeIndex: number, color?: string, hovered: boolean }) => {
  const animal = SPACE_ANIMALS_3D[typeIndex % SPACE_ANIMALS_3D.length];

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {animal.id === 'wolf' && <WolfModel color={color} hovered={hovered} />}
        {animal.id === 'owl' && <OwlModel color={color} hovered={hovered} />}
        {animal.id === 'butterfly' && <ButterflyModel color={color} hovered={hovered} />}
        {['panther', 'mantis', 'dragonfly', 'beetle', 'dolphin', 'eagle', 'spider'].includes(animal.id) && (
          <DefaultModel color={color} hovered={hovered} />
        )}
      </Float>
      <Environment preset="studio" />
    </group>
  );
};
