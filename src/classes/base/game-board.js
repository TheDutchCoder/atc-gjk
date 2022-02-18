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
   * All the clouds on this board.
   */
  _clouds = []

  /**
   * Initialize the game board.
   */
  constructor() { }

  /**
   * Generates the board.
   */
  generate() {
    for (let x = -5; x <= 5; x++) {
      for (let z = -5; z <= 5; z++) {
        if (x === 4) {
          new TrainTracks({ position: { x, y: 0, z } })
        } else if (x === 0 && z === 0) {
          new Airfield({ position: { x, y: 0, z }, direction: randomRoundNumber(0, 7) })
        } else {
          new Forest({ position: { x, y: 0, z } })
        }
      }
    }

    for (let c = 0; c <= 7; c++) {
      Clouds.add({ position: { x: randomRoundNumber(-5, 5), y: randomRoundNumber(4, 7), z: randomRoundNumber(-5, 5) } })
    }
  }
}
