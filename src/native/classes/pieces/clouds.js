// import Instance from '#native/classes/base/instance'
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
} from '#/colors'

import {
  cloudMaterial,
} from '#materials'

import { dodecahedronGeometry } from '#geometries'
import { randomRoundNumber } from '#/tools'

const colors = [ROCK_1, ROCK_2, ROCK_3, ROCK_4]
const dummy = new Object3D()

/**
 * Clouds instance.
 */
class Clouds {

  _tiles = []

  /**
   * Local instances for the clouds.
   */
  _clouds = new Object3D()

  _instances = []

  _tick = 0

  /**
   * Initialize the clouds.
   */
  constructor() {
    // super({ position, amount })

    // this._hasAnimations = true
    // this.isAnimating = true

    // this.#create()
    // this.animateIn()

    // return this._clouds
  }

  add(options) {
    this._tiles.push(options)
  }

  /**
   * Populates the instances.
   */
  create() {
    let amounts = 0

    this._tiles.forEach(tile => {
      const amount = randomRoundNumber(8, 12)
      amounts += amount

      const color = colors[randomRoundNumber(0, colors.length - 1)]
      const altitude = randomRoundNumber(5, 9)

      for (let i = 0; i < amount; i++) {
        this._instances.push({
          pos: {
            x: -3 + (Math.random() * 6),
            y: -0.2 + Math.random() * 0.4,
            z: -3 + (Math.random() * 6),
          },
          rot: {
            x: (Math.PI * 2) * Math.random(),
            y: (Math.PI * 2) * Math.random(),
            z: (Math.PI * 2) * Math.random(),
          },
          altitude: tile.position.y || altitude,
          animation: {
            direction: (Math.random() > 0.5 ? 1 : - 1),
            speed: randomRoundNumber(2000, 3000),
          },
          scale: 0.5 + (Math.random() * 1.5),
          color,
          mesh: dummy,
          isReady: false,
          tile,
        })
      }
    })

    this._clouds = new InstancedMesh(dodecahedronGeometry, cloudMaterial, amounts)

    if (amounts > 0) {
      this.animateIn()
    }

    return this._clouds

    /**
     * The animations for the this._clouds.
     */
    // this._clouds.tick = () => {
    //   this._instances.forEach((instance, index) => {
    //     const { isReady } = instance

    //     if (isReady) {
    //       this.updateInstance(instance, index)
    //     }
    //   })
    // }

    // this._clouds.position.x = this._position.x * 10
    // this._clouds.position.y = this._position.y * 5
    // this._clouds.position.z = this._position.z * 10
  }

  updateInstance(instance, index, from) {
    const { pos, rot, scale, color, mesh, animation, tile, altitude } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot
    const { direction, speed } = animation

    mesh.position.set(posX + (tile.position.x * 10), (altitude * 5) + (posY * scale), posZ + (tile.position.z * 10))
    mesh.rotation.set(rotX, rotY, rotZ + ((this._tick / speed) * direction))

    if (from) {
      mesh.scale.set(from.x, from.y, from.z)
    } else {
      mesh.scale.setScalar(scale)
    }

    mesh.updateMatrixWorld(true)

    this._clouds.setMatrixAt(index, mesh.matrixWorld)
    this._clouds.setColorAt(index, color)

    this._clouds.instanceMatrix.needsUpdate = true
    this._clouds.instanceColor.needsUpdate = true

    this._tick++
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
        .onComplete(() => {
          instance.isReady = true
        })
        .delay(randomRoundNumber(1000, 1250))
        .start()
    })

    this._clouds.instanceMatrix.needsUpdate = true
    this._clouds.instanceColor.needsUpdate = true
  }

  animateOut() {
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
        .delay(randomRoundNumber(0, 250))
        .start()
    })
  }

}

const clouds = new Clouds()

export default clouds
