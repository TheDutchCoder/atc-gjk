import TWEEN from '@tweenjs/tween.js'

import {
  mergeBufferGeometries,
} from 'three/examples/jsm/utils/BufferGeometryUtils'

import {
  Mesh,
  Group,
  Color,
  // PointLight,
} from 'three'

import {
  defaultMaterial,
  // glassMaterial,
} from '#materials'

import {
  boxGeometry,
  sphereGeometry,
  cylinderGeometry,
} from '#geometries'

import {
  setPoint,
  getPrevPosition,
  getNextPosition,
} from '#tools'

import {
  BALLOON,
  BASKET,
  ROPE,
} from '#colors'

const createDefaultBalloon = () => {
  const balloonGeometry = sphereGeometry.clone()
  balloonGeometry.scale(1.25, 1.25, 1.25)
  balloonGeometry.translate(0, 0.75, 0)

  /**
   * Geometries that will receive the base color.
   */
  const baseGeometries = mergeBufferGeometries([
    balloonGeometry,
  ])

  const basketGeometry = boxGeometry.clone()
  basketGeometry.scale(0.75, 0.6, 0.75)
  basketGeometry.translate(0, -2, 0)
  setPoint(0, basketGeometry, 0.1, 0, 0.1)
  setPoint(1, basketGeometry, 0.1, 0, -0.1)
  setPoint(4, basketGeometry, -0.1, 0, 0.1)
  setPoint(5, basketGeometry, -0.1, 0, -0.1)

  /**
   * Geometries that will receive the basket color.
   */
   const basketGeometries = mergeBufferGeometries([
    basketGeometry,
  ])

  const ropeGeometry1 = cylinderGeometry.clone()
  ropeGeometry1.scale(0.03, 2, 0.03)
  ropeGeometry1.translate(0.65, -0.8, 0.65)
  ropeGeometry1.rotateX(0.15)
  ropeGeometry1.rotateZ(-0.15)

  const ropeGeometry2 = cylinderGeometry.clone()
  ropeGeometry2.scale(0.03, 2, 0.03)
  ropeGeometry2.translate(-0.65, -0.8, 0.65)
  ropeGeometry2.rotateX(0.15)
  ropeGeometry2.rotateZ(0.15)

  const ropeGeometry3 = cylinderGeometry.clone()
  ropeGeometry3.scale(0.03, 2, 0.03)
  ropeGeometry3.translate(-0.65, -0.8, -0.65)
  ropeGeometry3.rotateX(-0.15)
  ropeGeometry3.rotateZ(0.15)

  const ropeGeometry4 = cylinderGeometry.clone()
  ropeGeometry4.scale(0.03, 2, 0.03)
  ropeGeometry4.translate(0.65, -0.8, -0.65)
  ropeGeometry4.rotateX(-0.15)
  ropeGeometry4.rotateZ(-0.15)

  /**
   * Geometries that will receive the basket color.
   */
   const ropeGeometries = mergeBufferGeometries([
    ropeGeometry1,
    ropeGeometry2,
    ropeGeometry3,
    ropeGeometry4,
  ])

  const balloon = new Group()
  balloon.name = 'balloon'

  /**
   * Assign materials to the meshes.
   */
  const baseMaterial = defaultMaterial.clone()
  baseMaterial.color.set(BALLOON)
  baseMaterial.name = 'base'

  const basketMaterial = defaultMaterial.clone()
  basketMaterial.color.set(BASKET)
  basketMaterial.name = 'basket'

  const ropeMaterial = defaultMaterial.clone()
  ropeMaterial.color.set(ROPE)
  ropeMaterial.name = 'basket'

  const baseMesh = new Mesh(baseGeometries, baseMaterial)
  const basketMesh = new Mesh(basketGeometries, basketMaterial)
  const ropeMesh = new Mesh(ropeGeometries, ropeMaterial)

  balloon.add(
    baseMesh,
    basketMesh,
    ropeMesh
  )

  return balloon
}


export default class HotAirBalloon {

  /**
   * The game tick at which this balloon should spawn.
   */
  _startTime = 0

  /**
   * The current position of the balloon.
   */
  _position = { x: 0, y: 0, z: 0 }

