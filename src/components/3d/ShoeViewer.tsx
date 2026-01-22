import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import { ShoeModel } from './ShoeModel';
import { motion } from 'framer-motion';
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface ShoeViewerProps {
  color?: string;
  interactive?: boolean;
  showControls?: boolean;
}

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#CCFF00" wireframe />
  </mesh>
);

export const ShoeViewer = ({ 
  color = '#CCFF00', 
  interactive = true,
  showControls = true 
}: ShoeViewerProps) => {
  const [autoRotate, setAutoRotate] = useState(!interactive);
  const [zoom, setZoom] = useState(4);

  const handleZoomIn = () => setZoom((prev) => Math.max(prev - 1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.min(prev + 1, 8));

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 1, zoom], fov: 45 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={2048}
        />
        <spotLight
          position={[-10, 5, -10]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#CCFF00"
        />
        <pointLight position={[0, -5, 0]} intensity={0.3} color="#CCFF00" />
        
        <Suspense fallback={<LoadingFallback />}>
          {interactive ? (
            <PresentationControls
              global
              rotation={[0.1, 0.4, 0]}
              polar={[-0.4, 0.4]}
              azimuth={[-Infinity, Infinity]}
              config={{ mass: 2, tension: 400 }}
              snap={{ mass: 4, tension: 300 }}
            >
              <ShoeModel color={color} autoRotate={autoRotate} />
            </PresentationControls>
          ) : (
            <ShoeModel color={color} autoRotate={true} />
          )}
          <ContactShadows
            position={[0, -0.6, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={4}
            color="#000000"
          />
          <Environment preset="city" />
        </Suspense>
        
        {interactive && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={8}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        )}
      </Canvas>

      {showControls && interactive && (
        <motion.div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-3 rounded-full glass transition-all duration-300 ${
              autoRotate ? 'text-primary glow-primary' : 'text-muted-foreground'
            }`}
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-3 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-3 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
