'use client';

import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

interface IridescenceProps {
    color?: number[];
    speed?: number;
    amplitude?: number;
    mouseInteraction?: boolean;
}

export default function Iridescence({
    color = [0.2, 0.1, 0.3], // Deep purple/blue mix
    speed = 1.0,
    amplitude = 0.5,
    mouseInteraction = true
}: IridescenceProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        const pixelRatio = typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 2 : 1;
        // Reduce load on mobile
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const renderer = new Renderer({
            alpha: true,
            dpr: isMobile ? 1 : Math.min(pixelRatio, 2)
        });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);

        function resize() {
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            // Update resolution uniform
            if (program) {
                program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height, 0);
            }
        }
        window.addEventListener('resize', resize);
        resize();
        container.appendChild(gl.canvas);

        const geometry = new Triangle(gl);

        const program = new Program(gl, {
            // ... (vertex shader unchanged)
            vertex: `
                attribute vec2 uv;
                attribute vec2 position;
                void main() {
                    gl_Position = vec4(position, 0, 1);
                }
            `,
            fragment: `
                precision highp float;
                // ... (fragment shader - unchanged)
                uniform float uTime;
                uniform vec3 uColor;
                uniform vec2 uResolution;
                uniform vec2 uMouse;
                uniform float uAmplitude;
                uniform float uSpeed;

                // Simplex 3D Noise 
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

                float snoise(vec3 v) {
                    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

                    // First corner
                    vec3 i  = floor(v + dot(v, C.yyy) );
                    vec3 x0 = v - i + dot(i, C.xxx) ;

                    // Other corners
                    vec3 g = step(x0.yzx, x0.xyz);
                    vec3 l = 1.0 - g;
                    vec3 i1 = min( g.xyz, l.zxy );
                    vec3 i2 = max( g.xyz, l.zxy );
                    vec3 x1 = x0 - i1 + C.xxx;
                    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
                    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

                    // Permutations
                    i = mod289(i);
                    vec4 p = permute( permute( permute(
                                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

                    // Gradients: 7x7 points over a square, mapped onto an octahedron.
                    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
                    float n_ = 0.142857142857; // 1.0/7.0
                    vec3  ns = n_ * D.wyz - D.xzx;

                    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

                    vec4 x_ = floor(j * ns.z);
                    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

                    vec4 x = x_ *ns.x + ns.yyyy;
                    vec4 y = y_ *ns.x + ns.yyyy;
                    vec4 h = 1.0 - abs(x) - abs(y);

                    vec4 b0 = vec4( x.xy, y.xy );
                    vec4 b1 = vec4( x.zw, y.zw );

                    //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
                    //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
                    vec4 s0 = floor(b0)*2.0 + 1.0;
                    vec4 s1 = floor(b1)*2.0 + 1.0;
                    vec4 sh = -step(h, vec4(0.0));

                    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

                    vec3 p0 = vec3(a0.xy,h.x);
                    vec3 p1 = vec3(a0.zw,h.y);
                    vec3 p2 = vec3(a1.xy,h.z);
                    vec3 p3 = vec3(a1.zw,h.w);

                    //Normalise gradients
                    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                    p0 *= norm.x;
                    p1 *= norm.y;
                    p2 *= norm.z;
                    p3 *= norm.w;

                    // Mix final noise value
                    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                    m = m * m;
                    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                                dot(p2,x2), dot(p3,x3) ) );
                }

                void main() {
                    vec2 st = gl_FragCoord.xy / uResolution.xy;
                    vec2 mouse = uMouse / uResolution.xy;
                    
                    float time = uTime * uSpeed * 0.2;
                    
                    // Base fluid movement
                    float noise1 = snoise(vec3(st.x * 2.0 + time, st.y * 3.0 - time, time));
                    float noise2 = snoise(vec3(st.x * 3.0 - time, st.y * 2.0 + time, time * 0.5));
                    
                    // Interaction
                    float dist = distance(st, vec2(mouse.x, 1.0 - mouse.y));
                    float interact = 0.0;
                    if(dist < 0.5) {
                        interact = (0.5 - dist) * 2.0 * uAmplitude;
                    }

                    // Iridescent color mixing
                    vec3 color = uColor;
                    
                    // Mix standard fluid colors
                    color.r += noise1 * 0.5 + interact;
                    color.g += noise2 * 0.5 + interact;
                    color.b += (noise1 + noise2) * 0.3 + interact;
                    
                    // Add ethereal glow
                    float glow = 0.05 / dist;
                    color += vec3(glow * 0.1);

                    gl_FragColor = vec4(color, 1.0);
                }
            `,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new Color(color[0], color[1], color[2]) },
                uResolution: { value: new Color(gl.canvas.width, gl.canvas.height, 0) },
                uMouse: { value: new Color(0, 0, 0) },
                uAmplitude: { value: amplitude },
                uSpeed: { value: speed }
            },
        });

        const mesh = new Mesh(gl, { geometry, program });
        let animationId: number;

        function update(t: number) {
            animationId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
        }
        animationId = requestAnimationFrame(update);

        function handleMouseMove(e: MouseEvent) {
            if (!mouseInteraction) return;
            const rect = container.getBoundingClientRect();
            program.uniforms.uMouse.value.set(e.clientX - rect.left, e.clientY - rect.top, 0);
        }

        // Touch support
        function handleTouchMove(e: TouchEvent) {
            if (!mouseInteraction) return;
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const rect = container.getBoundingClientRect();
                program.uniforms.uMouse.value.set(touch.clientX - rect.left, touch.clientY - rect.top, 0);
            }
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true }); // passive for performance


        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [color, speed, amplitude, mouseInteraction]);

    return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
