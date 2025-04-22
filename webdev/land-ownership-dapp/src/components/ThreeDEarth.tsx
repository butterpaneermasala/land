'use client';

import React, { useEffect, useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_PATH = '/model/scene.gltf'; // Make sure it's inside `public/models`

function EarthModel() {
  const { scene } = useGLTF(MODEL_PATH);
  const modelRef = useRef<THREE.Group>(scene);

  // Optional: interactive rotation like the eye example
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = -Math.PI / 2 + (mouse.x * 0.001);
      modelRef.current.rotation.x = mouse.y * 0.001;
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -0.5, 0]} />;
}

const ThreeDEarth: React.FC = () => {
  return (
    <div className="w-[300px] h-[300px] mx-auto">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <EarthModel />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default ThreeDEarth;
