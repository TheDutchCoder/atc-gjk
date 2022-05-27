export const setPoint = (point, geometry, x, y, z, relative = true) => {
  /**
   * Geometry reference:
   *
   * Face 1 (right): 0, 1, 2, 3
   * Face 2 (left): 4, 5, 6, 7
   * Face 3 (top): 8, 9, 10, 11
   * Face 4 (bottom): 12, 13, 14, 15
   * Face 5 (front): 16, 17, 18, 19
   * Face 6 (back): 20, 21, 22, 23
   */
  const vertices = [
    [0, 11, 17],
    [1, 9, 20],
    [2, 13, 19],
    [3, 15, 22],
    [5, 10, 16],
    [4, 8, 21],
    [7, 12, 18],
    [6, 14, 23],
  ]

  vertices[point].forEach(vertex => {
    let newX
    let newY
    let newZ

    let oldX = geometry.attributes.position.getX(vertex)
    let oldY = geometry.attributes.position.getY(vertex)
    let oldZ = geometry.attributes.position.getZ(vertex)

    if (relative) {
      newX = x ? oldX + x : oldX
      newY = y ? oldY + y : oldY
      newZ = z ? oldZ + z : oldZ
    } else {
      newX = x ? x : oldX
      newY = y ? y : oldY
      newZ = z ? z : oldZ
    }

    geometry.attributes.position.setXYZ(vertex, newX, newY, newZ)
  })

  geometry.attributes.position.needsUpdate = true
}

/**
 * Generates a random float number between a min and max value.
 */
export const randomNumber = (min, max, exclusions) => {
  const number = Math.round(Math.random() * ((max * 100000) - (min * 100000)) + (min * 100000)) / 100000

  if (exclusions && number >= exclusions.min && number <= exclusions.max) {
    return randomNumber(min, max, exclusions)
  } else {
    return number
  }
}


/**
 * Generates a random whole number between a min and max value.
 */
export const randomRoundNumber = (min, max, exclude) => {
  let number = Math.round(Math.random() * (max - min) + min)

  if (number === exclude) {
    number = randomRoundNumber(min, max, exclude)
  }

  return number
}


/**
 * Picks a random number from an array of numbers.
 */
export const randomItemFromArray = (array, remove = false) => {
  const index = Math.floor(Math.random() * array.length)
  const item = array[index]

  if (remove) {
    array.splice(index, 1)
  }

  return item
}

export const lerpColor = (a, b, amount) => {

  var ah = +a.replace('#', '0x'),
      ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
      bh = +b.replace('#', '0x'),
      br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
      rr = ar + amount * (br - ar),
      rg = ag + amount * (bg - ag),
      rb = ab + amount * (bb - ab)

  return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1)
}

export const displayTime = (number) => {
  return `${String(Math.floor((number / 4))).padStart(2, '0')}:${String(number % 4 * 15).padStart(2, '0')}`
}


/**
 * Takes a board and checks for available spots on the board and returns an
 * array of objects with x/y coordinates of the available spots.
 */
export const checkForAvailableSpots = (board) => {
  let b = []

  board.forEach((row, rowIndex) => row.forEach((cell, cellIndex) => {
    if (cell === null) {
      b.push({ x: cellIndex, y: rowIndex })
    }
  }))

  return b
}


/**
 * Takes a board and checks for available ranges on the board and returns an
 * array of objects with x/y coordinates of the available spots.
 */
 export const checkForAvailableRanges = (board, range, horizontal) => {
  let b = []

  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (horizontal) {
        let a = true

        for (let i = 0; i < range; i++) {
          if (row[cellIndex + i] !== null) {
            a = false
          }
        }

        if (a) {
          b.push({
            start: { x: cellIndex, y: 0, z: rowIndex },
            end: { x: cellIndex + (range - 1), y: 0, z: rowIndex },
          })
        }
      } else {
        let a = true

        for (let i = 0; i < range; i++) {
          if (!board[rowIndex + i] || board[rowIndex + i][cellIndex] !== null) {
            a = false
          }
        }

        if (a) {
          b.push({
            start: { x: cellIndex, y: 0, z: rowIndex },
            end: { x: cellIndex, y: 0, z: rowIndex + (range - 1) },
          })
        }
      }
    }
  )})

  return b
}


export const getRandomTile = (board, width, depth, offset = 0) => {

  // Exit early if no spots are available at all.
  // This needs to take into account the offset as well.
  const newBoard = JSON.parse(JSON.stringify(board))
  const tmpBoard = JSON.parse(JSON.stringify(board))

  if (offset > 0) {
    tmpBoard.splice(-offset)
    tmpBoard.splice(0, offset)
    tmpBoard.forEach(row => {
      row.splice(-offset)
      row.splice(0, offset)
    })
  }

  if (tmpBoard.flat(2).every(tile => !!tile)) {
    return null
  }

  const minX = 0 - Math.floor(((width) / 2))
  const minZ = 0 - Math.floor(((depth) / 2))

  let x
  let z

  do {
    x = randomRoundNumber(offset, (width - (offset)) - 1)
    z = randomRoundNumber(offset, (depth - (offset)) - 1)
  } while (newBoard[z][x])

  const tile = { x: x + minX, y: 0, z: z + minZ }

  return {
    tile,
    x: x,
    z: z,
  }
}





