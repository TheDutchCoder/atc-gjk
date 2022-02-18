import TWEEN from '@tweenjs/tween.js'

import {
  mergeBufferGeometries,
} from 'three/examples/jsm/utils/BufferGeometryUtils'

import {
  Object3D,
  Mesh,
  Group,
  Color,
} from 'three'

import {
  defaultMaterial,
  glassMaterial,
} from '#materials'

import {
  boxGeometry,
} from '#geometries'

import {
  randomRoundNumber,
  setPoint,
} from '#tools'

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


/**
 * Airplanes instance.
 */
class Airplanes {

  /**
   * The tiles that contain airplanes.
   */
  _tiles = []

  _models = []

  _airplanes = new Group()

  _animate = () => { }

  _tick = 0

  /**
   * Initialize the airplanes.
   */
  constructor() { }

  /**
   * Adds airplanes to a tile.
   */
  add(options) {
    this._tiles.push(options)
  }

  reset() {
    this._tiles = []
    this._models = []
    this._airplanes = new Group()
    this._animate = () => { }
    this._tick = 0
  }

  /**
   * Populates the instances.
   */
  create() {
    this._tiles.forEach(tile => {
      const plane = defaultPlane.clone()

      plane.children.forEach(child => {
        if (child.material.name === 'base') {
          child.material.color.set(new Color(Math.random() * 0xfffff))
        }
      })

      plane.position.x = tile.position.x * 10
      plane.position.y = tile.position.y * 5
      plane.position.z = tile.position.z * 10

      plane.rotation.y = tile.direction * Math.PI / -4
      plane.scale.setScalar(0)

      this._airplanes.add(plane)
      this._models.push(plane)
    })

    this._animate = () => {
      this._models.forEach(plane => {
        this.animatePlane(plane)
      })

      this._tick++
    }

    return this._airplanes
  }

  /**
   * Animates the plane and its parts.
   */
  animatePlane(plane) {
    const bob = Math.sin(this._tick / 10 / Math.PI) / 100
    const pitchZ = Math.sin(this._tick / 15 / Math.PI) / 10
    const pitchX = Math.sin(this._tick / 20 / Math.PI) / 20

    plane.position.y += bob
    plane.rotation.z = pitchZ
    plane.rotation.x = pitchX

    plane.children.forEach(child => {
      if (child.name === 'props') {
        child.rotation.z += 0.3
      }
    })
  }

  /**
   * Updates the animation.
   */
  updateAnimation(plane, from) {
    plane.position.x = from.position.x * 10
    plane.position.y = from.position.y * 5
    plane.position.z = from.position.z * 10

    plane.scale.setScalar(from.scale)
  }

  /**
   * Shows the airplanes with an animation.
   */
  animateIn() {
    if (!this._tiles.length) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      this._models.forEach(plane => {
        const from = { position: { x: -1, y: 1, z: 1 }, scale: 0 }
        const to = { position: { x: 0, y: 1, z: 0 }, scale: 1 }

        this.updateAnimation(plane, from)

        new TWEEN.Tween(from)
          .to(to, 500)
          .easing(TWEEN.Easing.Elastic.Out)
          .onUpdate(() => this.updateAnimation(plane, from))
          .onComplete(resolve)
          .delay(1250)
          .start()
      })
    })
  }

  /**
   * Hides the airplanes with an animation.
   */
  animateOut() {
    if (!this._tiles.length) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      this._models.forEach(plane => {
        const { x: posX, y: posY, z: posZ } = plane.position

        const from = { position: { x: posX / 10, y: posY / 5, z: posZ / 10 }, scale: 1 }
        const to = { position: { x: 1, y: 1, z: -1 }, scale: 0 }

        new TWEEN.Tween(from)
          .to(to, 500)
          .easing(TWEEN.Easing.Elastic.In)
          .onUpdate(() => this.updateAnimation(plane, from))
          .onComplete(resolve)
          .delay(0)
          .start()
      })
    })
  }
}

const airplanes = new Airplanes()

export default airplanes
