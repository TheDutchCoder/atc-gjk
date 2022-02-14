import {
  Group,
} from 'three'

import Block from '#blocks/block'
import Trees from '#instances/trees'
import Rocks from '#instances/rocks'
import Tracks from '#instances/tracks'

export default function TrainTracks(pos = { x: 0, z: 0 }, direction = 0) {
  const trainTracks = new Group()
  const block = new Block()
  const trees = new Trees(direction ? { z: { min: -2, max: 2 } } : { x: { min: -2, max: 2 } })
  const rocks = new Rocks(direction ? { z: { min: -2, max: 2 } } : { x: { min: -2, max: 2 } })
  const tracks = new Tracks(direction)

  trainTracks.add(block, trees, rocks, tracks)

  trainTracks.position.x = pos.x * 10
  trainTracks.position.z = pos.z * 10

  return trainTracks
}
