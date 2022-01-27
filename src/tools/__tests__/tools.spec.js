import { suite, expect, test } from 'vitest'
import { checkForAvailableSpots, randomItemFromArray, randomRoundNumber, randomNumber } from '#tools'

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

  test('randomNumber', () => {
    const min = -10
    const max = 3

    for (let i = 0; i < 1000; i++) {
      const result = randomNumber(min, max)
      expect(result).toBeGreaterThanOrEqual(-10)
      expect(result).toBeLessThanOrEqual(3)
    }
  })
})
