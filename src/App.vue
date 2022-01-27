<template>
  <div class="what">
    <div v-if="state.matches('loading')" class="fixed top-1/2 left-1/2 bg-red-500">loading</div>

    <button
      class="fixed top-1 right-1 rounded-md bg-gradient-to-br from-violet-500 to-purple-500 px-10 py-3 text-white font-bold m-auto shadow-lg"
      @click="toggleDebugging"
    >Debug</button>

    <button
      class="fixed top-1 right-36 rounded-md bg-gradient-to-br from-violet-500 to-purple-500 px-10 py-3 text-white font-bold m-auto shadow-lg"
      @click="state.matches('idle') ? send('EDIT') : send('IDLE')"
    >Edit</button>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        class="fixed bottom-20 left-1/2 transform -translate-x-1/2"
        v-if="state.matches('idle')"
      >
        <button
          class="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 px-10 py-3 text-white font-bold m-auto shadow-lg"
          @click="send({ type: 'START' })"
        >Start new game</button>
      </div>
    </transition>

    <button v-if="state.matches('start')" class="fixed bottom-1 left-1 rounded-md bg-gradient-to-r from-red-500 to-orange-500 px-10 py-3 text-white font-bold m-auto mt-8" @click="showQuitDialog">Quit</button>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-4 items-center"
        v-if="state.matches('start') && quitDialog"
      >
        <div class="text-center text-red-700 bg-white rounded-lg p-10 shadow-xl bg-opacity-90">
          <h1 class="font-bold font-callout text-2xl">Are you sure you want to quit?</h1>
          <p>Your game will not be saved and you will lose all points.</p>

          <div class="space-x-2">
          <button
            class="rounded-md bg-gradient-to-r from-red-500 to-orange-500 px-10 py-3 text-white font-bold m-auto mt-8"
            @click="quitGame"
          >Quit the game</button>
          <button
            class="rounded-md bg-gradient-to-r from-green-500 to-lime-500 px-10 py-3 text-white font-bold m-auto mt-8"
            @click="hideQuitDialog"
          >Keep playing</button>
          </div>
        </div>
      </div>
    </transition>

    <Renderer
      ref="rendererRef"
      antialias
      :orbit-ctrl="{ enableDamping: true, enablePan: false, enableZoom: false }"
      resize="window"
      shadow
      alpha
    >
      <Camera
        ref="cameraRef"
        :position="{ x: 15, y: 9, z: 15 }"
      />
      <Scene ref="sceneRef">
        <HemisphereLight
          ref="hemiLight"
          color="#ffffff"
          groundColor="#080802"
          :intensity="0.7"
          :position="{ x: 15, y: 25, z: 15 }"
        />
        <DirectionalLight
          ref="dirLight"
          color="#ffffff"
          :intensity="0.3"
          cast-shadow
          :shadowMapSize="{ width: 2048, height: 2048 }"
        />
        <DirectionalLight
          ref="dirLight2"
          color="#b0e1ed"
          :intensity="0.2"
          :position="{ x: -20, y: 25, z: -20 }"
        />

        <Intro v-if="state.matches('idle')"></Intro>
        <Editor v-if="state.matches('edit')"></Editor>
        <Board v-if="state.matches('start')"></Board>
      </Scene>
    </Renderer>

    <div class="debug">
      <button @click="DEBUG = !DEBUG">Debug</button>
      <button @click="fly = Math.abs(fly - 1)">Fly</button>
      <button @click="tick++">Tick</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue'
import { Camera, DirectionalLight, HemisphereLight, Renderer, Scene } from 'troisjs'
import { AxesHelper, HemisphereLightHelper, DirectionalLightHelper, Object3D, Color, Quaternion, Vector3, PCFSoftShadowMap } from 'three'

import { useMachine } from '@xstate/vue'
import { machine } from '#/machines/main'

import useDebugger from '#composables/use-debugger'
import useRenderer from '#composables/use-renderer'
import useScene from '#composables/use-scene'
import useCamera from '#composables/use-camera'

import { randomNumber, randomRoundNumber, lerpColor } from '#tools'

import { DEBUG } from './utils'

import Intro from '#components/intro.vue'
import Editor from '#components/editor.vue'
import Board from '#components/board.vue'

const { debugging, toggleDebugging } = useDebugger()
const { sceneRef } = useScene()
const { cameraRef, camera } = useCamera()
const { rendererRef, renderer } = useRenderer()

const { state, send, service } = useMachine(machine)

