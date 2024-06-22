import TWEEN from '@tweenjs/tween.js'

import {
  InstancedMesh,
  Object3D,
} from 'three'

import {
  ROCK_1,
  ROCK_2,
  ROCK_3,
  ROCK_4,
} from '#colors'

import {
  defaultMaterial,
} from '#materials'

import {
  dodecahedronGeometry,
} from '#geometries'

import {
  randomRoundNumber,
  randomCoordinate,
} from '#tools'

const colors = [ROCK_1, ROCK_2, ROCK_3, ROCK_4]
const dummy = new Object3D()

/**
 * Rocks class.
 */
class Rocks {

  /**
   * The tiles that contains rocks.
   */
  _tiles = []

  /**
   * The local rocks instance.
   */
  _rock = new Object3D()

  /**
   * The configurations for each instance.
   */
  _instances = []

  /**
   * Initialize the rocks.
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
    this._rock = new Object3D()
    this._instances = []
  }

  /**
   * Populates the instances.
   */
  create () {
    let amounts = 0

    this._tiles.forEach(tile => {
      const amount = randomRoundNumber(6, 12)
      amounts += amount

      for (let i = 0; i < amount; i++) {
        this._instances.push({
          pos: randomCoordinate(-4.5, 4.5, tile.exclude),
          rot: {
            x: -0.1 + (Math.random() * 0.2),
            y: (Math.PI / 2) * Math.random(),
            z: -0.1 + (Math.random() * 0.2),
          },
          scale: 0.1 + (Math.random() * 0.3),
          color: colors[randomRoundNumber(0, colors.length - 1)],
          tile,
        })
      }
    })

    if (this._tiles.length) {
      this._rock = new InstancedMesh(dodecahedronGeometry, defaultMaterial, amounts)
      this._rock.castShadow = true
      this._rock.receiveShadow = true
    }

    return this._rock
  }

  updateInstance (instance, index, from) {
    const { pos, rot, scale, color, tile } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot

    dummy.position.set(posX + (tile.position.x * 10), (posY + tile.position.y + from.y) * scale, posZ + (tile.position.z * 10))
    dummy.rotation.set(rotX, rotY, rotZ)
    dummy.scale.set(from.x, from.y, from.z)
    dummy.updateMatrixWorld(true)

    this._rock.setMatrixAt(index, dummy.matrixWorld)
    this._rock.setColorAt(index, color)

    this._rock.instanceMatrix.needsUpdate = true
    this._rock.instanceColor.needsUpdate = true
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

const rocks = new Rocks()

export default rocks
