import { createMachine, interpret, assign } from 'xstate'
import { difficulties } from '../constants'

export const gameMachine = createMachine({
  id: 'gameMachine',
  initial: 'playing',
  context: {
    difficulty: 0,
  },
  on: {
    DIFFICULTY: {
      actions: assign({
        difficulty: (context) => (context.difficulty + 1) % difficulties.length,
      }),
    },
  },
  states: {
    playing: {
      on: {
        TICK: 'tick',
        LOSE: 'lose',
        WIN: 'win',
        QUIT: 'finished',
      },
    },
    tick: {
      on: {
        DONE: 'playing',
      },
    },
    win: {
      on: {
        DONE: 'finished',
      },
    },
    lose: {
      on: {
        DONE: 'finished',
      },
    },
    finished: {
      type: 'final',
    },
  },
})

export const gameService = interpret(gameMachine)
