<template>
  <Group :position="normalizedPosition" :props="{ name: 'airport' }">
    <GrassTile :offsets="offsets" :dark="dark"></GrassTile>

    <Airfield :direction="direction"></Airfield>
  </Group>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { Group } from 'troisjs'

import GrassTile from '#tiles/grass.vue'
import Airfield from '#components/airfield.vue'

import usePosition from '#composables/use-prop-position'
import useDirection from '#composables/use-prop-direction'
import useOffsets from '#composables/use-prop-offsets'
import useDark from '#composables/use-prop-dark'

const props = defineProps({
  ...usePosition(),
  ...useDirection(0),
  ...useOffsets(),
  ...useDark(),
})

const { position, direction } = toRefs(props)

const normalizedPosition = computed(() => ({
  x: position.value.x * 10,
  y: 0,
  z: position.value.y * 10,
}))
</script>
