<template>
  <Group :position="{ x: (WIDTH - 1) / 2 * -10, y: 0, z: (HEIGHT - 1) / 2 * -10 }">
    <!-- <template v-for="(row, indexY) in board">
      <template v-for="(tile, indexX) in row">
        <ForestTile v-if="tile === null" :position="{ x: indexX, y: indexY }"></ForestTile>
        <AirportTile
          v-else-if="tile.type === 'AirportTile'"
          :position="{ x: indexX, y: indexY }"
          :direction="tile.direction"
        ></AirportTile>
        <TrainTracksTile v-else-if="tile.type === 'TrainTrackTile'" :position="tile.position" :direction="tile.direction"></TrainTracksTile>
      </template>
    </template> -->

    <AP v-for="plane in planes" :key="plane.index"></AP>
  </Group>
</template>

<script setup>
import { Group } from 'troisjs'
import { Fog, Color } from 'three'
import { addTrainTracks } from '#tiles/train-tracks/utils'
import { addAirports } from '#tiles/airport/utils'

import ForestTile from '#tiles/forest'
import AirportTile from '#tiles/airport'
import TrainTracksTile from '#tiles/train-tracks'

import Airplane from '#components/airplane.vue'
import AP from '#components/ap.vue'

import useScene from '#composables/use-scene'
import { onBeforeUnmount, onMounted } from 'vue'
import { randomRoundNumber, randomItemFromArray } from '../tools'

const { scene } = useScene()

onMounted(() => {
  const fog = new Fog(new Color(0x9bc8e9), 20, 350)
  scene.value.fog = fog
})

onBeforeUnmount(() => {
  if (scene.value) {
    scene.value.fog = null
  }
})

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


const planes = []
const seedPlanes = () => {
  for (let i = 0; i <= 100; i++) {
    const axisX = Math.random() > 0.5
    const randX = axisX ? randomRoundNumber(-1, 10) : randomItemFromArray([-1, 10])
    const randY = axisX ? randomItemFromArray([-1, 10]) : randomRoundNumber(-1, 10)

    let direction = 0

    if (randX === -1) {
      direction = 2
      if (randY === -1) {
        direction = 3
      } else if (randY === 10) {
        direction = 1
      }
    }

    if (randX === 10) {
      direction = 6
      if (randY === -1) {
        direction = 5
      } else if (randY === 10) {
        direction = 7
      }//
    }

    planes.push({
      index: i,
      position: { x: randX, y: randY },
      altitude: 0,
      direction,
    })
  }
}

seedPlanes()

console.log(planes)
</script>
