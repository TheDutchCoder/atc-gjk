import { createMachine, interpret } from 'xstate'

const machine = createMachine({
  id: 'main',
  initial: 'loading',
  states: {
    loading: {
      on: {
        INTRO_IN: 'introIn',
      }
    },
    introIn: {
      tags: 'intro',
      on: {
        DONE: 'introIdle',
      },
    },
    introIdle: {
      tags: 'intro',
      on: {
        INTRO_OUT: 'introOut',
      },
    },
    introOut: {
      tags: 'intro',
      on: {
        DONE: 'gameIn',
      },
    },
    gameIn: {
      tags: 'board',
      on: {
        DONE: 'gamePlaying',
      },
    },
    gamePlaying: {
      tags: 'board',
      on: {
        GAME_OUT: 'gamePlaying'
      },
    },
    gameOut: {
      tags: 'board',
      on: {
        DONE: 'introIn'
      },
    },
  },
})

export const service = interpret(machine).start()
