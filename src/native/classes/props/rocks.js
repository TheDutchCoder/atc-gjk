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
 */
export default class Rocks extends Instance {

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
    this._rocks = new Group()
    this._rock = new InstancedMesh(dodecahedronGeometry, defaultMaterial, this._amount)
    this._rocks.castShadow = true
    this._rocks.receiveShadow = true

    for (let i = 0; i < this._amount; i++) {
      this._instances.push({
        pos: randomCoordinate(-4.5, 4.5, this._exclude),
        rot: {
          x: -0.1 + (Math.random() * 0.2),
          y: (Math.PI / 2) * Math.random(),
          z: -0.1 + (Math.random() * 0.2),
        },
        scale: 0.1 + (Math.random() * 0.3),
        color: colors[randomRoundNumber(0, colors.length - 1)],
        mesh: dummy
      })
    }

    this._rocks.add(this._rock)

    this._rocks.position.x = this._position.x * 10
    this._rocks.position.z = this._position.z * 10
  }

  updateInstance(instance, index, from) {
    const { pos, rot, scale, color, mesh } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot

    mesh.position.set(posX, (posY + from.y) * scale, posZ)
    mesh.rotation.set(rotX, rotY, rotZ)
    mesh.scale.set(from.x, from.y, from.z)
    mesh.updateMatrixWorld(true)

    this._rock.setMatrixAt(index, mesh.matrixWorld)
    this._rock.setColorAt(index, color)

    // this._rocks.instanceMatrix.needsUpdate = true
    // this._rocks.instanceColor.needsUpdate = true
  }

  animateIn() {
    console.log(this._instances)
    this._instances.forEach((instance, index) => {
      const { scale } = instance
      const from = { x: 0, y: 0, z: 0 }
      const to = { x: scale, y: scale, z: scale }

      this.updateInstance(instance, index, to)

      // new TWEEN.Tween(from)
      //   .to(to, 500)
      //   .easing(TWEEN.Easing.Elastic.Out)
      //   .onUpdate(() => this.#updateInstance(instance, index, from))
      //   .delay(randomRoundNumber(750, 1000))
      //   .start()
    })

    this._rock.instanceMatrix.needsUpdate = true
    this._rock.instanceColor.needsUpdate = true
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
