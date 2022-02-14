import Instance from '#native/classes/base/instance'
import TWEEN from '@tweenjs/tween.js'

import {
  InstancedMesh,
  Object3D,
} from 'three'

import {
  RAIL_1,
} from '#/colors'

import {
  defaultMaterial,
} from '#materials'

import { boxGeometry } from '#geometries'
import { randomRoundNumber } from '#/tools'

const dummy = new Object3D()

/**
 * Rails instance.
 */
export default class Rails extends Instance {

  /**
   * Local instances for the rails.
   */
  _rails = null

  /**
   * Initialize the rocks.
   */
  constructor({ position = { x: 0, y: 0, z: 0 }, amount = 2 } = {}) {
    super({ position, amount })

    this.#create()
    this.animateIn()
  }

  /**
   * Populates the instances.
   */
  #create() {
    const railGeometry = boxGeometry.clone()
    railGeometry.scale(0.2, 0.2, 10)

    this._rails = new InstancedMesh(railGeometry, defaultMaterial, this._amount)
    this._rails.castShadow = true
    this._rails.receiveShadow = true

    for (let i = 0; i < this._amount; i++) {
      this._instances.push({
        pos: {
          x: -0.7 + (i * 1.4),
          y: 0.2,
          z: 0,
        },
        color: RAIL_1,
        mesh: dummy,
      })
    }

    this.model = this._rails
  }

  #updateInstance(instance, index, from) {
    const { pos, color, mesh } = instance
    const { x: posX, y: posY, z: posZ } = pos

    mesh.position.set(posX, posY + from.y, posZ)
    mesh.scale.set(from.scale, from.scale, from.scale)
    mesh.updateMatrixWorld(true)

    this._rails.setMatrixAt(index, mesh.matrixWorld)
    this._rails.setColorAt(index, color)

    this._rails.instanceMatrix.needsUpdate = true
    this._rails.instanceColor.needsUpdate = true
  }

  animateIn() {
    this._instances.forEach((instance, index) => {
      const from = { y: 5, scale: 0 }
      const to = { y: 0, scale: 1 }

      this.#updateInstance(instance, index, from)

      // new TWEEN.Tween(from)
      //   .to(to, 500)
      //   .easing(TWEEN.Easing.Elastic.Out)
      //   .onUpdate(() => this.#updateInstance(instance, index, from))
      //   .delay(randomRoundNumber(750, 1000))
      //   .start()
    })
  }

  animateOut() {
    this._instances.forEach((instance, index) => {
      const from = { y: 0, scale: 1 }
      const to = { y: 5, scale: 0 }

      this.#updateInstance(instance, index, from)

      new TWEEN.Tween(from)
        .to(to, 500)
        .easing(TWEEN.Easing.Elastic.In)
        .onUpdate(() => this.#updateInstance(instance, index, from))
        .delay(randomRoundNumber(250, 500))
        .start()
    })
  }

}
