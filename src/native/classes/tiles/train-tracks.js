import {
  Group,
} from 'three'

import {
  randomRoundNumber,
} from '#tools'

import Tile from '#native/classes/tiles/base'
import Trees from '#native/classes/props/trees'
import Rocks from '#native/classes/props/rocks'
import Beams from '#native/classes/props/beams'
import Rails from '#native/classes/props/rails'

/**
 * TrainTracks tile.
 */
export default class TrainTracks extends Tile {

  _direction = 0

  _things = []

  /**
   * Initialize the tile.
   *
   * @param {Object} position - The position of the tile.
   * @param {Number} direction - The direction the tile is facing (0-3).
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
    const trainTracks = new Group()
    const tile = new Tile()
    const trees = new Trees({ amount: randomRoundNumber(10, 20), exclude: { width: 3, direction: this._direction } })
    const rocks = new Rocks({ exclude: { width: 3, direction: this._direction } })
    const beams = new Beams()
    const rails = new Rails()

    this._things = [tile]
    // this._things = [tile, trees, rocks, beams, rails]

    trainTracks.add(
      tile._model,
      // trees.model,
      // // rocks.model,
      // beams.model,
      // rails.model,
    )

    this.model = trainTracks
  }

}
