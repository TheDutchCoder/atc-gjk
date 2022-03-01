import { WebGLRenderer, PCFSoftShadowMap } from 'three'
import Stats from 'stats.js'

/**
 * A list of objects that need to be animated during the render loop.
 */
export const updatables = []
export const stats = new Stats()

export const initRenderer = () => {
  const el = document.getElementById('three')
  el.innerHTML = ''
  el.appendChild(renderer.domElement)
}

export const initStats = () => {
  stats.showPanel(0)
  document.body.appendChild(stats.dom)
}

const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
  shadow: true,
  // powerPreference: 'high-performance',
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

export default renderer
