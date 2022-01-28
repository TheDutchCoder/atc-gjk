<template>
  <Animated is-animated scaleY :delay="40">
    <InstancedMesh ref="rocks" :count="amount" receive-shadow cast-shadow :props="{ name: 'Rock' }">
      <DodecahedronGeometry :radius="0.5" />
      <StandardMaterial :props="{ flatShading: true }" />
    </InstancedMesh>
  </Animated>
</template>

<script setup>
import { DodecahedronGeometry, StandardMaterial } from 'troisjs'
import { onMounted, ref, toRefs } from 'vue'
import { Object3D, Color } from 'three'
import { randomRoundNumber, randomNumber } from '#tools'

import useAmount from '#composables/use-prop-amount'
import useExcludes from '#composables/use-prop-excludes'

import Animated from '#components/animated.vue'

const props = defineProps({
  ...useAmount(),
  ...useExcludes(),
})

const { amount, excludes } = toRefs(props)

const rocks = ref()

const colors = [new Color('#919ba4'), new Color('#b8b6a6'), new Color('#acb7b5')]

onMounted(() => {
  const rocksMesh = rocks.value.mesh
  const dummy = new Object3D()

  for (let i = 0; i < amount.value; i++) {
    const color = colors[randomRoundNumber(0, colors.length - 1)]
    const scale = randomNumber(0.2, 1)
    const rotation = randomNumber(0, Math.PI * 2)
    const positionX = randomNumber(-4.5, 4.5, excludes.value.x)
    const positionY = randomNumber(-4.5, 4.5, excludes.value.y)

    dummy.position.set(positionX, 0, positionY)
    dummy.scale.set(scale, scale, scale)
    dummy.rotation.set(rotation, rotation, rotation)
    dummy.updateMatrixWorld()

    rocksMesh.setMatrixAt(i, dummy.matrix)
    rocksMesh.setColorAt(i, color)
  }

  rocksMesh.instanceMatrix.needsUpdate = true
})
</script>
