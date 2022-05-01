import TWEEN from '@tweenjs/tween.js'

import {
  Group,
  MeshPhongMaterial,
  Mesh,
} from 'three'

import { helvetikerBold } from '#/fonts'

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const labelMaterial = new MeshPhongMaterial({ color: 0x3b82f6, flatShading: true })

/**
 * Label game piece.
 */
class Label {

  _tiles = []

  _labels = new Group()

  /**
   * Initialize the tile.
   *
   * @param {Object} position - The position of the tile.
   */
  constructor () { }

  add (options = { position: { x: 1, y: 1, z: 1 }, direction: 0, text: 'N' }) {
    this._tiles.push(options)
  }

  reset () {
    this._tiles = []
  }

  /**
   * Creates the tile.
   */
  create () {
    this._tiles.forEach(tile => {
      const labelGeometry = new TextGeometry(tile.text, {
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
      labelGeometry.scale(0.03, 0.03, 0.03)
      labelGeometry.rotateX(Math.PI / -2)
      labelGeometry.rotateY(tile.direction * Math.PI / -4)
      labelGeometry.translate(tile.position.x * 10, -0.5 + (tile.position.y * 5), tile.position.z * 10)
      this._labels.add(new Mesh(labelGeometry, labelMaterial))
    })

    return this._labels
  }

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
        .delay(0)
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
        .delay(1250)
        .start()
    })
  }

  animateUpdate (from) {
    this._labels.scale.setScalar(from.scale)
  }

}

const label = new Label()

export default label
