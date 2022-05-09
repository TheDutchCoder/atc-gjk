import GameTile from '#/classes/base/game-tile'

import Grass from '#/classes/tiles/grass'
import Rocks from '#/classes/props/rocks'
import Powerlines from '#/classes/props/powerline'

/**
 * Powerline tile.
 */
export default class Forest extends GameTile {

  /**
   * All the tiles that are powerlines.
   */
  _tiles = []

  /**
   * The direction the airfield is facing.
   */
   _direction = 0

  /**
   * Initialize the tile.
   *
   * @param {Object} position - The position of the tile.
   * @param {Number} direction - The direction the tile is facing (0-3).
   */
  constructor ({ position = { x: 0, y: 0, z: 0 }, direction = 0 } = {}) {
    super({ position })

    this._direction = direction

    this.create()
  }

  /**
   * Creates the tile by adding elements to their repective classes.
   */
  create () {
    Grass.add({ position: this._position })
    Rocks.add({ position: this._position })
    Powerlines.add({ position: this._position, direction: this._direction })
  }

}
