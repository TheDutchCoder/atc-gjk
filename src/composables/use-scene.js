import { ref, computed } from 'vue'

const sceneRef = ref()
const scene = computed(() => sceneRef.value?.scene)

export default function useScene() {
  return {
    sceneRef,
    scene,
  }
}
