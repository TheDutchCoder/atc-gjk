<template>
  <div class="what">
    <div v-if="state.matches('loading')" class="fixed top-1/2 left-1/2 bg-red-500">loading</div>

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
        <!-- <div class="text-center text-sky-700 bg-white rounded-lg p-10 shadow-xl bg-opacity-90"> -->
          <!-- <h1 class="font-bold font-callout text-6xl">Air Traffic Control</h1> -->

          <button
            class="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 px-10 py-3 text-white font-bold m-auto shadow-lg"
            @click="send({ type: 'START' })"
          >Start new game</button>
        <!-- </div> -->
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

    <!-- <div
      class="fixed top-1/2 left-1/2 text-white font-bold font-callout text-6xl transform -translate-x-1/2 -translate-y-1/2"
    >
      <span clas="text-shadow">Air Traffic Control</span>
    </div>

    <div
      class="fixed top-2 right-2 rounded-md bg-white bg-opacity-90 overflow-hidden shadow-lg text-center"
    >
      <div class="w-32 aspect-square flex justify-center items-center">
        <div
          class="w-24 h-24 border-2 border-sky-800 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
          @click="nextCycle"
          :style="tickStyle"
        ></div>
      </div>
      <div class="text-sky-500 text-sm py-2 border-t">{{ time }}</div>
    </div>

    <div
      class="fixed top-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-md overflow-hidden shadow-lg px-4 py-2"
    >
      <div>
        <span class="font-bold mr-1">Score:</span>
        <span class="font-bold text-sky-500">1200</span>
      </div>
    </div>-->

    <!-- <div class="tick" :style="tickStyle" @click="nextCycle"></div>
    <button class="left" @click="rotateLeft" :disabled="!selectedPlane">L</button>
    <button class="right" @click="rotateRight" :disabled="!selectedPlane">R</button>
    <div class="alt">
      {{ selectedPlane }}
      <button
        :disabled="!selectedPlane"
        @click="setAltitude((10 - n))"
        v-for="n in 10"
        :key="n"
        :class="selectedPlane && selectedPlane.currentAltitude === (10 - n) ? 'active' : selectedPlane && selectedPlane.finalAltitude === (10 - n) ? 'nextActive' : ''"
      >{{ 10 - n }}</button>
    </div>-->

    <!-- <button
      class="w-10 h-10 rounded-full bg-white fixed bottom-2 right-2 shadow-lg flex justify-center items-center text-sky-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    </button>-->

    <!-- <div class="fixed bottom-2 right-2 bg-white rounded overflow-hidden">
      <h2 class="text-center font-bold text-sm py-2 border-b">Flight Schedule</h2>
      <table class="w-full">
        <thead class="text-xs border-b">
          <tr>
            <th class="px-2 py-1">Origin</th>
            <th class="px-2 py-1 border-l">Flight Number</th>
            <th class="px-2 py-1 border-l">Destination</th>
          </tr>
        </thead>
        <tbody class="text-center text-xs">
          <tr>
            <td class="px-2 py-1">12:00</td>
            <td class="px-2 py-1">GJK-001</td>
            <td class="px-2 py-1">AF1</td>
          </tr>
        </tbody>
      </table>
    </div>-->

    <!-- <ul class="planes bg-white rounded shadow-lg overflow-scroll max-h-32">
      <li class="px-4 py-2 text-xs font-bold text-center border-b">Flight Schedule</li>
      <li class="px-4 py-2 text-xs text-center border-b">
        <div>Dep</div>
        <div>Num</div>
        <div>Dest</div>
      </li>
      <li
        @click="selectPlane(null)"
        class="px-4 py-2 text-xs cursor-pointer hover:bg-gray-200 transition-colors"
      >None</li>
      <li
        v-for="(plane, index) in planes"
        :key="plane.id"
        @click="selectPlane(plane.id)"
        :class="selectedPlane && selectedPlane.id === plane.id ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : index % 2 === 0 ? 'bg-gray-100' : ''"
        class="px-4 py-2 text-xs cursor-pointer hover:bg-gray-200 transition-colors"
      >12:00 - {{ plane.name }} - {{ plane.destination }}</li>
    </ul>-->
    <Renderer
      ref="rendererRef"
      antialias
      :orbit-ctrl="{ enableDamping: true, enablePan: false, minDistance: state.matches('idle') ? 10 : 20, maxDistance: state.matches('idle') ? 50 : 100 }"
      resize="window"
      shadow
      alpha
    >
      <Camera
        ref="cameraRef"
        :position="state.matches('idle') ? { x: 10, y: 6, z: 10 } : { x: 50, y: 50, z: 50 }"
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
        <Board v-if="state.matches('start')"></Board>

        <!-- <Box :width="110" :height="4" :depth="110" :position="{ x: 0, y: -3.3, z: 0 }">
          <LambertMaterial color="#ad817a"></LambertMaterial>
        </Box>-->

        <!-- Game Board -->
        <!-- <template v-for="(y, indexY) in z">
          <template v-for="(x, indexX) in y">
            <ForestTile
              v-if="x.type === GRASS_TILE"
              :position="{ x: indexX - 5, y: indexY - 5 }"
              :dark="(indexY % 2 == 0 && indexX % 2 == 1) || indexY % 2 == 1 && indexX % 2 == 0"
              :offsets="matrix[(indexY * 11) + indexX]"
            ></ForestTile>
            <FarmTile
              v-if="x.type === FARM_TILE"
              :position="{ x: indexX - 5, y: indexY - 5 }"
              :dark="(indexY % 2 == 0 && indexX % 2 == 1) || indexY % 2 == 1 && indexX % 2 == 0"
              :offsets="matrix[(indexY * 11) + indexX]"
            ></FarmTile>
            <TrainTracksTile
              v-if="x.type === TRAIN_TILE"
              :position="{ x: indexX - 5, y: indexY - 5 }"
              :dark="(indexY % 2 == 0 && indexX % 2 == 1) || indexY % 2 == 1 && indexX % 2 == 0"
              :offsets="matrix[(indexY * 11) + indexX]"
              :direction="1"
            ></TrainTracksTile>
            <AirportTile
              v-if="x.type === AIRPORT_TILE"
              :position="{ x: indexX - 5, y: indexY - 5 }"
              :direction="x.direction"
              :offsets="matrix[(indexY * 11) + indexX]"
            ></AirportTile>
          </template>
        </template>-->
        <!-- <Group v-if="state.matches('idle')">
          <ForestTile></ForestTile>
          <Airplane
            :selected="selectedPlaneId === 0"
            @select="selectPlane(0)"
            :position="{ x: 0, y: 0 }"
            :altitude="1"
            :direction="2"
          ></Airplane>
        </Group>-->
        <!-- <AirportTile></AirportTile> -->

        <!-- <Airplane
          v-for="plane in planes"
          :key="plane.id"
          @select="selectPlane(plane.id)"
          :selected="plane.id === selectedPlaneId"
          :position="{ x: plane.x, y: plane.y }"
          :altitude="plane.currentAltitude"
          :direction="plane.currentDirection"
        ></Airplane>

        <Clouds
          v-for="cloudPosition in cloudPositions"
          :position="{ x: cloudPosition.x, y: cloudPosition.y }"
          :altitude="cloudPosition.z"
        ></Clouds>-->

        <!-- <ForestTile :position="{ x: 0, y: 0 }"></ForestTile> -->
        <!-- <Airplane
          :selected="selectedPlaneId === 0"
          @select="selectPlane(0)"
          :position="{ x: 0, y: 0 }"
          :altitude="1"
          :direction="2"
        ></Airplane>-->
      </Scene>
      <!-- <EffectComposer>
        <RenderPass></RenderPass>
        <TiltShiftPass :start="{ x: 0, y: 0 }" :end="{ x: 500, y: 500 }" :blur-radius="3" :gradient-radius="200"></TiltShiftPass>
      </EffectComposer>-->
    </Renderer>

    <!-- <button class="debug" @click="DEBUG = !DEBUG">Debug</button> -->
    <div class="debug">
      <button @click="DEBUG = !DEBUG">Debug</button>
      <button @click="fly = Math.abs(fly - 1)">Fly</button>
      <button @click="tick++">Tick</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue'
