<template>
  <Group ref="fence" :position="normalizedPosition" :rotation="rotation">
    <Box :width="0.05" :height="0.1" :depth="1" receive-shadow :position="{ x: -0.5, y: 0.15, z: 0 }">
      <LambertMaterial color="#c89872" />
    </Box>

    <Box :width="0.05" :height="0.1" :depth="1" receive-shadow :position="{ x: -0.5, y: 0.35, z: 0 }">
      <LambertMaterial color="#c89872" />
    </Box>

    <Box :width="0.07" :height="0.5" :depth="0.07" receive-shadow :position="{ x: -0.5, y: 0.25, z: 0.4 }">
      <LambertMaterial color="#c89872" />
    </Box>

    <Box :width="0.07" :height="0.5" :depth="0.07" receive-shadow :position="{ x: -0.5, y: 0.25, z: -0.4 }">
      <LambertMaterial color="#c89872" />
    </Box>
  </Group>
</template>

<script setup>
import { Box, LambertMaterial, Group } from 'troisjs'
import { ref, onMounted, toRefs, computed } from 'vue'

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

const r = (0.5 - Math.random()) / 5
const rotation = computed(() => ({
  x: 0,
  y: (direction.value * Math.PI / 2) + r,
  z: 0,
}))

const fence = ref()

onMounted(() => {
  console.log(fence.value)
})
</script>
