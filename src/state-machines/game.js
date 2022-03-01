import { createMachine, interpret } from 'xstate'

export const gameMachine = createMachine({
  id: 'game',
  initial: 'playing',
  states: {
    playing: {
      on: {
        TICK: 'tick',
        LOSE: 'lose',
        WIN: 'win',
      },
    },
    tick: {
      on: {
        DONe: 'playing',
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

gameService.onTransition(state => {
  console.log(state)
})
