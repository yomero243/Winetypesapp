import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import WineButtons from './components/WineButtons';
import vinos from './vinos.jsx';

// Componente para las luces rotativas
function RotatingLights() {
  const light1Ref = useRef();
  const light2Ref = useRef();
  const light3Ref = useRef();

  // Estado para controlar el tiempo de cambio de color
  const timeRef = useRef(0);
  
  useFrame((state, delta) => {
    timeRef.current += delta;
    
    // Rotación de las luces
    const radius = 3;
    const speed = 0.5;
    
    // Luz 1
    light1Ref.current.position.x = Math.sin(timeRef.current * speed) * radius;
    light1Ref.current.position.z = Math.cos(timeRef.current * speed) * radius;
    
    // Luz 2 (desfasada 120 grados)
    light2Ref.current.position.x = Math.sin(timeRef.current * speed + (2 * Math.PI / 3)) * radius;
    light2Ref.current.position.z = Math.cos(timeRef.current * speed + (2 * Math.PI / 3)) * radius;
    
    // Luz 3 (desfasada 240 grados)
    light3Ref.current.position.x = Math.sin(timeRef.current * speed + (4 * Math.PI / 3)) * radius;
    light3Ref.current.position.z = Math.cos(timeRef.current * speed + (4 * Math.PI / 3)) * radius;
    
    // Cambio de colores aleatorio cada 2 segundos
    if (timeRef.current % 2 < delta) {
      const randomColor1 = new THREE.Color(Math.random(), Math.random(), Math.random());
      const randomColor2 = new THREE.Color(Math.random(), Math.random(), Math.random());
      const randomColor3 = new THREE.Color(Math.random(), Math.random(), Math.random());
      
      light1Ref.current.color = randomColor1;
      light2Ref.current.color = randomColor2;
      light3Ref.current.color = randomColor3;
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
  const { scene } = useGLTF('/untitled.glb');
  
  // Configurar escala y posición inicial
  scene.scale.set(2, 2, 2);
  scene.position.set(0, 0, 0);
  
  // Añadir rotación continua
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= delta * 0.5; // Valor negativo para girar a la derecha
    }
  });

  return <primitive ref={modelRef} object={scene} />;
}

function App() {
  return (
    <div className="min-h-screen" style={{ 
      backgroundImage: "url('/background.jpg')",
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'auto'
    }}>
      <div className="py-4">
        <h1 className="text-3xl font-bold text-center text-black mb-4">
        Types of wines
        </h1>

        <div className="relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 
                        h-[600px] w-full max-w-[800px] z-0">
            <Canvas 
              camera={{ 
                position: [0, 0, 8],
                fov: 50,
                near: 0.1,
                far: 1000
              }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <ambientLight intensity={0.5} />
              <RotatingLights />
              <Model />
            </Canvas>
          </div>
          
          <div className="relative z-10 pt-[100px]">
            <WineButtons wineData={vinos} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Precargar el modelo
useGLTF.preload('/ruta/a/tu/modelo.glb');

export default App;