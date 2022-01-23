<template>
  <Group>
    <ForestTile></ForestTile>
    <Airplane :position="{ x: 0, y: 0 }" :altitude="1" :direction="2"></Airplane>
  </Group>
</template>

<script setup>
import { Group } from 'troisjs'
import Airplane from '#components/airplane.vue'
import ForestTile from '#tiles/forest.vue'
</script>
