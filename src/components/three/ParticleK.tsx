'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticlesProps {
  scrollProgress: number;
}

function KParticles({ scrollProgress }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Generate K shape points
  const { positions, originalPositions, colors } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // K shape vertices (simplified for particles)
    const kPoints: [number, number][] = [];

    // Vertical line of K
    for (let y = -2; y <= 2; y += 0.05) {
      kPoints.push([-0.8, y]);
    }

    // Upper diagonal of K
    for (let t = 0; t <= 1; t += 0.02) {
      kPoints.push([-0.8 + t * 1.2, t * 2]);
    }

    // Lower diagonal of K
    for (let t = 0; t <= 1; t += 0.02) {
      kPoints.push([-0.8 + t * 1.2, -t * 2]);
    }

    for (let i = 0; i < count; i++) {
      const randomPoint = kPoints[Math.floor(Math.random() * kPoints.length)];
      const offsetX = (Math.random() - 0.5) * 0.3;
      const offsetY = (Math.random() - 0.5) * 0.3;
      const offsetZ = (Math.random() - 0.5) * 0.5;

      const x = randomPoint[0] + offsetX;
      const y = randomPoint[1] + offsetY;
      const z = offsetZ;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Gradient colors (purple to cyan)
      const t = (y + 2) / 4; // Normalize y to 0-1
      colors[i * 3] = 0.55 + t * 0.1; // R
      colors[i * 3 + 1] = 0.36 + t * 0.35; // G
      colors[i * 3 + 2] = 0.96 - t * 0.13; // B
    }

    return { positions, originalPositions, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const positionArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positionArray.length / 3; i++) {
      const i3 = i * 3;
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      // Wave animation
      const wave = Math.sin(time * 2 + oy * 2) * 0.05;

      // Scroll-based explosion effect
      const explosionFactor = scrollProgress * 3;
      const randomDirection = new THREE.Vector3(
        (Math.random() - 0.5) * explosionFactor,
        (Math.random() - 0.5) * explosionFactor,
        (Math.random() - 0.5) * explosionFactor
      );

      positionArray[i3] = ox + wave + randomDirection.x * 0.3;
      positionArray[i3 + 1] = oy + Math.sin(time * 1.5 + ox * 3) * 0.03;
      positionArray[i3 + 2] = oz + wave * 0.5 + randomDirection.z * 0.3;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = Math.sin(time * 0.3) * 0.1 + scrollProgress * Math.PI;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <points ref={pointsRef} geometry={geometry}>
        <PointMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </Float>
  );
}

function GlowingSpheres({ scrollProgress }: ParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.position.x = Math.sin(time * 0.5 + i * 2) * 2;
      mesh.position.y = Math.cos(time * 0.3 + i * 1.5) * 2;
      mesh.position.z = Math.sin(time * 0.4 + i) * 1 - 2;
      mesh.scale.setScalar(0.1 + Math.sin(time + i) * 0.05);
    });
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#8b5cf6' : '#06b6d4'}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingCrystals({ scrollProgress }: ParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.rotation.x = time * 0.5 + i;
      mesh.rotation.y = time * 0.3 + i;
      mesh.position.y = Math.sin(time + i) * 0.5;
    });

    groupRef.current.rotation.y = scrollProgress * Math.PI * 0.5;
  });

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin((i / 6) * Math.PI * 2) * 3,
            0,
            Math.cos((i / 6) * Math.PI * 2) * 3 - 2,
          ]}
        >
          <octahedronGeometry args={[0.15, 0]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#06b6d4' : '#f472b6'}
            transparent
            opacity={0.4}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

interface ParticleKProps {
  scrollProgress?: number;
}

export const ParticleK = ({ scrollProgress = 0 }: ParticleKProps) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

        <KParticles scrollProgress={scrollProgress} />
        <GlowingSpheres scrollProgress={scrollProgress} />
        <FloatingCrystals scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
