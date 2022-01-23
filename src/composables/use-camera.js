import { ref, computed } from 'vue'

const cameraRef = ref()
const camera = computed(() => cameraRef.value?.camera)

export default function useCamera() {
  return {
    cameraRef,
    camera,
  }
}
