import { randomRoundNumber, checkForAvailableSpots, randomItemFromArray } from "#tools"
import { AIRPORT } from '#tiles/constants'


/**
 * Generates an aiport at a certain position and with a certain direction.
 */
export const generateAirport = (x, y, direction = 0) => ({
  type: AIRPORT,
  position: {
    x,
    y,
  },
  direction
})


/**
 * Adds airports to the board.
 */
export const addAirports = (board, max = 1) => {
  const width = board.length
  const height = board[0].length
  const origin = { x: (width - 1) / 2, y: (height - 1) / 2 }

  let spots = checkForAvailableSpots(board).filter(spot => spot.x !== 0 && spot.y !== 0 && spot.x < width - 1 && spot.y < height - 1)
  const newMax = spots.length < max ? spots.length : max

  for (let i = 0; i < newMax; i++) {
    const spot = randomItemFromArray(spots)
    let direction = 0

    if (spot.x < origin.x) {
      if (spot.y < origin.y) {
        direction = 7
      } else if (spot.y > origin.y) {
        direction = 5
      } else if (spot.y === origin.y) {
        direction = 6
      }
    } else if (spot.x > origin.x) {
      if (spot.y < origin.y) {
        direction = 1
      } else if (spot.y > origin.y) {
        direction = 3
      } else if (spot.y === origin.y) {
        direction = 2
      }
    } else if (spot.x === origin.x) {
      if (spot.y < origin.y) {
        direction = 0
      } else if (spot.y > origin.y) {
        direction = 4
      } else if (spot.y === origin.y) {
        direction = randomRoundNumber(0, 7)
      }
    }

    board[spot.y][spot.x] = generateAirport(spot.x, spot.y, direction)
    spots = spots.filter(s => !(s.x === spot.x && s.y === spot.y))
  }

  return board
}



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
