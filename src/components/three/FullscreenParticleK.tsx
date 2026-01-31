'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Animation phases
const PHASE_SCATTERED = 0;
const PHASE_GATHERING = 1;
const PHASE_FORMED = 2;
const PHASE_SCATTERING = 3;

// Timing (in seconds)
const GATHER_DURATION = 2.5;
const HOLD_DURATION = 3;
const SCATTER_DURATION = 2;
const SCATTERED_DURATION = 1;

// Generate K shape as a grid of block positions
function generateKBlockPositions(
  blockSize: number,
  gap: number,
  offsetX: number,
  offsetY: number,
  heightBlocks: number
): { x: number; y: number; color: string }[] {
  const blocks: { x: number; y: number; color: string }[] = [];
  const unit = blockSize + gap;
  const halfHeight = heightBlocks / 2;

  // MULTICOLOR - blue, cyan, purple, pink gradient
  const colors = [
    '#00d4ff', '#00aaff', '#0066ff', '#6366f1', '#8b5cf6',
    '#a855f7', '#d946ef', '#ec4899', '#f472b6', '#22d3ee',
  ];
  const getColor = () => colors[Math.floor(Math.random() * colors.length)];

  // 1. VERTICAL STEM - left side, full height (2 blocks wide)
  for (let row = -halfHeight; row <= halfHeight; row++) {
    blocks.push({ x: 0 * unit, y: row * unit, color: getColor() });
    blocks.push({ x: 1 * unit, y: row * unit, color: getColor() });
  }

  // 2. UPPER ARM - from middle going UP and to the RIGHT
  for (let i = 0; i <= halfHeight; i++) {
    const col = 2 + Math.floor(i * 0.8);
    const row = i;
    blocks.push({ x: col * unit, y: row * unit, color: getColor() });
    blocks.push({ x: (col + 1) * unit, y: row * unit, color: getColor() });
    if (i > 0) {
      blocks.push({ x: col * unit, y: (row - 0.5) * unit, color: getColor() });
    }
  }

  // 3. LOWER ARM - from middle going DOWN and to the RIGHT
  for (let i = 0; i <= halfHeight; i++) {
    const col = 2 + Math.floor(i * 0.8);
    const row = -i;
    blocks.push({ x: col * unit, y: row * unit, color: getColor() });
    blocks.push({ x: (col + 1) * unit, y: row * unit, color: getColor() });
    if (i > 0) {
      blocks.push({ x: col * unit, y: (row + 0.5) * unit, color: getColor() });
    }
  }

  // 4. Fill the junction area
  for (let row = -2; row <= 2; row++) {
    for (let col = 1; col <= 3; col++) {
      blocks.push({ x: col * unit, y: row * unit, color: getColor() });
    }
  }

  // Apply offset
  return blocks.map(b => ({
    x: b.x + offsetX,
    y: b.y + offsetY,
    color: b.color
  }));
}

// Responsive hook for screen size
function useResponsiveK() {
  const { viewport } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive values based on viewport - BIGGER K on desktop
  const scale = isMobile ? 0.6 : 1;
  const blockSize = isMobile ? 0.15 : 0.28; // Increased from 0.22 to 0.28
  const gap = isMobile ? 0.018 : 0.03; // Slightly larger gap
  const offsetX = isMobile ? 0 : viewport.width > 10 ? 3.5 : 2.5;
  const offsetY = isMobile ? -0.5 : -1.2;
  const heightBlocks = isMobile ? 14 : 22; // Increased from 20 to 22
  const spreadMultiplier = isMobile ? 0.6 : 1;

  return { scale, blockSize, gap, offsetX, offsetY, heightBlocks, spreadMultiplier, isMobile };
}

