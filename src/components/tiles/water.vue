<template>
  <Box
    ref="water"
    :width="10"
    :height="1"
    :depth="10"
    :position="normalizedPosition"
    receive-shadow
  >
    <LambertMaterial color="#85bde5" :props="{ transparent: true, opacity: 0.85 }" />
  </Box>
</template>

<script setup>
import { LambertMaterial } from 'troisjs'
import { toRefs, computed, onMounted, ref } from 'vue'
import { setPoint } from '#/tools'

import usePosition from '#composables/use-prop-position'

const props = defineProps({
  ...usePosition(),
})

const { position } = toRefs(props)

const normalizedPosition = computed(() => ({
  x: position.value.x * 10,
  y: -0.4,
  z: position.value.y * 10,
}))
</script>
