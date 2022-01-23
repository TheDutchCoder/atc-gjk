export default function useDirection(direction = 0, required = false) {
  return {
    direction: {
      type: Number,
      default: direction,
      required,
    },
  }
}
