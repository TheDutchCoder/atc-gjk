import GameScene from '#/classes/base/scene'

import {
  HemisphereLight,
  DirectionalLight,
  Fog,
  Color,
  Object3D,
  ArrowHelper,
  Vector3,
  DirectionalLightHelper,
} from 'three'

import {
  randomItemFromArray,
} from '#tools'

import Forest from '#/classes/tiles/forest'
// import { dirt } from '../tiles/dirt'
import Dirt from '#/classes/tiles/dirt'
import TrainTracks from '#/classes/tiles/train-tracks'
import Airfield from '#/classes/tiles/airfield'
import Clouds from '#/classes/pieces/clouds'
import Airplanes from '#/classes/pieces/airplanes'
import controls from '../../controls'
import airplanes from '../pieces/airplanes'
// import { updatables } from '../../renderer'

// const tiles = [Forest, Airfield, TrainTracks]
// const tile = randomItemFromArray(tiles)

const boardScene = new GameScene()

boardScene.start = () => {
  const hemiLight = new HemisphereLight(0xffffff, 0x080802, 0.7)
  hemiLight.position.set(15, 25, 15)

  const pivot2 = new Object3D()
  pivot2.rotation.x = Math.PI / -3
  const dirLight1 = new DirectionalLight(0xffffff, 0.3)
  pivot2.add(dirLight1)

  dirLight1.position.set(60, 0, 0)
  dirLight1.lookAt(pivot2.position)
  dirLight1.castShadow = true
  dirLight1.shadow.mapSize.width = 2048
  dirLight1.shadow.mapSize.height = 2048
  dirLight1.shadow.camera.near = 0.5
  dirLight1.shadow.camera.far = 500
  dirLight1.shadow.camera.top = 90
  dirLight1.shadow.camera.bottom = -120
  dirLight1.shadow.camera.left = -90
  dirLight1.shadow.camera.right = 90

  const h = new DirectionalLightHelper(dirLight1, 3)

  pivot2.rotation.y = Math.PI / -1.5

  boardScene._scene.add(h)

  const dirLight2 = new DirectionalLight(0xb0e1ed, 0.2)
  dirLight2.position.set(-20, 25, -10)

  const pivot = new Object3D()
  pivot.position.y = 2.5
  controls.target = pivot.position

  boardScene.addLight(hemiLight)
  boardScene.addLight(pivot2)
  boardScene.addLight(dirLight2)

  // DEBUG
  const fog = new Fog(new Color(0x9bc8e9), 15, 250)
  for (let x = -5; x <= 5; x++) {
    for (let z = -5; z <= 5; z++) {
      new TrainTracks({ position: { x, y: 0, z }, direction: 0 })
      Clouds.add({ position: { x, z } })
    }
  }

  Airplanes.add({ position: { x: 0, y: 2, z: 0 }, direction: 1 })

  Dirt.add({ scale: { x: 11, y: 1, z: 11 } })
  // DEBUG


  boardScene.addFog(fog)
}

export default boardScene
