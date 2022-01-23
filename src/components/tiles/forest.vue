<template>
  <Group :position="normalizedPosition">
    <GrassTile :offsets="offsets" :dark="dark"></GrassTile>

    <Rocks :amount="amountOfRocks" />
    <Trees :amount="amountOfTrees" />
  </Group>
</template>

<script setup>
import { Group } from 'troisjs'
import { toRefs, computed } from 'vue'
import { randomRoundNumber } from '#/tools'

import usePosition from '#composables/use-prop-position'
import useOffsets from '#composables/use-prop-offsets'
import useDark from '#composables/use-prop-dark'

import GrassTile from '#components/tiles/grass.vue'
import Rocks from '#components/rocks.vue'
import Trees from '#components/trees.vue'

const props = defineProps({
  ...usePosition(),
  ...useOffsets(),
  ...useDark(),
})

const { position, offsets } = toRefs(props)

const normalizedPosition = computed(() => ({
  x: position.value.x * 10,
  y: 0,
  z: position.value.y * 10,
}))

const amountOfRocks = randomRoundNumber(0, 10)
const amountOfTrees = randomRoundNumber(5, 20)
</script>
