import { ref, watch, onUpdated } from 'vue'
import { BoxHelper } from 'three'
import { DEBUG } from '../utils'
import useScene from '#composables/use-scene'

export default function useHelper (objectRef) {
  const { scene } = useScene()
  let helper

  watch(
    DEBUG,
    (enabled) => {
      if (enabled) {
        helper = new BoxHelper(objectRef.value.mesh, 0xffff00)

        scene.value.add(helper)
      } else {
        scene.value.remove(helper)
      }
    }
  )

  onUpdated(() => {
    if (DEBUG) {
      helper?.update()
    }
  })
}
