import { suite, expect, test } from 'vitest'
import {
  checkForAvailableSpots,
  checkForAvailableRanges,
  randomItemFromArray,
  randomRoundNumber,
  randomNumber,
  getRandomTile,
  getStartDirection,
  getEndDirection,
  getNextPosition,
  getPrevPosition,
  formatTime,
  mapDirection,
  getRandomCloudStart,
  getRandomStart,
  getRandomDestination,
  getRandomAirport,
  getWindDirection,
  getDirectionFactors,
  distributeArray,
} from '#tools'

suite('tools', () => {
  test('checkForAvailableSpots', () => {
    const board = [
      [null, '--', null],
      ['--', '--', null],
      [null, '--', null],
    ]

    expect(checkForAvailableSpots(board)).toEqual([
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
    ])
  })

  test('checkForAvailableRanges', () => {
    const board = [
      [null, '--', null, null, null],
      ['--', null, null, null, null],
      [null, '--', null, null, null],
      [null, '--', null, '--', null],
      [null, null, null, '--', null],
    ]

    expect(checkForAvailableRanges(board, 3, true)).toEqual([
      { start: { x: 2, y: 0, z: 0 }, end: { x: 4, y: 0, z: 0 } },
      { start: { x: 1, y: 0, z: 1 }, end: { x: 3, y: 0, z: 1 } },
      { start: { x: 2, y: 0, z: 1 }, end: { x: 4, y: 0, z: 1 } },
      { start: { x: 2, y: 0, z: 2 }, end: { x: 4, y: 0, z: 2 } },
      { start: { x: 0, y: 0, z: 4 }, end: { x: 2, y: 0, z: 4 } },
    ])

    expect(checkForAvailableRanges(board, 3, false)).toEqual([
      { start: { x: 2, y: 0, z: 0 }, end: { x: 2, y: 0, z: 2 } },
      { start: { x: 3, y: 0, z: 0 }, end: { x: 3, y: 0, z: 2 } },
      { start: { x: 4, y: 0, z: 0 }, end: { x: 4, y: 0, z: 2 } },
      { start: { x: 2, y: 0, z: 1 }, end: { x: 2, y: 0, z: 3 } },
      { start: { x: 4, y: 0, z: 1 }, end: { x: 4, y: 0, z: 3 } },
      { start: { x: 0, y: 0, z: 2 }, end: { x: 0, y: 0, z: 4 } },
      { start: { x: 2, y: 0, z: 2 }, end: { x: 2, y: 0, z: 4 } },
      { start: { x: 4, y: 0, z: 2 }, end: { x: 4, y: 0, z: 4 } },
    ])
  })

  test('randomItemFromArray', () => {
    const ar = [9, 10, 11, 12]

    for (let i = 0; i < 1000; i++) {
      const result = randomItemFromArray(ar)
      expect(result).toBeGreaterThanOrEqual(9)
      expect(result).toBeLessThanOrEqual(12)
    }
  })

  test('randomItemFromArray with remove', () => {
    let ar = [9, 10, 11, 12]
    const result = randomItemFromArray(ar, true)

    expect(ar.length).toBe(3)
    expect(result).toBeGreaterThanOrEqual(9)
    expect(result).toBeLessThanOrEqual(12)
  })

  test('randomRoundNumber', () => {
    const min = -8
    const max = 10

    for (let i = 0; i < 1000; i++) {
      const result = randomRoundNumber(min, max)
      expect(result).toBeGreaterThanOrEqual(-8)
      expect(result).toBeLessThanOrEqual(10)
    }
  })

  test('randomRoundNumber with exclusion', () => {
    const min = -8
    const max = 10

    for (let i = 0; i < 1000; i++) {
      const result = randomRoundNumber(min, max, 2)
      expect(result).toBeGreaterThanOrEqual(-8)
      expect(result).toBeLessThanOrEqual(10)
      expect(result).not.toBe(2)
    }
  })

  test('randomNumber', () => {
    const min = -10
    const max = 3

    for (let i = 0; i < 1000; i++) {
      const result = randomNumber(min, max)
      expect(result).toBeGreaterThanOrEqual(-10)
      expect(result).toBeLessThanOrEqual(3)
    }
  })

  test('randomNumber with exclusions', () => {
    const min = -10
    const max = 3
    const exclusions = {
      min: -8,
      max: 1,
    }

    const results = []

    for (let i = 0; i < 1000; i++) {
      results.push(randomNumber(min, max, exclusions))
    }

    expect(results.length).toBe(1000)
    expect(results.filter(number => number > -8 && number < 1).length).toBe(0)
  })

  test('getRandomTile, 1 space', () => {
    let board = [
      [null],
    ]

    const result = getRandomTile(board, 1, 1)

    expect(result.x).toBe(0)
    expect(result.z).toBe(0)
    expect(result.tile).toEqual({ x: 0, y: 0, z: 0 })
  })

  test('getRandomTile, 3 spaces', () => {
    let board = [
      [{}, null, {}],
      [{}, {}, {}],
      [null, null, {}],
    ]

    const newBoard = [
      [{}, { x: 0, y: 0, z: -1 }, {}],
      [{}, {}, {}],
      [{ x: -1, y: 0, z: 1 }, { x: 0, y: 0, z: 1 }, {}],
    ]

    let result = getRandomTile(board, 3, 3)
    board[result.z][result.x] = result.tile

    result = getRandomTile(board, 3, 3)
    board[result.z][result.x] = result.tile

    result = getRandomTile(board, 3, 3)
    board[result.z][result.x] = result.tile

    expect(board).toEqual(newBoard)
  })

  test('getRandomTile, impossible', () => {
    let board = [
      [null, null, null],
      [{}, {}, {}],
      [null, null, null],
    ]

    let result = getRandomTile(board, 3, 3, 1)
    expect(result).toBe(null)
  })

  test('getRandomTile, 0 spaces', () => {
    let board = [
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
    ]

    let result = getRandomTile(board, 3, 3)
    expect(result).toBe(null)
  })

  test('getRandomTile, 9 spaces, offset 1', () => {
    let board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]

    let result = getRandomTile(board, 3, 3, 1)
    expect(result.x).toBe(1)
    expect(result.z).toBe(1)
    expect(result.tile).toEqual({ x: 0, y: 0, z: 0 })

    board = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ]

    result = getRandomTile(board, 5, 5, 2)
    expect(result.x).toBe(2)
    expect(result.z).toBe(2)
    expect(result.tile).toEqual({ x: 0, y: 0, z: 0 })
  })

  test.skip('getRandomTile, 9 spaces, no touch', () => {
    const board = [
      ['00', '00', '00', '00', '00'],
      ['00', null, null, null, '00'],
      ['00', null, null, null, '00'],
      ['00', null, null, null, '00'],
      ['00', '00', '00', '00', '00'],
    ]

    const results = []

    for (let i = 0; i < 100; i++) {
      results.push(getRandomTile(board, 5, 5, 0, true))
    }

    expect(results.length).toBe(100)
    expect(results.filter(result => result.x === 2 && result.z === 2).length).toBe(100)
  })

  test('getStartDirection', () => {
    const pos1 = { x: -2, y: 0, z: -2 }
    const pos2 = { x: 0, y: 0, z: -2 }
    const pos3 = { x: 2, y: 0, z: -2 }
    const pos4 = { x: 2, y: 0, z: 0 }
    const pos5 = { x: 2, y: 0, z: 2 }
    const pos6 = { x: 0, y: 0, z: 2 }
    const pos7 = { x: -2, y: 0, z: 2 }
    const pos8 = { x: -2, y: 0, z: 0 }

    const result1 = getStartDirection(pos1, 3, 3)
    const result2 = getStartDirection(pos2, 3, 3)
    const result3 = getStartDirection(pos3, 3, 3)
    const result4 = getStartDirection(pos4, 3, 3)
    const result5 = getStartDirection(pos5, 3, 3)
    const result6 = getStartDirection(pos6, 3, 3)
    const result7 = getStartDirection(pos7, 3, 3)
    const result8 = getStartDirection(pos8, 3, 3)

    expect(result1).toBe(3)
    expect(result2).toBe(4)
    expect(result3).toBe(5)
    expect(result4).toBe(6)
    expect(result5).toBe(7)
    expect(result6).toBe(0)
    expect(result7).toBe(1)
    expect(result8).toBe(2)
  })

  test('getEndDirection', () => {
    const pos1 = { x: -2, y: 0, z: -2 }
    const pos2 = { x: 0, y: 0, z: -2 }
    const pos3 = { x: 2, y: 0, z: -2 }
    const pos4 = { x: 2, y: 0, z: 0 }
    const pos5 = { x: 2, y: 0, z: 2 }
    const pos6 = { x: 0, y: 0, z: 2 }
    const pos7 = { x: -2, y: 0, z: 2 }
    const pos8 = { x: -2, y: 0, z: 0 }

    const result1 = getEndDirection(pos1, 3, 3)
    const result2 = getEndDirection(pos2, 3, 3)
    const result3 = getEndDirection(pos3, 3, 3)
    const result4 = getEndDirection(pos4, 3, 3)
    const result5 = getEndDirection(pos5, 3, 3)
    const result6 = getEndDirection(pos6, 3, 3)
    const result7 = getEndDirection(pos7, 3, 3)
    const result8 = getEndDirection(pos8, 3, 3)

    expect(result1).toBe(7)
    expect(result2).toBe(0)
    expect(result3).toBe(1)
    expect(result4).toBe(2)
    expect(result5).toBe(3)
    expect(result6).toBe(4)
    expect(result7).toBe(5)
    expect(result8).toBe(6)
  })

  test('getNextPosition', () => {
    const result1 = getNextPosition({ x: 0, y: 0, z: 0 }, 0)
    const result2 = getNextPosition({ x: 0, y: 0, z: 0 }, 1)
    const result3 = getNextPosition({ x: 0, y: 0, z: 0 }, 2)
    const result4 = getNextPosition({ x: 0, y: 0, z: 0 }, 3)
    const result5 = getNextPosition({ x: 0, y: 0, z: 0 }, 4)
    const result6 = getNextPosition({ x: 0, y: 0, z: 0 }, 5)
    const result7 = getNextPosition({ x: 0, y: 0, z: 0 }, 6)
    const result8 = getNextPosition({ x: 0, y: 0, z: 0 }, 7)

    expect(result1).toEqual({ x: 0, y: 0, z: -1 })
    expect(result2).toEqual({ x: 1, y: 0, z: -1 })
    expect(result3).toEqual({ x: 1, y: 0, z: 0 })
    expect(result4).toEqual({ x: 1, y: 0, z: 1 })
    expect(result5).toEqual({ x: 0, y: 0, z: 1 })
    expect(result6).toEqual({ x: -1, y: 0, z: 1 })
    expect(result7).toEqual({ x: -1, y: 0, z: 0 })
    expect(result8).toEqual({ x: -1, y: 0, z: -1 })
  })

  test('getPrevPosition', () => {
    const result1 = getPrevPosition({ x: 0, y: 0, z: 0 }, 0)
    const result2 = getPrevPosition({ x: 0, y: 0, z: 0 }, 1)
    const result3 = getPrevPosition({ x: 0, y: 0, z: 0 }, 2)
    const result4 = getPrevPosition({ x: 0, y: 0, z: 0 }, 3)
    const result5 = getPrevPosition({ x: 0, y: 0, z: 0 }, 4)
    const result6 = getPrevPosition({ x: 0, y: 0, z: 0 }, 5)
    const result7 = getPrevPosition({ x: 0, y: 0, z: 0 }, 6)
    const result8 = getPrevPosition({ x: 0, y: 0, z: 0 }, 7)

    expect(result1).toEqual({ x: 0, y: 0, z: 1 })
    expect(result2).toEqual({ x: -1, y: 0, z: 1 })
    expect(result3).toEqual({ x: -1, y: 0, z: 0 })
    expect(result4).toEqual({ x: -1, y: 0, z: -1 })
    expect(result5).toEqual({ x: 0, y: 0, z: -1 })
    expect(result6).toEqual({ x: 1, y: 0, z: -1 })
    expect(result7).toEqual({ x: 1, y: 0, z: 0 })
    expect(result8).toEqual({ x: 1, y: 0, z: 1 })
  })

  test('formatTime', () => {
    const time1 = 0
    const time2 = 33
    const time3 = 95

    expect(formatTime(time1)).toBe('00:00')
    expect(formatTime(time2)).toBe('08:15')
    expect(formatTime(time3)).toBe('23:45')
  })

  test('mapDirection', () => {
    expect(mapDirection(0)).toBe('N')
    expect(mapDirection(1)).toBe('NE')
    expect(mapDirection(2)).toBe('E')
    expect(mapDirection(3)).toBe('SE')
    expect(mapDirection(4)).toBe('S')
    expect(mapDirection(5)).toBe('SW')
    expect(mapDirection(6)).toBe('W')
    expect(mapDirection(7)).toBe('NW')
  })

  test('getRandomCloudStart', () => {
    const width = 7
    const height = 9
    const maxHeight = 8

    for (let i = 0; i < 100; i++) {
      let result = getRandomCloudStart(width, height, maxHeight)

      // Destination is not an airport
      expect(result.position.x === -3 || result.position.x === 0 || result.position.x === 3).toBeTruthy()
      expect(result.position.y).toBeGreaterThanOrEqual(2)
      expect(result.position.y).toBeLessThanOrEqual(6)
      expect(result.position.z === -4 || result.position.z === 0 || result.position.z === 4).toBeTruthy()
      expect(result.direction >= 0 && result.direction <= 7).toBeTruthy()
    }
  })

  test('getRandomStart', () => {
    const width = 3
    const height = 5
    const maxHeight = 8
    const airfields = [
      { position: { x: 1, y: 0, z: 1 }, direction: 0, name: 'AP1' },
      { position: { x: 3, y: 0, z: 3 }, direction: 6, name: 'AP2' },
      { position: { x: -2, y: 0, z: 2 }, direction: 3, name: 'AP3' },
    ]

    for (let i = 0; i < 1000; i++) {
      let result = getRandomStart(width, height, maxHeight, airfields)

      // Destination is not an airport
      if (result.position.y !== 0) {
        expect(result.position.x === -2 || result.position.x === 2 || result.position.x === 0).toBeTruthy()
        expect(result.position.y).toBeGreaterThanOrEqual(3)
        expect(result.position.y).toBeLessThanOrEqual(8)
        expect(result.position.z === -3 || result.position.z === 3 || result.position.z === 0).toBeTruthy()
      }
    }
  })

  test('getRandomDestination', () => {
    const width = 3
    const height = 5
    const maxHeight = 8
    const airfields = [
      { position: { x: 1, y: 0, z: 1 }, direction: 0, name: 'AP1' },
      { position: { x: 3, y: 0, z: 3 }, direction: 6, name: 'AP2' },
      { position: { x: -2, y: 0, z: 2 }, direction: 3, name: 'AP3' },
    ]

    for (let i = 0; i < 1000; i++) {
      let result = getRandomDestination(width, height, maxHeight, airfields)

      // Destination is not an airport
      if (result.position.y !== 0) {
        expect(result.position.x === -2 || result.position.x === 2 || result.position.x === 0).toBeTruthy()
        expect(result.position.y).toBeGreaterThanOrEqual(3)
        expect(result.position.y).toBeLessThanOrEqual(8)
        expect(result.position.z === -3 || result.position.z === 3 || result.position.z === 0).toBeTruthy()
      }
    }
  })

  test('getRandomAirport', () => {
    const airfields = [
      { position: { x: 1, y: 0, z: 1 }, direction: 0, name: 'AP1' },
      { position: { x: 3, y: 0, z: 3 }, direction: 6, name: 'AP2' },
      { position: { x: -2, y: 0, z: 2 }, direction: 3, name: 'AP3' },
    ]

    for (let i = 0; i < 100; i++) {
      let result = getRandomAirport(airfields)

      expect(airfields.includes(result)).toBeTruthy()
    }
  })

  test('getWindDirection', () => {
    expect(getWindDirection({ x: 0, y: 1, z: -1 })).toBe('N')
    expect(getWindDirection({ x: 1, y: 1, z: -1 })).toBe('NE')
    expect(getWindDirection({ x: 1, y: 1, z: 0 })).toBe('E')
    expect(getWindDirection({ x: 1, y: 1, z: 1 })).toBe('SE')
    expect(getWindDirection({ x: 0, y: 1, z: 1 })).toBe('S')
    expect(getWindDirection({ x: -1, y: 1, z: 1 })).toBe('SW')
    expect(getWindDirection({ x: -1, y: 1, z: 0 })).toBe('W')
    expect(getWindDirection({ x: -1, y: 1, z: -1 })).toBe('NW')
  })

  test('getDirectionFactors', () => {
    expect(getDirectionFactors(0)).toEqual({ x: 0, z: 1 })
    expect(getDirectionFactors(1)).toEqual({ x: -1, z: 1 })
    expect(getDirectionFactors(2)).toEqual({ x: -1, z: 0 })
    expect(getDirectionFactors(3)).toEqual({ x: -1, z: -1 })
    expect(getDirectionFactors(4)).toEqual({ x: 0, z: -1 })
    expect(getDirectionFactors(5)).toEqual({ x: 1, z: -1 })
    expect(getDirectionFactors(6)).toEqual({ x: 1, z: 0 })
    expect(getDirectionFactors(7)).toEqual({ x: 1, z: 1 })
  })

  test('distrubuteArray no offset', () => {
    const result1 = distributeArray(2, 10, 5, 0)
    const result2 = distributeArray(0, 90, 10, 0)
    const result3 = distributeArray(10, 20, 3, 0)

    expect(result1).toEqual([2, 4, 6, 8, 10])
    expect(result2).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90])
    expect(result3).toEqual([10, 15, 20])
  })

  test('distrubuteArray with offset', () => {
    const result1 = distributeArray(2, 10, 5, 1)
    const numbers1 = [2, 4, 6, 8, 10]

    result1.forEach((value, index) => {
      expect(value).toBeGreaterThanOrEqual(numbers1[index] - 1)
      expect(value).toBeLessThanOrEqual(numbers1[index] + 1)
    })

    const result2 = distributeArray(0, 90, 10, 2)
    const numbers2 = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]

    result2.forEach((value, index) => {
      expect(value).toBeGreaterThanOrEqual(numbers2[index] - 2)
      expect(value).toBeLessThanOrEqual(numbers2[index] + 2)
    })
  })
})


/**
 * Notes
 *
 * Exits always 3+ in height
 * 1 block buffer around APs
 */
// const board = [
//   [null, null, null, null, null, null, null],
//   [null, null, null, '==', '==', '==', null],
//   [null, '==', '==', '==', 'AP', '==', null],
//   [null, '==', 'AP', '==', '==', '==', null],
//   [null, '==', '==', '==', null, null, null],
//   [null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null],
// ]