import { Box, Cone, Camera, AmbientLight, DirectionalLight, Group, ToonMaterial, LambertMaterial, SpotLight, PointLight, HemisphereLight, Renderer, Scene, EffectComposer, TiltShiftPass, RenderPass, InstancedMesh, } from 'troisjs'
import { AxesHelper, PCFSoftShadowMap, HemisphereLightHelper, DirectionalLightHelper, Object3D, Color, CameraHelper, Quaternion, Vector3 } from 'three'

import { useMachine } from '@xstate/vue'
import { machine } from '#/machines/main'

import useRenderer from '#composables/use-renderer'
import useScene from '#composables/use-scene'
import useCamera from '#composables/use-camera'

import { randomNumber, randomRoundNumber, lerpColor } from '#/tools'

import { DEBUG } from './utils'
// import { sceneC } from './scene'

// Set the Z axis to be up/down, instead of the Y axis, so it'll be easier to
// position element with just x/y coordinates
// Object3D.DefaultUp.set(0, 0, 1)

import GrassTile from '#tiles/grass.vue'
import ForestTile from '#tiles/forest.vue'
import TrainTracksTile from '#tiles/train-tracks.vue'
import AirportTile from '#tiles/airport'
import FarmTile from '#tiles/farm.vue'
import WaterTile from '#tiles/water.vue'
// import Rock from '#components/rock.vue'
// import SomethingTile from '#tiles/something.vue'

