// import {
//   Object3D,
// } from 'three'

// import {
//   defaultMaterial,
//   glassMaterial,
// } from '#materials'

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
const loader = new OBJLoader()

// import Clock from '#native/clock'

// import { setPoint } from '#/tools'
// import { directions } from '#/directions'
// import scene from './scene'

import GamePiece from '#native/classes/gamePiece'

const plane = await loader.loadAsync('./src/native/test.obj')



/**
 * Airplane game piece.
 */
export class Airplane extends GamePiece {

  /**
   * Initialize the airplane.
   * @param {Object} position - The position of the airplane.
   * @param {Number} direction - The direction the airplane is facing.
   * @param {Object} destination - The position of the airplane's destination.
   */
  constructor(position, direction, destination) {
    super(position, direction)

    this.destination = destination

    this._hasAnimations = true
    this._isAnimating = true

    this.model = plane
  }

}


// const createPlane = () => {
//   const baseColor = colors[Math.floor(Math.random() * colors.length)]

//   const baseMaterial = defaultMaterial.clone()
//   const screenMaterial = glassMaterial.clone()
//   const engineMaterial = defaultMaterial.clone()
//   const nutMaterial = defaultMaterial.clone()
//   const propMaterial = defaultMaterial.clone()

//   // Colors.
//   baseMaterial.color.set(baseColor)
//   screenMaterial.color.set(screenColor)
//   engineMaterial.color.set(engineColor)
//   nutMaterial.color.set(nutColor)
//   propMaterial.color.set(propColor)

//   // The main plane group.
//   const plane = new Group()

//   // Meshes.
//   const hull = new Mesh(hullGeometry, baseMaterial)

//   const screen = new Mesh(screenGeometry, screenMaterial)
//   screen.position.set(0, 0.65, -0.7)
//   screen.rotation.set(0.2, 0, 0)

//   const engine = new Mesh(engineGeometry, engineMaterial)
//   engine.position.set(0, 0, -1.25)

//   const nut = new Mesh(nutGeometry, propMaterial)
//   nut.position.set(0, 0, -1.55)
//   nut.scale.set(0.2, 0.2, 0.2)

//   // Props.
//   const props = new InstancedMesh(propGeometry, propMaterial, 2)

//   for (let i = 0; i < 2; i++) {
//     dummy.position.set(0, 0, -1.6)
//     if (i === 0) {
//       dummy.rotation.set(0, 0, Math.PI / 4)
//     } else {
//       dummy.rotation.set(0, 0, -Math.PI / 4)
//     }
//     dummy.scale.set(1, 1, 1)
//     dummy.updateMatrixWorld(true)

//     props.setMatrixAt(i, dummy.matrixWorld)
//   }

//   props.instanceMatrix.needsUpdate = true

//   const pipes = new Group()
//   const pipeRight = new Group()
//   const pipeRight1 = new Mesh(pipeGeometry, engineMaterial)
//   const pipeRight2 = new Mesh(pipeGeometry, engineMaterial)

//   pipeRight1.position.set(0, 0, -1.05)
//   pipeRight1.rotation.set(0, 0.2, Math.PI / 4)
//   pipeRight2.position.set(0.05, 0, -0.55)
//   pipeRight2.rotation.set(0, 0, Math.PI / 4)

//   pipeRight.add(pipeRight1, pipeRight2)
//   const pipeLeft = pipeRight.clone()

//   pipeRight.position.set(0.5, 0.2, 0)
//   pipeRight.rotation.set(-0.05, 0, 0)

//   pipeLeft.position.set(-0.5, 0.2, 0)
//   pipeLeft.rotation.set(-0.05, 0, Math.PI)

//   pipes.add(pipeLeft, pipeRight)

//   const wings = new Mesh(wingsGeometry, baseMaterial)
//   wings.position.set(0, 0, -0.25)

//   const rudder = new Mesh(rudderGeometry, baseMaterial)
//   rudder.position.set(0, 0.5, 0.95)

//   const wheels = new Group()
//   const leftWheel = new Group()

//   const wheelBase = new Mesh(wheelBaseGeometry, baseMaterial)
//   wheelBase.position.set(0, -0.3, 0.75)

//   const wheelNut = new Mesh(wheelNutGeometry, nutMaterial)
//   wheelNut.position.set(0, -0.6, 0.75)

//   const wheelTire = new Mesh(wheelTireGeometry, propMaterial)
//   wheelTire.position.set(0, -0.6, 0.75)

