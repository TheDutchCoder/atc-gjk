/**
 * @todo Remove dirt and make it 1 block under all tiles (saves draw calls)
 */

import {
  Group,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  Vector3,
} from 'three'

const WIDTH_SEGMENTS = 10
const HEIGHT_SEGMENTS = 1
const DEPTH_SEGMENTS = 10

const grassMaterial = new MeshPhongMaterial({ color: 0xb6dd94, flatShading: true })

const dirtGeometry = new BoxGeometry(10, 3, 10)
const dirtMaterial = new MeshPhongMaterial({ color: 0xa58670, flatShading: true })

const processGrass = (geometry) => {
  const v = geometry.getAttribute('position')
  const vt2 = new Vector3()

  for (let i = 0; i < v.count; i++) {
    const vt = new Vector3()
    vt.fromBufferAttribute(v, i)

    if (vt.y >= 0.5 && (vt.x !== -5 && vt.x !== 5 && vt.z !== -5 && vt.z !== 5)) {
      const randomY = 0.15 - (Math.random() * 0.3)
      const randomX = (WIDTH_SEGMENTS / 40) - (Math.random() * (WIDTH_SEGMENTS / 20))
      const randomZ = (DEPTH_SEGMENTS / 40) - (Math.random() * (DEPTH_SEGMENTS / 20))

      for (let y = 0; y < v.count; y++) {
        vt2.fromBufferAttribute(v, y)

        if (vt.x === vt2.x && vt.y === vt2.y && vt.z === vt2.z) {
          v.setXYZ(i, vt.x + randomX, vt.y + randomY, vt.z + randomZ);
          v.setXYZ(y, vt2.x + randomX, vt2.y + randomY, vt2.z + randomZ);
        }
      }
    }
  }

  geometry.attributes.position.needsUpdate = true
}

export default function Block() {
  const block = new Group()

  const grassGeometry = new BoxGeometry(10, 1, 10, WIDTH_SEGMENTS, HEIGHT_SEGMENTS, DEPTH_SEGMENTS)
  processGrass(grassGeometry)

  const grass = new Mesh(grassGeometry, grassMaterial)
  grass.receiveShadow = true
  grass.position.y = -0.5

  const dirt = new Mesh(dirtGeometry, dirtMaterial)
  dirt.position.y = -2.5

  block.add(grass, dirt)

  return block
}
