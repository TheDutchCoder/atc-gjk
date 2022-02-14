import {
  Group,
} from 'three'

import Tile from '#native/classes/tiles/base'
import Trees from '#native/classes/props/trees'
import Rocks from '#native/classes/props/rocks'
import LandingStrip from '#native/classes/pieces/landing-strip'

/**
 * Airfield tile.
 */
export default class Airfield extends Tile {

  /**
   * The direction the airfield is facing.
   */
  _direction = 0

  _things = []

  /**
   * Initialize the tile.
   *
   * @param {Object} options - The options for this tile (position, directio)
   */
  constructor({ position = { x: 0, y: 0, z: 0 }, direction = 0 } = {}) {
    super({ position })

    this._direction = direction

    this.#create()
  }

  /**
   * Creates the tile.
   */
  #create() {
    const airfield = new Group()
    const tile = new Tile()
    const trees = new Trees({ exclude: { width: 5.5, direction: this._direction } })
    const rocks = new Rocks({ exclude: { width: 5.5, direction: this._direction } })
    const landingStrip = new LandingStrip({ direction: this._direction })

    this._things = [tile]
    // this._things = [tile, trees, rocks, landingStrip]

    airfield.add(
      tile._model,
      // trees.model,
      // rocks.model,
      // landingStrip.model,
    )

    this.model = airfield
  }

}
