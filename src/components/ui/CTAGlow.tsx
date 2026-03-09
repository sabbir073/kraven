'use client';

import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const EdgeFade = () => {
  const uniforms = useMemo(
    () => ({}),
    []
  );

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;

    void main() {
      // Left edge fade: black at x=0, transparent by x=0.2
      float leftFade = smoothstep(0.2, 0.0, vUv.x);

      // Right edge fade: black at x=1, transparent by x=0.8
      float rightFade = smoothstep(0.8, 1.0, vUv.x);

      // Bottom fade: black at y=0, transparent by y=0.35
      float bottomFade = smoothstep(0.35, 0.0, vUv.y);

      // Combine - max of all fades
      float alpha = max(max(leftFade, rightFade), bottomFade);

      // Corner blend - extra darkness in bottom corners
      float cornerL = (1.0 - smoothstep(0.0, 0.3, vUv.x)) * (1.0 - smoothstep(0.0, 0.4, vUv.y));
      float cornerR = smoothstep(0.7, 1.0, vUv.x) * (1.0 - smoothstep(0.0, 0.4, vUv.y));
      alpha = max(alpha, max(cornerL, cornerR));

      alpha = clamp(alpha, 0.0, 1.0);

      gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
    }
  `;

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

export const CTAGlow = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 60, near: 0.1, far: 10 }}
        gl={{ alpha: true, antialias: false }}
        style={{ background: 'transparent' }}
        orthographic={false}
      >
        <EdgeFade />
      </Canvas>
    </div>
  );
};
