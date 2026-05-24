/**
 * MonolithStage
 * --------------
 * Scroll-driven 3D hero punctuation between dscope home Hero and IndustryAutomation.
 * Pattern: jit-scroll-3d-hero (see ~/.claude/skills/jit-scroll-3d-hero/SKILL.md)
 * Re-themed for dscope per "re-theme, do not re-skin" rule:
 *   - Protagonist: procedural metallic monolith (Kubrick 2001 reference, recognizable silhouette)
 *   - Backdrop: dscope cosmic #020617 (already site bg)
 *   - Edge glow: cyan #4facfe (dscope lead accent)
 *   - Bloom: real @react-three/postprocessing <Bloom> against dark backdrop
 *   - Counter-balance: headline overlay (not card - this is a transition, not a tool surface)
 *
 * Performance gates for the already-heavy dscope home:
 *   - frameloop="demand" - only renders when scrolling (idle = 0 GPU cost)
 *   - dpr capped at 1.5
 *   - Single Bloom pass, no chromatic aberration / vignette / film
 *   - One mesh + one edge mesh + one starfield (no clouds)
 *   - InViewGate wraps the section at consumer site
 */
"use client";
import React, { useRef, useEffect, useState, Suspense } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const easeInQuad = (t: number) => t * t;

/**
 * The monolith itself: brushed metal slab + emissive cyan edge frame.
 * Edge frame uses a slightly larger box with additive blending so the seam
 * reads as a luminous outline. Bloom postprocessing turns that outline into
 * a cinematic halo against the dark cosmic backdrop.
 */
const Monolith: React.FC<{ progressRef: React.MutableRefObject<number>; isMobile: boolean }> = ({
  progressRef,
  isMobile,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const edgeRef = useRef<THREE.Mesh>(null);
  const slabRef = useRef<THREE.Mesh>(null);

  // Monolith dimensions (1 : 4 : 9 is the 2001 ratio; we use 1.2 : 4.8 : 0.42 for visual presence)
  const w = isMobile ? 1.0 : 1.2;
  const h = isMobile ? 4.0 : 4.8;
  const d = 0.42;

  useFrame(() => {
    const t = progressRef.current;
    if (!groupRef.current) return;

    // Phase A: approach (0 -> 0.32) - monolith grows from distance, head-on
    // Hold   (0.32 -> 0.48) - dominant, slow rotation - the "hero" moment for the object
    // Phase B: pass    (0.48 -> 0.78) - monolith banks upper-right past camera
    // Phase C: gone    (> 0.78) - off-frame, headline holds
    const ta = Math.min(1, t / 0.32);
    const th = t > 0.32 ? Math.min(1, (t - 0.32) / 0.16) : 0;
    const tb = t > 0.48 ? Math.min(1, (t - 0.48) / 0.30) : 0;
    const eA = easeInOutCubic(ta);
    const eB = easeOutQuart(tb);

    // Position: from deep behind (-22) to dominant (z=-7.5 desktop / -6.5 mobile) then past camera upper-right
    const closestZ = isMobile ? -6.5 : -7.5;
    const baseZ = -22;
    const px = eB * (isMobile ? 4.2 : 6.8);
    const py = eB * (isMobile ? 3.2 : 4.4);
    const pz = baseZ + eA * (closestZ - baseZ) + eB * (closestZ * -1 + 4);

    groupRef.current.position.set(px, py, pz);

    // Rotation: subtle Y drift through approach + hold, heavy Z bank in phase B
    const ry = -0.18 + eA * 0.18 + th * 0.12 + eB * 0.55;
    const rz = 0 + eB * -0.45;
    const rx = 0.02 + eB * -0.10;
    groupRef.current.rotation.set(rx, ry, rz);

    // Edge emissive: peaks at dominance (t ~ 0.30 - 0.55)
    if (edgeRef.current && (edgeRef.current.material as THREE.MeshBasicMaterial)) {
      const mat = edgeRef.current.material as THREE.MeshBasicMaterial;
      const glowEnvelope = Math.sin(Math.PI * Math.min(1, Math.max(0, (t - 0.02) / 0.76)));
      mat.opacity = 0.7 + glowEnvelope * 0.30;
    }

  });

  return (
    <group ref={groupRef} position={[0, 0, -22]}>
      {/* Main slab: brushed pale steel — bright enough to read against #020617 */}
      <mesh ref={slabRef} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color="#8da1b8"
          metalness={0.85}
          roughness={0.35}
          envMapIntensity={1.0}
        />
      </mesh>

      {/* Front-face cyan emissive seam (the dscope-DNA stripe down the obelisk).
          Picked up by Bloom — this is the "thing you've never seen" detail. */}
      <mesh position={[0, 0, d / 2 + 0.001]}>
        <planeGeometry args={[w * 0.05, h * 0.86]} />
        <meshBasicMaterial color="#4facfe" toneMapped={false} />
      </mesh>
      {/* Horizontal cap accent — top */}
      <mesh position={[0, h / 2 - 0.20, d / 2 + 0.001]}>
        <planeGeometry args={[w * 0.45, 0.022]} />
        <meshBasicMaterial color="#4facfe" toneMapped={false} />
      </mesh>
      {/* Horizontal cap accent — bottom */}
      <mesh position={[0, -h / 2 + 0.20, d / 2 + 0.001]}>
        <planeGeometry args={[w * 0.45, 0.022]} />
        <meshBasicMaterial color="#4facfe" toneMapped={false} />
      </mesh>

      {/* Edge outline: thin additive cyan box, slightly larger than slab.
          Bloom turns this into a crisp luminous outline. */}
      <mesh ref={edgeRef}>
        <boxGeometry args={[w + 0.018, h + 0.018, d + 0.018]} />
        <meshBasicMaterial
          color="#4facfe"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

/**
 * Inner R3F scene. Lighting tuned for dark cosmic backdrop:
 *   - Low ambient (so the slab stays in mood, not flatly lit)
 *   - Strong directional rim from upper-left so the brushed metal catches a specular sliver
 *   - Hemisphere fill from above (sky cyan) / below (deep navy) for editorial separation
 */
const Scene: React.FC<{ progressRef: React.MutableRefObject<number>; isMobile: boolean }> = ({
  progressRef,
  isMobile,
}) => {
  return (
    <>
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 22, 60]} />

      <ambientLight intensity={0.28} color="#7aa5ff" />
      <hemisphereLight intensity={0.45} color="#4facfe" groundColor="#020617" />
      {/* Key light from upper-left, hits brushed metal for specular sliver */}
      <directionalLight
        position={[-6, 8, 4]}
        intensity={2.2}
        color="#ffffff"
        castShadow={false}
      />
      {/* Camera-side key — so the front face of the slab catches light too */}
      <directionalLight position={[0, 1, 9]} intensity={1.4} color="#dbeafe" />
      {/* Cool cyan rim from lower-right */}
      <directionalLight position={[5, -2, -3]} intensity={0.65} color="#4facfe" />
      {/* Back rim so the monolith silhouette separates from the cosmic backdrop */}
      <pointLight position={[0, 0, -16]} intensity={3.0} color="#4facfe" distance={20} />

      <Stars
        radius={50}
        depth={40}
        count={1500}
        factor={2.5}
        saturation={0.4}
        fade
        speed={0.35}
      />

      <Monolith progressRef={progressRef} isMobile={isMobile} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.85}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.35}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
};

