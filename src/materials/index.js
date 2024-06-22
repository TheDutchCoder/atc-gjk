import {
  MeshPhongMaterial,
} from 'three'

export const defaultMaterial = new MeshPhongMaterial({ flatShading: true })
export const glassMaterial = new MeshPhongMaterial({ flatShading: true, transparent: true, opacity: 0.75 })
export const cloudMaterial = new MeshPhongMaterial({ flatShading: true, transparent: true, opacity: 0.85 })
export const smokeMaterial = new MeshPhongMaterial({ flatShading: true, transparent: true, opacity: 0.85 })
