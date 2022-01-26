import { suite, test, expect } from 'vitest'
import { addTrainTracks } from '../utils.js'
import { TRAIN_TRACK } from '#tiles/constants'

let board

suite('addTrainTracks', () => {
  test('horizontal', () => {
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]

    expect(addTrainTracks(board, 0)).toEqual([
      [{ type: TRAIN_TRACK, position: { x: 0, y: 0 }, direction: 1 }, { type: TRAIN_TRACK, position: { x: 1, y: 0 }, direction: 1 }, { type: TRAIN_TRACK, position: { x: 2, y: 0 }, direction: 1 }],
      [null, null, null],
      [null, null, null],
    ])

    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]

    expect(addTrainTracks(board, 1)).toEqual([
      [null, null, null],
      [{ type: TRAIN_TRACK, position: { x: 0, y: 1 }, direction: 1 }, { type: TRAIN_TRACK, position: { x: 1, y: 1 }, direction: 1 }, { type: TRAIN_TRACK, position: { x: 2, y: 1 }, direction: 1 }],
      [null, null, null],
    ])

    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]

    expect(addTrainTracks(board, 2)).toEqual([
      [null, null, null],
      [null, null, null],
      [{ type: TRAIN_TRACK, position: { x: 0, y: 2 }, direction: 1 }, { type: TRAIN_TRACK, position: { x: 1, y: 2 }, direction: 1 }, { type: TRAIN_TRACK, position: { x: 2, y: 2 }, direction: 1 }],
    ])
  })

  test('vertical', () => {
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]

    expect(addTrainTracks(board, null, 0)).toEqual([
      [{ type: TRAIN_TRACK, position: { x: 0, y: 0 }, direction: 0 }, null, null],
      [{ type: TRAIN_TRACK, position: { x: 0, y: 1 }, direction: 0 }, null, null],
      [{ type: TRAIN_TRACK, position: { x: 0, y: 2 }, direction: 0 }, null, null],
    ])

    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]

    expect(addTrainTracks(board, null, 1)).toEqual([
      [null, { type: TRAIN_TRACK, position: { x: 1, y: 0 }, direction: 0 }, null],
      [null, { type: TRAIN_TRACK, position: { x: 1, y: 1 }, direction: 0 }, null],
      [null, { type: TRAIN_TRACK, position: { x: 1, y: 2 }, direction: 0 }, null],
    ])

    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]

    expect(addTrainTracks(board, null, 2)).toEqual([
      [null, null, { type: TRAIN_TRACK, position: { x: 2, y: 0 }, direction: 0 }],
      [null, null, { type: TRAIN_TRACK, position: { x: 2, y: 1 }, direction: 0 }],
      [null, null, { type: TRAIN_TRACK, position: { x: 2, y: 2 }, direction: 0 }],
    ])
  })

  test('random', () => {
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]

    expect(addTrainTracks(board)).not.toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ])
  })

  test('collisions', () => {
    board = [
      [null, null, null],
      [1, 1, null],
      [null, 1, 1],
    ]

    expect(addTrainTracks(board)).toEqual([
      [{ type: TRAIN_TRACK, position: { x: 0, y: 0 }, direction: 1 }, { type: TRAIN_TRACK, position: { x: 1, y: 0 }, direction: 1 }, { type: TRAIN_TRACK, position: { x: 2, y: 0 }, direction: 1 }],
      [1, 1, null],
      [null, 1, 1],
    ])

    board = [
      [null, 1, null],
      [null, 1, 1],
      [null, 1, null],
    ]

    expect(addTrainTracks(board)).toEqual([
      [{ type: TRAIN_TRACK, position: { x: 0, y: 0 }, direction: 0 }, 1, null],
      [{ type: TRAIN_TRACK, position: { x: 0, y: 1 }, direction: 0 }, 1, 1],
      [{ type: TRAIN_TRACK, position: { x: 0, y: 2 }, direction: 0 }, 1, null],
    ])
  })
})
