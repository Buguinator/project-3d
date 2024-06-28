import { Suspense, useEffect, useState } from 'react'
import './App.css'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Stars } from '@react-three/drei'
import { PerspectiveCamera, SpotLight } from 'three'
import { useSpring, a } from "@react-spring/three"

// Modelos
import Island from '../public/Island'
import Room from '../public/Room'


import Logo from './assets/logotipo.png'

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

const SceneThrejs = () => {
  return(
    <>
      <Canvas 
        // postion: [X, Y , Z]
        // PerspectiveCamera
        camera={{ position:[0, 5, 0], fov:25 }}
        //OrthograpicCamera
        // orthographic
        // camera={{ position: [-3, 3, 0], left: 0, right: 1, top:0, bottom:-2, zoom: 10  }}
        >
        <OrbitControls 
          // autoRotate 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 4} 
          // minPolarAngle={Math.PI / 4} 
          />
        <ambientLight />
        <Suspense fallback={null}>
          {/* X == red, Y == green, Z == blue */}
          {/* eslint-disable-next-line react/no-unknown-property */}
          <axesHelper args={[10]} />  
          <Suspense fallback={null}>
            <Island />
          </Suspense>
          <CameraHelper />
        </Suspense>
        <Environment preset='sunset' />
      </Canvas>
    </>
  )
}

const Cubito =({positionInitial, color, camEnabled, setCamEnabled, positionFinal}) => {

  const handleClick = () => {
    setCamEnabled(!camEnabled);
  }

  const cubitoAnimado = useSpring({
    rotation: camEnabled ? positionFinal : positionInitial,
    position: camEnabled ? positionFinal : positionInitial,
  })

  return (
    <a.mesh rotation={cubitoAnimado.rotation} position={cubitoAnimado.position} onClick={handleClick} scale={4}>
      <boxGeometry attach="geometry" args={[.5, .5, .5]}  />
      <meshStandardMaterial attach="material" color={'#'+color} />
    </a.mesh>
  )
}

function App() {
  const [camEnabled, setCamEnabled] = useState(false)

  return (
    <>
      {/* <div className='container'>
        <img src={Logo} alt="Logo Amphis Clothing" className='image' />
      </div>
      <div className='container-loop'>
        <div className='loop'>
          <h2>PRÓXIMAMENTE</h2>
        </div>
      </div> */}
      {/* <SceneThrejs /> */}
        
        <Canvas camera={{ position:[90, 20, 120], fov:45 }} >
        {/* <OrbitControls />  */}
        <Lights />
        <Stars />
        <Cubito 
          positionInitial={[0, 0, 0]} 
          positionFinal={[0, 2, 0]} 
          color={'FFC0CB'} 
          camEnabled={camEnabled} 
          setCamEnabled={setCamEnabled} 
          />
          <Room />
        <axesHelper args={[10]} />  
        <Environment preset='sunset' />
      </Canvas>
    </>
  )
}

export default App
