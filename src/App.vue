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
    <template v-if="state.hasTag('intro')">
      <button
        class="fixed top-1 right-1 bg-white rounded px-4 py-2 font-bold"
        @click="send('INTRO_OUT')"
      >
        Play
      </button>
    </template>

    <!-- Game UI -->
    <template v-if="state.hasTag('board')">
      <button
        class="fixed top-1 right-1 bg-white rounded px-4 py-2 font-bold"
        @click="nextTick"
      >
        Tick
      </button>

      <div class="fixed bottom-2 right-2 bg-white rounded-lg text-sm shadow-lg overflow-hidden">
        <h2 class="font-bold p-4">
          Flight Schedule
        </h2>

        <div
          class="absolute top-1 right-1"
          @click="scheduleOpen = !scheduleOpen"
        >
          x
        </div>

        <div
          class="max-h-64 overflow-auto"
          :class="scheduleOpen ? '' : 'h-0'"
        >
          <table class="text-center">
            <thead class="bg-slate-100">
              <tr>
                <th class="py-1 px-2">
                  Time
                </th>
                <th class="py-1 px-2">
                  Flight #
                </th>
                <th class="py-1 px-2">
                  Destination
                </th>
              </tr>
            </thead>
            <tbody class="text-xs">
              <tr
                v-for="(plane, index) in schedule"
                :key="plane.index"
                :class="index % 2 === 0 ? 'bg-slate-50': ''"
                class="cursor-pointer hover:bg-slate-100 transition-colors"
                @click="selectPlane(plane.index)"
              >
                <td class="py-1 px-2">
                  <div class="inline-block bg-green-100 rounded-full border border-green-300 px-2 text-green-700">
                    {{ formatTime(plane.startTime) }}
                  </div>
                </td>
                <td class="py-1 px-2">
                  <div class="p-2 font-bold">
                    GJK-{{ (plane.index).toString().padStart(3, '0') }}
                  </div>
                </td>
                <td class="py-1 px-2">
                  <div class="inline-block bg-blue-100 rounded-full border border-blue-300 px-2 text-blue-700">
                    NW-1
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- Debug UI -->
    <button
      class="fixed bottom-1 left-1 bg-white rounded px-4 py-2 font-bold"
      @click="logStats"
    >
      Stats
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import TWEEN from '@tweenjs/tween.js'
import { mainMachine } from '#/state-machines/main'
import { useMachine } from '@xstate/vue'

import renderer, { initRenderer, initStats, stats } from '#/renderer'
import controls from '#/controls'
import camera from '#/camera'
import clock from '#/clock'

import { formatTime } from '#/tools'

import IntroScene from '#/classes/scenes/intro-scene'
import BoardScene from '#/classes/scenes/board-scene'

const { state, send, service } = useMachine(mainMachine)

const scheduleOpen = ref(true)
const schedule = computed(() => BoardScene._board._airplanesQueue)

onMounted(() => {
  initRenderer()
  initStats()

  controls.autoRotate = false
  controls.enablePan = true

  // Refactor
  service.onTransition(async (state) => {
    console.log('service transition')

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
      renderer.render(BoardScene._scene, camera)
      BoardScene._animate()
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

  send('INTRO_IN')
})

const logStats = () => {
  Object.values(renderer.info).forEach(item => {
    console.table({ item })
  })
}

const nextTick = () => {
  BoardScene.nextTick()
}

const selectPlane = (id) => {
  console.log('select:', id)
  BoardScene.selectPlane(id)
}
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
