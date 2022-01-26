import { randomRoundNumber, randomItemFromArray } from '#tools'
import { TRAIN_TRACK } from '#tiles/constants'

export const generateTrainTrack = (x, y, direction) => ({
  type: TRAIN_TRACK,
  position: {
    x,
    y,
  },
  direction
})

/**
 * Takes the board and adds train tracks either on the X or on the Y axis
 * randomly.
 */
export const addTrainTracks = (board, x = null, y = null) => {
  const width = board[0].length
  const { x: availableX, y: availableY } = checkForAvailableSpots(board)

  const isOnXAxis = x !== null ? true : y !== null ? false : availableX.length === 0 ? false : availableY.length === 0 ? true : Math.random() > 0.5 // oof
  const start = x !== null ? x : y !== null ? y : randomItemFromArray(isOnXAxis ? availableX : availableY)

  if (isOnXAxis) {
    board[start] = Array.apply(null, Array(width)).map((_, index) => generateTrainTrack(index, start, 1))
  } else {
    board.map((row, index) => row[start] = generateTrainTrack(start, index, 0))
  }

  return board
}

/**
 * Checks the board to determine on which axis there's a full row or column
 * available.
 */
export const checkForAvailableSpots = (board) => {
  let x = []
  let y = []

  board.forEach((row, ix) => {
    if (row.every(cell => cell === null)) {
      x.push(ix)
    }

    if (board.every(row => row[ix] === null)) {
      y.push(ix)
    }
  })

  return {
    x,
    y,
  }
}
