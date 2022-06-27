import {
  BoxGeometry,
  SphereGeometry,
  ConeGeometry,
  DodecahedronGeometry,
  CylinderGeometry,
} from 'three'

import {
  mergeBufferGeometries,
} from 'three/examples/jsm/utils/BufferGeometryUtils'

export const boxGeometry = new BoxGeometry(1, 1, 1)
export const sphereGeometry = new SphereGeometry(1, 10, 10)
export const coneGeometry = new ConeGeometry(0.3, 2, 4)
export const dodecahedronGeometry = new DodecahedronGeometry(1, 0)
export const cylinderGeometry = new CylinderGeometry(1, 1, 1, 8)
export const poleGeometry = new CylinderGeometry(0.5, 1, 1, 8)
export const beamGeometry = new BoxGeometry(2, 0.15, 0.2)
export const railGeometry = new BoxGeometry(0.1, 0.1, 10)

export const runwayGeometry = new BoxGeometry(3, 0.2, 9)
export const stripeGeometry = new BoxGeometry(0.2, 0.05, 0.75)
export const lightGeometry = new BoxGeometry(0.2, 0.2, 0.2)

/**
 * Teepees.
 */
const teepeeGeometry = new ConeGeometry(0.75, 2, 5)
const teepeeGeometry1 = teepeeGeometry.clone()
teepeeGeometry1.scale(0.8, 0.8, 0.8)
teepeeGeometry1.computeBoundingBox()
teepeeGeometry1.translate(1, teepeeGeometry1.boundingBox.min.y / 2, 0)

const teepeeGeometry2 = teepeeGeometry.clone()
teepeeGeometry2.scale(1, 1, 1)
teepeeGeometry2.computeBoundingBox()
teepeeGeometry2.translate(1, teepeeGeometry2.boundingBox.min.y / 2, 0)
teepeeGeometry2.rotateY(1/3 * (Math.PI * 2))

const teepeeGeometry3 = teepeeGeometry.clone()
teepeeGeometry3.scale(1.2, 1.2, 1.2)
teepeeGeometry3.computeBoundingBox()
teepeeGeometry3.translate(1, teepeeGeometry3.boundingBox.min.y / 2, 0)
teepeeGeometry3.rotateY(2/3 * (Math.PI * 2))

export const teepeeGeometries = mergeBufferGeometries([
  teepeeGeometry1,
  teepeeGeometry2,
  teepeeGeometry3,
])

/**
 * Campfires.
 */
const logGeometry = new CylinderGeometry(1, 1, 10, 5)
const logGeometry1 = logGeometry.clone()
// logGeometry1.scale(0.8, 0.8, 0.8)
// logGeometry1.computeBoundingBox()
// logGeometry1.translate(1, logGeometry1.boundingBox.min.y / 2, 0)

const logGeometry2 = logGeometry.clone()
// logGeometry2.scale(1, 1, 1)
// logGeometry2.computeBoundingBox()
// logGeometry2.translate(1, logGeometry2.boundingBox.min.y / 2, 0)
// logGeometry2.rotateY(1/3 * (Math.PI * 2))

const logGeometry3 = logGeometry.clone()
// logGeometry3.scale(1.2, 1.2, 1.2)
// logGeometry3.computeBoundingBox()
// logGeometry3.translate(1, logGeometry3.boundingBox.min.y / 2, 0)
// logGeometry3.rotateY(2/3 * (Math.PI * 2))

export const logGeometries = mergeBufferGeometries([
  logGeometry1,
  logGeometry2,
  logGeometry3,
])
