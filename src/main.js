// eslint-disable-next-line no-unused-vars
import css from './index.css'
// import { service } from '#/state-machines/main'
// import TWEEN from '@tweenjs/tween.js'

// import camera from '#/camera'
// import renderer, { stats, updatables } from '#/renderer'
// import controls from '#/controls'

// import IntroScene from '#/classes/scenes/intro-scene'
// import BoardScene from '#/classes/scenes/board-scene'

/**
 * @todo animations are bound to FPS, try to find a way to tie them to "real"
 * time.
 */

// TEST
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')

// service.onTransition(async (state) => {

//   /**
//    * The intro should animate in.
//    */
//   if (state.changed && state.matches('introIn')) {
//     controls.autoRotate = true
//     IntroScene.start()
//     IntroScene.render()

//     await IntroScene.animateIn()
//     service.send('DONE')
//   }

//   /**
//    * The intro should animate out.
//    */
//   if (state.changed && state.matches('introOut')) {
//     controls.enableRotate = false
//     controls.autoRotate = false

//     await IntroScene.animateOut()
//     service.send('DONE')
//   }

//   /**
//    * The Game board should animate in.
//    */
//   if (state.changed && state.matches('gameIn')) {
//     IntroScene.reset()

//     BoardScene.start()
//     BoardScene.render()

//     const pos = camera.position

//     new TWEEN.Tween(pos)
//       .to({ x: 80, y: 35, z: 80 }, 1500)
//       .easing(TWEEN.Easing.Cubic.InOut)
//       .onUpdate(() => camera.position.set(pos.x, pos.y, pos.z))
//       .onComplete(() => {
//         controls.enableRotate = true
//         controls.enableZoom = true
//         service.send('DONE')
//       })
//       .start()

//     await BoardScene.animateIn()
//   }

//   /**
//    * The game is currently underway.
//    */
//   if (state.changed && state.matches('gamePlaying')) {
//     controls.enableRotate = true
//   }

//   /**
//    * The game is done and we animate out to the intro again.
//    */
//   if (state.changed && state.matches('gameOut')) {
//     controls.enableRotate = false

//     const pos = camera.position

//     new TWEEN.Tween(pos)
//       .to({ x: 15, y: 9, z: 15 }, 1500)
//       .easing(TWEEN.Easing.Cubic.InOut)
//       .onUpdate(() => camera.position.set(pos.x, pos.y, pos.z))
//       .onComplete(() => {
//         controls.enableRotate = true
//         controls.enableZoom = true
//         service.send('DONE')
//       })
//       .delay(500)
//       .start()

//     await BoardScene.animateOut()
//     BoardScene.reset()
//   }
// })

// controls.autoRotate = false
// controls.enablePan = true

/**
 * The main render loop.
 */
// renderer.setAnimationLoop(async (_) => {
//   stats.begin()

//   // Something fishy here :)
//   if (service.state.hasTag('intro') && IntroScene._scene) {
//     renderer.render(IntroScene._scene, camera)
//     IntroScene._animate()
//   } else if (service.state.hasTag('board') && BoardScene._scene) {
//     renderer.render(BoardScene._scene, camera)
//     BoardScene._animate()
//   }

//   controls.update()
//   TWEEN.update(_)

//   stats.end()
// })


/**
 * Events.
 */
// const onWindowResize = () => {
//   camera.aspect = window.innerWidth / window.innerHeight
//   camera.updateProjectionMatrix()

//   renderer.setSize(window.innerWidth, window.innerHeight)
// }

// window.addEventListener('resize', onWindowResize, false)


/**
 * Debug.
 */
// document.getElementById('stats').addEventListener('click', () => {
//   Object.values(renderer.info).forEach(item => {
//     console.table({ item })
//   })
// })

// document.getElementById('play').addEventListener('click', () => {
//   service.send('INTRO_OUT')
//   service.send('GAME_OUT')
// })

// document.getElementById('tick').addEventListener('click', () => {
//   BoardScene.nextTick()
// })


/**
 * Start.
 */
// service.send('INTRO_IN')
