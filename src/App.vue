<template>
  <div
    id="three"
  />

  <div class="">
    <transition
      enter-active-class="transition duration-500 ease-[cubic-bezier(.75,-0.4,.25,1.4)]"
      enter-from-class="scale-50 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="state.matches('introIdle')"
        class="absolute top-32 left-1/2 transform -translate-x-1/2"
      >
        <h1 class="font-callout text-6xl stage">
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <div class="layer" />
          <span class="opacity-0">Air Traffic Control</span>
        </h1>
      </div>
    </transition>

    <!-- Intro UI -->
    <!-- <transition-group
      enter-active-class="transition duration-500 ease-[cubic-bezier(.75,-0.4,.25,1.4)]"
      enter-from-class="scale-50 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    > -->
    <transition
      enter-active-class="transition duration-500 ease-[cubic-bezier(.75,-0.4,.25,1.4)]"
      enter-from-class="scale-50 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="state.matches('introIdle')"
        class="fixed bottom-1/4 left-1/2 transform -translate-x-1/2"
      >
        <ActionButton
          size="lg"
          @click="send('INTRO_OUT')"
        >
          Play
        </ActionButton>
      </div>
    </transition>

    <!-- <transition
      enter-active-class="transition duration-500 ease-[cubic-bezier(.75,-0.4,.25,1.4)]"
      enter-from-class="scale-50 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="state.matches('introIdle')"
        class="fixed top-3 right-2"
      >
        <ActionButton
          @click="gameSend('DIFFICULTY')"
        >
          {{ difficulties[gameState.context.difficulty] }}
        </ActionButton>
      </div>
    </transition> -->
    <!-- </transition-group> -->

    <!-- Game UI -->
    <template v-if="state.hasTag('board')">
      <div class="fixed top-2 right-2 text-xs font-bold">
        <div
          class="flex justify-center items-center rounded-full w-16 h-16 shadow-block bg-white cursor-pointer transform hover:bg-blue-200 transition-colors"
          @click="nextTick"
        >
          <div
            class="rounded-full w-16 h-16 border-2 border-white"
            :style="grad"
          />
        </div>

        <div class="absolute -bottom-16 left-1/2 w-16 transform -translate-x-1/2 bg-white pt-2 pb-3 px-3 rounded shadow-block text-center">
          <div class="font-bold text-sm">
            Time
          </div>
          <div class="text-blue-500">
            {{ time }}
          </div>
        </div>
      </div>

      <ActionButton
        size="sm"
        class="fixed top-2 left-2"
        @click="quit"
      >
        Quit
      </ActionButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="showQuit"
          class="fixed z-50 inset-0 flex items-center justify-center"
        >
          <div
            class="absolute inset-0 bg-blue-300 bg-opacity-80"
            @click.self="showQuit = false"
          />
          <div class="relative z-10 p-6 pb-7 rounded bg-white shadow-block">
            <h2 class="text-base font-bold">
              Are you sure you want to quit?
            </h2>
            <div class="flex space-x-4 items-center justify-center mt-6">
              <ActionButton
                size="sm"
                is-secondary
                @click="showQuit = false"
              >
                No
              </ActionButton>
              <ActionButton
                size="sm"
                is-primary
                @click="quit2"
              >
                Yes
              </ActionButton>
            </div>
          </div>
        </div>
      </transition>

      <div class="fixed top-2 left-1/2 transform -translate-x-1/2 bg-white rounded shadow-block">
        <div class="pt-2 pb-3 px-4 text-center text-sm">
          <div class="font-bold text-gray-800">
            Score
          </div>
          <div
            class="font-bold"
            :class="BoardScene._score.value < 0 ? 'text-rose-500' : BoardScene._score.value > 0 ? 'text-green-500' : 'text-blue-500'"
          >
            {{ BoardScene._score }}
          </div>
        </div>
      </div>

      <!-- <div class="fixed top-1 left-1/2 transform -translate-x-1/2 bg-white rounded px-4 py-2 font-bold w-20 text-center">
        {{ time }} {{ BoardScene._score }}
      </div> -->

      <!-- Flight Controls -->
      <transition
        enter-active-class="transition duration-200 ease-in-out"
        enter-from-class="transform scale-50 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-50 opacity-0"
      >
        <div
          v-show="selectedPlane"
          class="fixed bottom-2 left-2 bg-white rounded shadow-block origin-bottom-left"
        >
          <div class="p-2 pb-3 text-center">
            <div class="font-bold text-sm text-gray-800">
              Flight Controls
            </div>
            <div class="flex">
              <div class="p-2 space-y-1">
                <div class="font-bold text-sm text-gray-700">
                  Direction
                </div>
                <div class="grid grid-cols-3 gap-1">
                  <ActionButton
                    size="control"
                    :is-primary="selectedPlane?._targetDirection === -1"
                    @click="setDirection(-1)"
                  >
                    45
                  </ActionButton>
                  <ActionButton
                    size="control"
                    class="row-span-2"
                    :is-primary="selectedPlane?._targetDirection === 0 && selectedPlane?._targetAltitude !== 0"
                    @click="setDirection(0); setHeight(selectedPlane?._position.y)"
                  >
                    &uarr;
                  </ActionButton>
                  <ActionButton
                    size="control"
                    :is-primary="selectedPlane?._targetDirection === 1"
                    @click="setDirection(1)"
                  >
                    45
                  </ActionButton>
                  <ActionButton
                    size="control"
                    :is-primary="selectedPlane?._targetDirection === -2"
                    @click="setDirection(-2)"
                  >
                    90
                  </ActionButton>
                  <ActionButton
                    size="control"
                    :is-primary="selectedPlane?._targetDirection === 2"
                    @click="setDirection(2)"
                  >
                    90
                  </ActionButton>
                  <ActionButton
                    size="control"
                    :is-primary="selectedPlane?._targetDirection === -3"
                    @click="setDirection(-3)"
                  >
                    135
                  </ActionButton>
                  <ActionButton
                    size="control"
                    :is-primary="selectedPlane?._targetDirection === 0 && selectedPlane?._targetAltitude === 0"
                    @click="setDirection(0); setHeight(0)"
                  >
                    L
                  </ActionButton>
                  <ActionButton
                    size="control"
                    :is-primary="selectedPlane?._targetDirection === 3"
                    @click="setDirection(3)"
                  >
                    135
                  </ActionButton>
                  <ActionButton
                    size="control"
                    :is-primary="selectedPlane?._targetDirection === -4"
                    @click="setDirection(-4)"
                  >
                    180
                  </ActionButton>
                  <ActionButton
                    size="control"
                    is-disabled
                  >
                    &infin;
                  </ActionButton>
                  <ActionButton
                    size="control"
                    :is-primary="selectedPlane?._targetDirection === 4"
                    @click="setDirection(4)"
                  >
                    180
                  </ActionButton>
                </div>
              </div>
              <div class="p-2 space-y-1">
                <div class="font-bold text-sm text-gray-700">
                  Altitude
                </div>
                <div class="grid grid-cols-3 gap-1">
                  <ActionButton
                    v-for="height in [0, 1, 2, 3, 4, 5, 6, 7, 8]"
                    :key="height"
                    size="control"
                    :is-secondary="selectedPlane?._position.y === height && selectedPlane?._targetAltitude !== height"
                    :is-primary="selectedPlane?._targetAltitude === height"
                    @click="setHeight(height)"
                  >
                    {{ height }}
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <div class="fixed bottom-2 right-2 w-80 bg-white rounded shadow-block origin-bottom-left">
        <div class="p-2 pb-3 text-center">
          <div class="font-bold text-sm text-gray-800">
            Flight Schedule
          </div>
          <div class="space-y-1 max-h-48 overflow-auto mt-2">
            <table class="text-sm font-bold w-full">
              <thead>
                <tr class="sticky top-0 bg-white bg-opacity-80">
                  <th class="font-bold text-sm text-gray-700">
                    Time
                  </th>
                  <th class="font-bold text-sm text-gray-700">
                    Status
                  </th>
                  <th class="font-bold text-sm text-gray-700">
                    Entry
                  </th>
                  <th class="font-bold text-sm text-gray-700">
                    Exit
                  </th>
                  <th class="font-bold text-sm text-gray-700">
                    Fuel
                  </th>
                </tr>
              </thead>
              <tbody class="text-xs">
                <tr
                  v-for="(plane, index) in schedule"
                  :key="plane._id"
                  class="transition-colors cursor-pointer"
                  :class="getPlaneClasses(plane, index)"
                  @click="plane._flightStatus === flightStatusses.IN_FLIGHT ? selectPlane(plane) : null"
                >
                  <td class="py-1">
                    {{ formatTime(plane._startTime) }}
                  </td>
                  <td class="py-1">
                    {{ plane._flightStatus }}
                  </td>
                  <td class="py-1">
                    {{ plane._start.name }}
                  </td>
                  <td class="py-1">
                    {{ plane._end.name }}
                  </td>
                  <td class="py-1">
                    {{ plane._fuel }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>

    <!-- Debug UI -->
    <!-- <button
      class="fixed bottom-64 left-2 bg-white rounded px-4 py-2 font-bold"
      @click="logStats"
    >
      Stats
    </button> -->
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import TWEEN from '@tweenjs/tween.js'
import { mainMachine } from '#/state-machines/main'
import { gameMachine } from '#/state-machines/game'
import { useMachine } from '@xstate/vue'

import renderer, { initRenderer, initStats, stats } from '#/renderer'
import controls, { resetControls } from '#/controls'
import camera from '#/camera'
import clock from '#/clock'

import { formatTime, mapDirection, getDirectionFactors } from '#/tools'
import { flightStatusses, difficulties } from '#/constants'

import IntroScene from '#/classes/scenes/intro-scene'
import BoardScene from '#/classes/scenes/board-scene'

import { Raycaster, Vector2 } from 'three'
import boardScene from './classes/scenes/board-scene'

import ActionButton from '#/components/ActionButton.vue'

const { state, send, service } = useMachine(mainMachine)
const { state: gameState, send: gameSend } = useMachine(gameMachine)

const scheduleOpen = ref(true)
const schedule = computed(() => {
  return BoardScene._board._airplanesQueue.map(plane => {
    const n = BoardScene._airplanes.value.find((a) => a._id === plane._id)

    return n || plane
  })
})

const time = computed(() => formatTime(BoardScene._tick.value))

/**
 * Returns the classes for a plane in the flight schedule.
 */
const getPlaneClasses = (plane, index) => {
  const isSelected = plane._id === selectedPlane.value?._id
  const isInFlight = plane._flightStatus === flightStatusses.IN_FLIGHT

  const status = [
    plane._flightStatus === flightStatusses.APPROACHING && 'bg-blue-200 text-blue-400 cursor-not-allowed',
    plane._flightStatus === flightStatusses.SCHEDULED && 'text-gray-400 cursor-not-allowed',
    plane._flightStatus === flightStatusses.LANDED && 'bg-teal-100 text-teal-500 cursor-not-allowed',
    plane._flightStatus === flightStatusses.EXITED && 'bg-teal-100 text-teal-500 cursor-not-allowed',
    plane._flightStatus === flightStatusses.LOST && 'bg-rose-100 text-rose-400 cursor-not-allowed',
  ]

  const selected = [
    'bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-800',
  ]

  const inFlight = [
    !isSelected && (index % 2 === 0) && 'bg-gray-100',
    !isSelected && 'hover:bg-gray-200',
  ]

  return [
    ...(!isSelected ? status : []),
    ...(isSelected ? selected : []),
    ...(isInFlight ? inFlight : []),
  ]
}

onMounted(() => {
  initRenderer()
  // initStats()

  controls.autoRotate = false
  controls.enablePan = true

  // Refactor
  service.onTransition(async (state) => {
    /**
     * The intro should animate in.
     */
    if (state.changed && state.matches('introIn')) {
      controls.autoRotate = true
      IntroScene.start()
      IntroScene.render()

      await IntroScene.animateIn()
      service.send('DONE')
    }

    /**
     * The intro should animate out.
     */
    if (state.changed && state.matches('introOut')) {
      controls.enableRotate = false
      controls.autoRotate = false

      await IntroScene.animateOut()
      service.send('DONE')
    }

    /**
     * The Game board should animate in.
     */
    if (state.changed && state.matches('gameIn')) {
      IntroScene.reset()

      BoardScene.start()
      BoardScene.render()

      const pos = camera.position

      new TWEEN.Tween(pos)
        .to({ x: 80, y: 35, z: 80 }, 1500)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => camera.position.set(pos.x, pos.y, pos.z))
        .onComplete(() => {
          controls.enableRotate = true
          controls.enableZoom = true
          service.send('DONE')
        })
        .start()

      await BoardScene.animateIn()
    }

    /**
     * The game is currently underway.
     */
    if (state.changed && state.matches('gamePlaying')) {
      controls.enableRotate = true
    }

    /**
     * The game is done and we animate out to the intro again.
     */
    if (state.changed && state.matches('gameOut')) {
      controls.enableRotate = false

      const pos = camera.position

      new TWEEN.Tween(pos)
        .to({ x: 15, y: 9, z: 15 }, 1500)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => camera.position.set(pos.x, pos.y, pos.z))
        .onComplete(() => {
          controls.enableRotate = true
          controls.enableZoom = true
          service.send('DONE')
        })
        .delay(500)
        .start()

      await BoardScene.animateOut()
      BoardScene.reset()
    }
  })

  let delta = 0
  let interval = 1 / 60 // 60 FPS

  const raycaster = new Raycaster()
  const pointer = new Vector2()
  let isMouseDown = false

  const onMouseDown = (e) => {
    isMouseDown = true
    pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1
    pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1
  }

  const onMouseUp = () => {
    isMouseDown = false
  }

  // The main animation loop for the game, which is clamped to 60 FPS.
  renderer.setAnimationLoop(async (_) => {
    delta += clock.getDelta()

    stats.begin()

    if (service.state.hasTag('intro') && IntroScene._scene) {
      renderer.render(IntroScene._scene, camera)

      if (delta > interval) {
        IntroScene._animate()
      }
    } else if (service.state.hasTag('board') && BoardScene._scene) {

      if (isMouseDown) {
        raycaster.setFromCamera( pointer, camera )

        const intersects = raycaster.intersectObjects( BoardScene._scene.children )

        // Find the closest airplane
        const objects = intersects.sort((a, b) => a.distance < b.distance)
        const planeParent = objects.find(object => object.object.parent.name === 'plane')

        if (planeParent) {
          selectPlane(planeParent.object.parent)
          isMouseDown = false
        }
      }

      renderer.render(BoardScene._scene, camera)

      if (delta > interval) {
        BoardScene._animate()
      }
    }

    controls.update()
    TWEEN.update(_)

    stats.end()

    delta = delta % interval
  })

  // Make sure the canvas resizes when the window resizes.
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', onWindowResize, false)
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)

  send('INTRO_IN')
})