/**
 * Cubic bezier test
 */
const CubicBezierP0 = (t, p) => {
  const k = 1 - t
  return k * k * k * p
}

const CubicBezierP1 = (t, p) => {
  const k = 1 - t
  return 3 * k * k * t * p
}

const CubicBezierP2 = (t, p) => {
  return 3 * (1 - t) * t * t * p
}

const CubicBezierP3 = (t, p) => {
  return t * t * t * p
}

export const CubicBezier = (t, p0, p1, p2, p3) => {
  return CubicBezierP0(t, p0) + CubicBezierP1(t, p1) + CubicBezierP2(t, p2) +
    CubicBezierP3(t, p3)
}

/**
 * Trust me on this one :D
 * @param {*} min
 * @param {*} max
 * @param {*} excludes
 * @returns
 */
export const randomCoordinate = (min, max, excludes = { width: 0, direction: 0 }) => {
  const { width, direction } = excludes
  const offset = width / 2

  let funcX
  let funcZ
  let x = randomNumber(min, max)
  let y = 0
  let z = randomNumber(min, max)

  if (direction === 0 || direction == 4) {
    funcX = (x) => (x > offset) || (x < -offset)
    funcZ = () => true
  } else if (direction === 3 || direction == 7) {
    funcX = () => true
    funcZ = (x, z) => (z > (x + offset)) || (z < (x - offset))
  } else if (direction === 2 || direction == 6) {
    funcX = () => true
    funcZ = (_x, z) => (z > offset) || (z < -offset)
  } else if (direction === 1 || direction == 5) {
    funcX = () => true
    funcZ = (x, z) => (z > (-x + offset)) || (z < (-x - offset))
  }

  while (!funcX(x)) {
    x = randomNumber(min, max)
  }

  while (!funcZ(x, z)) {
    z = randomNumber(min, max)
  }

  return { x, y, z }
}

// 3     4     5
//   ┌───────┐
// 2 │       │ 6
//   └───────┘
// 1     0     7
/**
 * Returns the start direction of a plane for a given position.
 *
 * Airplanes always start 1 block outside of the playing area, so for a 3x3
 * area, the top left corner is { -1, -1 }, but a plane would start at { -2. -2
 * }.
 * @param {*} position
 * @param {*} width
 * @param {*} depth
 * @returns
 */
export const getStartDirection = (position, width, depth, offset = 1) => {
  const minX = Math.ceil(0 - (width / 2))
  const maxX = Math.abs(minX)
  const minZ = Math.ceil(0 - (depth / 2))
  const maxZ = Math.abs(minZ)

  const { x, z } = position

  if (x === minX - offset) {
    if (z === minZ - offset) {
      return 3
    } else if (z === maxZ + offset) {
      return 1
    } else {
      return 2
    }
  } else if (x === maxX + offset) {
    if (z === minZ - offset) {
      return 5
    } else if (z === maxZ + offset) {
      return 7
    } else {
      return 6
    }
  } else {
    if (z === minZ - offset) {
      return 4
    } else {
      return 0
    }
  }
}

// 7     0     1
//   ┌───────┐
// 6 │       │ 2
//   └───────┘
// 5     4     3
/**
 * Returns the end direction of a plane for a given position.
 *
 * Airplanes always end 1 block outside of the playing area, so for a 3x3
 * area, the top left corner is { -1, -1 }, but a plane would end at { -2. -2
 * }.
 * @param {*} position
 * @param {*} width
 * @param {*} depth
 * @returns
 */
 export const getEndDirection = (position, width, depth) => {
  const minX = Math.ceil(0 - (width / 2))
  const maxX = Math.abs(minX)
  const minZ = Math.ceil(0 - (depth / 2))
  const maxZ = Math.abs(minZ)

  const { x, z } = position

  if (x === minX - 1) {
    if (z === minZ - 1) {
      return 7
    } else if (z === maxZ + 1) {
      return 5
    } else {
      return 6
    }
  } else if (x === maxX + 1) {
    if (z === minZ - 1) {
      return 1
    } else if (z === maxZ + 1) {
      return 3
    } else {
      return 2
    }
  } else {
    if (z === minZ - 1) {
      return 0
    } else {
      return 4
    }
  }
}

export const getNextPosition = (position, direction) => {
  let { x, y, z } = position

  if (direction === 0) {
    z--
  } else if (direction === 1) {
    x++
    z--
  } else if (direction === 2) {
    x++
  } else if (direction === 3) {
    x++
    z++
  } else if (direction === 4) {
    z++
  } else if (direction === 5) {
    x--
    z++
  } else if (direction === 6) {
    x--
  } else if (direction === 7) {
    x--
    z--
  }

  return { x, y, z }
}

