<template>
  <Box
    ref="grass"
    :width="10"
    :height="1"
    :depth="10"
    :width-segments="WIDTH_SEGMENTS"
    :depth-segments="DEPTH_SEGMENTS"
    :position="normalizedPosition"
    receive-shadow
  >
    <StandardMaterial ref="grassMaterial" :color="dark ? '#a8cf86' : '#b6dd94'" :props="{ flatShading: true }" />
  </Box>

  <Box
    ref="ground"
    :width="10"
    :height="2"
    :depth="10"
    :position="normalizedPosition2"
  >
    <StandardMaterial color="#a58670" :props="{ flatShading: true }" />
  </Box>
</template>

<script setup>
import { StandardMaterial } from 'troisjs'
import { toRefs, computed, onMounted, ref } from 'vue'
import { Vector3 } from 'three'

import usePosition from '#composables/use-prop-position'
import useDark from '#composables/use-prop-dark'
import useOffsets from '#composables/use-prop-offsets'

const WIDTH_SEGMENTS = 10
const DEPTH_SEGMENTS = 10

const props = defineProps({
  ...usePosition(),
  ...useDark(),
  ...useOffsets(),
})

const { position, offsets } = toRefs(props)

const normalizedPosition = computed(() => ({
  x: position.value.x * 10,
  y: -0.5,
  z: position.value.y * 10,
}))

const normalizedPosition2 = computed(() => ({
  x: position.value.x * 10,
  y: -2,
  z: position.value.y * 10,
}))

const grass = ref()

onMounted(() => {
  const v = grass.value.geometry.getAttribute('position')

  for (let i = 0; i < v.count; i++) {
    const vt = new Vector3()
    vt.fromBufferAttribute(v, i)

    if (vt.y >= 0.5 && (vt.x !== -5 && vt.x !== 5 && vt.z !== -5 && vt.z !== 5)) {
      const randomY = 0.15 - (Math.random() * 0.3)
      const randomX = (WIDTH_SEGMENTS / 40) - (Math.random() * (WIDTH_SEGMENTS / 20))
      const randomZ = (DEPTH_SEGMENTS / 40) - (Math.random() * (DEPTH_SEGMENTS / 20))

      for (let y = 0; y < v.count; y++) {
        const vt2 = new Vector3()
        vt2.fromBufferAttribute(v, y)

        if (vt.x === vt2.x && vt.y === vt2.y && vt.z === vt2.z) {
          v.setXYZ(i, vt.x + randomX, vt.y + randomY, vt.z + randomZ);
          v.setXYZ(y, vt2.x + randomX, vt2.y + randomY, vt2.z + randomZ);
        }
      }
    }
  }

  grass.value.geometry.attributes.position.needsUpdate = true
})
</script>
