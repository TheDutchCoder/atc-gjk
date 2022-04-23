import { LoadingManager } from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

export const manager = new LoadingManager()
const fontLoader = new FontLoader(manager)

export let baseFont

fontLoader.load('./fonts/helvetiker_bold.typeface.json', (font) => {
  baseFont = font
})
