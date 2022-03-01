import TWEEN from '@tweenjs/tween.js'

import {
  InstancedMesh,
  Object3D,
  Group,
} from 'three'

import {
  BEAM_1,
  BEAM_2,
  BEAM_3,
  RAIL_1,
} from '#colors'

import {
  defaultMaterial,
} from '#materials'

import { boxGeometry } from '#geometries'
import { randomRoundNumber } from '#tools'

const colors = [BEAM_1, BEAM_2, BEAM_3]
const dummy = new Object3D()

/**
 * Tracks instance.
 */
class Tracks {

  /**
   * The tiles that will have train tracks.
   */
  _tiles = []

  /**
   * Local instances for the beams.
   */
  _beams = null

  /**
   * Local instances for the rails.
   */
  _rails = null

  /**
   * The individual beam configurations.
   */
  _beamInstances = []

  /**
   * The individual rail configurations.
   */
  _railInstances = []

  /**
   * Initialize the beams.
   */
  constructor () { }

  /**
   * Adds a train tracks tile.
   */
  add (options) {
    this._tiles.push(options)
  }

  reset () {
    this._tiles = []
    this._beams = null
    this._rails = null
    this._beamInstances = []
    this._railInstances = []
  }

  /**
   * Populates the instances.
   */
  create () {
    const tracks = new Group()
    let beamAmounts = 0
    let railAmounts = 0

    this._tiles.forEach(tile => {
      const amount = 11
      const isHorizontal = tile.direction === 2 || tile.direction === 6
      beamAmounts += amount

      for (let i = 0; i < amount; i++) {
        this._beamInstances.push({
          pos: {
            x: isHorizontal ? -4.6 + ((i * 10) / amount) : 0,
            y: 0,
            z: isHorizontal ? 0 : -4.6 + ((i * 10) / amount),
          },
          rot: {
            x: 0,
            y: -0.08 + Math.random() * 0.16 + (isHorizontal ? Math.PI / 2 : 0),
            z: 0,
          },
          color: colors[randomRoundNumber(0, colors.length - 1)],
          tile,
        })
      }

      railAmounts += 2

      for (let i = 0; i < 2; i++) {
        this._railInstances.push({
          pos: {
            x: isHorizontal ? 0 : -0.7 + (i * 1.4),
            y: 0.2,
            z: isHorizontal ? -0.7 + (i * 1.4) : 0,
          },
          rot: {
            x: 0,
            y: isHorizontal ? Math.PI / 2 : 0,
            z: 0,
          },
          color: RAIL_1,
          tile,
        })
      }
    })

    if (this._tiles.length) {
      const beamGeometry = boxGeometry.clone()
      beamGeometry.scale(2, 0.3, 0.3)

      this._beams = new InstancedMesh(beamGeometry, defaultMaterial, beamAmounts)
      this._beams.castShadow = true
      this._beams.receiveShadow = true

      const railGeometry = boxGeometry.clone()
      railGeometry.scale(0.2, 0.2, 10)

      this._rails = new InstancedMesh(railGeometry, defaultMaterial, railAmounts)
      this._rails.castShadow = true
      this._rails.receiveShadow = true

      tracks.add(this._beams, this._rails)
    }

    return tracks
  }

  updateBeamInstance (instance, index, from) {
    const { pos, rot, color, tile } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot

    dummy.position.set(posX + (tile.position.x * 10), posY + (tile.position.y * 5), posZ + (tile.position.z * 10))
    dummy.rotation.set(rotX, rotY, rotZ)
    dummy.scale.set(from.x, from.y, from.z)
    dummy.updateMatrixWorld(true)

    this._beams.setMatrixAt(index, dummy.matrixWorld)
    this._beams.setColorAt(index, color)

    this._beams.instanceMatrix.needsUpdate = true
    this._beams.instanceColor.needsUpdate = true
  }

  updateRailInstance (instance, index, from) {
    const { pos, rot, color, tile } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot

    dummy.position.set(posX + (tile.position.x * 10), posY + from.y + (tile.position.y * 10), posZ + (tile.position.z * 10))
    dummy.rotation.set(rotX, rotY, rotZ)
    dummy.scale.set(from.scale, from.scale, from.scale)
    dummy.updateMatrixWorld(true)

    this._rails.setMatrixAt(index, dummy.matrixWorld)
    this._rails.setColorAt(index, color)

    this._rails.instanceMatrix.needsUpdate = true
    this._rails.instanceColor.needsUpdate = true
  }

  animateIn () {
    if (!this._tiles.length) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      this._beamInstances.forEach((instance, index) => {
        const from = { x: 0, y: 0, z: 0 }
        const to = { x: 1, y: 1, z: 1 }

        this.updateBeamInstance(instance, index, from)

        new TWEEN.Tween(from)
          .to(to, 500)
          .easing(TWEEN.Easing.Elastic.Out)
          .onUpdate(() => this.updateBeamInstance(instance, index, from))
          .delay(randomRoundNumber(750, 1000))
          .start()
      })

      this._railInstances.forEach((instance, index) => {
        const from = { y: 5, scale: 0 }
        const to = { y: 0, scale: 1 }

        this.updateRailInstance(instance, index, from)

        new TWEEN.Tween(from)
          .to(to, 500)
          .easing(TWEEN.Easing.Elastic.Out)
          .onUpdate(() => this.updateRailInstance(instance, index, from))
          .onComplete(resolve)
          .delay(randomRoundNumber(750, 1000))
          .start()
      })
    })
  }

  animateOut () {
    if (!this._tiles.length) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      this._beamInstances.forEach((instance, index) => {
        const from = { x: 1, y: 1, z: 1 }
        const to = { x: 0, y: 0, z: 0 }

        new TWEEN.Tween(from)
          .to(to, 500)
          .easing(TWEEN.Easing.Elastic.In)
          .onUpdate(() => this.updateBeamInstance(instance, index, from))
          .delay(randomRoundNumber(750, 1000))
          .start()
      })

      this._railInstances.forEach((instance, index) => {
        const from = { y: 0, scale: 1 }
        const to = { y: 5, scale: 0 }

        new TWEEN.Tween(from)
          .to(to, 500)
          .easing(TWEEN.Easing.Elastic.In)
          .onUpdate(() => this.updateRailInstance(instance, index, from))
          .onComplete(resolve)
          .delay(randomRoundNumber(750, 1000))
          .start()
      })
    })
  }
}

const tracks = new Tracks()

export default tracks
