import GameTile from '#/classes/base/game-tile'

import Grass from '#/classes/tiles/grass'
import Trees from '#/classes/props/trees'
import Rocks from '#/classes/props/rocks'
import Airstrip from '#/classes/props/airstrip'

/**
 * Airfield tile.
 */
export default class Airfield extends GameTile {

  /**
   * All the tiles that are airfields.
   */
  _tiles = []

  /**
   * The direction the airfield is facing.
   */
  _direction = 0

  /**
   * Initialize the airfield tile.
   *
   * @param {Object} options - The options for this tile.
   */
  constructor({ position = { x: 0, y: 0, z: 0 }, direction = 0 } = {}) {
    super({ position })

    this._direction = direction

    this.create()
  }

  /**
   * Create the airfield by combining different assets.
   */
  create() {
    Grass.add({ position: this._position })
    Trees.add({ position: this._position, exclude: { width: 5.5, direction: this._direction } })
    Rocks.add({ position: this._position, exclude: { width: 5.5, direction: this._direction } })
    Airstrip.add({ position: this._position, direction: this._direction })
  }

}
