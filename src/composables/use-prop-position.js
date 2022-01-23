export default function usePosition(required = false) {
  return {
    position: {
      type: Object,
      required: required,
      default: () => ({
        x: 0,
        y: 0,
      }),
    },
  }
}
