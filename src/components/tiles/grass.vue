<template>
  <Box
    ref="grass"
    :width="10"
    :height="1"
    :depth="10"
    :position="normalizedPosition"
    receive-shadow
  >
    <LambertMaterial :color="dark ? '#a8cf86' : '#b6dd94'" />
  </Box>
</template>

<script setup>
import { LambertMaterial } from 'troisjs'
import { toRefs, computed, onMounted, ref } from 'vue'
import { setPoint } from '#/tools'

import usePosition from '#composables/use-prop-position'
import useDark from '#composables/use-prop-dark'
import useOffsets from '#composables/use-prop-offsets'

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

const grass = ref()

onMounted(() => {
  setPoint(5, grass, null, offsets.value[0])
  setPoint(1, grass, null, offsets.value[1])
  setPoint(0, grass, null, offsets.value[2])
  setPoint(4, grass, null, offsets.value[3])
})
</script>
