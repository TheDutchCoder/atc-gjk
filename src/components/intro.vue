<template>
  <AP></AP>
</template>

<script setup>
import { Group } from 'troisjs'
import { Fog, Color } from 'three'
import { randomItemFromArray } from '#tools'

import AP from '#components/ap.vue'

import Airplane from '#components/airplane.vue'
import Clouds from '#components/clouds.vue'
import Animated from '#components/animated.vue'

// import GrassTile from '#tiles/grass.vue'
import FarmTile from '#tiles/farm.vue'
import ForestTile from '#tiles/forest'
import AirportTile from '#tiles/airport'
import TrainTracksTile from '#tiles/train-tracks'

import useScene from '#composables/use-scene'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const { scene } = useScene()

/**
 * Plane selection
 */
const planeIsSelected = ref(false)

const selectPlane = () => planeIsSelected.value = true


onMounted(() => {
  const fog = new Fog(new Color(0x9bc8e9), 15, 30)
  scene.value.fog = fog
})

onBeforeUnmount(() => {
  if (scene.value) {
    scene.value.fog = null
  }
})

const tiles = [
  // GrassTile,
  FarmTile,
  ForestTile,
  AirportTile,
  TrainTracksTile,
]

const randomTile = randomItemFromArray(tiles)
</script>
