// import GameScene from '#/classes/base/scene'

import {
  HemisphereLight,
  DirectionalLight,
  Fog,
  Color,
  Object3D,
} from 'three'

import {
  randomItemFromArray,
} from '#tools'

import Dirt from '#/classes/tiles/dirt'
import Forest from '#/classes/tiles/forest'
import TrainTracks from '#/classes/tiles/train-tracks'
import Powerline from '#/classes/tiles/powerline'
import Airfield from '#/classes/tiles/airfield'
import Clouds from '#/classes/pieces/clouds'
import Airplane from '#/classes/pieces/airplane'
import controls from '../../controls'

import Scene from '#/classes/base/scene'

// const introScene = new GameScene()
// const tiles = [Forest, TrainTracks, Airfield]
const tiles = [Powerline]
const RandomTile = randomItemFromArray(tiles)

export default class IntroScene extends Scene {
  start = () => {
    // Global light.
    const hemiLight = new HemisphereLight(0xffffff, 0x080802, 0.7)
    hemiLight.position.set(15, 25, 15)

    // Sun light.
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

    pivot2.rotation.y = Math.PI / -1.5

    // Highlight light.
    const dirLight2 = new DirectionalLight(0xb0e1ed, 0.2)
    dirLight2.position.set(-20, 25, -10)

    this.addLight(hemiLight)
    this.addLight(pivot2)
    this.addLight(dirLight2)

    // Create a random tile.
    new RandomTile({ position: { x: 0, y: 0, z: 0 }, direction: 2 })

    // Add an airplane.
    const airplane = new Airplane({
      id: 0,
      start: { position: { x: 0, y: 1, z: 0 }, direction: 1, name: '' },
      end: { position: { x: 0, y: 0, z: 0 }, direction: 1, name: '' },
      fuel: 100,
    })

    this.addAirplane(airplane)

    // Add the dirt base.
    Dirt.add()

    // Add some clouds.
    // Clouds.add({ position: { x: 0, y: 2, z: 0 } })

    // Fog.
    const fog = new Fog(new Color(0x9bc8e9), 15, 30)
    this.addFog(fog)

    // Make the camera look at the airplane.
    const pivot = new Object3D()
    pivot.position.y = 2.5
    controls.target = pivot.position
  }
}

// introScene.start = () => {
//   // Global light.
//   const hemiLight = new HemisphereLight(0xffffff, 0x080802, 0.7)
//   hemiLight.position.set(15, 25, 15)

//   // Sun light.
//   const pivot2 = new Object3D()
//   pivot2.rotation.x = Math.PI / -3
//   const dirLight1 = new DirectionalLight(0xffffff, 0.3)
//   pivot2.add(dirLight1)

//   dirLight1.position.set(60, 0, 0)
//   dirLight1.lookAt(pivot2.position)
//   dirLight1.castShadow = true
//   dirLight1.shadow.mapSize.width = 2048
//   dirLight1.shadow.mapSize.height = 2048
//   dirLight1.shadow.camera.near = 0.5
//   dirLight1.shadow.camera.far = 500
//   dirLight1.shadow.camera.top = 90
//   dirLight1.shadow.camera.bottom = -120
//   dirLight1.shadow.camera.left = -90
//   dirLight1.shadow.camera.right = 90

//   pivot2.rotation.y = Math.PI / -1.5

//   // Highlight light.
//   const dirLight2 = new DirectionalLight(0xb0e1ed, 0.2)
//   dirLight2.position.set(-20, 25, -10)

//   introScene.addLight(hemiLight)
//   introScene.addLight(pivot2)
//   introScene.addLight(dirLight2)

//   // Create a random tile.
//   new RandomTile()

//   // Add an airplane.
//   const airplane = new Airplane({
//     id: 0,
//     start: { position: { x: 0, y: 1, z: 0 }, direction: 1, name: '' },
//     end: { position: { x: 0, y: 0, z: 0 }, direction: 1, name: '' },
//     fuel: 100,
//   })

//   introScene.addAirplane(airplane)
//   // airplane.setSpawned()
//   // airplane.animateIn(0, 500)

//   // Add the dirt base.
//   Dirt.add()

//   // Add some clouds.
//   Clouds.add({ position: { x: 0, y: 2, z: 0 } })

//   // Fog.
//   const fog = new Fog(new Color(0x9bc8e9), 15, 30)
//   introScene.addFog(fog)

//   // Make the camera look at the airplane.
//   const pivot = new Object3D()
//   pivot.position.y = 2.5
//   controls.target = pivot.position
// }

// export default introScene