import Airplane from '#components/airplane.vue'
import Airfield from '#components/airfield.vue'
// import Tree from '#components/tree.vue'
import Clouds from '#components/clouds.vue'
// import Test from '#components/test.vue'
// import Tile from '#components/tile.vue'
import { displayTime, setPoint } from './tools'

import Intro from '#components/intro.vue'
import Board from '#components/board.vue'

const { sceneRef, scene } = useScene()
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
    if (newState.matches('start')) {
      pivot2.rotation.y = 0
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

// const z = [
//   [GRASS_TILE, GRASS_TILE, GRASS_TILE, GRASS_TILE, GRASS_TILE],
//   [GRASS_TILE, GRASS_TILE, GRASS_TILE, GRASS_TILE, GRASS_TILE],
//   [GRASS_TILE, GRASS_TILE, GRASS_TILE, GRASS_TILE, GRASS_TILE],
//   [GRASS_TILE, GRASS_TILE, GRASS_TILE, GRASS_TILE, GRASS_TILE],
//   [GRASS_TILE, GRASS_TILE, GRASS_TILE, GRASS_TILE, GRASS_TILE],
// ]

const GT = () => ({
  type: GRASS_TILE,
})

const FT = () => ({
  type: FARM_TILE,
})

const TT = () => ({
  type: TRAIN_TILE,
})

const AT = () => ({
  id: 'AF1',
  type: AIRPORT_TILE,
  x: 0,
  y: 0,
  direction: 0,
})

const z = [
  [GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT()],
  [TT(), TT(), TT(), TT(), TT(), TT(), TT(), TT(), TT(), TT(), TT()],
  [GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT()],
  [GT(), GT(), FT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT()],
  [GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT()],
  [GT(), GT(), GT(), GT(), GT(), AT(), GT(), GT(), GT(), GT(), GT()],
  [GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT()],
  [GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT()],
  [GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT()],
  [GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT()],
  [GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT(), GT()],
]


// let tiles = 0

// // Farms
// while (tiles < 4) {
//   const x = randomRoundNumber(0, 10)
//   const y = randomRoundNumber(0, 10)

//   if (z[y][x] === GRASS_TILE) {
//     z[y][x] = FARM_TILE
//   }

//   tiles++
// }

const q = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]

const generateTiles = (airports = 2) => {
  const tiles = Array.from(Array(100)).map(() => TILE)
  const a = []

  for (let i = 0; i < airports; i++) {
    a.push(Math.floor(Math.random() * 100))
  }

  a.forEach(i => tiles[i] = AIRPORT)

  return tiles
}

console.log(z)

const hemiLight = ref()
const dirLight = ref()

const fly = ref(0)

const dirMat = [
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
]

const airField = {
  id: 'AF1',
  type: 'AF',
  position: {
    x: 2,
    y: 3,
  },
  direction: 3,
}

const dest = {
  id: 'NW4',
  type: 'CO',
  position: {
    x: -6,
    y: -6,
  },
  altitude: 4,
}

