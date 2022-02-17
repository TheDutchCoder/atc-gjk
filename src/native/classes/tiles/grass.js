import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'
import TWEEN from '@tweenjs/tween.js'

import {
  MeshPhongMaterial,
  BoxGeometry,
  Mesh,
  Vector3,
  Object3D,
} from 'three'

import { randomRoundNumber } from '#tools'

const WIDTH_SEGMENTS = 10
const HEIGHT_SEGMENTS = 1
const DEPTH_SEGMENTS = 10

const grassMaterial = new MeshPhongMaterial({ color: 0xb6dd94, flatShading: true })

/**
 * Randomizes the vertices a bit to generate a more interesting landscape.
 *
 * @param {BufferGeometry} geometry - The geometry to process.
 */
const randomizeGeometry = (geometry) => {
  const v = geometry.getAttribute('position')

  for (let i = 0; i < v.count; i++) {
    const vt = new Vector3()
    vt.fromBufferAttribute(v, i)

    if (vt.y >= 0.5 && (vt.x !== -5 && vt.x !== 5 && vt.z !== -5 && vt.z !== 5)) {
      const randomY = 0.15 - (Math.random() * 0.3)
      const randomX = (WIDTH_SEGMENTS / 40) - (Math.random() * (WIDTH_SEGMENTS / 20))
      const randomZ = (DEPTH_SEGMENTS / 40) - (Math.random() * (DEPTH_SEGMENTS / 20))

      v.setXYZ(i, vt.x + randomX, vt.y + randomY, vt.z + randomZ);
    }
  }

  geometry.attributes.position.needsUpdate = true
}

/**
 * Grass game piece.
 *
 * @todo Merge meshes for every tile in the game that uses grass as the base
 * tile. This way, instead of having 11x11 geometries, we can have 1 geometry
 * and save _a lot_ on draw calls.
 */
class Grass {

  _tiles = []

  _grass = new Object3D()

  /**
   * Initialize the tile.
   *
   * @param {Object} position - The position of the tile.
   */
  constructor() { }

  add(options) {
    this._tiles.push(options)
  }

  /**
   * Creates the tile.
   */
  create() {
    const geometries = []

    this._tiles.forEach(tile => {
      const geo = new BoxGeometry(10, 1, 10, WIDTH_SEGMENTS, HEIGHT_SEGMENTS, DEPTH_SEGMENTS)
      randomizeGeometry(geo)
      geo.rotateY((randomRoundNumber(0, 4) * 2) * (-Math.PI / 4))
      geo.translate(tile.position.x * 10, -0.5 + (tile.position.y * 5), tile.position.z * 10)

      geometries.push(geo)
    })

    if (this._tiles.length) {
      const mergedGeometries = mergeBufferGeometries(geometries)

      this._grass = new Mesh(mergedGeometries, grassMaterial)
      this._grass.receiveShadow = true

      this.animateIn()
    }

    return this._grass
  }

  animateIn() {
    const from = { scale: 0 }
    const to = { scale: 1 }

    this.animateUpdate(from)

    new TWEEN.Tween(from)
      .to(to, 500)
      .easing(TWEEN.Easing.Elastic.InOut)
      .onUpdate(() => this.animateUpdate(from))
      .delay(250)
      .start()
  }

  animateUpdate(from) {
    this._grass.scale.setScalar(from.scale)
  }

}

const grass = new Grass()

export default grass