function BlockK() {
  const groupRef = useRef<THREE.Group>(null);
  const blocksRef = useRef<THREE.Mesh[]>([]);
  const [phase, setPhase] = useState(PHASE_SCATTERED);
  const phaseStartTime = useRef(0);
  const { blockSize, gap, offsetX, offsetY, heightBlocks, spreadMultiplier, isMobile } = useResponsiveK();

  const blockPositions = useMemo(
    () => generateKBlockPositions(blockSize, gap, offsetX, offsetY, heightBlocks),
    [blockSize, gap, offsetX, offsetY, heightBlocks]
  );

  const scatteredPositions = useRef<{ x: number; y: number; z: number }[]>([]);
  const velocities = useRef<{ x: number; y: number; z: number }[]>([]);

  useEffect(() => {
    const spread = isMobile ? 8 : 15;
    scatteredPositions.current = blockPositions.map(() => ({
      x: (Math.random() - 0.5) * spread * 2 * spreadMultiplier,
      y: (Math.random() - 0.5) * spread * 1.5 * spreadMultiplier,
      z: (Math.random() - 0.5) * spread * spreadMultiplier
    }));

    velocities.current = blockPositions.map(() => ({
      x: (Math.random() - 0.5) * 0.3,
      y: (Math.random() - 0.5) * 0.3,
      z: (Math.random() - 0.5) * 0.2
    }));
  }, [blockPositions, spreadMultiplier, isMobile]);

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useFrame((state) => {
    if (!groupRef.current || blocksRef.current.length === 0) return;

    const time = state.clock.elapsedTime;
    const phaseTime = time - phaseStartTime.current;

    switch (phase) {
      case PHASE_SCATTERED:
        if (phaseTime >= SCATTERED_DURATION) {
          setPhase(PHASE_GATHERING);
          phaseStartTime.current = time;
        }
        break;
      case PHASE_GATHERING:
        if (phaseTime >= GATHER_DURATION) {
          setPhase(PHASE_FORMED);
          phaseStartTime.current = time;
        }
        break;
      case PHASE_FORMED:
        if (phaseTime >= HOLD_DURATION) {
          setPhase(PHASE_SCATTERING);
          phaseStartTime.current = time;
          velocities.current = blockPositions.map(() => {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.15 + Math.random() * 0.2;
            return {
              x: Math.cos(angle) * speed,
              y: (Math.random() - 0.5) * speed * 1.5,
              z: (Math.random() - 0.5) * speed
            };
          });
        }
        break;
      case PHASE_SCATTERING:
        if (phaseTime >= SCATTER_DURATION) {
          setPhase(PHASE_SCATTERED);
          phaseStartTime.current = time;
        }
        break;
    }

    blocksRef.current.forEach((mesh, i) => {
      if (!mesh || !scatteredPositions.current[i] || !velocities.current[i]) return;

      const target = blockPositions[i];
      const scattered = scatteredPositions.current[i];
      const vel = velocities.current[i];

      if (!target || !scattered || !vel) return;

      let x, y, z;
      let scale = 1;
      let rotX = 0, rotY = 0;

      switch (phase) {
        case PHASE_SCATTERED:
          x = scattered.x + Math.sin(time * 0.3 + i * 0.1) * 0.5;
          y = scattered.y + Math.cos(time * 0.25 + i * 0.1) * 0.5;
          z = scattered.z + Math.sin(time * 0.2 + i * 0.1) * 0.3;
          scale = 0.3;
          rotX = time * 0.5 + i * 0.1;
          rotY = time * 0.3 + i * 0.1;
          break;

        case PHASE_GATHERING:
          const gatherProgress = easeOutQuart(Math.min(phaseTime / GATHER_DURATION, 1));
          x = scattered.x + (target.x - scattered.x) * gatherProgress;
          y = scattered.y + (target.y - scattered.y) * gatherProgress;
          z = scattered.z + (0 - scattered.z) * gatherProgress;

          const swirl = (1 - gatherProgress) * 2;
          x += Math.sin(time * 3 + i * 0.2) * swirl;
          y += Math.cos(time * 3 + i * 0.2) * swirl;

          scale = 0.3 + gatherProgress * 0.7;
          rotX = (1 - gatherProgress) * (time * 0.5 + i * 0.1);
          rotY = (1 - gatherProgress) * (time * 0.3 + i * 0.1);
          break;

        case PHASE_FORMED:
          x = target.x;
          y = target.y;
          z = 0;
          scale = 1 + Math.sin(time * 2 + i * 0.05) * 0.03;
          x += Math.sin(time * 1.5 + i * 0.1) * 0.01;
          y += Math.cos(time * 1.2 + i * 0.1) * 0.01;
          break;

        case PHASE_SCATTERING:
          const scatterProgress = easeInOutCubic(Math.min(phaseTime / SCATTER_DURATION, 1));
          const explosionStrength = scatterProgress * (isMobile ? 12 : 20);

          x = target.x + vel.x * explosionStrength;
          y = target.y + vel.y * explosionStrength;
          z = vel.z * explosionStrength;

          scattered.x = x;
          scattered.y = y;
          scattered.z = z;

          scale = 1 - scatterProgress * 0.7;
          rotX = scatterProgress * (time * 0.5 + i * 0.1);
          rotY = scatterProgress * (time * 0.3 + i * 0.1);
          break;

        default:
          x = scattered.x;
          y = scattered.y;
          z = scattered.z;
      }

      mesh.position.set(x, y, z);
      mesh.scale.setScalar(scale);
      mesh.rotation.set(rotX, rotY, 0);
    });

    if (phase === PHASE_FORMED) {
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
    } else {
      groupRef.current.rotation.y = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {blockPositions.map((block, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) blocksRef.current[i] = el; }}
          position={[block.x, block.y, 0]}
        >
          <boxGeometry args={[blockSize, blockSize, blockSize]} />
          <meshStandardMaterial
            color={block.color}
            emissive={block.color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function AmbientBlocks() {
  const groupRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const count = isMobile ? 40 : 80;

  const multiColors = [
    '#00d4ff', '#0066ff', '#8b5cf6', '#d946ef', '#ec4899', '#22d3ee', '#a855f7'
  ];

  const blocks = useMemo(() => {
    const spreadX = isMobile ? 20 : 35;
    const spreadY = isMobile ? 15 : 25;
    const spreadZ = isMobile ? 12 : 20;
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * spreadX,
      y: (Math.random() - 0.5) * spreadY,
      z: (Math.random() - 0.5) * spreadZ - 5,
      size: (isMobile ? 0.04 : 0.06) + Math.random() * (isMobile ? 0.08 : 0.12),
      speed: 0.2 + Math.random() * 0.3,
      color: multiColors[Math.floor(Math.random() * multiColors.length)]
    }));
  }, [count, isMobile]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const block = blocks[i];
      if (!block) return;
      child.position.x = block.x + Math.sin(time * block.speed + i) * 0.5;
      child.position.y = block.y + Math.cos(time * block.speed * 0.8 + i) * 0.5;
      child.rotation.x = time * 0.2 + i;
      child.rotation.y = time * 0.15 + i;
    });
  });

  return (
    <group ref={groupRef}>
      {blocks.map((block, i) => (
        <mesh key={i} position={[block.x, block.y, block.z]}>
          <boxGeometry args={[block.size, block.size, block.size]} />
          <meshBasicMaterial color={block.color} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function ResponsiveCamera() {
  const { camera } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.position.z = mobile ? 10 : 12;
        camera.fov = mobile ? 65 : 55;
        camera.updateProjectionMatrix();
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [camera]);

  return null;
}

export const FullscreenParticleK = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll-based opacity
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Start fading at 20% of viewport height, fully hidden at 80%
      const fadeStart = windowHeight * 0.2;
      const fadeEnd = windowHeight * 0.8;

      if (scrollY <= fadeStart) {
        setOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setOpacity(0);
      } else {
        // Calculate opacity between fadeStart and fadeEnd
        const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setOpacity(1 - fadeProgress);
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on mobile
  if (isMobile) {
    return null;
  }

  // Don't render if fully transparent (performance optimization)
  if (opacity === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-150"
      style={{ zIndex: 5, opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ResponsiveCamera />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#00d4ff" />
        <pointLight position={[-10, -10, 5]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[0, 5, 10]} intensity={0.6} color="#ec4899" />
        <pointLight position={[0, 0, 10]} intensity={0.8} color="#ffffff" />

        <BlockK />
        <AmbientBlocks />
      </Canvas>
    </div>
  );
};
