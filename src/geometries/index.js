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
export const logGeometry = new CylinderGeometry(0.1, 0.1, 4, 5)

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
 * Twoer.
 */
//  const towerGeometry = new ConeGeometry(0.75, 2, 5)
logGeometry.scale(0.8, 0.8, 0.8)
const towerGeometry1 = logGeometry.clone()
towerGeometry1.computeBoundingBox()
towerGeometry1.rotateX(0.1)
// towerGeometry1.rotateY(1/4 * (Math.PI * 2))
towerGeometry1.translate(-0.75, 1, -0.75)

const towerGeometry2 = logGeometry.clone()
towerGeometry2.computeBoundingBox()
towerGeometry2.rotateX(-0.1)
// towerGeometry2.rotateY(2/4 * (Math.PI * 2))
towerGeometry2.translate(-0.75, 1, 0.75)

const towerGeometry3 = logGeometry.clone()
// towerGeometry3.computeBoundingBox()
towerGeometry3.translate(0.75, 1, 0.75)
towerGeometry3.rotateX(-0.1)
// towerGeometry3.rotateY(3/4 * (Math.PI * 2))

const towerGeometry4 = logGeometry.clone()
// towerGeometry4.computeBoundingBox()
towerGeometry4.translate(0.75, 1, -0.75)
towerGeometry4.rotateX(0.1)

const towerBaseGeometry = boxGeometry.clone()
towerBaseGeometry.scale(1.5, 0.1, 1.5)
towerBaseGeometry.translate(0, 1, 0)

const towerRoofGeometry = towerBaseGeometry.clone()
towerRoofGeometry.translate(0.2, 1.2, 0)
towerRoofGeometry.scale(1.4, 1, 1.2)
towerRoofGeometry.rotateZ(0.1)

const beam1 = logGeometry.clone()
beam1.scale(1, 0.5, 1)
beam1.rotateX(1/4 * Math.PI * 2)
beam1.translate(0.75, 1, 0)

const beam2 = beam1.clone()
beam2.rotateY(2/4 * Math.PI * 2)

const beam3 = beam1.clone()
beam3.rotateY(1/4 * Math.PI * 2)
beam3.translate(0, 0.1, 0)

const beam4 = beam1.clone()
beam4.rotateY(-1/4 * Math.PI * 2)
beam4.translate(0, 0.1, 0)

const beam5 = beam3.clone()
beam5.rotateY(1/4 * Math.PI * 2)
beam5.translate(0, 0.1, 0)

const beam6 = beam3.clone()
beam6.rotateY(-1/4 * Math.PI * 2)
beam6.translate(0, 0.1, 0)

const beam7 = beam5.clone()
beam7.rotateY(1/4 * Math.PI * 2)
beam7.translate(0, 0.1, 0)

const beam8 = beam5.clone()
beam8.rotateY(-1/4 * Math.PI * 2)
beam8.translate(0, 0.1, 0)

const beam9 = beam7.clone()
beam9.rotateY(1/4 * Math.PI * 2)
beam9.translate(0, 0.1, 0)

const beam10 = beam7.clone()
beam10.rotateY(-1/4 * Math.PI * 2)
beam10.translate(0, 0.1, 0)

const beam11 = beam9.clone()
beam11.rotateY(1/4 * Math.PI * 2)
beam11.translate(0, 0.1, 0)

const beam12 = beam9.clone()
beam12.rotateY(-1/4 * Math.PI * 2)
beam12.translate(0, 0.1, 0)

const beam13 = beam11.clone()
beam13.rotateY(1/4 * Math.PI * 2)
beam13.translate(0, 0.1, 0)

const beam14 = beam11.clone()
beam14.rotateY(-1/4 * Math.PI * 2)
beam14.translate(0, 0.1, 0)

 export const towerGeometries = mergeBufferGeometries([
   towerGeometry1,
   towerGeometry2,
   towerGeometry3,
   towerGeometry4,
   towerBaseGeometry,
   towerRoofGeometry,
   beam1,
   beam2,
   beam3,
   beam4,
   beam5,
   beam7,
   beam8,
   beam10,
   beam11,
   beam12,
   beam13,
 ])

 towerGeometries.translate(0, -0.5, 0)
