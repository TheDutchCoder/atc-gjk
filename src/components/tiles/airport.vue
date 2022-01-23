<template>
  <Group :position="normalizedPosition" :props="{ name: 'airport' }">
    <GrassTile :offsets="offsets" :dark="dark"></GrassTile>

    <Airfield :direction="direction"></Airfield>

    <!-- <Group ref="arrow" :rotation="rotation">
      <Box ref="arrowBase" :width="1" :height="0.5" :depth="1.5"  :position="{ x: 0, y: 1, z: 2.55 }">
        <LambertMaterial color="#ffff00"></LambertMaterial>
      </Box>

      <Box ref="arrowHead" :width="1.2" :height="0.5" :depth="0.7"  :position="{ x: 0, y: 1, z: 1.45 }">
        <LambertMaterial color="#ffff00"></LambertMaterial>
      </Box>
    </Group>-->

    <!-- <Box :width="6" :height="0.1" :depth="2" receive-shadow :position="{ x: 0, y: 0.15, z: 0 }">
      <LambertMaterial color="#222222" />
    </Box>

    <Box v-for="n in 7" :key="n" :width="0.4" :height="0.05" :depth="0.1" receive-shadow :position="{ x: -3.2 + (n * 0.8), y: 0.20, z: 0 }">
      <LambertMaterial color="#f7c654" />
    </Box>

    <Box v-for="n in 6" :width="1" :height="1" :depth="1" :scale="{ x: 0.1, y: 0.1, z: 0.1 }" :position="{ x: -2.8, y: 0.25, z: 1.05 - (n * 0.3) }">
      <PhongMaterial color="#ff0000" />
    </Box>

    <Box v-for="n in 6" :width="1" :height="1" :depth="1" :scale="{ x: 0.1, y: 0.1, z: 0.1 }" :position="{ x: 2.8, y: 0.25, z: 1.05 - (n * 0.3) }">
      <LambertMaterial color="#00ff00" />
    </Box>

    <Tree v-for="n in 20" :key="n" :position="{ x: -4.5 + (Math.random() * 9), y: -4.5 + (Math.random() * 9) }"></Tree>-->
  </Group>
</template>

<script setup>
import { computed, onMounted, toRefs } from 'vue'
import { Group } from 'troisjs'

import GrassTile from '#tiles/grass.vue'
import Airfield from '#components/airfield.vue'

import usePosition from '#composables/use-prop-position'
import useDirection from '#composables/use-prop-direction'
import useOffsets from '#composables/use-prop-offsets'
import useDark from '#composables/use-prop-dark'

const props = defineProps({
  ...usePosition(),
  ...useDirection(0, true),
  ...useOffsets(),
  ...useDark(),
})

const { position, direction } = toRefs(props)

const normalizedPosition = computed(() => ({
  x: position.value.x * 10,
  y: 0,
  z: position.value.y * 10,
}))

onMounted(() => {
  //
})
</script>
