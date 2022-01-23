<template>
  <Group ref="pig" :position="normalizedPosition" :rotation="rotation">
    <Group ref="animation">
      <Box :width="0.4" :height="0.4" :depth="0.5" receive-shadow :position="{ x: 0, y: 0.3, z: 0 }">
        <LambertMaterial color="#ea76a5" />
      </Box>

      <Box :width="0.1" :height="0.1" :depth="0.1" receive-shadow :position="{ x: 0.1, y: 0.05, z: 0.13 }">
        <LambertMaterial color="#ea76a5" />
      </Box>

      <Box :width="0.1" :height="0.1" :depth="0.1" receive-shadow :position="{ x: -0.1, y: 0.05, z: 0.13 }">
        <LambertMaterial color="#ea76a5" />
      </Box>

      <Box :width="0.1" :height="0.1" :depth="0.1" receive-shadow :position="{ x: 0.1, y: 0.05, z: -0.13 }">
        <LambertMaterial color="#ea76a5" />
      </Box>

      <Box :width="0.1" :height="0.1" :depth="0.1" receive-shadow :position="{ x: -0.1, y: 0.05, z: -0.13 }">
        <LambertMaterial color="#ea76a5" />
      </Box>

      <Group ref="eyeLeft">
        <Box :width="0.1" :height="0.1" :depth="0.02" receive-shadow :position="{ x: -0.1, y: 0.4, z: 0.25 }">
          <LambertMaterial color="#ffffff" />
        </Box>

        <Box :width="0.05" :height="0.05" :depth="0.02" receive-shadow :position="{ x: -0.1, y: 0.4, z: 0.26 }">
          <LambertMaterial color="#000000" />
        </Box>
      </Group>

      <Group ref="eyeRight">
        <Box :width="0.1" :height="0.1" :depth="0.02" receive-shadow :position="{ x: 0.1, y: 0.4, z: 0.25 }">
          <LambertMaterial color="#ffffff" />
        </Box>

        <Box :width="0.05" :height="0.05" :depth="0.02" receive-shadow :position="{ x: 0.1, y: 0.4, z: 0.26 }">
          <LambertMaterial color="#000000" />
        </Box>
      </Group>

      <Box ref="nose" :width="0.2" :height="0.1" :depth="0.1" receive-shadow :position="{ x: 0, y: 0.25, z: 0.25 }">
        <LambertMaterial color="#ea76a5" />
      </Box>
    </Group>
  </Group>
</template>

<script setup>
import { Box, LambertMaterial, Group } from 'troisjs'
import { ref, onMounted, toRefs, computed } from 'vue'

import useRenderer from '#composables/use-renderer'

const props = defineProps({
  position: {
    type: Object,
    default: (() => ({
      x: 0,
      y: 0
    }))
  },

  direction: {
    type: Number,
    default: 0,
  },
})

const { position, direction } = toRefs(props)

const normalizedPosition = computed(() => ({
  x: position.value.x,
  y: 0,
  z: position.value.y,
}))

const rotation = computed(() => ({
  x: 0,
  y: direction.value * Math.PI / 2,
  z: 0,
}))

const { rendererRef } = useRenderer()

const pig = ref()
const animation = ref()

onMounted(() => {
  console.log(pig.value)

  let i = 0
  let next = 0

  rendererRef.value.onBeforeRender(() => {
    if (i % 20 === 0) {
      next = (0.5 - Math.random())
    } else {
      animation.value.o3d.rotation.y += next / 20
    }

    i++
  })
})
</script>
