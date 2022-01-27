<template>
  <Group>
    <component :is="randomTile"></component>
    <Airplane :position="{ x: 0, y: 0 }" :altitude="1"></Airplane>
    <Clouds :altitude="1.8"></Clouds>
  </Group>
</template>

<script setup>
import { Group } from 'troisjs'
import { Fog, Color } from 'three'
import { randomItemFromArray } from '#tools'

import Airplane from '#components/airplane.vue'
import Clouds from '#components/clouds.vue'

// import GrassTile from '#tiles/grass.vue'
import FarmTile from '#tiles/farm.vue'
import ForestTile from '#tiles/forest'
import AirportTile from '#tiles/airport'
import TrainTracksTile from '#tiles/train-tracks'

import useScene from '#composables/use-scene'
import { onBeforeUnmount, onMounted } from 'vue'

const { scene } = useScene()

onMounted(() => {
  const fog = new Fog(new Color(0x9bc8e9), 10, 35)
  scene.value.fog = fog
})

onBeforeUnmount(() => {
  if (scene.value) {
    scene.value.fog = null
  }
})

const tiles = [
  // GrassTile,
  // FarmTile,
  ForestTile,
  AirportTile,
  TrainTracksTile,
]

const randomTile = randomItemFromArray(tiles)
</script>