//   leftWheel.add(wheelBase, wheelNut, wheelTire)
//   leftWheel.position.set(0.3, 0, -1.4)

//   const rightWheel = leftWheel.clone()
//   rightWheel.position.set(-0.3, 0, -1.4)

//   const rearWheel = leftWheel.clone()
//   rearWheel.position.set(0, 0, 0)
//   rearWheel.rotation.set(-0.2, 0, 0)

//   wheels.add(leftWheel, rightWheel, rearWheel)

//   // Smoke.
//   const smoke = new InstancedMesh(smokeGeometry, engineMaterial, 10)

//   for (let i = 0; i < 10; i++) {
//     if (i < 5) {
//       dummy.position.set(-0.55, 0.2, (i % 5) / 3)
//     } else {
//       dummy.position.set(0.55, 0.2, (i % 5) / 3)
//     }
//     dummy.rotation.set(0, 0.1, 0)
//     dummy.scale.setScalar(0.1)
//     dummy.updateMatrixWorld(true)

//     smoke.setMatrixAt(i, dummy.matrixWorld)
//   }

//   smoke.instanceMatrix.needsUpdate = true

//   plane.add(hull, screen, engine, nut, props, pipes, wings, rudder, wheels, smoke)

//   plane.onBeforeRender = () => {
//     console.log('plane')
//   }

//   plane.tick = () => {
//     const time = Clock.getElapsedTime()
//     const bob = Math.sin(time * 5 / Math.PI) / 50
//     const pitch = Math.sin(time * 7 / Math.PI) / 20

//     // Bob and pitch the plane.
//     plane.position.y += bob
//     plane.rotation.z = pitch

//     // Rotate the propellers.
//     for (let i = 0; i < 2; i++) {
//       dummy.position.set(0, 0, -1.6)
//       if (i === 0) {
//         dummy.rotation.set(0, 0, (Math.PI / 4) + (time * 10))
//       } else {
//         dummy.rotation.set(0, 0, -(Math.PI / 4) + (time * 10))
//       }
//       dummy.scale.set(1, 1, 1)
//       dummy.updateMatrixWorld(true)

//       props.setMatrixAt(i, dummy.matrixWorld)
//     }

//     props.instanceMatrix.needsUpdate = true

//     // Animate the smoke particles.
//     for (let i = 0; i < 10; i++) {
//       if (i < 5) {
//         dummy.position.set(-0.55, 0.2, getSmokePosition(time, (i * 3)))
//       } else {
//         dummy.position.set(0.55, 0.2, getSmokePosition(time, (i * 3)))
//       }
//       dummy.rotation.set(0, getSmokeRotation(time), getSmokeRotation(time))
//       dummy.scale.setScalar(getSmokeScale(time, ((i % 5) * 3)))
//       dummy.updateMatrixWorld(true)

//       smoke.setMatrixAt(i, dummy.matrixWorld)
//     }

//     smoke.instanceMatrix.needsUpdate = true
//   }

//   // Add the plane to the list of animations.
//   // updatables.push(plane)

//   return plane
// }

// const colors = [new Color(0xff0000), new Color(0x00ff00), new Color(0x0000ff)]
// const dummy = new Object3D()

// const screenColor = new Color(0xe2eff4)
// const propColor = new Color(0x000000)
// const nutColor = new Color(0x99684a)
// const engineColor = new Color(0xffffff)

// const hullGeometry = new BoxGeometry(1, 1, 2)
// setPoint(0, hullGeometry, -0.2, -0.1)
// setPoint(2, hullGeometry, -0.2, 0.3)
// setPoint(4, hullGeometry, 0.2, -0.1)
// setPoint(6, hullGeometry, 0.2, 0.3)

// const screenGeometry = new BoxGeometry(0.7, 0.4, 0.05)
// setPoint(0, screenGeometry, -0.05)
// setPoint(1, screenGeometry, -0.05)
// setPoint(4, screenGeometry, 0.05)
// setPoint(5, screenGeometry, 0.05)

// const engineGeometry = new BoxGeometry(1, 1, 0.5)
// setPoint(1, engineGeometry, -0.1, -0.1)
// setPoint(3, engineGeometry, -0.1, 0.1)
// setPoint(5, engineGeometry, 0.1, -0.1)
// setPoint(7, engineGeometry, 0.1, 0.1)

// const nutGeometry = new BoxGeometry(1, 1, 1)
// setPoint(0, nutGeometry, 0.07, 0.07)
// setPoint(2, nutGeometry, 0.07, -0.07)
// setPoint(4, nutGeometry, -0.07, 0.07)
// setPoint(6, nutGeometry, -0.07, -0.07)

