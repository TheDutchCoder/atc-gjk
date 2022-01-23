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
import Airplane from '#components/airplane.vue'
import { randomRoundNumber } from '../tools'

import ForestTile from '#tiles/forest.vue'
import AirportTile from '#tiles/airport.vue'

const WIDTH = 5
const HEIGHT = 5
const MIN_AIRPORTS = 1
const MAX_AIRPORTS = 2

const forestTile = () => ({
  type: 'ForestTile',
})

const airportTile = () => ({
  type: 'AirportTile',
  direction: randomRoundNumber(0, 7),
})

/**
 * Randomization of tiles.
 *
 * Airports are always at least 1 tile from the edge.
 */
const amountOfAirports = randomRoundNumber(MIN_AIRPORTS, MAX_AIRPORTS)

const matrix = []

const board = [
  [forestTile(), forestTile(), forestTile(), forestTile(), forestTile()],
  [forestTile(), forestTile(), forestTile(), forestTile(), forestTile()],
  [forestTile(), forestTile(), airportTile(), forestTile(), forestTile()],
  [forestTile(), forestTile(), forestTile(), forestTile(), forestTile()],
  [forestTile(), forestTile(), forestTile(), forestTile(), forestTile()],
]
</script>
