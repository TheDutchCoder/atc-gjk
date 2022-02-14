import GameScene from '#native/classes/base/scene'
import GameBoard from '#native/classes/base/game-board'

import {
  HemisphereLight,
  DirectionalLight,
  Fog,
  Color,
} from 'three'

import { service } from '#native/state-machines/main'

// import Forest from '#native/classes/tiles/forest'
// import Clouds from '#native/classes/pieces/clouds'
// import Airplane from '#native/classes/pieces/airplane'

const boardScene = new GameScene()
const gameBoard = new GameBoard()

const hemiLight = new HemisphereLight(0xffffff, 0x080802, 0.7)
hemiLight.position.set(15, 25, 15)

const dirLight1 = new DirectionalLight(0xffffff, 0.3)
dirLight1.position.set(10, 20, 20)
dirLight1.lookAt(0, 0, 0)
dirLight1.castShadow = true
dirLight1.shadow.mapSize.width = 2048
dirLight1.shadow.mapSize.height = 2048
dirLight1.shadow.camera.near = 0.5
dirLight1.shadow.camera.far = 500
dirLight1.shadow.camera.top = 90
dirLight1.shadow.camera.bottom = -120
dirLight1.shadow.camera.left = -90
dirLight1.shadow.camera.right = 90
dirLight1.shadow.autoUpdate = false

const dirLight2 = new DirectionalLight(0xb0e1ed, 0.2)
dirLight2.position.set(-20, 25, -10)

const fog = new Fog(new Color(0x9bc8e9), 20, 350)

boardScene.addLight(hemiLight)
boardScene.addLight(dirLight1)
boardScene.addLight(dirLight2)
boardScene.addFog(fog)

gameBoard._tiles.flat().forEach(tile => {
  boardScene.addModel(tile.model)
  // boardScene.addThings(tile._things)
})

gameBoard._clouds.forEach(cloud => {
  boardScene.addModel(cloud.model)
  // boardScene.addModel(cloud.model)
})

console.log(boardScene)

// const clouds = new Clouds({ x: 0, y: 2, z: 0 })
// boardScene.addThing(clouds)
// boardScene.addModel(clouds.model)

// const forest = new Forest()
// boardScene.addThings(forest._things)
// boardScene.addModel(forest.model)

// const airplane = new Airplane({ x: 0, y: 1, z: 0 })
// boardScene.addThing(airplane)
// boardScene.addModel(airplane.model)

/**
 * Debug
 */
// service.onTransition((state) => {
//   if (state.matches('gameIn')) {
//     for (let x = -5; x < 5; x++) {
//       for (let z = -5; z < 5; z++) {
//         const forest = new Forest({ x, y: 0, z })
//         boardScene.addThings(forest._things)
//         boardScene.addModel(forest.model)
//       }
//     }
//   }
// })

export default boardScene
