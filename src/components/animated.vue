<template>
  <Group :ref="el => { elements[0] = el }">
    <slot></slot>
  </Group>
</template>

<script setup>
import { onMounted, ref, toRefs, useSlots } from 'vue'
import useAnimate from '#composables/use-animate'

/**
 * @todo individual axis scaling
 */

const props = defineProps({
  from: {
    type: Number,
    default: 0,
  },

  to: {
    type: Number,
    default: 0,
  },

  speed: {
    type: Number,
    default: 60,
  },

  delay: {
    type: Number,
    default: 0,
  },

  visible: {
    type: Boolean,
    default: false,
  },

  axis: {
    type: Object,
    default: () => ({
      x: true,
      y: true,
      z: true,
    })
  }
})

const elements = ref([])

const { from, to, speed, delay, visible, axis } = toRefs(props)

onMounted(() => {
  useAnimate({
    ref: elements.value[0],
    from: from.value,
    to: to.value,
    speed: speed.value,
    delay: delay.value,
    visible: visible.value,
    axis: axis.value,
  })
})
</script>
