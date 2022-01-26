<template>
  <Group ref="farmhouse" :position="normalizedPosition" :rotation="rotation">
    <Box :width="2" :height="0.2" :depth="3" receive-shadow :position="{ x: 0, y: 0.1, z: 0 }">
      <LambertMaterial color="#9cb2c5" />
    </Box>

    <Box :width="1.9" :height="0.6" :depth="2.9" receive-shadow :position="{ x: 0, y: 0.5, z: 0 }">
      <LambertMaterial color="#ffffff" />
    </Box>

    <Box ref="top" :width="1.9" :height="1.3" :depth="2.9" receive-shadow :position="{ x: 0, y: 1.45, z: 0 }">
      <LambertMaterial color="#ffffff" />
    </Box>

    <Group ref="beams">
      <Box :width="0.1" :height="0.6" :depth="0.1" receive-shadow :position="{ x: 0.95, y: 0.5, z: 1.45 }">
        <LambertMaterial color="#caa27c" />
      </Box>

      <Box :width="0.1" :height="0.6" :depth="0.1" receive-shadow :position="{ x: -0.95, y: 0.5, z: 1.45 }">
        <LambertMaterial color="#caa27c" />
      </Box>

      <Box :width="1.9" :height="0.1" :depth="0.1" receive-shadow :position="{ x: 0, y: 0.8, z: 1.45 }">
        <LambertMaterial color="#caa27c" />
      </Box>

      <Box :width="0.1" :height="0.6" :depth="0.1" receive-shadow :position="{ x: 0.95, y: 0.5, z: -1.45 }">
        <LambertMaterial color="#caa27c" />
      </Box>

      <Box :width="0.1" :height="0.6" :depth="0.1" receive-shadow :position="{ x: -0.95, y: 0.5, z: -1.45 }">
        <LambertMaterial color="#caa27c" />
      </Box>

      <Box :width="1.9" :height="0.1" :depth="0.1" receive-shadow :position="{ x: 0, y: 0.8, z: -1.45 }">
        <LambertMaterial color="#caa27c" />
      </Box>
    </Group>

    <Group ref="roof">
      <Box ref="roofRight" :width="0.1" :height="1.4" :depth="3.1" receive-shadow :position="{ x: 1, y: 1.45, z: 0 }">
        <LambertMaterial color="#f5c662" />
      </Box>

      <Box ref="roofLeft" :width="0.1" :height="1.4" :depth="3.1" receive-shadow :position="{ x: -1, y: 1.45, z: 0 }">
        <LambertMaterial color="#f5c662" />
      </Box>
    </Group>

    <Group ref="chimney">
      <Box ref="chimneyBase" :width="0.2" :height="1" :depth="0.8" receive-shadow :position="{ x: -0.4, y: 1.3, z: 0.8 }">
        <LambertMaterial color="#a0684d" />
      </Box>

      <Box ref="chimneyAngle" :width="0.2" :height="0.4" :depth="0.8" receive-shadow :position="{ x: -0.4, y: 2, z: 0.8 }">
        <LambertMaterial color="#a0684d" />
      </Box>

      <Box ref="chimneyTop" :width="0.2" :height="0.3" :depth="0.2" receive-shadow :position="{ x: -0.4, y: 2.3, z: 0.8 }">
        <LambertMaterial color="#a0684d" />
      </Box>
    </Group>

    <Group ref="smoke" :position="{ x: -0.4, y: 2.4, z: 0.8 }">
      <Box ref="smoke1" :width="0.1" :height="0.1" :depth="0.1">
        <LambertMaterial color="#ffffff" />
      </Box>
      <Box ref="smoke2" :width="0.1" :height="0.1" :depth="0.1">
        <LambertMaterial color="#ffffff" />
      </Box>
      <Box ref="smoke3" :width="0.1" :height="0.1" :depth="0.1">
        <LambertMaterial color="#ffffff" />
      </Box>
    </Group>
  </Group>
</template>

