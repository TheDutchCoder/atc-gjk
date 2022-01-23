import { expect, test } from 'vitest'
import { getDirection } from '../utils.js'

test('getDirection', () => {
  expect(getDirection(-1, -1)).toBe(7)
  expect(getDirection(0, -1)).toBe(0)
  expect(getDirection(1, -1)).toBe(1)
  expect(getDirection(-1, 0)).toBe(6)
  expect(getDirection(1, 0)).toBe(2)
  expect(getDirection(-1, 1)).toBe(5)
  expect(getDirection(0, 1)).toBe(4)
  expect(getDirection(1, 1)).toBe(3)

  // (0, 0) can have any direction between 0 and 7.
  for (let i = 0; i < 1000; i++) {
    const r = getDirection(0, 0)
    expect(r).toBeGreaterThanOrEqual(0)
    expect(r).toBeLessThanOrEqual(7)
  }
})
