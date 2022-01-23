export default function useExcludes() {
  return {
    excludes: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0,
      }),
    },
  }
}
