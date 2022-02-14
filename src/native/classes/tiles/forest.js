import {
  Group,
} from 'three'

import GameTile from '#native/classes/base/game-tile'

import BaseTile from '#native/classes/tiles/base'
import Trees from '#native/classes/props/trees'
import Rocks from '#native/classes/props/rocks'

/**
 * Forest tile.
 */
export default class Forest extends GameTile {

  _things = []

  /**
   * Initialize the tile.
   *
   * @param {Object} position - The position of the tile.
   * @param {Number} direction - The direction the tile is facing (0-3).
   */
  constructor({ position = { x: 0, y: 0, z: 0 } } = {}) {
    super({ position })

    this.#create()

    return this.model
  }

  /**
   * Creates the tile.
   */
  #create() {
    const forest = new Group()
    const tile = new BaseTile()
    const trees = new Trees()
    const rocks = new Rocks()

    // this._things = [tile, trees, rocks]
    // this._things = [tile, trees, rocks]

    forest.add(
      tile,
      trees,
      rocks,
    )

    forest.position.x = this._position.x * 10
    forest.position.z = this._position.z * 10

    this.model = forest
  }

}
