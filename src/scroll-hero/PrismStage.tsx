import { useRef, MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useTriangularPrismGeometry } from './PrismGeometry';

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * The Δ prism protagonist + lighting + camera choreography.
 * Emissive solid prism — glows cyan like a brand light source against
 * deep-space backdrop. Halo sphere fakes bloom without postprocessing.
 */
function PrismScene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const prismRef = useRef<THREE.Mesh>(null!);
  const haloRef = useRef<THREE.Mesh>(null!);
  const haloInnerRef = useRef<THREE.Mesh>(null!);
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const geometry = useTriangularPrismGeometry(2.0, 0.7);

  useFrame((state) => {
    const t = progressRef.current;

    // Phase A: approach (t 0 → 0.45) — easeInOutCubic
    // Phase B: bank past camera (t 0.45 → 0.70) — easeOutQuart
    const ta = Math.min(1, t / 0.45);
    const tb = t > 0.45 ? Math.min(1, (t - 0.45) / 0.25) : 0;
    const eA = easeInOutCubic(ta);
    const eB = easeOutQuart(tb);

    // Prism position — starts at z=-14 (closer than before so it reads immediately),
    // grows in dramatically, then sweeps upper-right
    const px = -0.6 + eA * 0.4 + eB * 9.0;
    const py = -0.3 + eA * 0.6 + eB * 3.4;
    const pz = -14 + eA * 11.5 + eB * 10;

    // Rotation — slow drift in A so the triangle face presents toward camera,
    // then dramatic bank in B as it exits
    const rotX = -0.05 + eA * 0.1 + eB * -1.0;
    const rotY = -0.15 + state.clock.elapsedTime * 0.12 + eA * 0.3 + eB * 1.4;
    const rotZ = eA * 0.08 + eB * 0.6;

    // Scale ramps from 0.7 → 1.6 through phase A so the dramatic frame is FILLED
    const s = 0.7 + eA * 0.9 + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;

    const prism = prismRef.current;
    if (prism) {
      prism.position.set(px, py, pz);
      prism.rotation.set(rotX, rotY, rotZ);
      prism.scale.setScalar(s);

      // Pulse emissive intensity slightly so the prism feels alive
      const mat = prism.material as THREE.MeshStandardMaterial;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.08;
      mat.emissiveIntensity = (2.2 + eA * 1.1) * pulse;
    }

    // Halo follows the prism with a slight scale boost — fakes bloom
    const halo = haloRef.current;
    if (halo) {
      halo.position.set(px, py, pz);
      halo.scale.setScalar(s * 2.6);
      const haloMat = halo.material as THREE.MeshBasicMaterial;
      haloMat.opacity = 0.18 + eA * 0.12 - eB * 0.2;
    }
    const haloInner = haloInnerRef.current;
    if (haloInner) {
      haloInner.position.set(px, py, pz);
      haloInner.scale.setScalar(s * 1.55);
      const m = haloInner.material as THREE.MeshBasicMaterial;
      m.opacity = 0.32 + eA * 0.18 - eB * 0.3;
    }

    // Camera does a subtle parallax pull
    state.camera.position.z = 4.5 + eA * -1.0;
    state.camera.position.y = eA * 0.3;
    cameraTargetRef.current.set(px * 0.2, py * 0.2, pz * 0.3);
    state.camera.lookAt(cameraTargetRef.current);
  });

  return (
    <>
      {/* Soft ambient + cyan key light from front-left */}
      <ambientLight intensity={0.15} color="#1a2540" />
      <hemisphereLight intensity={0.25} color="#4facfe" groundColor="#020617" />
      <pointLight position={[-5, 3, 4]} intensity={2.2} color="#4facfe" distance={22} decay={2} />
      <pointLight position={[6, -2, 3]} intensity={1.6} color="#00f2fe" distance={20} decay={2} />
      <pointLight position={[0, 8, -10]} intensity={3.0} color="#7dd3fc" distance={30} decay={2} />

      {/* Dense starfield — present from the first frame */}
      <Stars
        radius={120}
        depth={80}
        count={4500}
        factor={4.5}
        saturation={0.5}
        fade
        speed={0.5}
      />

      {/* Floating dust motes — cosmic atmosphere */}
      <Sparkles
        count={120}
        scale={[24, 14, 24]}
        position={[0, 0, -8]}
        size={3.5}
        speed={0.25}
        color="#9dd4ff"
        opacity={0.6}
      />
      <Sparkles
        count={60}
        scale={[16, 8, 16]}
        position={[0, 0, -2]}
        size={5}
        speed={0.15}
        color="#4facfe"
        opacity={0.4}
      />

      {/* Halo sphere — fakes outer bloom around the prism */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#4facfe"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Inner halo — tighter, brighter */}
      <mesh ref={haloInnerRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#7dd3fc"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* The protagonist — Δ prism with emissive cyan glow */}
      <mesh ref={prismRef} geometry={geometry}>
        <meshStandardMaterial
          color="#0a1a3a"
          emissive="#4facfe"
          emissiveIntensity={2.5}
          metalness={0.6}
          roughness={0.18}
        />
      </mesh>

      {/* Distant nebula color washes */}
      <mesh position={[-14, 4, -45]} rotation={[0, 0, 0.4]}>
        <planeGeometry args={[50, 30]} />
        <meshBasicMaterial
          color="#1e3a8a"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[16, -8, -55]} rotation={[0, 0, -0.3]}>
        <planeGeometry args={[40, 26]} />
        <meshBasicMaterial
          color="#0891b2"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 10, -65]}>
        <planeGeometry args={[70, 30]} />
        <meshBasicMaterial
          color="#3b0764"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
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
      camera={{ position: [0, 0, 4.5], fov: 45, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <fog attach="fog" args={['#020617', 22, 75]} />
      <PrismScene progressRef={progressRef} />
    </Canvas>
  );
}
