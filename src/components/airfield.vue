<template>
  <Group ref="airfield" :position="{ x: 0, y: 0.1, z: 0 }" :rotation="{ x: 0, y: rotation, z: 0 }">
    <Box :width="3" :height="0.1" :depth="9" receive-shadow>
      <LambertMaterial color="#222222" />
    </Box>

    <Rocks :amount="10" :excludes="{ x: [-2, 2] }"></Rocks>
    <Trees :amount="10" :excludes="{ x: [-2, 2] }"></Trees>

    <Box
      v-for="n in 7"
      :key="n"
      :width="0.2"
      :height="0.05"
      :depth="0.75"
      receive-shadow
      :position="{ x: 0, y: 0.05, z: -4.6 + (n * 1.15) }"
    >
      <LambertMaterial color="#f7c654" />
    </Box>

    <Box
      v-for="n in 6"
      :ref="el => { if (el) reds[n - 1] = el }"
      :width="0.2"
      :height="0.2"
      :depth="0.2"
      :position="{ x: -1.4 + (n * 0.4), y: 0.05, z: -4.2 }"
    >
      <LambertMaterial color="#ff0000" :props="{ transparent: true, opacity: 0.85 }" />
    </Box>

    <PointLight
      v-for="n in 6"
      :ref="el => { if (el) redLights[n - 1] = el }"
      :position="{ x: -1.4 + (n * 0.4), y: 0.05, z: -4.2 }"
      :intensity="1"
      :color="COLORS.RED"
      :distance="10"
    ></PointLight>

    <Box
      v-for="n in 6"
      :ref="el => { if (el) greens[n - 1] = el }"
      :width="0.2"
      :height="0.2"
      :depth="0.2"
      :position="{ x: -1.4 + (n * 0.4), y: 0.05, z: 4.2 }"
    >
      <LambertMaterial color="#00ff00" :props="{ transparent: true, opacity: 0.85 }" />
    </Box>

    <PointLight
      v-for="n in 6"
      :ref="el => { if (el) greenLights[n - 1] = el }"
      :position="{ x: -1.4 + (n * 0.4), y: 0.05, z: 4.2 }"
      :intensity="1"
      :color="COLORS.GREEN"
      :distance="10"
    ></PointLight>
  </Group>
</template>

<script setup>
import { Box, LambertMaterial, Group } from 'troisjs'
import { ref, onMounted, onBeforeUpdate, toRefs, computed } from 'vue'
import { randomNumber } from '#/tools'
import * as COLORS from '#/colors'
import useRenderer from '#composables/use-renderer'

import useDirection from '../composables/use-prop-direction'

import Rocks from '#components/rocks.vue'
import Trees from '#components/trees.vue'

const props = defineProps({
  ...useDirection(0, true),
})

const { direction } = toRefs(props)

const rotation = computed(() => -direction.value * Math.PI / 4)

const reds = ref([])
const greens = ref([])
const greenLights = ref([])
const redLights = ref([])
const redLightMeshes = ref([])

onBeforeUpdate(() => {
  reds.value = []
  greens.value = []
  redLights.value = []
  greenLights.value = []
})

onMounted(() => {
  const { rendererRef } = useRenderer()
  let i = 0

  rendererRef.value.onBeforeRender(() => {

    // Animate the lights
    greenLights.value.forEach((light, index) => {
      if ((i + (index * -10)) % 200 >= 0 && (i + (index * -10)) % 200 < 10) {
        greens.value[index].material.opacity = 1
        light.light.visible = true
      } else {
        greens.value[index].material.opacity = 0.5
        light.light.visible = false
      }
    })

    redLights.value.forEach((light, index) => {
      if ((i + 100 + (index * -10)) % 200 >= 0 && (i + 100 + (index * -10)) % 200 < 10) {
        reds.value[index].material.opacity = 1
        light.light.visible = true
      } else {
        reds.value[index].material.opacity = 0.5
        light.light.visible = false
      }
    })

    i++
  })
})
</script>
