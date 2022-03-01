import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'
import TWEEN from '@tweenjs/tween.js'

import {
  MeshPhongMaterial,
  BoxGeometry,
  Mesh,
  Vector3,
  Object3D,
  Group,
} from 'three'

import { randomRoundNumber } from '#tools'

const WIDTH_SEGMENTS = 10
const HEIGHT_SEGMENTS = 1
const DEPTH_SEGMENTS = 10

const grassMaterialLight = new MeshPhongMaterial({ color: 0xb6dd94, flatShading: true })
const grassMaterialDark = new MeshPhongMaterial({ color: 0x98bf76, flatShading: true })

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

      v.setXYZ(i, vt.x + randomX, vt.y + randomY, vt.z + randomZ)
    }
  }

  geometry.attributes.position.needsUpdate = true
}

/**
 * Grass game piece.
 *
 * @todo Merge meshes for every tile in the game that uses grass as the base
 * tile. This way, instead of having 11x11 geometriesLight, we can have 1 geometry
 * and save _a lot_ on draw calls.
 */
class Grass {

  _tiles = []

  _grassLight = new Object3D()
  _grassDark = new Object3D()
  _grassAll = new Group()

  /**
   * Initialize the tile.
   *
   * @param {Object} position - The position of the tile.
   */
  constructor () { }

  add (options) {
    this._tiles.push(options)
  }

  reset () {
    this._tiles = []
    this._grassLight = new Object3D()
    this._grassDark = new Object3D()
    this._grassAll = new Group()
  }

  /**
   * Creates the tile.
   */
  create () {
    const geometriesLight = []
    const geometriesDark = []

    this._tiles.forEach(tile => {
      const geo = new BoxGeometry(10, 1, 10, WIDTH_SEGMENTS, HEIGHT_SEGMENTS, DEPTH_SEGMENTS)
      randomizeGeometry(geo)
      geo.rotateY((randomRoundNumber(0, 4) * 2) * (-Math.PI / 4))
      geo.translate(tile.position.x * 10, -0.5 + (tile.position.y * 5), tile.position.z * 10)

      if ((tile.position.x & 1 && tile.position.z & 1) || (!(tile.position.x & 1) && !(tile.position.z & 1))) {
        geometriesLight.push(geo)
      } else {
        geometriesDark.push(geo)
      }
    })

    if (this._tiles.length) {
      if (geometriesLight.length) {
        const mergedGeometriesLight = mergeBufferGeometries(geometriesLight)
        this._grassLight = new Mesh(mergedGeometriesLight, grassMaterialLight)
        this._grassLight.receiveShadow = true
      }

      if (geometriesDark.length) {
        const mergedGeometriesDark = mergeBufferGeometries(geometriesDark)
        this._grassDark = new Mesh(mergedGeometriesDark, grassMaterialDark)
        this._grassDark.receiveShadow = true
      }

      this._grassAll.add(this._grassLight, this._grassDark)
      this._grassAll.scale.setScalar(0)
    }

    return this._grassAll
  }

  animateIn () {
    if (!this._tiles.length) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      const from = { scale: 0 }
      const to = { scale: 1 }

      this.animateUpdate(from)

      new TWEEN.Tween(from)
        .to(to, 500)
        .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(() => this.animateUpdate(from))
        .onComplete(resolve)
        .delay(250)
        .start()
    })
  }

  animateOut () {
    if (!this._tiles.length) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      const from = { scale: 1 }
      const to = { scale: 0 }

      new TWEEN.Tween(from)
        .to(to, 500)
        .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(() => this.animateUpdate(from))
        .onComplete(resolve)
        .delay(1000)
        .start()
    })
  }

  animateUpdate (from) {
    this._grassAll.scale.setScalar(from.scale)
  }

}

const grass = new Grass()

export default grass
