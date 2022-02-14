import GamePiece from '#native/classes/base/game-piece'
import TWEEN from '@tweenjs/tween.js'

import { Mesh, Group, Color, Object3D, InstancedMesh } from 'three'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'

import { boxGeometry, dodecahedronGeometry } from '#native/geometries'
import { defaultMaterial, glassMaterial } from '#native/materials'

import {
  PLANE_1,
  PLANE_2,
  PLANE_3,
} from '#/colors'

import { setPoint, randomItemFromArray } from '#tools'

const dummy = new Object3D()

const getSmokePosition = (count, delay = 0) => {
  return (((count + delay) % 100) / 100) - 0.2
}

const getSmokeRotation = (count, delay = 0) => {
  return (count + delay) / 50
}

const getSmokeScale = (count, delay = 0) => {
  return Math.sin((((count + delay) % 100) / 100) * Math.PI) * 0.1
}

/**
 * Creates the default plane shape.
 */
const createDefaultPlane = () => {
  const hullGeometry = boxGeometry.clone()
  hullGeometry.scale(1, 1, 2)
  setPoint(0, hullGeometry, -0.2, -0.1)
  setPoint(2, hullGeometry, -0.2, 0.3)
  setPoint(4, hullGeometry, 0.2, -0.1)
  setPoint(6, hullGeometry, 0.2, 0.3)

  const wingsGeometry = boxGeometry.clone()
  wingsGeometry.scale(3, 0.1, 1)
  setPoint(1, wingsGeometry, 0.2, 0.05)
  setPoint(3, wingsGeometry, 0.2, -0.05)
  setPoint(5, wingsGeometry, -0.2, 0.05)
  setPoint(7, wingsGeometry, -0.2, -0.05)

  const rudderGeometry = boxGeometry.clone()
  rudderGeometry.scale(0.1, 0.75, 0.5)
  rudderGeometry.translate(0, 0.5, 0.95)
  setPoint(0, rudderGeometry, -0.04, 0.05)
  setPoint(2, rudderGeometry, -0.04)
  setPoint(3, rudderGeometry, 0, -0.05)
  setPoint(4, rudderGeometry, 0.04, 0.05)
  setPoint(6, rudderGeometry, 0.04)
  setPoint(7, rudderGeometry, 0, -0.05)

  const wheelBaseGeometry = boxGeometry.clone()
  wheelBaseGeometry.scale(0.4, 0.5, 0.6)

  const wheelBaseGeometryRear = wheelBaseGeometry.clone()
  wheelBaseGeometryRear.translate(0, -0.3, 0.6)
  wheelBaseGeometryRear.rotateX(-0.2)

  const wheelBaseGeometryLeft = wheelBaseGeometry.clone()
  wheelBaseGeometryLeft.translate(0.3, -0.3, -0.65)

  const wheelBaseGeometryRight = wheelBaseGeometry.clone()
  wheelBaseGeometryRight.translate(-0.3, -0.3, -0.65)

  /**
   * Geometries that will receive the base color.
   */
  const baseGeometries = mergeBufferGeometries([
    hullGeometry,
    wingsGeometry,
    rudderGeometry,
    wheelBaseGeometryRear,
    wheelBaseGeometryLeft,
    wheelBaseGeometryRight,
  ])


  const screenGeometry = boxGeometry.clone()
  screenGeometry.scale(0.7, 0.4, 0.05)
  screenGeometry.translate(0, 0.5, -0.7)
  screenGeometry.rotateX(0.2)
  setPoint(0, screenGeometry, -0.05)
  setPoint(1, screenGeometry, -0.05)
  setPoint(4, screenGeometry, 0.05)
  setPoint(5, screenGeometry, 0.05)

  /**
   * Geometries that will receive the glass color.
   */
  const glassGeometries = mergeBufferGeometries([
    screenGeometry,
  ])


  const engineGeometry = boxGeometry.clone()
  engineGeometry.scale(1, 1, 0.5)
  engineGeometry.translate(0, 0, -1.25)
  setPoint(1, engineGeometry, -0.1, -0.1)
  setPoint(3, engineGeometry, -0.1, 0.1)
  setPoint(5, engineGeometry, 0.1, -0.1)
  setPoint(7, engineGeometry, 0.1, 0.1)

  const pipe1Geometry = boxGeometry.clone()
  pipe1Geometry.scale(0.1, 0.1, 0.5)
  setPoint(2, pipe1Geometry, null, null, 0.01)
  setPoint(1, pipe1Geometry, null, null, -0.009)
  setPoint(3, pipe1Geometry, null, null, -0.009)
  setPoint(7, pipe1Geometry, null, null, -0.01)

  const pipe1LeftGeometry = pipe1Geometry.clone()
  pipe1LeftGeometry.rotateZ(Math.PI / 4)
  pipe1LeftGeometry.rotateY(0.2)
  pipe1LeftGeometry.translate(0.5, 0.2, -1.05)

  const pipe2LeftGeometry = pipe1Geometry.clone()
  pipe2LeftGeometry.rotateZ(Math.PI / 4)
  pipe2LeftGeometry.translate(0.55, 0.2, -0.55)

  const pipe1RightGeometry = pipe1Geometry.clone()
  pipe1RightGeometry.rotateZ(Math.PI / 4) + (Math.PI / 2)
  pipe1RightGeometry.rotateY(-0.2)
  pipe1RightGeometry.translate(-0.5, 0.2, -1.05)

  const pipe2RightGeometry = pipe1Geometry.clone()
  pipe2RightGeometry.rotateZ(Math.PI / 4)
  pipe2RightGeometry.translate(-0.55, 0.2, -0.55)

  /**
   * Geometries that will receive the metal color.
   */
  const metalGeometries = mergeBufferGeometries([
    engineGeometry,
    pipe1LeftGeometry,
    pipe2LeftGeometry,
    pipe1RightGeometry,
    pipe2RightGeometry,
  ])


  const nutGeometry = boxGeometry.clone()
  nutGeometry.scale(0.2, 0.2, 0.2)
  nutGeometry.translate(0, 0, -1.55)
  setPoint(0, nutGeometry, 0.07, 0.07)
  setPoint(2, nutGeometry, 0.07, -0.07)
  setPoint(4, nutGeometry, -0.07, 0.07)
  setPoint(6, nutGeometry, -0.07, -0.07)

  const wheelTireGeometry = boxGeometry.clone()
  wheelTireGeometry.scale(0.2, 0.4, 0.4)

  const wheelTireRearGeometry = wheelTireGeometry.clone()
  wheelTireRearGeometry.translate(0, -0.6, 0.6)
  wheelTireRearGeometry.rotateX(-0.2)

  const wheelTireLeftGeometry = wheelTireGeometry.clone()
  wheelTireLeftGeometry.translate(-0.3, -0.6, -0.65)

  const wheelTireRightGeometry = wheelTireGeometry.clone()
  wheelTireRightGeometry.translate(0.3, -0.6, -0.65)

  /**
   * Static geometries that will receive the black color.
   */
  const blackStaticGeometries = mergeBufferGeometries([
    nutGeometry,
    wheelTireRearGeometry,
    wheelTireLeftGeometry,
    wheelTireRightGeometry,
  ])


  const propGeometry1 = boxGeometry.clone()
  propGeometry1.scale(0.15, 1.5, 0.05)
  propGeometry1.translate(0, 0, -1.6)

  const propGeometry2 = propGeometry1.clone()
  propGeometry2.rotateZ(Math.PI / 2)

  /**
   * Dynamic geometries that will receive the black color.
   */
  const blackDynamicGeometries = mergeBufferGeometries([
    propGeometry1,
    propGeometry2,
  ])


  const wheelNutGeometry = boxGeometry.clone()
  wheelNutGeometry.scale(0.34, 0.2, 0.2)

  const wheelNutRearGeometry = wheelNutGeometry.clone()
  wheelNutRearGeometry.translate(0, -0.6, 0.6)
  wheelNutRearGeometry.rotateX(-0.2)

  const wheelNutLeftGeometry = wheelNutGeometry.clone()
  wheelNutLeftGeometry.translate(-0.3, -0.6, -0.65)

  const wheelNutRightGeometry = wheelNutGeometry.clone()
  wheelNutRightGeometry.translate(0.3, -0.6, -0.65)

  /**
   * Static geometries that will receive the brown color.
   */
  const brownGeometries = mergeBufferGeometries([
    wheelNutRearGeometry,
    wheelNutLeftGeometry,
    wheelNutRightGeometry,
  ])


  const plane = new Group()

  /**
   * Assign materials to the eshes.
   */
  const baseMaterial = defaultMaterial.clone()
  baseMaterial.name = 'base'

  const screenMaterial = glassMaterial.clone()
  const engineMaterial = defaultMaterial.clone()
  const nutMaterial = defaultMaterial.clone()
  const propMaterial = defaultMaterial.clone()

  const screenColor = new Color(0xe2eff4)
  const propColor = new Color(0x000000)
  const nutColor = new Color(0x99684a)
  const engineColor = new Color(0xffffff)

  screenMaterial.color.set(screenColor)
  engineMaterial.color.set(engineColor)
  nutMaterial.color.set(nutColor)
  propMaterial.color.set(propColor)

  const baseMesh = new Mesh(baseGeometries, baseMaterial)
  const glassMesh = new Mesh(glassGeometries, screenMaterial)
  const metalMesh = new Mesh(metalGeometries, engineMaterial)
  const blackStaticMesh = new Mesh(blackStaticGeometries, propMaterial)
  const blackDynamicMesh = new Mesh(blackDynamicGeometries, propMaterial)
  blackDynamicMesh.name = 'props'
  const brownMesh = new Mesh(brownGeometries, nutMaterial)

  plane.add(
    baseMesh,
    glassMesh,
    metalMesh,
    blackStaticMesh,
    blackDynamicMesh,
    brownMesh,
  )

  return plane
}

