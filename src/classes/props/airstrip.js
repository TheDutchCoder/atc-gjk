import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'
import TWEEN from '@tweenjs/tween.js'

import {
  Mesh,
  Group,
  PointLight,
  Object3D,
} from 'three'

import { helvetikerBold } from '#/fonts'

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

import {
  LANDING_STRIP,
  STRIPE,
  GREEN_LIGHT,
  RED_LIGHT,
  YELLOW,
} from '#colors'

import {
  defaultMaterial,
} from '#materials'

import {
  runwayGeometry,
  stripeGeometry,
  lightGeometry,
} from '#geometries'

const stripMaterial = defaultMaterial.clone()
stripMaterial.color.set(LANDING_STRIP)

const stripeMaterial = defaultMaterial.clone()
stripeMaterial.color.set(STRIPE)

const greenLightMaterial = defaultMaterial.clone()
greenLightMaterial.color.set(GREEN_LIGHT)

const redLightMaterial = defaultMaterial.clone()
redLightMaterial.color.set(RED_LIGHT)

const labelMaterial = defaultMaterial.clone()
labelMaterial.color.set(YELLOW)


/**
 * AirStrip instance.
 */
class AirStrip {

  /**
   * The tiles that contain landing strips.
   */
  _tiles = []

  /**
   * The group of meshes that makes up the airstrip.
   */
  _airstrip = null

  /**
   * The mesh for the landing strip.
   */
  _strips = null

  /**
   * The mesh for the stripes.
   */
  _stripes = null

  /**
   * The mesh for the green lights.
   */
  _greenLightMeshes = null

  /**
   * The green lights.
   */
  _greenLights = null

  /**
   * The mesh for the red lights.
   */
  _redLightMeshes = null

  /**
   * The red lights.
   */
  _redLights = null

  /**
   * The label.
   */
  _label = null

  /**
   * Tracks time passed for continuous animations.
   */
   _tick = 0

  /**
   * Initialize the trees.
   */
  constructor () { }

  /**
   * Adds a tile where the landing strip should be rendered.
   */
  add (options) {
    this._tiles.push(options)
  }

  reset () {
    this._tiles = []
    this._airstrip = null
    this._strips = null
    this._stripes = null
    this._greenLightMeshes = null
    this._redLightMeshes = null
    this._greenLights = null
    this._redLights = null
    this._label = null
    this._tick = 0
  }

