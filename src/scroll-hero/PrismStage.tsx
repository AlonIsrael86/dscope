import { useRef, useEffect, MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTriangularPrismGeometry } from './PrismGeometry';

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * The Δ prism protagonist + lighting + camera choreography.
 * Reads scroll progress from a shared ref so the parent (PrismHeroPage)
 * can also drive the counter-balance card from the same value.
 */
function PrismScene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const prismRef = useRef<THREE.Mesh>(null!);
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const geometry = useTriangularPrismGeometry(1.6, 0.55);

  useFrame((state) => {
    const t = progressRef.current;

    // Phase A: approach (t 0 → 0.45) — easeInOutCubic
    // Phase B: bank past camera (t 0.45 → 0.70) — easeOutQuart
    const ta = Math.min(1, t / 0.45);
    const tb = t > 0.45 ? Math.min(1, (t - 0.45) / 0.25) : 0;
    const eA = easeInOutCubic(ta);
    const eB = easeOutQuart(tb);

    // Prism position: starts deep at z=-22, grows in, then sweeps upper-right
    const px = -1.8 + eA * 1.2 + eB * 8.5;
    const py = -0.4 + eA * 0.7 + eB * 3.0;
    const pz = -22 + eA * 18 + eB * 12;

    // Rotation: slow drift in A, dramatic bank in B
    const rotX = -0.15 + eA * 0.15 + eB * -0.9;
    const rotY = state.clock.elapsedTime * 0.18 + eA * 0.4 + eB * 1.3;
    const rotZ = eA * 0.1 + eB * 0.55;

    const prism = prismRef.current;
    if (prism) {
      prism.position.set(px, py, pz);
      prism.rotation.set(rotX, rotY, rotZ);
      // Scale grows slightly through phase A so the dramatic moment fills more frame
      const s = 0.85 + eA * 0.55;
      prism.scale.setScalar(s);
    }

    // Camera does a subtle parallax pull — fixed FOV, slight z drift
    state.camera.position.z = 4 + eA * -0.8;
    state.camera.position.y = eA * 0.25;
    cameraTargetRef.current.set(px * 0.15, py * 0.15, pz * 0.3);
    state.camera.lookAt(cameraTargetRef.current);
  });

  return (
    <>
      {/* Lighting — neutral white key + cyan rim for refraction tint */}
      <ambientLight intensity={0.25} color="#ffffff" />
      <hemisphereLight intensity={0.35} color="#cfe4ff" groundColor="#02050d" />
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.6}
        color="#ffffff"
      />
      {/* Cyan rim light — gives the prism its dscope-accent glow */}
      <pointLight position={[-6, 2, 4]} intensity={4.5} color="#4facfe" distance={20} decay={2} />
      <pointLight position={[8, -3, 6]} intensity={2.8} color="#00f2fe" distance={18} decay={2} />

      {/* Starfield — replaces clouds from the original travel-version */}
      <Stars
        radius={80}
        depth={60}
        count={1800}
        factor={3}
        saturation={0.4}
        fade
        speed={0.4}
      />

      {/* Studio IBL for clean transmission caustics */}
      <Environment preset="city" background={false} environmentIntensity={0.6} />

      {/* The protagonist — Δ prism */}
      <mesh ref={prismRef} geometry={geometry} castShadow>
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.5}
          thickness={1.2}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.4}
          distortion={0.15}
          distortionScale={0.4}
          temporalDistortion={0.1}
          roughness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.05}
          attenuationColor="#4facfe"
          attenuationDistance={1.8}
          color="#ffffff"
          resolution={512}
        />
      </mesh>

      {/* A faint companion plane of nebula-tinted dust behind the prism for parallax */}
      <mesh position={[0, 0, -40]} rotation={[0, 0, 0.2]}>
        <planeGeometry args={[80, 50]} />
        <meshBasicMaterial color="#0a1530" transparent opacity={0.35} />
      </mesh>
      <mesh position={[12, -6, -55]} rotation={[0, 0, -0.4]}>
        <planeGeometry args={[40, 28]} />
        <meshBasicMaterial color="#1a2348" transparent opacity={0.28} />
      </mesh>
    </>
  );
}

export function PrismStage({
  progressRef,
}: {
  progressRef: MutableRefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 42, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <fog attach="fog" args={['#020617', 18, 70]} />
      <PrismScene progressRef={progressRef} />
    </Canvas>
  );
}
