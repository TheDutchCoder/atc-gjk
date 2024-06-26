import TWEEN from '@tweenjs/tween.js'

import Scene from '#classes/base/scene'
import GameBoard from '#classes/base/game-board'

import { service } from '#/state-machines/main'

import {
  HemisphereLight,
  DirectionalLight,
  Fog,
  Color,
  Object3D,
} from 'three'

import Clouds from '#classes/pieces/clouds'
import controls from '../../controls'

import { flightStatusses, quality } from '#/constants'
import { state } from '#/state-machines/main'

export default class BoardScene extends Scene {
  start () {
    const hemiLight = new HemisphereLight(0xffffff, 0x080802, 0.7)
    hemiLight.name = 'hemi'
    hemiLight.position.set(15, 25, 15)

    const pivot2 = new Object3D()
    pivot2.name = 'sun'

    const dirLight1 = new DirectionalLight(0xffffff, 0.3)

    dirLight1.position.set(0, 60, 0)
    dirLight1.castShadow = true
    dirLight1.shadow.mapSize.width = quality[state.value.context.quality].shadows
    dirLight1.shadow.mapSize.height = quality[state.value.context.quality].shadows
    dirLight1.shadow.camera.near = 0.5
    dirLight1.shadow.camera.far = 500
    dirLight1.shadow.camera.top = 90
    dirLight1.shadow.camera.bottom = -120
    dirLight1.shadow.camera.left = -90
    dirLight1.shadow.camera.right = 90

    pivot2.add(dirLight1)

    const dirLight2 = new DirectionalLight(0xb0e1ed, 0.2)
    dirLight1.name = 'sunlight'
    dirLight2.position.set(-20, 25, -10)

    const pivot = new Object3D()
    pivot.position.y = 2.5
    controls.target = pivot.position

    this.addLight(hemiLight)
    this.addLight(pivot2)
    this.addLight(dirLight2)

    const fog = new Fog(new Color(0x9bc8e9), 15, 350)

    pivot2.rotation.x = Math.PI / 4 // How high the sun is in the sky
    pivot2.rotation.z = Math.PI * 1.6 // The progress of the sun relative to time (0 is noon)

    const board = new GameBoard(service.state.context.difficulty)
    board.generate()

    this.addFog(fog)
    this.addBoard(board)

    this.nextTick()
  }

