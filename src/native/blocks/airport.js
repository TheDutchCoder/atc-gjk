import {
  Group,
} from 'three'

import Block from '#blocks/block'
import Trees from '#instances/trees'
import Rocks from '#instances/rocks'
import Airfield from '#elements/airfield'

export default function Airport(pos = { x: 0, z: 0 }, direction = 0) {
  const airport = new Group()
  const block = new Block()
  const airfield = new Airfield(direction)

  airport.add(block, airfield)

  airport.position.x = pos.x * 10
  airport.position.z = pos.z * 10

  return airport
}
