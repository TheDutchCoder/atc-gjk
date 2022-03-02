import { ref } from 'vue'
import { Scene } from 'three'

import Dirt from '#/classes/tiles/dirt'
import Grass from '#/classes/tiles/grass'
import Trees from '#/classes/props/trees'
import Rocks from '#/classes/props/rocks'
import Clouds from '#/classes/pieces/clouds'
import Airstrip from '#/classes/props/airstrip'
import Tracks from '#/classes/props/tracks'

const cleanMaterial = material => {
  material.dispose()

  // dispose textures
  for (const key of Object.keys(material)) {
    const value = material[key]
    if (value && typeof value === 'object' && 'minFilter' in value) {
      value.dispose()
    }
  }
}

/**
 * Base class for scenes.
 */
export default class GameScene {

  /**
   * The scene itself.
   */
  _scene = null

  _anims = []

  /**
   * The lights in the scene.
   */
  _lights = []

  /**
   * The models in the scene.
   */
  _models = []

  /**
   * The scene's fog.
   */
  _fog = null

  /**
   * All the static game elements.
   */
  _elements = [
    Dirt,
    Grass,
    Trees,
    Rocks,
    Clouds,
    Airstrip,
    Tracks,
  ]

  _airplanes = []

  /**
   * The board in this scene (if any).
   */
  _board = null

  _tick = ref(-1)

  /**
   * Animates objects in the scene.
   */
  _animate = () => {
    Clouds._animate()
    // Airplanes._animate()

    this._airplanes.forEach(plane => plane?.animate())
  }

  /**
   * Initialize the scene.
   */
  constructor () {
    this._scene = new Scene()
  }

  /**
   * Adds a light to the scene.
   */
  addLight (light) {
    this._lights.push(light)
  }

  /**
   * Adds fog to the scene.
   */
  addFog (fog) {
    this._fog = fog
  }

  /**
   * Adds a board to the scene.
   */
  addBoard (board) {
    this._board = board
  }

  /**
   * Adds an airplane to the scene.
   */
  addAirplane (airplane) {
    this._airplanes.push(airplane)
    this._scene.add(airplane._model)
  }

  /**
   * Resets the entire scene to clean up memory when another scene is rendered.
   */
  reset () {
    this._scene.traverse(object => {
      if (!object.isMesh) return

      object.geometry.dispose()

      if (object.material.isMaterial) {
        cleanMaterial(object.material)
      } else {
        // an array of materials
        for (const material of object.material) cleanMaterial(material)
      }
    })

    this._scene = new Scene()
    this._anims = []
    this._lights = []
    this._models = []
    this._fog = null

    // Reset all the individual elements as well, because they are global and
    // used in different scenees.
    this._elements.forEach(prop => prop.reset())
  }

  /**
   * Triggers all the "in" animations for the game elements.
   */
  async animateIn () {
    this._airplanes.forEach(plane => plane.unsetGhost()) // TMP
    await Promise.all([...this._elements, ...this._airplanes].map(prop => prop.animateIn()))

    return Promise.resolve()
  }

  /**
   * Triggers all the "out" animations for the game elements.
   */
  async animateOut () {
    await Promise.all([...this._elements, ...this._airplanes].map(prop => prop.animateOut()))

    return Promise.resolve()
  }

  /**
   * Loop through all the different scene assets and render them.
   */
  render () {
    this._scene.fog = this._fog

    this._lights.forEach(light => {
      this._scene.add(light)
    })

    this._elements.forEach(prop => this._scene.add(prop.create()))
  }

  // TMP
  checkGhosts () {
    this._airplanes.forEach(plane => plane.unsetGhost())
  }
}
