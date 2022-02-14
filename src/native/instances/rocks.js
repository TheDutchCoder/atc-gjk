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
  ROCK_1,
  ROCK_2,
  ROCK_3,
  ROCK_4,
} from '#/colors'

import {
  defaultMaterial,
} from '#materials'

import { dodecahedronGeometry } from '#geometries'
import { randomNumber } from '#/tools'

const AMOUNT = 12
const colors = [ROCK_1, ROCK_2, ROCK_3, ROCK_4]
const dummy = new Object3D()

export default function Rocks(excludes = { x: { min: 0, max: 0 }, z: { min: 0, max: 0 } }) {
  const instances = []
  const transforms = []

  const rocks = new Group()
  const rock = new InstancedMesh(dodecahedronGeometry, defaultMaterial, AMOUNT)
  rock.castShadow = true
  rock.receiveShadow = true

  for (let i = 0; i < AMOUNT; i++) {
    instances.push(dummy)
    transforms.push({
      pos: {
        x: randomNumber(-4.5, 4.5, excludes.x),
        y: 0,
        z: randomNumber(-4.5, 4.5, excludes.z),
      },
      rot: {
        x: -0.1 + (Math.random() * 0.2),
        y: (Math.PI / 2) * Math.random(),
        z: -0.1 + (Math.random() * 0.2),
      },
      scale: 0.1 + (Math.random() * 0.3)
    })
  }

  rocks.add(rock)

  instances.forEach((instance, index) => {
    const transform = transforms[index]
    instance.position.set(transform.pos.x, transform.pos.y * transform.scale, transform.pos.z)
    instance.rotation.set(transform.rot.x, transform.rot.y, transform.rot.z)
    instance.scale.setScalar(transform.scale)
    instance.updateMatrixWorld(true)

    rock.setMatrixAt(index, instance.matrixWorld)
    rock.setColorAt(index, colors[index % 4])
  })

  rock.instanceMatrix.needsUpdate = true

  return rocks
}
