import GameScene from '#native/classes/base/scene'

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

import Forest from '#native/classes/tiles/forest'
import TrainTracks from '#native/classes/tiles/train-tracks'
import Airfield from '#native/classes/tiles/airfield'
import Clouds from '#native/classes/pieces/clouds'
import Airplane from '#native/classes/pieces/airplane'
import controls from '../../controls'
import { updatables } from '../../renderer'

const tiles = [Forest, Airfield, TrainTracks]
const tile = randomItemFromArray(tiles)

const introScene = new GameScene()

const hemiLight = new HemisphereLight(0xffffff, 0x080802, 0.7)
hemiLight.position.set(15, 25, 15)

// const l = new Light({
//   light: new DirectionalLight(0xffffff, 0.3),
//   position: { x: 60, y: 0, z: 0 },
//   rotation: { x: Math.PI / -3, y: 0, z: 0 }
// })

const pivot2 = new Object3D()
pivot2.rotation.x = Math.PI / -3
const dirLight1 = new DirectionalLight(0xffffff, 0.3)
pivot2.add(dirLight1)

pivot2.rotation.y = 0.1

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


// introScene._scene.add(pivot2)
introScene._scene.add(h)
// introScene.addModel(l._model)

// setInterval(() => {
//   pivot2.rotation.y += 0.01 * (Math.PI / 4)
//   // console.log(pivot2.rotation)
// }, 16.7)

// dirLight1.lookAt(pivot2)

const dirLight2 = new DirectionalLight(0xb0e1ed, 0.2)
dirLight2.position.set(-20, 25, -10)

const fog = new Fog(new Color(0x9bc8e9), 15, 30)

const pivot = new Object3D()
pivot.position.y = 2.5
controls.target = pivot.position

introScene.addLight(hemiLight)
introScene.addLight(pivot2)
// introScene.addLight(dirLight1)
introScene.addLight(dirLight2)
// introScene.addFog(fog)

// const clouds = new Clouds({ position: { x: 0, y: 2, z: 0 } })
// introScene.addModel(clouds)

const forest = new Forest()
introScene.addModel(forest)

const airplane = new Airplane({ position: { x: 0, y: 1, z: 0 } })
introScene.addModel(airplane)

/**
 * Debug
 */
// for (let x = -2; x < 2; x++) {
//   for (let z = -2; z < 2; z++) {
//     // const clouds = new Clouds({ x, y: 2, z })
//     // introScene.addModel(clouds.model)

//     const forest = new Forest({ position: { x, y: 0, z } })
//     console.log(forest)
//     introScene._scene.add(forest)

//     // const airplane = new Airplane({ x, y: 1, z })
//     // introScene.addModel(airplane.model)
//   }
// }

export default introScene
