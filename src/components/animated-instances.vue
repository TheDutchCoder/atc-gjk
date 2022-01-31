<template>
  <Group ref="base">
    <slot></slot>
  </Group>
</template>

<script setup>
import { Group } from 'troisjs'
import { Object3D, Vector3 } from 'three'
import { ref, computed, toRefs, watch, onMounted, onBeforeUnmount } from 'vue'
import { CubicBezier } from '#tools'

import useRenderer from '#composables/use-renderer'
import { randomRoundNumber } from '../tools'

/**
 * @todo Figure out if we can do individual scaling of meshes within the group,
 * instead of the group as a whole.
 */
const props = defineProps({
  isAnimated: {
    type: Boolean,
    default: false,
  },

  delay: {
    type: Number,
    default: 0,
  },

  speed: {
    type: Number,
    default: 30,
  },

  scaleX: {
    type: Boolean,
    default: false,
  },

  scaleY: {
    type: Boolean,
    default: false,
  },

  scaleZ: {
    type: Boolean,
    default: false,
  },

  scaleAll: {
    type: Boolean,
    default: false,
  },
})

const { isAnimated, delay, speed, scaleX, scaleY, scaleZ, scaleAll } = toRefs(props)
const { rendererRef } = useRenderer()

const base = ref()
const timer = ref(0)

let t = 0
const SPEED = 30
const END = 60
let ar = []

/**
 * When the animation is complete, remove the animation function from the
 * renderer.
 */
// watch(
//   timer,
//   (newTime) => {
//     if (newTime > endTime.value && isAnimated.value) {
//       rendererRef.value.offBeforeRender(animation)
//     }
//   }
// )

/**
 * The animation loop for the base tile. Will grow the tile over time and make
 * sure shadows are updated.
 */
const animation = () => {
  const dummy = new Object3D()

  if (t === 0) {
    base.value.o3d.traverse((child => {
      for (let i = 0; i < child.count; i++) {
        child.getMatrixAt(i, dummy.matrix)
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale)

        ar.push({
          start: randomRoundNumber(0, SPEED),
          scale: Object.assign({}, dummy.scale)
        })
      }
    }))
  }

  if (t <= END) {
    base.value.o3d.traverse((child => {
      for (let i = 0; i < child.count; i++) {
        child.getMatrixAt(i, dummy.matrix)
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale)
        const fraction = t / (END + ar[i].start)
        if (t >= ar[i].start) {
          dummy.scale.set(fraction*ar[i].scale.x, fraction*ar[i].scale.y, fraction*ar[i].scale.z)
        } else {
          dummy.scale.set(0.00001*ar[i].scale.x, 0.00001*ar[i].scale.y, 0.00001*ar[i].scale.z)
        }
        dummy.matrix.compose(dummy.position, dummy.quaternion, dummy.scale)

        child.setMatrixAt(i, dummy.matrix)
        child.instanceMatrix.needsUpdate = true
      }
    }))

  }

  timer.value++
  t++
}

onMounted(() => {
  if (isAnimated.value) {
    rendererRef.value.onBeforeRender(animation)
  }
})

onBeforeUnmount(() => {
  if (isAnimated.value) {
    rendererRef.value.offBeforeRender(animation)
  }
})
</script>
