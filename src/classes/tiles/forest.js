import GameTile from '#classes/base/game-tile'

import Grass from '#classes/tiles/grass'
import Trees from '#classes/props/trees'
import Rocks from '#classes/props/rocks'

/**
 * Forest tile.
 */
export default class Forest extends GameTile {

  /**
   * Initialize the tile.
   *
   * @param {Object} position - The position of the tile.
   * @param {Number} direction - The direction the tile is facing (0-3).
   */
  constructor ({ position = { x: 0, y: 0, z: 0 } } = {}) {
    super({ position })

    this.create()
  }

  /**
   * Creates the tile by adding elements to their repective classes.
   */
  create () {
    Grass.add({ position: this._position })
    Trees.add({ position: this._position })
    Rocks.add({ position: this._position })
  }

}
