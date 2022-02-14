import GameTile from '#native/classes/base/game-tile'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'

import {
  MeshPhongMaterial,
  BoxGeometry,
  Mesh,
  Vector3,
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
export default class Grass extends GameTile {

  _tiles = [
    { x: -1, y: 0, z: -1 },
    { x: 0, y: 0, z: -1 },
    { x: 1, y: 0, z: -1 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: -1, y: 0, z: 1 },
    { x: 0, y: 0, z: 1 },
    { x: 1, y: 0, z: 1 },
  ]

  /**
   * Initialize the tile.
   *
   * @param {Object} position - The position of the tile.
   */
  constructor({ position = { x: 0, y: 0, z: 0 } } = {}) {
    super({ position })

    return this.create()
  }

  /**
   * Creates the tile.
   */
  create() {
    const grasses = []

    this._tiles.forEach(tile => {
      const geo = new BoxGeometry(10, 1, 10, WIDTH_SEGMENTS, HEIGHT_SEGMENTS, DEPTH_SEGMENTS)
      randomizeGeometry(geo)
      geo.rotateY((randomRoundNumber(0, 4) * 2) * (-Math.PI / 4))
      geo.translate(tile.x * 10, -0.5 + (tile.y * 5), tile.z * 10)

      grasses.push(geo)
    })

    const all = mergeBufferGeometries(grasses)

    const grass = new Mesh(all, grassMaterial)
    grass.receiveShadow = true

    return grass
  }

}
