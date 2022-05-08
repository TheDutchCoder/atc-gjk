import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'
import TWEEN from '@tweenjs/tween.js'

import {
  Group,
  InstancedMesh,
  Euler,
  Object3D,
  Mesh,
} from 'three'

import {
  POLE,
  GREEN_LIGHT,
} from '#colors'

import {
  defaultMaterial,
  glassMaterial,
} from '#materials'

import {
  boxGeometry,
  cylinderGeometry,
  poleGeometry,
} from '#geometries'

import {
  randomRoundNumber,
  // randomNumber,
  // randomCoordinate,
} from '#tools'

// import {
//   mergeBufferGeometries,
// } from 'three/examples/jsm/utils/BufferGeometryUtils'

// const colors = [TREE_1, TREE_2, TREE_3, TREE_4]
const dummy = new Object3D()


/**
 * Trees instance.
 */
class Powerlines {

  /**
   * The tiles with trees.
   */
  _tiles = []

  /**
   * Local instances for the poles.
   */
  _pole = null

  /**
   * Local instances for the beams.
   */
  _beam = null

  /**
   * Local instances for the pegs.
   */
  _pegs = null

  /**
   * The group that represents an individual powerline.
   */
  _powerline = new Group()

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
    this._pole = null
    this._beam = null
    this._pegs = null
    this._powerline = new Group()
    this._instances = []
  }

  /**
   * Populates the instances.
   */
  create () {
    const pegGeometries = []

    this._tiles.forEach(tile => {
      this._instances.push({
        pos: {
          x: 0,
          y: 0,
          z: 0,
        },
        rot: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: 1,
        tile,
      })
    })

    if (this._tiles.length) {
      this._pole = new InstancedMesh(poleGeometry.clone(), defaultMaterial, 1)
      this._pole.geometry.scale(0.25, 10, 0.25)
      this._pole.geometry.computeBoundingBox()
      this._pole.geometry.translate(0, this._pole.geometry.boundingBox.min.y * -1, 0)
      this._pole.castShadow = true

      this._beam = new InstancedMesh(boxGeometry.clone(), defaultMaterial, 1)
      this._beam.geometry.scale(3, 0.2, 0.2)
      this._beam.geometry.computeBoundingBox()
      this._beam.geometry.translate(0, this._beam.geometry.boundingBox.min.y * -1, 0)
      this._beam.geometry.translate(0, 9, 0)
      this._beam.castShadow = true

      for (let i = 0; i < 4; i++) {
        const pegGeometry = cylinderGeometry.clone()
        pegGeometry.scale(0.15, 0.5, 0.15)
        pegGeometry.translate(-1.2 + (i * 0.8), 0, 0)
        pegGeometry.translate(0, 9.45, 0)

        pegGeometries.push(pegGeometry)
      }

      const mergedPegGeometries = mergeBufferGeometries(pegGeometries)

      this._pegs = new InstancedMesh(mergedPegGeometries, glassMaterial, 4)

      // this._pegs = new InstancedMesh(cylinderGeometry.clone(), glassMaterial, 4)
      // this._pegs.geometry.scale(0.15, 0.5, 0.15)
      // this._pegs.geometry.computeBoundingBox()
      // this._pegs.geometry.translate(0, this._pegs.geometry.boundingBox.min.y * -1, 0)
      // this._pegs.geometry.translate(0, 11, 0)

      this._powerline.add(this._pole, this._beam, this._pegs)
    }

    return this._powerline
  }

  /**
   * Updates the animation.
   */
  updateInstance (instance, index, from) {
    const { pos, rot, scale, tile } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot
    const euler = new Euler(rotX, rotY, rotZ, 'XYZ')

    dummy.position.set(posX + (tile.position.x * 10), (posY + (tile.position.y * 5)) * scale, posZ + (tile.position.z * 10))
    dummy.setRotationFromEuler(euler)
    dummy.scale.set(from.x, from.y, from.z)
    dummy.updateMatrixWorld(true)

    this._pole.setMatrixAt(index, dummy.matrixWorld)
    this._pole.setColorAt(index, POLE)

    this._beam.setMatrixAt(index, dummy.matrixWorld)
    this._beam.setColorAt(index, POLE)

    this._pegs.setMatrixAt(index, dummy.matrixWorld)
    this._pegs.setColorAt(index, GREEN_LIGHT)

    dummy.updateMatrixWorld(true)

    this._pole.instanceMatrix.needsUpdate = true
    this._pole.instanceColor.needsUpdate = true
    this._beam.instanceMatrix.needsUpdate = true
    this._beam.instanceColor.needsUpdate = true
    this._pegs.instanceMatrix.needsUpdate = true
    this._pegs.instanceColor.needsUpdate = true
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

const powerlines = new Powerlines()

export default powerlines
