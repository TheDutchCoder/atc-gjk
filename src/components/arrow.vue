<template>
  <Group :position="position">
    <Box :width="2" :height="0.5" :depth="1" receive-shadow :position="{ x: 0, y: 1, z: 0 }">
      <StandardMatieral color="#ff0000" :props="{ flatShading: true, transparent :true, opacity: 0.75 }" />
    </Box>
  </Group>
</template>

<script setup>
import { StandardMatieral, Group, Box } from 'troisjs'

defineProps({
  position: Object,
})
</script>
