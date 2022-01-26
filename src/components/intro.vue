<template>
  <Group>
    <component :is="randomTile"></component>
    <Airplane :position="{ x: 0, y: 0 }" :altitude="1"></Airplane>
  </Group>
</template>

<script setup>
import { Group } from 'troisjs'
import { randomItemFromArray } from '#tools'
import Airplane from '#components/airplane.vue'

import ForestTile from '#tiles/forest'
import AirportTile from '#tiles/airport'
import TrainTracksTile from '#tiles/train-tracks'

const tiles = [
  ForestTile,
  AirportTile,
  TrainTracksTile,
]

const randomTile = randomItemFromArray(tiles)
</script>
