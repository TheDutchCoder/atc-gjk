import { createMachine } from 'xstate'
import { gameMachine } from './game'

export const mainMachine = createMachine({
  id: 'main',
  initial: 'loading',
  states: {
    loading: {
      on: {
        INTRO_IN: 'introIn',
      },
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
      invoke: {
        src: gameMachine,
        onDone: 'gameOut',
      },
      // on: {
      //   GAME_OUT: 'gameOut'
      // },
    },
    gameOut: {
      tags: 'board',
      on: {
        DONE: 'introIn',
      },
    },
  },
})

// export const service = interpret(mainMachine).start()