const logStats = () => {
  Object.values(renderer.info).forEach(item => {
    console.table({ item })
  })
}

const nextTick = async () => {
  await BoardScene.nextTick()
}

const showQuit = ref(false)
const quit = () => {
  showQuit.value = true
}

const quit2 = () => {
  console.log('quit')
  showQuit.value = false
  send('GAME_OUT')
}

const selectedPlane = ref(null)

watch(
  selectedPlane,
  (newPlane) => {
    if (!newPlane) {
      resetControls()
    }
  }
)

// Reset the camera if the selected plane is removed.
watch(
  boardScene._airplanes,
  (planes) => {
    if (!planes.find(plane => plane._id === selectedPlane.value?._id)) {
      selectedPlane.value = null
    }
  }
)

const selectPlane = (plane) => {
  BoardScene.selectPlane(plane._id)

  selectedPlane.value = BoardScene._airplanes.value.find(plane => plane._isSelected)

  if (selectedPlane.value) {
    const fromControls = controls.target
    const toControls = selectedPlane.value._model.position

    new TWEEN.Tween(fromControls)
      .to(toControls, 500)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => controls.target = fromControls)
      .start()

    const { x, y, z } = selectedPlane.value._model.position
    const factors = getDirectionFactors(selectedPlane.value._direction)
    const fromCamera = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    const toCamera = { x: x + (20 * factors.x), y: y + 10, z: z + (20 * factors.z) }

    new TWEEN.Tween(fromCamera)
      .to(toCamera, 500)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => {
        camera.position.set(fromCamera.x, fromCamera.y, fromCamera.z)
        controls.update()
      })
      .start()
  }
}

