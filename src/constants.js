export const difficulties = {
  EASY: 'EASY',
  NORMAL: 'NORMAL',
  HARD: 'HARD',
}

export const dimensions = {
  EASY: {
    width: 7,
    depth: 7,
  },
  NORMAL: {
    width: 9,
    depth: 9,
  },
  HARD: {
    width: 11,
    depth: 11,
  },
}

export const airfields = {
  EASY: {
    min: 1,
    max: 2,
  },
  NORMAL: {
    min: 2,
    max: 3,
  },
  HARD: {
    min: 3,
    max: 5,
  },
}

export const clouds = {
  EASY: {
    min: 1,
    max: 2,
  },
  NORMAL: {
    min: 3,
    max: 5,
  },
  HARD: {
    min: 6,
    max: 9,
  },
}

export const airplanes = {
  EASY: { amount: 24, height: 5 },
  NORMAL: { amount: 48, height: 7 },
  HARD: { amount: 96, height: 9 },
}
