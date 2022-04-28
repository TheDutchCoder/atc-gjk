import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Vector3 } from 'three'
import TWEEN from '@tweenjs/tween.js'

import camera from '#/camera'
import renderer from '#/renderer'

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enableRotate = true
controls.enableZoom = true
controls.enablePan = false
controls.autoRotate = true
controls.autoRotateSpeed = -2

const origin = new Vector3(0, 0, 0)
export const resetControls = () => {
  const from = controls.target
  const to = origin

  new TWEEN.Tween(from)
    .to(to, 500)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(() => controls.target = from)
    .start()

  const fromCamera = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
  const toCamera = { x: 80, y: 35, z: 80 }

  new TWEEN.Tween(fromCamera)
    .to(toCamera, 500)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(() => {
      camera.position.set(fromCamera.x, fromCamera.y, fromCamera.z)
      controls.update()
    })
    .start()
}

export default controls
