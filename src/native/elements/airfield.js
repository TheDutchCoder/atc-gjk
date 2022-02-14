/**
 * @todo implement direction
 * @todo animate lights
 */

import {
  Group,
  Mesh,
  MeshPhongMaterial,
  Color,
  InstancedMesh,
  Object3D,
} from 'three'

import {
  runwayGeometry,
  stripeGeometry,
  lightGeometry,
} from '#geometries'

import {
  defaultMaterial,
} from '#materials'

import { directions } from '#/directions'

const STRIPES = 6
const LIGHTS = 10
const dummy = new Object3D()

const runwayColor = new Color(0x000000)
const linesColor = new Color(0xf7c654)
const greenColor = new Color(0x00ff00)
const redColor = new Color(0xff0000)

const runwwayMaterial = defaultMaterial.clone()

export default function Airfield(direction = 0) {
  const airfield = new Group()

  const landingStrip = new Mesh(runwayGeometry, runwwayMaterial)
  landingStrip.position.y = 0.1
  landingStrip.material.color.set(runwayColor)

  // Stripes.
  const stripeInstances = []
  const stripes = new Group()
  const stripe = new InstancedMesh(stripeGeometry, defaultMaterial, STRIPES)

  for (let i = 0; i < STRIPES; i++) {
    stripeInstances.push(dummy)
  }

  stripes.add(stripe)

  stripeInstances.forEach((instance, index) => {
    instance.position.set(0, 0.2, -2.875 + (index * 1.15))
    instance.updateMatrixWorld(true)

    stripe.setMatrixAt(index, instance.matrixWorld)
    stripe.setColorAt(index, linesColor)
  })

  stripe.instanceMatrix.needsUpdate = true

  // Green lights.
  const lightsInstances = []
  const lights = new Group()
  const light = new InstancedMesh(lightGeometry, defaultMaterial, LIGHTS)

  for (let i = 0; i < LIGHTS; i++) {
    lightsInstances.push(dummy)
  }

  lights.add(light)

  lightsInstances.forEach((instance, index) => {
    const isRed = index >= 5
    instance.position.set(-1 + ((index % 5) * 0.5), 0.2, isRed ? -4.2 : 4.2)
    instance.updateMatrixWorld(true)

    light.setMatrixAt(index, instance.matrixWorld)
    light.setColorAt(index, isRed ? redColor : greenColor)
  })

  light.instanceMatrix.needsUpdate = true

  airfield.add(landingStrip, stripes, lights)

  airfield.rotation.y = directions[direction]

  return airfield
}
