import GameTile from '#classes/base/game-tile'

import Grass from '#classes/tiles/grass'
import Trees from '#classes/props/trees'
import Rocks from '#classes/props/rocks'
import Towers from '#classes/props/towers'

/**
 * Forect with hunting tower tile.
 */
export default class HuntingTower extends GameTile {

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
    Trees.add({ position: this._position, exclude: { square: { start: { x: -4.5, z: -4.5 }, end: { x: -1.5, z: -1.5 } } } })
    Rocks.add({ position: this._position })
    Towers.add({ position: this._position })
  }

}
