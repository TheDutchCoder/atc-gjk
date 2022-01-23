export default function useAmount(amount = 0) {
  return {
    amount: {
      type: Number,
      default: amount,
    },
  }
}
