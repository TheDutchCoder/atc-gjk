import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import camera from '#native/camera'
import renderer from '#native/renderer'

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enableRotate = true
controls.enableZoom = true
controls.enablePan = false
controls.autoRotate = true
controls.autoRotateSpeed = -2

export default controls
