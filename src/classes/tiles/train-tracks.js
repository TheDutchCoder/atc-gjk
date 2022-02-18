import GameTile from '#/classes/base/game-tile'

import Grass from '#/classes/tiles/grass'
import Trees from '#/classes/props/trees'
import Rocks from '#/classes/props/rocks'
import Tracks from '#/classes/props/tracks'

/**
 * TrainTracks tile.
 */
export default class TrainTracks extends GameTile {

  /**
   * All the tiles that are train tracks.
   */
  _tiles = []

  /**
   * The direction the train tracks are facing.
   */
  _direction = 0

  /**
   * Initialize the train tracks tile.
   *
   * @param {Object} options - The options for this tile.
   */
  constructor({ position = { x: 0, y: 0, z: 0 }, direction = 0 } = {}) {
    super({ position })

    this._direction = direction

    this.create()
  }

  /**
   * Create the train tracks by combining different assets.
   */
  create() {
    Grass.add({ position: this._position })
    Trees.add({ position: this._position, exclude: { width: 3, direction: this._direction } })
    Rocks.add({ position: this._position, exclude: { width: 3, direction: this._direction } })
    Tracks.add({ position: this._position, direction: this._direction })
  }

}
