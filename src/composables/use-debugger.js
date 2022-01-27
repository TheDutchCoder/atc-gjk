import { ref } from 'vue'

const debugging = ref(false)
const enableDebugging = () => debugging.value = true
const disableDebugging = () => debugging.value = false
const toggleDebugging = () => debugging.value = !debugging.value

export default function useCamera() {
  return {
    debugging,
    enableDebugging,
    disableDebugging,
    toggleDebugging,
  }
}
