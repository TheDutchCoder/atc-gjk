import {
  BoxGeometry,
  SphereGeometry,
  ConeGeometry,
  DodecahedronGeometry,
  CylinderGeometry,
} from 'three'

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
