import Instance from '#native/classes/base/instance'
import TWEEN from '@tweenjs/tween.js'

import {
  InstancedMesh,
  Object3D,
} from 'three'

import {
  BEAM_1,
  BEAM_2,
  BEAM_3,
} from '#/colors'

import {
  defaultMaterial,
} from '#materials'

import { boxGeometry } from '#geometries'
import { randomRoundNumber } from '#/tools'

const colors = [BEAM_1, BEAM_2, BEAM_3]
const dummy = new Object3D()

/**
 * Beams instance.
 */
export default class Beams extends Instance {

  /**
   * Local instances for the beams.
   */
  _beams = null

  /**
   * Initialize the beams.
   */
  constructor({ position = { x: 0, y: 0, z: 0 }, amount = 11 } = {}) {
    super({ position, amount })

    this.#create()
    this.animateIn()

    this.displayName = 'Beams'
  }

  /**
   * Populates the instances.
   */
  #create() {
    const beamGeometry = boxGeometry.clone()
    beamGeometry.scale(2, 0.3, 0.3)

    this._beams = new InstancedMesh(beamGeometry, defaultMaterial, this._amount)
    this._beams.castShadow = true
    this._beams.receiveShadow = true

    for (let i = 0; i < this._amount; i++) {
      this._instances.push({
        pos: {
          x: 0,
          y: 0,
          z: -4.6 + ((i * 10) / this._amount),
        },
        rot: {
          x: 0,
          y: -0.08 + Math.random() * 0.16,
          z: 0,
        },
        color: colors[randomRoundNumber(0, colors.length - 1)],
        mesh: dummy,
      })
    }

    this.model = this._beams
  }

  #updateInstance(instance, index, from) {
    const { pos, rot, color, mesh } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot

    mesh.position.set(posX, posY, posZ)
    mesh.rotation.set(rotX, rotY, rotZ)
    mesh.scale.set(from.x, from.y, from.z)
    mesh.updateMatrixWorld(true)

    this._beams.setMatrixAt(index, mesh.matrixWorld)
    this._beams.setColorAt(index, color)

    this._beams.instanceMatrix.needsUpdate = true
    this._beams.instanceColor.needsUpdate = true
  }

  animateIn() {
    this._instances.forEach((instance, index) => {
      const from = { x: 0, y: 0, z: 0 }
      const to = { x: 1, y: 1, z: 1 }

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
      const from = { x: 1, y: 1, z: 1 }
      const to = { x: 0, y: 0, z: 0 }

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
