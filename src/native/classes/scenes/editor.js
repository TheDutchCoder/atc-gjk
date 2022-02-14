import GameScene from '#native/classes/base/scene'

import {
  HemisphereLight,
  DirectionalLight,
} from 'three'

import Airplane from '#native/classes/pieces/airplane'

const editorScene = new GameScene()

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

const dirLight2 = new DirectionalLight(0xb0e1ed, 0.2)
dirLight2.position.set(-20, 25, -10)

editorScene.addLight(hemiLight)
editorScene.addLight(dirLight1)
editorScene.addLight(dirLight2)

// editorScene.addModel(new Airplane({ x: 0, y: 1, z: 0 }).model)

/**
 * Debug
 */
// for (let x = -5; x < 5; x++) {
//   for (let z = -5; z < 5; z++) {
//     editorScene.addModel(new Forest({ x, y: 0, z }).model)
//     editorScene.addModel(new Airplane({ x, y: 1, z }).model)
//     editorScene.addModel(new Clouds({ x, y: 2, z }).model)
//   }
// }

export default editorScene
