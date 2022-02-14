import GamePiece from '#native/classes/base/game-piece'
import TWEEN from '@tweenjs/tween.js'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'

import {
  Mesh,
  Group,
} from 'three'

import {
  LANDING_STRIP,
  STRIPE,
  RED_LIGHT,
  GREEN_LIGHT,
} from '#/colors'

import {
  defaultMaterial,
} from '#materials'

import { boxGeometry } from '#geometries'

/**
 * LandingStrip instance.
 */
export default class LandingStrip extends GamePiece {

  _landingStrip = null

  _stripes = null

  _redLights = null

  _greenLights = null

  /**
   * Initialize the LandingStrip.
   */
  constructor({ position = { x: 0, y: 0, z: 0 }, direction = 0 } = {}) {
    super({ position, direction })

    this._hasAnimations = true
    this.isAnimating = true

    this.#create()
    this.animateIn()
  }

  /**
   * Populates the instances.
   */
  #create() {
    const group = new Group()

    /**
     * Landing strip.
     */
    const stripGeometry = boxGeometry.clone()
    stripGeometry.translate(0, 0.5, 0)
    stripGeometry.scale(3, 0.2, 9)

    const stripMaterial = defaultMaterial.clone()
    stripMaterial.color.set(LANDING_STRIP)

    this._landingStrip = new Mesh(stripGeometry, stripMaterial)


    /**
     * Stripes.
     */
    const stripeGeos = [boxGeometry.clone(), boxGeometry.clone(), boxGeometry.clone(), boxGeometry.clone(), boxGeometry.clone(), boxGeometry.clone(), boxGeometry.clone()]
    const stripeMaterial = defaultMaterial.clone()
    stripeMaterial.color.set(STRIPE)

    const stripeGeometries = mergeBufferGeometries(stripeGeos.map((stripe, index) => {
      stripe.translate(0, 0.75, -4.5 + (index * 1.5))
      stripe.scale(0.2, 0.2, 0.75)

      return stripe
    }))

    this._stripes = new Mesh(stripeGeometries, stripeMaterial)


    /**
     * Red lights.
     */
    const redLightMaterial = defaultMaterial.clone()
    redLightMaterial.color.set(RED_LIGHT)

    const redLightGeos = [boxGeometry.clone(), boxGeometry.clone(), boxGeometry.clone(), boxGeometry.clone(), boxGeometry.clone()]

    const redLightGeometries = mergeBufferGeometries(redLightGeos.map((light, index) => {
      light.scale(0.2, 0.2, 0.2)
      light.translate(-1 + (index * 0.5), 0.2, 0)

      return light
    }))

    this._redLights = new Mesh(redLightGeometries, redLightMaterial)
    this._redLights.position.z = -4.15


    /**
     * Green lights.
     */
    const greenLightMaterial = defaultMaterial.clone()
    greenLightMaterial.color.set(GREEN_LIGHT)

    const greenLightGeos = [boxGeometry.clone(), boxGeometry.clone(), boxGeometry.clone(), boxGeometry.clone(), boxGeometry.clone()]

    const greenLightGeometries = mergeBufferGeometries(greenLightGeos.map((light, index) => {
      light.scale(0.2, 0.2, 0.2)
      light.translate(-1 + (index * 0.5), 0.2, 0)

      return light
    }))

    this._greenLights = new Mesh(greenLightGeometries, greenLightMaterial)
    this._greenLights.position.z = 4.15


    group.add(this._landingStrip, this._stripes, this._redLights, this._greenLights)

    this.model = group
  }

  #updateStrip(from) {
    const { scale, y } = from

    this._landingStrip.position.y = y
    this._landingStrip.scale.setScalar(scale)
  }

  #updateStripes(from) {
    const { scale, y } = from

    this._stripes.position.y = y
    this._stripes.scale.setScalar(scale)
  }

  #updateLights(from) {
    const { scale, y } = from

    this._redLights.position.y = y
    this._redLights.scale.setScalar(scale)

    this._greenLights.position.y = y
    this._greenLights.scale.setScalar(scale)
  }

  animateIn() {
    const from = { scale: 0, y: 5 }
    const to = { scale: 1, y: 0 }

    this.#updateStrip(from)
    this.#updateStripes(from)
    this.#updateLights(from)

    // new TWEEN.Tween(from)
    //   .to(to, 500)
    //   .easing(TWEEN.Easing.Elastic.Out)
    //   .onUpdate(() => this.#updateStrip(from))
    //   .delay(750)
    //   .start()

    // new TWEEN.Tween(from)
    //   .to(to, 500)
    //   .easing(TWEEN.Easing.Elastic.Out)
    //   .onUpdate(() => this.#updateStripes(from))
    //   .delay(1000)
    //   .start()

    // new TWEEN.Tween(from)
    //   .to(to, 500)
    //   .easing(TWEEN.Easing.Elastic.Out)
    //   .onUpdate(() => this.#updateLights(from))
    //   .delay(1250)
    //   .start()

    // this._stripeInstances.forEach((instance, index) => {
    //   const from = { x: 0, y: 5, z: 0 }
    //   const to = { x: 0, y: 0.2, z: 0 }
    //   console.log('animateIn')

    //   this.#updateInstance(instance, index, from)

    //   new TWEEN.Tween(from)
    //     .to(to, 500)
    //     .easing(TWEEN.Easing.Elastic.Out)
    //     .onUpdate(() => this.#updateInstance(instance, index, from))
    //     .delay(randomRoundNumber(1000, 1250))
    //     .start()
    // })
  }

  animateOut() {
    // this._instances.forEach((instance, index) => {
    //   const { scale } = instance
    //   const from = { x: scale, y: scale, z: scale }
    //   const to = { x: 0, y: 0, z: 0 }

    //   this.#updateInstance(instance, index, from)

    //   new TWEEN.Tween(from)
    //     .to(to, 500)
    //     .easing(TWEEN.Easing.Elastic.In)
    //     .onStart(() => instance.isReady = false)
    //     .onUpdate(() => this.#updateInstance(instance, index, from))
    //     .delay(randomRoundNumber(0, 250))
    //     .start()
    // })
  }

}
