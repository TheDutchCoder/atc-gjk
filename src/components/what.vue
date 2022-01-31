<template>
  <!-- <Group> -->
    <Group ref="yolo" :position="{ x: 0, y: 2, z: 0 }" :rotation="{ x: 0.2, y: 0, z: 0.1 }">
      <Box>
        <StandardMaterial color="#ff0000"></StandardMaterial>
      </Box>
    </Group>

    <Group ref="yolo2" :position="{ x: 2, y: 1, z: 2 }" :rotation="{ x: 0.2, y: 0, z: 0.1 }">
      <Box>
        <StandardMaterial color="#ff0000"></StandardMaterial>
      </Box>
    </Group>
  <!-- </Group> -->
</template>

<script setup>
import { Group, Box, StandardMaterial } from 'troisjs'
import { onMounted, ref } from 'vue'

import useAnimate from '#composables/use-animate'

const yolo = ref()
const yolo2 = ref()

onMounted(() => {
  const { animated } = useAnimate({
    ref: yolo,
    from: { x: 0, y: 0, z: 0 },
    to: { x: 1, y: 2, z: 3 },
    speed: 100,
    delay: 30,
  })

  setTimeout(() => {
    animated.value = !animated.value
  }, 1000)

  // console.log(animated.value)

  // useAnimate({
  //   ref: yolo2,
  //   from: 0,
  //   to: 1.2,
  //   speed: 60,
  //   delay: 10,
  // })
})
</script>
