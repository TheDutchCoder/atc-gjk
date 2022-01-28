<template>
  <Group ref="base">
    <slot></slot>
  </Group>
</template>

<script setup>
import { Group } from 'troisjs'
import { ref, computed, toRefs, watch, onMounted, onBeforeUnmount } from 'vue'
import { CubicBezier } from '#tools'

import useRenderer from '#composables/use-renderer'

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

  trigger: Boolean
})

const { isAnimated, delay, speed, scaleX, scaleY, scaleZ, scaleAll, trigger } = toRefs(props)
const { rendererRef } = useRenderer()

const base = ref()
const baseX = ref(0)
const baseY = ref(0)
const baseZ = ref(0)
const timer = ref(0)

let t = 0
const endTime = computed(() => speed.value + delay.value)

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
  // if (t <= 10) {
    // const scale = (t+1)/11
    // const dummy = new Object3D()
    // const d = new Vector3()

    // base.value.o3d.traverse(child => {
    //   if (child.name === 'Rock') {
    //     for (let i = 0; i < child.count; i++) {
    //       child.getMatrixAt(i, dummy.matrix)
    //       dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale)

    //       // console.log(dummy)
    //       // const scale = randomNumber(0.2, 1)
    //       dummy.scale.set(scale, scale, scale)
    //       dummy.updateMatrix()
    //       child.setMatrixAt(i, dummy.matrix)
    //     }

    //     child.instanceMatrix.needsUpdate = true
    //   }
    // })

    // for (let x = 0; x < yolo.length; x++) {
    //   // console.log(yolo[x])
    //   const child = yolo[x]
    //   // console.log(child.matrix)

    //   for (let i = 0; i < child.count; i++) {
    //     child.getMatrixAt(i, dummy.matrix)
    //     dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale)

    //     console.log(t)
    //     dummy.scale.set(5, t, 5)

    //     // d.setFromMatrixScale(dummy.matrix)
    //     // d.setY(t)

    //     // dummy.matrix.scale(d)
    //     dummy.updateMatrix()
    //     // dummy.matrix.compose(dummy.position, dummy.quaternion, dummy.scale)
    //     // console.log('d', dummy)
    //     child.setMatrixAt(i, dummy.matrix)
    //     // child.scale.setY(t)

    //     // console.log('dummy', dummy)
    //   }

    //   child.instanceMatrix.needsUpdate = true
    // }

    // yolo.forEach((child) => {
    //   for (let i = 0; i < child.count; i++) {
    //     // const start = (i * 50) + 50
    //     console.log(child)

    //     child.getMatrixAt(i, dummy.matrix)
    //     dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale)
    //     // dummy.applyMatrix4(child.matrix)

    //     console.log(dummy)

    //     // dummy.updateMatrix()

    //     // console.log(dummy)

    //     // const v = new Vector3()
    //     // console.log(v)

    //     // dummy.getWorldPosition(v)

    //     // console.log(v)

    //     // const dummy3 = new Object3D()
    //     // const dummy3 = child.clone()
    //     // dummy3.scale.set(0.1 * randomScale, 0.6 * randomScale, 0.1 * randomScale)

    //     // if (timer.value <= start) {
    //       console.log(t)
    //       dummy.scale.set(t, t, t)
    //       dummy.matrix.compose(dummy.position, dummy.quaternion, dummy.scale)
    //       dummy.updateMatrix()
    //       // dummy.updateMatrixWorld()
    //       // child.scale.set(0, 0, 0)
    //     // } else if (timer.value >= start) {
    //       // const scale = (timer.value - start) / start //t: 100 s: 50 => (50-50)/50
    //       // child.scale.set(scale, scale, scale)
    //     // }

    //     child.setMatrixAt(i, dummy.matrix)
    //   }

    //   // child.parent().setMatrixAt(i, dummy3.matrix)
    //   child.instanceMatrix.needsUpdate = true
    // })
  // }

  // if (timer.value < delay.value) {
  //   yolo.forEach(child => child.scale.set(0, 0, 0))
  // }

  if (timer.value === 0) {
    base.value.o3d.scale.set(0, 0, 0)
  }

  if ((timer.value >= delay.value) && (timer.value <= endTime.value)) {


    // Animate dindividual instances?
    // base.value.o3d.children.forEach(child => {
    //   if (child.name === 'Rock') {
    //     console.log(child)
    //     const fraction = (timer.value - delay.value) / speed.value
    //     const scale = CubicBezier(fraction, 0, 0, 1, 1)

    //     if (scaleAll.value) {
    //       child.scale.set(scale, scale, scale)
    //     } else {
    //       child.scale.set(scaleX.value ? scale : baseX.value, scaleY.value ? scale : baseY.value, scaleZ.value ? scale : baseZ.value)
    //     }
    //   }
    // })


    const fraction = (timer.value - delay.value) / speed.value
    const scale = CubicBezier(fraction, 0, 0, 1, 1)

    if (scaleAll.value) {
      base.value.o3d.scale.setScalar(scale)
    } else {
      base.value.o3d.scale.set(scaleX.value ? scale : baseX.value, scaleY.value ? scale : baseY.value, scaleZ.value ? scale : baseZ.value)
    }

    rendererRef.value.renderer.shadowMap.needsUpdate = true
  }

  timer.value++
  t++
}

onMounted(() => {

  // base.value.o3d.children.forEach((child, i) => {
  //   if (child.name === 'Rock') {
  //     yolo.push(child)
  //   }
  // })

  baseX.value = base.value.o3d.scale.x
  baseY.value = base.value.o3d.scale.x
  baseZ.value = base.value.o3d.scale.x

  if (isAnimated.value) {
    // base.value.o3d.scale.set(0, 0, 0)
    rendererRef.value.onBeforeRender(animation)
  }
})

onBeforeUnmount(() => {
  if (isAnimated.value) {
    rendererRef.value.offBeforeRender(animation)
  }
})
</script>
