import Instance from '#native/classes/base/instance'
import TWEEN from '@tweenjs/tween.js'

import {
  InstancedMesh,
  Object3D,
  Group,
} from 'three'

import {
  ROCK_1,
  ROCK_2,
  ROCK_3,
  ROCK_4,
} from '#/colors'

import {
  defaultMaterial,
} from '#materials'

import { dodecahedronGeometry } from '#geometries'
import { randomRoundNumber, randomCoordinate } from '#/tools'

const colors = [ROCK_1, ROCK_2, ROCK_3, ROCK_4]
const dummy = new Object3D()

/**
 * Rocks instance.
 *
 * @todo Create 1 instance for all tiles, instead of a per-tile instance.
 * Example: rocks = [{ x: -2, z: -2}, { x: -1, z: -2}, etc...]
 * Loop through all entries and dynamically add clusters of those instances to those locations.
 *
 * DO the same for any other instanced objects, like trees.
 */
export default class Rocks extends Instance {

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
   * Local instances for the rocks.
   */
  _rocks = null
  _rock = null

  _instances = []

  _uuid = 0

  /**
   * Initialize the rocks.
   */
  constructor({ position = { x: 0, y: 0, z: 0 }, amount = randomRoundNumber(6, 12), exclude = { width: 0, direction: 0 } } = {}) {
    super({ position, amount, exclude })

    this.create()
    this.animateIn()

    return this._rocks
  }

  /**
   * Populates the instances.
   */
  create() {
    let amounts = 0

    // Test
    this._tiles.forEach(tile => {
      const amount = randomRoundNumber(6, 12)
      amounts += amount

      for (let i = 0; i < amount; i++) {
        this._instances.push({
          pos: randomCoordinate(-4.5, 4.5, this._exclude),
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

    this._rocks = new Group()
    this._rock = new InstancedMesh(dodecahedronGeometry, defaultMaterial, amounts)
    this._rock.castShadow = true
    this._rock.receiveShadow = true

    // for (let i = 0; i < this._amount; i++) {
    //   this._instances.push({
    //     pos: randomCoordinate(-4.5, 4.5, this._exclude),
    //     rot: {
    //       x: -0.1 + (Math.random() * 0.2),
    //       y: (Math.PI / 2) * Math.random(),
    //       z: -0.1 + (Math.random() * 0.2),
    //     },
    //     scale: 0.1 + (Math.random() * 0.3),
    //     color: colors[randomRoundNumber(0, colors.length - 1)],
    //     mesh: dummy
    //   })
    // }

    this._rocks.add(this._rock)

    // this._rocks.position.x = this._position.x * 10
    // this._rocks.position.z = this._position.z * 10
  }

  updateInstance(instance, index, from) {
    const { pos, rot, scale, color, tile } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot

    dummy.position.set(posX + (tile.x * 10), (posY + tile.y + from.y) * scale, posZ + (tile.z * 10))
    dummy.rotation.set(rotX, rotY, rotZ)
    dummy.scale.set(from.x, from.y, from.z)
    dummy.updateMatrixWorld(true)

    this._rock.setMatrixAt(index, dummy.matrixWorld)
    this._rock.setColorAt(index, color)

    this._rock.instanceMatrix.needsUpdate = true
    this._rock.instanceColor.needsUpdate = true
  }

  animateIn() {
    this._instances.forEach((instance, index) => {
      const { scale } = instance
      const from = { x: 0, y: 0, z: 0 }
      const to = { x: scale, y: scale, z: scale }

      this.updateInstance(instance, index, from)

      new TWEEN.Tween(from)
        .to(to, 500)
        .easing(TWEEN.Easing.Elastic.Out)
        .onUpdate(() => this.updateInstance(instance, index, from))
        .delay(randomRoundNumber(750, 1000))
        .start()
    })
  }

  // animateOut() {
  //   this._instances.forEach((instance, index) => {
  //     const { scale } = instance
  //     const from = { x: scale, y: scale, z: scale }
  //     const to = { x: 0, y: 0, z: 0 }

  //     new TWEEN.Tween(from)
  //       .to(to, 500)
  //       .easing(TWEEN.Easing.Elastic.In)
  //       .onUpdate(() => this.updateInstance(instance, index, from))
  //       .delay(randomRoundNumber(250, 500))
  //       .start()
  //   })
  // }

}
