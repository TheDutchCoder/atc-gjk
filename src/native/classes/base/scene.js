import { Scene } from 'three'

/**
 * Base class for scenes.
 *
 * Animation in:
 * 250 tile (500)
 * 500-750 all props (500)
 * 1250-1500 clouds (500)
 * 2000 airplane (250)
 *
 * Animation out:
 * 0 airplane (250)
 * 250-250 clouds
 * 250-500 all props
 * 500 tile
 */
export default class GameScene {

  /**
   * The scene itself.
   */
  _scene = null

  _lights = []

  _models = []

  _things = []

  _fog = null

  /**
   * Initialize the scene.
   */
  constructor() {
    this.#create()
  }

  #create() {
    this._scene = new Scene()
  }

  addLight(light) {
    this._scene.add(light)
    // this._lights.push(light)
  }

  addFog(fog) {
    this._scene.fog = fog
    this._fog = fog
  }

  addModel(model) {
    this._scene.add(model)
    // this._models.push(model)
  }

  addThing(thing) {
    // this._things.push(thing)
    // this._scene.add(thing.model)
  }

  addThings(things) {
    // this._things.push(...things)
  }

}