const setHeight = (height) => {
  if (selectedPlane.value && !selectedPlane.value._isGhost) {
    selectedPlane.value.setHeight(height)
  }
}

const setDirection = (direction) => {
  if (selectedPlane.value && !selectedPlane.value._isGhost) {
    selectedPlane.value.setDirection(direction)
  }
}

const subTick = ref(0)
const subTickTimer = ref(null)

watch(
  BoardScene._tick,
  () => {
    clearInterval(subTickTimer.value)

    subTick.value = 0

    subTickTimer.value = setInterval(() => {
      subTick.value++
    }, 1000)
  }
)

watch(
  subTick,
  async (newTick) => {
    // next boardTick
    if (newTick === 30) {
      await BoardScene.nextTick()
    }
  }
)

const grad = computed(() => {
  return { 'background': `conic-gradient(#3b82f6 ${(subTick.value / 30) * 360}deg, transparent ${(subTick.value / 30) * 360}deg)` }
})

</script>

<style>
.stage {
  position: relative;
  perspective: 9999px;
  transform-style: preserve-3d;
}

.layer {
  width: 100%;
  height: 100%;
  position: absolute;
  color: whitesmoke;
  transform-style: preserve-3d;
  transform: rotateX(15deg) translateZ(0) translateY(-5%);
}
.layer:after {
  font: 4rem/0.95 "Carter One", "Domgle", Futura, "Roboto", "Trebuchet MS", Helvetica, sans-serif;
  content: "Air Traffic Control";
  white-space: pre;
  text-align: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  letter-spacing: -2px;
  text-shadow: 4px 0 10px rgba(0, 0, 0, 0.13);
}
.layer:nth-child(1):after {
  transform: translateZ(0px);
}
.layer:nth-child(2):after {
  transform: translateZ(-1.5px);
}
.layer:nth-child(3):after {
  transform: translateZ(-3px);
}
.layer:nth-child(4):after {
  transform: translateZ(-4.5px);
}
.layer:nth-child(5):after {
  transform: translateZ(-6px);
}
.layer:nth-child(6):after {
  transform: translateZ(-7.5px);
}
.layer:nth-child(7):after {
  transform: translateZ(-9px);
}
.layer:nth-child(8):after {
  transform: translateZ(-10.5px);
}
.layer:nth-child(9):after {
  transform: translateZ(-12px);
}
.layer:nth-child(10):after {
  transform: translateZ(-13.5px);
}
.layer:nth-child(11):after {
  transform: translateZ(-15px);
}
.layer:nth-child(12):after {
  transform: translateZ(-16.5px);
}
.layer:nth-child(13):after {
  transform: translateZ(-18px);
}
.layer:nth-child(14):after {
  transform: translateZ(-19.5px);
}
.layer:nth-child(15):after {
  transform: translateZ(-21px);
}
.layer:nth-child(16):after {
  transform: translateZ(-22.5px);
}
.layer:nth-child(17):after {
  transform: translateZ(-24px);
}
.layer:nth-child(18):after {
  transform: translateZ(-25.5px);
}
.layer:nth-child(19):after {
  transform: translateZ(-27px);
}
.layer:nth-child(20):after {
  transform: translateZ(-28.5px);
}
.layer:nth-child(n+10):after {
  -webkit-text-stroke: 3px rgba(0, 0, 0, 0.25);
}
.layer:nth-child(n+11):after {
  -webkit-text-stroke: 15px #0ea5e9;
}
.layer:nth-child(n+12):after {
  -webkit-text-stroke: 15px #0369a1;
}
.layer:last-child:after {
  -webkit-text-stroke: 17px rgba(0, 0, 0, 0.1);
  text-shadow: 0px 5px 26px rgba(3, 105, 161, 1);
}
.layer:first-child:after {
  text-shadow: none;
}

.what {
  width: 100%;
  height: 100%;
}
</style>
