export const difficulties = [
  'EASY',
  'NORMAL',
  'HARD',
]

export const dimensions = {
  EASY: {
    width: 11,
    depth: 11,
  },
  NORMAL: {
    width: 15,
    depth: 15,
  },
  HARD: {
    width: 21,
    depth: 21,
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

export const powerlines = {
  EASY: 2,
  NORMAL: 3,
  HARD: 5,
}

export const clouds = {
  EASY: {
    count: {
      min: 1,
      max: 1,
    },
    size: {
      min: 2,
      max: 2,
    },
  },
  NORMAL: {
    count: {
      min: 1,
      max: 2,
    },
    size: {
      min: 2,
      max: 3,
    },
  },
  HARD: {
    count: {
      min: 1,
      max: 3,
    },
    size: {
      min: 3,
      max: 5,
    },
  },
}

export const airplanes = {
  EASY: { amount: 24, height: 6 },
  NORMAL: { amount: 48, height: 7 },
  HARD: { amount: 64, height: 8 },
}

export const balloons = {
  EASY: { amount: 3, height: 6 },
  NORMAL: { amount: 5, height: 7 },
  HARD: { amount: 7, height: 8 },
}

export const timers = {
  EASY: 1000,
  NORMAL: 1500,
  HARD: 2000,
}

export const qualities = [
  'LOW',
  'MEDIUM',
  'HIGH',
]

export const quality = {
  LOW: {
    shadows: 1024,
  },
  MEDIUM: {
    shadows: 2048,
  },
  HIGH: {
    shadows: 4096,
  },
}

export const flightStatusses = {
  SCHEDULED: 'Scheduled',
  APPROACHING: 'Approaching',
  IN_FLIGHT: 'In flight',
  OBSTRUCTED: 'Obstructed',
  LANDED: 'Landed',
  EXITED: 'Exited',
  LOST: 'Lost',
  CRASHED: 'Crashed',
}
