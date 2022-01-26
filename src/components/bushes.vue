<template>
  <InstancedMesh ref="bushesBase" :count="amount" receive-shadow cast-shadow>
    <CylinderGeometry :radius-top="0.05" :radius-bottom="0.1" />
    <LambertMaterial color="#763116" />
  </InstancedMesh>

  <InstancedMesh ref="bushes" :count="amount" receive-shadow cast-shadow>
    <DodecahedronGeometry :radius="0.5" />
    <LambertMaterial />
  </InstancedMesh>
</template>

<script setup>
import { CylinderGeometry, DodecahedronGeometry, LambertMaterial } from 'troisjs'
import { onMounted, ref, toRefs } from 'vue'
import { Object3D, Color } from 'three'
import { randomRoundNumber, randomNumber } from '#tools'

import useAmount from '#composables/use-prop-amount'
import useExlcudes from '#composables/use-prop-excludes'

const props = defineProps({
  ...useAmount(),
  ...useExlcudes(),
})

const { amount, excludes } = toRefs(props)

const bushes = ref()
const bushesBase = ref()

const colors = [new Color('#9fcf88'), new Color('#8bbb75'), new Color('#cfc788')]

onMounted(() => {
  const bushesMesh = bushes.value.mesh
  const bushesBaseMesh = bushesBase.value.mesh
  const dummy = new Object3D()
  const dummy2 = new Object3D()

  for (let i = 0; i < amount.value; i++) {
    const color = colors[randomRoundNumber(0, colors.length - 1)]
    const scale = randomNumber(0.6, 1)
    const height = randomNumber(0, 0.2)
    const rotation = randomNumber(0, Math.PI * 2)
    const positionX = randomNumber(-4.5, 4.5, excludes.value.x)
    const positionY = randomNumber(-4.5, 4.5, excludes.value.y)

    dummy.position.set(positionX, 0.2 + height + (scale / 2), positionY)
    dummy.scale.set(scale, scale, scale)
    dummy.rotation.set(rotation, rotation, rotation)
    dummy.updateMatrix()

    dummy2.position.set(positionX, 0, positionY)
    dummy2.updateMatrix()

    bushesMesh.setMatrixAt(i, dummy.matrix)
    bushesMesh.setColorAt(i, color)

    bushesBaseMesh.setMatrixAt(i, dummy2.matrix)
  }

  bushesMesh.instanceMatrix.needsUpdate = true
  bushesBaseMesh.instanceMatrix.needsUpdate = true
})
</script>
