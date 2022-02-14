<template>
  <Group
    ref="airplane"
    :position="normalizedPosition"
    :rotation="{ x: pitch, y: angle, z: 0 }"
    :props="{ transparent: true, opacity: 0.5 }"
  >

    <!-- Selected triangle -->
    <Cone ref="cone" v-if="selected" :radius="0.75" :height="1.25" :radial-segments="3" :position="{ x: 0, y: 2, z: 0 }" :rotation="{ x: Math.PI, y: 0, z: 0 }">
      <StandardMaterial :color="isGhost ? '#eeeeee' : '#00ff00'" :props="{ flatShading: true, transparent: true, opacity: 0.75 }" />
    </Cone>

    <Group ref="animation">
      <Box
        @click.self="selectAirplane"
        ref="hull"
        :width="1"
        :height="1"
        :depth="2"
        :position="{ x: 0, y: 0, z: 0 }"
        cast-shadow
      >
        <StandardMaterial :color="currentColor" :props="{ flatShading: true, transparent: isGhost, opacity: isGhost ? 0.75 : 1 }" />
      </Box>

      <Box
        @click.self="selectAirplane"
        ref="screen"
        :width="0.7"
        :height="0.4"
        :depth="0.05"
        :position="{ x: 0, y: 0.65, z: -0.7 }"
        :rotation="{ x: 0.2, y: 0, z: 0 }"
      >
        <StandardMaterial color="#e2eff4" :props="{ flatShading: true, transparent: true, opacity: 0.5 }" />
      </Box>

      <Box
        @click.self="selectAirplane"
        ref="engine"
        :width="1"
        :height="1"
        :depth="0.5"
        :position="{ x: 0, y: 0, z: -1.25 }"
        cast-shadow
      >
        <StandardMaterial :color="COLORS.WHITE" :props="{ flatShading: true, transparent: isGhost, opacity: isGhost ? 0.75 : 1 }" />
      </Box>

      <Group
        ref="pipeRight"
        :position="{ x: 0, y: 0.05, z: 0 }"
        :rotation="{ x: -0.05, y: 0, z: 0 }"
      >
        <Box
          @click.self="selectAirplane"
          ref="pipeRight1"
          :width="0.1"
          :height="0.1"
          :depth="0.5"
          :position="{ x: 0.5, y: 0.2, z: -1.05 }"
          :rotation="{ x: 0, y: 0.2, z: Math.PI / 4 }"
        >
          <StandardMaterial :color="COLORS.GREY" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="pipeRight2"
          :width="0.1"
          :height="0.1"
          :depth="0.5"
          :position="{ x: 0.55, y: 0.2, z: -0.55 }"
          :rotation="{ x: 0, y: 0, z: Math.PI / 4 }"
        >
          <StandardMaterial :color="COLORS.GREY" :props="{ flatShading: true }" />
        </Box>
      </Group>

      <Group ref="smokeLeft" :position="{ x: 0, y: 0, z: -0.25 }">
        <Box
          @click.self="selectAirplane"
          ref="smokeLeft1"
          :width="0.1"
          :height="0.1"
          :depth="0.1"
          :position="{ x: -0.55, y: 0.3, z: -0.25 }"
        >
          <StandardMaterial :color="COLORS.WHITE" :props="{ flatShading: true }" />
        </Box>
        <Box
          @click.self="selectAirplane"
          ref="smokeLeft2"
          :width="0.1"
          :height="0.1"
          :depth="0.1"
          :position="{ x: -0.55, y: 0.3, z: -0.25 }"
        >
          <StandardMaterial :color="COLORS.WHITE" :props="{ flatShading: true }" />
        </Box>
        <Box
          @click.self="selectAirplane"
          ref="smokeLeft3"
          :width="0.1"
          :height="0.1"
          :depth="0.1"
          :position="{ x: -0.55, y: 0.3, z: -0.25 }"
        >
          <StandardMaterial :color="COLORS.WHITE" :props="{ flatShading: true }" />
        </Box>
      </Group>

      <Group ref="smokeRight" :position="{ x: 0, y: 0, z: -0.25 }">
        <Box
          @click.self="selectAirplane"
          ref="smokeRight1"
          :width="0.1"
          :height="0.1"
          :depth="0.1"
          :position="{ x: 0.55, y: 0.3, z: -0.25 }"
        >
          <StandardMaterial :color="COLORS.WHITE" :props="{ flatShading: true }" />
        </Box>
        <Box
          @click.self="selectAirplane"
          ref="smokeRight2"
          :width="0.1"
          :height="0.1"
          :depth="0.1"
          :position="{ x: 0.55, y: 0.3, z: -0.25 }"
        >
          <StandardMaterial :color="COLORS.WHITE" :props="{ flatShading: true }" />
        </Box>
        <Box
          @click.self="selectAirplane"
          ref="smokeRight3"
          :width="0.1"
          :height="0.1"
          :depth="0.1"
          :position="{ x: 0.55, y: 0.3, z: -0.25 }"
        >
          <StandardMaterial :color="COLORS.WHITE" :props="{ flatShading: true }" />
        </Box>
      </Group>

      <Group
        ref="pipeLeft"
        :position="{ x: 0, y: 0.05, z: 0 }"
        :rotation="{ x: -0.05, y: 0, z: 0 }"
      >
        <Box
          @click.self="selectAirplane"
          ref="pipeLeft1"
          :width="0.1"
          :height="0.1"
          :depth="0.5"
          :position="{ x: -0.5, y: 0.2, z: -1.05 }"
          :rotation="{ x: 0, y: -0.2, z: Math.PI / 4 }"
        >
          <StandardMaterial :color="COLORS.GREY" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="pipeLeft2"
          :width="0.1"
          :height="0.1"
          :depth="0.5"
          :position="{ x: -0.55, y: 0.2, z: -0.55 }"
          :rotation="{ x: 0, y: 0, z: Math.PI / 4 }"
        >
          <StandardMaterial :color="COLORS.GREY" :props="{ flatShading: true }" />
        </Box>
      </Group>

      <Box
        @click.self="selectAirplane"
        ref="nut"
        :width="0.2"
        :height="0.2"
        :depth="0.3"
        :position="{ x: 0, y: 0, z: -1.55 }"
        cast-shadow
      >
        <StandardMaterial :color="COLORS.BROWN" :props="{ flatShading: true }" />
      </Box>

      <Box
        @click.self="selectAirplane"
        ref="prop1"
        :width="0.15"
        :height="1.5"
        :depth="0.05"
        :position="{ x: 0, y: 0, z: -1.6 }"
        :rotation="{ x: 0, y: 0, z: Math.PI / 4 }"
        cast-shadow
      >
        <StandardMaterial :color="COLORS.BLACK" :props="{ flatShading: true }" />
      </Box>

      <Box
        @click.self="selectAirplane"
        ref="prop2"
        :width="0.15"
        :height="1.5"
        :depth="0.05"
        :position="{ x: 0, y: 0, z: -1.6 }"
        :rotation="{ x: 0, y: 0, z: -Math.PI / 4 }"
      >
        <StandardMaterial :color="COLORS.BLACK" :props="{ flatShading: true }" />
      </Box>

      <Box
        @click.self="selectAirplane"
        ref="wings"
        :width="3"
        :height="0.1"
        :depth="1"
        :position="{ x: 0, y: 0, z: -0.25 }"
        cast-shadow
      >
        <StandardMaterial :color="currentColor" :props="{ flatShading: true, transparent: isGhost, opacity: isGhost ? 0.75 : 1 }" />
      </Box>

      <Box
        @click.self="selectAirplane"
        ref="rudder"
        :width="0.1"
        :height="0.75"
        :depth="0.5"
        :position="{ x: 0, y: 0.5, z: 0.95 }"
        cast-shadow
      >
        <StandardMaterial :color="currentColor" :props="{ flatShading: true, transparent: isGhost, opacity: isGhost ? 0.75 : 1 }" />
      </Box>

      <Group ref="rightWheel" :position="{ x: -0.3, y: 0, z: -1.4 }">
        <Box
          @click.self="selectAirplane"
          ref="rightWheel-base"
          :width="0.4"
          :height="0.5"
          :depth="0.6"
          :position="{ x: 0, y: -0.3, z: 0.75 }"
          cast-shadow
        >
          <StandardMaterial :color="currentColor" :props="{ flatShading: true, transparent: isGhost, opacity: isGhost ? 0.75 : 1 }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="rightWheel-nut"
          :width="0.34"
          :height="0.2"
          :depth="0.2"
          :position="{ x: 0, y: -0.6, z: 0.75 }"
          cast-shadow
        >
          <StandardMaterial :color="COLORS.BROWN" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="rightWheel-tire"
          :width="0.2"
          :height="0.4"
          :depth="0.4"
          :position="{ x: 0, y: -0.6, z: 0.75 }"
          cast-shadow
        >
          <StandardMaterial :color="COLORS.BLACK" :props="{ flatShading: true }" />
        </Box>
      </Group>

      <Group ref="leftWheel" :position="{ x: 0.3, y: 0, z: -1.4 }">
        <Box
          @click.self="selectAirplane"
          ref="leftWheel-base"
          :width="0.4"
          :height="0.5"
          :depth="0.6"
          :position="{ x: 0, y: -0.3, z: 0.75 }"
          cast-shadow
        >
          <StandardMaterial :color="currentColor" :props="{ flatShading: true, transparent: isGhost, opacity: isGhost ? 0.75 : 1 }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="leftWheel-nut"
          :width="0.34"
          :height="0.2"
          :depth="0.2"
          :position="{ x: 0, y: -0.6, z: 0.75 }"
          cast-shadow
        >
          <StandardMaterial :color="COLORS.BROWN" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="leftWheel-tire"
          :width="0.2"
          :height="0.4"
          :depth="0.4"
          :position="{ x: 0, y: -0.6, z: 0.75 }"
          cast-shadow
        >
          <StandardMaterial :color="COLORS.BLACK" :props="{ flatShading: true }" />
        </Box>
      </Group>

      <Group ref="rearWheel">
        <Box
          @click.self="selectAirplane"
          ref="rearWheel-base"
          :width="0.3"
          :height="0.5"
          :depth="0.15"
          :position="{ x: 0, y: -0.3, z: 0.75 }"
          :rotation="{ x: -0.2, y: 0, z: 0 }"
          cast-shadow
        >
          <StandardMaterial :color="currentColor" :props="{ flatShading: true, transparent: isGhost, opacity: isGhost ? 0.75 : 1 }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="rearWheel-nut"
          :width="0.2"
          :height="0.2"
          :depth="0.2"
          :position="{ x: 0, y: -0.5, z: 0.8 }"
          cast-shadow
        >
          <StandardMaterial :color="COLORS.BROWN" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="rearWheel-tire"
          :width="0.15"
          :height="0.4"
          :depth="0.4"
          :position="{ x: 0, y: -0.5, z: 0.8 }"
          cast-shadow
        >
          <StandardMaterial :color="COLORS.BLACK" :props="{ flatShading: true }" />
        </Box>
      </Group>

      <Group ref="pilot">
        <Box
          @click.self="selectAirplane"
          ref="body"
          :width="0.3"
          :height="0.3"
          :depth="0.3"
          :position="{ x: 0, y: 0.4, z: 0 }"
        >
          <StandardMaterial :color="isGhost ? '#eeeeee' : '#9d795a'" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="head"
          :width="0.2"
          :height="0.2"
          :depth="0.2"
          :position="{ x: 0, y: 0.65, z: 0.02 }"
        >
          <StandardMaterial color="#f5dbb0" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="earRight"
          :width="0.05"
          :height="0.07"
          :depth="0.05"
          :position="{ x: 0.1, y: 0.65, z: 0.02 }"
        >
          <StandardMaterial color="#f5dbb0" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="earLeft"
          :width="0.05"
          :height="0.07"
          :depth="0.05"
          :position="{ x: -0.1, y: 0.65, z: 0.02 }"
        >
          <StandardMaterial color="#f5dbb0" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="goggleStrap"
          :width="0.22"
          :height="0.02"
          :depth="0.22"
          :position="{ x: 0, y: 0.65, z: 0.02 }"
        >
          <StandardMaterial color="#76573c" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="goggleLeft"
          :width="0.07"
          :height="0.07"
          :depth="0.07"
          :position="{ x: 0.05, y: 0.65, z: -0.07 }"
        >
          <StandardMaterial color="#76573c" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="goggleRight"
          :width="0.07"
          :height="0.07"
          :depth="0.07"
          :position="{ x: -0.05, y: 0.65, z: -0.07 }"
        >
          <StandardMaterial color="#76573c" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="hair1"
          :width="0.2"
          :height="0.05"
          :depth="0.2"
          :position="{ x: 0, y: 0.775, z: 0.02 }"
        >
          <StandardMaterial :color="COLORS.WHITE" :props="{ flatShading: true }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="hair2"
          :width="0.22"
          :height="0.05"
          :depth="0.22"
          :position="{ x: 0, y: 0.74, z: 0.05 }"
        >
          <StandardMaterial :color="COLORS.WHITE" :props="{ flatShading: true }" />
        </Box>

        <!-- <Box ref="hair2" :width="0.05" :height="0.05" :depth="0.05" :position="{ x: 0.09, y: 0.75, z: -0.07 }">
          <StandardMaterial :color="COLORS.WHITE" :props="{ flatShading: true }" />
        </Box>-->

        <!-- Lights -->
        <Box
          @click.self="selectAirplane"
          ref="lightGreen"
          :width="0.1"
          :height="0.1"
          :depth="0.1"
          :position="{ x: 1.6, y: 0, z: -0.75 }"
        >
          <StandardMaterial :color="COLORS.GREEN" :props="{ flatShading: true, transparent: true, opacity: 0.5 }" />
        </Box>

        <Box
          @click.self="selectAirplane"
          ref="lightRed"
          :width="0.1"
          :height="0.1"
          :depth="0.1"
          :position="{ x: -1.6, y: 0, z: -0.75 }"
        >
          <StandardMaterial :color="COLORS.RED" :props="{ flatShading: true, transparent: true, opacity: 0.85 }" />
        </Box>

        <!-- High perf impact -->
        <!-- <PointLight
          ref="lightGreenLight"
          :position="{ x: 1.6, y: 0, z: -0.8 }"
          :intensity="1"
          :color="COLORS.GREEN"
          :distance="10"
        ></PointLight>
        <PointLight
          ref="lightRedLight"
          :position="{ x: -1.6, y: 0, z: -0.8 }"
          :intensity="1"
          :color="COLORS.RED"
          :distance="10"
        ></PointLight> -->
      </Group>
    </Group>
  </Group>
