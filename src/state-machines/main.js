import { createMachine, interpret, assign } from 'xstate'
import { ref } from 'vue'

export const mainMachine = createMachine({
  id: 'main',
  initial: 'loading',
  context: {
    difficulty: 0,
  },
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
        DIFFICULTY: {
          actions: ['setDifficulty'],
        },
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
            WIN: 'win',
            QUIT: 'quit',
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
        quit: {
          on: {
            DONE: '#main.gameOut',
            CANCEL: 'playing',
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
}, {
  actions: {
    setDifficulty: assign({
      difficulty: (ctx) => (ctx.difficulty + 1) % 3,
    }),
  },
})

export const service = interpret(mainMachine).start()
export const state = ref(service.state)

service.onTransition(newState => state.value = newState)