<script setup>
import { Box, LambertMaterial, Group } from 'troisjs'
import { ref, onMounted, toRefs, computed } from 'vue'
import { setPoint } from '#tools'

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

const farmhouse = ref()
// const animation = ref()

const top = ref()
const roofRight = ref()
const roofLeft = ref()
const chimneyAngle = ref()

const smoke1 = ref()
const smoke2 = ref()
const smoke3 = ref()

onMounted(() => {
  console.log(farmhouse.value)

  // Top.
  setPoint(0, top, -0.95)
  setPoint(1, top, -0.95)
  setPoint(4, top, 0.95)
  setPoint(5, top, 0.95)

  // Roof right.
  setPoint(0, roofRight, -1)
  setPoint(1, roofRight, -1)
  setPoint(4, roofRight, -1)
  setPoint(5, roofRight, -1)

  // Roof left.
  setPoint(0, roofLeft, 1)
  setPoint(1, roofLeft, 1)
  setPoint(4, roofLeft, 1)
  setPoint(5, roofLeft, 1)

  // Chimney angle.
  setPoint(0, chimneyAngle, 0, 0, -0.3)
  setPoint(1, chimneyAngle, 0, 0, 0.3)
  setPoint(4, chimneyAngle, 0, 0, -0.3)
  setPoint(5, chimneyAngle, 0, 0, 0.3)

  let i = 0

  const smoke1Mesh = smoke1.value.mesh
  const smoke2Mesh = smoke2.value.mesh
  const smoke3Mesh = smoke3.value.mesh

  const getSmokePosition = (count, delay = 0) => {
    return ((count + delay) % 200) / 150
  }

  const getSmokeRotation = (count, delay = 0) => {
    return (count + delay) / 50
  }

  const getSmokeScale = (count, delay = 0) => {
    return Math.sin((((count + delay) % 200) / 200) * Math.PI)
  }

  rendererRef.value.onBeforeRender(() => {
    smoke1Mesh.position.y = getSmokePosition(i)
    smoke1Mesh.position.x = getSmokePosition(i) / -3
    smoke1Mesh.position.z = getSmokePosition(i) / 4
    smoke1Mesh.rotation.x = getSmokeRotation(i)
    smoke1Mesh.rotation.z = getSmokeRotation(i)
    smoke1Mesh.scale.x = getSmokeScale(i) * 1.3
    smoke1Mesh.scale.y = getSmokeScale(i) * 1.3
    smoke1Mesh.scale.z = getSmokeScale(i) * 1.3

    smoke2Mesh.position.y = getSmokePosition(i, 15)
    smoke2Mesh.position.x = getSmokePosition(i, 15) / -3
    smoke2Mesh.position.z = getSmokePosition(i, 15) / 4
    smoke2Mesh.rotation.x = getSmokeRotation(i, 15)
    smoke2Mesh.rotation.z = getSmokeRotation(i, 15)
    smoke2Mesh.scale.x = getSmokeScale(i, 15) * 1.2
    smoke2Mesh.scale.y = getSmokeScale(i, 15) * 1.2
    smoke2Mesh.scale.z = getSmokeScale(i, 15) * 1.2

    smoke3Mesh.position.y = getSmokePosition(i, 40)
    smoke3Mesh.position.x = getSmokePosition(i, 40) / -3
    smoke3Mesh.position.z = getSmokePosition(i, 40) / 4
    smoke3Mesh.rotation.x = getSmokeRotation(i, 40)
    smoke3Mesh.rotation.z = getSmokeRotation(i, 40)
    smoke3Mesh.scale.x = getSmokeScale(i, 40) * 1.4
    smoke3Mesh.scale.y = getSmokeScale(i, 40) * 1.4
    smoke3Mesh.scale.z = getSmokeScale(i, 40) * 1.4

  // let i = 0
  // let next = 0

  // rendererRef.value.onBeforeRender(() => {
  //   if (i % 20 === 0) {
  //     next = (0.5 - Math.random())
  //   } else {
  //     animation.value.o3d.rotation.y += next / 20
  //   }

    i++
  })
})
</script>
