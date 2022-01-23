export default function useOffsets() {
  return {
    offsets: {
      type: Array,
      default: () => [0, 0, 0, 0],
    },
  }
}
