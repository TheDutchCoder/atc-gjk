import TWEEN from '@tweenjs/tween.js'

import {
  mergeBufferGeometries,
} from 'three/examples/jsm/utils/BufferGeometryUtils'

import {
  Mesh,
  Group,
  Color,
  PointLight,
  InstancedMesh,
  Object3D,
} from 'three'

import {
  defaultMaterial,
  glassMaterial,
  smokeMaterial,
} from '#materials'

import {
  boxGeometry,
  coneGeometry,
  dodecahedronGeometry,
} from '#geometries'

import {
  setPoint,
  getPrevPosition,
  getNextPosition,
  randomRoundNumber,
  randomNumber,
} from '#tools'

import {
  flightStatusses,
} from '#/constants'

import {
  PLANE,
  PLANE_SELECTED,
  PLANE_INDICATOR,
} from '#colors'

const ghostColor = new Color(0xffffff)
const dummy = new Object3D()

const createDefaultPlane = (color, _this, showIndicator) => {
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


  // Lights.
  const greenLightGeometry = boxGeometry.clone()
  greenLightGeometry.scale(0.1, 0.1, 0.1)
  greenLightGeometry.translate(1.7, 0, -0.5)

  const redLightGeometry = boxGeometry.clone()
  redLightGeometry.scale(0.1, 0.1, 0.1)
  redLightGeometry.translate(-1.7, 0, -0.5)


  const plane = new Group()
  plane.name = 'plane'


  /**
   * Assign materials to the meshes.
   */
  const baseMaterial = defaultMaterial.clone()
  baseMaterial.color.set(color)
  baseMaterial.name = 'base'

  const screenMaterial = glassMaterial.clone()
  const engineMaterial = defaultMaterial.clone()
  const nutMaterial = defaultMaterial.clone()
  const propMaterial = defaultMaterial.clone()
  const selectorMaterial = defaultMaterial.clone()
  const greenLightMaterial = glassMaterial.clone()
  const redLightMaterial = glassMaterial.clone()

  const screenColor = new Color(0xaadff3)
  const propColor = new Color(0x000000)
  const nutColor = new Color(0x99684a)
  const engineColor = new Color(0xffffff)
  const selectorColor = new Color(0x00ff00)
  const greenLightColor = new Color(0x00ff00)
  const redLightColor = new Color(0xff0000)

  screenMaterial.color.set(screenColor)
  engineMaterial.color.set(engineColor)
  nutMaterial.color.set(nutColor)
  propMaterial.color.set(propColor)
  selectorMaterial.color.set(selectorColor)
  greenLightMaterial.color.set(greenLightColor)
  redLightMaterial.color.set(redLightColor)
  // smokeMaterial.color.set(smokeColor)

  const baseMesh = new Mesh(baseGeometries, baseMaterial)
  baseMesh.castShadow = true
  const glassMesh = new Mesh(glassGeometries, screenMaterial)
  const metalMesh = new Mesh(metalGeometries, engineMaterial)
  const blackStaticMesh = new Mesh(blackStaticGeometries, propMaterial)
  const blackDynamicMesh = new Mesh(blackDynamicGeometries, propMaterial)
  blackDynamicMesh.name = 'props'
  const brownMesh = new Mesh(brownGeometries, nutMaterial)
  const selectorMesh = new Mesh(selectorGeometries, selectorMaterial)
  selectorMesh.name = 'selector'
  selectorMesh.visible = false

  const greenLightMesh = new Mesh(greenLightGeometry, greenLightMaterial)
  const redLightMesh = new Mesh(redLightGeometry, redLightMaterial)

  const amount = 10

  for (let i = 0; i < amount; i++) {
    _this._instances.push({
      pos: {
        x: i % 2 === 0 ? 0.55 : -0.55,
        y: 0.2,
        z: -0.1 + Math.floor(i / 2) * 0.15,
      },
      rot: {
        x: (Math.PI * 2) * Math.random(),
        y: (Math.PI * 2) * Math.random(),
        z: (Math.PI * 2) * Math.random(),
      },
      animation: {
        direction: (Math.random() > 0.5 ? 1 : - 1),
        speed: randomRoundNumber(200, 300),
      },
      scale: randomNumber(0.1, 0.2),
    })
  }

  const smoke = new InstancedMesh(dodecahedronGeometry, smokeMaterial, amount)

  // Create lights.
  const greenLight = new PointLight(0x00ff00, 1.2, 3)
  greenLight.name = 'green'
  greenLight.translateX(1.7)
  greenLight.translateY(0)
  greenLight.translateZ(-0.6)

  const redLight = new PointLight(0xff0000, 1.2, 3)
  redLight.name = 'red'
  redLight.translateX(-1.7)
  redLight.translateY(0)
  redLight.translateZ(-0.6)

  // Pilot.
  const pilot = new Group()

  const bodyGeometry = boxGeometry.clone()
  bodyGeometry.scale(0.5, 0.5, 0.5)
  bodyGeometry.translate(0, 0.35, -0.2)

  const headGeometry = boxGeometry.clone()
  headGeometry.scale(0.3, 0.3, 0.3)
  headGeometry.translate(0, 0.75, -0.15)

  const earLeftGeometry = boxGeometry.clone()
  earLeftGeometry.scale(0.1, 0.1, 0.07)
  earLeftGeometry.translate(0.15, 0.75, -0.17)

  const earRightGeometry = earLeftGeometry.clone()
  earRightGeometry.translate(-0.3, 0, 0)

  const bodyMaterial = defaultMaterial.clone()
  const bodyColor = new Color(0x473f3c)
  bodyMaterial.color.set(bodyColor)

  const bodyMesh = new Mesh(bodyGeometry, bodyMaterial)

  const headMaterial = defaultMaterial.clone()
  const headColor = new Color(0xf8e2d3)
  headMaterial.color.set(headColor)

  const goggleLeftGeometry = boxGeometry.clone()
  goggleLeftGeometry.scale(0.13, 0.13, 0.13)
  goggleLeftGeometry.translate(0.10, 0.75, -0.32)

  const goggleRightGeometry = goggleLeftGeometry.clone()
  goggleRightGeometry.translate(-0.20, 0, 0)

  const strapGeometry = boxGeometry.clone()
  strapGeometry.scale(0.34, 0.02, 0.34)
  strapGeometry.translate(0, 0.75, -0.15)

  const hairGeometry = boxGeometry.clone()
  hairGeometry.scale(0.32, 0.1, 0.31)
  hairGeometry.translate(0, 0.9, -0.12)

  const hairSmallGeometry = boxGeometry.clone()
  hairSmallGeometry.scale(0.1, 0.1, 0.1)
  hairSmallGeometry.translate(0.14, 0.95, -0.22)

  const hair3Geometry = hairSmallGeometry.clone()
  hair3Geometry.translate(0.05, 0.04, 0.05)

  const hair4Geometry = hairSmallGeometry.clone()
  hair4Geometry.translate(0.02, 0.06, 0.15)

  const hair5Geometry = hairSmallGeometry.clone()
  hair5Geometry.translate(-0.1, 0, 0.25)

  const hair6Geometry = hairSmallGeometry.clone()
  hair6Geometry.translate(-0.2, 0.08, 0.18)

  const hair7Geometry = hairSmallGeometry.clone()
  hair7Geometry.translate(-0.25, 0.04, 0.21)

  const hair8Geometry = hairSmallGeometry.clone()
  hair8Geometry.translate(-0.12, 0.08, 0.07)

  const hair9Geometry = hairSmallGeometry.clone()
  hair9Geometry.translate(-0.22, 0, 0)

  const hair10Geometry = hairSmallGeometry.clone()
  hair10Geometry.translate(-0.15, 0.04, -0.022)

  const hair11Geometry = hairSmallGeometry.clone()
  hair11Geometry.translate(-0.30, 0.04, 0.042)

  const hairGeometries = mergeBufferGeometries([
    hairGeometry,
    hairSmallGeometry,
    hair3Geometry,
    hair4Geometry,
    hair5Geometry,
    hair6Geometry,
    hair7Geometry,
    hair8Geometry,
    hair9Geometry,
    hair10Geometry,
    hair11Geometry,
  ])

  const hairMaterial = defaultMaterial.clone()
  const hairColor = new Color(0xd6d6d6)
  hairMaterial.color.set(hairColor)

  const headMesh = new Mesh(headGeometry, headMaterial)
  const earLeftMesh = new Mesh(earLeftGeometry, headMaterial)
  const earRightMesh = new Mesh(earRightGeometry, headMaterial)
  const goggleLeftMesh = new Mesh(goggleLeftGeometry, bodyMaterial)
  const goggleRightMesh = new Mesh(goggleRightGeometry, bodyMaterial)
  const strapMesh = new Mesh(strapGeometry, bodyMaterial)
  const hairMesh = new Mesh(hairGeometries, hairMaterial)

  // const pilotGroup = new Group()
  // pilotGroup.name = 'pilot'

  // const planeGroup = new Group()
  // planeGroup.name = 'plane'

  // const airplaneGroup = new Group()
  // airplaneGroup.name = 'airplane'

  // const indicatorGroup = new Group()
  // indicatorGroup.name = 'indicator'

  plane.add(
    bodyMesh,
    headMesh,
    earLeftMesh,
    earRightMesh,
    goggleLeftMesh,
    goggleRightMesh,
    strapMesh,
    hairMesh
  )

  plane.add(
    baseMesh,
    glassMesh,
    metalMesh,
    blackStaticMesh,
    blackDynamicMesh,
    brownMesh,
    selectorMesh,
    greenLightMesh,
    redLightMesh,
    greenLight,
    redLight,
    smoke,
    pilot
  )

  _this._smoke = smoke


  // Indicator
  const indicatorGeometry = boxGeometry.clone()
  indicatorGeometry.scale(1, 1, 1)

  const indicatorMaterial = glassMaterial.clone()
  indicatorMaterial.color.set(PLANE_INDICATOR)
  indicatorMaterial.name = 'indicator'

  const indicatorGeometries = mergeBufferGeometries([
    hullGeometry.clone(),
    wingsGeometry.clone(),
    rudderGeometry.clone(),
    engineGeometry.clone(),
  ])

  const indicatorMesh = new Mesh(indicatorGeometries, indicatorMaterial)
  const indicator = new Group()

  indicator.add(indicatorMesh)

  _this._indicator = indicator
  _this._indicator.visible = showIndicator

  return plane
}