const quitDialog = ref(false)
const showQuitDialog = () => quitDialog.value = true
const hideQuitDialog = () => quitDialog.value = false
const quitGame = () => {
  hideQuitDialog()
  service.children.get('gameMachine').send('STOP')
}

/**
 * States
 */

onMounted(() => {
  send({ type: 'IDLE' })
})

watch(
  state,
  (newState) => {
    // Update shadows when switching between game modes.
    shouldShadowsUpdate = true

    if (newState.matches('idle')) {
      dirLight.value.light.shadow.camera.top = 90
      dirLight.value.light.shadow.camera.bottom = -120
      dirLight.value.light.shadow.camera.left = -90
      dirLight.value.light.shadow.camera.right = 90
    } else {
      dirLight.value.light.shadow.camera.top = 5
      dirLight.value.light.shadow.camera.bottom = -5
      dirLight.value.light.shadow.camera.left = -5
      dirLight.value.light.shadow.camera.right = 5
    }

    if (newState.matches('start')) {
      pivot2.rotation.y = 0
    }

    // When entering edit mode, we enable certain orbit controls (like zooming)
    // and reset them when we exit this mode.
    if (newState.matches('edit')) {
      rendererRef.value.three.cameraCtrl.enableZoom = true
      rendererRef.value.three.cameraCtrl.enablePan = true
      rendererRef.value.three.cameraCtrl.reset()
    } else if (newState.matches('start')) {
      rendererRef.value.three.cameraCtrl.enableZoom = true
      rendererRef.value.three.cameraCtrl.reset()
      // console.log(cameraRef.value.camera)
      cameraRef.value.camera.position.set(100, 80, 100)
    } else {
      rendererRef.value.three.cameraCtrl.enableZoom = false
      rendererRef.value.three.cameraCtrl.enablePan = false
      rendererRef.value.three.cameraCtrl.reset()
    }
  }
)


const GRASS_TILE = 'GrassTile'
const FARM_TILE = 'FarmTile'
const TRAIN_TILE = 'TrainTracksTile'
const AIRPORT_TILE = 'AirportTile'

const MIN_CLOUDS = 2
const MAX_CLOUDS = 4
const MIN_AIRFIELDS = 2
const MAX_AIRFIELDS = 4

const numberOfClouds = randomNumber(MIN_CLOUDS, MAX_CLOUDS)
const numberOfAirfields = randomNumber(MIN_AIRFIELDS, MAX_AIRFIELDS)

const time = computed(() => {
  const h = Math.floor((tick.value % 96) / 4)
  const q = (tick.value % 4) * 15

  return `${h.toString().padStart(2, '0')}:${q.toString().padStart(2, '0')}`
})

const cloudPositions = []
while (cloudPositions.length < numberOfClouds) {
  const r = {
    x: randomRoundNumber(-5, 5),
    y: randomRoundNumber(-5, 5),
    z: randomRoundNumber(5, 7),
  }

  if (!cloudPositions.find(i => i.x === r.x && i.y === r.y)) {
    cloudPositions.push(r)
  }
}

const airfieldPositions = []
while (airfieldPositions.length < numberOfAirfields) {
  const r = {
    x: randomRoundNumber(-4, 4),
    y: randomRoundNumber(-4, 4),
    direction: randomRoundNumber(0, 7),
  }

  if (!airfieldPositions.find(i => i.x === r.x && i.y === r.y)) {
    airfieldPositions.push(r)
  }
}


const score = ref(0)
const hemiLight = ref()
const dirLight = ref()

const fly = ref(0)
const tick = ref(42) // 4am
const cycle = ref(0)

let shouldShadowsUpdate = false

