import { randomRoundNumber } from "#/tools"

export const getDirection = (x, y) => {
  let direction = randomRoundNumber(0, 7)

  if (x < 0) {
    if (y < 0) {
      direction = 7
    } else if (y === 0) {
      direction = 6
    } else if (y > 0) {
      direction = 5
    }
  } else if (x === 0) {
    if (y < 0) {
      direction = 0
    } else if (y > 0) {
      direction = 4
    }
  } else if (x > 0) {
    if (y < 0) {
      direction = 1
    } else if (y === 0) {
      direction = 2
    } else if (y > 0) {
      direction = 3
    }
  }

  return direction
}
