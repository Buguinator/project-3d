import {useState } from 'react'

export default function Box({hovered, setHover}) {
  // Return view, these are regular three.js elements expressed in JSX
  return (
      

<mesh
      position={[10, 5, -6]}  
      scale={2.6}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry attach="geometry" args={[.5, .5, .5]}  />
      <meshStandardMaterial attach="material" color={hovered ? '#ff00ff' : 'orange'} transparent={true} opacity={.3} />
    </mesh>
  )
}