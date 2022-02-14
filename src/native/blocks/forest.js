import {
  Group,
} from 'three'

// import Tile from '#blocks/block'
// import Trees from '#instances/trees'
import Tile from '#native/classes/tiles/base'
import Trees from '#native/classes/props/trees'
// import Rocks from '#instances/rocks'

export default function Forest(pos = { x: 0, z: 0 }) {
  const forest = new Group()
  const tile = new Tile()
  const trees = new Trees()
  // const tile = new Tile()
  // const trees = new Trees()
  // const rocks = new Rocks()

  forest.add(tile.model, trees.model)

  forest.position.x = pos.x * 10
  forest.position.z = pos.z * 10

  return forest
}
