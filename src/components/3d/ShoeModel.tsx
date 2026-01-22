import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShoeModelProps {
  color?: string;
  autoRotate?: boolean;
}

export const ShoeModel = ({ color = '#CCFF00', autoRotate = true }: ShoeModelProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  const shoeColor = new THREE.Color(color);

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.5}>
      {/* Sole */}
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.25, 0.9]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      
      {/* Midsole */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[2.2, 0.2, 0.85]} />
        <meshStandardMaterial color={shoeColor} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Main body */}
      <mesh position={[0.1, 0.15, 0]} castShadow>
        <boxGeometry args={[1.8, 0.4, 0.75]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>

      {/* Toe box */}
      <mesh position={[1.0, 0.05, 0]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[0.6, 0.35, 0.7]} />
        <meshStandardMaterial color="#222222" roughness={0.5} />
      </mesh>

      {/* Heel counter */}
      <mesh position={[-0.85, 0.25, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.7]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>

      {/* Tongue */}
      <mesh position={[0.3, 0.45, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.8, 0.25, 0.5]} />
        <meshStandardMaterial color={shoeColor} roughness={0.5} />
      </mesh>

      {/* Collar */}
      <mesh position={[-0.4, 0.45, 0]} castShadow>
        <torusGeometry args={[0.35, 0.1, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>

      {/* Laces */}
      {[-0.1, 0.15, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0.38, 0]} castShadow>
          <boxGeometry args={[0.08, 0.03, 0.55]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      ))}

      {/* Brand stripe */}
      <mesh position={[0.2, 0.15, 0.38]} rotation={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[1.2, 0.08, 0.02]} />
        <meshStandardMaterial color={shoeColor} emissive={shoeColor} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.2, 0.15, -0.38]} rotation={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[1.2, 0.08, 0.02]} />
        <meshStandardMaterial color={shoeColor} emissive={shoeColor} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};