// const propGeometry = new BoxGeometry(0.15, 1.5, 0.05)

// const pipeGeometry = new BoxGeometry(0.1, 0.1, 0.5)
// setPoint(2, pipeGeometry, null, null, 0.01)
// setPoint(1, pipeGeometry, null, null, -0.009)
// setPoint(3, pipeGeometry, null, null, -0.009)
// setPoint(7, pipeGeometry, null, null, -0.01)

// const wingsGeometry = new BoxGeometry(3, 0.1, 1)
// setPoint(1, wingsGeometry, 0.2, 0.05)
// setPoint(3, wingsGeometry, 0.2, -0.05)
// setPoint(5, wingsGeometry, -0.2, 0.05)
// setPoint(7, wingsGeometry, -0.2, -0.05)

// const rudderGeometry = new BoxGeometry(0.1, 0.75, 0.5)
// setPoint(0, rudderGeometry, -0.04, 0.05)
// setPoint(2, rudderGeometry, -0.04)
// setPoint(3, rudderGeometry, 0, -0.05)
// setPoint(4, rudderGeometry, 0.04, 0.05)
// setPoint(6, rudderGeometry, 0.04)
// setPoint(7, rudderGeometry, 0, -0.05)

// const wheelBaseGeometry = new BoxGeometry(0.4, 0.5, 0.6)
// const wheelNutGeometry = new BoxGeometry(0.34, 0.2, 0.2)
// const wheelTireGeometry = new BoxGeometry(0.2, 0.4, 0.4)
// const smokeGeometry = new DodecahedronGeometry(1, 0)

// const getSmokePosition = (count, delay = 0) => {
//   return (((count + delay) % 5) / 5) - 0.2
// }

// const getSmokeRotation = (count, delay = 0) => {
//   return (count + delay) / 2
// }

// const getSmokeScale = (count, delay = 0) => {
//   return Math.sin((((count + delay) % 5) / 5) * Math.PI) * 0.1
// }

// export default function Plane(position = { x: 0, z: 0 }, altitude = 1, direction = 0) {
//   const baseColor = colors[Math.floor(Math.random() * colors.length)]

//   const baseMaterial = defaultMaterial.clone()
//   const screenMaterial = glassMaterial.clone()
//   const engineMaterial = defaultMaterial.clone()
//   const nutMaterial = defaultMaterial.clone()
//   const propMaterial = defaultMaterial.clone()

//   // Colors.
//   baseMaterial.color.set(baseColor)
//   screenMaterial.color.set(screenColor)
//   engineMaterial.color.set(engineColor)
//   nutMaterial.color.set(nutColor)
//   propMaterial.color.set(propColor)

//   // The main plane group.
//   const plane = new Group()

//   // Meshes.
//   const hull = new Mesh(hullGeometry, baseMaterial)

//   const screen = new Mesh(screenGeometry, screenMaterial)
//   screen.position.set(0, 0.65, -0.7)
//   screen.rotation.set(0.2, 0, 0)

//   const engine = new Mesh(engineGeometry, engineMaterial)
//   engine.position.set(0, 0, -1.25)

//   const nut = new Mesh(nutGeometry, propMaterial)
//   nut.position.set(0, 0, -1.55)
//   nut.scale.set(0.2, 0.2, 0.2)

//   // Props.
//   const props = new InstancedMesh(propGeometry, propMaterial, 2)

//   for (let i = 0; i < 2; i++) {
//     dummy.position.set(0, 0, -1.6)
//     if (i === 0) {
//       dummy.rotation.set(0, 0, Math.PI / 4)
//     } else {
//       dummy.rotation.set(0, 0, -Math.PI / 4)
//     }
//     dummy.scale.set(1, 1, 1)
//     dummy.updateMatrixWorld(true)

//     props.setMatrixAt(i, dummy.matrixWorld)
//   }

//   props.instanceMatrix.needsUpdate = true

//   const pipes = new Group()
//   const pipeRight = new Group()
//   const pipeRight1 = new Mesh(pipeGeometry, engineMaterial)
//   const pipeRight2 = new Mesh(pipeGeometry, engineMaterial)

//   pipeRight1.position.set(0, 0, -1.05)
//   pipeRight1.rotation.set(0, 0.2, Math.PI / 4)
//   pipeRight2.position.set(0.05, 0, -0.55)
//   pipeRight2.rotation.set(0, 0, Math.PI / 4)

