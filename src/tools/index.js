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
export const randomRoundNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
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

  const ah = +a.replace('#', '0x'),
    ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
    bh = +b.replace('#', '0x'),
    br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab)

  return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
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
export const randomCoordinate = (min, max, excludes) => {
  const { width, direction } = excludes
  const offset = width / 2

  let funcX
  let funcZ
  let x = randomNumber(min, max)
  let y = 0
  let z = randomNumber(min, max)

  if (direction === 0 || direction == 4) {
    funcX = (x) => (x > offset) || (x < -offset)
    funcZ = (_x, _z) => true
  } else if (direction === 3 || direction == 7) {
    funcX = (_x) => true
    funcZ = (x, z) => (z > (x + offset)) || (z < (x - offset))
  } else if (direction === 2 || direction == 6) {
    funcX = (_x) => true
    funcZ = (_x, z) => (z > offset) || (z < -offset)
  } else if (direction === 1 || direction == 5) {
    funcX = (_x) => true
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
