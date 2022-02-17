import { Scene } from 'three'

import Dirt from '#native/classes/tiles/dirt'
import Grass from '#native/classes/tiles/grass'
import Trees from '#native/classes/props/trees'
import Rocks from '#native/classes/props/rocks'
import Clouds from '#native/classes/pieces/clouds'
import Airstrip from '#native/classes/props/airstrip'
import Tracks from '#native/classes/props/tracks'

/**
 * Base class for scenes.
 */
export default class GameScene {

  /**
   * The scene itself.
   */
  _scene = null

  _lights = []

  _models = []

  _fog = null

  /**
   * Initialize the scene.
   */
  constructor() {
    this.create()
  }

  create() {
    this._scene = new Scene()
  }

  addLight(light) {
    this._scene.add(light)
  }

  addFog(fog) {
    this._scene.fog = fog
    this._fog = fog
  }

  addModel(model) {
    this._scene.add(model)
  }

  /**
   * Loop through all the different tile assets and render them.
   */
  render() {
    const dirt = Dirt.create()
    const grass = Grass.create()
    const trees = Trees.create()
    const rocks = Rocks.create()
    const clouds = Clouds.create()
    const airstrip = Airstrip.create()
    const tracks = Tracks.create()

    this._scene.add(dirt)
    this._scene.add(grass)
    this._scene.add(trees)
    this._scene.add(rocks)
    this._scene.add(clouds)
    this._scene.add(airstrip)
    this._scene.add(tracks)
  }

}
