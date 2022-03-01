import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
// camera.position.set(0, 110, 0)
// camera.position.set(15, 9, 15)
camera.position.set(15, 9, 15)
// camera.position.set(100, 75, 100)

export default camera
