import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Cloud, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const ParticleLayer = ({ count = 100, color = "#FFD700", size = 0.05, speed = 0.001 }) => {
    const points = useMemo(() => {
        const p = new Array(count * 3).fill(0).map(() => (Math.random() - 0.5) * 30);
        return new Float32Array(p);
    }, [count]);

    const ref = useRef();
    useFrame((state) => {
        ref.current.rotation.y += speed;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={size} color={color} transparent opacity={0.3} sizeAttenuation />
        </points>
    );
};

const DivineGlow = ({ isDark }) => {
    const materialRef = useRef();
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.opacity = (isDark ? 0.15 : 0.4) + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        }
    });

    return (
        <mesh position={[5, 8, -15]}>
            <sphereGeometry args={[18, 32, 32]} />
            <meshBasicMaterial
                ref={materialRef}
                color={isDark ? "#D4AF37" : "#FFFFFF"}
                transparent
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
};

const Dove = ({ index }) => {
    const ref = useRef();
    const speed = useMemo(() => 0.01 + Math.random() * 0.01, []);
    const initialPos = useMemo(() => [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15 - 5
    ], []);

    useFrame((state) => {
        ref.current.position.x += speed;
        if (ref.current.position.x > 30) ref.current.position.x = -30;
        ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.002;
    });

    return (
        <group ref={ref} position={initialPos}>
            <mesh scale={[0.15, 0.03, 0.3]}>
                <boxGeometry />
                <meshBasicMaterial color="white" transparent opacity={0.08} />
            </mesh>
        </group>
    );
};

const Scene = ({ isDark }) => {
    const { viewport, mouse } = useThree();
    const groupRef = useRef();

    const cloudColor = isDark ? "#1a1a2e" : "#ffffff";
    const particleColor = isDark ? "#FFD700" : "#d4af37";

    useFrame((state) => {
        // Mouse parallax effect
        const targetX = mouse.x * 2.5;
        const targetY = mouse.y * 1.5;
        groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.03;
        groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.03;
    });



    return (
        <group ref={groupRef}>
            <ambientLight intensity={isDark ? 0.3 : 2.5} />
            <pointLight position={[10, 10, 5]} intensity={isDark ? 2 : 2} color={isDark ? "#FFD700" : "#ffffff"} />

            {/* Soft Divine Glow */}
            <DivineGlow isDark={isDark} />

            {/* Depth Cloud System */}
            <Cloud
                opacity={isDark ? 0.4 : 0.15}
                speed={0.08}
                width={15}
                depth={2}
                segments={25}
                color={cloudColor}
                position={[0, 2, -10]}
            />
            <Cloud
                opacity={isDark ? 0.25 : 0.1}
                speed={0.12}
                width={20}
                depth={3}
                segments={20}
                color={cloudColor}
                position={[8, -3, -15]}
            />
            <Cloud
                opacity={isDark ? 0.2 : 0.08}
                speed={0.05}
                width={25}
                depth={4}
                segments={15}
                color={cloudColor}
                position={[-10, 5, -20]}
            />

            {/* Multi-layered Particles */}
            <ParticleLayer count={150} color={particleColor} size={0.06} speed={0.0008} />
            <ParticleLayer count={300} color={isDark ? "#FFFFFF" : "#FFF5CC"} size={0.03} speed={0.0004} />

            {/* Distant Doves */}
            {[...Array(5)].map((_, i) => (
                <Dove key={i} index={i} />
            ))}

            {isDark && <Stars radius={150} depth={60} count={3000} factor={4} saturation={0} fade speed={0.8} />}
        </group>
    );
};

const DivineBackground3D = ({ isDark = true }) => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            background: isDark
                ? 'radial-gradient(circle at 50% 50%, #050505 0%, #000000 100%)'
                : 'radial-gradient(circle at 50% 50%, #fff9f0 0%, #f7e7ce 100%)',
            overflow: 'hidden'
        }}>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <Scene isDark={isDark} />
            </Canvas>
            {/* Divine Light Rays Overlay (CSS for better control/lightweight) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle at 80% 20%, ${isDark ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 223, 100, 0.3)'} 0%, transparent 60%)`,
                pointerEvents: 'none',
                zIndex: 1
            }} />
        </div>
    );
};

export default DivineBackground3D;
