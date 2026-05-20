import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

const SwallowtailBase = ({ hovered, mainColor, wireframe = false, geometryType = 'planes', wobble = false }: { hovered: boolean, mainColor: string, wireframe?: boolean, geometryType?: 'planes' | 'particles' | 'crystals', wobble?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
        // Flapping animation
        const flapSpeed = hovered ? 15 : 5;
        const angle = Math.sin(time * flapSpeed) * 0.4;
        
        groupRef.current.children.forEach((child, index) => {
           if (child.name === 'wing_left') {
               child.rotation.z = angle;
           } else if (child.name === 'wing_right') {
               child.rotation.z = -angle;
           }
        });

        // Hover movement
        groupRef.current.position.y = Math.sin(time * 2) * 0.1;
        if (hovered) {
             groupRef.current.rotation.y = time * 0.5;
        } else {
             groupRef.current.rotation.y = Math.sin(time) * 0.2;
        }
    }
  });

  // A swallowtail has forewings and hindwings with tails. We can build it from abstract shapes
  const wingShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    // Forewing
    shape.bezierCurveTo(0.5, 0.5, 1.2, 0.8, 1.5, 0.5);
    shape.bezierCurveTo(1.6, 0.2, 1.4, -0.4, 0.8, -0.5);
    // Hindwing
    shape.bezierCurveTo(0.6, -1.0, 0.8, -1.8, 0.6, -2.0); // The tail
    shape.bezierCurveTo(0.4, -1.8, 0.3, -1.0, 0.1, -0.7);
    shape.bezierCurveTo(0, -0.6, 0, -0.2, 0, 0);
    return shape;
  }, []);

  const extrudeSettings = { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 };

  return (
    <group ref={groupRef} scale={hovered ? 1.2 : 1.0}>
       <mesh name="body" rotation={[Math.PI / 2, 0, 0]}>
         <capsuleGeometry args={[0.08, 1.5, 8, 16]} />
         <meshStandardMaterial color="#1f2937" roughness={0.8} />
       </mesh>
       <group name="wing_left" position={[-0.1, 0, 0]}>
          <mesh rotation={[0, 0, 0]} position={[0,0.5,0]}>
            <extrudeGeometry args={[wingShape, extrudeSettings]} />
            {wobble ? (
                <MeshWobbleMaterial factor={1} speed={2} color={mainColor} wireframe={wireframe} transparent opacity={0.8} roughness={0.2} metalness={0.8} />
            ) : (
                <MeshDistortMaterial speed={2} distort={0.2} color={mainColor} wireframe={wireframe} transparent opacity={0.8} roughness={0.2} metalness={0.8} />
            )}
          </mesh>
       </group>
       <group name="wing_right" position={[0.1, 0, 0]}>
          {/* We mirror the shape by scaling X by -1 */}
          <mesh rotation={[0, 0, 0]} position={[0,0.5,0]} scale={[-1, 1, 1]}>
            <extrudeGeometry args={[wingShape, extrudeSettings]} />
            {wobble ? (
                <MeshWobbleMaterial factor={1} speed={2} color={mainColor} wireframe={wireframe} transparent opacity={0.8} roughness={0.2} metalness={0.8} />
            ) : (
                <MeshDistortMaterial speed={2} distort={0.2} color={mainColor} wireframe={wireframe} transparent opacity={0.8} roughness={0.2} metalness={0.8} />
            )}
          </mesh>
       </group>
    </group>
  );
};

export const SwallowtailV1 = ({ hovered }: { hovered: boolean }) => <SwallowtailBase hovered={hovered} mainColor="#3b82f6" />;
export const SwallowtailV2 = ({ hovered }: { hovered: boolean }) => <SwallowtailBase hovered={hovered} mainColor="#10b981" wireframe={true} />;
export const SwallowtailV3 = ({ hovered }: { hovered: boolean }) => <SwallowtailBase hovered={hovered} mainColor="#eab308" wobble={true} />;
export const SwallowtailV4 = ({ hovered }: { hovered: boolean }) => <SwallowtailBase hovered={hovered} mainColor="#a855f7" wireframe={true} wobble={true} />;
export const SwallowtailV5 = ({ hovered }: { hovered: boolean }) => <SwallowtailBase hovered={hovered} mainColor="#f43f5e" />;
export const SwallowtailV6 = ({ hovered }: { hovered: boolean }) => <SwallowtailBase hovered={hovered} mainColor="#06b6d4" wireframe={true} />;
export const SwallowtailV7 = ({ hovered }: { hovered: boolean }) => <SwallowtailBase hovered={hovered} mainColor="#f97316" wobble={true} />;
export const SwallowtailV8 = ({ hovered }: { hovered: boolean }) => <SwallowtailBase hovered={hovered} mainColor="#ec4899" wireframe={true} wobble={true} />;
export const SwallowtailV9 = ({ hovered }: { hovered: boolean }) => <SwallowtailBase hovered={hovered} mainColor="#8b5cf6" />;
export const SwallowtailV10 = ({ hovered }: { hovered: boolean }) => <SwallowtailBase hovered={hovered} mainColor="#14b8a6" wireframe={true} wobble={true} />;
