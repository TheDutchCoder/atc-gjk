/**
 * @todo Exlusions along the X and Y axis.
 */

import {
  Group,
  DodecahedronGeometry,
  InstancedMesh,
  MeshPhongMaterial,
  Color,
  Object3D,
} from 'three'

import {
  BEAM_1,
  RAIL_1,
} from '#/colors'

import {
  defaultMaterial,
} from '#materials'

import { beamGeometry, railGeometry } from '#geometries'

const BEAMS = 11
const RAILS = 2

const dummy = new Object3D()

export default function Tracks(direction = 1) {
  const beams = []
  const rails = []

  const tracks = new Group()
  const beam = new InstancedMesh(beamGeometry, defaultMaterial, BEAMS)
  beam.receiveShadow = true

  const rail = new InstancedMesh(railGeometry, defaultMaterial, 2)
  rail.receiveShadow = true

  for (let i = 0; i < BEAMS; i++) {
    beams.push(dummy)
  }

  for (let i = 0; i < RAILS; i++) {
    rails.push(dummy)
  }

  tracks.add(beam, rail)
  tracks.rotation.y = direction * Math.PI / 2

  beams.forEach((instance, index) => {
    instance.position.set(0, 0, -4.6 + (index * 10 / (BEAMS - 0)))
    instance.rotation.set(0, -0.08 + Math.random() * 0.16, 0)
    instance.updateMatrixWorld(true)

    beam.setMatrixAt(index, instance.matrixWorld)
    beam.setColorAt(index, BEAM_1)
  })

  rails.forEach((instance, index) => {
    instance.position.set(-0.7 + (index * 1.4), 0.1, 0)
    instance.rotation.set(0, 0, 0)
    instance.updateMatrixWorld(true)

    rail.setMatrixAt(index, instance.matrixWorld)
    rail.setColorAt(index, RAIL_1)
  })

  beam.instanceMatrix.needsUpdate = true
  rail.instanceMatrix.needsUpdate = true

  return tracks
}