  /**
   * Populates the instances.
   */
  create () {
    this._airstrip = new Group()
    this._greenLights = new Group()
    this._redLights = new Group()

    const stripsGeometries = []
    const stripeGeometries = []
    const greenLightGeometries = []
    const redLightGeometries = []
    const labelGeometries = []

    this._tiles.forEach((tile, index) => {
      const stripGeometry = runwayGeometry.clone()
      stripGeometry.rotateY(tile.direction * Math.PI / -4)
      stripGeometry.translate(tile.position.x * 10, 0.1 + (tile.position.y * 5), tile.position.z * 10)

      stripsGeometries.push(stripGeometry)

      for (let i = 0; i < 7; i++) {
        const sGeometry = stripeGeometry.clone()
        sGeometry.translate(0, 0, -3 + i)
        sGeometry.rotateY(tile.direction * Math.PI / -4)
        sGeometry.translate(tile.position.x * 10, 0.2 + (tile.position.y * 5), tile.position.z * 10)

        stripeGeometries.push(sGeometry)
      }

      for (let i = 0; i < 5; i++) {
        const greenLightGeometry = lightGeometry.clone()
        greenLightGeometry.translate((-1 + (i * 0.5)), 0, 4)
        greenLightGeometry.rotateY(tile.direction * Math.PI / -4)
        greenLightGeometry.translate(tile.position.x * 10, tile.position.y * 5, tile.position.z * 10)

        greenLightGeometries.push(greenLightGeometry)

        const redLightGeometry = lightGeometry.clone()
        redLightGeometry.translate((-1 + (i * 0.5)), 0, -4)
        redLightGeometry.rotateY(tile.direction * Math.PI / -4)
        redLightGeometry.translate(tile.position.x * 10, tile.position.y * 5, tile.position.z * 10)

        redLightGeometries.push(redLightGeometry)
      }

      const labelGeometry = new TextGeometry(`AP${index + 1}`, {
        font: helvetikerBold,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 3,
        bevelOffset: 0,
        bevelSegments: 5,
      })

      labelGeometry.center()
      labelGeometry.scale(0.01, 0.01, 0.01)
      labelGeometry.translate(0, -3, 0)
      labelGeometry.rotateX(Math.PI / -2)
      labelGeometry.rotateY(tile.direction * Math.PI / -4)
      labelGeometry.translate(tile.position.x * 10, 0.2 + (tile.position.y * 5), tile.position.z * 10)

      labelGeometries.push(labelGeometry)

      const greenPivot = new Object3D()
      const greenLight = new PointLight(0x00ff00, 1.2, 3)
      greenLight.translateX(-1.5)
      greenLight.translateZ(4)
      greenLight.visible = false

      greenPivot.add(greenLight)
      greenPivot.translateX(tile.position.x * 10)
      greenPivot.translateY(0.5)
      greenPivot.translateZ(tile.position.z * 10)
      greenPivot.rotateY(tile.direction * Math.PI / -4)

      const redPivot = new Object3D()
      const redLight = new PointLight(0xff0000, 1.2, 3)
      redLight.translateX(1.5)
      redLight.translateZ(-4)
      redLight.visible = false

      redPivot.add(redLight, redLight)
      redPivot.translateX(tile.position.x * 10)
      redPivot.translateY(0.5)
      redPivot.translateZ(tile.position.z * 10)
      redPivot.rotateY(tile.direction * Math.PI / -4)

      this._greenLights.add(greenPivot)
      this._redLights.add(redPivot)
    })

    if (this._tiles.length) {
      const mergedStripGeometries = mergeBufferGeometries(stripsGeometries)
      const mergedStripeGeometries = mergeBufferGeometries(stripeGeometries)
      const mergedGreenLightsGeometries = mergeBufferGeometries(greenLightGeometries)
      const mergedRedLightsGeometries = mergeBufferGeometries(redLightGeometries)
      const mergedLabelGeometries = mergeBufferGeometries(labelGeometries)

      this._strips = new Mesh(mergedStripGeometries, stripMaterial)
      this._stripes = new Mesh(mergedStripeGeometries, stripeMaterial)
      this._greenLightMeshes = new Mesh(mergedGreenLightsGeometries, greenLightMaterial)
      this._redLightMeshes = new Mesh(mergedRedLightsGeometries, redLightMaterial)
      this._labels = new Mesh(mergedLabelGeometries, labelMaterial)

      this._greenLightMeshes.position.y = 0.2
      this._redLightMeshes.position.y = 0.2

      this._airstrip.add(this._strips, this._stripes, this._greenLightMeshes, this._redLightMeshes, this._labels, this._greenLights, this._redLights)
    }

    return this._airstrip
  }

  _animate = () => {
    if (this._greenLights) {
      this._greenLights.children.forEach(light => {
        if (this._tick >= 160) {
          const f = this._tick % 160
          if (f === 0 || f === 10 || f === 20 || f === 30 || f === 40) {
            light.children[0].visible = true
            light.translateX(0.5)
          }

          if (f === 41) {
            light.children[0].visible = false
          }

          if (f === 159) {
            light.children[0].visible = true
            light.translateX(-2.5)
          }
        }
      })
    }

    if (this._redLights) {
      this._redLights.children.forEach(light => {
        if (this._tick >= 160) {
          const f = this._tick % 160
          if (f === 50 || f === 60 || f === 70 || f === 80 || f === 90) {
            light.children[0].visible = true
            light.translateX(0.5)
          }

          if (f === 91) {
            light.children[0].visible = false
          }

          if (f === 49) {
            light.children[0].visible = true
            light.translateX(-2.5)
          }
        }
      })
    }

    this._tick++
  }

  /**
   * Animates the landing strip in.
   */
  animateIn () {
    if (!this._tiles.length) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      const from = { scale: 0 }
      const to = { scale: 1 }

      this.animateUpdate(from)

      new TWEEN.Tween(from)
        .to(to, 500)
        .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(() => this.animateUpdate(from))
        .onComplete(resolve)
        .delay(1000)
        .start()
    })
  }

  animateOut () {
    if (!this._tiles.length) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      const from = { scale: 1 }
      const to = { scale: 0 }

      new TWEEN.Tween(from)
        .to(to, 500)
        .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(() => this.animateUpdate(from))
        .onComplete(resolve)
        .delay(1000)
        .start()
    })
  }

  /**
   * Updates the animation.
   */
  animateUpdate (from) {
    this._airstrip.scale.setScalar(from.scale)
  }

}

const landingStrips = new AirStrip()

export default landingStrips
