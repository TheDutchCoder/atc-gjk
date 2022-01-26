<template>
  <Group :position="{ x: position.x * 10, y: 0, z: position.y * 10 }">
    <GrassTile :offsets="offsets" :dark="dark"></GrassTile>

    <Group ref="assets" :rotation="{ x: 0, y: (-Math.PI / 2) * direction, z: 0 }">
      <Rocks :amount="10" :excludes="{ x: [-1.2, 1.2] }"></Rocks>
      <Bushes :amount="6" :excludes="{ x: [-1.2, 1.2] }"></Bushes>

      <Box :width="0.1" :height="0.1" :depth="10" :position="{ x: -0.75, y: 0.24, z: 0 }">
        <LambertMaterial color="#eeeeee" />
      </Box>

      <Box :width="0.1" :height="0.1" :depth="10" :position="{ x: 0.75, y: 0.24, z: 0 }">
        <LambertMaterial color="#eeeeee" />
      </Box>

      <InstancedMesh ref="beams" :count="20">
        <BoxGeometry :width="2" :height="0.15" :depth="0.2" />
        <LambertMaterial color="#763116" />
      </InstancedMesh>
    </Group>
  </Group>
</template>

<script setup>
import { Box, LambertMaterial, InstancedMesh } from 'troisjs'
import { toRefs, onMounted, ref } from 'vue'
import { randomNumber } from '#tools'
import { Object3D } from 'three'

import GrassTile from '#tiles/grass.vue'
import Rocks from '#components/rocks.vue'
import Bushes from '#components/bushes.vue'

const props = defineProps({
  position: {
    type: Object,
    default: () => ({
      x: 0,
      y: 0,
    })
  },
  dark: Boolean,
  offsets: {
    type: Array,
    default: () => [0, 0, 0, 0]
  },
  direction: {
    type: Number,
    default: 0,
  },
})

const { direction, position } = toRefs(props)

const beams = ref()

onMounted(() => {
  const beamsMesh = beams.value.mesh
  const dummy = new Object3D()

  for (let i = 0; i < 20; i++) {
    const rotation = randomNumber(-0.05, 0.05)
    const positionZ = 4.75 - (i * 0.5)

    dummy.position.set(0, 0.15, positionZ)
    dummy.rotation.set(0, rotation, 0)
    dummy.updateMatrix()

    beamsMesh.setMatrixAt(i, dummy.matrix)
  }

  beamsMesh.instanceMatrix.needsUpdate = true
})
</script>
