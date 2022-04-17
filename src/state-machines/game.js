import { createMachine, interpret } from 'xstate'

export const gameMachine = createMachine({
  id: 'gameMachine',
  initial: 'playing',
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
