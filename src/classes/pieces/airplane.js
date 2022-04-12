// import { ref, watch } from 'vue'

import TWEEN from '@tweenjs/tween.js'

import {
  mergeBufferGeometries,
} from 'three/examples/jsm/utils/BufferGeometryUtils'

import {
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
  coneGeometry,
} from '#geometries'

import {
  setPoint,
  getPrevPosition,
  getNextPosition,
} from '#tools'

const ghostColor = new Color(0xffffff)

const createDefaultPlane = (color) => {
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


  const selectorGeometry = coneGeometry.clone()
  selectorGeometry.scale(1.2, 0.42, 1.2)
  selectorGeometry.rotateX(Math.PI)
  selectorGeometry.translate(0, 2, 0)

  const selectorGeometries = mergeBufferGeometries([
    selectorGeometry,
  ])


  const plane = new Group()

  /**
   * Assign materials to the eshes.
   */
  const baseMaterial = defaultMaterial.clone()
  baseMaterial.color.set(color)
  baseMaterial.name = 'base'

  const screenMaterial = glassMaterial.clone()
  const engineMaterial = defaultMaterial.clone()
  const nutMaterial = defaultMaterial.clone()
  const propMaterial = defaultMaterial.clone()
  const selectorMaterial = defaultMaterial.clone()

  const screenColor = new Color(0xe2eff4)
  const propColor = new Color(0x000000)
  const nutColor = new Color(0x99684a)
  const engineColor = new Color(0xffffff)
  const selectorColor = new Color(0x00ff00)

  screenMaterial.color.set(screenColor)
  engineMaterial.color.set(engineColor)
  nutMaterial.color.set(nutColor)
  propMaterial.color.set(propColor)
  selectorMaterial.color.set(selectorColor)

  const baseMesh = new Mesh(baseGeometries, baseMaterial)
  const glassMesh = new Mesh(glassGeometries, screenMaterial)
  const metalMesh = new Mesh(metalGeometries, engineMaterial)
  const blackStaticMesh = new Mesh(blackStaticGeometries, propMaterial)
  const blackDynamicMesh = new Mesh(blackDynamicGeometries, propMaterial)
  blackDynamicMesh.name = 'props'
  const brownMesh = new Mesh(brownGeometries, nutMaterial)
  const selectorMesh = new Mesh(selectorGeometries, selectorMaterial)
  selectorMesh.name = 'selector'
  selectorMesh.visible = false

  plane.add(
    baseMesh,
    glassMesh,
    metalMesh,
    blackStaticMesh,
    blackDynamicMesh,
    brownMesh,
    selectorMesh
  )

  return plane
}

/**
 * @todo when plane is on the ground, tilt it slightly and stop the
 * bobbing/pitching.
 *
 * @todo initial direction is wrong :D when z: -6
 */
export default class Airplane {

  /**
   * The current position of the airplane.
   */
  _position = { x: 0, y: 0, z: 0 }

  /**
   * The current direction/heading of the airplane.
   */
  _direction = 0

  /**
   * The altitude modifier for the next move.
   *
   * > 0: go up
   *   0: stay level
   * < 0: go down
   */
  _targetAltitude = 0

  /**
   * The direction modifier for the airplane.
   *
   * > 0: turn right
   *   0: straight
   * < 0: turn left
   */
  _targetDirection = 0

  /**
   * The destination for the airplane.
   * This can either be a coordinate on the edge of the board, or an airfield.
   */
  _endPosition = { x: 0, y: 0, z: 0 }

  /**
   * The direction the airplane has to exit or land with.
   */
  _endDirection = 0

  /**
   * Whether the airplane has spawned on the game board.
   */
  _spawned = false

  /**
   * Whether the airplane is currently uncontrollable.
   */
  _isGhost = false

  /**
   * Whether the airplane is currently selected.
   */
  _isSelected = false

  /**
   * The name/flight-number of the airplane.
   */
  _name = ''

  /**
   * The unique ID for the airplane.
   */
  _id = null

  /**
   * The color of this airplane.
   */
  _color = null

  /**
   * The model of the airplane.
   */
  _model = null

  /**
   * The tick used for animating the airplane.
   */
  _tick = 0

  /**
   * AnimateIn
   * AnimateOut
   * AnimateIdle
   */
  constructor (position, direction, endPosition, endDirection, id) {
    this._position = position
    this._direction = direction
    this._endPosition = endPosition
    this._endDirection = endDirection
    this._targetAltitude = this._position.y
    this._id = id
    this._name = `GJK`
    this._color = new Color(Math.random() * 0xffffff)

    this.create()

    return this
  }

  animate = () => this.animateIdle()

  updateAnimation (plane, from) {
    plane.position.x = from.position.x * 10
    plane.position.z = from.position.z * 10

    if (this._position.y === 0) {
      plane.position.y = 0.8
    } else {
      plane.position.y = from.position.y * 5
    }

    plane.scale.setScalar(from.scale)
  }

