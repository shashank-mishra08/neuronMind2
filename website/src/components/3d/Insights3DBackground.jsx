import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Strand = ({ zOffset, baseFrequency, speed, phase }) => {
  const lineRef = useRef();
  
  const pointsCount = 150; // High resolution for smooth curves
  const length = 50; // Wide enough to cover the screen
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(pointsCount * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = geometry.attributes.position.array;
    
    for (let i = 0; i < pointsCount; i++) {
      const x = (i / pointsCount) * length - (length / 2);
      
      // Create a complex organic flowing wave using multiple sine waves
      // The wave height is also dampened near the edges so it fades out smoothly
      const edgeDampening = Math.sin((i / pointsCount) * Math.PI); 
      
      const wave1 = Math.sin(x * baseFrequency + time * speed + phase);
      const wave2 = Math.cos(x * baseFrequency * 0.7 - time * speed * 0.8 + phase) * 0.8;
      const wave3 = Math.sin(x * baseFrequency * 0.3 + time * speed * 0.5) * 1.5;
      
      // Base height drops lower the further back it is
      const yOffset = -3 + (zOffset * 0.1);
      
      const y = (wave1 + wave2 + wave3) * edgeDampening * 1.2 + yOffset;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = zOffset;
    }
    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial 
        color="#247ca8" 
        transparent 
        opacity={0.15 + (zOffset + 15) * 0.015} // Made lines more visible
        linewidth={1}
      />
    </line>
  );
};

const FlowingLines = () => {
  const strands = useMemo(() => {
    const items = [];
    const numStrands = 300; // Extremely dense lines
    
    for (let i = 0; i < numStrands; i++) {
      // Spread strands from front (z=5) to back (z=-15)
      const zOffset = 5 - (i / numStrands) * 20; 
      
      // Slightly vary the frequency and speed to make them overlap organically
      const baseFrequency = 0.15 + (i * 0.002);
      const speed = 0.4 + (i % 3) * 0.1;
      const phase = i * 0.2;
      
      items.push(
        <Strand 
          key={i} 
          zOffset={zOffset} 
          baseFrequency={baseFrequency} 
          speed={speed} 
          phase={phase} 
        />
      );
    }
    return items;
  }, []);
  
  return (
    <group rotation={[0.1, 0, 0]}>
      {strands}
    </group>
  );
};

const Insights3DBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ opacity: 0.9 }}>
      <Canvas camera={{ position: [0, 1, 12], fov: 45 }}>
        {/* Very subtle fog to fade out the waves in the distance */}
        <fog attach="fog" args={['#fcfdfd', 5, 25]} />
        <FlowingLines />
      </Canvas>
      {/* Overlay gradients to blend seamlessly into the white page */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fcfdfd]/60 via-transparent to-[#fcfdfd] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfd]/90 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Insights3DBackground;
