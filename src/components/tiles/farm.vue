<template>
  <Group ref="farm" :position="normalizedPosition" :rotation="{ x: 0, y: rotation, z: 0 }">
    <GrassTile :offsets="offsets" :dark="dark"></GrassTile>

    <Farmhouse :position="{ x: -2, y: 2 }"></Farmhouse>

    <Trees :amount="6" :excludes="{ x: [-5, 0], y: [-5, 0] }"></Trees>

    <!-- Fences should be instances! -->
    <Group ref="pigs">
      <Fence :position="{ x: -4, y: -4 }" :direction="0"></Fence>
      <Fence :position="{ x: -4, y: -3 }" :direction="0"></Fence>
      <Fence :position="{ x: -4, y: -2 }" :direction="0"></Fence>

      <Fence :position="{ x: -4, y: -2 }" :direction="1"></Fence>
      <Fence :position="{ x: -3, y: -2 }" :direction="1"></Fence>
      <Fence :position="{ x: -2, y: -2 }" :direction="1"></Fence>
      <Fence :position="{ x: -1, y: -2 }" :direction="1"></Fence>

      <Fence :position="{ x: -1, y: -4 }" :direction="2"></Fence>
      <Fence :position="{ x: -1, y: -3 }" :direction="2"></Fence>
      <Fence :position="{ x: -1, y: -2 }" :direction="2"></Fence>

      <Fence :position="{ x: -4, y: -4 }" :direction="3"></Fence>
      <Fence :position="{ x: -3, y: -4 }" :direction="3"></Fence>
      <Fence :position="{ x: -2, y: -4 }" :direction="3"></Fence>
      <Fence :position="{ x: -1, y: -4 }" :direction="3"></Fence>

      <Pig :position="{ x: -4, y: -4 }" :direction="2"></Pig>
      <Pig :position="{ x: -3, y: -2 }"></Pig>
      <Pig :position="{ x: -2, y: -3 }"></Pig>
    </Group>

    <Group ref="sheep">
      <Fence :position="{ x: 4, y: -4 }" :direction="2"></Fence>
      <Fence :position="{ x: 4, y: -3 }" :direction="2"></Fence>
      <Fence :position="{ x: 4, y: -2 }" :direction="2"></Fence>
      <Fence :position="{ x: 2, y: -1 }" :direction="2"></Fence>
      <Fence :position="{ x: 2, y: 0 }" :direction="2"></Fence>

      <Fence :position="{ x: 4, y: -2 }" :direction="1"></Fence>
      <Fence :position="{ x: 3, y: -2 }" :direction="1"></Fence>
      <Fence :position="{ x: 2, y: 0 }" :direction="1"></Fence>
      <Fence :position="{ x: 1, y: 0 }" :direction="1"></Fence>

      <Fence :position="{ x: 1, y: -4 }" :direction="0"></Fence>
      <Fence :position="{ x: 1, y: -3 }" :direction="0"></Fence>
      <Fence :position="{ x: 1, y: -2 }" :direction="0"></Fence>
      <Fence :position="{ x: 1, y: -1 }" :direction="0"></Fence>
      <Fence :position="{ x: 1, y: 0 }" :direction="0"></Fence>

      <Fence :position="{ x: 4, y: -4 }" :direction="3"></Fence>
      <Fence :position="{ x: 3, y: -4 }" :direction="3"></Fence>
      <Fence :position="{ x: 2, y: -4 }" :direction="3"></Fence>
      <Fence :position="{ x: 1, y: -4 }" :direction="3"></Fence>

      <Sheep :position="{ x: 4, y: -4 }" :direction="2"></Sheep>
      <Sheep :position="{ x: 3, y: -2 }"></Sheep>
      <Sheep :position="{ x: 2, y: -3 }"></Sheep>
    </Group>
  </Group>
</template>

<script setup>
import { Box, LambertMaterial, Group } from 'troisjs'
import { ref, onMounted, toRefs, computed } from 'vue'

import GrassTile from '#tiles/grass.vue'

import Farmhouse from '#components/farmhouse.vue'
import Fence from '#components/fence.vue'
import Pig from '#components/pig.vue'
import Sheep from '#components/sheep.vue'
import Trees from '#components/trees.vue'

import usePosition from '#composables/use-prop-position'
import useOffsets from '#composables/use-prop-offsets'
import useDark from '#composables/use-prop-dark'
import { randomRoundNumber } from '../../tools'

const farm = ref()

const props = defineProps({
  ...usePosition(),
  ...useOffsets(),
  ...useDark(),
})

const { position } = toRefs(props)

const normalizedPosition = computed(() => ({
  x: position.value.x * 10,
  y: 0,
  z: position.value.y * 10,
}))

const rotation = randomRoundNumber(0, 7) * Math.PI / 2

onMounted(() => {
  // console.log(farm.value)
})
</script>
