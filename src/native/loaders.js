import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const objLoader = new OBJLoader()
const mtlLoader = new MTLLoader()
const gltfLoader = new GLTFLoader()

objLoader.setPath('./src/native/models/')
mtlLoader.setPath('./src/native/models/')

export const loadObj = async (file, loadMaterials) => {
  if (loadMaterials) {
    const materials = await mtlLoader.loadAsync(`${file}.mtl`)
    objLoader.setMaterials(materials)
  }

  return objLoader.loadAsync(`${file}.obj`)
}

export const loadGltf = (file) => {
  return gltfLoader.loadAsync(file)
}