/**
 * Public component.
 * Sticky stage with 280vh scroll length on desktop, 240vh on mobile.
 * Headline overlay fades in t=0.28 → 0.5, holds until t=1.0.
 */
export const MonolithStage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      progressRef.current = p;

      // Headline overlay easing in plain DOM (cheap, no React re-render).
      // Headline appears DURING the monolith's exit (t > 0.50) so the
      // object owns the dominance moment and the words own the resolution.
      if (eyebrowRef.current) {
        const ep = p < 0.50 ? 0 : Math.min(1, (p - 0.50) / 0.12);
        const e = easeInOutCubic(ep);
        const release = p > 0.94 ? 1 - easeInQuad((p - 0.94) / 0.06) : 1;
        eyebrowRef.current.style.opacity = String(e * release);
        eyebrowRef.current.style.transform = `translate3d(0, ${(1 - e) * 14}px, 0)`;
      }
      if (headlineRef.current) {
        const hp = p < 0.58 ? 0 : Math.min(1, (p - 0.58) / 0.16);
        const e = easeInOutCubic(hp);
        const release = p > 0.94 ? 1 - easeInQuad((p - 0.94) / 0.06) : 1;
        headlineRef.current.style.opacity = String(e * release);
        headlineRef.current.style.transform = `translate3d(0, ${(1 - e) * 26}px, 0)`;
      }
      if (subRef.current) {
        const sp = p < 0.70 ? 0 : Math.min(1, (p - 0.70) / 0.14);
        const e = easeInOutCubic(sp);
        const release = p > 0.94 ? 1 - easeInQuad((p - 0.94) / 0.06) : 1;
        subRef.current.style.opacity = String(e * release);
        subRef.current.style.transform = `translate3d(0, ${(1 - e) * 16}px, 0)`;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [mounted]);

  const stageHeight = isMobile ? "240vh" : "280vh";
  const [pinned, setPinned] = useState(false);

  // Pin overlay when section is within viewport scroll range
  useEffect(() => {
    if (!mounted) return;
    const updatePin = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const inRange = rect.top <= 0 && rect.bottom >= window.innerHeight;
      setPinned(inRange);
    };
    updatePin();
    window.addEventListener("scroll", updatePin, { passive: true });
    window.addEventListener("resize", updatePin);
    return () => {
      window.removeEventListener("scroll", updatePin);
      window.removeEventListener("resize", updatePin);
    };
  }, [mounted]);

  // Portal target = document.body to escape motion.main's transformed ancestor
  // (Framer AnimatePresence transform breaks position:sticky on descendants).
  const overlay = mounted ? (
    <div
      className="w-screen h-screen overflow-hidden bg-[#020617]"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: pinned ? 30 : -1,
        opacity: pinned ? 1 : 0,
        pointerEvents: pinned ? "auto" : "none",
      }}
      aria-hidden={!pinned}
    >
      {/* Cinematic vignette - subtle radial fade so center pops */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(2,6,23,0.55) 80%, rgba(2,6,23,0.85) 100%)",
          }}
          aria-hidden="true"
        />

        {/* R3F canvas */}
        {mounted && (
          <Canvas
            className="absolute inset-0"
            camera={{
              position: [0, 0, 8],
              fov: isMobile ? 62 : 42,
              near: 0.1,
              far: 100,
            }}
            dpr={[1, 1.5]}
            frameloop="always"
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
            }}
          >
            <Suspense fallback={null}>
              <Scene progressRef={progressRef} isMobile={isMobile} />
            </Suspense>
          </Canvas>
        )}

        {/* Headline overlay - centered, fades in as monolith dominates */}
        <div className="absolute inset-0 z-[10] flex flex-col items-center justify-center px-6 pointer-events-none">
          <div
            ref={eyebrowRef}
            className="mb-5 md:mb-8 opacity-0 will-change-[transform,opacity]"
            style={{
              transition: "none",
            }}
          >
            <span className="font-mono uppercase tracking-[0.4em] text-[10px] md:text-xs text-cyan-300/80">
              <span className="inline-block w-8 h-px bg-cyan-300/60 align-middle mr-3" />
              Introducing
              <span className="inline-block w-8 h-px bg-cyan-300/60 align-middle ml-3" />
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="opacity-0 will-change-[transform,opacity] text-center max-w-5xl mx-auto"
            style={{ transition: "none" }}
          >
            <span
              className="block italic font-display font-light text-white leading-[1.05] tracking-tight"
              style={{
                fontSize: "clamp(2rem, 6.5vw, 5.25rem)",
                textShadow: "0 2px 40px rgba(79, 172, 254, 0.35)",
              }}
            >
              Beyond what enterprise software
              <br />
              <span
                className="bg-gradient-to-r from-[#4facfe] via-[#7dd3fc] to-[#00f2fe] bg-clip-text text-transparent"
              >
                has shown you.
              </span>
            </span>
          </h2>

          <div
            ref={subRef}
            className="mt-6 md:mt-10 opacity-0 will-change-[transform,opacity] max-w-2xl mx-auto"
            style={{ transition: "none" }}
          >
            <p className="text-center font-mono text-[11px] md:text-sm uppercase tracking-[0.32em] text-white/55 leading-relaxed">
              Planetary-scale AI automation.
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>
              Engineered past the playbook.
            </p>
          </div>
        </div>

        {/* Scroll cue - bottom center, fades during dominant moment */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] pointer-events-none">
          <div
            className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/30"
            style={{ animation: "monolithScrollPulse 2.2s ease-in-out infinite" }}
          >
            Scroll
          </div>
        </div>
      </div>
  ) : null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#020617]"
      style={{ height: stageHeight }}
      aria-label="Beyond what enterprise software has shown you"
    >
      {typeof document !== "undefined" && overlay
        ? createPortal(overlay, document.body)
        : null}
      <style>{`
        @keyframes monolithScrollPulse {
          0%, 100% { opacity: 0.15; transform: translateY(0); }
          50%      { opacity: 0.55; transform: translateY(3px); }
        }
      `}</style>
    </section>
  );
};

export default MonolithStage;
