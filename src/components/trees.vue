<template>
  <!-- <AnimatedInstances is-animated scaleY :delay="30"> -->
    <InstancedMesh ref="bases" :count="amount" receive-shadow cast-shadow>
      <ConeGeometry :radial-segments="4" />
      <StandardMaterial color="#c6966f" :props="{ flatShading: true }" />
    </InstancedMesh>
  <!-- </AnimatedInstances> -->

  <!-- <AnimatedInstances is-animated scaleY :delay="60"> -->
    <InstancedMesh ref="treesLow" :count="amount" receive-shadow cast-shadow>
      <ConeGeometry :radial-segments="4" />
      <StandardMaterial color="#9fcf88" :props="{ flatShading: true }" />
    </InstancedMesh>
  <!-- </AnimatedInstances> -->

  <!-- <AnimatedInstances is-animated scaleY :delay="90"> -->
    <InstancedMesh ref="treesHigh" :count="amount" receive-shadow cast-shadow>
      <ConeGeometry :radial-segments="4" />
      <StandardMaterial color="#9fcf88" :props="{ flatShading: true }" />
    </InstancedMesh>
  <!-- </AnimatedInstances> -->
</template>

<script setup>
import { StandardMaterial, InstancedMesh, ConeGeometry } from 'troisjs'
import { toRefs, onMounted, ref } from 'vue'
import { randomNumber, randomRoundNumber } from '#tools'
import { Object3D, Color, Vector3, Euler } from 'three'

import useAmount from '#composables/use-prop-amount'
import useExcludes from '#composables/use-prop-excludes'

import AnimatedInstances from '#components/animated-instances.vue'

const props = defineProps({
  ...useAmount(),
  ...useExcludes(),
})

const { amount, excludes } = toRefs(props)

const bases = ref()
const treesLow = ref()
const treesHigh = ref()

onMounted(() => {
  const basesMesh = bases.value.mesh;
  const treesLowMesh = treesLow.value.mesh;
  const treesHighMesh = treesHigh.value.mesh;

  const colors = [new Color('#9fcf88'), new Color('#8bbb75'), new Color('#cfc788'), new Color('#cb906d')]
  const vectorY = new Vector3(0, 1, 0)

  for (let i = 0; i < amount.value; i++) {
    const randomScale = randomNumber(1, 3.5)
    const randomRotationX = randomNumber(-0.1, 0.1)
    const randomRotationY = randomNumber(-0.1, 0.1)
    const isHigh = Math.random() > 0.5

    const color = colors[randomRoundNumber(0, colors.length - 1)]
    const x = randomNumber(-4.8, 4.8, excludes.value.x)
    const y = randomNumber(-4.8, 4.8, excludes.value.y)
    const euler = new Euler(randomRotationX, randomRotationY, 0, 'XYZ')

    const dummy1 = new Object3D()
    const dummy2 = new Object3D()

    dummy1.setRotationFromEuler(euler)
    dummy1.position.set(x, 0, y);
    dummy1.translateOnAxis(vectorY, 0.3 * randomScale)
    dummy1.scale.set(0.1 * randomScale, 0.6 * randomScale, 0.1 * randomScale);
    dummy1.updateMatrix();

    dummy2.setRotationFromEuler(euler)
    dummy2.position.set(x, 0, y);
    dummy2.translateOnAxis(vectorY, 0.5 * randomScale)
    dummy2.scale.set(0.15 * randomScale, 0.8 * randomScale, 0.15 * randomScale)
    dummy2.updateMatrix()

    if (isHigh) {
      const dummy3 = new Object3D()
      dummy3.setRotationFromEuler(euler)
      dummy3.position.set(x, 0, y);
      dummy3.translateOnAxis(vectorY, 0.8 * randomScale)
      dummy3.scale.set(0.1 * randomScale, 0.6 * randomScale, 0.1 * randomScale)
      dummy3.updateMatrix()

      treesHighMesh.setMatrixAt(i, dummy3.matrix)
      treesHighMesh.setColorAt(i, color)
    }

    basesMesh.setMatrixAt(i, dummy1.matrix)
    treesLowMesh.setMatrixAt(i, dummy2.matrix)
    treesLowMesh.setColorAt(i, color)
  }

  basesMesh.instanceMatrix.needsUpdate = true
  treesLowMesh.instanceMatrix.needsUpdate = true
  treesHighMesh.instanceMatrix.needsUpdate = true
})
</script>
