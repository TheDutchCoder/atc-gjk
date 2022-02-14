import { WebGLRenderer, PCFSoftShadowMap, sRGBEncoding } from 'three'
import Stats from 'stats.js'

/**
 * A list of objects that need to be animated during the render loop.
 */
export const updatables = []

const el = document.getElementById('app')

export const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
  shadow: true,
  // powerPreference: 'high-performance', // This messes up dodacehedrons for some reason
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

el.innerHTML = ''
el.appendChild(renderer.domElement)

export default renderer
