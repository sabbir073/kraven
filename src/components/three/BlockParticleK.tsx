'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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

// Generate proper K shape with 90-degree angles
function generateKPoints(): [number, number][] {
  const kPoints: [number, number][] = [];

  // K dimensions
  const height = 2.4;        // Total height of K
  const strokeWidth = 0.4;   // Thickness of strokes
  const armLength = 1.3;     // Length of diagonal arms

  // Vertical stem (left side of K) - full height
  for (let y = -height; y <= height; y += 0.03) {
    for (let x = -1.2; x <= -1.2 + strokeWidth; x += 0.03) {
      kPoints.push([x, y]);
    }
  }

  // Upper arm - starts from center, goes up-right at 45 degrees
  // The arm meets the stem at y=0 (center)
  for (let t = 0; t <= 1; t += 0.012) {
    const armX = -1.2 + strokeWidth + t * armLength;
    const armY = t * height; // Goes from 0 to height

    // Add thickness perpendicular to the 45-degree angle
    // For 45 degrees, perpendicular is also 45 degrees rotated
    const perpX = 0.707 * strokeWidth / 2; // cos(45) * thickness/2
    const perpY = 0.707 * strokeWidth / 2; // sin(45) * thickness/2

    for (let offset = -1; offset <= 1; offset += 0.3) {
      kPoints.push([armX - offset * perpY, armY + offset * perpX]);
    }
  }

  // Lower arm - starts from center, goes down-right at 45 degrees
  for (let t = 0; t <= 1; t += 0.012) {
    const armX = -1.2 + strokeWidth + t * armLength;
    const armY = -t * height; // Goes from 0 to -height

    const perpX = 0.707 * strokeWidth / 2;
    const perpY = 0.707 * strokeWidth / 2;

    for (let offset = -1; offset <= 1; offset += 0.3) {
      kPoints.push([armX + offset * perpY, armY + offset * perpX]);
    }
  }

  // Fill the junction area where arms meet the stem (center area)
  // This creates a solid connection point
  for (let y = -strokeWidth; y <= strokeWidth; y += 0.03) {
    for (let x = -1.2; x <= -1.2 + strokeWidth * 1.5; x += 0.03) {
      kPoints.push([x, y]);
    }
  }

  return kPoints;
}

function BlockParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [phase, setPhase] = useState(PHASE_SCATTERED);
  const phaseStartTime = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const count = 3000;
  const blockSize = 0.032;

  const { targetPositions, scatteredPositions, colors } = useMemo(() => {
    const targets = new Float32Array(count * 3);
    const scattered = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const kPoints = generateKPoints();

    for (let i = 0; i < count; i++) {
      // Target position (K shape)
      const randomPoint = kPoints[Math.floor(Math.random() * kPoints.length)];
      const offsetX = (Math.random() - 0.5) * 0.06;
      const offsetY = (Math.random() - 0.5) * 0.06;
      const offsetZ = (Math.random() - 0.5) * 0.3;

      targets[i * 3] = randomPoint[0] + offsetX;
      targets[i * 3 + 1] = randomPoint[1] + offsetY;
      targets[i * 3 + 2] = offsetZ;

      // Scattered position - across ENTIRE viewport (much larger area)
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 15; // Much larger scatter radius
      scattered[i * 3] = Math.cos(angle) * radius * (Math.random() > 0.5 ? 1 : -1);
      scattered[i * 3 + 1] = (Math.random() - 0.5) * 20; // Full vertical spread
      scattered[i * 3 + 2] = (Math.random() - 0.5) * 15;

      // Colors
      const colorChoice = Math.random();
      if (colorChoice < 0.5) {
        // White/light
        cols[i * 3] = 0.95;
        cols[i * 3 + 1] = 0.95;
        cols[i * 3 + 2] = 1;
      } else if (colorChoice < 0.75) {
        // Purple tint
        cols[i * 3] = 0.7;
        cols[i * 3 + 1] = 0.6;
        cols[i * 3 + 2] = 1;
      } else {
        // Cyan tint
        cols[i * 3] = 0.6;
        cols[i * 3 + 1] = 0.9;
        cols[i * 3 + 2] = 1;
      }
    }

    return { targetPositions: targets, scatteredPositions: scattered, colors: cols };
  }, [count]);

  const velocities = useRef(new Float32Array(count * 3));

  useEffect(() => {
    for (let i = 0; i < count * 3; i++) {
      velocities.current[i] = (Math.random() - 0.5) * 0.02;
    }
  }, [count]);

  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  useFrame((state) => {
    if (!meshRef.current) return;

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
          for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const angle = Math.random() * Math.PI * 2;
            const upDown = Math.random() > 0.5 ? 1 : -1;
            velocities.current[i3] = Math.cos(angle) * (0.08 + Math.random() * 0.12);
            velocities.current[i3 + 1] = upDown * (0.05 + Math.random() * 0.15);
            velocities.current[i3 + 2] = (Math.random() - 0.5) * 0.2;
          }
        }
        break;
      case PHASE_SCATTERING:
        if (phaseTime >= SCATTER_DURATION) {
          setPhase(PHASE_SCATTERED);
          phaseStartTime.current = time;
        }
        break;
    }

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let x, y, z;
      let scale = 1;

      switch (phase) {
        case PHASE_SCATTERED:
          x = scatteredPositions[i3] + Math.sin(time * 0.3 + i * 0.01) * 0.5;
          y = scatteredPositions[i3 + 1] + Math.cos(time * 0.25 + i * 0.01) * 0.5;
          z = scatteredPositions[i3 + 2] + Math.sin(time * 0.2 + i * 0.01) * 0.3;
          scale = 0.2 + Math.sin(time * 1.5 + i) * 0.1;
          break;

        case PHASE_GATHERING:
          const gatherProgress = easeOutQuart(Math.min(phaseTime / GATHER_DURATION, 1));
          x = scatteredPositions[i3] + (targetPositions[i3] - scatteredPositions[i3]) * gatherProgress;
          y = scatteredPositions[i3 + 1] + (targetPositions[i3 + 1] - scatteredPositions[i3 + 1]) * gatherProgress;
          z = scatteredPositions[i3 + 2] + (targetPositions[i3 + 2] - scatteredPositions[i3 + 2]) * gatherProgress;

          // Spiral effect during gathering
          const swirl = (1 - gatherProgress) * 1.5;
          const swirlAngle = time * 3 + i * 0.05;
          x += Math.sin(swirlAngle) * swirl * (1 - gatherProgress);
          y += Math.cos(swirlAngle) * swirl * (1 - gatherProgress);

          scale = 0.2 + gatherProgress * 0.8;
          break;

        case PHASE_FORMED:
          x = targetPositions[i3] + Math.sin(time * 2 + i * 0.05) * 0.015;
          y = targetPositions[i3 + 1] + Math.cos(time * 1.5 + i * 0.05) * 0.015;
          z = targetPositions[i3 + 2] + Math.sin(time * 1.8 + i * 0.08) * 0.02;
          scale = 1 + Math.sin(time * 3 + i * 0.03) * 0.05;
          break;

        case PHASE_SCATTERING:
          const scatterProgress = easeInOutCubic(Math.min(phaseTime / SCATTER_DURATION, 1));
          const explosionStrength = scatterProgress * 15;
          x = targetPositions[i3] + velocities.current[i3] * explosionStrength;
          y = targetPositions[i3 + 1] + velocities.current[i3 + 1] * explosionStrength;
          z = targetPositions[i3 + 2] + velocities.current[i3 + 2] * explosionStrength;
          scatteredPositions[i3] = x;
          scatteredPositions[i3 + 1] = y;
          scatteredPositions[i3 + 2] = z;
          scale = 1 - scatterProgress * 0.8;
          break;

        default:
          x = 0; y = 0; z = 0;
      }

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(blockSize * scale);
      dummy.rotation.set(
        time * 0.4 + i * 0.005,
        time * 0.3 + i * 0.008,
        time * 0.35 + i * 0.006
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.y = Math.sin(time * 0.15) * 0.08;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.9} toneMapped={false} />
    </instancedMesh>
  );
}

function ColoredParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [phase, setPhase] = useState(PHASE_SCATTERED);
  const phaseStartTime = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const count = 1000;
  const blockSize = 0.045;

  const { targetPositions, scatteredPositions } = useMemo(() => {
    const targets = new Float32Array(count * 3);
    const scattered = new Float32Array(count * 3);
    const kPoints = generateKPoints();

    for (let i = 0; i < count; i++) {
      const randomPoint = kPoints[Math.floor(Math.random() * kPoints.length)];
      targets[i * 3] = randomPoint[0] + (Math.random() - 0.5) * 0.08;
      targets[i * 3 + 1] = randomPoint[1] + (Math.random() - 0.5) * 0.08;
      targets[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      // Scatter across entire viewport
      const angle = Math.random() * Math.PI * 2;
      const radius = 6 + Math.random() * 18;
      scattered[i * 3] = Math.cos(angle) * radius;
      scattered[i * 3 + 1] = (Math.random() - 0.5) * 25;
      scattered[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }

    return { targetPositions: targets, scatteredPositions: scattered };
  }, [count]);

  const velocities = useRef(new Float32Array(count * 3));

  useEffect(() => {
    for (let i = 0; i < count * 3; i++) {
      velocities.current[i] = (Math.random() - 0.5) * 0.02;
    }
  }, [count]);

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useFrame((state) => {
    if (!meshRef.current) return;

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
          for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const angle = Math.random() * Math.PI * 2;
            velocities.current[i3] = Math.cos(angle) * (0.1 + Math.random() * 0.15);
            velocities.current[i3 + 1] = (Math.random() - 0.5) * 0.25;
            velocities.current[i3 + 2] = (Math.random() - 0.5) * 0.2;
          }
        }
        break;
      case PHASE_SCATTERING:
        if (phaseTime >= SCATTER_DURATION) {
          setPhase(PHASE_SCATTERED);
          phaseStartTime.current = time;
        }
        break;
    }

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let x, y, z;
      let scale = 1;

      switch (phase) {
        case PHASE_SCATTERED:
          x = scatteredPositions[i3] + Math.sin(time * 0.4 + i) * 0.6;
          y = scatteredPositions[i3 + 1] + Math.cos(time * 0.35 + i * 0.5) * 0.6;
          z = scatteredPositions[i3 + 2] + Math.sin(time * 0.25 + i * 0.7) * 0.4;
          scale = 0.3;
          break;

        case PHASE_GATHERING:
          const gatherProgress = easeOutQuart(Math.min(phaseTime / GATHER_DURATION, 1));
          x = scatteredPositions[i3] + (targetPositions[i3] - scatteredPositions[i3]) * gatherProgress;
          y = scatteredPositions[i3 + 1] + (targetPositions[i3 + 1] - scatteredPositions[i3 + 1]) * gatherProgress;
          z = scatteredPositions[i3 + 2] + (targetPositions[i3 + 2] - scatteredPositions[i3 + 2]) * gatherProgress;
          const swirl = (1 - gatherProgress) * 1.2;
          x += Math.sin(time * 3.5 + i * 0.08) * swirl;
          y += Math.cos(time * 3.5 + i * 0.08) * swirl;
          scale = 0.3 + gatherProgress * 0.7;
          break;

        case PHASE_FORMED:
          x = targetPositions[i3] + Math.sin(time * 2 + i * 0.08) * 0.025;
          y = targetPositions[i3 + 1] + Math.cos(time * 1.5 + i * 0.08) * 0.025;
          z = targetPositions[i3 + 2] + Math.sin(time * 1.8 + i * 0.1) * 0.03;
          scale = 1 + Math.sin(time * 3 + i * 0.04) * 0.08;
          break;

        case PHASE_SCATTERING:
          const scatterProgress = easeInOutCubic(Math.min(phaseTime / SCATTER_DURATION, 1));
          const explosionStrength = scatterProgress * 18;
          x = targetPositions[i3] + velocities.current[i3] * explosionStrength;
          y = targetPositions[i3 + 1] + velocities.current[i3 + 1] * explosionStrength;
          z = targetPositions[i3 + 2] + velocities.current[i3 + 2] * explosionStrength;
          scatteredPositions[i3] = x;
          scatteredPositions[i3 + 1] = y;
          scatteredPositions[i3 + 2] = z;
          scale = 1 - scatterProgress * 0.7;
          break;

        default:
          x = 0; y = 0; z = 0;
      }

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(blockSize * scale);
      dummy.rotation.set(time * 0.25 + i * 0.015, time * 0.2 + i * 0.02, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.y = Math.sin(time * 0.15) * 0.08;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.75} toneMapped={false} />
    </instancedMesh>
  );
}

function GlowParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const [phase, setPhase] = useState(PHASE_SCATTERED);
  const phaseStartTime = useRef(0);

  const count = 600;

  const { positions, scatteredPositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scattered = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const kPoints = generateKPoints();

    for (let i = 0; i < count; i++) {
      const randomPoint = kPoints[Math.floor(Math.random() * kPoints.length)];
      pos[i * 3] = randomPoint[0] + (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = randomPoint[1] + (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;

      // Scatter across entire viewport
      const angle = Math.random() * Math.PI * 2;
      const radius = 7 + Math.random() * 20;
      scattered[i * 3] = Math.cos(angle) * radius;
      scattered[i * 3 + 1] = (Math.random() - 0.5) * 30;
      scattered[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Bright colors
      const choice = Math.random();
      if (choice < 0.33) {
        cols[i * 3] = 1; cols[i * 3 + 1] = 0.8; cols[i * 3 + 2] = 1;
      } else if (choice < 0.66) {
        cols[i * 3] = 0.5; cols[i * 3 + 1] = 1; cols[i * 3 + 2] = 1;
      } else {
        cols[i * 3] = 1; cols[i * 3 + 1] = 1; cols[i * 3 + 2] = 1;
      }
    }

    return { positions: pos, scatteredPositions: scattered, colors: cols };
  }, [count]);

  const velocities = useRef(new Float32Array(count * 3));

  useEffect(() => {
    for (let i = 0; i < count * 3; i++) {
      velocities.current[i] = (Math.random() - 0.5) * 0.02;
    }
  }, [count]);

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useFrame((state) => {
    if (!pointsRef.current) return;

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
          for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const angle = Math.random() * Math.PI * 2;
            velocities.current[i3] = Math.cos(angle) * (0.12 + Math.random() * 0.18);
            velocities.current[i3 + 1] = (Math.random() - 0.5) * 0.3;
            velocities.current[i3 + 2] = (Math.random() - 0.5) * 0.25;
          }
        }
        break;
      case PHASE_SCATTERING:
        if (phaseTime >= SCATTER_DURATION) {
          setPhase(PHASE_SCATTERED);
          phaseStartTime.current = time;
        }
        break;
    }

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let x, y, z;

      switch (phase) {
        case PHASE_SCATTERED:
          x = scatteredPositions[i3] + Math.sin(time * 0.5 + i) * 0.7;
          y = scatteredPositions[i3 + 1] + Math.cos(time * 0.4 + i * 0.5) * 0.7;
          z = scatteredPositions[i3 + 2] + Math.sin(time * 0.35 + i * 0.7) * 0.5;
          break;

        case PHASE_GATHERING:
          const gatherProgress = easeOutQuart(Math.min(phaseTime / GATHER_DURATION, 1));
          x = scatteredPositions[i3] + (positions[i3] - scatteredPositions[i3]) * gatherProgress;
          y = scatteredPositions[i3 + 1] + (positions[i3 + 1] - scatteredPositions[i3 + 1]) * gatherProgress;
          z = scatteredPositions[i3 + 2] + (positions[i3 + 2] - scatteredPositions[i3 + 2]) * gatherProgress;
          const swirl = (1 - gatherProgress) * 1.5;
          x += Math.sin(time * 4 + i * 0.12) * swirl;
          y += Math.cos(time * 4 + i * 0.12) * swirl;
          break;

        case PHASE_FORMED:
          x = positions[i3] + Math.sin(time * 2.5 + i * 0.08) * 0.04;
          y = positions[i3 + 1] + Math.cos(time * 2 + i * 0.08) * 0.04;
          z = positions[i3 + 2] + Math.sin(time * 2.2 + i * 0.1) * 0.05;
          break;

        case PHASE_SCATTERING:
          const scatterProgress = easeInOutCubic(Math.min(phaseTime / SCATTER_DURATION, 1));
          const explosionStrength = scatterProgress * 20;
          x = positions[i3] + velocities.current[i3] * explosionStrength;
          y = positions[i3 + 1] + velocities.current[i3 + 1] * explosionStrength;
          z = positions[i3 + 2] + velocities.current[i3 + 2] * explosionStrength;
          scatteredPositions[i3] = x;
          scatteredPositions[i3 + 1] = y;
          scatteredPositions[i3 + 2] = z;
          break;

        default:
          x = 0; y = 0; z = 0;
      }

      posArray[i3] = x;
      posArray[i3 + 1] = y;
      posArray[i3 + 2] = z;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = Math.sin(time * 0.15) * 0.08;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(scatteredPositions), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [scatteredPositions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export const BlockParticleK = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

        <BlockParticles />
        <ColoredParticles />
        <GlowParticles />
      </Canvas>
    </div>
  );
};
