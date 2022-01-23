<template>
  <Group
    ref="clouds"
    :position="normalizedPosition"
    :rotation="{ x: 0, y: rotation, z: 0 }"
    :scale="{ x: 2.5, y: 2.5, z: 2.5 }"
  >
    <Group ref="animation">
      <Dodecahedron
        ref="cloud1"
        :radius="0.8"
        :position="{ x: 0, y: 0.5, z: 0 }"
        :rotation="{ x: 0, y: 0, z: 0 }"
        cast-shadow
      >
        <LambertMaterial
          :color="colors[randomRoundNumber(0, colors.length - 1)]"
          :props="{ transparent: true, opacity: 0.95 }"
        />
      </Dodecahedron>

      <Dodecahedron
        ref="cloud2"
        :radius="0.6"
        :position="{ x: 0.5, y: 0.5, z: 0.5 }"
        :rotation="{ x: 0, y: 0, z: 0 }"
        cast-shadow
      >
        <LambertMaterial
          :color="colors[randomRoundNumber(0, colors.length - 1)]"
          :props="{ transparent: true, opacity: 0.95 }"
        />
      </Dodecahedron>

      <Dodecahedron
        ref="cloud3"
        :radius="0.45"
        :position="{ x: -0.3, y: 0.5, z: 0.7 }"
        :rotation="{ x: 0, y: 0, z: 0 }"
        cast-shadow
      >
        <LambertMaterial
          :color="colors[randomRoundNumber(0, colors.length - 1)]"
          :props="{ transparent: true, opacity: 0.95 }"
        />
      </Dodecahedron>

      <Dodecahedron
        ref="cloud4"
        :radius="0.3"
        :position="{ x: -0.3, y: 0.5, z: 1.2 }"
        :rotation="{ x: 0, y: 0, z: 0 }"
        cast-shadow
      >
        <LambertMaterial
          :color="colors[randomRoundNumber(0, colors.length - 1)]"
          :props="{ transparent: true, opacity: 0.95 }"
        />
      </Dodecahedron>

      <Dodecahedron
        ref="cloud5"
        :radius="0.4"
        :position="{ x: 0.2, y: 0.5, z: 1.1 }"
        :rotation="{ x: 0, y: 0, z: 0 }"
        cast-shadow
      >
        <LambertMaterial
          :color="colors[randomRoundNumber(0, colors.length - 1)]"
          :props="{ transparent: true, opacity: 0.95 }"
        />
      </Dodecahedron>

      <Dodecahedron
        ref="cloud6"
        :radius="0.64"
        :position="{ x: 0.4, y: 0.5, z: -0.8 }"
        :rotation="{ x: 0, y: 0, z: 0 }"
        cast-shadow
      >
        <LambertMaterial
          :color="colors[randomRoundNumber(0, colors.length - 1)]"
          :props="{ transparent: true, opacity: 0.95 }"
        />
      </Dodecahedron>

      <Dodecahedron
        ref="cloud7"
        :radius="0.34"
        :position="{ x: -0.2, y: 0.5, z: -1.2 }"
        :rotation="{ x: 0, y: 0, z: 0 }"
        cast-shadow
      >
        <LambertMaterial
          :color="colors[randomRoundNumber(0, colors.length - 1)]"
          :props="{ transparent: true, opacity: 0.95 }"
        />
      </Dodecahedron>
    </Group>
  </Group>
</template>

<script setup>
import { Dodecahedron, LambertMaterial, Group } from 'troisjs'
import { ref, onMounted, toRefs, computed } from 'vue'
import { randomRoundNumber } from '../tools'

import useRenderer from '#composables/use-renderer'
import usePosition from '#composables/use-prop-position'
import useAltitude from '#composables/use-prop-altitude'

const props = defineProps({
  ...usePosition(),
  ...useAltitude(6, true),
})

const { position, altitude } = toRefs(props)

const normalizedPosition = computed(() => ({
  x: position.value.x * 10,
  y: (altitude.value * 4),
  z: position.value.y * 10,
}))

const { rendererRef } = useRenderer()

const clouds = ref()
const animation = ref()
const cloud1 = ref()
const cloud2 = ref()
const cloud3 = ref()
const cloud4 = ref()
const cloud5 = ref()
const cloud6 = ref()
const cloud7 = ref()

const colors = ['#e7ebef', '#d3d8dd', '#dae1e9', '#ffffff']

const rotation = Math.round(Math.random() * Math.PI * 20) / 10

onMounted(() => {
  console.log(clouds.value)
  animation.value.o3d.scale.x = 2
  animation.value.o3d.scale.y = 2
  animation.value.o3d.scale.z = 2

  let i = 0

  const getCloudRotation = (count, delay = 0, speed = 400, d = 1) => {
    return ((count + delay) / speed) * d
  }

  const cloud1Mesh = cloud1.value.mesh
  const cloud2Mesh = cloud2.value.mesh
  const cloud3Mesh = cloud3.value.mesh
  const cloud4Mesh = cloud4.value.mesh
  const cloud5Mesh = cloud5.value.mesh
  const cloud6Mesh = cloud6.value.mesh
  const cloud7Mesh = cloud7.value.mesh

  rendererRef.value.onBeforeRender(() => {
    cloud1Mesh.rotation.y = getCloudRotation(i, 0, 2000, -1)
    cloud1Mesh.rotation.z = getCloudRotation(i, 0, 2000, -1)

    cloud2Mesh.rotation.y = getCloudRotation(i, 1500, 1500)
    cloud2Mesh.rotation.z = getCloudRotation(i, 1500, 1500)

    cloud3Mesh.rotation.y = getCloudRotation(i, 300, 1250, -1)
    cloud3Mesh.rotation.z = getCloudRotation(i, 300, 1250, -1)

    cloud4Mesh.rotation.y = getCloudRotation(i, 150, 1750)
    cloud4Mesh.rotation.z = getCloudRotation(i, 150, 1750)

    cloud5Mesh.rotation.y = getCloudRotation(i, -3000, 1320, -1)
    cloud5Mesh.rotation.z = getCloudRotation(i, -3000, 1320, -1)

    cloud6Mesh.rotation.y = getCloudRotation(i, 1250, 1600)
    cloud6Mesh.rotation.z = getCloudRotation(i, 1250, 1600)

    cloud7Mesh.rotation.y = getCloudRotation(i, -450, 1300, -1)
    cloud7Mesh.rotation.z = getCloudRotation(i, -450, 1300, -1)

    i++
  })
})
</script>