export default class Airplane {

  /**
   * The game tick at which this plane should spawn.
   */
  _startTime = 0

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
   * The start for the airplane, including direction.
   * This can either be a coordinate on the edge of the board, or an airfield.
   */
  _start = null

  /**
   * The destination for the airplane, including direction.
   * This can either be a coordinate on the edge of the board, or an airfield.
   */
  _end = null

  /**
   * Whether the airplane has spawned on the game board.
   */
  _spawned = false

  /**
   * Whether the airplane has taken off.
   */
  _takenOff = false

  /**
   * Whether the airplane has landed.
   */
  _landed = false

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
   * The model of the indicator.
   */
  _indicator = new Object3D()

  /**
   * The tick used for animating the airplane.
   */
  _tick = 0

  /**
   * Tracks the amout of fuel this plane has.
   */
  _fuel = 0

  /**
   * The status of the plane.
   */
  _flightStatus = flightStatusses.SCHEDULED

  /**
   * Instances for the smoke.
   */
  _instances = []

  _smoke = new Object3D()

  /**
   * AnimateIn
   * AnimateOut
   * AnimateIdle
   */
  constructor (options) {
    const { id, start, end, fuel, startTime, showIndicator, targetAltitude } = options
    this._start = start
    this._end = end
    this._position = start.position
    this._direction = start.direction
    this._targetAltitude = targetAltitude || 1
    this._takenOff = this._position.y !== 0
    this._id = id
    this._name = 'GJK'
    this._color = PLANE
    this._fuel = fuel
    this._startTime = startTime

    this.create(showIndicator)

    return this
  }

