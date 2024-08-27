import { Suspense, useEffect, useState } from 'react'
import './App.css'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Stars } from '@react-three/drei'
import { PerspectiveCamera, SpotLight } from 'three'
import { useSpring, a } from "@react-spring/three"

// Modelos
// import Island from '../public/Island'
import Gym from '../public/Gym'
import Industrial from '../public/Industrial'



const Lights = () => {
  return(
    <>
    <ambientLight intensity={0.8} />
    <directionalLight
      castShadow
      position={[-8, 16, -8]}
      intensity={0}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-rigth={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
      /> 
    <pointLight position={[0, 0, 0]} intensity={2} />
    </>
  )
}

const CameraHelper = () => {
  // PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
  const camera = new PerspectiveCamera(60, 1, 1, 3);
  // eslint-disable-next-line react/no-unknown-property
  return <group position={[0, 0, 2]}>
    {/* eslint-disable-next-line react/no-unknown-property */}
    <cameraHelper args={[camera]} />
  </group>;
}

function App() {
  const [camEnabled, setCamEnabled] = useState(false)

  return (
    <>  
      {/* <Canvas camera={{ position:[90, 20, 120], fov:45 }}> */}
      <Canvas>
        <OrbitControls /> 
        <Lights />
        {/* <Stars /> */}
        {/* <Cubito 
          positionInitial={[0, 0, 0]} 
          positionFinal={[0, 2, 0]} 
          color={'FFC0CB'} 
          camEnabled={camEnabled} 
          setCamEnabled={setCamEnabled} 
          /> */}
        <Suspense fallback={null}>
          <Industrial />
        </Suspense>
        {/* <Room /> */}
        <axesHelper args={[10]} />  
        {/* <Environment preset='sunset' /> */}
      </Canvas>
    </>
  )
}

export default App
