import { createMachine, interpret } from 'xstate'
import { ref } from 'vue'

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
      initial: 'playing',
      states: {
        playing: {
          on: {
            LOSE: 'lose',
            Win: 'win',
          },
        },
        lose: {
          on: {
            DONE: '#main.gameOut',
          },
        },
        win: {
          on: {
            DONE: '#main.gameOut',
          },
        },
      },
      on: {
        GAME_OUT: 'gameOut',
      },
    },
    gameOut: {
      tags: 'board',
      on: {
        DONE: 'introIn',
      },
    },
  },
})

export const service = interpret(mainMachine).start()
export const state = ref(service.state)

service.onTransition(newState => state.value = newState)
