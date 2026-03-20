import { Suspense, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Box3, Sphere } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import pcbModelUrl from '../assets/PSOC6_Ivan_branded.glb?url'

type PcbDisplayProps = {
  scrollY: number
}

function PCBModel({ scrollY }: PcbDisplayProps) {
  const gltf = useLoader(GLTFLoader, pcbModelUrl)
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene])
  const { viewport } = useThree()

  const boundingRadius = useMemo(() => {
    const bounds = new Box3().setFromObject(scene)
    const sphere = new Sphere()
    bounds.getBoundingSphere(sphere)
    return sphere.radius > 0 ? sphere.radius : 1
  }, [scene])

  const fittedScale = useMemo(() => {
    const minViewportDimension = Math.min(viewport.width, viewport.height)
    const safeViewportCoverage = 1.1
    return (minViewportDimension * safeViewportCoverage) / (2 * boundingRadius)
  }, [boundingRadius, viewport.height, viewport.width])

  useFrame(() => {
    const targetYRotation = Math.PI + scrollY * 0.005
    scene.rotation.y = targetYRotation
    scene.rotation.x = -0.25
  })

  return <primitive object={scene} scale={fittedScale} position={[0, 0, 0]} />
}

export default function PcbDisplay({ scrollY }: PcbDisplayProps) {
  return (
    <>
      <Canvas camera={{ position: [0, 1, 7.6], fov: 45 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 5, 2]} intensity={2} />
        <directionalLight position={[-2, -1, -2]} intensity={0.5} />
        <Suspense fallback={null}>
          <PCBModel scrollY={scrollY} />
        </Suspense>
      </Canvas>
      <div className="overlay">
        <h1>PSOC6 PCB</h1>
        <p>Custom BLE enabled wireless processor board designed in Altium</p>
      </div>
    </>
  )
}
