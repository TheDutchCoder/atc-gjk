import GameTile from '#native/classes/base/game-tile'
import { MeshPhongMaterial, BoxGeometry, Group, Mesh, Vector3 } from 'three'
import { randomRoundNumber } from '#tools'
import TWEEN from '@tweenjs/tween.js'
import { animationsComplete } from '#native/events'

const WIDTH_SEGMENTS = 10
const HEIGHT_SEGMENTS = 1
const DEPTH_SEGMENTS = 10

const waterMaterial = new MeshPhongMaterial({ color: 0x7dd3fc, flatShading: true })

const dirtGeometry = new BoxGeometry(10, 3, 10)
const dirtMaterial = new MeshPhongMaterial({ color: 0xa58670, flatShading: true })

/**
 * Randomizes the vertices a bit to generate a more interesting landscape.
 *
 * @param {BufferGeometry} geometry - The geometry to process.
 * @todo share this for grass and water and add a max offset
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
 * Tile game piece.
 */
export default class Tile extends GameTile {

  _rotation = randomRoundNumber(0, 4) * 2

  _waterGeo = null

  /**
   * Initialize the tile.
   *
   * @param {Object} position - The position of the tile.
   */
  constructor({ position = { x: 0, y: 0, z: 0 } } = {}) {
    super({ position })

    this._hasAnimations = true
    this.isAnimating = true

    this.#create()
    this.#animateIn()
  }

  /**
   * Creates the tile.
   */
  #create() {
    const block = new Group()

    this._waterGeo = new BoxGeometry(10, 1, 10, WIDTH_SEGMENTS, HEIGHT_SEGMENTS, DEPTH_SEGMENTS)
    randomizeGeometry(this._waterGeo)

    const water = new Mesh(this._waterGeo, waterMaterial)
    water.castShadow = true
    water.receiveShadow = true
    water.position.y = -0.5
    water.rotation.y = this._rotation * (-Math.PI / 4)

    const dirt = new Mesh(dirtGeometry, dirtMaterial)
    water.castShadow = true
    dirt.position.y = -2.5

    block.add(water, dirt)

    block.scale.setScalar(0)

    block.tick = () => {
      this.#updateWater()
    }

    this.model = block
  }

  #updateWater() {
    const v = this._waterGeo.getAttribute('position')

    for (let i = 0; i < v.count; i++) {
      const vt = new Vector3()
      vt.fromBufferAttribute(v, i)
      const bob = Math.sin((this._tick + (i * 1.1)) / 10 / Math.PI) / 200

      if ((vt.x !== -5 && vt.x !== 5 && vt.z !== -5 && vt.z !== 5)) {
        v.setXYZ(i, vt.x, vt.y + bob, vt.z);
      }
    }

    this._waterGeo.attributes.position.needsUpdate = true
    this._tick++
  }

  #animateIn() {
    const from = { scale: 0 }
    new TWEEN.Tween(from)
      .to({ scale: 1 }, 500)
      .easing(TWEEN.Easing.Elastic.Out)
      .onUpdate(() => {
        this.model.scale.setScalar(from.scale)
      })
      .delay(500)
      .start()
  }

  animateOut() {
    const from = { scale: 1 }
    new TWEEN.Tween(from)
      .to({ scale: 0 }, 500)
      .easing(TWEEN.Easing.Elastic.In)
      .onUpdate(() => {
        this.model.scale.setScalar(from.scale)
      })
      .onComplete(() => animationsComplete())
      .delay(500)
      .start()
  }

}