/**
 * Destinations are a list of ID's referencing the object (like an Airfield, or
 * coordinate/altitude combo).
 */
const destinations = []

const planeStatuses = {
  FLYING: 'FLYING',
  LANDED: 'LANDED',
  CRASHED: 'CRASHED',
  EXITED: 'EXITED',
  GHOST: 'GHOST',
}

const planes = ref([
  { id: 'AP1', name: 'GJK-001', x: 0, y: 6, currentAltitude: 5, finalAltitude: 5, currentDirection: 0, directionModifier: 0, destination: 'AF1', status: planeStatuses.FLYING },
  { id: 'AP2', name: 'GJK-002', x: 6, y: 0, currentAltitude: 6, finalAltitude: 6, currentDirection: 6, directionModifier: 0, destination: 'AF1', status: planeStatuses.FLYING },
])

const imesh = ref()
const tick = ref(42) // 4am
const cycle = ref(0)

const quat = new Quaternion()
const axis = new Vector3(0, 1, 0).normalize()
const sunAngle = 0.1
quat.setFromAxisAngle(axis, sunAngle)

const getNewDirection = (currentDirection, modifier) => {
  if (modifier === 0) {
    return currentDirection
  }

  let newDirection = currentDirection + (modifier < 0 ? 1 : -1)
  console.log(newDirection % 8)

  return newDirection < 0 ? 7 : newDirection % 8
}

const getNewAltitude = (currentAltitude, finalAltitude) => {
  if (currentAltitude === finalAltitude) {
    return currentAltitude
  }

  return currentAltitude + (currentAltitude > finalAltitude ? -1 : 1)
}

const movePlanes = () => {
  planes.value = planes.value.map(plane => ({
    ...plane,
    x: plane.x + dirMat[plane.currentDirection].x,
    y: plane.y + dirMat[plane.currentDirection].y,
    currentDirection: getNewDirection(plane.currentDirection, plane.directionModifier),
    directionModifier: plane.directionModifier === 0 ? 0 : plane.directionModifier < 0 ? plane.directionModifier + 1 : plane.directionModifier - 1,
    currentAltitude: getNewAltitude(plane.currentAltitude, plane.finalAltitude),
  })).filter(plane => Math.abs(plane.x) <= 6 && Math.abs(plane.y) <= 6)
}

const cleanPlanes = () => {
  planes.value = planes.value.filter(plane => plane.status === planeStatuses.FLYING)
}

const scorePlanes = () => {
  planes.value.forEach(plane => {
    /**
     * Landing on an airfield requires:
     * plane 0 altitude
     * plane on (correct) tile
     * plane in correct direction
     */
    const af = z.flat().find(tile => tile.id === plane.destination)
    const { x: afX, y: afY, direction: afD } = af
    const { x: apX, y: apY, currentDirection: apD, currentAltitude: apA } = plane

    // Plane is on the ground.
    if (apA === 0) {
      // On the correct airfield tile
      if (apX === afX && apY === afY) {
        // With the correct direction
        if (apD === afD) {
          plane.status = planeStatuses.LANDED
          score.value += 100
        } else {
          plane.status = planeStatuses.CRASHED
          score.value -= 100
        }
      } else {
        plane.status = planeStatuses.CRASHED
        score.value -= 100
      }
    }
  })
}

let shouldShadowsUpdate = false