  /**
   * Animates the airplane into the scene.
   */
  animateIn (delay = 1250, speed = 500) {
    return new Promise((resolve) => {
      const { _position, _direction } = this
      const from = { position: getPrevPosition(_position, _direction), direction: this._direction, scale: 0 }
      const to = { position: _position, direction: this._direction, scale: 1 }

      this.updateAnimation(this._model, from)

      new TWEEN.Tween(from)
        .to(to, speed)
        .easing(TWEEN.Easing.Elastic.Out)
        .onUpdate(() => this.updateAnimation(this._model, from))
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
      const from = { position: { x: this._model.position.x / 10, y: this._model.position.y / 5, z: this._model.position.z / 10 }, direction: this._direction, scale: 1 }
      const to = { position: getNextPosition(_position, _direction), direction: this._direction, scale: 0 }

      this.updateAnimation(this._model, from)

      new TWEEN.Tween(from)
        .to(to, speed)
        .easing(TWEEN.Easing.Elastic.In)
        .onUpdate(() => this.updateAnimation(this._model, from))
        .onComplete(resolve)
        .delay(delay)
        .start()
    })
  }

  /**
   * Animates the plane and its parts while idle.
   */
  animateIdle () {
    const bob = Math.sin(this._tick / 10 / Math.PI) / 100
    const pitchZ = Math.sin(this._tick / 15 / Math.PI) / 10
    const pitchX = Math.sin(this._tick / 20 / Math.PI) / 20

    if (this._position.y !== 0) {
      this._model.position.y += bob
      this._model.rotation.z = pitchZ
      this._model.rotation.x = pitchX
    }

    this._model.children.forEach(child => {
      if (child.name === 'props') {
        child.rotation.z += 0.3
      }

      if (child.name === 'selector') {
        child.rotation.y += 0.01
        child.position.y += bob
      }
    })

    this._tick++
  }

  /**
   * Creates the airplane at the start position and direction.
   *
   * @todo create at airfield.
   * @todo add updatePosition?
   */
  create () {
    this._spawned = true

    const plane = createDefaultPlane(this._color)

    plane.position.x = this._position.x * 10
    plane.position.z = this._position.z * 10

    if (plane.position > 0) {
      plane.position.y = this._position.y * 5
    } else {
      plane.position.y = 0.8
    }

    plane.rotation.y = this._direction * (Math.PI / -4)

    this._model = plane
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
    let altMod = 0
    let dirMod = 0

    if (this._targetAltitude > this._position.y) {
      altMod = 1
    } else if (this._targetAltitude < this._position.y) {
      altMod = -1
    }

    if (this._targetDirection > 0) {
      this._targetDirection--
      dirMod = 1
    } else if (this._targetDirection < 0) {
      this._targetDirection++
      dirMod = -1
    }

    // Move the model on the board (this should be animated).
    // this.unsetGhost()
    await this.animateNext(altMod, dirMod, delay, scale)

    // Update the plane's new position.
    nextPosition.y += altMod
    this._position = nextPosition

    // Update the plane's new direction.
    this._direction = (8 + (this._direction + dirMod)) % 8
    this._model.rotation.y = this._direction * (Math.PI / -4)

    // Check if the plane is currently a ghost.
    // this.checkGhost(false)

    // Check if the plane has crashed into something (ground, obstacle, airplane)
    // this.checkForCrashes()

    // Check if the plane has reached its destination with poor man's deep equal.
    if (
      JSON.stringify(this._position) === JSON.stringify(this._endPosition) &&
      this._direction === this._endDirection
    ) {
      console.log('yay, plane landed at target!')
    }
  }

  async animateNext (nextAlt, nextDir, delay = 0, scale = 1) {
    return new Promise((resolve) => {
      const from = { position: { x: this._model.position.x / 10, y: this._model.position.y / 5, z: this._model.position.z / 10 }, direction: this._model.rotation.y, scale }
      const p = getNextPosition(this._position, this._direction)
      p.y += nextAlt
      const to = { position: p, direction: this._model.rotation.y + (nextDir * Math.PI / -4), scale: 1 }

      new TWEEN.Tween(from)
        .to(to, 500)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => this.updateAnimation(this._model, from, this._targetDirection > 0))
        .onComplete(resolve)
        .delay(delay)
        .start()
    })
  }

  setGhost () {
    this._isGhost = true

    this._model.children.forEach(child => {
      if (child.material.name === 'base') {
        child.material.color.set(ghostColor)
      }

      if (child.material && child.material.name !== 'selector') {
        child.material.transparent = true
        child.material.opacity = 0.75
        child.material.needsUpdate = true
      }
    })
  }

  unsetGhost () {
    this._isGhost = false

    this._model.children.forEach(child => {
      if (child.material.name === 'base') {
        child.material.color.set(this._color)
      }

      if (child.material && child.material.name !== 'selector') {
        child.material.transparent = false
        child.material.opacity = 1
        child.material.needsUpdate = true
      }
    })
  }

  setSelected () {
    this._isSelected = true

    this._model.children.forEach(child => {
      if (child.name === 'selector') {
        child.visible = true
      }
    })
  }

  unsetSelected () {
    this._isSelected = false

    this._model.children.forEach(child => {
      if (child.name === 'selector') {
        child.visible = false
      }
    })
  }

  setHeight (height) {
    this._targetAltitude = height
  }
}
