import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'
import TWEEN from '@tweenjs/tween.js'

import {
  Group,
  InstancedMesh,
  Euler,
  Object3D,
} from 'three'

import {
  POLE,
  PEG,
  LINE,
} from '#colors'

import {
  defaultMaterial,
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
   * Local instances for the lines.
   */
  _lines = null

  /**
   * The group that represents an individual powerline.
   */
  _powerline = new Group()

  /**
   * Configurations for each pole instance.
   */
  _poleInstances = []

  /**
   * Configurations for each pole instance.
   */
  _beamInstances = []

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
    this._lines = null
    this._powerline = new Group()
    this._poleInstances = []
  }

  /**
   * Populates the instances.
   */
  create () {
    const pegGeometries = []
    const lineGeometries = []

    this._tiles.forEach(tile => {
      const isHorizontal = tile.direction === 2 || tile.direction === 6

      this._poleInstances.push({
        pos: {
          x: 0,
          y: 0,
          z: 0,
        },
        rot: {
          x: 0,
          y: isHorizontal ? Math.PI / 2 : 0,
          z: 0,
        },
        scale: 1,
        tile,
      })
    })

    if (this._tiles.length) {
      this._pole = new InstancedMesh(poleGeometry.clone(), defaultMaterial, this._tiles.length)
      this._pole.geometry.scale(0.25, 10, 0.25)
      this._pole.geometry.computeBoundingBox()
      this._pole.geometry.translate(0, this._pole.geometry.boundingBox.min.y * -1, 0)
      this._pole.castShadow = true

      this._beam = new InstancedMesh(boxGeometry.clone(), defaultMaterial, this._tiles.length)
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

        const lineGeometry = boxGeometry.clone()
        lineGeometry.scale(0.1, 10, 0.1)
        lineGeometry.rotateX(Math.PI / 2)
        lineGeometry.translate(-1.2 + (i * 0.8), 0, 0)
        lineGeometry.translate(0, 9.45, 0)

        lineGeometries.push(lineGeometry)
      }

      const mergedPegGeometries = mergeBufferGeometries(pegGeometries)
      const mergedLineGeometries = mergeBufferGeometries(lineGeometries)

      this._pegs = new InstancedMesh(mergedPegGeometries, defaultMaterial, 4)
      this._lines = new InstancedMesh(mergedLineGeometries, defaultMaterial, 4)

      this._powerline.add(this._pole, this._beam, this._pegs, this._lines)
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
    // const euler = new Euler(rotX, rotY, rotZ, 'XYZ')

    dummy.position.set(posX + (tile.position.x * 10), (posY + (tile.position.y * 5)) * scale, posZ + (tile.position.z * 10))
    dummy.rotation.set(rotX, rotY, rotZ)
    dummy.scale.set(from.x, from.y, from.z)
    dummy.updateMatrixWorld(true)

    this._pole.setMatrixAt(index, dummy.matrixWorld)
    this._pole.setColorAt(index, POLE)

    this._beam.setMatrixAt(index, dummy.matrixWorld)
    this._beam.setColorAt(index, POLE)

    this._pegs.setMatrixAt(index, dummy.matrixWorld)
    this._pegs.setColorAt(index, PEG)

    // dummy.updateMatrixWorld(true)

    this._lines.setMatrixAt(index, dummy.matrixWorld)
    this._lines.setColorAt(index, LINE)

    dummy.updateMatrixWorld(true)

    this._pole.instanceMatrix.needsUpdate = true
    this._pole.instanceColor.needsUpdate = true
    this._beam.instanceMatrix.needsUpdate = true
    this._beam.instanceColor.needsUpdate = true
    this._pegs.instanceMatrix.needsUpdate = true
    this._pegs.instanceColor.needsUpdate = true
    this._lines.instanceMatrix.needsUpdate = true
    this._lines.instanceColor.needsUpdate = true
  }

  /**
   * Starts animating the trees.
   */
  animateIn () {
    if (!this._tiles.length) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      this._poleInstances.forEach((instance, index) => {
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
      this._poleInstances.forEach((instance, index) => {
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