let moving = false

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

      cleanPlanes()
      movePlanes()
      scorePlanes()
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
  dirLight.value.light.shadow.camera.top = 90
  dirLight.value.light.shadow.camera.bottom = -120
  dirLight.value.light.shadow.camera.left = -90
  dirLight.value.light.shadow.camera.right = 90

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

    if (state.value.matches('idle')) {
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
  //   if (i % 60 === 0) {
  //     planes.value = planes.value.map(plane => ({ ...plane, x: plane.x + dirMat[plane.currentDirection].x, y: plane.y + dirMat[plane.currentDirection].y })).filter(plane => Math.abs(plane.x) < 5 && Math.abs(plane.y) < 5)
  //   }

  //   i++
  // })

  // Test
  // console.log(iTiles.value)

  // const iTiles1 = iTiles.value.mesh;
  // const iTiles21 = iTiles2.value.mesh;

  // const dummy = new Object3D();

  // let x = -5
  // let y = -5
  // for (let i = 0; i < 121; i++) {
  // const point1 = randomNumber(-0.01, 0.01)
  // const point2 = randomNumber(-0.01, 0.01)
  // const point3 = randomNumber(-0.01, 0.01)
  // const point4 = randomNumber(-0.01, 0.01)

  // if (i % 2 === 0) {
  // dummy.position.set(x * 10, -0.4, y * 10);
  // dummy.receiveShadow = true
  // dummy.updateMatrix();
  // console.log(dummy)
  // iTiles1.setMatrixAt(i, dummy.matrix);
  // iTiles1.setColorAt(i, i % 2 === 0 ? new Color( '#a8cf86' ) : new Color( '#b6dd94' ));
  // } else {
  //   // console.log(point1)
  //   // setPoint(0, iTiles2, null, point1)
  //   // setPoint(1, iTiles2, null, point2)
  //   // setPoint(4, iTiles2, null, point3)
  //   // setPoint(5, iTiles2, null, point4)
  //   console.log(iTiles21)
  //   dummy.position.set(x * 10, -0.4, y * 10);
  //   // dummy.setMatrixAt(0, [1, 1, 1, 1])
  //   dummy.matrix.setPosition({ x: 1, y: 2, z: 3 })
  //   dummy.updateMatrix();
  //   iTiles21.setMatrixAt(i, dummy.matrix);
  // }

  // x++

  // if (x > 5) {
  //   x = -5
  //   y++
  // }
  // }

  // iTiles21.setColorAt(1, new Color( 0xff0000 ))

  // iTiles1.instanceMatrix.needsUpdate = true;
  // iTiles21.instanceMatrix.needsUpdate = true;
  // iTiles21.instanceColor.needsUpdate = true;

  // console.log("Scene polycount:", rendererRef.value.renderer.info.render.triangles)
  // console.log("Active Drawcalls:", rendererRef.value.renderer.info.render.calls)
  // console.log("Textures in Memory", rendererRef.value.renderer.info.memory.textures)
  // console.log("Geometries in Memory", rendererRef.value.renderer.info.memory.geometries)


})

onBeforeUnmount(() => {
  rendererRef.value.offBeforeRender(beforeRenderMethod)
  rendererRef.value.offAfterRender(afterRenderMethod)
})

import Stats from 'stats.js'

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

watch(
  planes,
  (newPlanes) => {
    console.log({ newPlanes })
  }
)

const rotateLeft = () => {
  planes.value = planes.value.map(plane => ({
    ...plane,
    directionModifier: plane.directionModifier + 1
  }))
}

const rotateRight = () => {
  planes.value = planes.value.map(plane => ({
    ...plane,
    directionModifier: plane.directionModifier - 1
  }))
}

const setAltitude = (newAltitude) => {
  planes.value = planes.value.map(plane => ({
    ...plane,
    finalAltitude: newAltitude
  }))
}

const nextCycle = () => {
  tick.value += 4 - (tick.value % 4)
}

// const selectedPlane = ref(null)
const selectedPlaneId = ref(null)

const selectedPlane = computed(() => planes.value.find(plane => plane.id === selectedPlaneId.value))

const selectPlane = (id) => {
  selectedPlaneId.value = id

  // console.log(cameraRef.value)

  // Focus camera
  // cameraRef.value.camera.target.position.copy({ x: 5, y: 0, z: 5 })
}

const tickStyle = computed(() => ({
  'background-image': `conic-gradient(#14b8a6 0deg, #0284c7 ${tick.value % 4 * 90}deg, transparent ${tick.value % 4 * 90}deg 360deg)`
}))

