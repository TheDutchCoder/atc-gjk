import { v4 as uuidv4 } from 'uuid'

import Label from '#/classes/tiles/label'
import Dirt from '#/classes/tiles/dirt'
import Forest from '#/classes/tiles/forest'
import Airfield from '#/classes/tiles/airfield'
import TrainTracks from '#/classes/tiles/train-tracks'
import Powerline from '#/classes/tiles/powerline'
import Clouds from '#/classes/pieces/clouds'
import Airplane from '#/classes/pieces/airplane'
import HotAirBalloon from '#/classes/pieces/hot-air-balloon'

import {
  randomRoundNumber,
  getRandomStart,
  getRandomDestination,
  getRandomCloudStart,
  checkForAvailableRanges,
  distributeArray,
} from '#tools/index'

import { difficulties, dimensions, airfields, clouds, airplanes, balloons, powerlines } from '#/constants'
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
   * The amount of hot air balloons.
   */
  _balloons = 0

  /**
   * The complete queue of all airplanes during the game.
   */
  _airplanesQueue = []

  /**
   * The complete queue of all balloons during the game.
   */
  _balloonsQueue = []

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
  constructor (difficulty = 1) {
    this._difficulty = difficulties[difficulty]
    this._width = dimensions[this._difficulty].width
    this._depth = dimensions[this._difficulty].depth
    this._airfields = randomRoundNumber(airfields[this._difficulty].min, airfields[this._difficulty].max)
    this._clouds = randomRoundNumber(clouds[this._difficulty].count.min, clouds[this._difficulty].count.max)
    this._airplanes = airplanes[this._difficulty].amount
    this._balloons = balloons[this._difficulty].amount
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
    const maxX = Math.abs(minX)
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

        // Place the airfield and place forests around it for buffer.
        this._tiles[z][x] = new Airfield(airfield)

        this._tiles[z - 1][x - 1] = new Forest({ position: { x: x + minX - 1, y: 0, z: z + minZ - 1 } })
        this._tiles[z - 1][x] = new Forest({ position: { x: x + minX, y: 0, z: z + minZ - 1 } })
        this._tiles[z - 1][x + 1] = new Forest({ position: { x: x + minX + 1, y: 0, z: z + minZ - 1 } })

        this._tiles[z][x - 1] = new Forest({ position: { x: x + minX - 1, y: 0, z: z + minZ } })
        this._tiles[z][x + 1] = new Forest({ position: { x: x + minX + 1, y: 0, z: z + minZ } })

        this._tiles[z + 1][x - 1] = new Forest({ position: { x: x + minX - 1, y: 0, z: z + minZ + 1 } })
        this._tiles[z + 1][x] = new Forest({ position: { x: x + minX, y: 0, z: z + minZ + 1 } })
        this._tiles[z + 1][x + 1] = new Forest({ position: { x: x + minX + 1, y: 0, z: z + minZ + 1 } })
      }
    }

    /**
     * Powerlines appear as a continuois line of 3-5 tiles.
     */
     const powerlinesAlongX = Math.random() > 0.5
     const powerlinesLength = powerlines[this._difficulty]
     const ranges = checkForAvailableRanges(this._tiles, powerlinesLength, powerlinesAlongX)
     const range = randomItemFromArray(ranges)
     console.log(range)

     for (let i = 0; i < powerlinesLength; i++) {
       if (powerlinesAlongX) {
         this._tiles[range.start.z][range.start.x + 1] = new Powerline({ position: { x: range.start.x + minX + i, y: 0, z: range.start.z + minZ }, direction: 2 })
       } else {
         this._tiles[range.start.z + i][range.start.x] = new Powerline({ position: { x: range.start.x + minX, y: 0, z: range.start.z + minZ + i }, direction: 0 })
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

    // Clouds are added in groups (e.g. 4x4), this makes them a lot more
    // impactful on the game. The idea is to animate them later (e.g. move from
    // E to W every few ticks).
    for (let i = 0; i < this._clouds; i++) {
      const size = randomRoundNumber(clouds[this._difficulty].size.min, clouds[this._difficulty].size.max)
      const start = getRandomCloudStart(this._width, this._depth, airplanes[this._difficulty].height)

      for (let x = 0; x < size; x++) {
        for (let z = 0; z < size; z++) {
          Clouds.add({ position: { x: (start.position.x + x), y: start.position.y, z: (start.position.z + z) }, direction: start.direction })
        }
      }
    }

    // Seed some hot air balloons as obstacles.
    const timeQueue = distributeArray(2, (96 - (this._width + 4)), this._balloons + this._airplanes, 2)

    for (let i = 0; i < this._balloons; i++) {
      let start = getRandomStart(this._width, this._depth, balloons[this._difficulty].height)
      let end = getRandomDestination(this._width, this._depth, balloons[this._difficulty].height)
      end.position.y = start.position.y

      this._balloonsQueue.push(new HotAirBalloon({
        id: uuidv4(),
        start: start,
        startTime: randomItemFromArray(timeQueue, true),
      }))
    }

    /**
     * Seed the airplanes.
     *
     * Airplanes need the following:
     * 1. Start position & direction (could be an airport!)
     * 2. Destination position and direction (could be an airport!)
     * 3. Departure time
     */
    for (let i = 0; i < this._airplanes; i++) {
      const start = getRandomStart(this._width, this._depth, airplanes[this._difficulty].height, airfields)
      let end = getRandomDestination(this._width, this._depth, airplanes[this._difficulty].height, airfields)

      while (start.name === end.name) {
        end = getRandomDestination(this._width, this._depth, airplanes[this._difficulty].height, airfields)
      }

      // Add airplanes to the queue
      this._airplanesQueue.push(new Airplane({
        id: uuidv4(),
        start: start,
        end: end,
        startTime: randomItemFromArray(timeQueue, true),
        fuel: randomRoundNumber(20, 35),
      }))
    }

    // Add the labels
    Label.add({ position: { x: 0, y: 0, z: minZ - 2 }, direction: 0, text: 'N' })
    Label.add({ position: { x: maxX + 1, y: 0, z: minZ - 1 }, direction: 1, text: 'NE' })
    Label.add({ position: { x: maxX + 2, y: 0, z: 0 }, direction: 2, text: 'E' })
    Label.add({ position: { x: maxX + 1, y: 0, z: maxZ + 1 }, direction: 3, text: 'SE' })
    Label.add({ position: { x: 0, y: 0, z: maxZ + 2 }, direction: 4, text: 'S' })
    Label.add({ position: { x: minX - 1, y: 0, z: maxZ + 1 }, direction: 5, text: 'SW' })
    Label.add({ position: { x: minX - 2, y: 0, z: 0 }, direction: 6, text: 'W' })
    Label.add({ position: { x: minX - 1, y: 0, z: minZ - 1 }, direction: 7, text: 'NW' })

    // Sort the planes by startTime
    this._airplanesQueue.sort((plane1, plane2) => {
      return plane1._startTime < plane2._startTime ? -1 : plane1._startTime > plane2._startTime ? 1 : 0
    })
  }
}
