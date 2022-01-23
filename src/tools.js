export const setPoint = (point, obj, x, y, z, relative = true) => {
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

    let oldX = obj.value.geometry.attributes.position.getX(vertex)
    let oldY = obj.value.geometry.attributes.position.getY(vertex)
    let oldZ = obj.value.geometry.attributes.position.getZ(vertex)

    if (relative) {
      newX = x ? oldX + x : oldX
      newY = y ? oldY + y : oldY
      newZ = z ? oldZ + z : oldZ
    } else {
      newX = x ? x : oldX
      newY = y ? y : oldY
      newZ = z ? z : oldZ
    }

    obj.value.geometry.attributes.position.setXYZ(vertex, newX, newY, newZ)
  })

  obj.value.geometry.attributes.position.needsUpdate = true
}

export const randomNumber = (min, max, excludes) => {
  const number = Math.round(Math.random() * ((max * 100000) - (min * 100000)) + (min * 100000)) / 100000

  if (excludes && number >= excludes[0] && number <= excludes[1]) {
    return randomNumber(min, max, excludes)
  } else {
    return number
  }
}

export const randomRoundNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
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
