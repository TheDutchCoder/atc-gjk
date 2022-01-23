<template>
  <Group>
    <template v-for="(y, indexY) in board">
      <template v-for="(x, indexX) in y">
        <ForestTile v-if="x.type === 'ForestTile'" :position="{ x: indexX - 2, y: indexY - 2 }"></ForestTile>
        <AirportTile
          v-if="x.type === 'AirportTile'"
          :position="{ x: indexX - 2, y: indexY - 2 }"
          :direction="x.direction"
        ></AirportTile>
      </template>
    </template>
  </Group>
</template>

<script setup>
import { Group } from 'troisjs'
import { randomRoundNumber } from '../tools'
import { getDirection } from '#tiles/airport/utils'

import ForestTile from '#tiles/forest.vue'
import AirportTile from '#tiles/airport'

const WIDTH = 5
const HEIGHT = 5

const forestTile = () => ({
  type: 'ForestTile',
})

const airportTile = (x, y) => ({
  type: 'AirportTile',
  direction: getDirection(x, y),
})

const getRange = (width, offset = 0) => {
  const normalizedX = Math.floor(width / 2)
  const minX = 0 - normalizedX
  const maxX = normalizedX

  return {
    min: minX + offset,
    max: maxX - offset,
  }
}

/**
 * Randomization of tiles.
 *
 * Airports are always at least 1 tile from the edge.
 * Airports need to always point towards the origin.
 */
const rangeX = getRange(WIDTH, 1)
const rangeY = getRange(HEIGHT, 1)
const airportLocation = {
  x: randomRoundNumber(rangeX.min, rangeX.max),
  y: randomRoundNumber(rangeY.min, rangeY.max),
}

const generateBoard = (width = WIDTH, height = HEIGHT) => {
  const board = []
  const rY = getRange(height)
  const rX = getRange(width)

  for (let y = rY.min; y <= rY.max; y++) {
    const row = []
    for (let x = rX.min; x <= rX.max; x++) {
      if (airportLocation.x === x && airportLocation.y === y) {
        row.push(airportTile(x, y))
      } else {
        row.push(forestTile())
      }
    }
    board.push(row)
  }

  return board
}

const board = generateBoard()
</script>
