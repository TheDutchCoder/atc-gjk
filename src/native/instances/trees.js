import {
  Group,
  ConeGeometry,
  InstancedMesh,
  MeshPhongMaterial,
  Euler,
  Object3D,
  Vector3,
  Scene,
} from 'three'

import {
  TREE_BASE,
  TREE_1,
  TREE_2,
  TREE_3,
  TREE_4,
} from '#/colors'

import {
  defaultMaterial,
} from '#materials'

import { coneGeometry } from '#geometries'

import { randomRoundNumber, randomNumber } from '#/tools'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'

const AMOUNT = 12
const colors = [TREE_1, TREE_2, TREE_3, TREE_4]

const vectorY = new Vector3(0, 1, 0)
const dummy = new Object3D()

export default function Trees(excludes = { x: { min: 0, max: 0 }, z: { min: 0, max: 0 } }) {
  const instances = []
  const trees = new Group()

  const base = new InstancedMesh(coneGeometry, defaultMaterial, AMOUNT)
  base.castShadow = true

  // const bottomLayer = new InstancedMesh(coneGeometry, defaultMaterial, AMOUNT)
  // bottomLayer.castShadow = true
  // bottomLayer.receiveShadow = true

  // const topLayer = new InstancedMesh(coneGeometry, defaultMaterial, AMOUNT)
  // topLayer.castShadow = true
  // topLayer.receiveShadow = true

  const merged = mergeBufferGeometries([bottomLayer.geometry, topLayer.geometry])
  merged.castShadow = true
  merged.receiveShadow = true

  for (let i = 0; i < AMOUNT; i++) {
    instances.push({
      pos: {
        x: randomNumber(-4.75, 4.75, excludes.x),
        y: 0,
        z: randomNumber(-4.75, 4.75, excludes.z),
      },
      scale: 0.5 + (Math.random() * 0.75),
      mesh: dummy
    })
  }

  trees.add(base, merged)

  instances.forEach((instance, index) => {
    const { pos, rot, scale, mesh } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const color = colors[randomRoundNumber(0, colors.length - 1)]
    const randomRotationX = randomNumber(-0.12, 0.12)
    const randomRotationY = randomNumber(-0.12, 0.12)
    const euler = new Euler(randomRotationX, randomRotationY, 0, 'XYZ')

    mesh.position.set(posX, (posY + coneGeometry.parameters.height / 2) * scale, posZ)
    mesh.setRotationFromEuler(euler)
    mesh.scale.setScalar(scale)
    mesh.updateMatrixWorld(true)

    base.setMatrixAt(index, mesh.matrixWorld)
    base.setColorAt(index, TREE_BASE)

    mesh.translateOnAxis(vectorY, 0.5 * scale)
    mesh.scale.setScalar(scale * 1.3)
    mesh.updateMatrixWorld(true)

    merged.setMatrixAt(index, mesh.matrixWorld)
    merged.setColorAt(index, color)

    // mesh.translateOnAxis(vectorY, 0.6 * scale)
    // mesh.scale.setScalar(scale * 1.1)
    // mesh.updateMatrixWorld(true)

    // topLayer.setMatrixAt(index, mesh.matrixWorld)
    // topLayer.setColorAt(index, color)
  })

  base.instanceMatrix.needsUpdate = true
  merged.instanceMatrix.needsUpdate = true
  merged.instanceColor.needsUpdate = true
  // topLayer.instanceMatrix.needsUpdate = true
  // topLayer.instanceColor.needsUpdate = true

  return trees
}