//   pipeRight.add(pipeRight1, pipeRight2)
//   const pipeLeft = pipeRight.clone()

//   pipeRight.position.set(0.5, 0.2, 0)
//   pipeRight.rotation.set(-0.05, 0, 0)

//   pipeLeft.position.set(-0.5, 0.2, 0)
//   pipeLeft.rotation.set(-0.05, 0, Math.PI)

//   pipes.add(pipeLeft, pipeRight)

//   const wings = new Mesh(wingsGeometry, baseMaterial)
//   wings.position.set(0, 0, -0.25)

//   const rudder = new Mesh(rudderGeometry, baseMaterial)
//   rudder.position.set(0, 0.5, 0.95)

//   const wheels = new Group()
//   const leftWheel = new Group()

//   const wheelBase = new Mesh(wheelBaseGeometry, baseMaterial)
//   wheelBase.position.set(0, -0.3, 0.75)

//   const wheelNut = new Mesh(wheelNutGeometry, nutMaterial)
//   wheelNut.position.set(0, -0.6, 0.75)

//   const wheelTire = new Mesh(wheelTireGeometry, propMaterial)
//   wheelTire.position.set(0, -0.6, 0.75)

//   leftWheel.add(wheelBase, wheelNut, wheelTire)
//   leftWheel.position.set(0.3, 0, -1.4)

//   const rightWheel = leftWheel.clone()
//   rightWheel.position.set(-0.3, 0, -1.4)

//   const rearWheel = leftWheel.clone()
//   rearWheel.position.set(0, 0, 0)
//   rearWheel.rotation.set(-0.2, 0, 0)

//   wheels.add(leftWheel, rightWheel, rearWheel)

//   // Smoke.
//   const smoke = new InstancedMesh(smokeGeometry, engineMaterial, 10)

//   for (let i = 0; i < 10; i++) {
//     if (i < 5) {
//       dummy.position.set(-0.55, 0.2, (i % 5) / 3)
//     } else {
//       dummy.position.set(0.55, 0.2, (i % 5) / 3)
//     }
//     dummy.rotation.set(0, 0.1, 0)
//     dummy.scale.setScalar(0.1)
//     dummy.updateMatrixWorld(true)

//     smoke.setMatrixAt(i, dummy.matrixWorld)
//   }

//   smoke.instanceMatrix.needsUpdate = true

//   plane.add(hull, screen, engine, nut, props, pipes, wings, rudder, wheels, smoke)

//   plane.position.x = position.x * 10
//   plane.position.y = altitude * 5
//   plane.position.z = position.z * 10
//   plane.rotation.y = directions[direction]

//   /**
//    * Animations
//    */
//   plane.tick = () => {
//     const time = Clock.getElapsedTime()
//     const bob = Math.sin(time * 5 / Math.PI) / 15
//     const pitch = Math.sin(time * 7 / Math.PI) / 20

//     // Bob and pitch the plane.
//     plane.position.y = (altitude + bob) * 5
//     plane.rotation.z = pitch

//     // Rotate the propellers.
//     for (let i = 0; i < 2; i++) {
//       dummy.position.set(0, 0, -1.6)
//       if (i === 0) {
//         dummy.rotation.set(0, 0, (Math.PI / 4) + (time * 10))
//       } else {
//         dummy.rotation.set(0, 0, -(Math.PI / 4) + (time * 10))
//       }
//       dummy.scale.set(1, 1, 1)
//       dummy.updateMatrixWorld(true)

//       props.setMatrixAt(i, dummy.matrixWorld)
//     }

//     props.instanceMatrix.needsUpdate = true

//     // Animate the smoke particles.
//     for (let i = 0; i < 10; i++) {
//       if (i < 5) {
//         dummy.position.set(-0.55, 0.2, getSmokePosition(time, (i * 3)))
//       } else {
//         dummy.position.set(0.55, 0.2, getSmokePosition(time, (i * 3)))
//       }
//       dummy.rotation.set(0, getSmokeRotation(time), getSmokeRotation(time))
//       dummy.scale.setScalar(getSmokeScale(time, ((i % 5) * 3)))
//       dummy.updateMatrixWorld(true)

//       smoke.setMatrixAt(i, dummy.matrixWorld)
//     }

//     smoke.instanceMatrix.needsUpdate = true
//   }

//   // Add the plane to the list of animations.
//   updatables.push(plane)

//   return plane
// }
