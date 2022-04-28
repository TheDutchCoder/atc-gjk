import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)

camera.position.set(15, 9, 15)

export default camera
