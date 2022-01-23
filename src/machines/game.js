import { createMachine, assign } from 'xstate'

export const gameMachine = () => createMachine({
  id: 'gameMachine',
  context: {
    score: 0,
  },
  initial: 'seeding',
  states: {
    seeding: {
      on: {
        'DONE': 'playing',
      }
    },
    playing: {
      on: {
        'UPDATE_SCORE': {
          actions: ['updateScore'],
        },
        'FINISHED': 'finished',
      },
    },
    finished: {
      type: 'final',
    },
  },
}, {
  actions: {
    updateScore: assign((ctx, evt) => ({
      score: ctx.score + evt.value,
    }))
  },
})
