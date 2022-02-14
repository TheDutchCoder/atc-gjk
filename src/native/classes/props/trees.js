import Instance from '#native/classes/base/instance'
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
} from '#/colors'

import {
  defaultMaterial,
} from '#materials'

import { coneGeometry } from '#geometries'
import { randomRoundNumber, randomNumber, randomCoordinate } from '#/tools'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'

const colors = [TREE_1, TREE_2, TREE_3, TREE_4]
const dummy = new Object3D()


/**
 * Trees instance.
 */
export default class Trees extends Instance {

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
   * Local instances for the trunks.
   */
  _trunk = null

  /**
   * Local instances for the foliage.
   */
  _foliage = null

  _trees = null

  /**
   * Initialize the trees.
   */
  constructor({ position = { x: 0, y: 0, z: 0 }, amount = randomRoundNumber(20, 30), exclude = { width: 0, direction: 0 } } = {}) {
    super({ position, amount, exclude })

    this.create()
    this.animateIn()

    return this._trees
  }

  /**
   * Populates the instances.
   */
  create() {
    this._trees = new Group()

    let amounts = 0

    // Test
    this._tiles.forEach(tile => {
      const amount = randomRoundNumber(20, 30)
      amounts += amount

      for (let i = 0; i < amount; i++) {
        this._instances.push({
          pos: randomCoordinate(-4.75, 4.75, this._exclude),
          rot: {
            x: randomNumber(-0.12, 0.12),
            y: randomNumber(-0.12, 0.12),
            z: 0,
          },
          scale: 0.5 + (Math.random() * 0.75),
          color: colors[randomRoundNumber(0, colors.length - 1)],
          mesh: dummy,
          tile,
        })
      }
    })

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

    // for (let i = 0; i < this._amount; i++) {
    //   this._instances.push({
    //     pos: randomCoordinate(-4.75, 4.75, this._exclude),
    //     rot: {
    //       x: randomNumber(-0.12, 0.12),
    //       y: randomNumber(-0.12, 0.12),
    //       z: 0,
    //     },
    //     scale: 0.5 + (Math.random() * 0.75),
    //     color: colors[randomRoundNumber(0, colors.length - 1)],
    //     mesh: dummy
    //   })
    // }

    this._trees.add(this._trunk, this._foliage)

    // this._trees.position.x = this._position.x * 10
    // this._trees.position.z = this._position.z * 10
  }



  updateInstance(instance, index, from) {
    // console.log('hm')
    const { pos, rot, scale, color, mesh, tile } = instance
    const { x: posX, y: posY, z: posZ } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot
    const euler = new Euler(rotX, rotY, rotZ, 'XYZ')

    mesh.position.set(posX + (tile.x * 10), (posY + (tile.y * 5)) * scale, posZ + (tile.z * 10))
    mesh.setRotationFromEuler(euler)
    mesh.scale.set(from.x, from.y, from.z)
    mesh.updateMatrixWorld(true)

    this._trunk.setMatrixAt(index, mesh.matrixWorld)
    this._trunk.setColorAt(index, TREE_BASE)

    mesh.updateMatrixWorld(true)

    this._foliage.setMatrixAt(index, mesh.matrixWorld)
    this._foliage.setColorAt(index, color)

    this._trunk.instanceMatrix.needsUpdate = true
    this._trunk.instanceColor.needsUpdate = true
    this._foliage.instanceMatrix.needsUpdate = true
    this._foliage.instanceColor.needsUpdate = true
  }

  animateIn() {
    this._instances.forEach((instance, index) => {
      const { scale } = instance
      const from = { x: 0, y: 0, z: 0 }
      const to = { x: scale, y: scale, z: scale }

      this.updateInstance(instance, index, from)

      new TWEEN.Tween(from)
        .to(to, 500)
        .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(() => this.updateInstance(instance, index, from))
        .delay(randomRoundNumber(750, 1000))
        .start()
    })

    this._trunk.instanceMatrix.needsUpdate = true
    this._trunk.instanceColor.needsUpdate = true
    this._foliage.instanceMatrix.needsUpdate = true
    this._foliage.instanceColor.needsUpdate = true
  }

  // animateOut() {
  //   this._instances.forEach((instance, index) => {
  //     const { scale } = instance
  //     const from = { x: scale, y: scale, z: scale }
  //     const to = { x: 0, y: 0, z: 0 }

  //     new TWEEN.Tween(from)
  //       .to(to, 500)
  //       .easing(TWEEN.Easing.Elastic.In)
  //       .onUpdate(() => this.#updateInstance(instance, index, from))
  //       .delay(randomRoundNumber(250, 500))
  //       .start()
  //   })
  // }

}