export const getPrevPosition = (position, direction) => {
  let { x, y, z } = position

  if (direction === 0) {
    z++
  } else if (direction === 1) {
    x--
    z++
  } else if (direction === 2) {
    x--
  } else if (direction === 3) {
    x--
    z--
  } else if (direction === 4) {
    z--
  } else if (direction === 5) {
    x++
    z--
  } else if (direction === 6) {
    x++
  } else if (direction === 7) {
    x++
    z++
  }

  return { x, y, z }
}

export const formatTime = (tick) => {
  const hours = (Math.floor(tick / 4)).toString()
  const quarters = ((tick % 4) * 15).toString()

  return `${hours.padStart(2, '0')}:${quarters.padStart(2, '0')}`
}


export const mapDirection = (direction) => {
  const map = {
    0: 'N',
    1: 'NE',
    2: 'E',
    3: 'SE',
    4: 'S',
    5: 'SW',
    6: 'W',
    7: 'NW',
  }

  return map[direction]
}


export const getRandomCloudStart = (width, depth, maxHeight) => {
  const minX = Math.ceil(0 - (width / 2))
  const maxX = Math.abs(minX)
  const minY = 2
  const maxY = maxHeight - 2
  const minZ = Math.ceil(0 - (depth / 2))
  const maxZ = Math.abs(minZ)

  const optionsX = [minX, maxX, 0]
  const optionsZ1 = [minZ, maxZ]
  const optionsZ2 = [minZ, maxZ, 0]

  const x = randomItemFromArray(optionsX)
  const y = randomRoundNumber(minY, maxY)
  const z = x === 0 ? randomItemFromArray(optionsZ1) : randomItemFromArray(optionsZ2)

  const position = { x, y, z }
  const direction = getStartDirection(position, width, depth, 0)

  return {
    position,
    direction,
  }
}


export const getRandomStart = (width, depth, maxHeight, airports = []) => {
  const isAirport = airports.length ? Math.random() > 0.7 : false

  const minX = Math.ceil(0 - (width / 2)) - 1
  const maxX = Math.abs(minX)
  const minZ = Math.ceil(0 - (depth / 2)) - 1
  const maxZ = Math.abs(minZ)

  const optionsX = [minX, maxX, 0]
  const optionsZ1 = [minZ, maxZ]
  const optionsZ2 = [minZ, maxZ, 0]

  const x = randomItemFromArray(optionsX)
  const y = randomRoundNumber(3, maxHeight)
  const z = x === 0 ? randomItemFromArray(optionsZ1) : randomItemFromArray(optionsZ2)

  const position = { x, y, z }

  return isAirport ? getRandomAirport(airports) : {
    position,
    direction: getStartDirection(position, width, depth),
    name: `${getWindDirection(position)}${y}`,
  }
}

export const getRandomDestination = (width, depth, maxHeight, airports = []) => {
  const isAirport = airports.length ? Math.random() > 0.3 : false

  const minX = Math.ceil(0 - (width / 2)) -1
  const maxX = Math.abs(minX)
  const minZ = Math.ceil(0 - (depth / 2)) - 1
  const maxZ = Math.abs(minZ)

  const optionsX = [minX, maxX, 0]
  const optionsZ1 = [minZ, maxZ]
  const optionsZ2 = [minZ, maxZ, 0]

  const x = randomItemFromArray(optionsX)
  const y = randomRoundNumber(3, maxHeight)
  const z = x === 0 ? randomItemFromArray(optionsZ1) : randomItemFromArray(optionsZ2)

  const position = { x, y, z }

  return isAirport ? getRandomAirport(airports) : {
    position,
    direction: getEndDirection(position, width, depth),
    name: `${getWindDirection(position)}${y}`,
  }
}

export const getRandomAirport = (airports) => {
  return randomItemFromArray(airports)
}

export const getWindDirection = (coordinates) => {
  const { x, z } = coordinates

  if (x === 0) {
    if (z > 0) {
      return 'S'
    } else if (z < 0) {
      return 'N'
    }
  } else if (x < 0) {
    if (z < 0) {
      return 'NW'
    } else if (z === 0) {
      return 'W'
    } else if (z > 0) {
      return 'SW'
    }
  } else if (x > 0) {
    if (z < 0) {
      return 'NE'
    } else if (z === 0) {
      return 'E'
    } else if (z > 0) {
      return 'SE'
    }
  }
}

export const getDirectionFactors = (direction = 0) => {
  if (direction === 0) {
    return { x: 0, z: 1 }
  } else if (direction === 1) {
    return { x: -1, z: 1 }
  } else if (direction === 2) {
    return { x: -1, z: 0 }
  } else if (direction === 3) {
    return { x: -1, z: -1 }
  } else if (direction === 4) {
    return { x: 0, z: -1 }
  } else if (direction === 5) {
    return { x: 1, z: -1 }
  } else if (direction === 6) {
    return { x: 1, z: 0 }
  } else if (direction === 7) {
    return { x: 1, z: 1 }
  }
}

export const distributeArray = (min, max, amount, offset = 0) => {
  const factor = (max - min) / (amount - 1)
  const result = []
  let current = min

  for (let i = 0; i < amount; i++) {
    const add = randomRoundNumber(-offset, offset)
    result.push(Math.floor(current) + add)

    current += factor
  }

  return result
}
