import { Scene } from 'three'

import Dirt from '#/classes/tiles/dirt'
import Grass from '#/classes/tiles/grass'
import Trees from '#/classes/props/trees'
import Rocks from '#/classes/props/rocks'
import Clouds from '#/classes/pieces/clouds'
import Airstrip from '#/classes/props/airstrip'
import Tracks from '#/classes/props/tracks'
import Airplanes from '#/classes/pieces/airplanes'

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
   * All the game elements.
   */
  _elements = [
    Dirt,
    Grass,
    Trees,
    Rocks,
    Clouds,
    Airstrip,
    Tracks,
    Airplanes,
  ]

  /**
   * Animates objects in the scene.
   */
  _animate = () => {
    Clouds._animate()
    Airplanes._animate()
  }

  /**
   * Initialize the scene.
   */
  constructor() {
    this._scene = new Scene()
  }

  /**
   * Adds a light to the scene.
   */
  addLight(light) {
    this._lights.push(light)
  }

  /**
   * Adds fog to the scene.
   */
  addFog(fog) {
    this._fog = fog
  }

  /**
   * Resets the entire scene to clean up memory when another scene is rendered.
   */
  reset() {
    this._scene = null
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
  async animateIn() {
    await Promise.all(this._elements.map(prop => prop.animateIn()))

    return Promise.resolve()
  }

  /**
   * Triggers all the "out" animations for the game elements.
   */
  async animateOut() {
    await Promise.all(this._elements.map(prop => prop.animateOut()))

    return Promise.resolve()
  }

  /**
   * Loop through all the different scene assets and render them.
   */
  render() {
    this._scene.fog = this._fog

    this._lights.forEach(light => {
      this._scene.add(light)
    })

    this._elements.forEach(prop => this._scene.add(prop.create()))
  }
}