  /**
   * The current direction/heading of the balloon.
   */
  _direction = 0

  /**
   * The start for the balloon.
   * This can only be a coordinate on the edge of the board.
   */
  _start = null

  /**
   * The unique ID for the balloon.
   */
  _id = null

  /**
   * The color of this balloon.
   */
  _color = null

  /**
   * The model of the balloon.
   */
  _model = null

  /**
   * The tick used for animating the balloon.
   */
  _tick = 0

  /**
   * AnimateIn
   * AnimateOut
   * AnimateIdle
   */
  constructor (options) {
    const { id, start, startTime } = options
    this._start = start
    this._position = start.position
    this._direction = start.direction
    this._id = id
    this._color = new Color(Math.random() * 0xffffff)
    this._startTime = startTime

    this.create()

    return this
  }

  animate = () => this.animateIdle()

  updateAnimation (from) {
    this._model.position.x = from.position.x * 10
    this._model.position.y = from.position.y * 5
    this._model.position.z = from.position.z * 10

    this._model.scale.setScalar(from.scale)
  }

  /**
   * Animates the airballoon into the scene.
   */
  animateIn (delay = 1250, speed = 500) {
    return new Promise((resolve) => {
      const { _position, _direction } = this
      const from = { position: getPrevPosition({ ..._position }, _direction), direction: _direction, scale: 0 }
      const to = { position: { ..._position }, direction: _direction, scale: 1 }

      this.updateAnimation(from)

      new TWEEN.Tween(from)
        .to(to, speed)
        .easing(TWEEN.Easing.Elastic.Out)
        .onUpdate(() => this.updateAnimation(from))
        .onComplete(resolve)
        .delay(delay)
        .start()
    })
  }

  /**
   * Animates the airplane into the scene.
   */
  animateOut (delay = 0, speed = 500) {
    return new Promise((resolve) => {
      const { _position, _direction } = this
      const from = { position: { x: this._model.position.x / 10, y: this._model.position.y / 5, z: this._model.position.z / 10 }, direction: _direction, scale: 1 }
      const to = { position: getNextPosition(_position, _direction), direction: _direction, scale: 0 }

      this.updateAnimation(from)

      new TWEEN.Tween(from)
        .to(to, speed)
        .easing(TWEEN.Easing.Elastic.In)
        .onUpdate(() => this.updateAnimation(from))
        .onComplete(resolve)
        .delay(delay)
        .start()
    })
  }

  /**
   * Animates the plane and its parts while idle.
   */
  animateIdle () {
    const bob = Math.sin(this._tick / 10 / Math.PI) / 200

    this._model.position.y += bob

    this._tick++
  }

  /**
   * Creates the airplane at the start position and direction.
   */
  create () {
    const balloon = createDefaultBalloon(this._color)

    balloon.position.x = this._position.x * 10
    balloon.position.z = this._position.z * 10
    balloon.position.y = this._position.y * 5

    // maybe not needed
    balloon.rotation.y = this._direction * (Math.PI / -4)

    balloon._id = this._id

    this._model = balloon
  }

  /**
   * Moves the plane to its next position.
   *
   * 1. Move plane to new posiiton
   * 2. Update altitude (if needed)
   * 3. Update direction (if needed)
   */
  async next (delay = 0, scale = 1) {
    const nextPosition = getNextPosition(this._position, this._direction)

    // Move the model on the board (this should be animated).
    await this.animateNext(delay, scale)

    // Update the plane's new position.
    this._position = nextPosition
  }

  /**
   * @todo Account for crashes
   */
  async animateNext (delay = 0, scale = 1) {
    return new Promise((resolve) => {
      const from = { position: { x: this._model.position.x / 10, y: this._model.position.y / 5, z: this._model.position.z / 10 }, direction: this._model.rotation.y, scale }
      const p = getNextPosition(this._position, this._direction)

      const to = { position: p, direction: this._direction, scale: 1 }

      new TWEEN.Tween(from)
        .to(to, 500)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => this.updateAnimation(from))
        .onComplete(resolve)
        .delay(delay)
        .start()
    })
  }
}
