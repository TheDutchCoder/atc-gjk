import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import helvetikerRegularFont from './fonts/helvetiker_regular.typeface.json?url'
import helvetikerBoldFont from './fonts/helvetiker_bold.typeface.json?url'

const fontLoader = new FontLoader()

const loadFont = async (font) => new Promise((resolve, reject) => {
  fontLoader.load(font, font => resolve(font), null, error => reject(error))
})

const fonts = [
  helvetikerRegularFont,
  helvetikerBoldFont,
]

const result = await Promise.all(fonts.map(async font => await loadFont(font)))

const helvetikerRegular = result[0]
const helvetikerBold = result[1]

export {
  helvetikerRegular,
  helvetikerBold,
}