watch(
  tick,
  (newTick) => {
    shouldShadowsUpdate = true

    console.log("Scene polycount:", rendererRef.value.renderer.info.render.triangles)
    console.log("Active Drawcalls:", rendererRef.value.renderer.info.render.calls)
    console.log("Textures in Memory", rendererRef.value.renderer.info.memory.textures)
    console.log("Geometries in Memory", rendererRef.value.renderer.info.memory.geometries)

    if (newTick % 4 === 0) {
      cycle.value++

      // cleanPlanes()
      // movePlanes()
      // scorePlanes()
    }

    // Move the sun.
    pivot.rotation.y = ((-newTick / 96) * Math.PI * 2) + (Math.PI / 2)

    // Interpolate the sun's color.
    // Between 6pm and midnight: pink to dark pink
    // Between mindnight and 6am: dark pink to pink
    // Between 6am and noon: pink to white
    // Between noon and 6pm: white to pink
    let hex1, hex2, i
    if ((newTick % 96) >= 0 && (newTick % 96) < 24) {
      // midnight => 6am
      hex1 = '#8d1953'
      hex2 = '#d95f70'
    } else if ((newTick % 96) >= 24 && (newTick % 96) < 48) {
      // 6am => noon
      hex1 = '#d95f70'
      hex2 = '#f7f4db'
    } else if ((newTick % 96) >= 48 && (newTick % 96) < 72) {
      // noon => 6pm
      hex1 = '#f7f4db'
      hex2 = '#d95f70'
    } else if ((newTick % 96) >= 72 && (newTick % 96) < 96) {
      // 6pm => midnight
      hex1 = '#d95f70'
      hex2 = '#8d1953'
    }

    dirLight.value.light.color = new Color(lerpColor(hex1, hex2, (newTick % 24) / 24))

    // The intensity of the sun increases during the day and decreases during the night.
    dirLight.value.light.intensity = 0.2 + Math.sin((((newTick % 96) / 96) * Math.PI * 2) - Math.PI / 2) / 10
  }
)
// const iTiles = ref()
// const iTiles2 = ref()

const pivot = new Object3D()
const pivot2 = new Object3D()


let beforeRenderMethod
let afterRenderMethod


onMounted(() => {
  const axeshelper = new AxesHelper(5)
  sceneRef.value.add(axeshelper)

  const hemiLightHelper = new HemisphereLightHelper(hemiLight.value.light)
  sceneRef.value.add(hemiLightHelper)

  const dirLightHelper = new DirectionalLightHelper(dirLight.value.light)
  sceneRef.value.add(dirLightHelper)

  console.log(dirLight.value)
  // dirLight.value.light.shadow.radius = 10

  console.log(dirLight.value)
  // dirLight.value.light.shadow.camera.top = 90
  // dirLight.value.light.shadow.camera.bottom = -120
  // dirLight.value.light.shadow.camera.left = -90
  // dirLight.value.light.shadow.camera.right = 90

  sceneRef.value.scene.add(pivot)
  pivot.add(dirLight.value.light)
  pivot.rotation.x = Math.PI / -3
  // pivot.rotation.y = (Math.PI / 2) + (((nextTick % 96) / 96) * Math.PI * 2) // move depending on start time (nectTick) this is currently midnight
  pivot.rotation.y = ((-tick.value / 96) * Math.PI * 2) + (Math.PI / 2)

  dirLight.value.light.position.x = 60
  // dirLight.value.light.position.z = 50
  dirLight.value.light.lookAt(0, 0, 0)

  // pivot.rotation.y = 0.1
  // pivot.rotation.x = Math.PI / -4
  // pivot.rotation.z = Math.PI / -2

  // const cameraHelper = new CameraHelper(cameraRef.value.camera)
  // sceneRef.value.add(cameraHelper)

  // Dir light test
  dirLight.value.light.shadow.near = 0.5
  dirLight.value.light.shadow.far = 500

  let i = 0

  // rendererRef.value.renderer.shadowMap.type = PCFSoftShadowMap
  rendererRef.value.renderer.shadowMap.autoUpdate = false

  console.log(cameraRef.value.camera)

  sceneRef.value.scene.add(pivot2)
  pivot2.add(cameraRef.value.camera)
  shouldShadowsUpdate = true
  // pivot.rotation.x = Math.PI / -3
  // pivot.rotation.y = (Math.PI / 2) + (((nextTick % 96) / 96) * Math.PI * 2) // move depending on start time (nectTick) this is currently midnight
  // pivot.rotation.y += i/100


  beforeRenderMethod = () => {
    stats.begin()
    rendererRef.value.renderer.shadowMap.needsUpdate = shouldShadowsUpdate

    if (state.value.matches('idle') && !debugging.value) {
      pivot2.rotation.y = i / 300
    }

    i++
  }

  afterRenderMethod = () => {
    stats.end()
    shouldShadowsUpdate = false
  }

  rendererRef.value.onBeforeRender(beforeRenderMethod)
  rendererRef.value.onAfterRender(afterRenderMethod)
})

onBeforeUnmount(() => {
  rendererRef.value.offBeforeRender(beforeRenderMethod)
  rendererRef.value.offAfterRender(afterRenderMethod)
})

import Stats from 'stats.js'

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
</script>

<style>
body {
  margin: 0;
}
canvas {
  display: block;
}

.debug {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
}

.what {
  width: 100%;
  height: 100%;
  background: radial-gradient(#ffffff, #9bc8e9);
}
</style>