</template>

<script setup>
import { StandardMaterial, Group, Box, PointLight, Cone } from 'troisjs'
import { Color } from 'three'
import { computed, onBeforeUnmount, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { setPoint } from '#tools'
import * as COLORS from '#/colors'

import useDebugger from '#composables/use-debugger'
import useRenderer from '#composables/use-renderer'
import useAnimate from '#composables/use-animate'

import { randomRoundNumber } from '../tools'

const { debugging } = useDebugger()
const { rendererRef } = useRenderer()

const props = defineProps({
  position: {
    type: Object,
    default: () => ({
      x: 0,
      y: 0,
    })
  },

  altitude: {
    type: Number,
    default: 0,
  },

  direction: {
    type: Number,
    default: 0,
  },

  isGhost: Boolean,
  selected: Boolean,
})

const emit = defineEmits(['select'])

const { altitude, direction, position, selected, isGhost } = toRefs(props)

const colors = ['#A80000', '#FB6400', '#FFC400', '#62BA27', '#3342C4', '#9362C4']
const color = colors[randomRoundNumber(0, colors.length - 1)]

const currentColor = computed(() => {
  if (isGhost.value) {
    return COLORS.WHITE
  }

  if (selected.value) {
    return COLORS.BLACK
  }

  return color
})

const isFlying = computed(() => altitude.value > 0)

const heightOffset = computed(() => {
  return (altitude.value * 4) + 0.8
})

const normalizedPosition = computed(() => {
  return {
    x: position.value.x * 10,
    y: heightOffset.value,
    z: position.value.y * 10,
  }
})

const pitch = computed(() => isFlying.value ? 0 : 0.08)
const angle = computed(() => direction.value * Math.PI / -4)

const airplane = ref()
const animation = ref()
const hull = ref()
const engine = ref()
const nut = ref()
const prop1 = ref()
const prop2 = ref()
const wings = ref()
const rudder = ref()
const screen = ref()
const pipeLeft1 = ref()
const pipeLeft2 = ref()
const pipeRight1 = ref()
const pipeRight2 = ref()

const smokeRight1 = ref()
const smokeRight2 = ref()
const smokeRight3 = ref()

const smokeLeft1 = ref()
const smokeLeft2 = ref()
const smokeLeft3 = ref()

const lightGreen = ref()
const lightGreenLight = ref()
const lightRed = ref()
const lightRedLight = ref()

const cone = ref()

// const isGhost = computed(() => {
//   return position.value.x < -5 ||
//     position.value.x > 5 ||
//     position.value.y < -5 ||
//     position.value.y > 5
// })

const selectAirplane = () => {
  if (!isGhost.value) {
    emit('select')
  }
}

let animate

onMounted(() => {
  // Hull.
  // setPoint(0, hull, -0.2, -0.1)
  // setPoint(2, hull, -0.2, 0.3)
  // setPoint(4, hull, 0.2, -0.1)
  // setPoint(6, hull, 0.2, 0.3)

  // // Engine.
  // setPoint(1, engine, -0.1, -0.1)
  // setPoint(3, engine, -0.1, 0.1)
  // setPoint(5, engine, 0.1, -0.1)
  // setPoint(7, engine, 0.1, 0.1)

  // // Propeller nut.
  // setPoint(0, nut, 0.07, 0.07)
  // setPoint(2, nut, 0.07, -0.07)
  // setPoint(4, nut, -0.07, 0.07)
  // setPoint(6, nut, -0.07, -0.07)

  // // Wings.
  // setPoint(1, wings, 0.2, 0.05)
  // setPoint(3, wings, 0.2, -0.05)
  // setPoint(5, wings, -0.2, 0.05)
  // setPoint(7, wings, -0.2, -0.05)

  // // Rudder.
  // setPoint(0, rudder, -0.04, 0.05)
  // setPoint(2, rudder, -0.04)
  // setPoint(3, rudder, 0, -0.05)
  // setPoint(4, rudder, 0.04, 0.05)
  // setPoint(6, rudder, 0.04)
  // setPoint(7, rudder, 0, -0.05)

  // // Screen.
  // setPoint(0, screen, -0.05)
  // setPoint(1, screen, -0.05)
  // setPoint(4, screen, 0.05)
  // setPoint(5, screen, 0.05)

  // // Exhaust pipe left.
  // setPoint(4, pipeLeft1, null, null, 0.01)
  // setPoint(1, pipeLeft2, null, null, -0.009)
  // setPoint(5, pipeLeft2, null, null, -0.009)
  // setPoint(7, pipeLeft2, null, null, -0.01)

  // // Exhaust pipe right.
  // setPoint(2, pipeRight1, null, null, 0.01)
  // setPoint(1, pipeRight2, null, null, -0.005)
  // setPoint(3, pipeRight2, null, null, -0.01)
  // setPoint(7, pipeRight2, null, null, -0.005)

  // Loop.
  let i = 0

  const prop1Mesh = prop1.value.mesh
  const prop2Mesh = prop2.value.mesh
  const propelerOffset = Math.PI / 2

  const smokeRight1Mesh = smokeRight1.value.mesh
  const smokeRight2Mesh = smokeRight2.value.mesh
  const smokeRight3Mesh = smokeRight3.value.mesh

  const smokeLeft1Mesh = smokeLeft1.value.mesh
  const smokeLeft2Mesh = smokeLeft2.value.mesh
  const smokeLeft3Mesh = smokeLeft3.value.mesh

  // console.log(airplane.value.o3d)
  // airplane.value.o3d.center()

  const getSmokePosition = (count, delay = 0) => {
    return ((count + delay) % 100) / 100
  }

  const getSmokeRotation = (count, delay = 0) => {
    return (count + delay) / 50
  }

  const getSmokeScale = (count, delay = 0) => {
    return Math.sin((((count + delay) % 100) / 100) * Math.PI)
  }

  // console.log(lightGreen.value)
  animate = () => {
    if (!debugging.value) {
      smokeRight1Mesh.position.z = getSmokePosition(i)
      smokeRight1Mesh.rotation.y = getSmokeRotation(i)
      smokeRight1Mesh.rotation.z = getSmokeRotation(i)
      smokeRight1Mesh.scale.x = getSmokeScale(i) * 1.1
      smokeRight1Mesh.scale.y = getSmokeScale(i) * 1.1
      smokeRight1Mesh.scale.z = getSmokeScale(i) * 1.1

      smokeRight2Mesh.position.z = getSmokePosition(i, 15)
      smokeRight2Mesh.rotation.y = getSmokeRotation(i, 15)
      smokeRight2Mesh.rotation.z = getSmokeRotation(i, 15)
      smokeRight2Mesh.scale.x = getSmokeScale(i, 15) * 1.5
      smokeRight2Mesh.scale.y = getSmokeScale(i, 15) * 1.5
      smokeRight2Mesh.scale.z = getSmokeScale(i, 15) * 1.5

      smokeRight3Mesh.position.z = getSmokePosition(i, 35)
      smokeRight3Mesh.rotation.y = getSmokeRotation(i, 35)
      smokeRight3Mesh.rotation.z = getSmokeRotation(i, 35)
      smokeRight3Mesh.scale.x = getSmokeScale(i, 35) * 1.3
      smokeRight3Mesh.scale.y = getSmokeScale(i, 35) * 1.3
      smokeRight3Mesh.scale.z = getSmokeScale(i, 35) * 1.3

      smokeLeft1Mesh.position.z = getSmokePosition(i, 40)
      smokeLeft1Mesh.rotation.y = getSmokeRotation(i, 40)
      smokeLeft1Mesh.rotation.z = getSmokeRotation(i, 40)
      smokeLeft1Mesh.scale.x = getSmokeScale(i, 40) * 1.2
      smokeLeft1Mesh.scale.y = getSmokeScale(i, 40) * 1.2
      smokeLeft1Mesh.scale.z = getSmokeScale(i, 40) * 1.2

      smokeLeft2Mesh.position.z = getSmokePosition(i, 55)
      smokeLeft2Mesh.rotation.y = getSmokeRotation(i, 55)
      smokeLeft2Mesh.rotation.z = getSmokeRotation(i, 55)
      smokeLeft2Mesh.scale.x = getSmokeScale(i, 55)
      smokeLeft2Mesh.scale.y = getSmokeScale(i, 55)
      smokeLeft2Mesh.scale.z = getSmokeScale(i, 55)

      smokeLeft3Mesh.position.z = getSmokePosition(i, 75)
      smokeLeft3Mesh.rotation.y = getSmokeRotation(i, 75)
      smokeLeft3Mesh.rotation.z = getSmokeRotation(i, 75)
      smokeLeft3Mesh.scale.x = getSmokeScale(i, 75) * 1.35
      smokeLeft3Mesh.scale.y = getSmokeScale(i, 75) * 1.35
      smokeLeft3Mesh.scale.z = getSmokeScale(i, 75) * 1.35

      const rotation = (Math.PI / 2) * (i / 5)
      const bob = Math.sin(i / Math.PI / 8) / 5
      const pitch = Math.sin(i / Math.PI / 10) / 10

      prop1Mesh.rotation.z = rotation
      prop2Mesh.rotation.z = rotation + propelerOffset

      if (cone.value) {
        cone.value.o3d.position.y = -bob + 2
        cone.value.o3d.rotation.y = i / 100
      }

      if (animation.value) {
        animation.value.o3d.position.y = isFlying.value ? bob : 0
        animation.value.o3d.rotation.z = isFlying.value ? pitch : 0
      }

      // Animate the lights
      if (i % 200 === 0) {
        lightGreen.value.material.opacity = 1
        lightGreenLight.value.light.visible = true

        lightRed.value.material.opacity = 1
        lightRedLight.value.light.visible = true
      } else if (i % 200 === 10) {
        lightGreen.value.material.opacity = 0.5
        lightGreenLight.value.light.visible = false

        lightRed.value.material.opacity = 0.5
        lightRedLight.value.light.visible = false
      }

      i++
    }
  }

  // rendererRef.value?.onBeforeRender(animate)
})

onBeforeUnmount(() => {
  rendererRef.value?.offBeforeRender(animate)
})
</script>
