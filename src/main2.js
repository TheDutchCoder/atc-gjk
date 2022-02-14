import css from './index.css'
import { service } from '#native/state-machines/main'
// import TWEEN from '@tweenjs/tween.js'

// import scene from '#native/scene'
import camera from '#native/camera'
import renderer, { stats, updatables } from '#native/renderer'
import controls from '#native/controls'

// import Base from '#native/classes/tiles/base'
import Trees from '#native/classes/props/trees'
import Rocks from '#native/classes/props/rocks'

// import GameScene from '#native/classes/base/scene'
import IntroScene from '#native/classes/scenes/intro'
// import GameBoard from '#native/classes/scenes/game-board'
// import EditorScene from '#native/classes/scenes/editor'

// import { ANIMATIONS_COMPLETE } from '#native/events'

import {
  GridHelper,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  Color,
  Fog,
  Group,
  Object3D,
  Scene,
} from 'three'

service.onTransition((state) => {
  if (state.matches('introIn')) {
    controls.autoRotate = true
    service.send('DONE')
  }

  if (state.matches('introOut')) {
    console.log(IntroScene)
    controls.enableRotate = false
    controls.autoRotate = false

    IntroScene._things.forEach(thing => thing?.animateOut())
  }

  if (state.matches('gameIn')) {
    const pos = { ...camera.position }
    service.send('DONE')
    // new TWEEN.Tween(pos)
    //   .to({ x: 75, y: 50, z: 75 }, 500)
    //   .easing(TWEEN.Easing.Cubic.InOut)
    //   .onUpdate(() => camera.position.set(pos.x, pos.y, pos.z))
    //   .onComplete(() => {
    //     controls.enableRotate = true
    //     controls.enableZoom = true
    //     service.send('DONE')
    //   })
    //   .delay(500)
    //   .start()
  }
})

controls.autoRotate = false
controls.enablePan = true

/**
 * The main render loop.
 */
renderer.setAnimationLoop(async (_) => {
  stats.begin()

  // for (const object of updatables) {
  //   if (object.isAnimating && typeof object.model.tick === 'function') {
  //     // console.log(object.model.tick)
  //     // object.model.tick()
  //   }
  // }

  // if (service.state.hasTag('intro')) {
  //   renderer.render(IntroScene._scene, camera)
  // } else if (service.state.hasTag('board')) {
  //   const { default: GameBoard } = await import('#native/classes/scenes/game-board')
  renderer.render(IntroScene._scene, camera)
  // }

  controls.update()
  // TWEEN.update(_)

  stats.end()
})


/**
 * Events.
 */
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)


/**
 * Debug.
 */
document.getElementById('stats').addEventListener('click', () => {
  Object.values(renderer.info).forEach(item => {
    console.table({ item })
  })
})

document.getElementById('doink').addEventListener('click', () => {
  updatables.forEach(element => element.isAnimating = !element.isAnimating)
})

document.getElementById('play').addEventListener('click', () => {
  service.send('INTRO_OUT')
  service.send('DONE')
  service.send('DONE')
})

document.getElementById('edit').addEventListener('click', () => {
  service.send('EDIT')
})


// test custom event
// document.addEventListener(ANIMATIONS_COMPLETE, () => {
//   service.send('DONE')
// })


/**
 * Start.
 */
// service.send('INTRO_IN')
