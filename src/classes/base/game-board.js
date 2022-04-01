import { v4 as uuidv4 } from 'uuid'

import Dirt from '#/classes/tiles/dirt'
import Forest from '#/classes/tiles/forest'
import Airfield from '#/classes/tiles/airfield'
import TrainTracks from '#/classes/tiles/train-tracks'
import Clouds from '#/classes/pieces/clouds'

import {
  randomRoundNumber,
} from '#tools/index'

import { difficulties, dimensions, airfields, clouds, airplanes } from '#/constants'
import { getRandomTile, randomItemFromArray, getStartDirection } from '#/tools'

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

  _p = []

  /**
   * The complete queue of all airplanes during the game.
   */
  _airplanesQueue = []

  /**
   * The tiles that make up the board.
   */
  _tiles = []

  /**
   * All the clouds on this board.
   */


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
    const maxX = Math.abs(minX)
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
      const result = getRandomTile(this._tiles, this._width, this._depth, 2)

      if (result) {
        const { x, z, tile } = result

        const airfield = { position: tile, direction: randomRoundNumber(0, 7) }

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

    // Seed the airplanes.
    /**
     * Airplanes need the following:
     * 1. Start position & direction (could be an airport!)
     * 2. Destination position and direction (could be an airport!)
     * 3. Departure time
     */
    for (let i = 0; i < this._airplanes; i++) {
      // Start position & direction
      const startOnX = Math.random() > 0.5
      const startX = startOnX ? randomItemFromArray([minX - 1, maxX + 1]) : randomRoundNumber(minX - 1, maxX + 1)
      const startY = randomRoundNumber(airplanes[this._difficulty].height - 2, airplanes[this._difficulty].height)
      const startZ = startOnX ? randomRoundNumber(minZ - 1, maxZ + 1) : randomItemFromArray([minZ - 1, maxZ + 1])
      const startPosition = { x: startX, y: startY, z: startZ }
      const startDirection = getStartDirection(startPosition, this._width, this._depth)

      // Destination position & direction
      const endOnX = Math.random() > 0.5
      const endX = endOnX ? randomItemFromArray([minX - 1, maxX + 1]) : randomRoundNumber(minX - 1, maxX + 1)
      const endY = randomRoundNumber(airplanes[this._difficulty].height - 2, airplanes[this._difficulty].height)
      const endZ = endOnX ? randomRoundNumber(minZ - 1, maxZ + 1) : randomItemFromArray([minZ - 1, maxZ + 1])
      const endPosition = { x: endX, y: endY, z: endZ }
      const endDirection = getStartDirection(endPosition, this._width, this._depth)

      // Add airplanes to the queue
      this._airplanesQueue.push({
        id: new uuidv4(),
        start: {
          position: startPosition,
          direction: startDirection,
        },
        end: {
          position: endPosition,
          direction: endDirection,
        },
        startTime: randomRoundNumber(0, 96),
      })

      // Airplanes.add({ position: startPosition, direction: startDirection })
    }

    // DEBUG
    this._airplanesQueue.push({
      index: 1000,
      start: {
        position: { x: 3, y: 1, z: -6 },
        direction: 4,
      },
      end: {
        position: { x: -5, y: 1, z: 0 },
        direction: 4,
      },
      startTime: 1,
    })

    // this._airplanesQueue.push({
    //   index: 1001,
    //   start: {
    //     position: { x: 5, y: 1, z: 0 },
    //     direction: 6,
    //   },
    //   end: {
    //     position: { x: -5, y: 1, z: 0 },
    //     direction: 4,
    //   },
    //   startTime: 1,
    // })
    // DEBUG

    // Sort the planes by startTime
    this._airplanesQueue.sort((plane1, plane2) => {
      return plane1.startTime < plane2.startTime ? -1 : plane1.startTime > plane2.startTime ? 1 : 0
    })

    // const schedule = document.querySelector('#schedule tbody')

    // this._airplanesQueue.forEach(plane => {
    //   console.log(plane)
    //   const el = document.createElement('tr')
    //   el.innerHTML = `<td>${formatTime(plane.startTime)}</td><td>GJK-${(plane.index).toString().padStart(3, '0')}</td><td>AP-1</td>`
    //   schedule.appendChild(el)
    // })

    // Add the tiles.
    // for (let x = minX; x <= maxX; x++) {
    //   for (let z = minZ; z <= maxZ; z++) {
    //     new Forest({ position: { x, y: 0, z } })
    //   }
    // }

    // console.log(minX, minZ)
    /**
     * Airfields need to be at least 2 squares from each edge, otherwise planes
     * might not be able to turn in time and land on them.
     */
    // for (let x = -5; x <= 5; x++) {
    //   for (let z = -5; z <= 5; z++) {
    //     if (x === 4) {
    //       new TrainTracks({ position: { x, y: 0, z } })
    //     } else if (x === 0 && z === 0) {
    //       new Airfield({ position: { x, y: 0, z }, direction: randomRoundNumber(0, 7) })
    //     } else {
    //       new Forest({ position: { x, y: 0, z } })
    //     }
    //   }
    // }

    // for (let c = 0; c <= 7; c++) {
    //   Clouds.add({ position: { x: randomRoundNumber(-5, 5), y: randomRoundNumber(4, 7), z: randomRoundNumber(-5, 5) } })
    // }
  }
}
