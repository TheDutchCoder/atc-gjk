import Forest from '#/classes/tiles/forest'
import Airfield from '#/classes/tiles/airfield'
import TrainTracks from '#/classes/tiles/train-tracks'
import Clouds from '#/classes/pieces/clouds'

import {
  randomRoundNumber,
} from '#tools/index'

/**
 * Basic class for any game board.
 */
export default class GameBoard {

  /**
   * All the tiles on this board.
   */
  _tiles = []

  /**
   * All the clouds on this board.
   */
  _clouds = []

  /**
   * Initialize the game board.
   */
  constructor() {
    this.generate()
  }

  /**
   * Generates the board.
   */
  generate() {
    for (let x = -5; x <= 5; x++) {
      const row = []
      for (let z = -5; z <= 5; z++) {
        if (x === 4) {
          row.push(new TrainTracks({ position: { x, y: 0, z } }))
        } else if (x === 0 && z === 0) {
          row.push(new Airfield({ position: { x, y: 0, z } }))
        } else {
          row.push(new Forest({ position: { x, y: 0, z } }))
        }
      }
      this._tiles.push(row)
    }

    for (let c = 0; c <= 7; c++) {
      this._clouds.push(new Clouds({ position: { x: randomRoundNumber(-5, 5), y: randomRoundNumber(4, 7), z: randomRoundNumber(-5, 5) } }))
    }
  }
}
