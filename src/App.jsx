import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import WineButtons from './components/WineButtons';
import vinos from './vinos.jsx';
import SearchBar from './components/searchbar.jsx';

// Definir constantes para valores repetidos
const RADIUS = 3;
const SPEED = 1.5;
const MODEL_PATH = '/untitled.glb';

// Componente para las luces rotativas
function RotatingLights() {
  const light1Ref = useRef();
  const light2Ref = useRef();
  const light3Ref = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    const currentTime = timeRef.current += delta;
    const angleBase = currentTime * SPEED;
    
    const sinBase = Math.sin(angleBase);
    const cosBase = Math.cos(angleBase);

    light1Ref.current.position.set(sinBase * RADIUS, 5, cosBase * RADIUS);
    light2Ref.current.position.set(
      Math.sin(angleBase + (2 * Math.PI / 3)) * RADIUS,
      5,
      Math.cos(angleBase + (2 * Math.PI / 3)) * RADIUS
    );
    light3Ref.current.position.set(
      Math.sin(angleBase + (4 * Math.PI / 3)) * RADIUS,
      5,
      Math.cos(angleBase + (4 * Math.PI / 3)) * RADIUS
    );

    if (currentTime % 2 < delta) {
      const getRandomColor = () => new THREE.Color(Math.random(), Math.random(), Math.random());
      [light1Ref, light2Ref, light3Ref].forEach(light => {
        light.current.color = getRandomColor();
      });
    }
  });

  return (
    <>
      <pointLight ref={light1Ref} position={[10, 5, 0]} intensity={10} />
      <pointLight ref={light2Ref} position={[-5, 5, 8.66]} intensity={22} />
      <pointLight ref={light3Ref} position={[-5, 5, -8.66]} intensity={14} />
    </>
  );
}

// Componente para el modelo
function Model() {
  const modelRef = useRef();
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    scene.scale.set(1.2, 1.2, 1.2);
    scene.position.set(0, 2, 0);
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= delta * 0.5;
    }
  });

  return <primitive ref={modelRef} object={scene} />;
}

function App() {
  return (
    <div className="min-h-screen relative pb-[100px]" style={{
      backgroundImage: 'url(background.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="py-4">
        <h1 className="text-6xl font-['Great_Vibes'] font-bold text-center text-black mb-4 relative z-0">
          Wine List
        </h1>

        <SearchBar />

        <div className="relative min-h-[800px]">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[800px] w-full max-w-[800px] z-10 overflow-visible">
            <Canvas 
              shadows
              camera={{ position: [0, 0, 8], fov: 50 }}
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                background: 'transparent',
                overflow: 'visible'
              }}>
              <Environment files="/royal_esplanade_4k.hdr" background={false} />
              <ambientLight intensity={1.5} />
              <RotatingLights />
              <Model />
            </Canvas>
          </div>
          
          <div className="absolute w-full px-4 z-20">
            <WineButtons wineData={vinos} />
          </div>
        </div>
      </div>

      <footer className="bg-black bg-opacity-80 text-white py-4 text-center fixed bottom-0 w-full">
        <p>© 2024 Types of Wines by Cardelli. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Precargar el modelo
useGLTF.preload(MODEL_PATH);

export default App;