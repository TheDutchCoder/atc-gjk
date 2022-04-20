import { v4 as uuidv4 } from 'uuid'

import Dirt from '#/classes/tiles/dirt'
import Forest from '#/classes/tiles/forest'
import Airfield from '#/classes/tiles/airfield'
import TrainTracks from '#/classes/tiles/train-tracks'
import Clouds from '#/classes/pieces/clouds'

import {
  randomRoundNumber,
  getRandomStart,
  getRandomDestination,
} from '#tools/index'

import { difficulties, dimensions, airfields, clouds, airplanes } from '#/constants'
import { getRandomTile, randomItemFromArray } from '#/tools'

/**
 * Basic class for any game board.
 */
export default class GameBoard {

  /**
   * The width of the board (x)
   */
  _width = 0

  /**
   * The depth of the board (z)
   */
  _depth = 0

  /**
   * The difficulty for the game.
   */
  _difficulty = null

  /**
   * The amount of airfields.
   */
  _airfields = 0

  /**
   * The amount of clouds.
   */
  _clouds = 0

  /**
   * The amount of airplanes.
   */
  _airplanes = 0

  /**
   * The complete queue of all airplanes during the game.
   */
  _airplanesQueue = []

  /**
   * The tiles that make up the board.
   */
  _tiles = []


  /**
   * The current game tick.
   *
   * Each tick represents 15 minutes in day time. Every hour the planes move
   * positions.
   *
   * Tick 0 => 00:00
   * Tick 1 => 00:15
   * Tick 2 => 00:30
   * ...
   * Tick 95 => 23:15
   */
  _tick = 0

  /**
   * Initialize the game board.
   */
  constructor (difficulty = difficulties.NORMAL) {
    this._difficulty = difficulty
    this._width = dimensions[this._difficulty].width
    this._depth = dimensions[this._difficulty].depth
    this._airfields = randomRoundNumber(airfields[this._difficulty].min, airfields[this._difficulty].max)
    this._clouds = randomRoundNumber(clouds[this._difficulty].min, clouds[this._difficulty].max)
    this._airplanes = airplanes[this._difficulty].amount
  }

  /**
   * Generates the board.
   *
   * First I populate airfields, they're the most critical tiles in the game.
   * Then I add train tracks, as they take up a whole row/column.
   * Lastly I can randomize the other tiles in the game, until I add more.
   */
  generate () {
    const minX = Math.ceil(0 - (this._width / 2))
    const minZ = Math.ceil(0 - (this._depth / 2))
    const maxZ = Math.abs(minZ)
    this._tiles = Array.from({ length: this._depth }, () => Array.from({ length: this._width }, () => null))

    /**
     * Train tracks appear anywhere on the outside 2 squares, that's where
     * airports are never placed anyway.
     */
    const tracksAlongX = Math.random() > 0.5
    const tracksStart = tracksAlongX ? randomItemFromArray([0, 1, this._depth - 1, this._depth - 2]) : randomItemFromArray([0, 1, this._width - 1, this._width - 2])

    if (tracksAlongX) {
      this._tiles[tracksStart].forEach((tile, x) => {
        this._tiles[tracksStart][x] = new TrainTracks({ position: { x: x + minX, y: 0, z: tracksStart + minZ }, direction: 2 })
      })
    } else {
      this._tiles.forEach((row, z) => {
        this._tiles[z][tracksStart] = new TrainTracks({ position: { x: tracksStart + minX, y: 0, z: z + minZ } })
      })
    }

    /**
     * Airfields need to be 2 tiles from the edges to allow planes to have
     * enough space to turn.
     */
    const airfields = []

    for (let i = 0; i < this._airfields; i++) {
      const result = getRandomTile(this._tiles, this._width, this._depth, 3)

      if (result) {
        const { x, z, tile } = result

        const airfield = { position: tile, direction: randomRoundNumber(0, 7), name: `AP${airfields.length + 1}` }

        airfields.push(airfield)
        this._tiles[z][x] = new Airfield(airfield)
      }
    }

    // Fill the rest with Forests (or other random tiles)
    this._tiles.forEach((row, z) => {
      row.forEach((tile, x) => {
        if (!tile) {
          return new Forest({ position: { x: x + minX, y: 0, z: z + minZ } })
        }
      })
    })

    // Add the dirt.
    Dirt.add({ scale: { x: this._width, y: 1, z: this._depth } })

    // Add the clouds.
    for (let i = 0; i < this._clouds; i++) {
      Clouds.add({ position: { x: randomRoundNumber(minX, maxZ), y: randomRoundNumber(airplanes[this._difficulty].height - 2, airplanes[this._difficulty].height), z: randomRoundNumber(minZ, maxZ) } })
    }

    Clouds.add({ position: { x: 0, y: 1, z: 0 } })

    /**
     * Seed the airplanes.
     *
     * Airplanes need the following:
     * 1. Start position & direction (could be an airport!)
     * 2. Destination position and direction (could be an airport!)
     * 3. Departure time
     */
    for (let i = 0; i < this._airplanes; i++) {
      const start = getRandomStart(this._width, this._depth, airfields)
      let end = getRandomDestination(this._width, this._depth, airfields)

      while (start.name === end.name) {
        end = getRandomDestination(this._width, this._depth, airfields)
      }

      // Add airplanes to the queue
      this._airplanesQueue.push({
        id: uuidv4(),
        start,
        end,
        startTime: randomRoundNumber(0, 96),
      })
    }

    // Sort the planes by startTime
    this._airplanesQueue.sort((plane1, plane2) => {
      return plane1.startTime < plane2.startTime ? -1 : plane1.startTime > plane2.startTime ? 1 : 0
    })
  }
}
