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
  cloudMaterial,
} from '#materials'

import {
  dodecahedronGeometry,
} from '#geometries'

import {
  randomRoundNumber,
  getNextPosition,
} from '#tools'

const colors = [ROCK_1, ROCK_2, ROCK_3, ROCK_4]
const dummy = new Object3D()


/**
 * Clouds instance.
 */
class Clouds {

  /**
   * The tiles that contain clouds.
   */
  _tiles = []

  /**
   * Local instances for the clouds.
   */
  _clouds = new Object3D()

  /**
   * The animations for the clouds.
   */
  _animate = () => { }

  /**
   * Configurations for the instances.
   */
  _instances = []

  /**
   * Tracks time passed for continuous animations.
   */
  _tick = 0

  /**
   * Pauses idle animations while updating positions.
   */
  _pause = false

  /**
   * Initialize the clouds.
   */
  constructor () { }

  /**
   * Adds clouds to a tile.
   */
  add (options) {
    this._tiles.push(options)
  }

  reset () {
    this._tiles = []
    this._clouds = new Object3D()
    this._animate = () => { }
    this._instances = []
    this._tick = 0
  }

  /**
   * Populates the instances.
   */
  create () {
    let amounts = 0

    this._tiles.forEach(tile => {
      const amount = randomRoundNumber(12, 24)
      amounts += amount

      const color = colors[randomRoundNumber(0, colors.length - 1)]
      const altitude = randomRoundNumber(5, 9)

      for (let i = 0; i < amount; i++) {
        this._instances.push({
          pos: {
            x: -4.8 + (Math.random() * 9.6),
            y: -0.4 + Math.random() * 0.8,
            z: -4.8 + (Math.random() * 9.6),
          },
          rot: {
            x: (Math.PI * 2) * Math.random(),
            y: (Math.PI * 2) * Math.random(),
            z: (Math.PI * 2) * Math.random(),
          },
          altitude: tile.position.y || altitude,
          animation: {
            direction: (Math.random() > 0.5 ? 1 : - 1),
            speed: randomRoundNumber(200, 300),
          },
          scale: 0.5 + (Math.random() * 1.5),
          color,
          isReady: false,
          tile,
        })
      }
    })

    this._clouds = new InstancedMesh(dodecahedronGeometry, cloudMaterial, amounts)

    this._animate = () => {
      if (!this._pause) {
        this._instances.forEach((instance, index) => {
          const { isReady } = instance

          if (isReady) {
            this.updateInstance(instance, index)
          }
        })

        this._tick++
      }
    }

    return this._clouds
  }

  async next (delay = 0) {
    await this.animateNext(delay)
  }

  /**
   * Updates the animation.
   */
  updateInstance (instance, index, from) {
    const { pos, rot, scale, color, animation, tile, altitude } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot
    const { direction, speed } = animation

    const bob = Math.sin((this._tick + index * 50) / 10 / Math.PI) / 20

    dummy.position.set(posX + (tile.position.x * 10), (altitude * 5) + ((posY + bob) * (scale)), posZ + (tile.position.z * 10))
    dummy.rotation.set(rotX, rotY, rotZ + ((this._tick / speed) * direction))

    if (from) {
      dummy.scale.set(from.x, from.y, from.z)
    } else {
      dummy.scale.setScalar(scale)
    }

    dummy.updateMatrixWorld(true)

    this._clouds.setMatrixAt(index, dummy.matrixWorld)
    this._clouds.setColorAt(index, color)

    this._clouds.instanceMatrix.needsUpdate = true
    this._clouds.instanceColor.needsUpdate = true
  }

  updateInstancePosition (instance, index, from) {
    const { pos, altitude, scale, rot, animation } = instance
    const { x: rotX, y: rotY, z: rotZ } = rot
    const { direction, speed } = animation

    const bob = Math.sin((this._tick + index * 50) / 10 / Math.PI) / 20

    dummy.position.set(pos.x + (from.x * 10), (altitude * 5) + ((pos.y + bob) * (scale)), pos.z + (from.z * 10))
    dummy.rotation.set(rotX, rotY, rotZ + ((this._tick / speed) * direction))
    dummy.scale.setScalar(scale)

    dummy.updateMatrixWorld(true)

    this._clouds.setMatrixAt(index, dummy.matrixWorld)

    this._clouds.instanceMatrix.needsUpdate = true
  }

  /**
   * Shows the clouds with an animation.
   */
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
          .onComplete(() => {
            instance.isReady = true
            resolve()
          })
          .delay(randomRoundNumber(1000, 1250))
          .start()
      })
    })
  }

  async animateNext () {
    if (!this._tiles.length) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      this._pause = true
      this._instances.forEach((instance, index) => {
        const nextPosition = getNextPosition(instance.tile.position, instance.tile.direction)

        const from = instance.tile.position
        const to = nextPosition

        this.updateInstancePosition(instance, index, from)

        new TWEEN.Tween(from)
          .to(to, 500)
          .easing(TWEEN.Easing.Cubic.InOut)
          .onUpdate(() => this.updateInstancePosition(instance, index, from))
          .onComplete(() => {
            this._pause = false
            resolve()
          })
          .delay(randomRoundNumber(250, 500))
          .start()
      })
    })
  }

  /**
   * Hides the clouds with an animation.
   */
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
          .onStart(() => instance.isReady = false)
          .onUpdate(() => this.updateInstance(instance, index, from))
          .onComplete(resolve)
          .delay(randomRoundNumber(250, 500))
          .start()
      })
    })
  }
}

const clouds = new Clouds()

export default clouds
