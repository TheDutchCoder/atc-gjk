import { PerspectiveCamera, AudioListener } from 'three'

const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
export const audioListener = new AudioListener()

camera.position.set(15, 9, 15)
camera.add(audioListener)

export default camera