const defaultPlane = createDefaultPlane()

const material1 = defaultMaterial.clone()
material1.color.set(PLANE_1)

const material2 = defaultMaterial.clone()
material2.color.set(PLANE_2)

const material3 = defaultMaterial.clone()
material3.color.set(PLANE_3)

const materials = [
  material1,
  material2,
  material3,
]

/**
 * Airplane game piece.
 */
export default class Airplane extends GamePiece {

  _smoke = null

  /**
   * Initialize the airplane.
   *
   * @param {Object} position - The position of the airplane.
   * @param {Number} direction - The direction the airplane is facing.
   * @param {Object} destination - The position of the airplane's destination.
   */
  constructor({ position, direction, destination = { x: 0, y: 0, z: 0 } } = {}) {
    super({ position, direction })

    this.destination = destination

    this._hasAnimations = true
    this._isAnimating = true

    this.#create()
    this.animateIn()
  }

  #create() {
    const airplane = defaultPlane.clone()
    const material = randomItemFromArray(materials)

    airplane.children.forEach(child => {
      if (child.material.name === 'base') {
        child.material = material
      }
    })

    /**
     * Smoke.
     */
    this._smoke = new InstancedMesh(dodecahedronGeometry, defaultMaterial.clone(), 10)

    for (let i = 0; i < 6; i++) {
      if (i < 3) {
        dummy.position.set(-0.55, 0.2, (i % 5) / 3)
      } else {
        dummy.position.set(0.55, 0.2, (i % 5) / 3)
      }
      dummy.rotation.set(0, 0.1, 0)
      dummy.scale.setScalar(0.1)
      dummy.updateMatrixWorld(true)

      this._smoke.setMatrixAt(i, dummy.matrixWorld)
    }

