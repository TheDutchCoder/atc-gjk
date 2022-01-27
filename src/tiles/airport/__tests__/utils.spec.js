import { expect, suite, test } from 'vitest'
import { getDirection, generateAirport, addAirports } from '../utils.js'
import { AIRPORT } from '#tiles/constants'

suite('Airport utils', () => {
  test('generateAirport', () => {
    expect(generateAirport(0, 0, 2)).toMatchObject({
      type: 'AirportTile',
      position: {
        x: 0,
        y: 0,
      },
      direction: 2
    })
  })

  test('addAirports (only 1 option)', () => {
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]

    addAirports(board, 5)
    const result = board.flat().filter(cell => cell !== null)

    expect(result.length).toBe(1)
    expect(result[0].direction).toBeGreaterThanOrEqual(0)
    expect(result[0].direction).toBeLessThanOrEqual(7)
  })

  test('addAirports (4x4 empty board)', () => {
    board = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    addAirports(board, 6)
    const result = board.flat().filter(cell => cell !== null)

    expect(result.length).toBe(4)
    expect(result[0].direction).toBe(7)
    expect(result[1].direction).toBe(1)
    expect(result[2].direction).toBe(5)
    expect(result[3].direction).toBe(3)
  })

  test('addAirports (5x5, 4 options)', () => {
    board = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, '--', null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ]

    const newBoard = addAirports(board, 8)
    const result = newBoard.flat().filter(cell => cell !== null && cell !== '--')

    expect(result.length).toBe(8)
    expect(result[0].direction).toBe(7)
    expect(result[1].direction).toBe(0)
    expect(result[2].direction).toBe(1)
    expect(result[3].direction).toBe(6)
    expect(result[4].direction).toBe(2)
    expect(result[5].direction).toBe(5)
    expect(result[6].direction).toBe(4)
    expect(result[7].direction).toBe(3)
  })
})

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
