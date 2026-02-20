'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// --- Custom Shader Material ---
const HolographicMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uHover: { value: 0 },
        uTexture: { value: null }
    },
    vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Subtle breathing
      float hoverWave = sin(uv.y * 10.0 + uTime * 2.0) * 0.02 * uHover;
      pos.z += hoverWave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
    fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vec2 uv = vUv;

      // RGB Shift Effect based on hover
      float shift = 0.02 * uHover;
      float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
      
      // Scanline effect
      float scanline = sin(uv.y * 800.0 + uTime * 10.0) * 0.1 * uHover;
      
      vec3 color = vec3(r, g, b) + scanline;
      
      // Vignette
      float dist = distance(uv, vec2(0.5));
      color *= 1.0 - (dist * 0.5);

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

function ShaderImage({ img, url }: { img: string, url: string }) {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const texture = useTexture(img);

    // Clone material to avoid sharing uniforms between instances
    const material = useMemo(() => {
        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uHover: { value: 0 },
                uTexture: { value: texture }
            },
            vertexShader: HolographicMaterial.vertexShader,
            fragmentShader: HolographicMaterial.fragmentShader,
            transparent: true
        });
        return mat;
    }, [texture]);

    useFrame((state, delta) => {
        if (material) {
            material.uniforms.uTime.value = state.clock.elapsedTime;
            // Smooth lerp for hover state
            material.uniforms.uHover.value = THREE.MathUtils.lerp(
                material.uniforms.uHover.value,
                hovered ? 1 : 0,
                delta * 5
            );
        }
        if (mesh.current) {
            // Slight tilt follows mouse? For now just static smooth rotation reset
            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, hovered ? 0.1 : 0, delta * 2);
        }
    });

    return (
        <mesh
            ref={mesh}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            onClick={() => window.open(url, '_blank')}
            scale={[4, 3, 1]} // 4:3 Aspect
        >
            <planeGeometry args={[1, 1, 32, 32]} />
            <primitive object={material} attach="material" />
        </mesh>
    );
}

export function ThreeProjectCard({
    title,
    desc,
    img,
    link,
    tags,
    category
}: {
    title: string,
    desc: string,
    img: string,
    link: string,
    tags: string[],
    category: string
}) {
    return (
        <div className="relative group w-full aspect-[4/3] bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-500 flex flex-col shadow-2xl">

            {/* 3D Canvas Layer */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 2.5] }}>
                    <ambientLight intensity={1} />
                    <ShaderImage img={img} url={link} />
                </Canvas>
            </div>

            {/* Overlay UI */}
            <div className="absolute inset-0 z-10 pointer-events-none p-8 flex flex-col justify-between bg-gradient-to-tr from-black/80 via-transparent to-black/20 opacity-90">
                <div className="flex justify-between items-start translate-y-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md">
                        {category}
                    </span>
                </div>

                <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-4xl font-black uppercase text-white mb-2 drop-shadow-lg">{title}</h3>
                    <p className="text-zinc-200 text-sm max-w-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed font-medium shadow-black drop-shadow-md">
                        {desc}
                    </p>
                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        {tags.map(t => (
                            <span key={t} className="px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-mono uppercase text-white/80 border border-white/10">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Link click handler */}
            <a href={link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label={`View ${title}`} />
        </div>
    );
}
