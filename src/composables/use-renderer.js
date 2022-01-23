import { computed, ref } from 'vue'

const rendererRef = ref()
const renderer = computed(() => rendererRef.value?.renderer)

export default function useRenderer() {
  return {
    rendererRef,
    renderer,
  }
}
