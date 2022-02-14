import {
  Group,
  DodecahedronGeometry,
  InstancedMesh,
  MeshPhongMaterial,
  Color,
  Object3D,
} from 'three'

import { dodecahedronGeometry } from '#geometries'

import { updatables } from '#native/renderer'
import Clock from '#native/clock'

import { randomRoundNumber } from '#/tools'

import {
  CLOUD_1,
  CLOUD_2,
  CLOUD_3,
} from '#/colors'

const AMOUNT = 8

const material = new MeshPhongMaterial({ flatShading: true, transparent: true, opacity: 0.75 })

const colors = [CLOUD_1, CLOUD_2, CLOUD_3]

const dummy = new Object3D()

const getScale = (tick, delay) => {
  return 1 + (Math.sin((tick + delay) * 5 / Math.PI) / 10)
}

export default function Clouds(altitude = 0) {
  const instances = []

  const clouds = new Group()
  const cloud = new InstancedMesh(dodecahedronGeometry, material, AMOUNT)
  const color = colors[randomRoundNumber(0, colors.length - 1)]

  for (let i = 0; i < AMOUNT; i++) {
    instances.push({
      pos: {
        x: -3 + (Math.random() * 6),
        y: -0.2 + Math.random() * 0.4,
        z: -3 + (Math.random() * 6),
      },
      rot: {
        x: (Math.PI * 2) * Math.random(),
        y: (Math.PI * 2) * Math.random(),
        z: (Math.PI * 2) * Math.random(),
      },
      animation: (Math.random() > 0.5 ? 1 : - 1),
      scale: 0.5 + (Math.random() * 1.5),
      mesh: dummy
    })
  }

  clouds.add(cloud)

  instances.forEach((instance, index) => {
    const { pos, rot, scale, mesh } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot

    mesh.position.set(posX, posY * scale, posZ)
    mesh.rotation.set(rotX, rotY, rotZ)
    mesh.scale.setScalar(scale)
    mesh.updateMatrixWorld(true)

    cloud.setMatrixAt(index, mesh.matrixWorld)
    cloud.setColorAt(index, color)
  })

  cloud.instanceMatrix.needsUpdate = true
  cloud.position.y = altitude * 5

  /**
   * Animations
   */
  clouds.tick = () => {
    const tick = Clock.getElapsedTime() * Math.PI / 20

    instances.forEach((instance, index) => {
      const scale = getScale(tick, (index * 200))
      cloud.getMatrixAt(index, dummy.matrix)
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale)
      dummy.rotation.z = tick * instance.animation
      dummy.scale.setScalar(scale)
      dummy.matrix.compose(dummy.position, dummy.quaternion, dummy.scale)
      dummy.updateMatrixWorld(true)

      cloud.setMatrixAt(index, dummy.matrixWorld)
    })

    cloud.instanceMatrix.needsUpdate = true
  }

  // Add the clouds to the list of animations.
  updatables.push(clouds)

  return clouds
}
