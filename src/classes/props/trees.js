import TWEEN from '@tweenjs/tween.js'

import {
  Group,
  InstancedMesh,
  Euler,
  Object3D,
} from 'three'

import {
  TREE_BASE,
  TREE_1,
  TREE_2,
  TREE_3,
  TREE_4,
} from '#colors'

import {
  defaultMaterial,
} from '#materials'

import {
  coneGeometry,
} from '#geometries'

import {
  randomRoundNumber,
  randomNumber,
  randomCoordinate,
} from '#tools'

import {
  mergeBufferGeometries,
} from 'three/examples/jsm/utils/BufferGeometryUtils'

const colors = [TREE_1, TREE_2, TREE_3, TREE_4]
const dummy = new Object3D()


/**
 * Trees instance.
 */
class Trees {

  /**
   * The tiles with trees.
   */
  _tiles = []

  /**
   * Local instances for the trunks.
   */
  _trunk = null

  /**
   * Local instances for the foliage.
   */
  _foliage = null

  /**
   * The group that represents an individual tree.
   */
  _trees = new Group()

  /**
   * Configurations for each instance.
   */
  _instances = []

  /**
   * Initialize the trees.
   */
  constructor () { }

  /**
   * Adds trees to a tile.
   */
  add (options) {
    this._tiles.push(options)
  }

  reset () {
    this._tiles = []
    this._trunk = null
    this._foliage = null
    this._trees = new Group()
    this._instances = []
  }

  /**
   * Populates the instances.
   */
  create () {
    let amounts = 0

    this._tiles.forEach(tile => {
      const amount = randomRoundNumber(20, 30)
      amounts += amount

      for (let i = 0; i < amount; i++) {
        this._instances.push({
          pos: randomCoordinate(-4.75, 4.75, tile.exclude),
          rot: {
            x: randomNumber(-0.12, 0.12),
            y: randomNumber(-0.12, 0.12),
            z: 0,
          },
          scale: 0.5 + (Math.random() * 0.75),
          color: colors[randomRoundNumber(0, colors.length - 1)],
          tile,
        })
      }
    })

    if (this._tiles.length) {
      this._trunk = new InstancedMesh(coneGeometry.clone(), defaultMaterial, amounts)
      this._trunk.castShadow = true

      const bottomLayer = coneGeometry.clone()
      bottomLayer.scale(1.3, 1.3, 1.3)
      bottomLayer.translate(0, 0.5, 0)

      const topLayer = coneGeometry.clone()
      topLayer.scale(1.1, 1.1, 1.1)
      topLayer.translate(0, 1.1, 0)

      const mergedGeometries = mergeBufferGeometries([bottomLayer, topLayer])
      this._foliage = new InstancedMesh(mergedGeometries, defaultMaterial, amounts)
      this._foliage.castShadow = true
      this._foliage.receiveShadow = true

      this._trunk.geometry.computeBoundingBox()
      this._foliage.geometry.computeBoundingBox()

      this._trunk.geometry.translate(0, this._trunk.geometry.boundingBox.min.y * -1, 0)
      this._foliage.geometry.translate(0, this._foliage.geometry.boundingBox.min.y * -1, 0)
      this._foliage.geometry.translate(0, 0.3, 0)

      this._trees.add(this._trunk, this._foliage)
    }

    return this._trees
  }

  /**
   * Updates the animation.
   */
  updateInstance (instance, index, from) {
    const { pos, rot, scale, color, tile } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot
    const euler = new Euler(rotX, rotY, rotZ, 'XYZ')

    dummy.position.set(posX + (tile.position.x * 10), (posY + (tile.position.y * 5)) * scale, posZ + (tile.position.z * 10))
    dummy.setRotationFromEuler(euler)
    dummy.scale.set(from.x, from.y, from.z)
    dummy.updateMatrixWorld(true)

    this._trunk.setMatrixAt(index, dummy.matrixWorld)
    this._trunk.setColorAt(index, TREE_BASE)

    dummy.updateMatrixWorld(true)

    this._foliage.setMatrixAt(index, dummy.matrixWorld)
    this._foliage.setColorAt(index, color)

    this._trunk.instanceMatrix.needsUpdate = true
    this._trunk.instanceColor.needsUpdate = true
    this._foliage.instanceMatrix.needsUpdate = true
    this._foliage.instanceColor.needsUpdate = true
  }

  /**
   * Starts animating the trees.
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

const trees = new Trees()

export default trees
