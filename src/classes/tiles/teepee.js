import GameTile from '#classes/base/game-tile'

import Grass from '#classes/tiles/grass'
import Trees from '#classes/props/trees'
import Rocks from '#classes/props/rocks'
import Teepees from '#classes/props/teepees'

/**
 * Forect with teepee tile.
 */
export default class Teepee extends GameTile {

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
    Trees.add({ position: this._position, exclude: { square: { start: { x: -2, z: -2 }, end: { x: 2, z: 2 } } } })
    Rocks.add({ position: this._position, exclude: { square: { start: { x: -2, z: -2 }, end: { x: 2, z: 2 } } } })
    Teepees.add({ position: this._position })
  }

}
