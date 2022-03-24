import { gameService } from '#/state-machines/game'

import GameScene from '#/classes/base/scene'
import GameBoard from '#/classes/base/game-board'

import {
  HemisphereLight,
  DirectionalLight,
  Fog,
  Color,
  Object3D,
} from 'three'

import Clouds from '#/classes/pieces/clouds'
import controls from '../../controls'
import Airplane from '#/classes/pieces/airplane'
import Airstrip from '#/classes/props/airstrip'

const boardScene = new GameScene()
const board = new GameBoard()

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

  pivot2.rotation.y = Math.PI / -1.5

  const dirLight2 = new DirectionalLight(0xb0e1ed, 0.2)
  dirLight2.position.set(-20, 25, -10)

  const pivot = new Object3D()
  pivot.position.y = 2.5
  controls.target = pivot.position

  boardScene.addLight(hemiLight)
  boardScene.addLight(pivot2)
  boardScene.addLight(dirLight2)

  const fog = new Fog(new Color(0x9bc8e9), 15, 250)

  board.generate()

  boardScene.addFog(fog)
  boardScene.addBoard(board)

  gameService.start()

  boardScene.nextTick()
}

boardScene.nextTick = async () => {
  boardScene._tick.value++

  // Move existing planes every 15 minutes
  const moves = Promise.all(boardScene._airplanes.map(plane => plane.next()))
  const spawns = Promise.all(boardScene._board._airplanesQueue.filter(plane => plane.startTime === boardScene._tick.value).map(plane => {
    const airplane = new Airplane(plane.start.position, plane.start.direction, plane.end.position, plane.end.direction, plane.index)
    boardScene.addAirplane(airplane)
    return airplane.animateIn(0, 1000)
  }))

  await moves
  await spawns

  boardScene.checkGhosts()

  boardScene.checkCollisions()
}

/**
 * When airplanes fly into clouds, or fly 1 square off the board, they become
 * uncontrolable and enter "ghost" mode, which makes them white and somewhat
 * transparent.
 *
 * @todo move into the parent class?
 */
boardScene.checkGhosts = () => {
  const minX = 0 - Math.floor(boardScene._board._width / 2)
  const minZ = 0 - Math.floor(boardScene._board._depth / 2)
  const maxX = Math.abs(minX)
  const maxZ = Math.abs(minZ)

  Clouds._tiles.forEach(cloud => {
    boardScene._airplanes.forEach(plane => {
      const { x: cX, y: cY, z: cZ } = cloud.position
      const { x: pX, y: pY, z: pZ } = plane._position
      if (
        (cX === pX && cY === pY && cZ === pZ) ||
        (pX < minX) ||
        (pX > maxX) ||
        (pZ < minZ) ||
        (pZ > maxZ)
      ) {
        plane.setGhost()
      } else {
        plane.unsetGhost()
      }
    })
  })
}

boardScene.checkCollisions = () => {
  boardScene._airplanes.forEach(plane1 => {
    const { x: p1X, y: p1Y, z: p1Z } = plane1._position

    // Check for collisions with the ground (if there's no airfield).
    if (p1Y === 0) {
      Airstrip._tiles.forEach(tile => {
        const { x, y, z } = tile.position

        if (p1X === x && p1Z === z && plane1._direction === tile.direction) {
          console.log('plane landed on airport, check if it\'s the right airport!')
        } else {
          console.log(`plane crashed at ${x}, ${y}, ${z}`)
          gameService.send('LOSE')
        }
      })
    }

    // Check for collisions with other planes that are not this plane.
    boardScene._airplanes.forEach(plane2 => {
      if (plane1._id !== plane2._id) {
        const { x: p2X, y: p2Y, z: p2Z } = plane2._position
        if (p1X === p2X && p1Y === p2Y && p1Z === p2Z) {
          gameService.send('LOSE')
        }
      }
    })
  })
}

boardScene.selectPlane = (id) => {
  boardScene._airplanes.forEach(plane => {
    plane.unsetSelected()

    if (plane._id === id) {
      plane.setSelected()
    }
  })
}

export default boardScene