  animate = () => this.animateIdle()

  updateAnimation (from, toZero) {
    this._model.position.x = from.position.x * 10
    this._model.position.y = from.position.y * 5
    this._model.position.z = from.position.z * 10

    this._indicator.position.x = from.position.x * 10
    this._indicator.position.y = 0
    this._indicator.position.z = from.position.z * 10

    this._model.scale.setScalar(from.scale)
    this._indicator.scale.setScalar(toZero ? 0 : from.scale)
  }

  /**
   * Animates the airplane into the scene.
   */
  animateIn (delay = 1250, speed = 500) {
    return new Promise((resolve) => {
      const { _position, _direction } = this
      let from
      let to

      if (!this._takenOff) {
        from = { position: { ..._position }, direction: _direction, scale: 0 }
        to = { position: { ..._position }, direction: _direction, scale: 1 }
        from.position.y = 0.18
        to.position.y = 0.18
      } else {
        from = { position: getPrevPosition({ ..._position }, _direction), direction: _direction, scale: 0 }
        to = { position: { ..._position }, direction: _direction, scale: 1 }
      }

      this.updateAnimation(from, to.position.y < 1)

      new TWEEN.Tween(from)
        .to(to, speed)
        .easing(TWEEN.Easing.Elastic.Out)
        .onUpdate(() => this.updateAnimation(from, to.position.y < 1))
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

      this.updateAnimation(from, to.position.y < 1)

      new TWEEN.Tween(from)
        .to(to, speed)
        .easing(TWEEN.Easing.Elastic.In)
        .onUpdate(() => this.updateAnimation(from, to.position.y < 1))
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

    if (this._position.y >= 1) {
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

      if (child.name === 'green') {
        if (this._tick % 120 === 0) {
          child.visible = true
        }

        if (this._tick % 120 === 4) {
          child.visible = false
        }
      }

      if (child.name === 'red') {
        if (this._tick % 120 === 40) {
          child.visible = true
        }

        if (this._tick % 120 === 44) {
          child.visible = false
        }
      }
    })

    this._instances.forEach((instance, index) => {
      this.updateInstance(instance, index)
    })

    this._tick++
  }

  /**
   * Updates the smoke animation.
   */
   updateInstance (instance, index) {
    const { pos, rot, scale, animation } = instance
    const { x: posX, y: posY } = pos
    const { x: rotX, y: rotY, z: rotZ } = rot
    const { direction } = animation

    const fraction = ((this._tick + (index * -10)) % 200) / 200

    const dPos = fraction * 2 + (index < 5 ? 0.4 : 0)

    dummy.position.set(posX, posY, -0.1 + dPos)
    dummy.rotation.set(rotX, rotY, rotZ + ((this._tick / 100) * direction))

    const sc = (Math.sin(fraction * (Math.PI))) * scale
    dummy.scale.setScalar(sc)

    dummy.updateMatrixWorld(true)

    this._smoke.setMatrixAt(index, dummy.matrixWorld)

    this._smoke.instanceMatrix.needsUpdate = true
  }

  /**
   * Creates the airplane at the start position and direction.
   */
  create (showIndicator) {
    const plane = createDefaultPlane(this._color, this, showIndicator)

    plane.position.x = this._position.x * 10
    plane.position.z = this._position.z * 10
    plane.position.y = this._position.y * 5

    this._indicator.position.x = this._position.x * 10
    this._indicator.position.z = this._position.z * 10
    this._indicator.position.y = 0

    plane.rotation.y = this._direction * (Math.PI / -4)
    this._indicator.rotation.y = this._direction * (Math.PI / -4)

    if (!this._takenOff) {
      plane.rotateX(0.1)
    }

    plane._id = this._id

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
    await this.animateNext(altMod, dirMod, delay, scale, this._takenOff ? 0 : 0.1)
    this.unsetGhost()

    // The plane has taken off in every case on the first next step.
    this._takenOff = true
    this._flightStatus = flightStatusses.IN_FLIGHT

    // Update the plane's new position.
    nextPosition.y += altMod
    this._position = nextPosition

    // Update the plane's new direction.
    this._direction = (8 + (this._direction + dirMod)) % 8
    this._model.rotation.y = this._direction * (Math.PI / -4)
    this._indicator.rotation.y = this._direction * (Math.PI / -4)

    // Reduce the plane's fuel
    this._fuel -= 1
  }

  /**
   * @todo Account for crashes
   */
  async animateNext (nextAlt, nextDir, delay = 0, scale = 1) {
    return new Promise((resolve) => {
      const from = { position: { x: this._model.position.x / 10, y: this._model.position.y / 5, z: this._model.position.z / 10 }, direction: this._model.rotation.y, scale }
      const p = getNextPosition(this._position, this._direction)
      p.y += nextAlt

      // Planes on the ground are raised slightly.
      if (p.y === 0) {
        p.y = 0.18
      }

      const to = { position: p, direction: this._model.rotation.y + (nextDir * Math.PI / -4), scale: 1 }

      new TWEEN.Tween(from)
        .to(to, 500)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => this.updateAnimation(from, to.position.y < 1))
        .onComplete(resolve)
        .delay(delay)
        .start()
    })
  }

