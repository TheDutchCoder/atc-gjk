import TWEEN from '@tweenjs/tween.js'

import {
  MeshPhongMaterial,
  BoxGeometry,
  Mesh,
} from 'three'

const dirtMaterial = new MeshPhongMaterial({ color: 0x99684a, flatShading: true })

/**
 * Grass game piece.
 *
 * @todo Merge meshes for every tile in the game that uses grass as the base
 * tile. This way, instead of having 11x11 geometries, we can have 1 geometry
 * and save _a lot_ on draw calls.
 */
class Dirt {

  _tile = null

  _dirt = null

  /**
   * Initialize the tile.
   *
   * @param {Object} position - The position of the tile.
   */
  constructor () { }

  add (options = { scale: { x: 1, y: 1, z: 1 } }) {
    this._tile = options
  }

  reset () {
    this._tile = null
    this._dirt = null
  }

  /**
   * Creates the tile.
   */
  create () {
    const dirtGeometry = new BoxGeometry(10, 3, 10)
    dirtGeometry.translate(0, -2.5, 0)
    dirtGeometry.scale(this._tile.scale.x, this._tile.scale.y, this._tile.scale.z)

    this._dirt = new Mesh(dirtGeometry, dirtMaterial)
    this._dirt.scale.setScalar(0)

    return this._dirt
  }

  animateIn () {
    if (!this._tile) {
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
        .delay(0)
        .start()

    })
  }

  animateOut () {
    if (!this._tile) {
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
        .delay(1250)
        .start()
    })
  }

  animateUpdate (from) {
    this._dirt.scale.setScalar(from.scale)
  }

}

const dirt = new Dirt()

export default dirt
