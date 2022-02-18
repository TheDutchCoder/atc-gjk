import css from './index.css'
import { service } from '#/state-machines/main'
import TWEEN from '@tweenjs/tween.js'

import camera from '#/camera'
import renderer, { stats, updatables } from '#/renderer'
import controls from '#/controls'

import IntroScene from '#/classes/scenes/intro'
import BoardScene from '#/classes/scenes/game-board'

service.onTransition(async (state) => {

  /**
   * The intro should animate in.
   */
  if (state.matches('introIn')) {
    controls.autoRotate = true
    IntroScene.start()
    IntroScene.render()

    await IntroScene.animateIn()
    service.send('DONE')
  }

  /**
   * The intro should animate out.
   */
  if (state.matches('introOut')) {
    controls.enableRotate = false
    controls.autoRotate = false

    await IntroScene.animateOut()
    service.send('DONE')
  }

  /**
   * The Game board should animate in.
   */
  if (state.matches('gameIn')) {
    console.log('gameIn')
    IntroScene.reset()

    BoardScene.start()
    BoardScene.render()

    const pos = camera.position

    new TWEEN.Tween(pos)
      .to({ x: 100, y: 50, z: 100 }, 2000)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => camera.position.set(pos.x, pos.y, pos.z))
      .onComplete(() => {
        controls.enableRotate = true
        controls.enableZoom = true
        service.send('DONE')
      })
      .delay(0)
      .start()

    await BoardScene.animateIn()
  }

  /**
   * The game is currently underway.
   */
  if (state.matches('gamePlaying')) {
    controls.enableRotate = true
  }
})

controls.autoRotate = false
controls.enablePan = true

/**
 * The main render loop.
 */
renderer.setAnimationLoop(async (_) => {
  stats.begin()

  if (service.state.hasTag('intro')) {
    renderer.render(IntroScene._scene, camera)
    IntroScene._animate()
  } else if (service.state.hasTag('board')) {
    renderer.render(BoardScene._scene, camera)
    BoardScene._animate()
  }

  controls.update()
  TWEEN.update(_)

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

document.getElementById('play').addEventListener('click', () => {
  service.send('INTRO_OUT')
})


/**
 * Start.
 */
service.send('INTRO_IN')