const bg = computed(() => {
  let hex1, hex2, hex3, hex4
  if ((tick.value % 96) >= 0 && (tick.value % 96) < 24) {
    // midnight => 6am
    hex1 = '#000000'
    hex2 = '#e14c9d'
    hex3 = '#2e6791'
    hex4 = '#4e8fbf'
  } else if ((tick.value % 96) >= 24 && (tick.value % 96) < 48) {
    // 6am => noon
    hex1 = '#e14c9d'
    hex2 = '#ffffff'
    hex3 = '#4e8fbf'
    hex4 = '#9bc8e9'
  } else if ((tick.value % 96) >= 48 && (tick.value % 96) < 72) {
    // noon => 6pm
    hex1 = '#ffffff'
    hex2 = '#e14c9d'
    hex3 = '#9bc8e9'
    hex4 = '#4e8fbf'
  } else if ((tick.value % 96) >= 72 && (tick.value % 96) < 96) {
    // 6pm => midnight
    hex1 = '#e14c9d'
    hex2 = '#000000'
    hex3 = '#4e8fbf'
    hex4 = '#2e6791'
  }

  return `radial-gradient(${lerpColor(hex1, hex2, (tick.value % 24) / 24)}, ${lerpColor(hex3, hex4, (tick.value % 24) / 24)})`
})


/**
 * Planes need to be checked every cycle to see if they've either:
 * 1. Landed at the correct airfield
 * 2. Collided with the floow
 * 3. Collided with another plane
 * 4. Collided with another object
 * 5. Exited at the right direction/altitude
 */
// watch(
//   cycle,
//   (newCycle) => {

//   }
// )

/**
 * Grid lookup matrix
 *
 * 0, 1, 2 => 4 rands
 * 0, 1, 2, 3, 4 => n + 1 rands: [0, 1, 1, 2, 2, 3] * 2
 * 0, 1, 2, 3, 4 => n + 1 rands: [4, 5, 5, 6, 6, 7]
 *
 * +---+---+---+
 * |   |   |   |
 * +---+---+---+
 *
 * -1, 1, 1, 0, 0, 1
 *
 * :offsets="matrix[(indexY * 10) + indexX]"
 */
const t = 11 // (+1 = 12 nums per line (square = 12 lines))
const v = 4
const lines = t + 1

const rands = []
const matrix = []

/**
 * Generate random height offsets by line.
 */
for (let y = 0; y < lines; y++) {
  rands.push([])

  for (let x = 0; x < lines; x++) {
    const r = randomNumber(-0.75, 0)

    rands[y].push(r)

    if (x > 0 && x < (lines - 1)) {
      rands[y].push(r)
    }
  }
}

// console.log(rands)

/**
 * Generate the actual offsets per corner for each tile.
 */
for (let y = 0; y < t; y++) {
  for (let x = 0; x < t; x++) {
    // matrix.push([rands[y][(x * 2)], rands[y][(x * 2) + 1], rands[y + 1][(x * 2) + 1], rands[y + 1][(x * 2)]])
  }
}

// console.log(matrix)

// const r1 = randomNumber(-1, 1)
// const r2 = randomNumber(-1, 1)
// const r3 = randomNumber(-1, 1)
// const r4 = randomNumber(-1, 1)
// const r5 = randomNumber(-1, 1)
// const r6 = randomNumber(-1, 1)
// const r7 = randomNumber(-1, 1)
// const r8 = randomNumber(-1, 1)
// const r9 = randomNumber(-1, 1)
// const r10 = randomNumber(-1, 1)
// const r11 = randomNumber(-1, 1)
// const r12 = randomNumber(-1, 1)
// const r13 = randomNumber(-1, 1)
// const r14 = randomNumber(-1, 1)
// const r15 = randomNumber(-1, 1)
// const r16 = randomNumber(-1, 1)

// const ar1 = [r1, r2, r2, r3, r3, r4]
// const ar2 = [r5, r6, r6, r7, r7, r8]
// const ar3 = [r9, r10, r10, r11, r11, r12]
// const ar4 = [r13, r14, r14, r15, r15, r16]

// const a = [
//   [ar1[0], ar1[1], ar2[0], ar2[1]], // rands[y][x]
//   [ar1[2], ar1[3], ar2[2], ar2[3]],
//   [ar1[4], ar1[5], ar2[4], ar2[5]],
//   [ar2[0], ar2[1], ar3[0], ar3[1]],
//   [ar2[2], ar2[3], ar3[2], ar3[3]],
//   [ar2[4], ar2[5], ar3[4], ar3[5]],
//   [ar3[0], ar3[1], ar4[0], ar4[1]],
//   [ar3[2], ar3[3], ar4[2], ar4[3]],
//   [ar3[4], ar3[5], ar4[4], ar4[5]],
// ]

// console.log(a)
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
