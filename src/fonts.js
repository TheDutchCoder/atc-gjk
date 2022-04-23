import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

const fontLoader = new FontLoader()

const loadFont = async (font) => new Promise((resolve, reject) => {
  fontLoader.load(font, font => resolve(font), null, error => reject(error))
})

const fonts = [
  './fonts/helvetiker_regular.typeface.json',
  './fonts/helvetiker_bold.typeface.json',
]

const result = await Promise.all(fonts.map(async font => await loadFont(font)))

const helvetikerRegular = result[0]
const helvetikerBold = result[1]

export {
  helvetikerRegular,
  helvetikerBold,
}