  setGhost () {
    this._isGhost = true

    this._model.children.forEach(child => {
      if (child.material && child.material.name === 'base') {
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
      if (child.material && child.material.name === 'base') {
        this._isSelected ? child.material.color.set(PLANE_SELECTED) : child.material.color.set(this._color)
      }

      if (child.material && child.material.name !== 'selector') {
        child.material.transparent = false
        child.material.opacity = 1
        child.material.needsUpdate = true
      }
    })
  }

  setSpawned () {
    this._spawned = true
    this._flightStatus = flightStatusses.APPROACHING
  }

  setExited () {
    this._flightStatus = flightStatusses.EXITED
  }

  setLanded () {
    this._flightStatus = flightStatusses.LANDED
  }

  setLost () {
    this._flightStatus = flightStatusses.LOST
  }

  setCrashed () {
    this._flightStatus = flightStatusses.CRASHED
  }

  setSelected () {
    this._isSelected = true

    this._model.children.forEach(child => {
      if (child.name === 'selector') {
        child.visible = true
      }

      if (child.material && child.material.name === 'base') {
        child.material.color.set(PLANE_SELECTED)
      }
    })
  }

  unsetSelected () {
    this._isSelected = false

    this._model.children.forEach(child => {
      if (child.name === 'selector') {
        child.visible = false
      }

      if (child.material && child.material.name === 'base') {
        child.material.color.set(this._color)
      }
    })
  }

  setHeight (height) {
    this._targetAltitude = height
  }

  setDirection (direction) {
    this._targetDirection = direction
  }
}
