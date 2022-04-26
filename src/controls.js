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
}

export default controls
