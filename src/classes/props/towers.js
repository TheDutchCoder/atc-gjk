import TWEEN from '@tweenjs/tween.js'

import {
  InstancedMesh,
  Object3D,
} from 'three'

import {
  TOWER,
} from '#colors'

import {
  defaultMaterial,
} from '#materials'

import {
  towerGeometries,
} from '#geometries'

import {
  randomItemFromArray,
  randomRoundNumber,
  randomCoordinate,
} from '#tools'

const colors = [TOWER]
const dummy = new Object3D()

/**
 * Tower class.
 */
class Towers {

  /**
   * The tiles that contains tower.
   */
  _tiles = []

  /**
   * The local tower instance.
   */
  _tower = new Object3D()

  /**
   * The configurations for each instance.
   */
  _instances = []

  /**
   * Initialize the tower.
   */
  constructor () { }

  /**
   * Adds a tile.
   */
  add (options) {
    this._tiles.push(options)
  }

  reset () {
    this._tiles = []
    this._tower = new Object3D()
    this._instances = []
  }

  /**
   * Populates the instances.
   */
  create () {
    let amounts = 0

    this._tiles.forEach(tile => {
      const amount = 1
      amounts += amount

      for (let i = 0; i < amount; i++) {
        this._instances.push({
          pos: randomCoordinate(-3, -3, tile.exclude),
          rot: {
            x: 0,
            y: (Math.PI / -2) * Math.random(),
            z: 0,
          },
          scale: 1,
          color: randomItemFromArray(colors),
          tile,
        })
      }
    })

    if (this._tiles.length) {
      this._tower = new InstancedMesh(towerGeometries, defaultMaterial, amounts)
      this._tower.castShadow = true
      this._tower.receiveShadow = true
    }

    return this._tower
  }

  updateInstance (instance, index, from) {
    const { pos, rot, scale, color, tile } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot

    dummy.position.set(posX + (tile.position.x * 10), (posY + tile.position.y + from.y) * scale, posZ + (tile.position.z * 10))
    dummy.rotation.set(rotX, rotY, rotZ)
    dummy.scale.set(from.x, from.y, from.z)
    dummy.updateMatrixWorld(true)

    this._tower.setMatrixAt(index, dummy.matrixWorld)
    this._tower.setColorAt(index, color)

    this._tower.instanceMatrix.needsUpdate = true
    this._tower.instanceColor.needsUpdate = true
  }

  animateIn () {
    if (!this._tiles.length) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      this._instances.forEach((instance, index) => {
        const { scale } = instance
        const from = { x: 0, y: 0, z: 0 }
        const to = { x: scale, y: scale, z: scale }

        this.updateInstance(instance, index, from)

        new TWEEN.Tween(from)
          .to(to, 500)
          .easing(TWEEN.Easing.Elastic.Out)
          .onUpdate(() => this.updateInstance(instance, index, from))
          .onComplete(resolve)
          .delay(randomRoundNumber(500, 1000))
          .start()
      })
    })
  }

  animateOut () {
    if (!this._tiles.length) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      this._instances.forEach((instance, index) => {
        const { scale } = instance
        const from = { x: scale, y: scale, z: scale }
        const to = { x: 0, y: 0, z: 0 }

        this.updateInstance(instance, index, from)

        new TWEEN.Tween(from)
          .to(to, 500)
          .easing(TWEEN.Easing.Elastic.In)
          .onUpdate(() => this.updateInstance(instance, index, from))
          .onComplete(resolve)
          .delay(randomRoundNumber(500, 750))
          .start()
      })
    })
  }
}

const towers = new Towers()

export default towers