    this._smoke.instanceMatrix.needsUpdate = true

    airplane.add(this._smoke)

    /**
     * The animations for the this._clouds.
     */
    airplane.tick = () => {
      /**
       * Bob & pitch the airplane.
       */
      const bob = Math.sin(this._tick / 10 / Math.PI) / 10
      const pitchZ = Math.sin(this._tick / 15 / Math.PI) / 10
      const pitchX = Math.sin(this._tick / 20 / Math.PI) / 20

      airplane.position.y = (this._position.y + bob) * 5
      airplane.rotation.z = pitchZ
      airplane.rotation.x = pitchX

      /**
       * Rotate the propellers.
       */
      airplane.children.forEach(child => {
        if (child.name === 'props') {
          child.rotation.z += 0.3
        }
      })

      /**
       * Animate the smoke particles.
       */
      for (let i = 0; i < 6; i++) {
        if (i < 3) {
          dummy.position.set(-0.55, 0.2, getSmokePosition(this._tick, (i * 15)))
        } else {
          dummy.position.set(0.55, 0.2, getSmokePosition(this._tick, (i * 15)))
        }
        dummy.rotation.set(0, getSmokeRotation(this._tick), getSmokeRotation(this._tick))
        dummy.scale.setScalar(getSmokeScale(this._tick, ((i * 15))))
        dummy.updateMatrixWorld(true)

        this._smoke.setMatrixAt(i, dummy.matrixWorld)
        this._smoke.instanceMatrix.needsUpdate = true
      }

      this._tick++
    }

    this.model = airplane
  }

  #update(from) {
    this._model.scale.set(from.scale, from.scale, from.scale)
    this._model.position.x = from.x * 10
    this._model.position.y = from.y * 5
    this._model.position.z = from.z * 10
  }

  animateIn() {
    const from = { x: this._position.x, y: this.position.y + 1, z: this._position.z + 1, scale: 0 }
    const to = { x: this._position.x, y: this._position.y, z: this._position.z, scale: 1 }

    this.#update(from)

    new TWEEN.Tween(from)
      .to(to, 500)
      .easing(TWEEN.Easing.Elastic.Out)
      .onUpdate(() => this.#update(from))
      .delay(1250)
      .start()
  }

  animateOut() {
    const to = { x: this._position.x, y: this._position.y + 1, z: this._position.z - 1, scale: 0 }
    const from = { x: this._position.x, y: this._position.y, z: this._position.z, scale: 1 }

    new TWEEN.Tween(from)
      .to(to, 500)
      .easing(TWEEN.Easing.Elastic.In)
      .onUpdate(() => this.#update(from))
      .start()
  }

}
