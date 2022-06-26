import TWEEN from '@tweenjs/tween.js'

import {
  InstancedMesh,
  Object3D,
} from 'three'

import {
  TEEPEE_1,
  TEEPEE_2,
  TEEPEE_3,
} from '#colors'

import {
  defaultMaterial,
} from '#materials'

import {
  boxGeometry,
} from '#geometries'

import {
  randomItemFromArray,
  randomRoundNumber,
  randomCoordinate,
} from '#tools'

const colors = [TEEPEE_1, TEEPEE_2, TEEPEE_3]
const dummy = new Object3D()

/**
 * Teepees class.
 */
class Teepees {

  /**
   * The tiles that contains teepees.
   */
  _tiles = []

  /**
   * The local teepees instance.
   */
  _teepee = new Object3D()

  /**
   * The configurations for each instance.
   */
  _instances = []

  /**
   * Initialize the teepees.
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
    this._teepee = new Object3D()
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
          pos: randomCoordinate(-1.5, 1.5, tile.exclude),
          rot: {
            x: 0,
            y: (Math.PI / 2) * Math.random(),
            z: 0,
          },
          scale: 1,
          color: randomItemFromArray(colors),
          tile,
        })
      }
    })

    if (this._tiles.length) {
      this._teepee = new InstancedMesh(boxGeometry, defaultMaterial, amounts)
      this._teepee.castShadow = true
      this._teepee.receiveShadow = true
    }

    return this._teepee
  }

  updateInstance (instance, index, from) {
    const { pos, rot, scale, color, tile } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot

    dummy.position.set(posX + (tile.position.x * 10), (posY + tile.position.y + from.y) * scale, posZ + (tile.position.z * 10))
    dummy.rotation.set(rotX, rotY, rotZ)
    dummy.scale.set(from.x, from.y, from.z)
    dummy.updateMatrixWorld(true)

    this._teepee.setMatrixAt(index, dummy.matrixWorld)
    this._teepee.setColorAt(index, color)

    this._teepee.instanceMatrix.needsUpdate = true
    this._teepee.instanceColor.needsUpdate = true
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

const teepees = new Teepees()

export default teepees
