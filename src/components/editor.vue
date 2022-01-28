<template>
  <Group>
    <component :is="selectedComponent"></component>
  </Group>
</template>

<script setup>
import { Group } from 'troisjs'

import GrassTile from '#tiles/grass.vue'
import ForestTile from '#tiles/forest'
import Airplane from '#components/airplane.vue'

const selectedComponent = GrassTile
</script>
