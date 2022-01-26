<template>
  <Group :position="{ x: (WIDTH - 1) / 2 * -10, y: 0, z: (HEIGHT - 1) / 2 * -10 }">
    <template v-for="(row, indexY) in board">
      <template v-for="(tile, indexX) in row">
        <ForestTile v-if="tile === null" :position="{ x: indexX, y: indexY }"></ForestTile>
        <AirportTile
          v-else-if="tile.type === 'AirportTile'"
          :position="{ x: indexX, y: indexY }"
          :direction="tile.direction"
        ></AirportTile>
        <TrainTracksTile v-else-if="tile.type === 'TrainTrackTile'" :position="tile.position" :direction="tile.direction"></TrainTracksTile>
      </template>
    </template>
  </Group>
</template>

<script setup>
import { Group } from 'troisjs'
import { addTrainTracks } from '#tiles/train-tracks/utils'
import { addAirports } from '#tiles/airport/utils'
import { checkForAvailableSpots } from '#tools'

import ForestTile from '#tiles/forest'
import AirportTile from '#tiles/airport'
import TrainTracksTile from '#tiles/train-tracks'

const WIDTH = 10
const HEIGHT = 10
const MAX_AIRPORTS = 1

const generateBoard = (width = WIDTH, height = HEIGHT) => {
  return Array.apply(null, Array(width)).map(() => {
    return Array.apply(null, Array(height)).map(() => null)
  })
}

/**
 * The board gets generated with just empty (null) values and is passed around
 * to different functions that generate other tiles, populating the board along
 * the way.
 */
const board = generateBoard(WIDTH, HEIGHT)

addTrainTracks(board)
addAirports(board, MAX_AIRPORTS)
</script>