  async nextTick () {
    if (!this._isAnimating) {
      this._isAnimating = true
      this._tick.value++

      // Prune all finished planes.
      this._airplanes.value = this._airplanes.value.filter(plane => {
        if (plane._flightStatus === flightStatusses.LANDED || plane._flightStatus === flightStatusses.EXITED || plane._flightStatus === flightStatusses.LOST) {
          this.removeAirplane(plane)
        } else {
          return plane
        }
      })

      // Move existing planes every 15 minutes.
      const movePlanes = Promise.all(this._airplanes.value.map(plane => plane.next()))

      let moveBalloons = Promise.resolve()
      let moveClouds = Promise.resolve()

      // Move existing balloons every 60 minutes.
      if (this._tick.value % 4 === 0) {
        moveBalloons = Promise.all(this._balloons.value.map(balloon => balloon.next()))
      }

      // Spawn new balloons when their schedule says so.
      const spawnBalloons = Promise.all(this._board._balloonsQueue.filter(balloon => balloon._startTime === this._tick.value).map(balloon => {
        this.addBalloon(balloon)
        return balloon.animateIn(0, 500)
      }))

      // Spawn new planes when their schedule says so.
      const spawnPlanes = Promise.all(this._board._airplanesQueue.filter(plane => plane._startTime === this._tick.value).map(plane => {
        this.addAirplane(plane)
        plane.setSpawned()
        plane.setGhost()
        return plane.animateIn(0, 500)
      }))

      // Rotate the sun depending on the time of day.
      const moveSun = new Promise((resolve) => {
        const sun = this._lights.find(light => light.name === 'sun')

        const from = { rot: sun.rotation.z }
        const to = { rot: sun.rotation.z + ((Math.PI * 0.8) * (1 / 96)) }

        new TWEEN.Tween(from)
        .to(to, 500)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => sun.rotation.z = from.rot)
        .onComplete(resolve)
        .start()
      })

      // Move clouds planes every hour
      if (this._tick.value % Math.floor(96 / this._board._width) === 0 && this._tick.value > 0) {
        moveClouds = this._clouds.next()
      }

      await movePlanes
      await moveBalloons
      await moveClouds
      await moveSun

      await spawnPlanes
      await spawnBalloons

      this.checkObstructions()
      this.checkCollisions()
      this.checkDestinations()
      this.checkOutOfBounds()
      this.checkOutOfFuel()

      this._isAnimating = false
    }
  }

  checkObstructions () {
    const minX = 0 - Math.floor(this._board._width / 2)
    const minZ = 0 - Math.floor(this._board._depth / 2)
    const maxX = Math.abs(minX)
    const maxZ = Math.abs(minZ)

    this._airplanes.value.forEach(plane => {
      const { x: pX, y: pY, z: pZ } = plane._position
      let isInCloud = false
      let isLeaving = false

      // Check if the plane is in any of the clouds.
      Clouds._tiles.forEach(cloud => {
        const { x: cX, y: cY, z: cZ } = cloud.position

        if ((cX === pX && cY === pY && cZ === pZ)) {
          isInCloud = true
        }
      })

      // Check if the plane is leaving the board.
      if ((pX < minX) || (pX > maxX) || (pZ < minZ) || (pZ > maxZ)) {
        isLeaving = true
      }

      if (isInCloud || isLeaving) {
        plane.setGhost()
      }
    })
  }

  /**
   * Checks collisions between a plane and any collidable object like the
   * ground, anotehr plane, or obstacles.
   */
  checkCollisions () {
    this._airplanes.value.forEach(plane1 => {
      const { x: p1X, y: p1Y, z: p1Z } = plane1._position

      if (plane1._takenOff) {
        // Check for collisions with other planes that are not this plane.
        // @todo make this easier. Check for position, not individual coordinates.
        // Also check for next position and check against each other?
        this._airplanes.value.forEach(plane2 => {
          if (plane1._id !== plane2._id) {
            const { x: p2X, y: p2Y, z: p2Z } = plane2._position
            if (p1X === p2X && p1Y === p2Y && p1Z === p2Z) {
              service.send({ type: 'LOSE', message: `Two of your airplanes collided with each other at (${p2X}, ${p2Z}).` })
            }
          }
        })

        // Check for collisions with powerlines.
        this._powerlines._tiles.forEach(powerline => {
          const { position: { x, z } } = powerline

          if (p1X === x && p1Z === z && p1Y <= 2) {
            service.send({ type: 'LOSE', message: `An airplane collided with the powerlines at (${p1X}, ${p1Z}).` })
          }
        })

        // Check for collisions with Hot Air Balloons.
        this._balloons.value.forEach(balloon => {
          const { x: p2X, y: p2Y, z: p2Z } = balloon._position
          if (p1X === p2X && p1Y === p2Y && p1Z === p2Z) {
            service.send({ type: 'LOSE', message: `An airplane collided with a hot air balloon at (${p1X}, ${p1Z}).` })
          }
        })
      }
    })
  }

  checkDestinations () {
    this._airplanes.value.forEach(plane => {
      if (plane._takenOff && plane._flightStatus === flightStatusses.IN_FLIGHT) {
        const { x: curX, y: curY, z: curZ } = plane._position
        const curD = plane._direction

        const { position: { x: endX, y: endY, z: endZ }, direction: endD } = plane._end

        if (curX === endX && curY === endY && curZ === endZ && curD === endD) {
          this._score.value += (100 + (plane._fuel * 10))

          plane.setGhost()

          if (curY === 0) {
            plane.setLanded()
          } else {
            plane.setExited()
          }
        } else {
          if (curY === 0) {
            plane.setCrashed()
            service.send({ type: 'LOSE', message: `An airplane crashed into the ground at (${curX}, ${curZ}).` })
          }
        }
      }
    })
  }

  checkOutOfBounds () {
    this._airplanes.value.forEach(plane => {
      const { x: curX, z: curZ } = plane._position
      const minX = 0 - Math.ceil(this._board._width / 2)
      const minZ = 0 - Math.ceil(this._board._depth / 2)
      const maxX = Math.abs(minX)
      const maxZ = Math.abs(minZ)

      if (
        (curX <= minX || curX >= maxX || curZ <= minZ || curZ >= maxZ) &&
        plane._flightStatus === flightStatusses.IN_FLIGHT &&
        plane._startTime < this._tick.value
      ) {
        this._score.value -= 500

        plane.setLost()
      }
    })
  }

  checkOutOfFuel () {
    this._airplanes.value.forEach(plane => {
      if (plane._fuel <= 0) {
        console.log('game over!')
        service.send({ type: 'LOSE', message: 'An airplane ran out of fuel.' })
      }
    })
  }

  selectPlane (id) {
    this._airplanes.value.forEach(plane => {
      // The selected plane has been selected agin, so unselect and return.
      if (plane._id === id && plane._isSelected) {
        plane.unsetSelected()
        return
      }

      plane.unsetSelected()

      if (plane._id === id && !plane._isGhost) {
        plane.setSelected()
      }
    })
  }
}
