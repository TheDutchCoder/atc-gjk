export default function useAltitude(altitude = 0, required = false) {
  return {
    altitude: {
      type: Number,
      default: altitude,
      required,
    },
  }
}
