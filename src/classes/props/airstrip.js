import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'
import TWEEN from '@tweenjs/tween.js'

import {
  Mesh,
  Group,
} from 'three'

import {
  LANDING_STRIP,
  STRIPE,
  GREEN_LIGHT,
  RED_LIGHT,
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
  _greenLights = null

  /**
   * The mesh for the red lights.
   */
  _redLights = null

  /**
   * Initialize the trees.
   */
  constructor() { }

  /**
   * Adds a tile where the landing strip should be rendered.
   */
  add(options) {
    this._tiles.push(options)
  }

  reset() {
    this._tiles = []
    this._airstrip = null
    this._strips = null
    this._stripes = null
    this._greenLights = null
    this._redLights = null
  }

  /**
   * Populates the instances.
   */
  create() {
    this._airstrip = new Group()

    const stripsGeometries = []
    const stripeGeometries = []
    const greenLightGeometries = []
    const redLightGeometries = []

    this._tiles.forEach(tile => {
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
    })

    if (this._tiles.length) {
      const mergedStripGeometries = mergeBufferGeometries(stripsGeometries)
      const mergedStripeGeometries = mergeBufferGeometries(stripeGeometries)
      const mergedGreenLightsGeometries = mergeBufferGeometries(greenLightGeometries)
      const mergedRedLightsGeometries = mergeBufferGeometries(redLightGeometries)

      this._strips = new Mesh(mergedStripGeometries, stripMaterial)
      this._stripes = new Mesh(mergedStripeGeometries, stripeMaterial)
      this._greenLights = new Mesh(mergedGreenLightsGeometries, greenLightMaterial)
      this._redLights = new Mesh(mergedRedLightsGeometries, redLightMaterial)

      this._greenLights.position.y = 0.2
      this._redLights.position.y = 0.2

      this._airstrip.add(this._strips, this._stripes, this._greenLights, this._redLights)
    }

    return this._airstrip
  }

  /**
   * Animates the landing strip in.
   */
  animateIn() {
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

  animateOut() {
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
  animateUpdate(from) {
    this._airstrip.scale.setScalar(from.scale)
  }

}

const landingStrips = new AirStrip()

export default landingStrips
