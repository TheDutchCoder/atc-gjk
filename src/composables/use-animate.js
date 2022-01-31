import { onMounted, ref, watch } from 'vue'
import useRenderer from '#composables/use-renderer'

import { CubicBezier } from '#tools'

export default function useAnimate(providedOptions) {
  const baseOptions = {
    from: 0,
    to: 1,
    speed: 60,
    delay: 30,
    visible: false,
    axis: {
      x: true,
      y: true,
      z: true,
    }
  }

  const options = Object.assign({}, baseOptions, providedOptions)
  const { ref: obj, from, to, speed, delay, visible, axis } = options

  const { rendererRef } = useRenderer()

  const animated = ref(false)
  const animation = ref()
  const i = ref(0)

  const { x, y, z } = obj.group.children[0].scale

  const fromIsObject = typeof from === 'object'
  const toIsObject = typeof to === 'object'
  const hasFrom = !!from
  const hasTo = !!to

  const fromX = fromIsObject ? from.x : hasFrom ? from : 0
  const fromY = fromIsObject ? from.y : hasFrom ? from : 0
  const fromZ = fromIsObject ? from.z : hasFrom ? from : 0

  const toX = toIsObject ? to.x : hasTo ? to : x
  const toY = toIsObject ? to.y : hasTo ? to : y
  const toZ = toIsObject ? to.z : hasTo ? to : z

  const { x: axisX, y: axisY, z: axisZ } = axis

  if (!visible) {
    obj.group.children[0].scale.set(axisX ? fromX : x, axisY ? fromY : y, axisZ ? fromZ : z)
    rendererRef.value.renderer.shadowMap.needsUpdate = true
  }

  animation.value = () => {
    if (i.value >= delay) {
      const fraction = (i.value - delay) / speed
      const scale = CubicBezier(fraction, 0, 0, 1, 1)

      const rangeX = Math.abs(fromX - toX)
      const rangeY = Math.abs(fromY - toY)
      const rangeZ = Math.abs(fromZ - toZ)

      const factorX = fromX > toX ? -1 : 1
      const factorY = fromY > toY ? -1 : 1
      const factorZ = fromZ > toZ ? -1 : 1

      const scaleX = axisX ? fromX + (scale * rangeX * factorX) : x
      const scaleY = axisY ? fromY + (scale * rangeY * factorY) : y
      const scaleZ = axisZ ? fromZ + (scale * rangeZ * factorZ) : z

      obj.group.children[0].scale.set(scaleX, scaleY, scaleZ)
      rendererRef.value.renderer.shadowMap.needsUpdate = true
    }

    if (i.value >= (speed + delay)) {
      rendererRef.value.offBeforeRender(animation.value)
      rendererRef.value.renderer.shadowMap.needsUpdate = false
      i.value = 0
    }

    i.value++
  }

  rendererRef.value.onBeforeRender(animation.value)

  return {
    animated,
  }
}
